import { requireAuth, createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import * as XLSX from 'xlsx';
import { rateLimit, rateLimitHeaders } from '@/lib/rate-limit';

// Force Node.js runtime for pdf-parse
export const runtime = 'nodejs';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const proposalId = params.id;
    const supabase = createServerClient();

    // Rate limit: 5 extractions per hour per user (API calls are expensive)
    const rateLimitResult = rateLimit({
      identifier: `extract:${user.id}`,
      limit: 5,
      window: 60 * 60 * 1000, // 1 hour
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many extraction requests. Please try again later.',
          reset: new Date(rateLimitResult.reset).toISOString(),
        },
        {
          status: 429,
          headers: rateLimitHeaders(rateLimitResult),
        }
      );
    }

    const { data: proposal, error: proposalError } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', proposalId)
      .eq('user_id', user.id)
      .single();

    if (proposalError || !proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    await supabase
      .from('proposals')
      .update({
        extraction_status: 'processing',
        extraction_started_at: new Date().toISOString(),
      })
      .eq('id', proposalId);

    const { data: fileData, error: downloadError } = await supabase.storage
      .from('proposals')
      .download(proposal.file_path);

    if (downloadError) {
      throw new Error('Failed to download file');
    }

    let extractedText = '';

    if (proposal.file_type === 'pdf') {
      // Use require for pdf-parse in Node.js runtime
      const pdf = require('pdf-parse');
      const buffer = await fileData.arrayBuffer();
      const pdfData = await pdf(Buffer.from(buffer));
      extractedText = pdfData.text;
    } else {
      const buffer = await fileData.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      extractedText = XLSX.utils.sheet_to_csv(sheet);
    }

    // Send to Claude for structured extraction (with timeout protection)
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      timeout: 120000, // 2 minutes timeout
      messages: [
        {
          role: 'user',
          content: `You are a construction proposal analyzer. Extract all line items from this proposal into a structured JSON format.

PROPOSAL TEXT:
${extractedText}

Extract each line item with:
- location: The section/division (e.g., "01 General Requirements", "03 Concrete")
- category: The subsection (e.g., "PROJECT MANAGEMENT", "FOOTINGS")
- description: Clear description of the work
- unit: Unit of measure (EA, SF, LF, etc.)
- quantity: Numeric quantity
- unit_price: Price per unit
- total_price: Total cost for this item

Return ONLY valid JSON in this format:
{
  "line_items": [
    {
      "location": "01 General Requirements",
      "category": "PROJECT MANAGEMENT",
      "description": "Project Management",
      "unit": "LS",
      "quantity": 1,
      "unit_price": 50000,
      "total_price": 50000
    }
  ]
}

IMPORTANT: 
- Extract ALL line items from the document
- Ensure total_price = quantity * unit_price
- Use null for missing values
- Do NOT include any text outside the JSON`,
        },
      ],
    });


    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse extraction response');
    }

    const extracted = JSON.parse(jsonMatch[0]);

    if (!extracted.line_items || !Array.isArray(extracted.line_items)) {
      throw new Error('Invalid extraction format');
    }

    const { data: existingParty } = await supabase
      .from('parties')
      .select('id')
      .eq('project_id', proposal.project_id)
      .eq('name', proposal.contractor_name)
      .single();

    let partyId = existingParty?.id;

    if (!partyId) {
      const { data: newParty } = await supabase
        .from('parties')
        .insert({
          user_id: user.id,
          project_id: proposal.project_id,
          name: proposal.contractor_name,
          party_type: 'contractor',
        })
        .select('id')
        .single();

      partyId = newParty?.id;
    }

    const lineItemsToInsert = extracted.line_items.map((item: {
      location?: string;
      category?: string;
      description: string;
      unit?: string;
      quantity?: number;
      unit_price?: number;
      total_price: number;
    }) => ({
      user_id: user.id,
      proposal_id: proposalId,
      party_id: partyId,
      location: item.location || null,
      category: item.category || null,
      description: item.description,
      unit: item.unit || null,
      quantity: item.quantity || null,
      unit_price: item.unit_price || null,
      total_price: item.total_price,
    }));

    const { error: insertError } = await supabase
      .from('line_items')
      .insert(lineItemsToInsert);

    if (insertError) {
      throw new Error(`Failed to insert line items: ${insertError.message}`);
    }

    const totalAmount = extracted.line_items.reduce(
      (sum: number, item: { total_price: number }) => sum + (item.total_price || 0),
      0
    );

    await supabase
      .from('proposals')
      .update({
        extraction_status: 'completed',
        extraction_completed_at: new Date().toISOString(),
        total_amount: totalAmount,
        contractor_party_id: partyId,
      })
      .eq('id', proposalId);

    return NextResponse.json(
      {
        success: true,
        line_items_count: extracted.line_items.length,
        total_amount: totalAmount,
      },
      { headers: rateLimitHeaders(rateLimitResult) }
    );

  } catch (error) {
    console.error('Extraction error:', error);

    const supabase = createServerClient();
    await supabase
      .from('proposals')
      .update({ extraction_status: 'failed' })
      .eq('id', params.id);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Extraction failed' },
      { status: 500 }
    );
  }
}
