'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { homeContent } from '@/data/homeContent';

/**
 * Contents — the through-line, turned vertical.
 *
 * The Fig. 01 line resolves horizontally in the Frontispiece; here the same
 * stroke runs down the left of the rows with one station per page. The line
 * deliberately overhangs the first and last stations, exactly as Fig. 01's
 * line extends past its terminal dots — a through-line continues past what
 * is currently visible.
 *
 * No row numbers. Numbering in editorial order would disagree with the navbar
 * and would reintroduce a labelling system the site is trying to shed. The
 * stations index the rows visually; nothing counts them.
 *
 * Stations are hollow by default and fill on hover. That is a colour change
 * only — nothing on this page moves on hover.
 */

const ROW_HEIGHT_CLASS = 'h-[1.95rem] md:h-[2.275rem]';

export default function Contents() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Contents"
      className="bg-paper text-ink px-6 md:px-8 pb-20 md:pb-28"
    >
      <div className="mx-auto max-w-2xl">
        <div className="relative">
          {/* The spine. Full height by design — see the overhang note above. */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[3.5px] w-[2px] bg-through-line"
          />

          <ul className="relative">
            {homeContent.contents.map((row, i) => (
              <motion.li
                key={row.href}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-hairline last:border-b-0"
              >
                <Link
                  href={row.href}
                  className="group grid grid-cols-[9px_1fr] gap-x-6 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
                >
                  {/* Station. Sits on the spine, vertically centred against the
                      first line of the row title. */}
                  <span
                    aria-hidden="true"
                    className={`flex items-center ${ROW_HEIGHT_CLASS}`}
                  >
                    <span className="h-[9px] w-[9px] rounded-full border-2 border-through-line bg-paper transition-colors duration-200 group-hover:bg-through-line" />
                  </span>

                  <div>
                    <h2
                      className={`font-serif-display font-medium text-[1.5rem] md:text-[1.75rem] leading-[1.3] tracking-[-0.01em] transition-colors duration-200 group-hover:text-through-line ${ROW_HEIGHT_CLASS} flex items-center`}
                    >
                      {row.title}
                    </h2>

                    {/* Empty until the page itself settles on an opening line.
                        The row is complete without it — an invented line here
                        would be new copy, which this section does not carry. */}
                    {row.invitation ? (
                      <p className="font-reading text-[0.9375rem] leading-[1.6] text-graphite mt-1">
                        {row.invitation}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
