"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { homeContent } from "@/data/homeContent";
import { navigation } from "@/data/navigation";

/**
 * TURNING THE PAGE.
 *
 * This site is built as a book in every respect but one. It has a title page,
 * a table of contents, folios in the running head, standfirsts, marginalia, a
 * colophon, an endpaper and now an errata leaf. And there was no way to get
 * from one chapter to the next except by going back up to the navigation and
 * choosing — which is how a website works, and precisely not how a book does.
 *
 * Exactly one page had a turn: About ends on a block that says "Turn page" and
 * hands the reader to Journey. It is the best interaction on the site and it
 * existed once. This is that gesture, made general.
 *
 * TWO WAYS TO TURN, and they are the same gesture:
 *
 *   1. THE FOOT OF EVERY CHAPTER. What comes next, named, numbered, with the
 *      next chapter's OWN opening line underneath it as the invitation. Those
 *      lines already exist in data/homeContent.ts, quoted verbatim from the
 *      pages they point at — Home's contents list uses them, and nothing else
 *      did. The previous chapter sits opposite, quieter, because going back is
 *      always available and rarely the thing you want.
 *
 *   2. THE ARROW KEYS. Left and right turn the page. This is the part that
 *      makes it feel like an object rather than a menu: a reader who discovers
 *      it once will use it for the rest of the visit, and a reader who never
 *      does loses nothing, because the footer says the same thing in words.
 *
 * ---------------------------------------------------------------------------
 * WHERE IT DOES AND DOES NOT APPEAR
 *
 * The nine chapters in data/navigation.ts, and nowhere else. Back matter is
 * not part of the sequence: /errata and the 404 are things you arrive at
 * sideways, and giving them a "next chapter" would put the errata leaf into
 * the reading order it exists outside of.
 *
 * ---------------------------------------------------------------------------
 * WHY THE KEY HANDLER IS THIS CAREFUL
 *
 * Hijacking the arrow keys is a genuinely hostile thing to do if you get it
 * wrong, so it declines in every case where the reader means something else:
 *
 *   · focus is in a text field, a textarea, a select or anything
 *     contenteditable — the unsigned form on /contact is full of these, and
 *     an arrow key there means "move the caret", always
 *   · any modifier is held — Alt+Left is the browser's Back on Windows and
 *     Linux, and Cmd+Left is Back on macOS
 *   · the reader has an open dialog or menu (`aria-expanded` on the focused
 *     element), or focus sits on a control that uses arrows itself
 *
 * It also does not preventDefault before deciding, so a declined key behaves
 * exactly as it always did.
 */

/** Elements where an arrow key belongs to the control, not to the book. */
const TEXT_ENTRY = new Set(["INPUT", "TEXTAREA", "SELECT"]);

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (TEXT_ENTRY.has(target.tagName)) return true;
  if (target.isContentEditable) return true;
  // A control that has announced it opens something owns its own arrow keys.
  if (target.getAttribute("aria-expanded") === "true") return true;
  return false;
}

export default function PageTurn() {
  const pathname = usePathname();
  const router = useRouter();

  const index = navigation.findIndex((d) => d.href === pathname);
  const inSequence = index !== -1;

  const previous = inSequence && index > 0 ? navigation[index - 1] : null;
  const next =
    inSequence && index < navigation.length - 1 ? navigation[index + 1] : null;

  useEffect(() => {
    if (!inSequence) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      if (isTyping(event.target)) return;

      if (event.key === "ArrowRight" && next) {
        event.preventDefault();
        router.push(next.href);
      } else if (event.key === "ArrowLeft" && previous) {
        event.preventDefault();
        router.push(previous.href);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inSequence, next, previous, router]);

  if (!inSequence || (!next && !previous)) return null;

  /** Folio for a route, from the canonical order. Home is unnumbered. */
  const folio = (href: string) => {
    const at = navigation.findIndex((d) => d.href === href);
    return at <= 0 ? null : String(at).padStart(2, "0");
  };

  const invitation = next ? homeContent.invitations[next.href] : "";
  // Whether this chapter ends on a turn of its own is a property of the
  // route (data/navigation.ts), not a special case held in this component.
  const here = navigation[index];
  const showNext = Boolean(next) && !here?.ownExit;

  return (
    <nav
      aria-label="Turn page"
      className="border-t border-hairline bg-paper"
    >
      {/* Padding is lighter when the Next panel is suppressed — the block is
          then a single rule of apparatus, and full chapter spacing around it
          reads as a section that failed to load. */}
      <div
        className={`mx-auto max-w-shell px-5 sm:px-8 lg:px-10 ${
          showNext ? "py-16 md:py-20" : "py-8"
        }`}
      >
        {showNext && next ? (
          <Link href={next.href} className="group block">
            <p className="apparatus">Next</p>

            <p className="mt-5 flex items-baseline gap-4 font-serif-display text-fluid-title text-ink">
              {folio(next.href) ? (
                <span className="font-mono text-apparatus-xs text-hairline transition-colors duration-300 ease-editorial group-hover:text-through-line">
                  {folio(next.href)}
                </span>
              ) : null}
              <span className="hang">{next.label}</span>
              <span
                aria-hidden="true"
                className="inline-block text-graphite transition-transform duration-[700ms] ease-editorial group-hover:translate-x-2 motion-reduce:transition-none"
              >
                &rarr;
              </span>
            </p>

            {/* The next chapter's own opening line, quoted. Never new copy
                written for this footer — same contract as Home's contents. */}
            {invitation ? (
              <p className="mt-4 max-w-measure font-reading text-fluid-read text-graphite text-pretty">
                {invitation}
              </p>
            ) : null}
          </Link>
        ) : null}

        <div
          className={`flex flex-wrap items-center justify-between gap-x-8 gap-y-4 ${
            showNext ? "mt-12 border-t border-hairline pt-6" : ""
          }`}
        >
          {previous ? (
            <Link
              href={previous.href}
              className="group font-mono text-apparatus-xs uppercase text-graphite transition-colors duration-300 ease-editorial hover:text-ink"
            >
              <span
                aria-hidden="true"
                className="mr-2 inline-block transition-transform duration-[700ms] ease-editorial group-hover:-translate-x-1 motion-reduce:transition-none"
              >
                &larr;
              </span>
              Back to {previous.label}
            </Link>
          ) : (
            <span />
          )}

          {/*
            The hint. Stated once, quietly, at the foot of the page — a reader
            who never notices it has lost nothing, and a reader who does has
            the rest of the book on two keys. Hidden on touch, where there are
            no arrow keys and the line would just be a lie.
          */}
          <p className="hidden font-mono text-apparatus-xs uppercase text-graphite/70 [@media(hover:hover)]:block">
            <kbd className="font-mono">&larr;</kbd>{" "}
            <kbd className="font-mono">&rarr;</kbd> turns the page
          </p>
        </div>
      </div>
    </nav>
  );
}
