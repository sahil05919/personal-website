'use client';

import { useEffect, useState } from 'react';
import { journeySnapshot, journeyChapters, chapterToSnapshotIndex } from '@/data/journeyData';

/**
 * Scroll-spy for the desktop rail. Self-contained: reads the chapter
 * <article> elements by the `id` they already carry (used elsewhere for
 * #hash anchors), so it needs no shared state or context with
 * JourneyChapters — the two components stay decoupled.
 *
 * The intersection band (`rootMargin`) is a thin horizontal strip roughly
 * a third of the way down the viewport: whichever chapter is crossing that
 * strip is "the one you're reading right now." Picking the topmost
 * intersecting entry (rather than the first observer callback to fire)
 * keeps the highlight stable when two short chapters are both partially
 * on screen at once.
 */
function useActiveChapter(): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = journeyChapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

/**
 * The persistent desktop sidebar (lg and up only — rendered from
 * app/journey/page.tsx inside a `sticky` wrapper, hidden below `lg`). Not
 * a recreation of the old dot-and-rail timeline graphic: a quiet vertical
 * list with a single hairline behind it, one small dot per point, and the
 * active point picked out in ink/cobalt rather than illustrated with a
 * connecting bar. See JourneySnapshot.tsx for the mobile/tablet
 * equivalent, which drops the scroll-tracking entirely — a static list is
 * the right amount of orientation device when there's no room for a
 * sidebar.
 */
export default function JourneyRail() {
  const activeChapterId = useActiveChapter();
  const activeIndex = activeChapterId ? chapterToSnapshotIndex[activeChapterId] : undefined;

  return (
    <nav aria-label="Journey at a glance">
      <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-graphite mb-5">
        {journeySnapshot.heading}
      </p>

      <div className="relative">
        <div
          className="absolute left-[3px] top-1 bottom-1 w-px bg-hairline"
          aria-hidden="true"
        />
        <ol className="relative space-y-2.5">
          {journeySnapshot.points.map((point, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={point.year} className="flex items-baseline gap-2.5">
                <span
                  className={`h-[7px] w-[7px] rounded-full shrink-0 transition-colors duration-300 ${
                    isActive ? 'bg-through-line' : 'bg-hairline'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`font-mono text-[11px] tabular-nums transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-graphite/70'
                  }`}
                >
                  {point.year}
                </span>
                <span
                  className={`text-[12.5px] leading-snug transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-graphite/70'
                  }`}
                >
                  {point.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="font-reading italic text-[12.5px] leading-relaxed text-graphite mt-6 max-w-[11rem]">
        {journeySnapshot.summary}
      </p>
    </nav>
  );
}
