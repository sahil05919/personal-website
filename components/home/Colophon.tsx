import Link from 'next/link';

import { homeContent } from '@/data/homeContent';
import { gutter, shell, wide } from './rhythm';

/**
 * Colophon — the last page, and where the through-line stops.
 *
 * THE TERMINATION
 *
 * Fig. 01 resolves into a horizontal line, and that line turns down at its
 * left end to become the spine the whole page hangs from. This is that gesture
 * played backwards: the spine runs down past the last sentence, turns back to
 * horizontal, and stops on a butt end. The book opens on a line and closes on
 * one.
 *
 * The turn carries a hairline-to-cobalt gradient, mirroring the frontispiece's
 * cobalt-to-hairline descent. Those are the only two places outside the figure
 * where the through-line colour appears: where the line is born, and where it
 * ends. Everything between them is hairline, because everything between them
 * is structure rather than punctuation.
 *
 * THE COMPOSITION
 *
 * Two blocks, and the difference between them is the whole idea.
 *
 * The first block is the last thing the line accompanies. "Written in London.
 * Revised when it stops being true." is the authorial mark, so it is set in
 * Fraunces at display scale rather than in 11px mono — it was previously
 * indistinguishable from the copyright notice beneath it, which made the most
 * personal sentence on the page read as boilerplate.
 *
 * The second block sits BELOW the terminus, outside the text block entirely.
 * That is not decoration; it is what a colophon is. In a printed book the
 * production notice is set after the author has finished, and putting the
 * copyright and the links past the end of the line says the same thing without
 * a word of new copy: the record is over, and this is the imprint.
 *
 * The slashes between the imprint items are the page's own divider idiom,
 * already used in Currently. They turn four floating links into one line.
 *
 * Note this is Home's own close, not a site-wide footer. Every other page
 * currently ends without one, which remains a separate inconsistency.
 */
export default function Colophon() {
  const { close, links } = homeContent.colophon;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-paper text-ink">
      <div className={shell}>
        {/* ── The last block the line accompanies ─────────────────────────
            The generous top padding is doing real work: the mark needs to
            arrive after a silence, not after a gap. */}
        <div
          className={`${gutter} pt-[clamp(3.5rem,9vh,6rem)] pb-[clamp(2.25rem,5vh,3.5rem)]`}
        >
          <span aria-hidden="true" className="pointer-events-none">
            {/* The descent, ending exactly at this block's lower edge. */}
            <span className="absolute left-0 top-0 bottom-0 w-px bg-hairline" />

            {/* The turn. Starts on the spine, runs right, stops. Butt end,
                the same way every fragment in Fig. 01 ends. */}
            <span className="absolute bottom-0 left-0 h-px w-[clamp(4rem,11vw,7.5rem)] bg-gradient-to-r from-hairline to-through-line" />
          </span>

          <p
            className={`${wide} text-balance font-serif-display text-fluid-row font-normal text-ink`}
          >
            {close}
          </p>
        </div>

        {/* ── Past the end of the line ────────────────────────────────────
            No spine. Deliberately quieter than anything above it: 10px, wide
            tracking, graphite. This is the imprint, and an imprint is meant to
            be findable rather than read. */}
        <div className="pl-6 pt-[clamp(2.5rem,6vh,4rem)] pb-[clamp(3rem,7vh,5rem)] md:pl-10">
          <div className="flex flex-wrap items-center font-mono text-[10px] tracking-[0.08em] text-graphite">
            <span>&copy; {year} Sahil Kumar</span>

            {links.map((link) => (
              <span key={link.href} className="flex items-center">
                <span className="mx-3 text-hairline" aria-hidden="true">
                  /
                </span>

                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
                  >
                    {link.label}
                  </Link>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
