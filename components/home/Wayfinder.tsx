'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { isActiveRoute, navigation } from '@/data/navigation';

/**
 * Wayfinder — the contents, kept open.
 *
 * The brief asked for wayfinding that is always available without interrupting
 * the reading. The constraint that shapes this component is that a navbar
 * already exists at the top of every page: nine labels repeated down the side
 * of the viewport would be the same list twice, which is noise, not navigation.
 *
 * So this is not a second menu. It is a page edge index — nine destinations in
 * the right margin, each a short rule with its name beside it, set in the same
 * mono apparatus register as the figure caption and the colophon.
 *
 * The labels were hidden behind hover in the first version. That was wrong: a
 * column of unlabelled ticks tells a reader that something is there without
 * telling them what, so the only way to find out is to point at each one in
 * turn. Wayfinding that has to be interrogated is not wayfinding. They are now
 * always legible — graphite against paper, which clears AA at this size — and
 * only the weight changes on hover.
 *
 * It answers the left-hand spine rather than competing with it: structure runs
 * down one margin, orientation down the other.
 *
 * It stays out of the way until the reader has left the frontispiece. Arriving
 * at a title page that already has navigation stapled to its edge would
 * undercut the one thing the first screen is for.
 *
 * `xl` and up only. With the labels permanently set, the rail needs about
 * 110px of clear margin, and below 1280px the widened column does not leave
 * it. Under that the navbar carries navigation, as it does on every other
 * page. Nothing here is unique to Home except where it is mounted, so it can
 * be lifted site-wide later without changes.
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
      // `inert` is not used: the links stay reachable by keyboard even while
      // the rail is faded, and focus reveals it. Hiding a link from the tab
      // order because of a scroll position would be a trap.
      className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 focus-within:opacity-100 xl:block 2xl:right-8 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <ul className="flex flex-col items-end gap-2.5">
        {navigation.map((destination) => {
          const active = isActiveRoute(pathname, destination.href);

          return (
            <li key={destination.href}>
              <Link
                href={destination.href}
                aria-current={active ? 'page' : undefined}
                className="group flex items-center justify-end gap-3 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 ${
                    active ? 'text-ink' : 'text-graphite group-hover:text-ink'
                  }`}
                >
                  {destination.label}
                </span>

                <span
                  aria-hidden="true"
                  className={`h-px shrink-0 transition-all duration-300 ${
                    active
                      ? 'w-6 bg-through-line'
                      : 'w-3 bg-hairline group-hover:w-6 group-hover:bg-graphite'
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
