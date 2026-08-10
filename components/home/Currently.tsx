import Link from 'next/link';

import Column from './Column';
import { measure } from './rhythm';

/**
 * Currently — proof the record is alive.
 *
 * Still takes its text as props on purpose. This component must never hold a
 * copy of a line /now already owns; app/page.tsx passes it in from
 * app/now/now-content.ts, so the season is written in exactly one file.
 *
 * WHAT CHANGED, AND WHY
 *
 * Every element in the ending used to be set at the same 11px mono: the label,
 * the season, the link, the date, the signature, the copyright. Six things
 * doing four different jobs in one register, which is the definition of
 * footer chrome — the eye cannot tell what to read first because nothing is
 * first.
 *
 * Three levels now:
 *
 *   CURRENTLY            apparatus. A margin label, not content.
 *   the season line      Newsreader, reading scale. The only sentence in the
 *                        ending that is alive, and the only one that will be
 *                        untrue in three months. It should look like writing.
 *   the link and stamp   apparatus again, subordinate to what it annotates.
 *
 * The season line is the same string it was; nothing here is new copy. The
 * slash that used to sit between the label and the season is gone, because the
 * two are now on separate lines in different faces and a divider between them
 * would be punctuating a break the layout has already made. The slash between
 * the link and the date stays — those two remain one line.
 *
 * The spine runs straight through, unbroken, on its way to the close.
 */
interface CurrentlyProps {
  /** One line, lifted verbatim from the Now data source. Keep it short. */
  line: string;
  /** The Now page's own last-updated stamp. Never hand-set here. */
  updated: string;
}

export default function Currently({ line, updated }: CurrentlyProps) {
  return (
    <section aria-label="Currently" className="bg-paper text-ink">
      <Column className="pt-[clamp(1.75rem,4vh,3rem)] pb-[clamp(1.5rem,3.5vh,2.5rem)]">
        <p className="font-mono text-apparatus uppercase text-graphite">
          Currently
        </p>

        <p
          className={`${measure} mt-3 text-pretty font-reading text-fluid-read text-ink`}
        >
          {line}
        </p>

        <p className="mt-4 font-mono text-apparatus text-graphite">
          <Link
            href="/now"
            className="underline decoration-hairline underline-offset-4 transition-colors hover:text-through-line hover:decoration-through-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
          >
            What I&apos;m doing now
          </Link>
          <span className="mx-2 text-hairline" aria-hidden="true">
            /
          </span>
          Updated {updated}
        </p>
      </Column>
    </section>
  );
}
