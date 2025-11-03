import { requireAuth, createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import {
  checkAndUpdateBudget,
  recordSpending,
  logApiUsage,
  calculateAnthropicCost,
} from '@/lib/budget';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const supabase = createServerClient();

    const { message, line_item_id, proposal_id } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Estimate cost (typical chat: $0.05-0.15)
    const estimatedCost = 0.15;

    // Check budget
    const budgetCheck = await checkAndUpdateBudget(
      supabase,
      user.id,
      estimatedCost
    );

    if (!budgetCheck.allowed) {
      return NextResponse.json(
        { error: budgetCheck.reason },
        { status: 402 }
      );
    }

    // Get context based on what's provided
    let context = '';
    let contextLineItem = null;
    let contextProposal = null;

    if (line_item_id) {
      // Get line item with full context
      const { data: lineItem } = await supabase
        .from('line_items')
        .select(`
          *,
          research_job:research_jobs(*),
          party:parties(*),
          proposal:proposals!inner(
            *,
            project:projects!inner(*)
          )
        `)
        .eq('id', line_item_id)
        .eq('user_id', user.id)
        .single();

      if (lineItem) {
        contextLineItem = lineItem;
        const project = lineItem.proposal.project;

        context = `LINE ITEM CONTEXT:
Description: ${lineItem.description}
${lineItem.category ? `Category: ${lineItem.category}` : ''}
${lineItem.location ? `Location: ${lineItem.location}` : ''}
${lineItem.quantity ? `Quantity: ${lineItem.quantity} ${lineItem.unit || ''}` : ''}
${lineItem.unit_price ? `Unit Price: $${lineItem.unit_price}` : ''}
Total Price: $${lineItem.total_price.toLocaleString()}
${lineItem.party ? `Party: ${lineItem.party.name}` : ''}
${lineItem.market_avg ? `Market Average: $${lineItem.market_avg.toLocaleString()}` : ''}
${lineItem.variance_percent ? `Variance: ${lineItem.variance_percent > 0 ? '+' : ''}${lineItem.variance_percent}%` : ''}
${lineItem.flag_color ? `Flag: ${lineItem.flag_color}` : ''}
${lineItem.is_edited ? 'Status: Edited from original' : ''}

PROJECT CONTEXT:
Name: ${project.name}
Location: ${project.city}, ${project.state}
Type: ${project.project_type}
${project.quality_level ? `Quality: ${project.quality_level}` : ''}
${project.topography ? `Topography: ${project.topography}` : ''}
${project.soil_type ? `Soil: ${project.soil_type}` : ''}
${project.site_access ? `Site Access: ${project.site_access}` : ''}
${project.urban_rural ? `Setting: ${project.urban_rural}` : ''}`;

        if (lineItem.research_job) {
          context += `\n\nMARKET RESEARCH:
Range: $${lineItem.research_job.market_low?.toLocaleString() || 'N/A'} - $${lineItem.research_job.market_high?.toLocaleString() || 'N/A'}
Average: $${lineItem.research_job.market_avg?.toLocaleString() || 'N/A'}
Confidence: ${((lineItem.research_job.confidence_score || 0) * 100).toFixed(0)}%
${lineItem.research_job.explanation ? `Analysis: ${lineItem.research_job.explanation}` : ''}`;
        }
      }
    } else if (proposal_id) {
      // Get proposal context
      const { data: proposal } = await supabase
        .from('proposals')
        .select('*, project:projects(*)')
        .eq('id', proposal_id)
        .eq('user_id', user.id)
        .single();

      if (proposal) {
        contextProposal = proposal;
        const project = proposal.project;

        context = `PROPOSAL CONTEXT:
Contractor: ${proposal.contractor_name}
${proposal.total_amount ? `Total: $${proposal.total_amount.toLocaleString()}` : ''}
Status: ${proposal.extraction_status}

PROJECT CONTEXT:
Name: ${project.name}
Location: ${project.city}, ${project.state}
Type: ${project.project_type}`;
      }
    }

    // Get conversation history
    const { data: history } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('user_id', user.id)
      .or(
        line_item_id
          ? `line_item_id.eq.${line_item_id}`
          : proposal_id
          ? `proposal_id.eq.${proposal_id}`
          : 'line_item_id.is.null,proposal_id.is.null'
      )
      .order('created_at', { ascending: true })
      .limit(20); // Last 20 messages

    // Build conversation
    const messages: Anthropic.MessageParam[] = [];

    // Add system context as first user message
    if (context) {
      messages.push({
        role: 'user',
        content: `Here is the context for this conversation:\n\n${context}\n\nPlease help me with questions about this.`,
      });
      messages.push({
        role: 'assistant',
        content:
          "I understand the context. I'm here to help you with any questions about this construction line item, proposal, or project. What would you like to know?",
      });
    }

    // Add conversation history
    if (history && history.length > 0) {
      history.forEach((msg) => {
        messages.push({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        });
      });
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message,
    });

    // Call Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      timeout: 30000, // 30 second timeout
      system: `You are a construction cost analysis assistant. You help users understand construction proposals, line items, costs, and market pricing. Be concise, accurate, and helpful. When discussing costs, always consider the project context (location, site characteristics, etc.). If you don't have enough information, say so.`,
      messages,
    });

    // Calculate cost
    const actualCost = calculateAnthropicCost({
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
    });

    // Record spending
    await recordSpending(supabase, user.id, actualCost);

    // Log API usage
    await logApiUsage(supabase, {
      user_id: user.id,
      operation_type: 'chat',
      api_provider: 'anthropic',
      tokens_used: response.usage.input_tokens + response.usage.output_tokens,
      estimated_cost: actualCost,
      line_item_id: line_item_id || null,
      proposal_id: proposal_id || null,
    });

    // Get assistant response
    const assistantMessage =
      response.content[0].type === 'text' ? response.content[0].text : '';

    // Store both messages
    await supabase.from('chat_messages').insert([
      {
        user_id: user.id,
        line_item_id: line_item_id || null,
        proposal_id: proposal_id || null,
        role: 'user',
        content: message,
      },
      {
        user_id: user.id,
        line_item_id: line_item_id || null,
        proposal_id: proposal_id || null,
        role: 'assistant',
        content: assistantMessage,
        tokens_used: response.usage.input_tokens + response.usage.output_tokens,
        estimated_cost: actualCost,
      },
    ]);

    return NextResponse.json({
      message: assistantMessage,
      cost: actualCost,
      tokens_used: response.usage.input_tokens + response.usage.output_tokens,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Chat failed' },
      { status: 500 }
    );
  }
}
