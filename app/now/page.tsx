// app/now/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { lastUpdated, seasonLine, movements } from "./now-content";

// Bare title only. The root layout applies the "%s | Sahil Kumar" template,
// so anything more here double-suffixes the tab.
export const metadata: Metadata = {
  title: "Now",
  description:
    "A living snapshot of what Sahil Kumar is currently focused on — working, building, reading, and exploring.",
};

// One rule for the whole page:
//   font-serif-display (Fraunces) = Sahil speaking — the season line, the claims.
//   font-mono (JetBrains Mono)    = the apparatus — title, dates, all labels.
//   font-sans                     = descriptive prose.
//
// NOTE: `font-serif-display`, not `font-serif`. tailwind.config.js defines no
// `serif` key, so `font-serif` silently resolves to Tailwind's default
// ui-serif/Georgia stack — not Fraunces.
//
// Fraunces and JetBrains Mono are loaded at 400 and 500 only. Never use
// font-semibold or heavier on either; the browser will synthesise the weight.
const LABEL = "font-mono uppercase";

// Gutter width. Kept as a constant because the spine is absolutely positioned
// against it — change one, change both.
const GUTTER = "140px";

export default function NowPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6 pb-24">
      {/* hero — no bottom rule; the first movement's accent rule does that job */}
      <header className="py-10">
        <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className={`${LABEL} text-[12px] font-medium tracking-[0.16em] text-foreground`}>
            Now
          </h1>
          <span className={`${LABEL} text-[11px] tracking-[0.12em] text-muted-foreground`}>
            Updated {lastUpdated}
          </span>
        </div>
        <p className="max-w-[34ch] text-balance font-serif-display text-[28px] font-medium leading-[1.15] text-foreground sm:text-4xl">
          {seasonLine}
        </p>
      </header>

      {/* One continuous spine runs the full height of this wrapper; the three
          accent rules cross it. The per-row borders are gone — this is the
          Through-Line motif made literal on the page about continuity. */}
      <div className="relative mt-20 space-y-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 hidden w-px bg-border sm:block"
          style={{ left: GUTTER }}
        />

        {movements.map((movement) => (
          <section key={movement.key}>
            {/* one accent rule, identical for every movement */}
            <div className="relative mb-4 border-t-2 border-primary pt-3">
              <h2 className={`${LABEL} text-[13px] font-medium tracking-[0.2em] text-foreground`}>
                {movement.title}
              </h2>
            </div>

            {movement.entries.map((entry) => (
              <div
                key={entry.label}
                className="grid grid-cols-1 border-b border-border last:border-b-0 sm:grid-cols-[140px_1fr]"
              >
                <h3
                  className={`${LABEL} pt-4 text-[11.5px] font-medium tracking-[0.12em] text-foreground sm:py-4 sm:pr-6 sm:text-right`}
                >
                  {entry.label}
                </h3>

                <div className="pb-4 pt-1.5 text-[15px] leading-relaxed text-muted-foreground sm:py-4 sm:pl-6 sm:text-[15.5px]">
                  {entry.paragraphs?.map((p, idx) => (
                    <p key={idx} className="mb-2 last:mb-0">
                      {p}
                    </p>
                  ))}

                  {/* stated positions — the only other place Fraunces appears */}
                  {entry.claims && (
                    <ul className="m-0 flex list-none flex-col gap-4 p-0">
                      {entry.claims.map((claim) => (
                        <li
                          key={claim.text}
                          className="text-balance font-serif-display text-[17px] font-normal leading-snug text-foreground"
                        >
                          {claim.essayHref ? (
                            <Link
                              href={claim.essayHref}
                              className="underline decoration-border underline-offset-[6px] transition-colors hover:decoration-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                              {claim.text}
                            </Link>
                          ) : (
                            claim.text
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* place chips — visited (filled) vs planned (outlined) */}
                  {entry.placeGroups?.map((group) => (
                    <div key={group.label} className="mt-5 first:mt-0">
                      <div
                        className={`${LABEL} mb-2.5 text-[10px] tracking-[0.14em] text-muted-foreground`}
                      >
                        {group.label}
                      </div>
                      <ul
                        aria-label={group.label}
                        className="m-0 flex list-none flex-wrap gap-2 p-0"
                      >
                        {group.items.map((place) => (
                          <li
                            key={place}
                            className={
                              group.variant === "visited"
                                ? "rounded-full border border-border bg-muted px-3 py-1 text-[13px] text-foreground"
                                : "rounded-full border border-dashed border-border px-3 py-1 text-[13px] text-muted-foreground"
                            }
                          >
                            {place}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* published pieces — plain links. This whole block moves to
                      /writing once that route exists. */}
                  {entry.linkGroups?.map((group) => (
                    <div key={group.label} className="mt-5 first:mt-0">
                      <div
                        className={`${LABEL} mb-2.5 text-[10px] tracking-[0.14em] text-muted-foreground`}
                      >
                        {group.label}
                      </div>
                      <ul
                        aria-label={group.label}
                        className="m-0 flex list-none flex-col gap-2 p-0"
                      >
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[15px] text-foreground underline decoration-border underline-offset-[5px] transition-colors hover:decoration-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                              {link.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>

      <footer className="mt-20 border-t border-border pt-5">
        <p className={`${LABEL} mb-2 text-[11px] tracking-[0.12em] text-muted-foreground`}>
          Updated {lastUpdated}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This page changes as life does — no fixed schedule, just whenever the
          season shifts.
        </p>
      </footer>
    </div>
  );
}