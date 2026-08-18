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
  // Was '… · one philosophy: keep becoming.' The rail is apparatus; a motto
  // in it is the page asserting its own moral before the reader has read a
  // line. This states what the eight points are.
  summary: 'Mahendragarh to London · eight chapters, two of them chosen.',
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
  /*
    Was "The Road That Built Me", then briefly "How One Thing Became Another".
    Settled on a sentence, because every other chapter on this site is titled
    with one and closes it with a full stop — "Most of it I didn't choose.",
    "None of this was meant to be a record.", "Write back.", "This page was never
    set." A title in Headline Case was the only place the site sounded like a
    brochure, and it sat directly above eight chapters arguing that none of this
    was planned. This says that, and then the standfirst stops repeating it and
    names three of the things instead.
  */
  title: 'Nobody planned this.',
  subtitle:
    'A motorcycle on a road outside Mahendragarh. A hostel my father walked me into. A recruitment job that was simply the job on offer. I found out afterwards what each one had done to me.',
  body: [
    // LOCKED. Quoted verbatim on Home (data/homeContent.ts → invitations).
    "Before anyone sees the work, I'd rather they understood the person.",
    "This isn't a timeline of achievements. It's the small things that turned out to be load-bearing: a scholarship my father matched out of his own pocket, a bike on its side on a road outside Mahendragarh, and a recruitment job where I started counting things nobody had asked me to count.",
  ],
};

/* ---------------------------------------------------------------------------
   AUGUST 2026 REWRITE — what changed in the prose below, and on what rule.

   The chapters were structurally sound and, in about a third of their
   sentences, written in a register the rest of the site does not use: "growth
   never really finishes", "life eventually took me much further than that",
   "change is constant". Aphorism, present tense, no nouns. Beside About §IV
   ("I optimise work. I optimise projects… I've never done that with my family")
   and the saree-shop chapter on /experience, it read as a different person.

   THE RULE THE REWRITE FOLLOWED: no new facts. Every detail added below is
   already written somewhere on this site, and the source is named in a comment
   where it is not obvious — the CAT percentile from /questions, the hybrid job
   in Gurugram and the team of three from /experience, the seven months of
   rejections from the Unitemps entry, the invoice count and the weekly shift at
   St Luke's from /experience and /now, the daily call home from About. Where a
   generic sentence had no fact under it, it was cut down rather than inflated.

   WHAT WAS LEFT ALONE: the motorcycle chapter's account of the accident, the
   father matching every scholarship, and the first day at the hostel. Those
   three were already the best writing on the page and are untouched except for
   the sentences that editorialised ON them.

   The two surviving `lesson` aphorisms were REPLACED, not removed. Revision 1
   deleted six of the original eight for being interchangeable; the two left were
   the same defect wearing the same coat. They are now specific lines that only
   this life could produce, which is what that slot was always for.
--------------------------------------------------------------------------- */
export const journeyChapters: JourneyChapter[] = [
  {
    id: 'mahendragarh',
    era: '1998',
    title: 'Growing Up in Mahendragarh',
    navLabel: 'Growing Up',
    tone: 'calm',
    pause: 'short',
    body: [
      'I was born in May 1998 in Mahendragarh, Haryana, into a joint family — parents, grandparents, uncles, cousins — where the house was never empty and almost nothing was decided by one person on their own.',
      // Was: "It taught me early that success is rarely an individual effort."
      // The claim is his; the moral phrasing was not earned by anything in the
      // paragraph, so it is now stated as what he actually took from the room.
      'Nobody sat me down and explained that success is rarely an individual effort. What I learned was quieter than that: a plan you cannot say out loud at a full table is usually not a plan yet.',
      'School was the first place outside that house where I was on my own. I liked mathematics for a reason I could not have explained at the time — it was the only subject where I could tell whether I was right without being told.',
      // Was: "Even as an introvert, I was usually among the top students in
      // class." The second sentence is About's observation about himself
      // ("People usually assume I'm quieter than I really am"), which is the
      // same fact told in a way that does not need the word "introvert".
      'I was near the top of the class and near the back of the room. Both of those are still true.',
    ],
  },
  {
    id: 'school-years',
    /*
      Was '2002 – 2016', which ran past the 2014 motorcycle chapter that follows
      it, so the spine stepped backwards once and the rail had two chapters
      claiming the same years. The chapter's content ends at the commerce
      examination, so 2014 is where it actually ends. A previous pass recorded
      this as known and left it "as specified"; it is a date error on a site with
      an errata page, so it is fixed.
    */
    era: '2002 – 2014',
    title: 'Learning That Hard Work Compounds',
    navLabel: 'Learning',
    tone: 'building',
    pause: 'medium',
    body: [
      "School wasn't only about marks. It was the first place where effort produced visible results.",
      'I consistently ranked near the top of my class and was fortunate to receive scholarships through academic competitions, including NTSE and a national commerce talent examination.',
      // LOCKED. The best sentence on the page.
      "One tradition I'll never forget: every scholarship I earned, my father matched with his own money.",
      // Was: "At the time it felt like a reward. Today I realise it was his way
      // of investing in my belief that learning was always worth pursuing."
      // Same meaning; the shop is a real fact from /experience and it is what
      // makes the sentence cost something.
      'At the time I thought it was a prize. It took me years to see what it actually was. He ran a saree shop, so that money was counted before it was given, and he was not rewarding the result — he was paying to keep the habit going.',
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
      // LOCKED — the account of the accident itself is unchanged.
      'Like many teenagers, I wanted to look impressive.',
      'One evening, riding too fast to collect my sister from the railway station, I lost control of the motorcycle.',
      'The bike was damaged. I escaped with injuries.',
      'As I sat alone beside the road, one thought stayed with me.',
      'Nobody cared how quickly I arrived.',
      // Was: "…much more about moving through life with patience", which
      // announced a virtue. This says the same thing and can be checked.
      'Since then I have cared much less about how a thing looks from outside and much more about getting there in one piece.',
    ],
    markMoment: {
      insertAfter: 3,
      lines: ['What exactly was I trying to prove?', 'Nobody was watching.'],
    },
    // Was: 'Peace always outlasts showing off.'
    lesson: 'I did not become patient. I became less interested in being watched.',
  },
  {
    id: 'leaving-home',
    era: '2016',
    title: 'Leaving Home',
    navLabel: 'Leaving Home',
    tone: 'building',
    pause: 'short',
    body: [
      // LOCKED — the first three sentences, including the hostel.
      'Leaving home for BBA was the first major step outside everything familiar.',
      "It wasn't just another degree. It was learning to wash my own clothes. Manage my own money. Build friendships from scratch.",
      'My father accompanied me to my hostel on the first day. Years later I still remember that moment more clearly than many graduation ceremonies.',
      // Was: "Those small moments quietly mark the beginning of adulthood."
      // Built from the two things the paragraph above already names.
      'Adulthood did not arrive with the degree. It arrived with the washing and the money.',
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
      'College widened the room. I met people whose lives had been arranged differently from mine, sat the CAT, and did the internships everyone does.',
      // The percentile and the reading of it as a failure are both from
      // /questions ("What have you changed your mind about?"). Naming it here
      // is the same fact seen from the year it happened rather than from now.
      'I scored in the 90th percentile and read it as a failure, because it was not the number I had pictured. It took me a long time to stop doing that with everything.',
      'What I actually found in those years had nothing to do with the exam. I liked working out how a business really ran far more than reading about how it was supposed to.',
      // Was: "My original career dream wasn't extraordinary… Life eventually
      // took me much further than that." The last clause was a boast with no
      // content in it.
      'My ambition at the time was not interesting: formal clothes, business problems, a career that sounded like a career.',
      'It went somewhere else.',
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
      // Gurugram, hybrid, and staying at home are all from /experience
      // ("Where two things overlap").
      "My first full-time job was recruitment, and I did it from my parents' house. The company was in Gurugram and the work was hybrid, so my week changed shape without my address changing at all.",
      'Everyone around me was focused on filling the role in front of them. I got interested in the shape of the pipeline: how many people made it from one stage to the next, which sources were worth the effort, which failures kept repeating.',
      // Was: "Without realising it, I had started thinking like an analyst."
      'Nobody called that analysis and neither did I. It was a couple of years before I found out it had a name and that people were paid for it.',
      // The team of three is from /experience and from the CV.
      'By the end of it I was running accounts of my own and a team of three, and the part of the job I kept going back to was the reporting.',
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
      'Moving to London was not a childhood dream. It was an opportunity that turned up, and I said yes to it.',
      'Leaving home was frightening. New country. New culture. New education system. New responsibilities. No family nearby.',
      'Living alone taught me far more than university ever could. Cooking. Managing finances. Booking flights. Paying bills. Building routines. Finding confidence without depending on anyone else.',
      // Unitemps is /experience's chapter; one clause of it belongs here because
      // it is how the year was actually paid for.
      "I paid for a good deal of that year with temp shifts through the university's own agency, which is how a master's degree came with eighteen months of turning up somewhere I had never been.",
    ],
    // Was: 'Growth usually begins where certainty ends.'
    lesson: 'None of it felt like growth at the time. It felt like admin.',
  },
  {
    id: 'finding-direction',
    era: '2024 – 2025',
    title: 'Finding My Direction',
    navLabel: 'Finding Direction',
    tone: 'resolving',
    pause: 'short',
    body: [
      // Was: "Looking back, business analytics wasn't a random choice. Every
      // step before it pointed here." — retrospective inevitability, which the
      // rest of this page is arguing against.
      'Business analytics was not a swerve. It was the first name I found for something I had already been doing badly for years.',
      'Numbers, problems, and the question of why one decision worked and another did not — I had been carrying those around separately. Analytics was the first place they were allowed in the same room.',
      // Was a paragraph about AI giving people access to knowledge and
      // opportunity: true of AI, not about him, and the only sentence on the
      // page that could have appeared on anybody's site. Replaced with the
      // narrowing that actually happened, which /now records as this season's
      // quietest change.
      'It took another year to narrow it further than that. The work I keep returning to is the kind where the question is about people and the tool is Power BI. I can write the code. I have never especially enjoyed writing it.',
    ],
    milestone: {
      insertAfter: 2,
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
      // Was: "Today I don't define myself by a job title. / I'm someone who
      // enjoys learning. Building. Improving systems. Helping people solve
      // problems. / Family continues to guide my decisions. Curiosity keeps me
      // moving. Honesty gives me peace of mind. And every new challenge reminds
      // me that growth never really finishes. / I'm still becoming the person I
      // hope to be."
      //
      // Four paragraphs, no nouns, and the only chapter on the page that named
      // nothing that had actually happened in the year it covers. The facts
      // below are all on the site already: the gap between September 2025 and
      // April 2026 and the rejections in it are in /experience's Unitemps
      // entry, the invoice count is in the Middlesex entry, the weekly shift is
      // St Luke's, and the daily call home is About §IV.
      'The gap between finishing the master\'s in September 2025 and starting at Middlesex in April 2026 was seven months of applications and mostly rejections. That is the part I would have left out a few years ago.',
      'What I do now is a queue of invoices — fifty to seventy on an ordinary day — and a weekly shift at a community centre, sitting beside people while they work out what a form is asking them for. Those turn out to be closer to the same job than they look.',
      'I still call home every day. It is the only standing commitment in my life I have never once tried to make more efficient.',
      'I do not have a version of myself I am aiming at. I have a list of things I have not finished, and this page is on it.',
    ],
  },
];

export const journeyClose = {
  // Was: 'The only thing life has consistently taught me is that change is
  // constant.' — true of everyone, and therefore about nobody. The replacement
  // is a claim the eight chapters above actually demonstrate.
  quote: 'Not one of these turned out to be about the thing I thought it was about at the time.',
  body: [
    // Was: 'Friends change. Jobs change. Countries change. Technology changes.
    // Dreams evolve.'
    'The accident was not about the motorcycle. The recruitment job was not about recruitment. The master\'s was not about the master\'s.',
    'I only ever worked that out afterwards, which is why I have stopped trying to decide in advance which of the things happening to me now is the one that will matter.',
    'I assume the same is true of this year.',
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

/**
 * The inverse of `chapterToSnapshotIndex`: glance point → the chapter to jump
 * to when a reader clicks that year in the rail.
 *
 * DERIVED, never hand-written. That map is the editorial judgement; this is a
 * mechanical consequence of it, so a chapter added or re-anchored there updates
 * both directions at once. A hand-maintained reverse map is how the two would
 * eventually disagree, and a glance point that scrolls to the wrong chapter is
 * exactly the quiet kind of wrongness this site keeps a whole page about.
 *
 * Two chapters share point 6 — "The Leap" and "Finding Direction" cover the
 * same period from two angles — so the FIRST in narrative order wins. A reader
 * clicking 2024 wants the beginning of that stretch; landing halfway through it
 * reads as a broken anchor.
 *
 * DECLARED HERE, at the foot of the file, and not beside `chapterToSnapshotIndex`
 * where it belongs conceptually. `journeyChapters` is a `const` declared below
 * that point, so an initialiser reading it from up there hits the temporal dead
 * zone and throws at module evaluation — which takes the whole site down, not
 * just this rail. Position is load-bearing; leave it last.
 */
export const snapshotToChapterId: Record<number, string> = (() => {
  const map: Record<number, string> = {};
  for (const chapter of journeyChapters) {
    const point = chapterToSnapshotIndex[chapter.id];
    if (point === undefined) continue;
    if (map[point] === undefined) map[point] = chapter.id;
  }
  return map;
})();
