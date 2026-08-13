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
    // A single, fixed-position, barely-perceptible vignette above the hero —
    // the page's one atmosphere touch, added for the sitewide motion pass.
    // Warmer and more directional than the sitewide Grain (which is uniform
    // and identical on every route): a hint of light falling from upper
    // left, cinematic rather than decorative, gone entirely by the time the
    // first chapter starts. Background only — no motion, so it costs nothing
    // extra under reduced motion and nothing at all once scrolled past.
    <div
      className="bg-paper bg-no-repeat text-ink"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 900px 480px at 18% -8%, rgb(var(--through-line) / 0.05), transparent 65%)',
      }}
    >
      {/* 76rem, not 1400px. At 1400 the rail sat 200px in from the viewport
          edge and the narrative — capped at its own reading measure — left
          roughly 700px of empty paper down the right of every chapter. The
          frame is now sized to what the page actually contains: a rail, a
          reading measure, and a margin wide enough for the artifacts. The
          measure itself is unchanged; only the emptiness around it is. */}
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10">
        <div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-12 xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-x-16">
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
