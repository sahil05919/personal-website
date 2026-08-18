'use client';

import { season, revisionCount } from '@/app/now/now-content';
import { seasonHi } from '@/data/hinglish';
import { useVariant } from '@/hooks/use-reading-mode';

/**
 * THE STAMP.
 *
 * The <h1> is the season, not the word "Now". "Summer 2026" is a memoir word;
 * "Now" is navigation, so it is demoted to the eyebrow where navigation
 * belongs. A reader arriving from the navbar still sees it; the page itself is
 * identified by the thing that will change.
 *
 * The date is set as a postmark rather than as metadata: mono, letterspaced,
 * ruled top and bottom, and tilted a fraction off true. It settles once on
 * load and then holds — the site's established motion discipline. Nothing on
 * this page loops.
 *
 * The revision count is real apparatus, in the Fig. 01 tradition: it counts
 * the crossings-out actually present in the entry below. If a revision is
 * added to the content file, this number changes on its own. It cannot lie.
 *
 * Server component. The settle is CSS, defined in globals.css, and it does not
 * run at all under prefers-reduced-motion.
 */
export function Stamp() {
  const copy = useVariant(season, seasonHi);

  return (
    <header className="px-6 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
      <div className="mx-auto w-full max-w-[62rem]">
        <div className="lg:grid lg:grid-cols-[9.5rem_minmax(0,46rem)] lg:gap-x-12">
          <div className="mb-8 lg:mb-0 lg:pt-3 lg:text-right">
            <span className="block font-mono text-[0.625rem] uppercase tracking-[0.24em] text-graphite">
              Now
            </span>
            <span className="mt-2 block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-graphite">
              {copy.entryNo}
            </span>
          </div>

          <div>
            <h1 className="max-w-[46rem] font-serif-display text-[3rem] font-normal leading-[0.95] tracking-[-0.03em] text-ink md:text-[4.5rem] lg:text-[5.5rem]">
              {copy.name}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="now-stamp inline-block border-y border-through-line/40 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-through-line">
                {copy.stamp}
              </p>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-graphite">
                {revisionCount} crossings-out kept
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
