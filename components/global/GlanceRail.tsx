"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import type { GlanceItem } from "@/components/global/GlanceContents";

/**
 * AT A GLANCE, as a persistent rail.
 *
 * The first version of this shipped as a block at the top of /projects and
 * /experience, and the note that came back was exactly right: a contents list
 * you scroll past is a contents list you cannot use. The moment a reader is
 * deep in the fourth entry and wants the seventh, the only affordance is to
 * scroll all the way back up — which is the problem the list existed to solve.
 *
 * So it is a rail now, the way /journey has always had one: sticky at `lg` and
 * up, tracking where you are as you read, one click to anywhere. Below `lg`
 * there is no room for a column beside the text, and GlanceContents stays as
 * the static block after the header — the same split /journey makes between
 * JourneyRail and JourneySnapshot.
 *
 * ---------------------------------------------------------------------------
 * WHAT IT SHOWS AND WHAT IT DOES NOT
 *
 * Marker and label only. The `note` a GlanceItem carries — an attribution, an
 * employer — is shown by the top block and deliberately dropped here: a 13rem
 * column cannot hold "Applied Research Project · 2025" without wrapping to
 * three lines, and a rail that is taller than the viewport stops being a rail.
 *
 * The active row is picked out in ink with a cobalt dot, everything else sits
 * in graphite. No connecting bar, no progress fill, no percentage: the rail
 * says where you are, not how much is left, because "62% remaining" is a thing
 * to dread rather than a thing to know.
 */
export function GlanceRail({
  heading,
  items,
  summary,
}: {
  heading: string;
  items: GlanceItem[];
  /** One quiet line under the list. Optional. */
  summary?: string;
}) {
  const activeId = useActiveSection(items.map((item) => item.id));

  if (items.length === 0) return null;

  return (
    <nav aria-label={heading}>
      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.06em] text-graphite">
        {heading}
      </p>

      <div className="relative">
        {/* The rule the dots sit on. Inset top and bottom so it does not
            overshoot the first and last marker. */}
        <div
          aria-hidden="true"
          className="absolute bottom-1 left-[3px] top-1 w-px bg-hairline"
        />

        <ol className="relative">
          {items.map((item) => {
            const active = item.id === activeId;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "true" : undefined}
                  className="group flex items-baseline gap-2.5 rounded-[2px] py-[5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-through-line focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  <span
                    aria-hidden="true"
                    className={`h-[7px] w-[7px] shrink-0 rounded-full transition-colors duration-300 ${
                      active
                        ? "bg-through-line"
                        : "bg-hairline group-hover:bg-graphite"
                    }`}
                  />
                  <span
                    className={`shrink-0 font-mono text-[10px] tabular-nums transition-colors duration-300 ${
                      active ? "text-ink" : "text-graphite/70 group-hover:text-ink"
                    }`}
                  >
                    {item.marker}
                  </span>
                  <span
                    className={`text-[12.5px] leading-snug transition-colors duration-300 ${
                      active ? "text-ink" : "text-graphite/70 group-hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      {summary ? (
        <p className="mt-6 max-w-[11rem] font-reading text-[12.5px] italic leading-relaxed text-graphite">
          {summary}
        </p>
      ) : null}
    </nav>
  );
}
