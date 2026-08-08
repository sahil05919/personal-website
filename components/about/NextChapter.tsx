'use client';

import Link from 'next/link';

import { aboutContent } from '@/data/profileContent';

/**
 * Formerly JourneyCTA. Three changes:
 *
 *  - Renamed, because "CTA" is the wrong idea for a page turn in a book.
 *  - "Chapter 02" removed. About's internal chapter labels (01 / 03 / 04) were
 *    deleted with the components that carried them; leaving 02 here would be
 *    the last survivor of a numbering system nothing else uses. Whether the
 *    device returns site-wide is still an open decision — see notes.
 *  - Motion removed. Hover colour inversion kept: it's a single link, and the
 *    whole-block hover is the one interaction on the page.
 *
 * Copy now states the events/patterns split explicitly, which is what makes
 * About and Journey different pages rather than two versions of one.
 */
export function NextChapter() {
  const { next } = aboutContent;

  return (
    <nav aria-label="Continue reading" className="border-t border-hairline">
      <Link
        href={next.href}
        className="group block w-full transition-colors duration-500 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-through-line"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-10 px-6 py-20 md:flex-row md:items-end md:px-12 md:py-24 lg:px-20">
          <div className="max-w-xl">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite transition-colors duration-500 group-hover:text-paper/60">
              {next.eyebrow}
            </p>
            <p className="font-serif-display text-3xl font-normal leading-[1.15] tracking-tight text-ink transition-colors duration-500 group-hover:text-paper md:text-4xl lg:text-5xl">
              {next.heading}
              <span className="block text-graphite transition-colors duration-500 group-hover:text-paper/70">
                {next.headingQuiet}
              </span>
            </p>
          </div>

          <div className="flex max-w-sm flex-col items-start gap-7 md:items-end md:text-right">
            <p className="font-reading text-base leading-[1.7] text-graphite transition-colors duration-500 group-hover:text-paper/70">
              {next.blurb}
            </p>

            <span className="flex items-center gap-4 text-ink transition-colors duration-500 group-hover:text-paper">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                {next.action}
              </span>
              <span aria-hidden="true" className="text-2xl font-light">
                &rarr;
              </span>
            </span>
          </div>
        </div>
      </Link>
    </nav>
  );
}
