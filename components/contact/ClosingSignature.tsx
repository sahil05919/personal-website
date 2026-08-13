'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { contactContent } from '@/data/contactData';
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';

/**
 * ClosingSignature — the mark, the place, the closure, and the way back.
 *
 * MOTION. Everything else on this page rises into position. The signature is
 * the one element that comes down: y -10 to 0, slower than anything above it,
 * and delayed past the last line of the note. It settles onto the page rather
 * than arriving on it.
 *
 * The return link is structural, not a call to action. Contact is the only
 * page with nowhere onward, and the way onward is page one — which turns the
 * site from a corridor into a ring. next/link rather than <a>, so the return
 * is a client transition and the book does not reload to go back to its first
 * page.
 *
 * THE CLOSURE. That ring was asserted in this comment for three revisions and
 * never drawn. It is now the last mark on the site.
 *
 * The site's line has a birth and a death already: Fig. 01 resolves eighteen
 * fragments into one stroke, that stroke turns down the left edge of Home, and
 * Home's colophon turns it back to horizontal and stops it on a butt end. Both
 * moments carry the through-line colour and nothing between them does. What
 * was missing is the third state — the line that does not end but closes.
 *
 * So: a stroke descends, curls, and comes back to the exact point the descent
 * finished. One path, drawn in one continuous pass, ending where it began. A
 * cobalt point sits at the join, in the same register the colophon's terminus
 * uses, and arrives only once the line has actually closed.
 *
 * It is drawn with `pathLength`, which is NOT one of framer-motion's
 * positional keys (verified against the installed motion-dom source), so
 * MotionConfig's reducedMotion="user" would not snap it the way it snaps
 * transforms elsewhere. Reduced motion is therefore handled by hand here:
 * the finished ring, no draw, no point animation.
 *
 * Slower than anything else on the site — two full seconds. It is the last
 * thing that happens, there is nothing after it to hold up, and a line
 * closing itself in half a second reads as a spinner.
 *
 * No footer follows this. The page ends where the person does.
 */

const SETTLE_EASE = [0.22, 1, 0.36, 1] as const;
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const SWEEP =
  'transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';

/**
 * The closure mark.
 *
 * One path: down from the top, then a full circle described as two arcs,
 * finishing at the coordinate the descent finished at. The two-arc form is
 * used rather than a <circle> because a circle element has no start point,
 * and the whole meaning here is that the stroke returns to a particular
 * place — the descent's end — rather than merely being round.
 *
 * The ring's left edge sits at x = 0 so it hangs on the same margin as the
 * signature above it, and the descent enters at the ring's top, centred.
 */
function Closure({ reduced }: { reduced: boolean }) {
  const ENTRY = 'M30 0 L30 32';
  const RING = 'A30 30 0 0 1 30 92 A30 30 0 0 1 30 32';

  return (
    <svg
      width="60"
      height="94"
      viewBox="0 0 60 94"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <motion.path
        d={`${ENTRY} ${RING}`}
        stroke="rgb(var(--graphite))"
        strokeOpacity={0.45}
        strokeWidth={1}
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 2, delay: 0.3, ease: REVEAL_EASE }}
      />

      {/* The join. Cobalt, at the single point the stroke both arrives at and
          leaves from, and only after it has got back there. */}
      <motion.circle
        cx={30}
        cy={32}
        r={2}
        fill="rgb(var(--through-line))"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: reduced ? 0 : 2.2, ease: REVEAL_EASE }}
      />
    </svg>
  );
}

export default function ClosingSignature() {
  const prefersReducedMotion = useReducedMotionSafe();
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

        {/* The closure sits between the signature and the way back, so the
            ending reads in three beats: who wrote this, the line closing, and
            then — only then — the way to the first page. */}
        <div className="mt-14 md:mt-16">
          <Closure reduced={Boolean(prefersReducedMotion)} />
        </div>

        <motion.p variants={rise} className="mt-10 md:mt-12">
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
