/**
 * WRITING — the published pieces.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS FILE EXISTS
 *
 * These five pieces were already on the site, and they were in the wrong place
 * and at the wrong size: a five-row sub-list called "finished, eventually",
 * sitting inside the Answering section, roughly four fifths of the way down
 * /now. To reach them a reader had to open a page about this season, scroll
 * past a workbench, a Gita line, three unfinished fragments — and then notice a
 * small mono label.
 *
 * They are the only things on this site that were published somewhere other
 * than this site, and two of them were commissioned by a business school. They
 * are also the single strongest argument the record makes that the person
 * writing it can write, which is most of the point of a record like this.
 *
 * So they get a leaf of their own, and /now keeps them too — that page's
 * "finished, eventually" list still reads from this file, so there is one
 * source of truth and the two cannot drift.
 *
 * ---------------------------------------------------------------------------
 * WHAT IS AND IS NOT RECORDED
 *
 * Title, where it was published, and the address. That is all that is actually
 * known for certain.
 *
 * `year` is present only where the publication's own URL carries the date —
 * both Bayes pieces do (…/2024/december/…, …/2025/september/…). The LinkedIn
 * articles do not, and the site does not have a record of when they went up, so
 * they are undated. An invented date on a page of published work would be the
 * first entry on the errata leaf, and "roughly 2025" is an invented date with a
 * hedge in front of it.
 *
 * No summaries, no excerpts, no reading times. A one-line description of an
 * essay is a worse version of its title, and every one of these titles is
 * already a question or a claim doing that job.
 *
 * ORDER is editorial, not chronological: the two Bayes commissions sit last
 * because they are the most institutional and the least characteristic. If a
 * reader only opens one, it should be the first.
 */

export interface WritingPiece {
  title: string;
  href: string;
  /** Where it was published. Shown as apparatus. */
  source: string;
  /** Only where the publication's own URL carries it. */
  year?: string;
}

export const writingIntro = {
  eyebrow: 'Back matter',
  title: 'Writing',
  standfirst: 'The pieces that were finished, and published elsewhere.',
  body: [
    "Most of what I write stops halfway and stays that way — there is a pile of it on the Now page, kept unfinished on purpose. These are the ones that got to the end and went somewhere.",
    'Two were written for Bayes, who asked. The rest were not asked for by anybody.',
  ],
  /** Sits above the list. */
  note: 'All of these live on other people’s websites. Links open there.',
} as const;

export const writing: WritingPiece[] = [
  {
    title: 'What Happens to Our Childhood Dreams?',
    href: 'https://www.linkedin.com/pulse/what-happens-our-childhood-dreams-sahil-kumar-w0fze/',
    source: 'LinkedIn',
  },
  {
    title:
      'When Was the Last Time You Did Something Without Knowing It Would Work?',
    href: 'https://www.linkedin.com/pulse/when-last-time-you-did-something-without-knowing-would-sahil-kumar-u4gve/',
    source: 'LinkedIn',
  },
  {
    title: 'The Year AI Became Adult',
    href: 'https://www.linkedin.com/pulse/year-ai-became-adult-sahil-kumar-m0ume/',
    source: 'LinkedIn',
  },
  {
    title: 'From Haryana to London: My Journey at Bayes Business School',
    href: 'https://www.bayes.citystgeorges.ac.uk/study/masters/blogs/2024/december/from-haryana-to-london-my-journey-at-bayes-business-school',
    source: 'Bayes Business School',
    year: '2024',
  },
  {
    title: 'Student to Student: How to Make the Most of Your Master’s at Bayes',
    href: 'https://www.bayes.citystgeorges.ac.uk/study/masters/blogs/2025/september/student-to-student-how-to-make-the-most-of-your-masters-at-bayes',
    source: 'Bayes Business School',
    year: '2025',
  },
];

/**
 * The shape /now's Answering section expects.
 *
 * That component reads `text` where this file reads `title`, and it is not
 * worth changing a working page to unify a key name — but it IS worth making
 * sure both read the same array, so a sixth piece appears in both places at
 * once and neither list can go stale.
 */
export const publishedForNow = writing.map((piece) => ({
  text: piece.title,
  href: piece.href,
  source: piece.source === 'Bayes Business School' ? 'Bayes' : piece.source,
}));
