'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { homeContent } from '@/data/homeContent';
import { destinations } from '@/data/navigation';
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';
import Column from './Column';
import { PageMark } from './PageMark';
import { full, measure, sectionY } from './rhythm';

/**
 * Contents — the through-line, stationed.
 *
 * The rows are no longer listed here. Order and labels come from
 * data/navigation.ts, which the navbar and the Wayfinder also read, so the
 * three can no longer disagree — they used to: the navbar ran About → Journey
 * → Experience, this list ran Journey → Media → Questions, and one said
 * "Question" while the other said "Questions".
 *
 * homeContent now supplies only the invitations, keyed by route. Each is that
 * page's own opening line, copied across verbatim. A row without one renders
 * without one; nothing is invented to fill the gap.
 *
 * The stations sit ON the spine, out in the gutter, not inside the measure.
 * This section draws no line of its own — the line is already there, running
 * down from the figure, and the stations are simply the points on it where
 * something is written.
 *
 * Nothing on this page moves on hover. The station fills, the title takes the
 * through-line colour, and the row's mark takes it with them; that is a colour
 * change and nothing else.
 *
 * THE MARKS. Each row carries a miniature of the destination page's own visual
 * motif — see components/home/PageMark.tsx for what each one is and why it is
 * that and not an icon. They sit at the right end of the title's line, in the
 * slack the row already had, so the reading column is unchanged and the marks
 * form their own column down the right-hand edge. They inherit the row's
 * colour rather than carrying their own, which is what keeps the hover a
 * single gesture instead of a second thing happening.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Contents() {
  const prefersReducedMotion = useReducedMotionSafe();

  return (
    <section aria-labelledby="contents-heading" className="bg-paper text-ink">
      <Column className={sectionY}>
        <h2
          id="contents-heading"
          className="font-mono text-apparatus uppercase text-graphite"
        >
          Contents
        </h2>

        <ul className={`${full} mt-7`}>
          {destinations.map((destination, i) => {
            const invitation = homeContent.invitations[destination.href];

            return (
              <motion.li
                key={destination.href}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : i * 0.04,
                  ease: EASE,
                }}
                className="relative border-b border-hairline last:border-b-0"
              >
                <Link
                  href={destination.href}
                  className="group block py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
                >
                  {/* Out in the gutter, centred on the spine. The negative
                      inset matches the gutter width exactly; the em-based
                      height keeps it on the title's first line at every
                      viewport, because the title size is fluid. */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-6 top-5 flex h-[1.25em] -translate-x-1/2 items-center text-fluid-row md:-left-10"
                  >
                    <span className="h-[7px] w-[7px] rounded-full border border-hairline bg-paper transition-colors duration-200 group-hover:border-through-line group-hover:bg-through-line" />
                  </span>

                  <div className="flex items-center justify-between gap-6">
                    <h3 className="font-serif-display text-fluid-row font-medium transition-colors duration-200 group-hover:text-through-line">
                      {destination.label}
                    </h3>

                    {/* Apparatus weight at rest — graphite at 45% sits below
                        the invitation line beneath it, which is where a mark
                        belongs relative to writing. It resolves to the
                        through-line on hover alongside the title and the
                        station. */}
                    <span className="text-graphite/45 transition-colors duration-200 group-hover:text-through-line">
                      <PageMark href={destination.href} />
                    </span>
                  </div>

                  {invitation ? (
                    <p
                      className={`${measure} mt-1.5 font-reading text-fluid-aside text-balance text-graphite`}
                    >
                      {invitation}
                    </p>
                  ) : null}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </Column>
    </section>
  );
}
