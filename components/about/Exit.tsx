'use client';

import Link from 'next/link';

import { aboutContent } from '@/data/profileContent';
import { aboutExitHi } from '@/data/hinglish';
import { useVariant } from '@/hooks/use-reading-mode';
import { SHELL } from './layout';

/**
 * THE PAGE TURN.
 *
 * The full-bleed hover inversion from the old JourneyCTA — one of the genuinely
 * good pieces of craft on the previous site. The inversion stays full-bleed;
 * only the content inside it moves onto the shared manuscript block, so its
 * left edge lines up with every other section on the page instead of sitting
 * on a 1400px canvas of its own.
 *
 * It follows the essay's last line directly. Nothing sits between the family
 * admission and the turn to Journey.
 */
export function Exit() {
  /* `href` is not translated and must not be: it is a route. The Hinglish object
     deliberately omits it, so its copy is spread OVER the English object rather
     than replacing it — which also means a partially written Hinglish block
     falls back field by field instead of all or nothing. */
  const copy = useVariant<Partial<typeof aboutExitHi>>({}, aboutExitHi);
  const exit = { ...aboutContent.exit, ...copy };

  return (
    <nav aria-label="Continue reading" className="border-t border-hairline">
      <Link
        href={exit.href}
        className="group block w-full transition-colors duration-500 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-through-line"
      >
        <div className={`${SHELL} py-20 md:py-24`}>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-graphite transition-colors duration-500 group-hover:text-paper/60">
            {exit.eyebrow}
          </p>

          <p
            className="font-serif-display font-normal leading-[1.04] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-paper"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
          >
            {exit.heading}
            <span className="block text-graphite transition-colors duration-500 group-hover:text-paper/70">
              {exit.headingQuiet}
            </span>
          </p>

          <div className="mt-12 flex flex-col gap-8 border-t border-hairline pt-6 transition-colors duration-500 group-hover:border-paper/20 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[26rem] font-reading text-[0.9375rem] leading-[1.7] text-graphite transition-colors duration-500 group-hover:text-paper/70">
              {exit.blurb}
            </p>

            <span className="flex items-center gap-4 text-ink transition-colors duration-500 group-hover:text-paper">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                {exit.action}
              </span>
              <span
                aria-hidden="true"
                className="text-2xl font-light transition-transform duration-500 group-hover:translate-x-3"
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
