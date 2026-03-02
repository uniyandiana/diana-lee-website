/**
 * Add UTM parameters to URLs for tracking
 */

interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export function addUTMParams(url: string, params: UTMParams): string {
  try {
    const urlObj = new URL(url);

    // Add UTM parameters
    if (params.source) urlObj.searchParams.set('utm_source', params.source);
    if (params.medium) urlObj.searchParams.set('utm_medium', params.medium);
    if (params.campaign) urlObj.searchParams.set('utm_campaign', params.campaign);
    if (params.content) urlObj.searchParams.set('utm_content', params.content);
    if (params.term) urlObj.searchParams.set('utm_term', params.term);

    return urlObj.toString();
  } catch (error) {
    // If URL is invalid, return original
    console.error('Invalid URL:', url);
    return url;
  }
}

/**
 * Add UTM parameters to opportunity external links
 */
export function addOpportunityUTM(url: string, opportunitySlug: string): string {
  return addUTMParams(url, {
    source: 'diana-lee',
    medium: 'website',
    campaign: 'opportunities',
    content: opportunitySlug,
  });
}
