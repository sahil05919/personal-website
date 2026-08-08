'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { homeContent } from '@/data/homeContent';

/**
 * Frontispiece — the title page.
 *
 * Formerly components/home/Hero.tsx. The settle choreography is unchanged:
 * deterministic coordinates so server and client markup match, one resolve on
 * load, no loop, reduced-motion users get the end state immediately.
 *
 * Removed from the old Hero: the sub-headline and the "See the work" button.
 * Home no longer routes to a #work anchor — the work is a row in Contents.
 *
 * NOTE: `figureCaption` states the counts below. If NOISE_DOTS or
 * RESOLVED_DOTS_X change length, the caption in homeContent.ts becomes a lie.
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

const titleGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 1.05 } },
};

const titleItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Frontispiece() {
  const prefersReducedMotion = useReducedMotion();

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
      aria-label="Title"
      className="bg-paper text-ink px-6 md:px-8 pt-[96px] pb-16 md:pt-[112px] md:pb-24"
    >
      <div className="mx-auto max-w-2xl">
        <motion.p
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="show"
          variants={eyebrowVariant}
          className="font-mono text-[11px] tracking-[0.06em] text-graphite mb-6"
        >
          {homeContent.eyebrow}
        </motion.p>

        {/* Fig. 01 — noise resolving into the through-line. The site's founding
            image, and the horizontal form of the spine that runs down Contents. */}
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
              initial={
                prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }
              }
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: lineDuration,
                delay: lineDelay,
                ease: 'easeOut',
              }}
            />
          </svg>
        </div>

        <p className="font-mono text-[11px] text-graphite/70 mb-12 md:mb-16">
          {homeContent.figureCaption}
        </p>

        <motion.div
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="show"
          variants={titleGroup}
        >
          <motion.h1
            variants={titleItem}
            className="font-serif-display font-normal text-[3.25rem] md:text-[4.5rem] leading-[0.98] tracking-[-0.02em] text-balance"
          >
            {homeContent.title}
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}
