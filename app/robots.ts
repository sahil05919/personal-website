/**
 * robots.txt.
 *
 * There was none, so `/robots.txt` 404'd and the sitemap had nowhere to be
 * announced. Nothing here is restrictive: the whole record is meant to be read.
 *
 * `/_next/` used to be disallowed as "build output rather than writing". That
 * was wrong: it is also where the CSS, the scripts and every optimised
 * photograph (`/_next/image`) are served from, so search engines were told not
 * to fetch the things they need to render the page or index its images.
 * Nothing is disallowed now.
 */

import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
