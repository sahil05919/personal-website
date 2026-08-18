'use client';

import { homeContent } from '@/data/homeContent';
import { gutter, shell, wide } from './rhythm';
import { homeContentHi } from '@/data/hinglish';
import { useVariant } from '@/hooks/use-reading-mode';

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
 * WHAT MOVED OUT
 *
 * The copyright and links row that used to sit below the terminus has gone to
 * components/global/Colophon.tsx, which now renders on every page. Home was
 * the only page on the site with an imprint; keeping a second copy here would
 * have printed it twice on the one page that already had it.
 *
 * What is left is the part that was only ever Home's: the line ending, and the
 * sentence it ends under.
 */
export default function Close() {
  const close = useVariant(
    homeContent.colophon.close,
    homeContentHi.colophon.close,
  );

  return (
    <section aria-label="Close" className="bg-paper text-ink">
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

        {/* Below the terminus the page is finished. The imprint that used to
            sit here now renders sitewide from components/global/Colophon.tsx,
            immediately below this section, so the sequence a reader sees is
            unchanged — it is simply no longer unique to Home. */}
        <div className="pb-[clamp(1.5rem,4vh,2.5rem)]" />
      </div>
    </section>
  );
}
