'use client';

import { motion, type Variants } from 'framer-motion';
import type { CSSProperties, ElementType, ReactNode } from 'react';

/**
 * Reveal — the shared whileInView primitive for the sitewide motion pass
 * (August 2026).
 *
 * Home, About, Contact, Journey and Questions each independently converged on
 * the same arrival shape: opacity 0→1, a small rise, eased on
 * [0.16, 1, 0.3, 1], fired once via whileInView. This component makes that
 * convergence explicit and reusable for the pages that had no reveal
 * mechanism at all (Experience) — it is not a replacement for the bespoke,
 * already-tuned variants living in those pages' own components. Leave those
 * alone; use this where nothing exists yet.
 *
 * `index` reproduces the manual stagger already used in about/Masthead.tsx
 * (`delay: index * step`) rather than a Framer staggerChildren container, so
 * it composes with server-rendered `.map()` output (server page → <Reveal
 * index={i}> → server-rendered children) without needing a client parent
 * around the whole list. Framer's <motion.[tag]> proxy is what makes the `as`
 * prop possible — `motion[tag]` is valid for any HTML tag, not a fixed set.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealVariant = 'up' | 'fade' | 'line';

const shapes: Record<RevealVariant, Variants> = {
  // The site's default arrival: a small rise out of the page.
  up: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  },
  // Opacity only — for content that sits beside something already moving,
  // where a second thing rising at the same time would compete with it.
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  // A rule drawing itself in, left to right. For hairlines and dividers —
  // see projects/Seam.tsx, which originated this shape.
  line: {
    hidden: { opacity: 0, scaleX: 0 },
    show: { opacity: 1, scaleX: 1 },
  },
};

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  variant?: RevealVariant;
  /** Position in a list — multiplied by `step` for a manual stagger delay. */
  index?: number;
  step?: number;
  duration?: number;
  /** Passed straight through to Framer's viewport.margin. */
  margin?: string;
  id?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  'aria-label'?: string;
}

export function Reveal({
  children,
  as = 'div',
  className,
  style,
  variant = 'up',
  index = 0,
  step = 0.08,
  duration = 0.6,
  margin = '-10% 0px',
  ...rest
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const shape = shapes[variant];

  return (
    <MotionTag
      className={className}
      style={variant === 'line' ? { transformOrigin: 'left center', ...style } : style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      variants={shape}
      transition={{ duration, delay: index * step, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
