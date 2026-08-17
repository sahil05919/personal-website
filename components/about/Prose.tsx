'use client';

import { ChapterOpening } from '@/components/type/ChapterOpening';
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

/**
 * THE LEDGER — movement IV, and the only paragraph on this page not set as a
 * paragraph.
 *
 * The stanza is four sentences that begin the same way ("I optimise work. / I
 * optimise projects. / I optimise decisions. / I optimise the way I organise
 * my time, my notes and sometimes even my weekends.") and the line that
 * follows it is "I've never done that with my family."
 *
 * Set as four <br />-separated lines in a single block — which is what this
 * was — the reversal has to do all its own work in the reading, because
 * nothing on the page has drawn the pattern it reverses. The sentence means:
 * I keep a ledger for everything except this. So the four are drawn as a
 * ledger — ruled rows sharing one left edge, bracketed by a vertical rule —
 * and the turn that follows (rendered by the ordinary `turn` mode, unchanged)
 * sits OUTSIDE that bracket, further left, in cobalt, with no rule above it,
 * beneath it or beside it. The entry that was never made.
 *
 * The idiom is not imported for this. /about opens on a ledger: the front
 * matter at the head of the page is already hairline rows with values in
 * Fraunces. The climax answers the page's own first section rather than
 * introducing a new language nine paragraphs in.
 *
 * The rules draw in, left to right, one after another — the only reason this
 * block carries motion at all. A ledger being ruled, and then a line that
 * never gets one. `scaleX`/`scaleY` are transform keys, so MotionConfig's
 * reducedMotion="user" (app/layout.tsx) renders every rule at full length
 * instantly and the composition survives intact.
 *
 * NOT A TABLE, and deliberately not numbered: indices down the left would
 * turn four sentences into a checklist, which is a joke this page does not
 * make about itself.
 */
function Ledger({ lines, className }: { lines: string[]; className: string }) {
  return (
    <div className="relative pl-6 md:pl-9">
      {/* The bracket. Spans the entries and stops with them — the turn below
          begins to the left of where this rule sits. */}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-px origin-top bg-hairline"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {lines.map((line, index) => (
        <div key={index} className="relative py-3 md:py-4">
          <p className={className}>{line}</p>

          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-px origin-left bg-hairline"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: 0.15 + index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function Prose({
  paragraphs,
  dropCap = false,
  className = '',
}: {
  paragraphs: EssayParagraph[];
  /**
   * Set a drop cap on this block's first quiet paragraph.
   *
   * OFF by default and set only on the opening. This component renders twice
   * on /about — once for `essay.opening` and once for `essay.coda` — so a cap
   * decided purely from the paragraph list gave the page TWO of them, one at
   * the essay's start and one after the Marginalia. Verified by counting them
   * in the rendered page, not by reading the code.
   *
   * The coda is a continuation of the same essay across an interruption, not a
   * new chapter, and a second capital announces a beginning that is not there.
   */
  dropCap?: boolean;
  className?: string;
}) {
  /** The cobalt cap belongs on the first segment that actually gets drawn,
   *  which is not necessarily the first paragraph — the coda opens on a stanza. */
  const firstSpine = paragraphs.findIndex(({ mode }) => !OUTDENT[mode]);

  /**
   * Which paragraph carries the drop cap: the first quiet, single-line one —
   * i.e. the first run of ordinary reading prose. Display lines, the turn and
   * the ledger are all excluded, so the cap can never land on something already
   * set at display scale.
   *
   * -1 when there is no such paragraph, in which case nothing gets a cap. The
   * coda opens on a stanza and correctly gets none.
   */
  const capIndex = dropCap
    ? paragraphs.findIndex(
        ({ mode, text }) =>
          (mode === 'body' || mode === 'break') && !text.includes('\n'),
      )
    : -1;

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

              {mode === 'stanza' ? (
                <Ledger lines={lines} className={styles[mode]} />
              ) : index === capIndex ? (
                /*
                  The essay's opening, and the only drop cap on this page.

                  About was the last long chapter without one. It is also the
                  most carefully set page on the site, so the cap goes on the
                  FIRST QUIET PARAGRAPH ONLY — never on a display line, a turn
                  or the ledger, where a three-line capital would be a second
                  display treatment arguing with the one already there.

                  `lines.join('\n')` is safe here because ChapterOpening only
                  ever receives a paragraph that has no internal break: the
                  multi-line paragraphs on this page are the stanza and the
                  turn, and both are excluded by `capIndex`.
                */
                <ChapterOpening
                  text={lines.join('\n')}
                  className={`${styles[mode]} max-w-[35.5rem] lg:ml-[11.5rem] lg:max-w-[35.5rem]`}
                />
              ) : (
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
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
