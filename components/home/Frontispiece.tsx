'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

import { homeContent } from '@/data/homeContent';
import ResolveFigure, { FIGURE_TALL, FIGURE_WIDE } from './ResolveFigure';
import { full, gutter, shell } from './rhythm';

/**
 * Frontispiece — the title page.
 *
 * The composition, and why it is built the way it is:
 *
 *   eyebrow          in the measure column, indented past the gutter
 *   Fig. 01          spans the full content box, LEFT EDGE FLUSH WITH x = 0
 *   caption + title  back in the measure column, spine running beside them
 *
 * The figure's left edge sitting at x = 0 is the entire point. That is exactly
 * where the spine runs. When the fragments resolve, the resulting horizontal
 * line terminates at the same x the vertical line begins at, one element
 * below — so the through-line reads as one stroke that turns a corner and runs
 * down the page, rather than as a picture of a line followed, coincidentally,
 * by a rule.
 *
 * Two figure instances, one visible at a time. Not the same composition
 * scaled: the portrait version has its own view box and its own scatter, so
 * the phone gets a figure composed for a phone. Both are `aria-hidden`; the
 * caption is the accessible description and it is real text.
 *
 * Reduced motion: the title arrives without stagger, and ResolveFigure renders
 * itself already resolved.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const arrival: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 1.2 } },
};

const arrivalItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Frontispiece() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Title"
      className="bg-paper text-ink pt-[clamp(1.25rem,3vh,2.25rem)]"
    >
      <div className={shell}>
        {/* Above the figure the line does not exist yet, so this block carries
            no spine — only the indent that keeps every text element on the
            same left edge. */}
        <div className="relative pl-6 md:pl-10">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-apparatus text-graphite"
          >
            {homeContent.eyebrow}
          </motion.p>
        </div>

        {/* Full content box, flush left. `aspect-` reserves the height before
            the SVG paints, so the title below never jumps. */}
        <div className="mt-[clamp(1rem,2.5vh,1.75rem)]">
          <div className="hidden aspect-[1080/240] w-full sm:block">
            <ResolveFigure
              layout={FIGURE_WIDE}
              seed={20260810}
              interactive
              className="h-full w-full"
            />
          </div>
          <div className="aspect-[380/250] w-full sm:hidden">
            <ResolveFigure
              layout={FIGURE_TALL}
              seed={71104}
              interactive={false}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      {/* From here down, the spine. `origin` inherits the figure's cobalt at
          the top and falls to hairline within an inch. */}
      <div className={shell}>
        <div className={`${gutter} pb-[clamp(2.25rem,5vh,4rem)]`}>
          <span aria-hidden="true" className="pointer-events-none">
            <span className="absolute left-0 top-0 bottom-0 w-px bg-hairline" />
            <span className="absolute left-0 top-0 h-24 w-px bg-gradient-to-b from-through-line to-transparent" />
          </span>

          <p className="pt-3 font-mono text-apparatus text-graphite">
            {homeContent.figureCaption}
          </p>

          <motion.div
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
            variants={arrival}
            className="mt-[clamp(1.5rem,3.5vh,2.75rem)]"
          >
            <motion.h1
              variants={arrivalItem}
              className={`${full} text-balance font-serif-display text-fluid-display font-normal`}
            >
              {homeContent.title}
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
