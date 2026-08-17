/**
 * ERRATA — back matter.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS PAGE EXISTS
 *
 * The Colophon on every page of this site ends "Revised when it stops being
 * true." The About page promises "I rewrite this page when it stops being
 * true. The old versions stay." The Now page is built entirely around a device
 * for showing what changed — struck wording kept beside the wording that
 * replaced it, dated, in cobalt.
 *
 * Three separate promises to publish revisions, and until this file the site
 * kept them on exactly one page, about one season. Everything else was
 * corrected silently, which is the ordinary way websites work and the opposite
 * of what this one claims about itself.
 *
 * So: the errata leaf. Every correction to the record, dated, with the wording
 * that was wrong left where anyone can read it.
 *
 * ---------------------------------------------------------------------------
 * WHAT BELONGS HERE, AND WHAT DOES NOT
 *
 * An erratum is a correction to something that was WRONG — a false claim, a
 * caption describing a photograph that isn't there, a date that contradicts
 * another page. It is not a changelog. Rewriting a paragraph because a better
 * sentence arrived is editing, and editing does not go on this page: if every
 * revision were listed the genuine mistakes would be buried in housekeeping,
 * which is the failure mode this page has to avoid to be worth anything.
 *
 * The test: could a reader have believed something untrue because of it? If
 * yes, it goes here. If it was merely clumsier before, it does not.
 *
 * ---------------------------------------------------------------------------
 * THE OPEN ENTRIES ARE THE POINT
 *
 * `corrected: null` means noticed and not yet fixed. Those are the entries
 * that make this page cost something — anyone can publish a list of things
 * they have already tidied up. The Now page does the same thing with its
 * `unfinished` list, and this is that principle applied to accuracy rather
 * than to completeness.
 *
 * Do not clear an open entry by deleting it. Fix the thing, then set
 * `corrected` — the entry stays either way, because a correction that leaves
 * no trace is the thing this page exists to stop.
 *
 * ---------------------------------------------------------------------------
 * DATES
 *
 * `noticed` and `corrected` are hand-set and must be real. Where the date a
 * mistake entered the site is genuinely not recorded, say so in the note
 * rather than estimating — an invented date on the errata page would be a
 * fairly complete self-own.
 */

export interface Erratum {
  id: string;
  /** The route the mistake was on. Displayed as apparatus. */
  where: string;
  /** What kind of thing it was: a caption, a claim, a date. One or two words. */
  kind: string;
  /** The wording that was wrong. Null where the fault was an omission. */
  struck: string | null;
  /** What replaced it. Null while the entry is still open. */
  now: string | null;
  /** Why it was wrong. One or two sentences, plain. */
  note: string;
  /** When it was noticed. */
  noticed: string;
  /** When it was fixed. Null = still open. */
  corrected: string | null;
}

export const errataIntro = {
  eyebrow: 'Back matter',
  title: 'Errata',
  standfirst: 'Things this record got wrong.',
  body: [
    'Every page here ends on the same line: revised when it stops being true. That is easy to print and harder to mean, because the ordinary way to correct a website is to edit the sentence and let the old one disappear, and then nobody can tell the difference between a page that was always right and a page that was fixed last Tuesday.',
    'So this is the list. What it said, what it says now, when I noticed, and — for the ones still at the bottom — what I know is wrong and have not fixed yet.',
  ],
  /** Sits above the open section. */
  openNote:
    'Noticed and still standing. These are wrong on the site as you are reading it.',
  correctedNote: 'Fixed. The old wording stays here.',
} as const;

export const errata: Erratum[] = [
  /* ── Open ───────────────────────────────────────────────────────────── */
  {
    id: 'cv-description',
    where: '/contact',
    kind: 'A document',
    struck: 'Business and data analyst with an MSc in Business Analytics…',
    now: null,
    note: "The CV you can download from the Contact page opens on a description of me that the rest of this site has stopped using. It is not false — it is simply a year behind the person who wrote the other nine pages. Replacing a PDF is a slower job than editing a line, so it is listed here rather than quietly left.",
    noticed: '16 August 2026',
    corrected: null,
  },
  {
    id: 'hr-dashboard-context',
    where: '/projects',
    kind: 'An attribution',
    struck: null,
    now: null,
    note: 'The HR Analytics Dashboard is listed in the record with its context given as "Academic project". That is a reconstruction from an older file, not the module it was actually built for. It is probably right and it is not confirmed, and the difference between those two things is the reason this line exists.',
    noticed: '16 August 2026',
    corrected: null,
  },
  {
    id: 'unwritten-questions',
    where: '/question',
    kind: 'An omission',
    struck: null,
    now: null,
    note: 'Six of the questions on that page are posed and not answered. A question with nothing under it reads as a page still being built, which it is.',
    noticed: '10 August 2026',
    corrected: null,
  },

  /* ── Corrected ──────────────────────────────────────────────────────── */
  {
    id: 'permanent-job',
    where: '/experience',
    kind: 'A claim',
    struck: 'a permanent job at the end of two years of temporary ones',
    now: 'a contract with an end date on it at the end of two years of week-to-week ones',
    note: 'The Middlesex role is a fixed contract, not a permanent post. The sentence turned on a real contrast and stated it with the wrong word, which is the kind of mistake that survives a lot of readings because it sounds right.',
    noticed: '16 August 2026',
    corrected: '16 August 2026',
  },
  {
    id: 'brighton-alt',
    where: '/media',
    kind: 'A caption',
    struck: 'Brighton Pier with the sea behind.',
    now: 'Standing on a breakwater at Brighton, arms out, the pier small in the distance.',
    note: 'The alt text described a different photograph from the one in the file. Anyone reading the page with a screen reader was told about a picture that does not exist here. It sat wrong for two and a half weeks after it was first written down.',
    noticed: '29 July 2026',
    corrected: '16 August 2026',
  },
  {
    id: 'site-description',
    where: 'Every page',
    kind: 'A description',
    struck:
      'Business Analytics graduate and Finance Assistant building analytical systems with Power BI, SQL, Python and business operations.',
    now: 'A record kept by Sahil Kumar in London: the places, the reading, the questions still open, and the work behind them.',
    note: 'That was the sentence handed to search engines and to anything that unfurled a link to this site — so every share of nine pages of essays announced a skills list. Home had the right line all along; nothing outside the site was being shown it.',
    noticed: '16 August 2026',
    corrected: '16 August 2026',
  },
  {
    id: 'linkedin-address',
    where: 'Every page',
    kind: 'An address',
    struck: 'linkedin.com/in/sahil-business-analyst',
    now: 'linkedin.com/in/reach-sahil',
    note: 'Eight links on this site pointed at the old address. It still resolved, so nothing looked broken — the page just kept introducing me by a description I had stopped using.',
    noticed: '16 August 2026',
    corrected: '16 August 2026',
  },
];

export const errataCorrected = errata.filter((e) => e.corrected !== null);
export const errataOpen = errata.filter((e) => e.corrected === null);
