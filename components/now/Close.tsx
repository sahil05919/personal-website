import Link from 'next/link';

import { archive, close } from '@/app/now/now-content';

import { Leaf, LeafRow, MarginNote } from './Leaf';

/**
 * THE CLOSE AND THE ARCHIVE.
 *
 * The page ends the way the book ends: a statement, a date, and the cadence
 * sentence kept word for word. It was the best line the old page had and it is
 * not being improved.
 *
 * The archive is a library date-stamp card. One stamp today, and it is the
 * current one — no dropdown, no greyed-out future seasons, no "coming soon".
 * An archive full of empty slots reads as abandoned, which is the mistake the
 * Questions page already made once and is not making again here. The card
 * grows only when a season is genuinely retired.
 *
 * This is what makes the page worth more over time rather than less. Every
 * other page loses value as it ages. This one is the only page on the site
 * that gains value by being wrong, provided the wrong version is kept.
 */
export function Close() {
  return (
    <Leaf className="px-6 pb-28 pt-20 md:px-10 md:pb-36 md:pt-28">
      <div className="mx-auto w-full max-w-[1400px]">
        <LeafRow note={<MarginNote>{close.date}</MarginNote>}>
          <div>
            <p className="max-w-[46rem] font-serif-display text-[2rem] font-normal leading-[1.1] tracking-[-0.03em] text-ink md:text-[3rem] lg:text-[3.5rem]">
              {close.line}
            </p>
            <p className="mt-8 max-w-[34rem] font-reading text-[1rem] leading-[1.8] text-graphite">
              {close.cadence}
            </p>
          </div>
        </LeafRow>

        <LeafRow className="mt-20 md:mt-28" note={<MarginNote>{archive.note}</MarginNote>}>
          <div className="max-w-[36rem]">
            <p className="font-reading text-[1rem] leading-[1.8] text-graphite">
              {archive.promise}
            </p>

            <ul className="m-0 mt-8 flex list-none flex-wrap gap-3 p-0">
              {archive.stamps.map((stamp) => {
                const label = (
                  <>
                    <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink">
                      {stamp.name}
                    </span>
                    <span className="mt-1 block font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-graphite">
                      {stamp.stamped}
                    </span>
                  </>
                );

                return (
                  <li key={stamp.name}>
                    {stamp.href ? (
                      <Link
                        href={stamp.href}
                        className="block border border-hairline px-4 py-3 transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                      >
                        {label}
                      </Link>
                    ) : (
                      <div
                        className="border border-hairline px-4 py-3"
                        aria-current={stamp.current ? 'page' : undefined}
                      >
                        {label}
                        {stamp.current && (
                          <span className="mt-2 block font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-through-line">
                            this entry
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </LeafRow>
      </div>
    </Leaf>
  );
}
