'use client';

import { useState } from 'react';

import type { Fragment } from '@/app/now/now-content';

/**
 * THE PILE.
 *
 * Loose paper on a desk, most of it unfinished. Each leaf shows only its
 * opening line; picking one up opens it in place and pushes the rest down.
 * One at a time, because a person reads one page at a time — and because a
 * stack with four sheets open is not a stack.
 *
 * Why this interaction is earned: what it reveals is real writing that stops
 * where the writing actually stopped, not a teaser for something published
 * elsewhere. What it conceals is only the rest of the pile, which stays
 * visible as a pile. A notebook containing only finished articles is a
 * bibliography with a cover; a notebook containing unfinished things is a
 * notebook.
 *
 * Closed leaves are compressed and open ones are generous, so the pile reads
 * as a pile through spacing rather than through fake paper edges, drop
 * shadows or rotation. The site has no skeuomorphism anywhere else and is not
 * acquiring any here.
 *
 * The height transition uses grid-template-rows 0fr → 1fr, so the panel
 * animates to its natural height with no measurement, no ResizeObserver and no
 * max-height guess that clips a long fragment. Under prefers-reduced-motion it
 * simply snaps.
 */
export function Pile({ fragments }: { fragments: readonly Fragment[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="m-0 max-w-[40rem] list-none border-t border-hairline p-0">
      {fragments.map((fragment) => {
        const isOpen = openId === fragment.id;

        return (
          <li key={fragment.id} className="border-b border-hairline">
            <h4 className="m-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`leaf-${fragment.id}`}
                onClick={() => setOpenId(isOpen ? null : fragment.id)}
                className={`group/leaf flex w-full items-baseline gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper motion-safe:transition-[padding] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? 'py-7' : 'py-4'
                }`}
              >
                <span className="w-[3.25rem] shrink-0 font-mono text-[0.625rem] uppercase leading-[1.9] tracking-[0.14em] text-graphite">
                  {fragment.dated}
                </span>
                <span
                  className={`font-reading text-[1.0625rem] leading-[1.6] text-ink md:text-[1.125rem] ${
                    isOpen ? '' : 'group-hover/leaf:text-ink/70'
                  } motion-safe:transition-colors motion-safe:duration-300`}
                >
                  {fragment.opening}
                </span>
              </button>
            </h4>

            <div
              id={`leaf-${fragment.id}`}
              role="region"
              aria-label={fragment.opening}
              /* A closed leaf is zero-height and transparent, but it is still
                 in the DOM so it can animate. Without `inert` its text stays
                 in the accessibility tree and in the tab order, so a screen
                 reader would read all three fragments in full while reporting
                 aria-expanded="false" on each. `inert` removes it from both
                 without removing it from the layout, which `hidden` would —
                 and `hidden` would also kill the transition. */
              inert={!isOpen}
              className={`grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-9 pl-0 pr-2 sm:pl-[4.25rem]">
                  {fragment.body.map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-5 font-reading text-[1rem] leading-[1.8] text-graphite last:mb-0 md:text-[1.0625rem]"
                    >
                      {paragraph}
                    </p>
                  ))}

                  <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-graphite/70">
                    stops here
                  </p>

                  {fragment.became && (
                    <a
                      href={fragment.became.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-rule mt-4 inline-block font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink"
                    >
                      {fragment.became.label} →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
