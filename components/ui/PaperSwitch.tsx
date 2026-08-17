"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * PaperSwitch — choosing a paper stock, not toggling a mode.
 *
 * The control is a set of paper samples. Each swatch is painted in the *actual*
 * ground of the theme it selects, with a rule and a mark on it in that theme's
 * own ink and accent — so it shows you the paper rather than naming it.
 *
 * ---------------------------------------------------------------------------
 * TWO IN THE BAR, THE REST BEHIND A BUTTON (August 2026)
 *
 * When there were three papers, three swatches in the navbar was fine. At five
 * it stopped being a control and became a puzzle: five near-identical 26px
 * squares, no labels, and the reader has to click each one to find out what it
 * does. That is a guessing game sitting in the running head of every page.
 *
 * So the bar carries the two that behave like a pair — Paper and Ink, the light
 * and dark the operating system itself can ask for — and everything else lives
 * behind one button that opens a proper list: swatch, name, and the active one
 * marked. Five choices are worth having; five choices shouted at once are not.
 *
 * The button shows the ACTIVE paper's swatch when the active paper is not one
 * of the two inline ones, so a reader on Foxed can always see what they are on
 * without opening anything.
 *
 * ---------------------------------------------------------------------------
 * The values are hard-coded here and nowhere else on purpose: every other
 * colour on the site comes from CSS variables, but this component must show
 * five themes at once and exactly one of them is active. There is no way to
 * read an inactive theme's variables. If a theme's paper colour changes in
 * globals.css it changes here too — the only duplication in the colour system,
 * annotated at both ends.
 */

interface Paper {
  id: string;
  /** What the sample is called. Real names, not "light" and "dark". */
  name: string;
  /** One line, shown only in the panel. What the stock is. */
  blurb: string;
  ground: string;
  ink: string;
  accent: string;
}

/* Mirrors :root / .dark / .blueprint / .foxed / .nocturne in app/globals.css.
   Note Foxed's graphite in that file is #6B5B49 rather than the value it was
   first drafted with, because the draft failed contrast. Nothing here shows
   graphite, but if a swatch is ever redrawn to include it, take it from
   globals.css and not from memory. */
const PAPERS: Paper[] = [
  {
    id: "light",
    name: "Paper",
    blurb: "Warm, uncoated",
    ground: "#F7F5F0",
    ink: "#181715",
    accent: "#1D4AC7",
  },
  {
    id: "dark",
    name: "Ink",
    blurb: "Warm charcoal",
    ground: "#111113",
    ink: "#E5E2DB",
    accent: "#7CA2FF",
  },
  {
    id: "foxed",
    name: "Foxed",
    blurb: "An old book",
    ground: "#EDE3D3",
    ink: "#2A211A",
    accent: "#9A2E20",
  },
  {
    id: "nocturne",
    name: "Nocturne",
    blurb: "Late, by one lamp",
    ground: "#16131A",
    ink: "#EDE4D8",
    accent: "#E8A33D",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    blurb: "The drawing office",
    ground: "#0A162A",
    ink: "#DDE9FA",
    accent: "#5EC9FF",
  },
];

/** The two the bar shows without asking. The pair an OS can request. */
const INLINE_IDS = ["light", "dark"];

/** One paper sample, at swatch size. */
function Swatch({
  paper,
  active,
  size = 26,
}: {
  paper: Paper;
  active: boolean;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="relative block overflow-hidden"
      style={{ backgroundColor: paper.ground, height: size, width: size }}
    >
      {/* The sample's own hairline, drawn in its ink at low alpha so the edge
          belongs to the paper rather than to the UI. */}
      <span
        className="pointer-events-none absolute inset-0 border transition-colors duration-300"
        style={{ borderColor: active ? paper.accent : `${paper.ink}38` }}
      />
      {/* Two ruled lines and an accent mark: the site in miniature — a measure,
          a rule under it, and one thing in colour. */}
      <span
        className="pointer-events-none absolute left-[5px] right-[5px] top-[9px] h-px"
        style={{ backgroundColor: `${paper.ink}66` }}
      />
      <span
        className="pointer-events-none absolute left-[5px] right-[10px] top-[13px] h-px"
        style={{ backgroundColor: `${paper.ink}40` }}
      />
      <span
        className="pointer-events-none absolute bottom-[5px] left-[5px] h-[3px] transition-all duration-300 ease-editorial"
        style={{ backgroundColor: paper.accent, width: active ? "10px" : "3px" }}
      />
    </span>
  );
}

export default function PaperSwitch({
  className = "",
}: {
  className?: string;
}) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // next-themes' documented pattern: the server cannot know the visitor's
    // stored preference, so the control renders as a reserved gap until after
    // hydration rather than rendering the wrong sample as selected.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Escape closes and returns focus; a click outside closes. Both are the
  // minimum contract for a popover that is not a modal.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // `theme` is "system" until the visitor chooses; `resolvedTheme` is what is
  // actually on the page. The swatch that lights up must be the one you see.
  const current = theme === "system" ? resolvedTheme : theme;

  const inline = PAPERS.filter((p) => INLINE_IDS.includes(p.id));
  const activePaper = PAPERS.find((p) => p.id === current);
  const activeIsInline = activePaper ? INLINE_IDS.includes(activePaper.id) : true;

  if (!mounted) {
    // Reserved gap, sized from the list rather than hardcoded — two swatches,
    // two gaps and the trigger. Getting this wrong shifts the navbar on every
    // page load.
    return (
      <div
        className={className}
        style={{ height: 26, width: 2 * 26 + 2 * 6 + 26 }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div ref={wrapper} className={`relative flex items-center gap-1.5 ${className}`}>
      {inline.map((paper) => (
        <button
          key={paper.id}
          type="button"
          onClick={() => {
            setTheme(paper.id);
            setOpen(false);
          }}
          aria-label={`${paper.name} paper`}
          aria-pressed={current === paper.id}
          title={paper.name}
          className="block transition-transform duration-300 ease-editorial hover:-translate-y-px"
        >
          <Swatch paper={paper} active={current === paper.id} />
        </button>
      ))}

      {/* The trigger. Shows the active paper when it is one of the three that
          are not in the bar, so the reader is never left unable to see what
          they are on. Otherwise it is three quiet dots — an ellipsis, which is
          the honest symbol for "there is more". */}
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={open ? "Close paper choices" : "More papers"}
        title="More papers"
        className="flex h-[26px] w-[26px] items-center justify-center border border-hairline transition-colors duration-300 ease-editorial hover:border-graphite"
      >
        {!activeIsInline && activePaper ? (
          <Swatch paper={activePaper} active size={24} />
        ) : (
          <span
            aria-hidden="true"
            className="font-mono text-[13px] leading-none text-graphite"
          >
            &hellip;
          </span>
        )}
      </button>

      {open ? (
        <div
          role="group"
          aria-label="Papers"
          className="absolute right-0 top-[34px] z-[60] w-[13.5rem] border border-hairline bg-vellum p-1.5 shadow-plate"
        >
          {PAPERS.map((paper) => {
            const active = current === paper.id;
            return (
              <button
                key={paper.id}
                type="button"
                onClick={() => {
                  setTheme(paper.id);
                  setOpen(false);
                  trigger.current?.focus();
                }}
                aria-pressed={active}
                className={`flex w-full items-center gap-3 px-2 py-2 text-left transition-colors duration-200 ${
                  active ? "bg-well" : "hover:bg-well"
                }`}
              >
                <Swatch paper={paper} active={active} size={22} />
                <span className="min-w-0">
                  <span
                    className={`block font-mono text-apparatus-xs uppercase ${
                      active ? "text-ink" : "text-graphite"
                    }`}
                  >
                    {paper.name}
                  </span>
                  <span className="block font-reading text-[12px] leading-tight text-graphite">
                    {paper.blurb}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
