'use client';

import { motion, type Variants } from 'framer-motion';

import { homeContent } from '@/data/homeContent';
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';
import ResolveFigure, { FIGURE_TALL, FIGURE_WIDE } from './ResolveFigure';
import { gutter, shell } from './rhythm';

/**
 * Frontispiece — the title page.
 *
 * WHY THIS WAS REBUILT
 *
 * The composition ran eyebrow → figure → caption → title, with the figure
 * given a 240-unit field to fall through. Once it had resolved — about a
 * second and a half in — the entire first screen was an eyebrow, two hundred
 * pixels of empty paper, and one thin blue rule. The title, the thing the page
 * is named for, sat below the fold on a laptop and was set at inherited body
 * size because the fluid scale it asked for did not exist. The best idea on
 * the site was performing to an empty room.
 *
 * WHAT IT IS NOW
 *
 * A real title page, holding the full first screen:
 *
 *   eyebrow      apparatus, at the top of the leaf
 *   TITLE        Fraunces at mega scale, optically hung to the left edge
 *   Fig. 01      the resolve, directly beneath the title — the rule under a
 *                masthead, which is exactly what it looks like once it lands
 *   caption      apparatus again, stating what the figure did
 *
 * Putting the figure *under* the title rather than above it costs nothing and
 * gains the whole page: the resolved line now reads as the rule the title sits
 * on, and its left end is still at x = 0, which is still where the spine
 * begins its descent one element below. The gesture the old comment described
 * — a line that turns a corner and runs down the page — is unchanged and is
 * finally legible, because there is a title above it for the rule to belong to.
 *
 * The figure's field is also shorter (160 units, not 240). The fragments have
 * less room to scatter into, which reads as a tighter, faster resolve and
 * leaves no dead band once it is over.
 *
 * Two figure instances, one visible at a time. Not the same composition
 * scaled: the portrait version has its own view box and its own scatter. Both
 * are aria-hidden; the caption is the accessible description and it is real
 * text.
 *
 * Reduced motion: the title arrives without stagger and ResolveFigure renders
 * itself already resolved.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const arrival: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const arrivalItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function Frontispiece() {
  const prefersReducedMotion = useReducedMotionSafe();

  return (
    <section
      aria-label="Title"
      /* The leaf holds the screen. `svh` rather than `vh` so mobile browser
         chrome collapsing does not make the title page taller than the phone.
         `min-h` rather than `h` so a short viewport scrolls instead of
         clipping the caption. */
      className="flex min-h-[calc(100svh-72px)] flex-col justify-center bg-paper text-ink"
    >
      <div className={shell}>
        {/* Above the figure the line does not exist yet, so this block carries
            no spine — only the indent that keeps every text element on the
            same left edge. */}
        <div className="relative pl-6 md:pl-10">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="apparatus"
          >
            {homeContent.eyebrow}
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
            variants={arrival}
            className="mt-[clamp(2rem,7vh,4.5rem)]"
          >
            <motion.h1
              variants={arrivalItem}
              className="hang max-w-[16ch] text-balance font-serif-display text-fluid-mega font-normal"
            >
              {homeContent.title}
            </motion.h1>
          </motion.div>
        </div>
      </div>

      {/* Full content box, flush left — the figure's left edge sits at x = 0,
          which is exactly where the spine begins one element below. `aspect-`
          reserves the height before the SVG paints, so nothing jumps. */}
      <div className={`${shell} mt-[clamp(1.75rem,5vh,3.25rem)]`}>
        <div className="hidden aspect-[1080/160] w-full sm:block">
          <ResolveFigure
            layout={FIGURE_WIDE}
            seed={20260810}
            interactive
            className="h-full w-full"
          />
        </div>
        <div className="aspect-[380/210] w-full sm:hidden">
          <ResolveFigure
            layout={FIGURE_TALL}
            seed={71104}
            interactive={false}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* From here down, the spine. It inherits the figure's cobalt at the top
          and falls to hairline within an inch, so the vertical line reads as
          the resolved horizontal line turning the corner rather than as a
          second, unrelated rule. */}
      <div className={shell}>
        <div className={`${gutter} pb-[clamp(1.5rem,4vh,2.5rem)]`}>
          <span aria-hidden="true" className="pointer-events-none">
            <span className="absolute left-0 top-0 bottom-0 w-px bg-hairline" />
            <span className="absolute left-0 top-0 h-20 w-px bg-gradient-to-b from-through-line to-transparent" />
          </span>

          <p className="pt-3 apparatus normal-case tracking-[0.06em]">
            {homeContent.figureCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
