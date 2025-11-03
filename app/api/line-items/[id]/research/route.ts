import { requireAuth, createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { searchBrave, buildSearchQuery } from '@/lib/brave-search';
import {
  checkCache,
  storeInCache,
  normalizeDescription,
  normalizeRegion,
  calculateVariance,
} from '@/lib/cache';
import {
  checkAndUpdateBudget,
  recordSpending,
  logApiUsage,
  calculateAnthropicCost,
  calculateBraveSearchCost,
} from '@/lib/budget';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const lineItemId = params.id;
    const supabase = createServerClient();

    // Get line item with project context
    const { data: lineItem, error: itemError } = await supabase
      .from('line_items')
      .select(`
        *,
        proposal:proposals!inner(
          *,
          project:projects!inner(*)
        )
      `)
      .eq('id', lineItemId)
      .eq('user_id', user.id)
      .single();

    if (itemError || !lineItem) {
      return NextResponse.json(
        { error: 'Line item not found' },
        { status: 404 }
      );
    }

    const project = lineItem.proposal.project;

    // Build cache key
    const cacheKey = {
      itemCategory: lineItem.category || 'general',
      itemDescriptionNormalized: normalizeDescription(lineItem.description),
      region: normalizeRegion(project.city, project.state),
      projectType: project.project_type,
      qualityLevel: project.quality_level,
    };

    // Check cache first (80-90% cost reduction!)
    const cached = await checkCache(supabase, cacheKey);

    if (cached) {
      // Cache hit! Update line item and return (cost: $0)
      const { variance_percent, flag_color } = calculateVariance(
        lineItem.total_price,
        cached.market_avg
      );

      await supabase
        .from('line_items')
        .update({
          market_avg: cached.market_avg,
          variance_percent,
          flag_color,
          last_researched_at: new Date().toISOString(),
        })
        .eq('id', lineItemId);

      return NextResponse.json({
        cached: true,
        market_avg: cached.market_avg,
        variance_percent,
        flag_color,
        cost: 0,
        explanation: `Using cached market data from ${new Date(cached.created_at).toLocaleDateString()}`,
      });
    }

    // Cache miss - need to do research
    // Estimate cost: Brave Search (~$0.005) + Claude (~$0.20-0.30)
    const estimatedCost = 0.35;

    // Check budget
    const budgetCheck = await checkAndUpdateBudget(
      supabase,
      user.id,
      estimatedCost
    );

    if (!budgetCheck.allowed) {
      return NextResponse.json(
        { error: budgetCheck.reason },
        { status: 402 } // Payment Required
      );
    }

    // Create research job
    const searchQuery = buildSearchQuery({
      description: lineItem.description,
      city: project.city,
      state: project.state,
      projectType: project.project_type,
      qualityLevel: project.quality_level,
      topography: project.topography,
      soilType: project.soil_type,
      siteAccess: project.site_access,
      urbanRural: project.urban_rural,
    });

    const { data: job } = await supabase
      .from('research_jobs')
      .insert({
        user_id: user.id,
        line_item_id: lineItemId,
        status: 'processing',
        search_query: searchQuery,
      })
      .select()
      .single();

    if (!job) {
      throw new Error('Failed to create research job');
    }

    // Search Brave
    const searchResults = await searchBrave(searchQuery, 10);
    const braveCost = calculateBraveSearchCost(1);

    // Log Brave API usage
    await logApiUsage(supabase, {
      user_id: user.id,
      operation_type: 'research',
      api_provider: 'brave',
      estimated_cost: braveCost,
      line_item_id: lineItemId,
      request_data: { search_query: searchQuery },
      response_data: { results_count: searchResults.length },
    });

    // Prepare search context for Claude
    const searchContext = searchResults
      .map(
        (r, i) =>
          `[${i + 1}] ${r.title}\n${r.description}\nSource: ${r.url}`
      )
      .join('\n\n');

    // Analyze with Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      timeout: 60000, // 60 second timeout
      messages: [
        {
          role: 'user',
          content: `You are a construction cost analyst. Analyze current market costs for this line item based on web search results.

LINE ITEM:
Description: ${lineItem.description}
${lineItem.quantity ? `Quantity: ${lineItem.quantity} ${lineItem.unit || ''}` : ''}
Contractor's Price: $${lineItem.total_price.toLocaleString()}
${lineItem.unit_price ? `Unit Price: $${lineItem.unit_price}/${lineItem.unit}` : ''}

PROJECT CONTEXT:
Location: ${project.city}, ${project.state}
Type: ${project.project_type}
Quality: ${project.quality_level || 'standard'}
${project.topography ? `Topography: ${project.topography}` : ''}
${project.soil_type ? `Soil: ${project.soil_type}` : ''}
${project.site_access ? `Access: ${project.site_access}` : ''}
${project.urban_rural ? `Setting: ${project.urban_rural}` : ''}

SEARCH RESULTS:
${searchContext}

Based on the search results and project context, provide a cost analysis in this EXACT JSON format:
{
  "market_low": 0.00,
  "market_high": 0.00,
  "market_avg": 0.00,
  "confidence_score": 0.0,
  "explanation": "Brief explanation of the analysis",
  "sources": ["source1", "source2"]
}

IMPORTANT:
- All prices in USD
- market_avg should be your best estimate of fair market cost
- confidence_score: 0.0-1.0 (how confident you are in this estimate)
- Consider site characteristics when analyzing costs
- If search results are insufficient, use lower confidence score
- Return ONLY the JSON, no other text`,
        },
      ],
    });

    // Calculate Claude cost
    const claudeCost = calculateAnthropicCost({
      input_tokens: message.usage.input_tokens,
      output_tokens: message.usage.output_tokens,
    });

    // Log Claude API usage
    await logApiUsage(supabase, {
      user_id: user.id,
      operation_type: 'research',
      api_provider: 'anthropic',
      tokens_used: message.usage.input_tokens + message.usage.output_tokens,
      estimated_cost: claudeCost,
      line_item_id: lineItemId,
      request_data: {
        line_item_description: lineItem.description,
        search_results_count: searchResults.length,
      },
    });

    // Parse Claude response
    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse Claude response');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Validate analysis
    if (
      typeof analysis.market_avg !== 'number' ||
      typeof analysis.confidence_score !== 'number'
    ) {
      throw new Error('Invalid analysis format from Claude');
    }

    // Calculate variance and flag
    const { variance_percent, flag_color } = calculateVariance(
      lineItem.total_price,
      analysis.market_avg
    );

    // Record total spending
    const totalCost = braveCost + claudeCost;
    await recordSpending(supabase, user.id, totalCost);

    // Update research job
    await supabase
      .from('research_jobs')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        market_low: analysis.market_low,
        market_high: analysis.market_high,
        market_avg: analysis.market_avg,
        confidence_score: analysis.confidence_score,
        sources: analysis.sources || [],
        variance_percent,
        flag_color,
        explanation: analysis.explanation,
      })
      .eq('id', job.id);

    // Update line item
    await supabase
      .from('line_items')
      .update({
        research_job_id: job.id,
        market_avg: analysis.market_avg,
        variance_percent,
        flag_color,
        last_researched_at: new Date().toISOString(),
      })
      .eq('id', lineItemId);

    // Store in cache for future lookups
    await storeInCache(supabase, cacheKey, {
      unit: lineItem.unit,
      unit_price: lineItem.unit_price,
      total_price: analysis.market_avg,
      confidence_score: analysis.confidence_score,
      source: 'researched',
    });

    return NextResponse.json({
      cached: false,
      market_low: analysis.market_low,
      market_high: analysis.market_high,
      market_avg: analysis.market_avg,
      variance_percent,
      flag_color,
      confidence_score: analysis.confidence_score,
      explanation: analysis.explanation,
      sources: analysis.sources,
      cost: totalCost,
      search_results_count: searchResults.length,
    });
  } catch (error) {
    console.error('Research error:', error);

    // Update job status to failed if we have a job ID
    const supabase = createServerClient();
    // Note: Can't easily get job.id here in catch block
    // Consider adding job tracking in outer scope

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Research failed' },
      { status: 500 }
    );
  }
}
