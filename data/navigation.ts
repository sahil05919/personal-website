/**
 * Navigation — the canonical order of the book.
 *
 * ONE source. The navbar, Home's Contents list and Home's Wayfinder rail all
 * read this array. Before this file existed the order was written twice and
 * the two copies disagreed: the navbar ran About → Journey → Experience while
 * homeContent ran Journey → Media → Questions, and the label read "Question"
 * in one place and "Questions" in the other.
 *
 * If the order needs to change, change it here and it changes everywhere.
 * Do not re-declare a list of pages in a component.
 *
 * The route and the label now agree: `/questions`, "Questions". They did not
 * for a long time — the directory was `app/question` and the page called
 * itself Questions, so every link, index entry and errata reference had to
 * remember which one it was quoting. `/question` still resolves; it is a
 * permanent redirect declared in next.config.ts, because a URL that has been
 * on the internet does not stop existing when you rename the folder.
 */

export interface Destination {
  href: string;
  label: string;
  /**
   * This chapter ends on a turn of its own, so the sitewide PageTurn suppresses
   * its "Next" panel and renders only the footer bar beneath it.
   *
   * /about is the only one: it closes on a full-bleed hover inversion
   * (components/about/Exit.tsx) that was the best interaction on the site
   * before PageTurn existed and is the block PageTurn was generalised FROM.
   * Rendering both put two turn-page panels to the same destination one above
   * the other.
   *
   * This lived as a hardcoded `Set` of one inside PageTurn, which was the wrong
   * shape: whether a chapter has its own ending is a fact about the chapter,
   * not a special case in a component. As data it is declared once, beside the
   * route it describes, and a second chapter that earns a bespoke ending is a
   * one-word change rather than an edit to shared navigation logic.
   */
  ownExit?: boolean;
}

/** Canonical order, Home first. */
export const navigation: Destination[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About', ownExit: true },
  { href: '/journey', label: 'Journey' },
  { href: '/now', label: 'Now' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/media', label: 'Media' },
  { href: '/questions', label: 'Questions' },
  { href: '/contact', label: 'Contact' },
];

/**
 * The eight destinations Home's Contents lists. Home is excluded — a table of
 * contents does not list itself.
 */
export const destinations: Destination[] = navigation.filter(
  (item) => item.href !== '/'
);

/**
 * Active-route test, shared so the navbar and the Wayfinder cannot disagree
 * about which station is lit.
 */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
