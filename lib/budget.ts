/**
 * Budget management and API cost tracking utilities
 * Used across Phase 2 routes to enforce spending limits
 */

import { SupabaseClient } from '@supabase/supabase-js';

// ============================================================================
// Cost Calculation
// ============================================================================

/**
 * Calculate cost for Anthropic API call
 * Model: claude-sonnet-4-5-20250929
 * Pricing: $3/1M input tokens, $15/1M output tokens
 */
export function calculateAnthropicCost(usage: {
  input_tokens: number;
  output_tokens: number;
}): number {
  const inputCostPer1M = 3.0; // $3 per 1M input tokens
  const outputCostPer1M = 15.0; // $15 per 1M output tokens

  const inputCost = (usage.input_tokens / 1_000_000) * inputCostPer1M;
  const outputCost = (usage.output_tokens / 1_000_000) * outputCostPer1M;

  return inputCost + outputCost;
}

/**
 * Calculate cost for Brave Search API call
 * Pricing: $5/1000 queries
 */
export function calculateBraveSearchCost(queries: number = 1): number {
  return (queries / 1000) * 5.0;
}

// ============================================================================
// Budget Checks
// ============================================================================

export interface BudgetCheckResult {
  allowed: boolean;
  reason?: string;
  currentDailySpent?: number;
  currentMonthlySpent?: number;
  dailyLimit?: number;
  monthlyLimit?: number;
}

/**
 * Check if user has budget available and update spending if allowed
 *
 * @param supabase Supabase client (must be authenticated)
 * @param userId User ID
 * @param estimatedCost Estimated cost of operation
 * @returns Budget check result
 */
export async function checkAndUpdateBudget(
  supabase: SupabaseClient,
  userId: string,
  estimatedCost: number
): Promise<BudgetCheckResult> {
  // Get or create user budget
  let { data: budget } = await supabase
    .from('user_budget')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!budget) {
    // Create budget for new user
    const { data: newBudget, error } = await supabase
      .from('user_budget')
      .insert({
        user_id: userId,
        daily_limit: 20.0,
        daily_spent: 0,
        monthly_limit: 100.0,
        monthly_spent: 0,
        last_reset_date: new Date().toISOString().split('T')[0],
      })
      .select()
      .single();

    if (error || !newBudget) {
      return {
        allowed: false,
        reason: 'Failed to create budget record',
      };
    }

    budget = newBudget;
  }

  // Check if need to reset daily spending
  const today = new Date().toISOString().split('T')[0];
  if (budget.last_reset_date !== today) {
    await supabase
      .from('user_budget')
      .update({
        daily_spent: 0,
        last_reset_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    budget.daily_spent = 0;
  }

  // Check daily limit
  if (budget.daily_spent + estimatedCost > budget.daily_limit) {
    return {
      allowed: false,
      reason: `Daily budget limit ($${budget.daily_limit.toFixed(2)}) would be exceeded. Current: $${budget.daily_spent.toFixed(2)}`,
      currentDailySpent: budget.daily_spent,
      dailyLimit: budget.daily_limit,
    };
  }

  // Check monthly limit
  if (budget.monthly_spent + estimatedCost > budget.monthly_limit) {
    return {
      allowed: false,
      reason: `Monthly budget limit ($${budget.monthly_limit.toFixed(2)}) would be exceeded. Current: $${budget.monthly_spent.toFixed(2)}`,
      currentMonthlySpent: budget.monthly_spent,
      monthlyLimit: budget.monthly_limit,
    };
  }

  return {
    allowed: true,
    currentDailySpent: budget.daily_spent,
    currentMonthlySpent: budget.monthly_spent,
    dailyLimit: budget.daily_limit,
    monthlyLimit: budget.monthly_limit,
  };
}

/**
 * Update user's spending after successful API call
 *
 * @param supabase Supabase client
 * @param userId User ID
 * @param actualCost Actual cost incurred
 */
export async function recordSpending(
  supabase: SupabaseClient,
  userId: string,
  actualCost: number
): Promise<void> {
  // Increment both daily and monthly spending
  const { data: budget } = await supabase
    .from('user_budget')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (budget) {
    await supabase
      .from('user_budget')
      .update({
        daily_spent: budget.daily_spent + actualCost,
        monthly_spent: budget.monthly_spent + actualCost,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);
  }
}

// ============================================================================
// API Usage Logging
// ============================================================================

export interface ApiUsageLog {
  user_id: string;
  operation_type: 'extraction' | 'research' | 'chat' | 'alternatives' | 'scope_generation';
  api_provider: 'anthropic' | 'brave';
  tokens_used?: number;
  estimated_cost: number;
  proposal_id?: string;
  line_item_id?: string;
  request_data?: any;
  response_data?: any;
}

/**
 * Log API usage to database
 *
 * @param supabase Supabase client
 * @param log API usage log data
 */
export async function logApiUsage(
  supabase: SupabaseClient,
  log: ApiUsageLog
): Promise<void> {
  await supabase.from('api_usage').insert({
    user_id: log.user_id,
    operation_type: log.operation_type,
    api_provider: log.api_provider,
    tokens_used: log.tokens_used || null,
    estimated_cost: log.estimated_cost,
    proposal_id: log.proposal_id || null,
    line_item_id: log.line_item_id || null,
    request_data: log.request_data || null,
    response_data: log.response_data || null,
  });
}

/**
 * Get user's spending summary
 *
 * @param supabase Supabase client
 * @param userId User ID
 * @returns Spending summary
 */
export async function getSpendingSummary(
  supabase: SupabaseClient,
  userId: string
) {
  const { data: budget } = await supabase
    .from('user_budget')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!budget) {
    return {
      daily_spent: 0,
      daily_limit: 20.0,
      daily_remaining: 20.0,
      monthly_spent: 0,
      monthly_limit: 100.0,
      monthly_remaining: 100.0,
    };
  }

  // Check if daily reset is needed
  const today = new Date().toISOString().split('T')[0];
  const daily_spent = budget.last_reset_date === today ? budget.daily_spent : 0;

  return {
    daily_spent,
    daily_limit: budget.daily_limit,
    daily_remaining: budget.daily_limit - daily_spent,
    monthly_spent: budget.monthly_spent,
    monthly_limit: budget.monthly_limit,
    monthly_remaining: budget.monthly_limit - budget.monthly_spent,
  };
}
