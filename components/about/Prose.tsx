'use client';

import { motion } from 'framer-motion';

import type { EssayMode, EssayParagraph } from '@/data/profileContent';
import { MARGIN_NOTE, SHELL } from './layout';

/**
 * THE ESSAY.
 *
 * The words are locked. This component decides measure, scale and space.
 *
 * Quiet paragraphs sit in the reading column (35.5rem, offset 11.5rem). Loud
 * ones — display, stanza, turn — out-dent to the full 47rem block. The width
 * difference IS the emphasis: a display line is not merely bigger, it starts
 * further left, which the eye catches before it reads a word.
 *
 * TWO THINGS FOLLOW FROM OUT-DENTING, both of which were bugs in the first
 * pass at this layout:
 *
 *   1. The margin column is not free real estate for an out-dented paragraph —
 *      the paragraph is now standing in it. So a running head beside a display
 *      line collides with it. Notes therefore sit ABOVE out-dented paragraphs
 *      (with the site's cobalt rule, as on the Masthead) and beside quiet ones.
 *
 *   2. The through-line spine runs down the gutter at 10.25rem, which is inside
 *      an out-dented paragraph's box. So the spine is drawn per paragraph and
 *      only for the quiet ones. Consecutive quiet paragraphs extend through
 *      their trailing margin, so they read as one continuous rule; the rule
 *      then simply stops where the voice rises and resumes after. It is the
 *      boundary of the reading column, and it exists exactly where that column
 *      does.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">.
 */

const styles: Record<EssayMode, string> = {
  body:
    'font-reading text-ink text-[1.0625rem] leading-[1.72] md:text-[1.1875rem] md:leading-[1.72]',
  break:
    'font-reading text-ink text-[1.0625rem] leading-[1.72] md:text-[1.1875rem] md:leading-[1.72]',
  display:
    'font-serif-display text-ink font-normal tracking-[-0.02em] leading-[1.1] text-[1.75rem] md:text-[2.375rem] lg:text-[2.875rem]',
  stanza:
    'font-serif-display text-ink font-normal tracking-[-0.02em] leading-[1.3] text-[1.375rem] md:text-[1.875rem] lg:text-[2.125rem]',
  /* 2.5rem, not the display's 2.875rem. "I've never done that with my family."
     is 36 characters; at 46px that measures ~795px against a 752px block and
     wraps, stranding "family." on its own line. At 40px it holds as one line,
     which is the entire point of the sentence. */
  turn:
    'font-serif-display text-through-line font-normal tracking-[-0.02em] leading-[1.1] text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem]',
  close:
    'font-serif-display text-ink font-normal tracking-[-0.02em] leading-[1.25] text-[1.375rem] md:text-[1.75rem] lg:text-[2rem]',
};

/** Loud modes out-dent to the full block width, starting at the margin's left
 *  edge. Quiet modes stay in the reading column. */
const OUTDENT: Record<EssayMode, boolean> = {
  body: false,
  break: false,
  display: true,
  stanza: true,
  turn: true,
  close: false,
};

/** Space AFTER the paragraph. */
const spaces: Record<EssayMode, string> = {
  body: 'mb-7 md:mb-8',
  break: 'mb-14 md:mb-20',
  display: 'mb-14 md:mb-20',
  stanza: 'mb-14 md:mb-20',
  turn: 'mb-12 md:mb-14',
  close: 'mb-0',
};

/**
 * Segments start at top-0, not at the text's cap height: a 4px inset would
 * leave a visible break at every junction and turn a continuous rule into a
 * dashed one.
 *
 * How far the spine segment runs past the bottom of its paragraph. `body` is
 * followed by another quiet paragraph 2rem away (md:mb-8), so it bridges the
 * gap and the rule reads as continuous. `break` and `close` are followed by a
 * large gap or by nothing, so the segment stops at the text.
 */
const spineHeight: Partial<Record<EssayMode, string>> = {
  body: 'calc(100% + 2rem)',
  break: '100%',
  close: '100%',
};

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Prose({
  paragraphs,
  className = '',
}: {
  paragraphs: EssayParagraph[];
  className?: string;
}) {
  /** The cobalt cap belongs on the first segment that actually gets drawn,
   *  which is not necessarily the first paragraph — the coda opens on a stanza. */
  const firstSpine = paragraphs.findIndex(({ mode }) => !OUTDENT[mode]);

  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className={SHELL}>
        {paragraphs.map(({ mode, note, text }, index) => {
          const lines = text.split('\n');
          const outdented = OUTDENT[mode];
          const height = spineHeight[mode];

          return (
            <motion.div
              key={index}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className={`relative ${spaces[mode]}`}
            >
              {/* Spine segment — quiet paragraphs only, desktop only. */}
              {height ? (
                <span
                  aria-hidden="true"
                  style={{ height }}
                  className="absolute left-[10.25rem] top-0 hidden w-px bg-hairline lg:block"
                >
                  {index === firstSpine ? (
                    <span className="absolute left-0 top-0 h-14 w-px bg-through-line" />
                  ) : null}
                </span>
              ) : null}

              {/* Running head. Above the paragraph when it out-dents, because
                  the paragraph is standing in the margin column; beside it
                  otherwise. */}
              {note ? (
                outdented ? (
                  <p className="mb-5 flex items-center gap-4">
                    <span aria-hidden="true" className="h-px w-10 bg-through-line" />
                    <span className={MARGIN_NOTE}>{note}</span>
                  </p>
                ) : (
                  <p
                    className={`${MARGIN_NOTE} mb-4 lg:absolute lg:left-0 lg:top-[0.6rem] lg:mb-0 lg:w-[9rem] lg:text-right`}
                  >
                    {note}
                  </p>
                )
              ) : null}

              <p
                className={`${styles[mode]} ${
                  outdented
                    ? 'max-w-none lg:ml-0'
                    : 'max-w-[35.5rem] lg:ml-[11.5rem] lg:max-w-[35.5rem]'
                }`}
              >
                {lines.map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < lines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
