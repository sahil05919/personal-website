'use client';

import { motion } from 'framer-motion';

import { aboutContent } from '@/data/profileContent';

/**
 * THE ESSAY.
 *
 * The words are locked and continuous. What changed is that the type now
 * pulses. Certain paragraphs are set at DISPLAY scale in Fraunces, in the
 * normal reading flow, so the page breathes between intimate body text and
 * large statements.
 *
 * This is the editorial move I failed to make last time: a magazine sets one
 * paragraph enormous and the rest small, and the contrast is what creates
 * presence. Uniform type has no loud, therefore no quiet.
 *
 * Five moments get display treatment:
 *   0  the opening line          — an opening should arrive
 *   4  the cost                  — the page's one unflattering admission
 *   9  the optimise stanza       — four flat declarations, building
 *   10 the turn                  — the reversal, in cobalt
 *   12 the last line             — ends unresolved
 *
 * Everything else is Newsreader at reading measure.
 */

type Mode = 'body' | 'display' | 'stanza' | 'turn' | 'close';

const RHYTHM: Record<number, { mode: Mode; space: string }> = {
  0: { mode: 'display', space: 'mb-20 md:mb-28' },
  3: { mode: 'body', space: 'mb-20 md:mb-28' },
  4: { mode: 'display', space: 'mb-20 md:mb-28' },
  9: { mode: 'stanza', space: 'mb-28 md:mb-40' },
  10: { mode: 'turn', space: 'mb-16 md:mb-20' },
  12: { mode: 'close', space: 'mb-0' },
};

const DEFAULT = { mode: 'body' as Mode, space: 'mb-8 md:mb-9' };

const styles: Record<Mode, string> = {
  body:
    'font-reading text-ink text-[1.0625rem] leading-[1.75] md:text-[1.1875rem] md:leading-[1.8]',
  display:
    'font-serif-display text-ink font-normal tracking-[-0.02em] leading-[1.08] text-[1.875rem] md:text-[2.75rem] lg:text-[3.25rem]',
  stanza:
    'font-serif-display text-ink font-normal tracking-[-0.02em] leading-[1.25] text-[1.5rem] md:text-[2.25rem] lg:text-[2.5rem]',
  turn:
    'font-serif-display text-through-line font-normal tracking-[-0.02em] leading-[1.1] text-[1.875rem] md:text-[2.75rem] lg:text-[3.25rem]',
  close:
    'font-serif-display text-ink font-normal tracking-[-0.02em] leading-[1.15] text-[1.5rem] md:text-[2rem] lg:text-[2.25rem]',
};

/** Display moments break the reading measure. Body text does not. */
const widths: Record<Mode, string> = {
  body: 'max-w-[36rem]',
  display: 'max-w-[46rem]',
  stanza: 'max-w-[46rem]',
  turn: 'max-w-[46rem]',
  close: 'max-w-[40rem]',
};

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Prose() {
  const paragraphs = aboutContent.body.trim().split(/\n\s*\n/);

  return (
    <section className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-[1400px]">
        {/*
          The through-line. A hairline running the height of the essay with a
          cobalt cap at the top — the site's own spine motif, which appeared
          nowhere on the previous build despite the design system being named
          after it. Desktop only; on mobile it would crowd the measure.
        */}
        <div className="relative lg:pl-[7.5rem]">
          <div
            aria-hidden="true"
            className="absolute left-[3.25rem] top-2 hidden h-full w-px bg-hairline lg:block"
          >
            <span className="absolute left-0 top-0 h-16 w-px bg-through-line" />
          </div>

          {paragraphs.map((paragraph, index) => {
            const { mode, space } = RHYTHM[index] ?? DEFAULT;
            const lines = paragraph.split('\n');

            return (
              <motion.p
                key={index}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className={`${styles[mode]} ${widths[mode]} ${space}`}
              >
                {lines.map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < lines.length - 1 && <br />}
                  </span>
                ))}
              </motion.p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
