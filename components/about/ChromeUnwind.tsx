'use client';

import { useEffect } from 'react';

/**
 * The chrome unwind.
 *
 * The reader arrives at a face on paper with nothing competing: the header is
 * present in the DOM but visually near-absent, and resolves to normal as they
 * scroll past the frontispiece.
 *
 * Why not hide the navbar entirely until scroll: a reader who finishes the page
 * and wants Journey would have no navigation, and would have to scroll back up
 * through a full viewport of silence and a full-height portrait to find it.
 * A beautiful room with the door behind the furniture. This keeps the door
 * where they left it.
 *
 * Implemented as a class on <html> rather than by editing Navbar, so the
 * behaviour is scoped to this page and reverts cleanly on navigate away.
 * The CSS lives in globals.css.
 *
 * Motion note: this resolves ONCE and then holds. It does not fade back in and
 * out on scroll direction — that would be an effect, and the page has none.
 */
export function ChromeUnwind() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Reduced motion: skip the unwind entirely, show normal chrome.
    if (media.matches) return;

    root.classList.add('about-frontispiece');

    let settled = false;

    const onScroll = () => {
      if (settled) return;
      // Resolve a little before the portrait leaves the viewport, so the
      // header is fully present by the time the prose begins.
      if (window.scrollY > window.innerHeight * 0.45) {
        settled = true;
        root.classList.remove('about-frontispiece');
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Handle restored scroll position on back-navigation.

    return () => {
      window.removeEventListener('scroll', onScroll);
      root.classList.remove('about-frontispiece');
    };
  }, []);

  return null;
}
