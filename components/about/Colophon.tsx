import Link from 'next/link';

import { aboutContent } from '@/data/profileContent';

/**
 * The colophon.
 *
 * Everything administrative moved here, after the essay and after the silence,
 * where it cannot interrupt. Set small, mono, graphite, at the same measure as
 * the prose, stacked in one narrow column.
 *
 * No hairline rule above it. Every divider on the previous page was doing a job
 * that space does better, and a page with no sections doesn't need section
 * boundaries.
 */
export function Colophon() {
  const { revision, colophon, exit } = aboutContent;

  return (
    <footer className="px-6 pb-32 md:px-12 lg:px-20">
      <div className="mx-auto w-full max-w-[38rem]">
        <div className="space-y-2 font-mono text-[11px] leading-[1.9] text-graphite">
          <p>{revision.written}</p>
          <p>{revision.promise}</p>
        </div>

        <div className="mt-10 space-y-2 font-mono text-[11px] leading-[1.9] text-graphite">
          {colophon.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        {/*
          The exit. One line. No eyebrow, no arrow glyph, no hover colour
          inversion, no bordered block. The reader is leaving a room, not
          clicking a call to action.

          The underline offset is the only decoration on the page, and it is
          there because a link the reader can't identify is a usability failure,
          not restraint.
        */}
        <p className="mt-16 font-reading text-[1.0625rem] leading-[1.75] text-graphite md:text-[1.25rem]">
          <Link
            href={exit.href}
            className="text-ink underline decoration-hairline decoration-1 underline-offset-[6px] transition-colors duration-300 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
          >
            {exit.label}
          </Link>
          {` — ${exit.line}`}
        </p>
      </div>
    </footer>
  );
}
