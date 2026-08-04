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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

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