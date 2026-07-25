'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/**
 * Deterministic scattered-dot field that resolves into the through-line.
 * Coordinates are fixed (not randomized at runtime) so server and client
 * markup match exactly — avoids React hydration mismatches.
 */
const NOISE_DOTS: { cx: number; cy: number; r: number; opacity: number }[] = [
  { cx: 30, cy: 30, r: 2.5, opacity: 0.35 },
  { cx: 80, cy: 18, r: 2, opacity: 0.35 },
  { cx: 140, cy: 44, r: 3, opacity: 0.35 },
  { cx: 20, cy: 80, r: 2, opacity: 0.35 },
  { cx: 200, cy: 20, r: 2.5, opacity: 0.35 },
  { cx: 260, cy: 60, r: 2, opacity: 0.35 },
  { cx: 320, cy: 24, r: 3, opacity: 0.35 },
  { cx: 380, cy: 70, r: 2, opacity: 0.35 },
  { cx: 440, cy: 30, r: 2.5, opacity: 0.35 },
  { cx: 500, cy: 55, r: 2, opacity: 0.35 },
  { cx: 560, cy: 20, r: 3, opacity: 0.35 },
  { cx: 610, cy: 65, r: 2, opacity: 0.35 },
  { cx: 60, cy: 120, r: 2, opacity: 0.3 },
  { cx: 160, cy: 140, r: 2.5, opacity: 0.3 },
  { cx: 240, cy: 110, r: 2, opacity: 0.3 },
  { cx: 340, cy: 150, r: 3, opacity: 0.3 },
  { cx: 420, cy: 115, r: 2, opacity: 0.3 },
  { cx: 520, cy: 145, r: 2.5, opacity: 0.3 },
  { cx: 580, cy: 105, r: 2, opacity: 0.3 },
  { cx: 100, cy: 185, r: 2, opacity: 0.25 },
  { cx: 220, cy: 195, r: 2.5, opacity: 0.25 },
  { cx: 360, cy: 180, r: 2, opacity: 0.25 },
  { cx: 480, cy: 200, r: 2, opacity: 0.25 },
];

const RESOLVED_DOTS_X = [40, 140, 240, 340, 440, 540, 600];

const eyebrowVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const headlineGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 1.05 } },
};

const headlineItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // With reduced motion, skip the settle choreography entirely and render
  // the resolved end-state immediately.
  const dotDelayStart = 0;
  const dotStagger = prefersReducedMotion ? 0 : 0.015;
  const lineDelay = prefersReducedMotion ? 0 : 0.78;
  const lineDuration = prefersReducedMotion ? 0 : 0.5;

  const staggerDelays = useMemo(
    () => NOISE_DOTS.map((_, i) => dotDelayStart + i * dotStagger),
    [dotStagger]
  );

  return (
    <section
      aria-label="Introduction"
      className="bg-paper text-ink px-6 md:px-8 pt-[128px] pb-16 md:pt-[136px] md:pb-20"
    >
      <div className="mx-auto max-w-2xl">
        <motion.p
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="show"
          variants={eyebrowVariant}
          className="font-mono text-[11px] tracking-[0.06em] text-graphite mb-6"
        >
          Business and data analyst
        </motion.p>

        {/* Hero visual — deliberately the dominant element of the first screen */}
        <div className="w-full mb-2" aria-hidden="true">
          <svg
            viewBox="0 0 640 280"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {NOISE_DOTS.map((dot, i) => (
              <motion.circle
                key={`noise-${i}`}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                className="fill-graphite"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: dot.opacity }}
                transition={{ duration: 0.4, delay: staggerDelays[i] }}
              />
            ))}

            {RESOLVED_DOTS_X.map((x, i) => (
              <motion.circle
                key={`resolved-${i}`}
                cx={x}
                cy={240}
                r={3}
                className="fill-through-line"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: lineDelay }}
              />
            ))}

            <motion.line
              x1={35}
              y1={240}
              x2={605}
              y2={240}
              strokeWidth={2}
              className="stroke-through-line"
              initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: lineDuration, delay: lineDelay, ease: 'easeOut' }}
            />
          </svg>
        </div>

        <p className="font-mono text-[11px] text-graphite/70 mb-9">
          On load — noise settles once, no loop
        </p>

        <motion.div
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="show"
          variants={headlineGroup}
        >
          <motion.h1
            variants={headlineItem}
            className="font-serif-display font-medium text-[2.5rem] md:text-[2.875rem] leading-[1.15] tracking-tight max-w-lg mb-5"
          >
            I make confusing things simple.
          </motion.h1>

          <motion.p
            variants={headlineItem}
            className="text-graphite text-base leading-relaxed max-w-md mb-8"
          >
            I build systems that turn messy processes into something you can
            actually read.
          </motion.p>

          <motion.div variants={headlineItem}>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-md bg-ink text-paper text-sm px-[22px] py-3 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-through-line"
            >
              See the work
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}