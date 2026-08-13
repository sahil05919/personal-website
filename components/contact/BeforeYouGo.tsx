'use client';

import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { contactContent } from '@/data/contactData';
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';

/**
 * BeforeYouGo — the last thing on the record, behind one deliberate click.
 *
 * WHY IT IS CLOSED. Everything else on this site is offered immediately. This
 * is the only thing a reader has to decide to open, which is what makes it
 * feel handed over rather than published. It is also the honest structure: a
 * note you leave for whoever gets to the end should not be shouted at people
 * who are only here for an email address.
 *
 * The reveal is a disclosure, not a modal: real <button>, aria-expanded,
 * aria-controls, and the note sits in DOM order immediately after the control
 * so a keyboard user simply tabs into it.
 *
 * THE RULE. Opening draws a hairline across the measure before the first line
 * lands — the same letterhead device the channel rows use, reused as a sheet
 * being started rather than a door being chosen. That echo is the reason this
 * section belongs to this page rather than being a clever widget.
 *
 * ESCALATION. The first three lines are set as reading prose. The fourth
 * steps up into Fraunces at display scale, because it is the one the page
 * exists to deliver and it should arrive at a different volume.
 *
 * Reduced motion: the note opens complete, in place, with no stagger. The
 * click still does what it says.
 */

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const SWEEP =
  'transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';

export default function BeforeYouGo() {
  const prefersReducedMotion = useReducedMotionSafe();
  const [open, setOpen] = useState(false);
  const { eyebrow, prompt, action, lines } = contactContent.lastNote;

  const noteGroup: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: prefersReducedMotion ? 0 : 0.45,
        staggerChildren: prefersReducedMotion ? 0 : 0.5,
      },
    },
  };

  const noteLine: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.85,
        ease: REVEAL_EASE,
      },
    },
  };

  return (
    <section aria-label="Before you go" className="px-6 md:px-8">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: REVEAL_EASE }}
        className="mx-auto max-w-2xl"
      >
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-graphite">
          {eyebrow}
        </p>

        <p className="mt-6 max-w-[32rem] font-serif-display font-normal text-fluid-claim leading-[1.28] text-ink text-balance">
          {prompt}
        </p>

        <AnimatePresence initial={false}>
          {!open && (
            <motion.div
              key="control"
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -6, transition: { duration: 0.35 } }
              }
              className="mt-8"
            >
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="last-note"
                className="group relative inline-block font-mono text-[12px] tracking-[0.08em] uppercase text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[0.5em] focus-visible:outline-through-line"
              >
                <span className="relative z-10">
                  {action}
                  <span
                    aria-hidden="true"
                    className={`ml-2 inline-block group-hover:translate-x-[3px] ${SWEEP}`}
                  >
                    &rarr;
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -bottom-[0.5em] h-px bg-hairline"
                />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 -bottom-[0.5em] h-px origin-left scale-x-0 bg-ink group-hover:scale-x-100 group-focus-visible:scale-x-100 ${SWEEP}`}
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div id="last-note">
          <AnimatePresence>
            {open && (
              <motion.div
                key="note"
                initial={prefersReducedMotion ? false : 'hidden'}
                animate="show"
                variants={noteGroup}
                className="mt-10 md:mt-12"
              >
                <motion.div
                  aria-hidden="true"
                  className="h-px w-full origin-left bg-hairline"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.7,
                    ease: REVEAL_EASE,
                  }}
                />

                <div className="mt-10 md:mt-12">
                  {lines.map((line, i) =>
                    i === lines.length - 1 ? (
                      <motion.p
                        key={line.slice(0, 24)}
                        variants={noteLine}
                        className="mt-10 md:mt-12 font-serif-display text-[1.5rem] md:text-[1.875rem] leading-[1.35] tracking-[-0.01em] text-ink text-balance"
                      >
                        {line}
                      </motion.p>
                    ) : (
                      <motion.p
                        key={line.slice(0, 24)}
                        variants={noteLine}
                        className="mt-6 first:mt-0 font-reading text-[1.0625rem] md:text-[1.1875rem] leading-[1.75] text-ink"
                      >
                        {line}
                      </motion.p>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
