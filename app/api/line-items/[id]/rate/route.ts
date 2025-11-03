import { requireAuth, createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { storeInCache, normalizeDescription, normalizeRegion } from '@/lib/cache';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const lineItemId = params.id;
    const body = await req.json();
    const supabase = createServerClient();

    // Validate input
    const { rating, accuracy_feedback, actual_cost, comments } = body;

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Get line item with context
    const { data: lineItem, error: itemError } = await supabase
      .from('line_items')
      .select(`
        *,
        research_job_id,
        proposal:proposals!inner(
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

    // Save rating
    const { data: savedRating, error: ratingError } = await supabase
      .from('user_ratings')
      .insert({
        user_id: user.id,
        line_item_id: lineItemId,
        research_job_id: lineItem.research_job_id || null,
        rating,
        accuracy_feedback: accuracy_feedback || null,
        actual_cost: actual_cost || null,
        comments: comments || null,
      })
      .select()
      .single();

    if (ratingError) {
      throw new Error(`Failed to save rating: ${ratingError.message}`);
    }

    // If user provided actual cost, add to benchmarks for learning
    if (actual_cost && lineItem.quantity) {
      const cacheKey = {
        itemCategory: lineItem.category || 'general',
        itemDescriptionNormalized: normalizeDescription(lineItem.description),
        region: normalizeRegion(project.city, project.state),
        projectType: project.project_type,
        qualityLevel: project.quality_level,
      };

      await storeInCache(supabase, cacheKey, {
        unit: lineItem.unit,
        unit_price: actual_cost / lineItem.quantity,
        total_price: actual_cost,
        confidence_score: rating / 5, // Convert 1-5 rating to 0-1 confidence
        source: 'user_rated',
      });
    }

    return NextResponse.json({
      success: true,
      rating: savedRating,
      cached: actual_cost ? true : false,
    });
  } catch (error) {
    console.error('Rating error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save rating' },
      { status: 500 }
    );
  }
}

// Get ratings for a line item
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const lineItemId = params.id;
    const supabase = createServerClient();

    const { data: ratings, error } = await supabase
      .from('user_ratings')
      .select('*')
      .eq('line_item_id', lineItemId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ ratings });
  } catch (error) {
    console.error('Get ratings error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get ratings' },
      { status: 500 }
    );
  }
}
