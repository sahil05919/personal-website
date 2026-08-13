import Link from "next/link";

import { homeContent } from "@/data/homeContent";
import { destinations } from "@/data/navigation";

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
              A record kept in London. Revised when it stops being true.
            </p>

            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-apparatus-xs uppercase text-graphite">
              <li>&copy; {year}</li>
              {links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-300 ease-editorial hover:text-through-line"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="transition-colors duration-300 ease-editorial hover:text-through-line"
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
            <p className="apparatus">Contents</p>

            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1 md:grid-cols-1 md:gap-y-0.5">
              {destinations.map((destination, i) => (
                <li key={destination.href}>
                  <Link
                    href={destination.href}
                    className="group flex items-baseline gap-3 py-1 font-reading text-fluid-aside text-graphite transition-colors duration-300 ease-editorial hover:text-ink"
                  >
                    <span className="font-mono text-apparatus-xs text-hairline transition-colors duration-300 ease-editorial group-hover:text-through-line">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {destination.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── The materials ───────────────────────────────────────────── */}
        <p className="mt-14 border-t border-hairline pt-5 font-mono text-apparatus-xs uppercase text-graphite/80">
          Set in Fraunces, Newsreader and JetBrains Mono
        </p>
      </div>
    </footer>
  );
}
