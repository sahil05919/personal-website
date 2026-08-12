/**
 * Journey data — replaces the previous career-chronology `Milestone` model.
 *
 * The Journey page's purpose changed from "what I've done" (now owned by
 * /experience) to "how I became who I am." The old `Milestone` shape
 * (category, highlights[]) fit a timeline of jobs and degrees; it has no
 * room for narrative paragraphs or a reflective takeaway per chapter, so
 * rather than force new content into an old shape, the shape is evolved.
 *
 * If anything else in the project still imports `Milestone` or
 * `journeyMilestones`, it will need to be pointed elsewhere or this file
 * will need to keep both shapes side by side.
 *
 * REVISION 1 (design review, August 2026): the page carried eight
 * near-identical "lesson" aphorisms and an eight-stop CV-style dot
 * timeline directly under a hero that explicitly promises "this isn't a
 * timeline of achievements." Both contradicted the page's own premise.
 * This revision removed six of the eight aphorisms and gave two facts —
 * the AIR 35 exam rank and the Bayes Business Analytics Society
 * co-presidency — their own typographic moments instead of leaving them
 * as clauses inside running prose. Every word of the protected chapters
 * (Mahendragarh, the motorcycle, leaving home, the father/scholarship
 * tradition, the close) is unchanged; only presentation moved.
 *
 * REVISION 2 (visual refinement, August 2026): the eight-stop glance list
 * (`journeySnapshot`) is restored at Sahil's request — see the note on
 * that export. This revision also widens the page's layout (a persistent
 * left rail on desktop, chapter artifacts relocated to a right margin for
 * the chapters that have them) without touching any prose.
 */

export type ChapterTone =
  | 'calm'
  | 'building'
  | 'rupture'
  | 'uncertain'
  | 'resolving';

/**
 * Weight of the pause (the connector) leaving this chapter, heading into
 * the next. This is deliberately a separate axis from `tone` — tone is
 * the connector's colour/stroke language, pause is its length. A chapter
 * can be emotionally "rupture" and still need very little air after it;
 * here they happen to move together, but they don't have to.
 *
 *   short   40px  — momentum chapters, back to back, moving quickly
 *   medium  72px  — the page's previous fixed default
 *   long   140px  — one gap only: leaving the motorcycle chapter
 */
export type ChapterPause = 'short' | 'medium' | 'long';

/**
 * A fact promoted out of running prose into its own typographic beat.
 * `insertAfter` is the 0-based index into `body` after which the moment
 * renders — the paragraphs before and after stay in normal flow.
 */
export interface ResultMoment {
  insertAfter: number;
  eyebrow: string;
  figure: string;
  caption: string;
}

/** A short fragment of the chapter's own prose, promoted to display scale. */
export interface MarkMoment {
  insertAfter: number;
  lines: string[];
}

/**
 * A role/responsibility fact — visually related to ResultMoment but
 * deliberately quieter. AIR 35 is a number that happened to someone;
 * this is a role someone trusted them with. `period` is left unset
 * unless a specific date range has actually been confirmed — the
 * chapter's own `era` label already carries the approximate timeframe,
 * and this page does not state a date it can't stand behind.
 */
export interface MilestoneMoment {
  insertAfter: number;
  org: string;
  role: string;
  period?: string;
  note?: string;
}

export interface JourneyChapter {
  id: string;
  /** Small mono label. Years or year ranges only — no era names. */
  era: string;
  title: string;
  /** Short 1-3 word label for the chapter nav. Falls back to `title` if omitted. */
  navLabel?: string;
  /** Narrative paragraphs, rendered in order. */
  body: string[];
  /**
   * The reflective takeaway line for this chapter. Deliberately absent on
   * all but two chapters as of the August 2026 revision — see the file
   * header. Present only where the chapter doesn't already narrate its
   * own takeaway in prose (the motorcycle, the leap to London).
   */
  lesson?: string;
  /**
   * Emotional register of the through-line segment leaving this chapter,
   * heading into the next. See SEGMENT_STYLE in JourneyChapters for the
   * tone → visual map.
   */
  tone: ChapterTone;
  /** Length of the pause leaving this chapter. Unused on the final chapter. */
  pause: ChapterPause;
  resultMoment?: ResultMoment;
  markMoment?: MarkMoment;
  milestone?: MilestoneMoment;
}

export interface SnapshotPoint {
  year: string;
  label: string;
}

/**
 * REVISION 2 (visual refinement, August 2026): restored at Sahil's request,
 * after Revision 1 replaced it with a two-coordinate line. The content is
 * back to its original eight points; what changed is presentation, not
 * substance — see JourneyRail (the persistent desktop sidebar) and the
 * mobile block in JourneySnapshot.tsx. Neither recreates the old dot-and-
 * rail graphic.
 */
export const journeySnapshot = {
  heading: 'My journey at a glance',
  points: [
    { year: '1998', label: 'Born' },
    { year: '2002', label: 'School' },
    { year: '2014', label: 'Commerce' },
    { year: '2016', label: 'BBA' },
    { year: '2019', label: 'MBA' },
    { year: '2021', label: 'HR Career' },
    { year: '2024', label: 'MSc Analytics (London)' },
    { year: '2026', label: 'Accounts Job (UK)' },
  ] as SnapshotPoint[],
  summary: 'Mahendragarh to London · one philosophy: keep becoming.',
};

/**
 * Maps each of the nine narrative chapters to the nearest point on the
 * eight-point glance list above, so the desktop rail (JourneyRail) can
 * highlight "where you are" while reading. The two lists are deliberately
 * different granularities of the same life — this is not a 1:1 index map,
 * it's an editorial judgement call about which glance point best anchors
 * each chapter. "The Leap" and "Finding Direction" share a point (2024,
 * MSc Analytics) because they cover the same period from two angles.
 */
export const chapterToSnapshotIndex: Record<string, number> = {
  mahendragarh: 0, // 1998 — Born
  'school-years': 1, // 2002 — School
  'turning-point': 2, // 2014 — Commerce
  'leaving-home': 3, // 2016 — BBA
  'building-ambition': 4, // 2019 — MBA
  'first-chapter': 5, // 2021 — HR Career
  'the-leap': 6, // 2024 — MSc Analytics (London)
  'finding-direction': 6, // same period as the leap
  'still-becoming': 7, // 2026 — Accounts Job (UK)
};

export const journeyIntro = {
  eyebrow: 'The story behind the résumé',
  title: 'The Road That Built Me',
  subtitle:
    "Every chapter taught me something. Looking back, my life wasn't a carefully planned journey—it was a series of decisions, challenges, and lessons that gradually shaped who I am today.",
  body: [
    "Before anyone sees the work, I'd rather they understood the person.",
    "This isn't a timeline of achievements. It's the story of how a curious child from a small town in India gradually found his way into business, analytics, and technology.",
  ],
};

export const journeyChapters: JourneyChapter[] = [
  {
    id: 'mahendragarh',
    era: '1998',
    title: 'Growing Up in Mahendragarh',
    navLabel: 'Growing Up',
    tone: 'calm',
    pause: 'short',
    body: [
      'I was born in May 1998 in Mahendragarh, Haryana, and grew up in a large joint family where there was always someone around—parents, grandparents, uncles, cousins, conversations and celebrations. It taught me early that success is rarely an individual effort.',
      'School quickly became a place where curiosity mattered.',
      'I enjoyed mathematics because every problem had a logical answer waiting to be discovered.',
      'Even as an introvert, I was usually among the top students in class.',
    ],
  },
  {
    id: 'school-years',
    // NB: this range ends after the motorcycle chapter's 2014, so the spine
    // steps backwards once. '2002 – 2014' would read cleanly and still covers
    // NTSE and the commerce exam. Left as specified.
    era: '2002 – 2016',
    title: 'Learning That Hard Work Compounds',
    navLabel: 'Learning',
    tone: 'building',
    pause: 'medium',
    body: [
      "School wasn't only about marks. It was the first place where effort produced visible results.",
      'I consistently ranked near the top of my class and was fortunate to receive scholarships through academic competitions, including NTSE and a national commerce talent examination.',
      "One tradition I'll never forget: every scholarship I earned, my father matched with his own money.",
      'At the time it felt like a reward. Today I realise it was his way of investing in my belief that learning was always worth pursuing.',
    ],
    resultMoment: {
      insertAfter: 1,
      eyebrow: 'National Commerce Talent Examination',
      figure: '35',
      caption: 'All India Rank',
    },
  },
  {
    id: 'turning-point',
    era: '2014',
    title: 'One Motorcycle Changed My Thinking',
    navLabel: 'The Accident',
    tone: 'rupture',
    pause: 'long',
    body: [
      'Like many teenagers, I wanted to look impressive.',
      'One evening, riding too fast to collect my sister from the railway station, I lost control of the motorcycle.',
      'The bike was damaged. I escaped with injuries.',
      'As I sat alone beside the road, one thought stayed with me.',
      'Nobody cared how quickly I arrived.',
      "Since that day I've cared much less about appearances and much more about moving through life with patience.",
    ],
    markMoment: {
      insertAfter: 3,
      lines: ['What exactly was I trying to prove?', 'Nobody was watching.'],
    },
    lesson: 'Peace always outlasts showing off.',
  },
  {
    id: 'leaving-home',
    era: '2016',
    title: 'Leaving Home',
    navLabel: 'Leaving Home',
    tone: 'building',
    pause: 'short',
    body: [
      'Leaving home for BBA was the first major step outside everything familiar.',
      "It wasn't just another degree. It was learning to wash my own clothes. Manage my own money. Build friendships from scratch.",
      'My father accompanied me to my hostel on the first day. Years later I still remember that moment more clearly than many graduation ceremonies.',
      'Those small moments quietly mark the beginning of adulthood.',
    ],
  },
  {
    id: 'building-ambition',
    era: '2016 – 2021',
    title: 'Building Ambition',
    navLabel: 'Building Ambition',
    tone: 'calm',
    pause: 'short',
    body: [
      'College expanded my world. I met people from different backgrounds. Prepared for CAT. Completed internships.',
      'Discovered that I enjoyed understanding how businesses actually worked rather than simply reading about them.',
      'My original career dream wasn’t extraordinary. I simply imagined myself wearing formal clothes, solving business problems, and building a meaningful career.',
      'Life eventually took me much further than that.',
    ],
  },
  {
    id: 'first-chapter',
    era: '2021',
    title: 'The First Professional Chapter',
    navLabel: 'First Career',
    tone: 'building',
    pause: 'medium',
    body: [
      "My first full-time role wasn't glamorous. It was recruitment.",
      'While others focused only on hiring, I became fascinated by tracking numbers. How many candidates converted? Which sources worked best? What patterns kept repeating?',
      'Without realising it, I had started thinking like an analyst. I enjoyed organising information as much as making decisions.',
      'That curiosity eventually became my career.',
    ],
  },
  {
    id: 'the-leap',
    era: '2024',
    title: 'Leaving India for London',
    navLabel: 'London',
    tone: 'uncertain',
    pause: 'medium',
    body: [
      'Moving to London was never part of some childhood dream. It happened because life presented an opportunity and I chose to take it.',
      'Leaving home was frightening. New country. New culture. New education system. New responsibilities. No family nearby.',
      'Living alone taught me far more than university ever could. Cooking. Managing finances. Booking flights. Paying bills. Building routines. Finding confidence without depending on anyone else.',
    ],
    lesson: 'Growth usually begins where certainty ends.',
  },
  {
    id: 'finding-direction',
    era: '2024 – 2025',
    title: 'Finding My Direction',
    navLabel: 'Finding Direction',
    tone: 'resolving',
    pause: 'short',
    body: [
      "Looking back, business analytics wasn't a random choice. Every step before it pointed here.",
      'I always enjoyed numbers. I enjoyed solving problems. I enjoyed understanding why decisions succeed or fail.',
      'Analytics gave me a language for combining those interests.',
      "Today AI feels like the next chapter of that journey. Not because it's fashionable. Because it gives more people access to knowledge, creativity, and opportunities that once felt out of reach.",
    ],
    milestone: {
      insertAfter: 3,
      org: 'Bayes Business Analytics Society',
      role: 'Co-President',
      note: 'A role I never imagined myself capable of taking when I first arrived.',
    },
  },
  {
    id: 'still-becoming',
    era: '2026 — Present',
    title: 'Still Becoming',
    navLabel: 'Still Becoming',
    tone: 'resolving',
    pause: 'short',
    body: [
      "Today I don't define myself by a job title.",
      "I'm someone who enjoys learning. Building. Improving systems. Helping people solve problems.",
      'Family continues to guide my decisions. Curiosity keeps me moving. Honesty gives me peace of mind. And every new challenge reminds me that growth never really finishes.',
      "I'm still becoming the person I hope to be.",
    ],
  },
];

export const journeyClose = {
  quote: 'The only thing life has consistently taught me is that change is constant.',
  body: [
    'Friends change. Jobs change. Countries change. Technology changes. Dreams evolve.',
    "Instead of resisting change, I've learned to enjoy the process of becoming someone slightly better than yesterday.",
    'That journey is still unfolding.',
  ],
};

/**
 * The quiet hand-off to /now. Deliberately not phrased as a CTA — no
 * "view my now page," no arrow-button language. About's `exit` object
 * (data/profileContent.ts) does the equivalent job for "patterns → events";
 * this one does "story so far → where it stands today," worded differently
 * on purpose so the two pages don't read as the same card reused.
 */
export const journeyExit = {
  href: '/now',
  eyebrow: 'Now',
  line: "The story isn't finished. This is simply where it stands today.",
  action: 'See where it stands',
};
