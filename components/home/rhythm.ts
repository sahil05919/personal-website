/**
 * Home — the measurement system.
 *
 * Every home section reads its column, gutter, measure and vertical interval
 * from here. Previously each component carried its own `px-6 md:px-8`,
 * `max-w-2xl` and `pb-20 md:pb-28`, which meant the spacing was five separate
 * decisions that happened to agree, and the reading measure (42rem at 19px
 * Newsreader, roughly 70 characters) was wider than the About page's 36rem
 * with no reason for the difference.
 *
 * Lives in components/ rather than lib/ on purpose: `tailwind.config.js` does
 * not scan lib/, so class strings kept there are purged at build time. That is
 * an existing bug affecting lib/heroRhythm.ts on the Contact page; this file
 * stays out of its way.
 *
 * THE COLUMN
 *
 *   |<--------------------- shell (62rem max) ---------------------->|
 *   | gutter |<----------------- content (59.5rem) ----------------->|
 *   |  2.5rem|
 *   ^
 *   the spine lives here
 *
 * The gutter is not decoration. It is the channel the through-line runs down,
 * reserved so the line never crowds the measure — which is why the About
 * page's spine has to hide itself below `lg`, and this one does not.
 */

/**
 * Outer container. Content width plus the spine gutter.
 *
 * 62rem, not 48.5rem. At the narrower width the page sat in the middle of a
 * 1280px screen with 250px of dead paper down each side, and the figure — the
 * one element that is supposed to command the first screen — was 776px of a
 * 1280px viewport. Widening the shell does NOT widen the prose: `measure`
 * still holds the reading column at 36rem. Only the elements that should span
 * — the figure, the title, the contents rows — take the extra width.
 */
export const shell = 'mx-auto w-full max-w-[62rem] px-5 sm:px-8 lg:px-10';

/**
 * Inner container. Establishes the gutter and the positioning context the
 * spine segment is absolutely placed within. Always pair with `spine`.
 */
export const gutter = 'relative pl-6 md:pl-10';

/** Sustained prose. Roughly 62 characters at the fluid reading size. */
export const measure = 'max-w-[36rem]';

/** Display type breaks the measure. The claim, standfirsts. */
export const wide = 'max-w-[46rem]';

/**
 * Full column. The figure, the title and the contents rows. These are the
 * three things that are allowed to be as wide as the page is.
 */
export const full = 'w-full';

/**
 * Vertical interval between sections. Viewport-relative so the page keeps its
 * proportions instead of holding a desktop gap on a 667px phone, and clamped
 * so it can neither collapse nor run away on a large monitor.
 */
export const sectionY = 'py-[clamp(2.25rem,5vh,4rem)]';

/* `openingY` and `closingY` were declared here — a first and a last interval,
   differing from `sectionY` above — and neither was ever imported by anything.
   Home's sections all use `sectionY`, and the asymmetry those two described is
   handled by the padding on the sections themselves. Removed in the August 2026
   pass: an exported constant with no consumer is a design decision that was
   reversed and left lying about, and the next person to read this file would
   reasonably assume the rhythm has three intervals when it has one.
*/
