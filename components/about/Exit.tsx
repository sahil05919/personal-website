'use client';

import Link from 'next/link';

import { aboutContent } from '@/data/profileContent';

/**
 * THE PAGE TURN.
 *
 * The full-bleed hover inversion from the old JourneyCTA, which was one of the
 * genuinely good pieces of craft on the previous site. Kept, retokenised to
 * Through-Line, and stripped of the "Chapter 02" label — About's internal
 * chapter numbers (01 / 03 / 04) went with the components that carried them,
 * and leaving 02 here would strand the last survivor of a scheme nothing
 * else uses.
 */
export function Exit() {
  const { exit } = aboutContent;

  return (
    <nav aria-label="Continue reading" className="border-t border-hairline">
      <Link
        href={exit.href}
        className="group block w-full transition-colors duration-500 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-through-line"
      >
        <div className="mx-auto flex w-full max-w-[1400px] flex-col justify-between gap-12 px-6 py-24 md:flex-row md:items-end md:px-10 md:py-32">
          <div className="max-w-2xl">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-graphite transition-colors duration-500 group-hover:text-paper/60">
              {exit.eyebrow}
            </p>
            <p
              className="font-serif-display font-normal leading-[1.02] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-paper"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
            >
              {exit.heading}
              <span className="block text-graphite transition-colors duration-500 group-hover:text-paper/70">
                {exit.headingQuiet}
              </span>
            </p>
          </div>

          <div className="flex max-w-sm flex-col items-start gap-8 md:items-end md:text-right">
            <p className="font-reading text-base leading-[1.75] text-graphite transition-colors duration-500 group-hover:text-paper/70">
              {exit.blurb}
            </p>

            <span className="flex items-center gap-4 text-ink transition-colors duration-500 group-hover:text-paper">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                {exit.action}
              </span>
              <span
                aria-hidden="true"
                className="text-3xl font-light transition-transform duration-500 group-hover:translate-x-3"
              >
                &rarr;
              </span>
            </span>
          </div>
        </div>
      </Link>
    </nav>
  );
}
