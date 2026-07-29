/**
 * heroRhythm
 *
 * The shared skeleton of the book's first and last pages.
 *
 * The Contact page is built to echo the Home hero: same left edge, same
 * container width, same typographic scale, same vertical intervals. The
 * echo is the entire concept, so the measurements live here rather than
 * being duplicated in two components where they would silently drift
 * apart over time.
 *
 * IMPORTANT — these values must match app/page.tsx exactly. If the Home
 * hero is edited, edit it here and the ending follows automatically. If
 * the two ever disagree, the Contact page stops working as a design and
 * becomes an ordinary page that happens to be left-aligned.
 */
export const heroRhythm = {
  /** Page padding. Identical on both pages. */
  page: 'px-6 md:px-24 py-24 md:py-32',

  /** Content column. Establishes the left edge the whole book shares. */
  container: 'max-w-6xl mx-auto',

  /**
   * The eyebrow slot. On Home this holds the small mono label above the
   * headline. On Contact it is reserved and left empty — the rhythm
   * starts before the content does. Height must equal the rendered
   * height of Home's eyebrow line.
   */
  eyebrowSlot: 'h-5 md:h-6',

  /** Headline. Must match the Home hero's scale, weight and leading. */
  headline:
    'font-display font-bold tracking-tight leading-[1.05] text-4xl md:text-6xl lg:text-7xl',

  /** Interval: eyebrow to headline. */
  eyebrowToHeadline: 'mt-4 md:mt-6',

  /** Interval: headline to body. */
  headlineToBody: 'mt-6 md:mt-8',

  /** Body paragraph. Must match the Home hero's measure and colour. */
  body: 'max-w-2xl text-base md:text-lg leading-8 text-muted-foreground',

  /** Interval: body to call-to-action row. */
  bodyToActions: 'mt-10 md:mt-12',

  /**
   * Interval: actions to the open field. On Home this is where the
   * dot-field-to-line composition begins.
   */
  actionsToField: 'mt-24 md:mt-32',

  /**
   * The open field. On Home this is occupied by the Through-Line
   * animation. Here it is empty, and its emptiness is only legible
   * because the height matches.
   */
  field: 'h-32 md:h-48',
} as const;