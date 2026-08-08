import Link from 'next/link';
import { homeContent } from '@/data/homeContent';

/**
 * Colophon — the close.
 *
 * Replaces the old footer, which was a black full-bleed panel with a noise
 * overlay, a glowing pill CTA and a pulsing status dot. None of that survives:
 * Home no longer makes a pitch, so it no longer needs a conversion surface.
 *
 * Note this is Home's own close, not a site-wide footer. Every other page
 * currently ends without one, which is a separate inconsistency to resolve.
 */
export default function Colophon() {
  const { close, links } = homeContent.colophon;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-paper text-ink px-6 md:px-8 pb-20 md:pb-28">
      <div className="mx-auto max-w-2xl">
        <div className="border-t border-hairline pt-6 font-mono text-[11px] leading-[1.7] text-graphite">
          <p>{close}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>&copy; {year} Sahil Kumar</span>

            {links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-through-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-through-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
