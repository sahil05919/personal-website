'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { destinations, isActiveRoute } from '@/data/navigation';

/**
 * Wayfinder — the fore-edge index.
 *
 * WHAT CHANGED
 *
 * This was mounted on Home only, and the comment on it said it could be lifted
 * sitewide without changes. It has been. The reason is compositional: the
 * reading column is held at 62rem so the measure stays honest, which on a
 * 1440px screen leaves roughly 220px of paper down each side. On Home that
 * margin was doing work — the spine runs down the left of it. On the other
 * eight pages both margins were simply empty, and a page with two empty
 * margins does not read as generous, it reads as unfinished.
 *
 * So the right margin now carries the index on every page, the way a thumb
 * index is cut into the fore-edge of a reference book: eight sections, marked
 * once, visible from outside the block.
 *
 * It is not a second navbar. The navbar is a utility with nine equal labels;
 * this is a position marker — you can see at a glance which of eight sections
 * you are in and how far through the sequence that is. The folio numbers are
 * the same ones Home's contents list and the colophon use, from the same
 * source, so all three can never disagree.
 *
 * The labels are permanently legible rather than hidden behind hover. A column
 * of unlabelled ticks tells a reader something is there without telling them
 * what, so the only way to find out is to point at each one in turn.
 * Wayfinding that has to be interrogated is not wayfinding.
 *
 * It stays out of the way until the reader has left the first screen, so
 * arriving at a title page or a page's opening never has navigation stapled to
 * its edge.
 *
 * `xl` and up only. Below 1280px the widened column does not leave the ~120px
 * of clear margin the labels need, and the navbar carries navigation as usual.
 */

const REVEAL_AFTER = 320;

export default function Wayfinder() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setVisible(window.scrollY > REVEAL_AFTER);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Contents"
      // `inert` is deliberately not used: the links stay reachable by keyboard
      // even while the rail is faded, and focus reveals it. Removing a link
      // from the tab order because of a scroll position would be a trap.
      className={`fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-700 ease-editorial focus-within:opacity-100 xl:block 2xl:right-8 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <ul className="flex flex-col items-end">
        {destinations.map((destination, i) => {
          const active = isActiveRoute(pathname, destination.href);

          return (
            <li key={destination.href}>
              <Link
                href={destination.href}
                aria-current={active ? 'page' : undefined}
                className="group flex items-center justify-end gap-3 py-[5px] pl-6"
              >
                <span
                  className={`font-mono text-apparatus-xs uppercase transition-colors duration-300 ease-editorial ${
                    active
                      ? 'text-ink'
                      : 'text-graphite/70 group-hover:text-ink'
                  }`}
                >
                  {destination.label}
                </span>

                <span
                  className={`w-[1.4rem] shrink-0 text-right font-mono text-apparatus-xs tabular-nums transition-colors duration-300 ease-editorial ${
                    active
                      ? 'text-through-line'
                      : 'text-hairline group-hover:text-graphite'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* The rule is the mark. It runs long and takes the accent on
                    the page you are reading, and grows on hover — the same
                    gesture the link idiom uses everywhere else on the site. */}
                <span
                  aria-hidden="true"
                  className={`h-px shrink-0 transition-all duration-500 ease-editorial ${
                    active
                      ? 'w-7 bg-through-line'
                      : 'w-3 bg-hairline group-hover:w-5 group-hover:bg-graphite'
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
