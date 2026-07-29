'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

/**
 * The homepage Hero resolves a scattered dot field into a line.
 * This is that same visual language run in reverse: a settled line
 * with resolved dots contracts inward to a single point as the
 * page's final thought settles into view. Same deterministic-
 * coordinate approach and reduced-motion handling as Hero.tsx.
 */
const RESOLVED_DOTS_X = [50, 100, 150];

const textGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.35, delayChildren: 0.3 } },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function ClosingSignature() {
  const prefersReducedMotion = useReducedMotion();

  const contractDelay = prefersReducedMotion ? 0 : 0.9;
  const contractDuration = prefersReducedMotion ? 0 : 0.6;

  return (
    /*
      Top padding is deliberately light. The seam above is already held
      by the wrapper in app/contact/page.tsx; carrying a second full
      interval here made the mark read as stranded between two blocks
      rather than as the opening of this one.
    */
    <section
      aria-label="Closing thought"
      className="px-6 md:px-8 pt-10 pb-20 md:pt-14 md:pb-24"
    >
      <motion.div
        initial={prefersReducedMotion ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={textGroup}
        className="mx-auto max-w-xl text-center"
      >
        {/* The mark — line and dots contracting to a single resolved point.
            Sized up from the first pass so it reads as the page's one
            deliberate visual moment rather than a decorative afterthought. */}
        <div className="w-full mb-12" aria-hidden="true">
          <svg
            viewBox="0 0 200 60"
            className="w-40 h-auto mx-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.line
              y1={30}
              y2={30}
              strokeWidth={2.5}
              className="stroke-through-line"
              initial={prefersReducedMotion ? false : { x1: 30, x2: 170, opacity: 1 }}
              whileInView={{ x1: 100, x2: 100, opacity: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: contractDuration, delay: contractDelay, ease: 'easeIn' }}
            />

            {RESOLVED_DOTS_X.map((x, i) => {
              const isCenter = x === 100;
              return (
                <motion.circle
                  key={`mark-${i}`}
                  cy={30}
                  className="fill-through-line"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { cx: x, r: 3.5, opacity: 1 }
                  }
                  whileInView={
                    isCenter
                      ? { cx: 100, r: 5, opacity: 1 }
                      : { cx: 100, r: 0, opacity: 0 }
                  }
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: contractDuration,
                    delay: contractDelay,
                    ease: 'easeIn',
                  }}
                />
              );
            })}
          </svg>
        </div>

        <motion.p
          variants={textItem}
          className="font-serif-display italic text-xl md:text-2xl leading-relaxed text-ink"
        >
          I believe ambition gives us direction, but it&apos;s the process
          of becoming that shapes who we are.
        </motion.p>

        <motion.p
          variants={textItem}
          className="mt-5 text-base text-graphite leading-relaxed"
        >
          I&apos;m still somewhere in that process myself.
        </motion.p>

        <motion.p
          variants={textItem}
          className="mt-5 text-base text-graphite leading-relaxed"
        >
          If you&apos;d like to compare notes along the way, I&apos;d
          genuinely love to hear from you.
        </motion.p>

        <motion.p
          variants={textItem}
          className="mt-10 font-serif-display text-sm text-graphite tracking-wide"
        >
          Sahil Kumar
        </motion.p>
      </motion.div>
    </section>
  );
}