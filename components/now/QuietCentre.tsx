import { quiet } from '@/app/now/now-content';

import { Leaf } from './Leaf';

/**
 * THE QUIET CENTRE.
 *
 * The caesura. No interaction, no photograph, no apparatus, no annotation, no
 * rule — the leaf's hairline deliberately breaks here, because a page whose
 * ruling runs unbroken through its own silence has not really stopped.
 *
 * It sits in the MIDDLE, not at the end. Before it the entry is about things
 * being made; after it the entry is about people and places. This line is the
 * turn between output and attention, so it does structural work rather than
 * providing a rest stop.
 *
 * It also earns the section that follows. The largest interaction on the page
 * arrives immediately after the longest pause on the site, which is the only
 * reason it lands. If the whole page moves, nothing on it is important.
 *
 * The left inset is 12.5rem — the margin column (9.5rem) plus the full gap
 * (3rem) — so the line starts exactly where every other main column starts.
 * It is NOT the 11rem rule offset, which is the mid-point of the gutter and
 * sits 24px to the left of the text above and below it.
 *
 * Vertical space is proportionally *greater* on mobile, not smaller. This is
 * the one place where a narrow viewport should feel more empty, not less.
 */
export function QuietCentre() {
  return (
    <Leaf ruled={false} className="px-6 py-40 md:px-10 md:py-48 lg:py-56">
      <div className="mx-auto w-full max-w-[62rem]">
        <div className="lg:pl-[12.5rem]">
          <p className="max-w-[46rem] font-serif-display text-[2.25rem] font-normal leading-[1.05] tracking-[-0.03em] text-ink md:text-[3.5rem] lg:text-[4.25rem]">
            {quiet.line}
          </p>
          <p className="mt-10 max-w-[30rem] font-reading text-[1.0625rem] leading-[1.75] text-graphite md:text-[1.1875rem]">
            {quiet.under}
          </p>
          <p className="mt-10 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-graphite">
            {quiet.attribution}
          </p>
        </div>
      </div>
    </Leaf>
  );
}
