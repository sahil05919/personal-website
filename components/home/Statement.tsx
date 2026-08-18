'use client';

import { homeContent } from '@/data/homeContent';
import Column from './Column';
import { measure, sectionY, wide } from './rhythm';
import { homeContentHi } from '@/data/hinglish';
import { useVariant } from '@/hooks/use-reading-mode';

/**
 * Statement — what this site is, in the author's voice.
 *
 * Server component, and still deliberately unanimated. Prose that fades in on
 * scroll reads as a slide; this is the one passage on the page that has to
 * arrive as writing rather than as an effect.
 *
 * What changed: the measure. This was set at 42rem, which at the reading size
 * runs to roughly seventy characters — wide enough that the eye loses the line
 * return on a laptop. It now reads at 36rem, matching the About essay, and the
 * claim breaks out to 46rem because a display line held to the body measure
 * looks trapped rather than emphatic.
 *
 * The scale break is unchanged and is the point: Fraunces at display size
 * inside a Newsreader passage marks the sentence as the page's assertion
 * rather than as the end of a paragraph.
 */
export default function Statement() {
  const { beats, claim, coda } = useVariant(
    homeContent.statement,
    homeContentHi.statement,
  );

  return (
    <section aria-label="What this is" className="bg-paper text-ink">
      <Column className={sectionY}>
        <div
          className={`${measure} space-y-6 font-reading text-fluid-read text-pretty`}
        >
          {beats.map((beat, i) => (
            <p key={i}>{beat}</p>
          ))}
        </div>

        <p
          className={`${wide} mt-[clamp(2.5rem,6vh,3.5rem)] text-balance font-serif-display text-fluid-claim font-normal`}
        >
          {claim}
        </p>

        <p className={`${measure} mt-4 font-reading text-fluid-aside text-graphite`}>
          {coda}
        </p>
      </Column>
    </section>
  );
}
