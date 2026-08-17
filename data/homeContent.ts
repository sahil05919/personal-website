/**
 * Home — content.
 *
 * Home is the title page of the record: frontispiece, statement, contents.
 * It carries no project cards, no career timeline and no portfolio CTA.
 * Those belong to /projects, /journey and /contact respectively.
 *
 * Rendering contract:
 *   `statement.beats`  -> one <p> each, Newsreader, reading measure
 *   `statement.claim`  -> Fraunces, display scale. The page's assertion.
 *   `statement.coda`   -> one quiet line under the claim.
 *
 * Ordering contract:
 *   THIS FILE NO LONGER HOLDS THE ORDER. Route order and labels live in
 *   data/navigation.ts, which the navbar, Home's Contents and the Wayfinder
 *   all read. Two copies of the order is how the site ended up with the navbar
 *   running About → Journey → Experience while Home ran Journey → Media →
 *   Questions, and with the same page labelled "Question" in one place and
 *   "Questions" in the other.
 *
 * Invitation contract:
 *   An `invitations` entry is that page's OWN opening line, copied across
 *   verbatim. It is never new copy written for Home. If a page has no settled
 *   standfirst yet, leave the string empty — the row renders without it — and
 *   fill it in when the page itself settles. Do not invent a line to fill the
 *   gap. Every line below is quoted, and its source is named.
 */

export const homeContent = {
  /** Sits above the figure. Mono, apparatus scale. */
  eyebrow: 'Sahil Kumar — London',

  /**
   * LOCKED. The title of the record, not a promise about the work.
   * The full stop is deliberate.
   */
  title: "Things I don't want to forget.",

  /**
   * LOCKED. Apparatus register: states what the figure shows, nothing more.
   *
   * The previous caption ("twenty-three points, resolved to seven") described
   * something the old figure did not do — it faded in twenty-three dots and
   * then faded in seven separate ones beneath them, ending on thirty. The
   * figure now moves eighteen fragments from scatter into a single line and
   * ends on eighteen, so the count is real.
   *
   * If COUNT in components/home/ResolveFigure.tsx changes, this becomes false.
   */
  figureCaption: 'Fig. 01 — eighteen fragments, resolved into one line.',

  /**
   * DRAFT. Structure is locked to the approved four-beat spine:
   *   1. the honest origin
   *   2. what arrived that had nothing to do with a job
   *   3. the criterion — rebuildable vs not
   *   4. the claim, earned by turning it on this site first
   * Wording is still open and expected to change once the page renders.
   */
  statement: {
    beats: [
      'This started as somewhere to put my CV. I wanted a page that would make sense if someone asked me what I do.',
      "Then things arrived that had nothing to do with a job. Places I'd been, photographs, things I was reading, questions I hadn't answered yet. I kept adding them anyway.",
      "Eventually I worked out what the site was for. If all of it disappeared tomorrow, I could rebuild the work. I couldn't rebuild the rest.",
      "I think complexity is usually a liability. People treat complicated systems as proof that something is serious. I've done it here too — case files, operating systems, chapter numbers — dressing up simple things to make them look considered. The parts I like most are the plainest ones.",
    ],
    claim: 'I make confusing things simple.',
    coda: "I'm still learning to do it to my own work.",
  },

  /**
   * Invitations, keyed by route. Order comes from data/navigation.ts.
   * Each line is quoted from the page it points at — source named beside it.
   */
  invitations: {
    // journeyData.ts → journeyIntro.body[0]
    '/journey':
      "Before anyone sees the work, I'd rather they understood the person.",

    // components/projects/ProjectsChapter.tsx → the chapter standfirst
    '/projects': 'Some refused to leave me alone until I built something.',

    // app/experience/experience-content.ts → `standfirst`
    '/experience': "Most of it I didn't choose.",

    // components/media/MediaChapter.tsx → the chapter standfirst
    '/media': 'Proof of presence, not a portfolio.',

    // data/profileContent.ts → the About standfirst
    '/about': 'The patterns, not the events.',

    // app/question/page.tsx → the chapter standfirst
    '/question': 'If we had another hour together.',

    // Deliberately empty. Now's opening line IS the season line, and the
    // Currently strip four rows below already carries it verbatim. Printing it
    // twice on one page would be the duplication this file exists to prevent.
    '/now': '',

    // components/contact/ContactHero.tsx → the hero's opening sentence
    '/contact':
      "Everything before this page has been about how I think and what I've built.",
  } as Record<string, string>,

  /**
   * No `currently` key by design. The Currently strip is fed from
   * app/now/now-content.ts in app/page.tsx, so the season line lives in
   * exactly one file. Do not reintroduce a copy here.
   */

  colophon: {
    close: 'Written in London. Revised when it stops being true.',
    links: [
      { label: 'GitHub', href: 'https://github.com/sahil05919', external: true },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/reach-sahil/',
        external: true,
      },
      { label: 'Contact', href: '/contact', external: false },
    ],
  },

  meta: {
    title: "Sahil Kumar — Things I don't want to forget.",
    description:
      'A record kept by Sahil Kumar in London: the places, the reading, the questions still open, and the work behind them.',
  },
};