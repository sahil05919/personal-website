/**
 * THE INDEX — back matter.
 *
 * ---------------------------------------------------------------------------
 * WHY
 *
 * This site is a book on every page and in almost every word it uses about
 * itself: frontispiece, standfirst, folio, recto, plate, marginalia, endpaper,
 * imprint, colophon, back matter, "turn page". It has a table of contents on
 * Home and a running head in the navbar.
 *
 * And it had no index — the one object a book of this kind is most defined by,
 * and the only one that answers the question a contents list cannot: not "what
 * are the chapters called" but "what is actually in here".
 *
 * It solves a second problem that had nothing to do with bookishness. Nine long
 * essays is a lot to ask of someone who has ninety seconds, and the site gave
 * them no way in except to start reading and hope. An index is the fastest
 * honest summary of a body of work that exists: you scan it and you know what
 * the thing is about, without a word of marketing copy being written.
 *
 * ---------------------------------------------------------------------------
 * WHAT GOES IN IT
 *
 * Only things genuinely on the site, and every reference has been checked
 * against the page it points at. An index that sends a reader to a page where
 * the term does not appear is worse than no index, and this is the site with an
 * errata leaf — the standard here is higher than usual, not lower.
 *
 * Proper nouns, places, objects and recurring preoccupations. Not every noun:
 * an index that lists everything is a concordance, and a concordance is
 * unreadable. The test is whether someone might plausibly arrive looking for
 * it.
 *
 * `note` is a disambiguator in the manner of a real index ("Mahendragarh, the
 * shop in"), not a description. Keep it under five words or it becomes a
 * summary and the column stops scanning.
 *
 * ---------------------------------------------------------------------------
 * ORDER
 *
 * Alphabetical by `term`, computed at render — do not hand-sort this array. New
 * entries go anywhere; they will land in the right letter group on their own.
 * Sorting is locale-aware so "É" files under E rather than after Z.
 */

export interface IndexRef {
  href: string;
  /** The chapter's own name, as the navigation calls it. */
  label: string;
}

export interface IndexEntry {
  term: string;
  /** Short disambiguator, index-style. Optional and usually absent. */
  note?: string;
  refs: IndexRef[];
}

/* Shorthands, so a route is never spelled out twice and can never drift from
   the label the navigation uses for it. */
const ABOUT = { href: '/about', label: 'About' };
const JOURNEY = { href: '/journey', label: 'Journey' };
const NOW = { href: '/now', label: 'Now' };
const PROJECTS = { href: '/projects', label: 'Projects' };
const EXPERIENCE = { href: '/experience', label: 'Experience' };
const MEDIA = { href: '/media', label: 'Media' };
const QUESTIONS = { href: '/questions', label: 'Questions' };
const CONTACT = { href: '/contact', label: 'Contact' };
const ERRATA = { href: '/errata', label: 'Errata' };

export const indexIntro = {
  eyebrow: 'Back matter',
  title: 'Index',
  standfirst: 'What is actually in here.',
  body: [
    'A contents list tells you what the chapters are called. It does not tell you that there is a saree shop in it, or nine years of emissions data, or a Brighton breakwater, or the reason a page on this site is allowed to be wrong in public.',
    'This is the other list. If you have ninety seconds rather than an afternoon, start here and go straight to whatever you recognise.',
  ],
} as const;

export const indexEntries: IndexEntry[] = [
  { term: 'Accounts Payable', refs: [NOW, EXPERIENCE] },
  { term: 'AI workflows', refs: [NOW] },
  /* "Attrition" was here, pointing at /projects, and was cut before this page
     shipped: the word appears in that file only inside a source comment about
     a project that has not been built. An index entry for something a reader
     cannot find is the exact failure this file's header calls worse than no
     index at all, and it would have been the first thing on the errata leaf.
     Restore it when the analysis exists and is an essay. */
  { term: 'Bayes Business School', refs: [JOURNEY, PROJECTS, EXPERIENCE] },
  { term: 'Bhagavad Gita', refs: [NOW] },
  { term: 'Brighton', refs: [MEDIA, NOW] },
  { term: 'British Library', refs: [NOW] },
  { term: 'British Museum', refs: [NOW] },
  { term: 'Business Intelligence Reporting Model', refs: [PROJECTS] },
  { term: 'Cambridge', refs: [MEDIA, NOW] },
  { term: 'Changing your mind', refs: [QUESTIONS] },
  { term: 'Chess', refs: [ABOUT] },
  { term: 'Cricket', refs: [ABOUT] },
  { term: 'Dating app dataset', note: 'synthetic', refs: [PROJECTS] },
  { term: 'Dhoni, MS', refs: [ABOUT] },
  { term: 'Dishoom', note: 'the pav bhaji', refs: [ABOUT] },
  { term: 'Emissions', note: 'Scope 1 and 2', refs: [PROJECTS] },
  { term: 'Enhanceer', refs: [EXPERIENCE] },
  { term: 'Equinor', refs: [PROJECTS] },
  { term: 'Errata', note: 'what this record got wrong', refs: [ERRATA] },
  { term: 'Family', refs: [ABOUT, JOURNEY] },
  { term: 'Finance Assistant', refs: [ABOUT, NOW, EXPERIENCE] },
  { term: 'Folding', note: 'the first job in the shop', refs: [EXPERIENCE] },
  { term: 'GoPro', refs: [PROJECTS] },
  { term: 'Graduation', refs: [MEDIA] },
  { term: 'Haryana', refs: [ABOUT, JOURNEY] },
  { term: 'Hindi Shayari', refs: [NOW] },
  { term: 'HR', note: 'the first career', refs: [JOURNEY, EXPERIENCE] },
  { term: 'HR Analytics Dashboard', refs: [PROJECTS] },
  { term: 'Invigilation', refs: [EXPERIENCE] },
  { term: 'Invoices', refs: [NOW, EXPERIENCE] },
  { term: 'IPL', note: 'in Power BI', refs: [NOW] },
  { term: 'Jay Bharat Maruti', refs: [EXPERIENCE] },
  { term: 'Lacoste', refs: [PROJECTS] },
  { term: 'Leaving India', refs: [JOURNEY] },
  { term: 'London', refs: [ABOUT, JOURNEY, NOW, MEDIA] },
  { term: 'Machine learning', refs: [PROJECTS] },
  { term: 'Mahendragarh', note: 'the shop is there', refs: [JOURNEY, EXPERIENCE] },
  { term: 'MBA', refs: [JOURNEY] },
  { term: 'Mercedes-Benz', refs: [PROJECTS] },
  { term: 'Messi, Lionel', refs: [ABOUT] },
  { term: 'Middlesex University', refs: [NOW, EXPERIENCE, MEDIA] },
  { term: 'Motorcycle', refs: [JOURNEY] },
  { term: 'MSc Business Analytics', refs: [ABOUT, JOURNEY, PROJECTS] },
  { term: 'Netflix', refs: [PROJECTS] },
  { term: 'Note-taking', refs: [NOW, EXPERIENCE] },
  { term: 'Notting Hill', refs: [MEDIA] },
  { term: 'Oracle', refs: [EXPERIENCE] },
  { term: 'Oxford', refs: [MEDIA, NOW] },
  { term: 'Pooja Saree Centre', refs: [EXPERIENCE] },
  { term: 'Power BI', refs: [NOW, PROJECTS] },
  { term: 'Punjabi songs', refs: [ABOUT] },
  { term: 'Rauha', refs: [EXPERIENCE] },
  { term: 'Residual', note: 'the 1.5 that would not close', refs: [PROJECTS] },
  { term: 'Rewriting', note: 'and what is kept', refs: [NOW, ERRATA] },
  { term: 'St Luke’s Community Centre', refs: [NOW] },
  { term: 'Seven Sisters', refs: [NOW] },
  { term: 'SolutionTech', refs: [EXPERIENCE] },
  { term: 'Unitemps', refs: [EXPERIENCE] },
  { term: 'Unsigned', note: 'writing without a name', refs: [CONTACT] },
  { term: 'USS', note: 'the pension decision tool', refs: [PROJECTS] },
  { term: 'Walking tours', refs: [NOW] },
  { term: 'Wholesale buyers', refs: [EXPERIENCE] },
  { term: 'Winter', note: 'the first one', refs: [NOW] },
];

/** Grouped A–Z, sorted at render. Never hand-sort the array above. */
export function groupIndex(entries: IndexEntry[]) {
  const sorted = [...entries].sort((a, b) =>
    a.term.localeCompare(b.term, 'en'),
  );

  const groups = new Map<string, IndexEntry[]>();
  for (const entry of sorted) {
    const letter = entry.term.charAt(0).toLocaleUpperCase('en');
    const bucket = groups.get(letter);
    if (bucket) bucket.push(entry);
    else groups.set(letter, [entry]);
  }

  return [...groups.entries()].map(([letter, items]) => ({ letter, items }));
}
