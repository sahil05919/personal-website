/**
 * heroRhythm
 *
 * The shared skeleton of the book's first and last pages.
 *
 * Contact echoes Home: same left edge, same container width, same typographic
 * scale, same vertical intervals. The echo is the entire concept, so the
 * measurements live here rather than being duplicated in two components where
 * they would silently drift apart.
 *
 * IMPORTANT — these values mirror components/home/Frontispiece.tsx, not
 * app/page.tsx. If the Frontispiece is edited, edit it here and the ending
 * follows. They have drifted once already: this file described the previous
 * build's hero (max-w-6xl, font-display, text-7xl) for the whole period after
 * Home was rewritten, and nobody saw it because none of these classes were
 * being generated.
 *
 * WHICH BRINGS US TO THE THING THAT MUST NOT BE UNDONE:
 * Tailwind only generates classes it finds in the paths listed under `content`
 * in tailwind.config.js. That array MUST include './lib/**\/*.{ts,tsx}' or
 * every class in this file is scanned out and the Contact page renders with no
 * scale, no colour and no spacing at all. If Contact ever looks unstyled, check
 * that line first.
 */
export const heroRhythm = {
  /** Page padding. Matches Frontispiece's section. */
  page: 'px-6 md:px-8 pt-[96px] pb-16 md:pt-[112px] md:pb-24',

  /** Content column. The reading measure the whole book shares. */
  container: 'mx-auto max-w-2xl',

  /**
   * The eyebrow slot. On Home this holds the mono label ("Sahil Kumar —
   * London"). On Contact it is reserved and left empty — the rhythm starts
   * before the content does. Height equals one 11px mono line.
   */
  eyebrowSlot: 'h-4',

  /** Interval: eyebrow to headline. Home sets mb-6 on the eyebrow. */
  eyebrowToHeadline: 'mt-6',

  /** Headline. Matches the Frontispiece title exactly. */
  headline:
    'font-serif-display font-normal text-[3.25rem] md:text-[4.5rem] leading-[0.98] tracking-[-0.02em] text-balance text-ink',

  /** Interval: headline to body. */
  headlineToBody: 'mt-8 md:mt-10',

  /** Body. Matches the Statement's reading measure. */
  body: 'font-reading text-[1.0625rem] md:text-[1.1875rem] leading-[1.7] text-ink',

  /** Interval: body to the actions row. */
  bodyToActions: 'mt-10 md:mt-12',

  /** Interval: actions to the open field. */
  actionsToField: 'mt-16 md:mt-20',

  /**
   * The open field. On Home this is Fig. 01 — a 640x280 SVG at full column
   * width. Here it is empty, and its emptiness is only legible because the
   * proportion matches. Aspect ratio rather than a fixed height, so it tracks
   * the figure at every viewport.
   */
  field: 'w-full aspect-[640/280]',
} as const;