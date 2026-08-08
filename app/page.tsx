import type { Metadata } from 'next';

import Frontispiece from '@/components/home/Frontispiece';
import Statement from '@/components/home/Statement';
import Contents from '@/components/home/Contents';
import Currently from '@/components/home/Currently';
import Colophon from '@/components/home/Colophon';

/* ---------------------------------------------------------------------------
   TODO(now-source) — ONE EDIT, then delete this block.

   `Currently` must be fed from the page that already owns the text. I did not
   have the Now data file to hand, so it is currently reading a placeholder out
   of homeContent. To wire it properly:

     1. import { nowData } from '@/data/nowData';          // real path/export
     2. pass the season line and the last-updated stamp:
          <Currently line={nowData.<line>} updated={nowData.lastUpdated} />
     3. delete the `currently` key from content/homeContent.ts
     4. delete this comment

   Until step 3 is done there are two copies of this text in the codebase,
   which is the exact duplication we agreed to avoid.
--------------------------------------------------------------------------- */
import { homeContent } from '@/data/homeContent';

/**
 * Home — the title page of the record.
 *
 * Server component. This is what allows Home its own metadata; the previous
 * page was `'use client'` at the top level, which made per-page metadata
 * impossible and left Home sharing the layout's default CV-line description
 * with four other pages.
 *
 * Returns a fragment. `app/layout.tsx` already renders <main>, and the old
 * page nested a second one inside it.
 */
export const metadata: Metadata = {
  title: { absolute: homeContent.meta.title },
  description: homeContent.meta.description,
};

export default function Home() {
  return (
    <>
      <Frontispiece />
      <Statement />
      <Contents />
      <Currently
        line={homeContent.currently.line}
        updated={homeContent.currently.updated}
      />
      <Colophon />
    </>
  );
}