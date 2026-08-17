import type { Metadata } from 'next';
import Link from 'next/link';

import { destinations } from '@/data/navigation';

/**
 * 404 — the page that was never set.
 *
 * Nine pages of Fraunces, Newsreader and warm uncoated paper, and then one
 * wrong character in a URL dropped the reader onto Next.js's built-in error
 * page: system sans-serif, pure white, a thin vertical rule, "This page could
 * not be found." It was the only screen on the whole site that looked like
 * software, and it was reachable from any mistyped link, any stale bookmark,
 * and every route that has ever been renamed.
 *
 * THE FRAME. In letterpress, type is *set* before it is printed. A page that
 * does not exist is not a page that was lost — it is a forme that was never
 * locked up, which is both literally what has happened here and a better
 * sentence than "not found". The rest of the page follows from that: no error
 * code shouting at 96px, no broken-robot illustration, no "oops".
 *
 * It gives the reader somewhere to go, because that is the entire job of this
 * page and the default did not do it — a plain index of the nine chapters,
 * set exactly as the Colophon sets its contents so the two read as one system.
 *
 * Server component. A 404 must render with JavaScript unavailable and be
 * useful in a text browser; it is the last page in the site that should depend
 * on anything.
 */

export const metadata: Metadata = {
  title: 'Not found',
  /* `noindex` matters more here than the copy does. Without it a 404 that
     returns readable prose is exactly the kind of page a crawler will happily
     index under whatever nonsense URL produced it. */
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <article className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-shell px-5 pb-28 pt-[88px] sm:px-8 md:pt-[112px] lg:px-10">
        <p className="apparatus">404</p>

        <h1 className="hang mt-7 max-w-wide font-serif-display text-fluid-display font-normal text-balance md:mt-9">
          This page was never set.
        </h1>

        <div className="mt-10 max-w-measure space-y-6 font-reading text-fluid-read text-pretty md:mt-12">
          <p>
            Either it moved, or it was only ever a link I got wrong somewhere
            else. Both happen. The second one is mine to fix, and the page that
            keeps track of that kind of thing is{' '}
            <Link href="/errata" className="link-rule">
              the errata leaf
            </Link>
            .
          </p>
          <p className="text-graphite">
            Everything that does exist is below.
          </p>
        </div>

        {/* The contents, set as the Colophon sets them — numbered folios, a
            plain index, no buttons. A reader who has just hit a dead end wants
            the table of contents, not a search box and a cheerful apology. */}
        <nav aria-label="Contents" className="mt-16 md:mt-20">
          <p className="apparatus">Contents</p>

          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {destinations.map((destination, i) => (
              <li key={destination.href} className="border-b border-hairline">
                <Link
                  href={destination.href}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span className="font-mono text-apparatus-xs text-hairline transition-colors duration-300 ease-editorial group-hover:text-through-line">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif-display text-fluid-row text-ink">
                    {destination.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}
