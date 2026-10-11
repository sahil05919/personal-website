"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { PageMark } from "@/components/home/PageMark";
import { homeContent } from "@/data/homeContent";
import { chromeHi, homeContentHi } from "@/data/hinglish";
import { useVariant } from "@/hooks/use-reading-mode";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import {
  PARTS,
  folio,
  isActiveRoute,
  navigation,
  type Destination,
  type Part,
} from "@/data/navigation";

/**
 * The parts, opened.
 *
 * October 2026. The book is in two parts, Life and Work, and the running head
 * now names the parts rather than listing nine chapters in a row of 11px
 * labels. Each part is a door: point at it (or click, or tab to it and press
 * Enter) and a spread opens under the running head with that part's chapters
 * laid out at a size worth reading — numbered, named in the display face, each
 * with its own opening line and its own small mark.
 *
 * The spread is the same object as Home's contents, scaled to the moment of
 * choosing. Nothing on it is new writing: the lines are each chapter's own
 * opening line (homeContent.invitations), and the marks are Home's PageMarks.
 *
 * Behaviour, in one place:
 *   · Hover opens after a short intent delay, so sweeping the pointer across
 *     the header does not flash panels. Click toggles. Moving from one door to
 *     the other while open switches the spread without closing it.
 *   · The spread stays open while the pointer is over the doors OR the spread,
 *     with a grace period for the gap between them.
 *   · Escape closes and returns focus to the door that opened it. Choosing a
 *     chapter closes it. A veil over the page closes it on click.
 *   · Hover only on fine pointers. A touch "hover" would open the spread on
 *     the same tap that should toggle it.
 *
 * Rendered as a SIBLING of the header's blurred bar, not inside it: an element
 * with backdrop-filter becomes the containing block for fixed descendants, so
 * a fixed panel inside it lays itself out against a 58px box. See the same note
 * on the mobile index in Navbar.tsx.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const OPEN_DELAY = 110;
const CLOSE_DELAY = 220;

/** One plain sentence per part, under its name on the spread. Apparatus, not
 *  voice: it says what is behind the door and nothing more. */
const PART_LINE: Record<Part, string> = {
  life: "Who I am, where I come from, what this season looks like, and the moments I kept.",
  work: "What I built because I wanted to, the work I was given, and what I wrote down.",
};
const PART_LINE_HI: Record<Part, string> = {
  life: "Main kaun hoon, kahan se aaya, yeh mausam kaisa hai, aur jo pal maine sambhaal ke rakhe.",
  work: "Jo maine apni marzi se banaya, jo kaam mujhe diya gaya, aur jo maine likha.",
};

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

export function usePartMenu() {
  const [open, setOpen] = useState<Part | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  const openSoon = useCallback(
    (part: Part) => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
      if (openTimer.current) window.clearTimeout(openTimer.current);
      // Already open: switch at once. Closed: wait out the intent delay.
      openTimer.current = window.setTimeout(
        () => setOpen(part),
        open ? 0 : OPEN_DELAY,
      );
    },
    [open],
  );

  const closeSoon = useCallback(() => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    openTimer.current = null;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY);
  }, []);

  const keepOpen = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const closeNow = useCallback(() => {
    clearTimers();
    setOpen(null);
  }, [clearTimers]);

  const toggle = useCallback(
    (part: Part) => {
      clearTimers();
      setOpen((current) => (current === part ? null : part));
    },
    [clearTimers],
  );

  useEffect(() => clearTimers, [clearTimers]);

  return { open, openSoon, closeSoon, keepOpen, closeNow, toggle };
}

type Menu = ReturnType<typeof usePartMenu>;

function itemsOf(part: Part): Destination[] {
  return navigation.filter((d) => d.part === part);
}

/* ── The doors, in the running head ──────────────────────────────────────── */

export function PartDoors({
  menu,
  pathname,
  doorRefs,
}: {
  menu: Menu;
  pathname: string;
  doorRefs: React.MutableRefObject<Record<Part, HTMLButtonElement | null>>;
}) {
  const fine = useFinePointer();
  const labels: Record<Part, string> = {
    life: useVariant("Life", chromeHi.partLife),
    work: useVariant("Work", chromeHi.partWork),
  };

  return (
    <>
      {PARTS.map(({ id }) => {
        const items = itemsOf(id);
        const here = items.some((d) => isActiveRoute(pathname, d.href));
        const isOpen = menu.open === id;

        return (
          <button
            key={id}
            ref={(el) => {
              doorRefs.current[id] = el;
            }}
            type="button"
            aria-expanded={isOpen}
            aria-controls="part-spread"
            aria-haspopup="true"
            onClick={() => menu.toggle(id)}
            onPointerEnter={fine ? () => menu.openSoon(id) : undefined}
            onPointerLeave={fine ? menu.closeSoon : undefined}
            className="group relative flex items-baseline gap-2 py-3 outline-none"
          >
            <span
              className={`font-serif-display text-[19px] leading-none tracking-[-0.01em] transition-colors duration-300 ease-editorial ${
                isOpen || here ? "text-ink" : "text-graphite group-hover:text-ink"
              } group-focus-visible:text-through-line`}
            >
              {labels[id]}
            </span>
            {/* How many chapters are behind the door, set as a superior figure
                — the cheapest honest preview there is. */}
            <span
              aria-hidden="true"
              className={`font-mono text-[9px] leading-none tabular-nums transition-colors duration-300 ${
                isOpen ? "text-through-line" : "text-graphite"
              }`}
            >
              {String(items.length).padStart(2, "0")}
            </span>
            {/* The underline: a through-line stroke that draws in while the
                spread is open, and sits at rest under the part you are in. */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-[6px] h-px origin-left bg-through-line transition-transform duration-500 ease-editorial motion-reduce:transition-none ${
                isOpen ? "scale-x-100" : here ? "scale-x-100 opacity-40" : "scale-x-0"
              }`}
            />
          </button>
        );
      })}
    </>
  );
}

/* ── The spread ──────────────────────────────────────────────────────────── */

export function PartSpread({
  menu,
  pathname,
  top,
  onNavigate,
  restoreFocus,
}: {
  menu: Menu;
  pathname: string;
  top: number;
  onNavigate: () => void;
  restoreFocus: (part: Part) => void;
}) {
  const reduced = useReducedMotionSafe();
  const invitations = useVariant(homeContent.invitations, homeContentHi.invitations);
  const partLines = useVariant(PART_LINE, PART_LINE_HI);
  const labels: Record<Part, string> = {
    life: useVariant("Life", chromeHi.partLife),
    work: useVariant("Work", chromeHi.partWork),
  };
  const partWord = useVariant(
    { life: "Part one", work: "Part two" },
    { life: "Pehla hissa", work: "Doosra hissa" },
  );
  const beginWord = useVariant("Begin with", "Shuru kijiye");
  const hereLabel = useVariant("You are here", "Aap yahan hain");

  const open = menu.open;

  // Escape closes and hands focus back to the door.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const part = open;
        menu.closeNow();
        restoreFocus(part);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, menu, restoreFocus]);

  const items = open ? itemsOf(open) : [];
  const first = items[0];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* The veil. Quietens the page so the spread reads as the one thing
              on screen, and closes it on click. */}
          <motion.div
            key="veil"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
            onClick={menu.closeNow}
            style={{ top }}
            className="fixed inset-x-0 bottom-0 z-[44] hidden bg-ink/[0.08] backdrop-blur-[2px] lg:block"
          />

          <motion.div
            key="spread"
            id="part-spread"
            role="region"
            aria-label={labels[open]}
            initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            onPointerEnter={menu.keepOpen}
            onPointerLeave={menu.closeSoon}
            style={{ top }}
            className="fixed inset-x-0 z-[46] hidden border-b border-hairline bg-paper shadow-[0_24px_60px_-30px_rgb(var(--ink)/0.25)] lg:block"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={open}
                initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -4 }}
                transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
                className="mx-auto grid max-w-spread grid-cols-12 gap-x-10 px-5 pb-12 pt-10 sm:px-8 lg:px-10"
              >
                {/* ── The part itself ─────────────────────────────────── */}
                <div className="col-span-4 flex flex-col">
                  <p className="font-mono text-apparatus-xs uppercase tracking-[0.14em] text-graphite">
                    {partWord[open]}
                    <span className="mx-2 text-hairline">/</span>
                    <span className="text-through-line">
                      {String(items.length).padStart(2, "0")}
                    </span>
                  </p>
                  <h2 className="mt-5 font-serif-display text-[clamp(3.5rem,6vw,5.5rem)] font-normal leading-[0.9] tracking-[-0.035em] text-ink">
                    {labels[open]}
                  </h2>
                  <p className="mt-5 max-w-[30ch] font-reading text-[1.0625rem] leading-[1.6] text-graphite">
                    {partLines[open]}
                  </p>
                  {first ? (
                    <Link
                      href={first.href}
                      onClick={onNavigate}
                      className="group/begin mt-auto inline-flex items-center gap-3 pt-10 font-mono text-apparatus-xs uppercase tracking-[0.14em] text-ink"
                    >
                      <span>
                        {beginWord} {first.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="relative h-px w-10 overflow-hidden bg-hairline"
                      >
                        <span className="absolute inset-0 origin-left scale-x-0 bg-through-line transition-transform duration-500 ease-editorial group-hover/begin:scale-x-100" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-through-line transition-transform duration-300 ease-editorial group-hover/begin:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </Link>
                  ) : null}
                </div>

                {/* ── Its chapters ────────────────────────────────────── */}
                <ul
                  className={`col-span-8 grid gap-x-10 border-t border-hairline ${
                    items.length > 3 ? "grid-cols-2" : "grid-cols-3"
                  }`}
                >
                  {items.map((d, i) => {
                    const active = isActiveRoute(pathname, d.href);
                    const line = invitations[d.href];
                    return (
                      <motion.li
                        key={d.href}
                        initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: reduced ? 0 : 0.45,
                          delay: reduced ? 0 : 0.06 + i * 0.05,
                          ease: EASE,
                        }}
                        className="border-b border-hairline"
                      >
                        <Link
                          href={d.href}
                          onClick={onNavigate}
                          aria-current={active ? "page" : undefined}
                          className="group/ch relative flex h-full flex-col gap-7 py-6 pr-8 outline-none focus-visible:bg-ink/[0.03]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <span
                              className={`font-mono text-apparatus-xs tabular-nums ${
                                active ? "text-through-line" : "text-graphite"
                              }`}
                            >
                              {folio(d.href)}
                            </span>
                            <span
                              className={`shrink-0 transition-colors duration-300 ${
                                active
                                  ? "text-through-line"
                                  : "text-graphite group-hover/ch:text-through-line"
                              }`}
                            >
                              <PageMark href={d.href} />
                            </span>
                          </div>
                          <div>
                            <span
                              className={`flex items-baseline gap-3 font-serif-display text-[clamp(1.75rem,2.4vw,2.25rem)] leading-none tracking-[-0.02em] transition-colors duration-300 ${
                                active
                                  ? "text-through-line"
                                  : "text-ink group-hover/ch:text-through-line"
                              }`}
                            >
                              {d.label}
                              {active ? (
                                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-through-line">
                                  {hereLabel}
                                </span>
                              ) : null}
                            </span>
                            {line ? (
                              <span className="mt-2 block max-w-[34ch] font-reading text-[0.95rem] leading-[1.5] text-graphite">
                                {line}
                              </span>
                            ) : null}
                          </div>
                          {/* A hairline that draws across the cell's foot on
                              hover, on top of the ruled border. */}
                          <span
                            aria-hidden="true"
                            className="absolute bottom-[-1px] left-0 right-0 h-px origin-left scale-x-0 bg-through-line transition-transform duration-500 ease-editorial group-hover/ch:scale-x-100 group-focus-visible/ch:scale-x-100"
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
