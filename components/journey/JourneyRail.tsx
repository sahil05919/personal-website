'use client';

import { useEffect, useState } from 'react';
import {
  journeySnapshot,
  journeyChapters,
  chapterToSnapshotIndex,
  snapshotToChapterId,
} from '@/data/journeyData';

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
        {/*
          Every point is a link into the chapter it anchors.

          The rail already knew which chapter you were reading and lit the
          matching year — it just would not take you there, which is the one
          thing a reader looks at a contents rail and expects. It is a plain
          in-page anchor: globals.css already sets `scroll-behavior: smooth`
          and gives `:target` a 96px scroll-margin so the chapter heading
          clears the fixed header, so no scroll handler is needed and the
          links keep working with JavaScript unavailable.

          The whole row is the target rather than the year alone — a 7px dot
          and an 11px number are not a hit area — and the hover state moves
          the label to ink so the affordance is visible before the click.
        */}
        <ol className="relative">
          {journeySnapshot.points.map((point, i) => {
            const isActive = i === activeIndex;
            const chapterId = snapshotToChapterId[i];

            const row = (
              <>
                <span
                  className={`h-[7px] w-[7px] rounded-full shrink-0 transition-colors duration-300 ${
                    isActive
                      ? 'bg-through-line'
                      : 'bg-hairline group-hover:bg-graphite'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`font-mono text-[11px] tabular-nums transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-graphite/70 group-hover:text-ink'
                  }`}
                >
                  {point.year}
                </span>
                <span
                  className={`text-[12.5px] leading-snug transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-graphite/70 group-hover:text-ink'
                  }`}
                >
                  {point.label}
                </span>
              </>
            );

            return (
              <li key={point.year}>
                {chapterId ? (
                  <a
                    href={`#${chapterId}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="group flex items-baseline gap-2.5 rounded-[2px] py-[5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-through-line focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    {row}
                  </a>
                ) : (
                  /* A glance point with no chapter behind it stays plain text
                     rather than becoming a link to nowhere. None currently
                     hit this branch; it exists so adding a ninth point cannot
                     silently ship a dead anchor. */
                  <span className="group flex items-baseline gap-2.5 py-[5px]">
                    {row}
                  </span>
                )}
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
