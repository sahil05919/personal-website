"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { homeContent } from "@/data/homeContent";
import { navigation } from "@/data/navigation";
import { chromeHi } from "@/data/hinglish";
import { useVariant } from "@/hooks/use-reading-mode";

/** Elements where an arrow key belongs to the control, not to the book. */
const TEXT_ENTRY = new Set(["INPUT", "TEXTAREA", "SELECT"]);

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (TEXT_ENTRY.has(target.tagName)) return true;
  if (target.isContentEditable) return true;
  if (target.getAttribute("aria-expanded") === "true") return true;
  return false;
}

export default function PageTurn() {
  const nextLabel = useVariant("Next", chromeHi.next);
  const turnsHint = useVariant("turns the page", chromeHi.turnsThePage);
  const backTo = useVariant("Back to", chromeHi.backTo);

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
  const here = navigation[index];
  const showNext = Boolean(next) && !here?.ownExit;

  return (
    <nav
      aria-label="Turn page"
      className="border-t border-hairline bg-transparent"
    >
      <div
        className={`mx-auto max-w-shell px-5 sm:px-8 lg:px-10 ${
          showNext ? "py-16 md:py-20" : "py-8"
        }`}
      >
        {showNext && next ? (
          <Link href={next.href} className="group block">
            <p className="apparatus">{nextLabel}</p>

            <p className="mt-5 flex items-baseline gap-4 font-serif-display text-fluid-title text-ink">
              {folio(next.href) ? (
                <span className="font-mono text-apparatus-xs text-graphite/70 transition-colors duration-300 ease-editorial group-hover:text-through-line">
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
              {backTo} {previous.label}
            </Link>
          ) : (
            <span />
          )}

          <p className="hidden font-mono text-apparatus-xs uppercase text-graphite/70 [@media(hover:hover)]:block">
            <kbd className="font-mono">&larr;</kbd>{" "}
            <kbd className="font-mono">&rarr;</kbd> {turnsHint}
          </p>
        </div>
      </div>
    </nav>
  );
}