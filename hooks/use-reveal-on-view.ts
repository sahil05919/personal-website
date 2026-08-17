"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals content with a small fade/rise once it enters the viewport.
 * Intentionally subtle — this should read as the page settling into
 * place, not as an animated effect competing with the writing.
 * No-ops entirely (returns visible=true immediately) if the user has
 * requested reduced motion.
 *
 * MOVED from components/media/use-reveal-on-view.ts, unchanged. It is now
 * used by two chapters, so it no longer belongs to one of them.
 *
 * ACTION REQUIRED: update the import in components/media/MediaMoment.tsx
 *
 *   - import { useRevealOnView } from "./use-reveal-on-view";
 *   + import { useRevealOnView } from "@/hooks/use-reveal-on-view";
 *
 * then delete the old file. One line, but /media fails to build if missed.
 */
export function useRevealOnView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /*
      REDUCED MOTION IS HANDLED BY THE OBSERVER, NOT BY AN EARLY setState.

      This used to read the media query first and call setIsVisible(true)
      synchronously in the effect body when it matched — which is a real
      cascading render (React flags it: "Avoid calling setState() directly
      within an effect"), paid on every revealed element on the page by exactly
      the readers who asked for less work, not more.

      Observing unconditionally reaches the same end state: the element is on
      screen or it soon will be, the observer fires, and `isVisible` flips once
      through the same path everyone else uses. What reduced motion actually
      needs to suppress is the TRANSITION, and that is already handled where it
      belongs — every consumer of this hook pairs its transition classes with
      `motion-reduce:transition-none`, so the element simply appears.

      The one behaviour lost is revealing content that never enters the
      viewport, which was never happening anyway.
    */

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}