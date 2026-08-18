// app/now/now-content.ts
//
// THE SEASON ENTRY.
//
// Now is a leaf tipped into the book: dated, written in the present tense, and
// kept afterwards with its crossings-out showing. Every other page says what is
// true. This one says what is true *today* — and what stopped being true, and
// when.
//
// Edit this file when the season shifts. Nothing here touches layout. Adding a
// paragraph, a revision, a fragment or a place re-renders correctly.
//
// ALWAYS update `season.stamp` in the same commit. It is hand-set on purpose:
// a build-derived date would silently refresh every time an unrelated page
// changed, which is the one lie this page cannot afford to tell.
//
// ---------------------------------------------------------------------------
// REPLACE BEFORE DEPLOY — structurally real, editorially provisional.
//
//   1. `answering.questions`   — must be actual messages people have sent.
//                                Invented questions presented as real messages
//                                are the one thing this page cannot ship with.
//   2. `answering.pile`        — must be real unfinished writing. Each fragment
//                                should end where it actually stopped.
//   3. `becoming` photographs  — `src: null` renders an honest empty plate that
//                                says a photograph is missing. Do not fill it
//                                with a generated image; photograph the actual
//                                dish. Alt text in the Media register.
//   4. `work.making[].state`   — check each is still accurate.
//
// Everything marked REAL below is drawn from verified project context and can
// stay as-is.
// ---------------------------------------------------------------------------

import { publishedForNow } from '@/data/writingData';

/* -------------------------------------------------------------------------- */
/* Prose with revisions                                                        */
/* -------------------------------------------------------------------------- */

/**
 * A crossing-out kept in public.
 *
 * `struck` is what used to be true. `now` is what replaced it. `until` is the
 * date the old wording stopped being true — apparatus, so it must be a real
 * date, not a mood. Cobalt is reserved site-wide on this page for exactly this:
 * change. If something is blue here, it changed.
 *
 * ---------------------------------------------------------------------------
 * THE ONE RULE THE SENTENCE AROUND IT MUST OBEY
 *
 * A reader sees `struck` with a line through it, so they read the sentence
 * TWICE: once with the struck words and once without. Both readings have to be
 * grammatical, and — this is the part that went wrong — both have to be TRUE.
 *
 * Every revision on this page used to sit in a frame built around the old
 * wording, most of them after the verb "stopped":
 *
 *     'In April I stopped ' + struck + now
 *
 * Ignore the crossing-out, which is what the eye does, and that sentence says
 * "In April I stopped processing invoices at Middlesex" — the exact opposite of
 * what happened. Three of the four read as their own negation, and the fourth
 * left the replacement standing as a sentence fragment with no verb.
 *
 * So the frame must be NEUTRAL: it names the slot, not the change. "Since April
 * my working day has been …", "most of the work is …", "I am …". The verb
 * belongs outside the revision and must fit both wordings. Read every new
 * revision aloud with the struck text skipped before committing it.
 * ---------------------------------------------------------------------------
 */
export interface Revision {
  struck: string;
  now: string;
  until: string;
}

/** A run of prose is either plain text or a revision. */
export type Run = string | Revision;

/** A paragraph is a sequence of runs. Strings carry their own spacing. */
export type Paragraph = Run[];

export function isRevision(run: Run): run is Revision {
  return typeof run !== 'string';
}

/** Counts every revision in the entry. Used for the apparatus note in the
 *  margin, which states a true fact about the page it sits on. */
export function countRevisions(paragraphs: Paragraph[][]): number {
  return paragraphs.flat(2).filter(isRevision).length;
}

/* -------------------------------------------------------------------------- */
/* The stamp                                                                   */
/* -------------------------------------------------------------------------- */

export const season = {
  /** The <h1>. The season is the identity of the entry — "Now" is navigation. */
  name: 'Summer 2026',
  /** Present tense on purpose. Not "updated" — "true on". */
  stamp: 'True on 16 August 2026',
  /** Increments with each new entry. Entry 01 is the first kept season. */
  entryNo: 'Entry 01',
} as const;

/* -------------------------------------------------------------------------- */
/* 1 — The season                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The opening. Present tense, and it must contain the hinge — the thing that
 * changed to start this season. April 2026 is the real hinge: Unitemps
 * note-taking at City St George's ended, Accounts Payable at Middlesex began.
 *
 * The perishability test governs every sentence here: if it would still be
 * true in 2030, it belongs on About, on Journey, or nowhere.
 */
export const opening: Paragraph[] = [
  // REAL — the employment hinge is verified.
  [
    'This is my second summer of living in London without it feeling like an arrival. Since April my working day has been ',
    {
      struck: 'taking notes for students at City St George’s',
      now: 'processing invoices at Middlesex',
      until: 'until 14 April 2026',
    },
    ', which is a smaller change than it sounds and a larger one than it looks.',
  ],
  [
    'Most of what follows will be wrong by the spring. That is the point of the page. This season’s version of it is ',
    {
      struck: 'learning what London might be like',
      now: 'working out what living here actually costs and returns',
      until: 'until 2025',
    },
    '.',
  ],
];

/* -------------------------------------------------------------------------- */
/* 2 — Work + Making                                                           */
/* -------------------------------------------------------------------------- */

/** A thing currently being made, and the state it is genuinely in. */
export interface MakingItem {
  name: string;
  /** Margin apparatus. Lowercase, mono, no full stop. Keep it honest. */
  state: string;
}

export const work = {
  heading: 'Work & making',
  paragraphs: [
    // REAL — role and employer verified. Register: Media, not Experience.
    [
      'Accounts Payable is a queue. Invoices arrive, they are wrong in a small number of repeating ways, and somebody has to notice which way before the money leaves. Four months in, most of the work is ',
      {
        struck: 'checking every field against the guidance',
        now: 'reading the shape of an invoice and knowing where it will fail',
        until: 'until June 2026',
      },
      '. Nobody announced that. It just started happening.',
    ],
    // REAL — the direction was settled in August 2026 after a full review of
    // what the work has actually been. The struck wording is what this page and
    // the CV both said until then.
    [
      'The other thing that moved this season was quieter and took longer. I am ',
      {
        struck: 'calling myself a business and data analyst',
        now: 'aiming at people analytics',
        until: 'until August 2026',
      },
      '. The honest version is that I can write the code and I do not enjoy writing it, I spent three years in HR before any of this, and the work I keep going back to is the kind where the question is about people and the tool is Power BI. It took a lot of drafts to arrive somewhere I could have started.',
    ],
    [
      'The rest of the season goes into things that are not finished, including the page you are reading. It is being rebuilt underneath you while it is live.',
    ],
  ] as Paragraph[],

  /** Named inside the prose, weighted by their state — not by a card. */
  making: [
    { name: 'This website', state: 'rebuilt this season · unfinished' },
    { name: 'IPL, 2008–2024', state: 'in Power BI · loading, not modelling' },   // REAL
    { name: 'Personal finance dashboard', state: 'running · rewritten twice' },  // REAL
    { name: 'AI workflows', state: 'experiments · nothing shipped' },
  ] satisfies MakingItem[],

  /**
   * The colophon-in-progress. A true, dated list of what is unfinished on this
   * site right now. It is the Equinor residual applied to the website itself —
   * publish the thing you would normally quietly delete.
   */
  unfinished: {
    note: 'Unfinished on this site, 16 August 2026',
    items: [
      'the CV still opens on the old description of me',
      'nothing on /projects is people analytics yet',
      // "/writing does not exist yet" was here from 10 August. It exists now,
      // so the line goes — this list is what is unfinished TODAY, and leaving a
      // completed item on it to show progress would make every other line
      // suspect.
      'six questions on /questions are unwritten',
      // This list is about what is INCOMPLETE. What is actively wrong is a
      // different kind of admission and now has its own leaf, in the back
      // matter, linked from the imprint on every page.
      'what is wrong rather than unfinished is on /errata',
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 3 — Becoming (the workbench)                                                */
/* -------------------------------------------------------------------------- */

/**
 * The workbench. One rule governs this section and it is not decorative:
 *
 *   NO TWO ADJACENT ITEMS MAY SHARE A SIZE OR A MEDIUM.
 *
 * The moment they do, it is a card grid again regardless of how it is styled.
 * The renderer enforces the alternation from the item's `kind`, so adding two
 * photographs in a row will look wrong on purpose.
 */
export type BecomingItem =
  | {
      kind: 'photo';
      /** null = photograph not taken yet. Renders an honest empty plate. */
      src: string | null;
      alt: string;
      /** What the placeholder says it is waiting for. */
      awaiting?: string;
      annotation: string;
      /** Photographs are unequal. 'wide' breaks the measure; 'small' hangs. */
      size: 'wide' | 'small';
    }
  | { kind: 'couplet'; lines: string[]; translation?: string; annotation: string }
  | { kind: 'note'; text: string; annotation?: string }
  | { kind: 'struck'; struck: string; annotation: string };

export const becoming = {
  heading: 'Becoming',
  standfirst: 'Things I am learning before I learn them well.',
  items: [
    // PLACEHOLDER PHOTOGRAPH — replace src with a real photo of a real dish.
    {
      kind: 'photo',
      src: null,
      alt: '',
      awaiting: 'Dal, kitchen counter, a Sunday',
      annotation: 'Third attempt. Better.',
      size: 'wide',
    },
    // PLACEHOLDER COUPLET — replace with a couplet actually being read.
    {
      kind: 'couplet',
      lines: ['दिल ना-उमीद तो नहीं,', 'नाकाम ही तो है।'],
      translation: 'The heart is not without hope — only without success.',
      annotation: 'Reading Hindi Shayari slowly. I understand about half.',
    },
    { kind: 'note', text: 'Storytelling', annotation: 'Two chapters in.' },
    // PLACEHOLDER PHOTOGRAPH.
    {
      kind: 'photo',
      src: null,
      alt: '',
      awaiting: 'Something vegetarian that worked',
      annotation: 'Still figuring this out.',
      size: 'small',
    },
    {
      kind: 'struck',
      struck: 'Learning to cook properly',
      annotation: 'Gave up in April. Might come back.',
    },
  ] satisfies BecomingItem[],
} as const;

/* -------------------------------------------------------------------------- */
/* 4 — The quiet centre                                                        */
/* -------------------------------------------------------------------------- */

/**
 * The caesura. No interaction, no rule, no apparatus, no progress indicator —
 * a progress bar under "one chapter at a time" would be the funniest possible
 * mistake. The spine deliberately breaks here.
 *
 * Placed at the middle, not the end: before it the page is about things made,
 * after it the page is about people and places. This line is the turn.
 */
export const quiet = {
  line: 'One chapter at a time.',              // REAL
  under: 'More time reflecting than finishing.', // REAL
  attribution: 'Bhagavad Gita',                  // REAL
} as const;

/* -------------------------------------------------------------------------- */
/* 5 — Answering (Community + Writing)                                         */
/* -------------------------------------------------------------------------- */

export interface AskedQuestion {
  text: string;
  /** Mono attribution. Keep it thin — "a message, 3 July". No names. */
  attribution: string;
}

/** One leaf in the pile. `body` is real unfinished writing, not a teaser. */
export interface Fragment {
  id: string;
  /**
   * The piece's first sentence. It is the label on the closed leaf AND the
   * first line of the open one — components/now/Pile.tsx keeps the button
   * visible when the leaf opens, set in the reading face and aligned to the
   * body column, so it reads as the opening line rather than as a heading.
   */
  opening: string;
  dated: string;
  /**
   * The CONTINUATION. It must not repeat `opening`.
   *
   * All three fragments used to begin with their own opening sentence again,
   * so opening a leaf printed that sentence twice, one line apart — the
   * clearest reading bug on the page. The sentence lives in `opening` and
   * nowhere else; `body` picks up from the word after it.
   */
  body: string[];
  /** Set only when the fragment actually became something published. */
  became?: { label: string; href: string };
}

export const answering = {
  heading: 'Answering',
  standfirst: 'Questions I have been sent this season.',

  // PLACEHOLDER — replace all four with real messages before deploy.
  questions: [
    { text: 'Is it worth moving to London if I don’t have a job lined up?', attribution: 'a message, 3 July' },
    { text: 'How did you know when to stop applying and start learning?', attribution: 'a message, 11 July' },
    { text: 'Was the Master’s worth it, honestly?', attribution: 'a message, 26 July' },
  ] satisfies AskedQuestion[],

  /** The continuity, as a margin note rather than a heading or a diagram. */
  context:
    'It started at St Luke’s Community Centre, sitting next to people while they worked out what a form was asking them for. The room became an inbox. The work did not change.', // REAL (St Luke's)

  pileHeading: 'writing back',   // margin note — keep to two words or it wraps
  pileNote:
    'Unfinished. Each of these stops where I stopped. Two of them will not become anything.',

  // PLACEHOLDER — replace with genuinely unfinished writing.
  pile: [
    {
      id: 'first-winter',
      opening: 'Nobody warns you that the first winter is not about the cold.',
      dated: '19 Jul',
      body: [
        'It is about four o’clock. The light goes while you are still at your desk and the evening arrives before you have earned it, and for a few weeks you keep checking the time expecting it to be later than it is.',
        'What I have not worked out is whether I adjusted or simply stopped noticing. Those are different things and I think the difference matters, because one of them is',
      ],
    },
    {
      id: 'advice',
      opening: 'The honest answer to “was it worth it” is that I cannot run the other version.',
      dated: '26 Jul',
      body: [
        'There is no control group for a life. So when someone asks whether the Master’s was worth it, what they are really asking is whether I would do it again knowing what I know, which is a different and much easier question.',
        'I would. But not for the reasons I gave anyone at the time.',
      ],
    },
    {
      id: 'clearer',
      opening: 'A question people ask me a lot, phrased six different ways.',
      dated: '2 Aug',
      body: [
        'How do you make a decision when you do not have enough information? You do not. You work out which piece of missing information would actually change your answer, and you go and get that one.',
        'Most of the time it turns out nothing would have changed the answer, and the delay was about something else.',
      ],
    },
  ] satisfies Fragment[],

  /**
   * Published pieces are exits, not the experience. REAL.
   *
   * The list itself now lives in data/writingData.ts, which /writing also
   * reads. It was five hardcoded entries here and nowhere else, which made
   * this seasonal page the canonical home of the only permanent thing on it —
   * so a sixth piece would have had to be added in two places, and eventually
   * would have been added in one.
   */
  publishedNote: 'finished, eventually',
  published: publishedForNow,
} as const;

/* -------------------------------------------------------------------------- */
/* 6 — Exploring                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Appetite first, record second. Media owns the past — what stayed. Now owns
 * what has not happened yet. No map, no pins, no trail: a map is a dashboard
 * object and it duplicates Media.
 *
 * One place gets a paragraph and a photograph. The other eleven get a line in
 * an index. That asymmetry is the design.
 */
export interface ExploredPlace {
  name: string;
  /** Only where the link genuinely helps. Most places do not need one. */
  href?: string;
}

export const exploring = {
  heading: 'Exploring',
  nextUp: ['Bath', 'Windsor'],                                    // REAL
  /** A running index, not a list. Links only where the link genuinely helps. */
  index: [
    { name: 'British Library', href: 'https://www.bl.uk/' },
    { name: 'British Museum', href: 'https://www.britishmuseum.org/' },
    { name: 'Cambridge' },
    { name: 'Oxford' },
    { name: 'Brighton' },
    { name: 'Canterbury' },
    { name: 'Seven Sisters' },
  ] as ExploredPlace[],
  /** The only number on the page. It is true, and it grows across seasons. */
  counter: { label: 'London walking tours', value: 'more than ten' }, // REAL
  /**
   * REAL PHOTOGRAPH — /images/media/brighton.jpg already exists in the repo and
   * is also used on /media.
   *
   * The alt text here is deliberately NOT the one in data/mediaData.ts. That
   * one reads "Brighton Pier with the sea behind", which describes a different
   * photograph from the one in the file: the actual image is a figure standing
   * on a breakwater with the pier small in the distance. Worth fixing on
   * /media too, in its own pass.
   *
   * The paragraph is PROVISIONAL: replace it with what actually stayed with
   * you. Feature whichever place produced the better sentence, not the most
   * impressive destination — and if you swap the place, swap the photograph
   * for a real one of that place rather than reusing this file.
   */
  featured: {
    name: 'Brighton',
    src: '/images/media/brighton.jpg',
    alt: 'Standing on a breakwater at Brighton, arms out, the pier small in the distance.',
    paragraph:
      'I went for the day and stayed until the last sensible train. The pier is loud and the sea is not, and the walk between the two is the part I keep thinking about.',
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 7 — The close and the archive                                               */
/* -------------------------------------------------------------------------- */

export const close = {
  line: 'This season will pass.',
  date: '16 August 2026',
  /** Kept word for word. The best sentence the old page had. */
  cadence:
    'This page changes as life does — no fixed schedule, just whenever the season shifts.',
} as const;

/**
 * The date-stamp card. One stamp today. Do not pre-create empty future seasons —
 * an archive with placeholders reads as abandoned, which is the mistake the
 * Questions page already made. Add a stamp when a season is actually retired,
 * give it an `href`, and the card grows on its own.
 */
export interface SeasonStamp {
  name: string;
  stamped: string;
  href?: string;
  current?: boolean;
}

export const archive = {
  note: 'Previous seasons',
  promise:
    'When this is rewritten, this entry stays. The stamps below are how you get back to it.',
  stamps: [
    { name: 'Summer 2026', stamped: '16 Aug 2026', current: true },
  ] as SeasonStamp[],
} as const;

/** True apparatus for the margin: a fact about the page it sits on. */
export const revisionCount = countRevisions([
  opening,
  work.paragraphs as Paragraph[],
]);

/* -------------------------------------------------------------------------- */
/* Home's Currently strip                                                      */
/* -------------------------------------------------------------------------- */

/**
 * app/page.tsx renders <Currently line={seasonLine} updated={lastUpdated} />.
 *
 * The season is written in exactly one place — the page that owns it — and
 * Home follows automatically. Do not duplicate either value into
 * data/homeContent.ts; that was the original placeholder bug.
 *
 * `seasonLine` is Home's one line of proof the record is still alive, so it
 * must survive being read entirely on its own, out of context, above a
 * colophon. Keep it to one sentence and keep it perishable.
 */
export const lastUpdated = close.date;

export const seasonLine =
  'A second London summer: Accounts Payable at Middlesex, a direction finally chosen, and this site being rebuilt underneath itself.';
