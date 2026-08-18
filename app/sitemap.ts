/**
 * Sitemap.
 *
 * There was none. Thirteen static routes, every one of them prerendered, and
 * nothing telling a crawler they existed — which mattered more than it usually
 * would, because until this pass every page also declared Home as its canonical
 * URL (see lib/seo.ts). Between the two, the only page a search engine had any
 * reason to keep was the title page.
 *
 * Built from `navigation` plus the back matter, so it cannot fall out of step
 * with the navbar the way a hand-written list would. `/question` is absent on
 * purpose: it is a permanent redirect now (next.config.ts) and a sitemap should
 * list destinations, not aliases.
 */

import type { MetadataRoute } from 'next';

import { navigation } from '@/data/navigation';
import { SITE_URL } from '@/lib/seo';

/** Back matter: reachable, indexable, but not part of the reading order. */
const BACK_MATTER = ['/a-z', '/writing', '/errata'];

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = navigation.map((item) => ({
    url: `${SITE_URL}${item.href === '/' ? '' : item.href}`,
    /* Home first, then the chapters in reading order, then back matter. The
       numbers are relative to each other and to nothing else. */
    priority: item.href === '/' ? 1 : 0.8,
    changeFrequency: 'monthly' as const,
  }));

  const back = BACK_MATTER.map((href) => ({
    url: `${SITE_URL}${href}`,
    priority: 0.4,
    changeFrequency: 'monthly' as const,
  }));

  return [...chapters, ...back];
}
