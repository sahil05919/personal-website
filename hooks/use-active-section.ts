"use client";

import { useEffect, useState } from "react";

/**
 * Which of a set of sections is currently being read.
 *
 * Lifted out of JourneyRail, where this logic lived alone until /projects and
 * /experience needed the same rail. Three copies of an IntersectionObserver
 * with three slightly different rootMargins is how three pages end up
 * disagreeing about what "you are here" means.
 *
 * THE BAND is a thin horizontal strip about a fifth of the way down the
 * viewport. Whichever section is crossing it is the one you are reading. Using
 * a band rather than "topmost visible" is what stops the highlight flickering
 * between two short sections that are both fully on screen.
 *
 * TOPMOST WINS when several intersect at once — picking the first observer
 * callback to fire instead would make the answer depend on scroll direction.
 *
 * Returns null before anything intersects, which is the honest answer while
 * the reader is still above the first section.
 */
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  // The array identity changes on every render at most call sites, so the
  // effect keys off the contents rather than the reference.
  const key = ids.join("|");

  useEffect(() => {
    const elements = key
      .split("|")
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
