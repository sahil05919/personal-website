'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * PageTransition — the one thing the site never had: something between the
 * pages, rather than only within them.
 *
 * Keyed on pathname so AnimatePresence reads a route change as an exit+enter
 * pair instead of a silent content swap — the same mechanism Framer uses for
 * keyed list items, pointed at the router instead. This lives in
 * app/layout.tsx, wrapping `{children}`; the layout itself never remounts on
 * navigation, only this component's child does, which is what lets the exit
 * animation see the outgoing page before it's gone.
 *
 * `mode="wait"`, not `popLayout`: every route here is a different length, so
 * two full pages stacked with absolute positioning would show a seam
 * wherever they disagree. A short, serial exit-then-enter reads as a page
 * turning; total time is kept under half a second so it never feels like a
 * loading screen.
 *
 * Reduced motion: MotionConfig's reducedMotion="user" (see app/layout.tsx)
 * already snaps positional keys — x/y/scale/rotate/width/height — to their
 * end value, but `filter` is not one of the keys it checks, so the blur here
 * would keep animating under a global switch that everything else on the
 * site correctly respects. This checks the preference directly and drops to
 * a plain, short opacity crossfade instead — no movement, no blur. It uses
 * `useReducedMotionSafe` (hooks/use-reduced-motion-safe.ts) rather than
 * Framer's own `useReducedMotion`, which reads `matchMedia` synchronously on
 * first render and — verified with Playwright's reduced-motion emulation —
 * throws a real hydration error for any visitor whose OS has Reduced Motion
 * on, since the server always guesses "no preference".
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotionSafe();

  // A route change should read as arriving at a new page, not as a
  // continuation of wherever the last one left off scrolled to — but only
  // for an ordinary navigation. `/journey#1998` still has to land on the
  // anchor, not snap back to the top and strand it off-screen.
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  if (prefersReducedMotion) {
    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        animate={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.45, ease: EASE },
        }}
        exit={{
          opacity: 0,
          y: -8,
          filter: 'blur(4px)',
          transition: { duration: 0.2, ease: EASE },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
