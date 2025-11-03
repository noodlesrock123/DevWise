/**
 * Simple in-memory rate limiter for API routes
 * For production with multiple instances, use Redis or Upstash Rate Limit
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  /** Unique identifier (usually user ID or IP) */
  identifier: string;
  /** Maximum requests allowed in the window */
  limit: number;
  /** Time window in milliseconds */
  window: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if a request should be rate limited
 *
 * @example
 * const result = rateLimit({
 *   identifier: user.id,
 *   limit: 10, // 10 requests
 *   window: 60 * 1000 // per minute
 * });
 *
 * if (!result.success) {
 *   return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
 * }
 */
export function rateLimit(config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(config.identifier);

  // No entry or window has reset
  if (!entry || entry.resetAt < now) {
    const resetAt = now + config.window;
    rateLimitStore.set(config.identifier, {
      count: 1,
      resetAt,
    });

    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      reset: resetAt,
    };
  }

  // Increment count
  entry.count++;

  // Check if limit exceeded
  if (entry.count > config.limit) {
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      reset: entry.resetAt,
    };
  }

  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - entry.count,
    reset: entry.resetAt,
  };
}

/**
 * Rate limit headers helper
 */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };
}
