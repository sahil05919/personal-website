'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { contactContent } from '@/data/contactData';

/**
 * ClosingSignature — the mark, the place, and the way back.
 *
 * MOTION. Everything else on this page rises into position. The signature is
 * the one element that comes down: y -10 to 0, slower than anything above it,
 * and delayed past the last line of the note. It settles onto the page rather
 * than arriving on it. That inversion is the whole gesture and it should not
 * be decorated further.
 *
 * The return link is structural, not a call to action. Contact is the only
 * page with nowhere onward, and the way onward is page one — which turns the
 * site from a corridor into a ring. next/link rather than <a>, so the return
 * is a client transition and the book does not reload to go back to its first
 * page.
 *
 * No footer follows this. The page ends where the person does.
 */

const SETTLE_EASE = [0.22, 1, 0.36, 1] as const;
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const SWEEP =
  'transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';

export default function ClosingSignature() {
  const prefersReducedMotion = useReducedMotion();
  const { signature, place, returnLabel } = contactContent.close;

  const settle: Variants = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: SETTLE_EASE },
    },
  };

  const rise: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.35, ease: REVEAL_EASE },
    },
  };

  return (
    <section
      aria-label="Signature"
      className="px-6 md:px-8 pt-28 md:pt-40 pb-24 md:pb-32"
    >
      <motion.div
        initial={prefersReducedMotion ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <motion.div variants={settle}>
          <p className="font-mono text-[11px] tracking-[0.08em] text-graphite">
            {signature}
          </p>
          <p className="mt-1 font-mono text-[11px] tracking-[0.08em] text-graphite/70">
            {place}
          </p>
        </motion.div>

        <motion.p variants={rise} className="mt-16 md:mt-20">
          <Link
            href="/"
            className="group relative inline-block font-mono text-[11px] tracking-[0.08em] text-graphite transition-colors duration-500 hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[0.5em] focus-visible:outline-through-line motion-reduce:transition-none"
          >
            <span className="relative z-10">
              {returnLabel}
              <span
                aria-hidden="true"
                className={`ml-2 inline-block group-hover:translate-x-[3px] ${SWEEP}`}
              >
                &rarr;
              </span>
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -bottom-[0.55em] h-px bg-hairline"
            />
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 -bottom-[0.55em] h-px origin-left scale-x-0 bg-ink group-hover:scale-x-100 group-focus-visible:scale-x-100 ${SWEEP}`}
            />
          </Link>
        </motion.p>
      </motion.div>
    </section>
  );
}
