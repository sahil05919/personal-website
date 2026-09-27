// app/page.tsx
//
// Home is the title page of the record: frontispiece, statement, contents,
// one line of proof it's still alive, colophon. No project cards, no timeline,
// no CTA — those belong to /projects, /journey and /contact.
//
// The Currently strip is fed from app/now/now-content.ts, NOT from
// homeContent.ts. There is exactly one place the season line is written, and
// it is the page that owns the season. When the season changes, /now changes
// and Home follows automatically.
//
// SPACING CONTRACT — the sections below must stay contiguous.
// Each one draws its own segment of the through-line, top edge to bottom edge,
// in the reserved left gutter. They read as one continuous stroke only because
// they touch. Any vertical margin between two sections puts a visible gap in
// the line; all vertical space is padding, inside the sections, via
// components/home/rhythm.ts.

import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

import { homeContent } from '@/data/homeContent';
import { personSchema } from '@/lib/person-schema';
import { lastUpdated, seasonLine } from './now/now-content';

import Frontispiece from '@/components/home/Frontispiece';
import Statement from '@/components/home/Statement';
import Contents from '@/components/home/Contents';
import Currently from '@/components/home/Currently';
import Colophon from '@/components/home/Colophon';

export const metadata: Metadata = pageMetadata({
  path: '/',
  // `absoluteTitle` because meta.title already contains the name. Left to the
  // layout's "%s | Sahil Kumar" template it renders as
  // "Sahil Kumar — Things I don't want to forget. | Sahil Kumar".
  title: homeContent.meta.title,
  absoluteTitle: true,
  description: homeContent.meta.description,
  // The title page of the record, not one of its chapters.
  type: 'website',
});

export default function HomePage() {
  return (
    <>
      {/* Structured data. Invisible, unstyled, and outside the spacing
          contract below because it renders nothing — see lib/person-schema.ts
          for what it claims and where each claim is also written in prose. */}
      <script
        type="application/ld+json"
        // The object is a local literal, not user input; JSON.stringify is the
        // documented way to embed it.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Frontispiece />
      <Statement />
      <Contents />
      <Currently line={seasonLine} updated={lastUpdated} />
      <Colophon />
    </>
  );
}
