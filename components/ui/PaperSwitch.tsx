"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * PaperSwitch — choosing a paper stock, not toggling a mode.
 *
 * The old control was three lucide icons (sun / moon / monitor) in a rounded
 * box: the single most generic component on a site whose whole argument is
 * that it is not made of generic components. It also styled itself from the
 * deleted shadcn tokens, so it was the last thing on the site still rendering
 * in indigo.
 *
 * This is a set of paper samples. Each swatch is painted in the *actual*
 * ground of the theme it selects, with a rule and a mark on it in that
 * theme's own ink and accent — so the control shows you the paper rather than
 * naming it. Choosing a theme is a preview, which is what a swatch book is
 * for.
 *
 * The values are hard-coded here and nowhere else on purpose: every other
 * colour on the site comes from CSS variables, but this component must show
 * three themes at once, and exactly one of them is the active one. There is
 * no way to read an inactive theme's variables. If a theme's paper colour
 * changes in globals.css, it changes here too — that is the only duplication
 * in the colour system and it is annotated at both ends.
 */

interface Paper {
  id: string;
  /** What the sample is called. Real names, not "light" and "dark". */
  name: string;
  ground: string;
  ink: string;
  accent: string;
}

/* Mirrors :root / .dark / .blueprint in app/globals.css. Keep in step. */
const PAPERS: Paper[] = [
  { id: "light", name: "Paper", ground: "#F7F5F0", ink: "#181715", accent: "#1D4AC7" },
  { id: "dark", name: "Ink", ground: "#111113", ink: "#E5E2DB", accent: "#7CA2FF" },
  { id: "blueprint", name: "Blueprint", ground: "#0A162A", ink: "#DDE9FA", accent: "#5EC9FF" },
];

export default function PaperSwitch({
  className = "",
}: {
  className?: string;
}) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // next-themes' documented pattern: the server cannot know the visitor's
    // stored preference, so the control renders as a reserved gap until after
    // hydration rather than rendering the wrong sample as selected.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // `theme` is "system" until the visitor chooses; `resolvedTheme` is what is
  // actually on the page. The swatch that lights up must be the one you are
  // looking at.
  const current = theme === "system" ? resolvedTheme : theme;

  if (!mounted) {
    return <div className={`h-[26px] w-[92px] ${className}`} aria-hidden="true" />;
  }

  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      role="group"
      aria-label="Paper"
    >
      {PAPERS.map((paper) => {
        const active = current === paper.id;

        return (
          <button
            key={paper.id}
            type="button"
            onClick={() => setTheme(paper.id)}
            aria-label={`${paper.name} paper`}
            aria-pressed={active}
            title={paper.name}
            className="group relative block h-[26px] w-[26px] overflow-hidden transition-transform duration-300 ease-editorial hover:-translate-y-px"
            style={{ backgroundColor: paper.ground }}
          >
            {/* The sample's own hairline. Drawn in its ink at low alpha so
                the edge belongs to the paper rather than to the UI. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 border transition-colors duration-300"
              style={{
                borderColor: active ? paper.accent : `${paper.ink}38`,
              }}
            />

            {/* Two ruled lines and an accent mark: the site in miniature —
                a measure, a rule under it, and one thing in colour. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[5px] right-[5px] top-[9px] h-px"
              style={{ backgroundColor: `${paper.ink}66` }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[5px] right-[10px] top-[13px] h-px"
              style={{ backgroundColor: `${paper.ink}40` }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[5px] left-[5px] h-[3px] transition-all duration-300 ease-editorial"
              style={{
                backgroundColor: paper.accent,
                width: active ? "10px" : "3px",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
