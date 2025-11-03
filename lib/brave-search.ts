/**
 * Brave Search API integration for cost research
 * Pricing: $5 per 1000 queries (Free tier: 1 req/sec, 15k/month)
 */

export interface BraveSearchResult {
  title: string;
  url: string;
  description: string;
  snippet?: string;
  age?: string;
  page_age?: string;
}

export interface BraveSearchResponse {
  results: BraveSearchResult[];
  query: string;
}

/**
 * Search Brave for construction cost information
 *
 * @param query Search query
 * @param count Number of results (default: 10, max: 20)
 * @returns Search results
 */
export async function searchBrave(
  query: string,
  count: number = 10
): Promise<BraveSearchResult[]> {
  if (!process.env.BRAVE_API_KEY) {
    throw new Error('BRAVE_API_KEY is not configured');
  }

  const url = new URL('https://api.search.brave.com/res/v1/web/search');
  url.searchParams.set('q', query);
  url.searchParams.set('count', Math.min(count, 20).toString());
  url.searchParams.set('search_lang', 'en');
  url.searchParams.set('country', 'US');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'X-Subscription-Token': process.env.BRAVE_API_KEY,
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Brave Search failed (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    // Extract results from Brave's response format
    const results = (data.web?.results || []).map((result: any) => ({
      title: result.title || '',
      url: result.url || '',
      description: result.description || '',
      snippet: result.extra_snippets?.[0] || result.description,
      age: result.age,
      page_age: result.page_age,
    }));

    return results;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Brave Search request timed out');
      }
      throw error;
    }
    throw new Error('Brave Search failed with unknown error');
  }
}

/**
 * Build context-aware search query for construction cost research
 * Includes project site characteristics for accurate results
 */
export function buildSearchQuery(params: {
  description: string;
  city: string;
  state: string;
  projectType?: string;
  qualityLevel?: string;
  topography?: string;
  soilType?: string;
  siteAccess?: string;
  urbanRural?: string;
  year?: number;
}): string {
  const parts: string[] = [];

  // Core item description
  parts.push(params.description);

  // Location (critical for cost accuracy)
  parts.push(`${params.city} ${params.state}`);

  // Project type context
  if (params.projectType) {
    parts.push(params.projectType);
  }

  // Quality level
  if (params.qualityLevel && params.qualityLevel !== 'standard') {
    parts.push(params.qualityLevel);
  }

  // Site characteristics (these heavily impact costs!)
  if (params.topography && params.topography !== 'flat') {
    parts.push(params.topography.replace('_', ' '));
  }

  if (params.soilType && params.soilType !== 'stable') {
    parts.push(`${params.soilType} soil`);
  }

  if (params.urbanRural === 'rural' || params.urbanRural === 'remote') {
    parts.push(params.urbanRural);
  }

  if (params.siteAccess && params.siteAccess !== 'paved_road') {
    parts.push(`${params.siteAccess.replace('_', ' ')} access`);
  }

  // Add year for recency
  const targetYear = params.year || new Date().getFullYear();
  parts.push(`${targetYear} cost`);

  // Combine into search query
  return parts.join(' ');
}

/**
 * Calculate cost for Brave Search API call
 *
 * @param numQueries Number of queries made (default: 1)
 * @returns Cost in dollars
 */
export function calculateBraveSearchCost(numQueries: number = 1): number {
  // Brave Search Pricing: $5 per 1000 queries
  return (numQueries / 1000) * 5.0;
}
