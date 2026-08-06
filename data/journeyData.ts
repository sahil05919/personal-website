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
 */

export type ChapterTone =
  | 'calm'
  | 'building'
  | 'rupture'
  | 'uncertain'
  | 'resolving';

export interface JourneyChapter {
  id: string;
  /** Small mono label. Years or year ranges only — no era names. */
  era: string;
  title: string;
  /** Short 1-3 word label for the chapter nav. Falls back to `title` if omitted. */
  navLabel?: string;
  /** Narrative paragraphs, rendered in order. */
  body: string[];
  /** The reflective takeaway line for this chapter. Omitted only for the final chapter, which flows straight into the closing quote. */
  lesson?: string;
  /**
   * Emotional register of the through-line segment leaving this chapter,
   * heading into the next. See SEGMENT_STYLE in JourneyChapters for the
   * tone → visual map.
   */
  tone: ChapterTone;
}

export interface SnapshotPoint {
  year: string;
  label: string;
}

export const journeySnapshot = {
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
    body: [
      // Restored: this paragraph was overwritten by the journeyIntro edit.
      'I was born in May 1998 in Mahendragarh, Haryana, and grew up in a large joint family where there was always someone around—parents, grandparents, uncles, cousins, conversations and celebrations. It taught me early that success is rarely an individual effort.',
      'School quickly became a place where curiosity mattered.',
      'I enjoyed mathematics because every problem had a logical answer waiting to be discovered.',
      'Even as an introvert, I was usually among the top students in class.',
    ],
    lesson: 'Curiosity is often more valuable than confidence.',
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
    body: [
      "School wasn't only about marks. It was the first place where effort produced visible results.",
      'I consistently ranked near the top of my class and was fortunate to receive scholarships through academic competitions, including NTSE and a national commerce talent examination where I secured an All India Rank of 35.',
      "One tradition I'll never forget: every scholarship I earned, my father matched with his own money.",
      'At the time it felt like a reward. Today I realise it was his way of investing in my belief that learning was always worth pursuing.',
    ],
    lesson: "Small encouragements can change someone's confidence for life.",
  },
  {
    id: 'turning-point',
    era: '2014',
    title: 'One Motorcycle Changed My Thinking',
    navLabel: 'The Accident',
    tone: 'rupture',
    body: [
      'Like many teenagers, I wanted to look impressive.',
      'One evening, riding too fast to collect my sister from the railway station, I lost control of the motorcycle.',
      'The bike was damaged. I escaped with injuries.',
      'As I sat alone beside the road, one thought stayed with me: what exactly was I trying to prove?',
      'Nobody was watching. Nobody cared how quickly I arrived.',
      "Since that day I've cared much less about appearances and much more about moving through life with patience.",
    ],
    lesson: 'Peace always outlasts showing off.',
  },
  {
    id: 'leaving-home',
    era: '2016',
    title: 'Leaving Home',
    navLabel: 'Leaving Home',
    tone: 'building',
    body: [
      'Leaving home for BBA was the first major step outside everything familiar.',
      "It wasn't just another degree. It was learning to wash my own clothes. Manage my own money. Build friendships from scratch.",
      'My father accompanied me to my hostel on the first day. Years later I still remember that moment more clearly than many graduation ceremonies.',
      'Those small moments quietly mark the beginning of adulthood.',
    ],
    lesson: "Independence isn't one decision. It's hundreds of small responsibilities.",
  },
  {
    id: 'building-ambition',
    era: '2016 – 2021',
    title: 'Building Ambition',
    navLabel: 'Building Ambition',
    tone: 'calm',
    body: [
      'College expanded my world. I met people from different backgrounds. Prepared for CAT. Completed internships.',
      'Discovered that I enjoyed understanding how businesses actually worked rather than simply reading about them.',
      'My original career dream wasn\u2019t extraordinary. I simply imagined myself wearing formal clothes, solving business problems, and building a meaningful career.',
      'Life eventually took me much further than that.',
    ],
    lesson: 'Ambition grows as your world becomes bigger.',
  },
  {
    id: 'first-chapter',
    era: '2021',
    title: 'The First Professional Chapter',
    navLabel: 'First Career',
    tone: 'building',
    body: [
      "My first full-time role wasn't glamorous. It was recruitment.",
      'While others focused only on hiring, I became fascinated by tracking numbers. How many candidates converted? Which sources worked best? What patterns kept repeating?',
      'Without realising it, I had started thinking like an analyst. I enjoyed organising information as much as making decisions.',
      'That curiosity eventually became my career.',
    ],
    lesson: 'Sometimes your career finds you before you realise it.',
  },
  {
    id: 'the-leap',
    era: '2024',
    title: 'Leaving India for London',
    navLabel: 'London',
    tone: 'uncertain',
    body: [
      'Moving to London was never part of some childhood dream. It happened because life presented an opportunity and I chose to take it.',
      'Leaving home was frightening. New country. New culture. New education system. New responsibilities. No family nearby.',
      'Living alone taught me far more than university ever could. Cooking. Managing finances. Booking flights. Paying bills. Building routines. Finding confidence without depending on anyone else.',
      "One achievement I'm particularly proud of wasn't academic. It was becoming Co-President of the Bayes Business Analytics Society—a role I never imagined myself capable of taking when I first arrived.",
    ],
    lesson: 'Growth usually begins where certainty ends.',
  },
  {
    id: 'finding-direction',
    era: '2024 – 2025',
    title: 'Finding My Direction',
    navLabel: 'Finding Direction',
    tone: 'resolving',
    body: [
      "Looking back, business analytics wasn't a random choice. Every step before it pointed here.",
      'I always enjoyed numbers. I enjoyed solving problems. I enjoyed understanding why decisions succeed or fail.',
      'Analytics gave me a language for combining those interests.',
      "Today AI feels like the next chapter of that journey. Not because it's fashionable. Because it gives more people access to knowledge, creativity, and opportunities that once felt out of reach.",
    ],
    lesson: 'Technology matters most when it helps people make better decisions.',
  },
  {
    id: 'still-becoming',
    era: '2026 — Present',
    title: 'Still Becoming',
    navLabel: 'Still Becoming',
    tone: 'resolving',
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