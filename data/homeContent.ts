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
 * Ordering contract for `contents`:
 *   EDITORIAL, not navbar order. The material that could not be reconstructed
 *   comes first; the professional record follows. If this ever disagrees with
 *   the navbar, the navbar is the thing that is wrong.
 *
 * Invitation contract:
 *   A row's `invitation` is that page's OWN opening line, copied across. It is
 *   never new copy written for Home. If a page has no settled standfirst yet,
 *   leave the string empty — the row renders without it — and fill it in when
 *   the page itself settles. Do not invent a line to fill the gap.
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
   * 23 scattered points in NOISE_DOTS resolve to 7 in RESOLVED_DOTS_X. If
   * either array changes, this caption becomes false.
   */
  figureCaption: 'Fig. 01 — twenty-three points, resolved to seven.',

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

  /** Editorial order. See ordering contract above. */
  contents: [
    {
      href: '/journey',
      title: 'Journey',
      // TODO(standfirst): use /journey's own opening line.
      invitation: '',
    },
    {
      href: '/media',
      title: 'Media',
      invitation: 'Proof of presence, not a portfolio.',
    },
    {
      href: '/question',
      title: 'Questions',
      invitation: 'If we had another hour together.',
    },
    {
      href: '/about',
      title: 'About',
      invitation: 'The patterns, not the events.',
    },
    {
      href: '/experience',
      title: 'Experience',
      // TODO(standfirst): use /experience's own opening line.
      invitation: '',
    },
    {
      href: '/projects',
      title: 'Projects',
      // TODO(standfirst): use /projects' own opening line.
      invitation: '',
    },
    {
      href: '/now',
      title: 'Now',
      // TODO(standfirst): use /now's own opening line.
      invitation: '',
    },
    {
      href: '/contact',
      title: 'Contact',
      // TODO(standfirst): use /contact's own opening line.
      invitation: '',
    },
  ],

  /**
   * TEMPORARY BRIDGE — see the TODO at the top of app/page.tsx.
   *
   * This duplicates text that /now already owns, which is exactly what we
   * agreed not to do. It exists only so the page compiles before the real
   * import is wired. Delete this whole key once `Currently` is fed from the
   * Now data source.
   */
  currently: {
    line: 'Placeholder — wire to the Now data source.',
    updated: 'August 2026',
  },

  colophon: {
    close: 'Written in London. Revised when it stops being true.',
    links: [
      { label: 'GitHub', href: 'https://github.com/sahil05919', external: true },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/sahil-business-analyst/',
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
