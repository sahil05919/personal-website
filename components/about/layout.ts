/**
 * THE MANUSCRIPT BLOCK.
 *
 * Every section on this page composes against one grid, defined here so the
 * alignment cannot drift between components. (Same reasoning as lib/heroRhythm.ts.)
 *
 * The previous build laid a 36rem reading column inside an 87.5rem container,
 * which put ~45% of every row in permanent void on the right-hand side. That
 * reads as an unfinished layout, not as a margin.
 *
 *   SHELL   52rem, centred. Inner width after padding is 47rem.
 *   GRID    [ 9rem margin | 35.5rem reading ], 2.5rem gutter.
 *
 * The margin column is not decoration and is never empty where it appears: it
 * carries the mono apparatus — movement marks, section labels — and the spine
 * runs down its gutter. Display moments span BOTH columns, so a loud paragraph
 * is physically wider (47rem) than a quiet one (35.5rem). That difference is
 * the page's main compositional device.
 *
 * SHELL_WIDE is for Marginalia alone, which spreads to 60rem. Widening one
 * section is legitimate when its content actually fills the width; widening
 * everything is how the last version got into trouble.
 */

export const SHELL = 'mx-auto w-full max-w-[52rem] px-6 md:px-10';

export const SHELL_WIDE = 'mx-auto w-full max-w-[60rem] px-6 md:px-10';

/** Two-column manuscript grid. Collapses to a single column below lg. */
export const GRID = 'lg:grid lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-x-10';

/**
 * Mono apparatus for the margin column.
 *
 * Tracking is 0.16em rather than the 0.3em used elsewhere on the site: at 10px
 * JetBrains Mono, 0.3em pushes "IV — Optimisation" to ~179px against a 144px
 * column, so every running head wrapped. 0.16em brings it to ~129px and the
 * labels sit on one line.
 *
 * Alignment is deliberately NOT set here. Margin-column uses want text-right;
 * Marginalia wants text-left, and Tailwind emits text-right after text-left, so
 * a local override would silently lose. Each caller sets its own.
 */
export const MARGIN_NOTE =
  'font-mono text-[10px] uppercase leading-[1.9] tracking-[0.16em] text-graphite';
