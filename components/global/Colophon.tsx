'use client';

import Link from "next/link";

import TwoClocks from "@/components/global/TwoClocks";
import { homeContent } from "@/data/homeContent";
import { destinations } from "@/data/navigation";
import { chromeHi } from "@/data/hinglish";
import { useVariant } from "@/hooks/use-reading-mode";

/**
 * The imprint — the last leaf of every copy.
 *
 * The site had a footer component that was never imported, which meant eight
 * of nine pages simply stopped: no way back, no contact route, no mark of
 * authorship, nothing to tell the reader they had reached the end rather than
 * lost the thread. Home had a colophon and nowhere else did.
 *
 * This is not a navigation bar in disguise. A colophon in a printed book is
 * set after the author has finished and is deliberately quieter than anything
 * above it — it records who made the thing, where, and out of what. So:
 *
 *   the mark      a rule and the name, at reading weight, on the left
 *   the contents  the eight destinations as a plain index, not as buttons
 *   the imprint   copyright, the two external records, and the typefaces
 *
 * The typefaces are named because they are true and because naming your
 * materials is what a colophon is *for*. Fraunces, Newsreader and JetBrains
 * Mono are the three faces on the site and there are no others.
 *
 * Server component. No motion — the reader has finished reading.
 */
export default function Colophon() {
  const contentsLabel = useVariant("Contents", chromeHi.contents);
  const imprintLine = useVariant(
    "A record kept in London. Revised when it stops being true.",
    chromeHi.imprint,
  );

  const year = new Date().getFullYear();
  const { links } = homeContent.colophon;

  return (
    <footer className="border-t border-hairline bg-paper text-ink">
      <div className="mx-auto max-w-shell px-5 pb-14 pt-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-16">
          {/* ── The mark ─────────────────────────────────────────────── */}
          <div>
            <span
              aria-hidden="true"
              className="block h-px w-16 bg-gradient-to-r from-through-line to-hairline"
            />

            <p className="mt-5 font-serif-display text-fluid-row text-balance">
              Sahil Kumar
            </p>

            <p className="mt-2 max-w-measure font-reading text-fluid-aside text-graphite">
              {imprintLine}
            </p>

            {/* The imprint row is the site's only route to the back matter and
                to GitHub and LinkedIn, and every link in it was a 13px-tall
                target — fine with a cursor, fiddly with a thumb, and this is the
                one row on a phone where the reader is deliberately reaching for
                a small thing. Each anchor is an `inline-flex min-h-11`: the type
                does not change size and the row grows by a few pixels. `gap-y-2`
                keeps two rows apart when it wraps. */}
            <ul className="mt-6 flex flex-wrap items-center gap-x-5 font-mono text-apparatus-xs uppercase text-graphite">
              <li>&copy; {year}</li>
              {/* Back matter, and the reason it sits here rather than in the
                  running head: an index and an errata leaf belong after the
                  text, beside the imprint, not alongside the chapters. This is
                  also the one place a reader would think to look for either. */}
              <li>
                {/* /a-z, not /index — Next normalises the latter to "/" and
                    the page silently served Home. See app/a-z/page.tsx. */}
                <Link
                  href="/a-z"
                  className="inline-flex min-h-11 items-center transition-colors duration-300 ease-editorial hover:text-through-line"
                >
                  Index
                </Link>
              </li>
              <li>
                <Link
                  href="/writing"
                  className="inline-flex min-h-11 items-center transition-colors duration-300 ease-editorial hover:text-through-line"
                >
                  Writing
                </Link>
              </li>
              <li>
                <Link
                  href="/errata"
                  className="inline-flex min-h-11 items-center transition-colors duration-300 ease-editorial hover:text-through-line"
                >
                  Errata
                </Link>
              </li>
              {links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center transition-colors duration-300 ease-editorial hover:text-through-line"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center transition-colors duration-300 ease-editorial hover:text-through-line"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── The contents, as an index ────────────────────────────── */}
          <nav aria-label="Colophon" className="md:min-w-[15rem]">
            <p className="apparatus">{contentsLabel}</p>

            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1 md:grid-cols-1 md:gap-y-0.5">
              {destinations.map((destination, i) => (
                <li key={destination.href}>
                  <Link
                    href={destination.href}
                    className="group flex items-baseline gap-3 py-1 font-reading text-fluid-aside text-graphite transition-colors duration-300 ease-editorial hover:text-ink"
                  >
                    <span className="font-mono text-apparatus-xs text-graphite/70 transition-colors duration-300 ease-editorial group-hover:text-through-line">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {destination.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── The imprint line: where, and what out of ─────────────────────
            Two clocks on the left, the materials on the right. Both are the
            same kind of statement — an imprint records the place a thing was
            made and the stuff it was made from — so they share one rule and
            one register. On narrow screens the materials line drops below the
            clocks rather than squeezing alongside them. */}
        {/* No top padding on this row: the clocks hang from a cord that starts
            at the rule itself, so any gap breaks the one detail that makes them
            read as objects on a wall rather than two icons. The materials line
            takes its own padding instead. */}
        <div className="mt-14 flex flex-col gap-10 border-t border-hairline sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <TwoClocks />

          <p className="font-mono text-apparatus-xs uppercase leading-[2] text-graphite/80 sm:pt-6 sm:text-right">
            Set in Fraunces, Newsreader
            <br className="hidden sm:inline" /> and JetBrains Mono
          </p>
        </div>
      </div>
    </footer>
  );
}
