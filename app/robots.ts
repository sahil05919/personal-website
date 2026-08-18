/**
 * robots.txt.
 *
 * There was none, so `/robots.txt` 404'd and the sitemap had nowhere to be
 * announced. Nothing here is restrictive: the whole record is meant to be read.
 * The only path kept out is the Next.js internals prefix, which is build output
 * rather than writing.
 */

import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/_next/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
