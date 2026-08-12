import type { Metadata } from 'next';
import {
  JourneyHero,
  JourneySnapshot,
  JourneyChapters,
  JourneyClose,
  JourneyRail,
} from '@/components/journey';

export const metadata: Metadata = {
  title: 'Journey',
  description:
    'The story of how a curious child from a small town in India found his way into business, analytics, and technology.',
};

/**
 * VISUAL REFINEMENT (August 2026): previously every section here centred
 * itself independently in a `max-w-2xl` column, which is why the page read
 * as a narrow strip with dead space either side on anything wider than a
 * laptop. Sectioning now happens once, at the page level:
 *
 *   - an outer `max-w-[1400px]` frame (matching the page-container width
 *     used elsewhere on the site), content hard-left rather than centred —
 *     the same "ragged right edge" principle already established on
 *     About and Experience, not a new one invented for this page;
 *   - a two-column grid at `lg` and up: a persistent, `sticky` rail
 *     (JourneyRail — "My journey at a glance", scroll-aware) on the left,
 *     and the narrative in a fluid-but-capped column on the right;
 *   - individual chapters (in JourneyChapters) that have earned an artifact
 *     get a further local 2-column split of their own, putting that
 *     artifact in the right margin instead of inline — see that file.
 *
 * The prose measure itself did NOT change — Hero, the chapters and Close
 * all still cap their actual reading text at `max-w-lg`/`max-w-md`. What
 * changed is everything *around* the text: the page now uses the width it
 * has, the text doesn't.
 *
 * Below `lg` this collapses to the single stacked column the page always
 * had — JourneyRail doesn't render at all (`hidden lg:block`), and
 * JourneySnapshot (the static mobile/tablet glance block) takes its place
 * inline instead, right after the hero.
 */
export default function JourneyPage() {
  return (
    <div className="bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14 xl:px-16">
        <div className="lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-x-12 xl:grid-cols-[200px_minmax(0,1fr)] xl:gap-x-16">
          <aside className="hidden lg:block">
            {/* 112px ≈ navbar (72px) + a little breathing room, so the rail
                never sits flush under the fixed header. */}
            <div className="sticky top-[112px]">
              <JourneyRail />
            </div>
          </aside>

          {/* min-w-0 stops this grid track from refusing to shrink below its
              content's natural width, which is the usual cause of
              unexpected horizontal overflow in a CSS grid with text
              children. */}
          <div className="min-w-0">
            <JourneyHero />
            <JourneySnapshot />
            <JourneyChapters />
            <JourneyClose />
          </div>
        </div>
      </div>
    </div>
  );
}
