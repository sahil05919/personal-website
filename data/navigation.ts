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
 * The route is `/question` (singular) because that is the directory name in
 * `app/`. The label is "Questions" because that is what the page calls itself.
 * The mismatch is deliberate and lives here so it lives nowhere else.
 */

export interface Destination {
  href: string;
  label: string;
}

/** Canonical order, Home first. */
export const navigation: Destination[] = [
  { href: '/', label: 'Home' },
  { href: '/journey', label: 'Journey' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/media', label: 'Media' },
  { href: '/about', label: 'About' },
  { href: '/question', label: 'Questions' },
  { href: '/now', label: 'Now' },
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
