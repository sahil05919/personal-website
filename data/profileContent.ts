/**
 * About — content.
 *
 * The prose is LOCKED. Not one word of the essay has changed since the first
 * version; only its structure is described differently here.
 *
 * WHY THIS IS AN ARRAY AND NOT A STRING. The previous version carried the
 * essay as one continuous string with `::mode` markers at the head of each
 * paragraph, which was already an improvement on keying the rhythm to array
 * index. But each paragraph now needs a second axis — an optional margin note —
 * and encoding two orthogonal things in leading tokens gets illegible fast.
 * An explicit typed array says the same thing without the parser, and the
 * compiler now checks the modes.
 *
 * MODES
 *   body      reading type at the reading measure (35.5rem)
 *   break     reading type, with a display-sized gap after it
 *   display   Fraunces at display scale, spanning both grid columns
 *   stanza    Fraunces, slightly smaller — the four flat declarations
 *   turn      Fraunces at display scale, in cobalt — the reversal
 *   close     Fraunces, ending a movement
 *
 * `note` sets a mono mark in the margin column beside that paragraph. Used
 * once per movement, as a running head. Note that movement IV is marked
 * "OPTIMISATION" and not "FAMILY": the margin must not telegraph the reversal
 * before the reader reaches it.
 *
 * The essay is split into `opening` and `coda` so the Marginalia section can
 * sit between them. Order matters — the small personal things arrive BEFORE
 * the deepest admission, so the cobalt turn remains the last thing read.
 */

export type EssayMode = 'body' | 'break' | 'display' | 'stanza' | 'turn' | 'close';

export type EssayParagraph = {
  mode: EssayMode;
  /** Mono running head in the margin column. First paragraph of a movement only. */
  note?: string;
  /** A single newline renders as <br /> within the paragraph. */
  text: string;
};

export type Fact = { label: string; value: string };

/** Marginalia items are placed on a 12-column field. `start` and `span` are
 *  lg-and-up only; below that everything stacks full width. */
export type MarginaliaItem = {
  label: string;
  value: string;
  start: number;
  span: number;
  scale: 'sm' | 'lg';
};

export const aboutContent = {
  /** Mono, small, apparatus — the eyebrow above the title. */
  name: 'Sahil Kumar',

  /**
   * The <h1>. The page's thesis, not the author's name: the name is already in
   * the wordmark, the URL and the document title, and the homepage is the site's
   * only title page. `quiet` sets on its own line in graphite.
   */
  title: {
    lead: 'The patterns,',
    quiet: 'not the events.',
  },

  portrait: {
    /**
     * Empty until the right photograph exists. Wanted: portrait orientation,
     * mid-distance, indoors, not a headshot, not looking at the lens.
     * A headshot is a credential; this page wants a person in a room.
     */
    src: '',
    alt: '',
    width: 1200,
    height: 1600,
  },

  revision: {
    stamp: 'First version',
    date: 'August 2026',
    promise: 'I rewrite this page when it stops being true. The old versions stay.',
  },

  essay: {
    opening: [
      {
        mode: 'body',
        note: 'I — A free day',
        text: "If I have a completely free day, I'll probably start by organising my room.",
      },
      {
        mode: 'body',
        text: "It isn't because I enjoy cleaning. I just find it easier to think when the things around me have settled down. By the time the room is in order, my head usually is too. After that I'll continue something I've already started, wander somewhere I've never been before, or disappear into an idea that's been sitting quietly in the back of my mind for a few days. Very little of that is planned. It's simply how I seem to spend time when nobody is asking anything of me.",
      },
      {
        mode: 'body',
        text: "People often come to me with problems that don't really belong together. One friend wants help choosing a laptop. Another wants to talk through a financial decision. Someone else simply wants another person to think alongside them for a while. The subject changes. The work doesn't. I rarely feel a need to answer quickly. I enjoy untangling things until they make sense.",
      },
      {
        mode: 'break',
        text: "I built a financial dashboard because I wanted to understand where I stood instead of wondering. At work, I'm usually more interested in finding the step that can disappear than adding another one. Clarity matters to me more than certainty. I don't mind sitting with a problem for longer if I feel like I'm slowly understanding it.",
      },
      {
        mode: 'display',
        note: 'II — Attention',
        text: 'My attention naturally lands on what is unfinished before it lands on what already works.',
      },
      {
        mode: 'body',
        text: "It's useful when something genuinely needs improving. It also means I don't stay with achievements for very long before I'm already looking at what could be better. My attention has always had a habit of wandering towards loose ends.",
      },
      {
        mode: 'body',
        text: "If one paragraph stays with me for three days, I don't mind taking three weeks to finish a book.",
      },
      {
        mode: 'body',
        note: 'III — People',
        text: "People usually assume I'm quieter than I really am. Somewhere in the middle of a conversation I'll make a joke that arrives at exactly the right moment. Some of my favourite evenings are the ones where everyone forgets what time it is because the conversation keeps finding somewhere new to go, or because one good joke keeps getting funnier every time someone repeats it.",
      },
      {
        mode: 'close',
        text: 'I can usually remember a city through one meal and the people I shared it with.',
      },
    ] satisfies EssayParagraph[],

    coda: [
      {
        mode: 'stanza',
        note: 'IV — Optimisation',
        text: 'I optimise work.\nI optimise projects.\nI optimise decisions.\nI optimise the way I organise my time, my notes and sometimes even my weekends.',
      },
      {
        mode: 'turn',
        text: "I've never done that with my family.",
      },
      {
        mode: 'body',
        text: "Talking to them every day has never been something I've scheduled, measured or turned into a habit. I've never really made a decision to do it.",
      },
      {
        mode: 'close',
        text: "It's simply never been something I've negotiated with myself.",
      },
    ] satisfies EssayParagraph[],
  },

  /**
   * FRONT MATTER — a ledger, not cards.
   *
   * The previous treatment was six 13rem boxes with a hover arrow in the
   * corner: every affordance of a button and no destination. These are now
   * hairline rows, label in the margin column, value in Fraunces. Nothing here
   * looks clickable because nothing here is.
   */
  facts: [
    { label: 'Originally from', value: 'Haryana, India' },
    { label: 'Based in', value: 'London, United Kingdom' },
    { label: 'Work', value: 'Finance Assistant' },
    { label: 'Studied', value: 'MSc Business Analytics' },
    { label: 'Languages', value: 'English & Hindi' },
    { label: 'Favourite food', value: 'Dishoom pav bhaji' },
  ] satisfies Fact[],

  /**
   * MARGINALIA — the small things, placed as notes on a spread.
   *
   * Deliberately NOT a grid: five items on a 12-column field with different
   * spans and starts, so no two sit on the same axis. The Dhoni & Messi line
   * runs the full width at display scale and is the section's one loud moment;
   * everything around it is quiet. Changing `start`/`span` changes the
   * composition, so keep the asymmetry — an even arrangement would put this
   * straight back into card-grid territory.
   */
  marginalia: {
    eyebrow: 'Marginalia',
    heading: 'Things that stay.',
    items: [
      { label: 'Enjoy', value: 'Chess, cricket', start: 1, span: 5, scale: 'sm' },
      { label: 'All-time favourites', value: 'Punjabi songs', start: 8, span: 5, scale: 'sm' },
      {
        label: "Players I'll always watch",
        value: 'MS Dhoni & Lionel Messi',
        start: 1,
        span: 12,
        scale: 'lg',
      },
      /* Was 'Books', which is the one entry in this grid that said nothing —
         beside "MS Dhoni & Lionel Messi", which says a great deal. Not replaced
         with an invention: both of these are already named on /now, which is
         where the current reading is kept. If /now's reading changes and this
         stops being true, change it here too. */
      {
        label: 'Reading',
        value: 'The Gita, and shayari I half understand',
        start: 3,
        span: 4,
        scale: 'sm',
      },
      {
        label: 'Currently obsessed with',
        value: 'Tinkering with technology',
        start: 8,
        span: 5,
        scale: 'sm',
      },
    ] satisfies MarginaliaItem[],
  },

  exit: {
    href: '/journey',
    eyebrow: 'Next',
    heading: 'Every person has a story.',
    headingQuiet: "Here's mine.",
    blurb:
      'Growing up in Haryana, the years that changed direction, and how one became the other.',
    action: 'Turn page',
  },
};
