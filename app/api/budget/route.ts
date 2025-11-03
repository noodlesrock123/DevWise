import { requireAuth, createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { getSpendingSummary } from '@/lib/budget';
import { getCacheStats } from '@/lib/cache';

export async function GET(req: Request) {
  try {
    const user = await requireAuth();
    const supabase = createServerClient();

    // Get spending summary
    const spending = await getSpendingSummary(supabase, user.id);

    // Get cache statistics
    const cacheStats = await getCacheStats(supabase, user.id);

    // Get recent API usage
    const { data: recentUsage } = await supabase
      .from('api_usage')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get usage by operation type (this month)
    const firstOfMonth = new Date();
    firstOfMonth.setDate(1);
    firstOfMonth.setHours(0, 0, 0, 0);

    const { data: monthlyUsage } = await supabase
      .from('api_usage')
      .select('operation_type, estimated_cost')
      .eq('user_id', user.id)
      .gte('created_at', firstOfMonth.toISOString());

    // Aggregate by operation type
    const usageByType: Record<string, { count: number; cost: number }> = {};
    if (monthlyUsage) {
      monthlyUsage.forEach((item) => {
        if (!usageByType[item.operation_type]) {
          usageByType[item.operation_type] = { count: 0, cost: 0 };
        }
        usageByType[item.operation_type].count++;
        usageByType[item.operation_type].cost += parseFloat(
          String(item.estimated_cost)
        );
      });
    }

    return NextResponse.json({
      spending: {
        daily: {
          spent: spending.daily_spent,
          limit: spending.daily_limit,
          remaining: spending.daily_remaining,
          percentage: (spending.daily_spent / spending.daily_limit) * 100,
        },
        monthly: {
          spent: spending.monthly_spent,
          limit: spending.monthly_limit,
          remaining: spending.monthly_remaining,
          percentage: (spending.monthly_spent / spending.monthly_limit) * 100,
        },
      },
      cache: {
        total_lookups: cacheStats.total_lookups,
        cache_hits: cacheStats.cache_hits,
        hit_rate: cacheStats.hit_rate,
        estimated_savings: cacheStats.estimated_savings,
      },
      usage_by_type: usageByType,
      recent_usage: recentUsage || [],
    });
  } catch (error) {
    console.error('Budget API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get budget info' },
      { status: 500 }
    );
  }
}

// Update budget limits
export async function PATCH(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const supabase = createServerClient();

    const { daily_limit, monthly_limit } = body;

    const updates: any = {};
    if (daily_limit !== undefined) {
      updates.daily_limit = Math.max(0, parseFloat(String(daily_limit)));
    }
    if (monthly_limit !== undefined) {
      updates.monthly_limit = Math.max(0, parseFloat(String(monthly_limit)));
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid updates provided' },
        { status: 400 }
      );
    }

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('user_budget')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ budget: data });
  } catch (error) {
    console.error('Budget update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update budget' },
      { status: 500 }
    );
  }
}
