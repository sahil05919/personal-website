/**
 * Chapter — Projects.
 *
 * NOT the old `featuredProjects` model. That shape (category, techStack,
 * objectives[], approachSteps[], results[], lessonsLearned[]) described six
 * projects through an identical set of fields, which is why the page read as
 * six instances of one template. Renaming the fields would not have fixed it;
 * the fields were the problem.
 *
 * This file holds prose. Each entry is a piece of writing with its own shape.
 * There is deliberately no `outcome`, `impact`, `lesson` or `techStack` field —
 * anything that mattered is in the sentences.
 *
 * `data/projectsData.ts` and `types/project.ts` are still live: the home page
 * imports `featuredProjects`. Migrate home, then delete both.
 */

/* ─────────────────────────────────────────────────────────────────────────
 * Rhythm
 *
 * These controls exist so each essay can hold its own shape. They are
 * deliberately few. Every additional knob is another way for the page to
 * become a system that announces itself.
 *
 * Not offered, on purpose: per-entry title size (titles are the page's fixed
 * landmarks and stay constant — length does the ranking on its own),
 * per-entry colour, per-entry typeface.
 * ───────────────────────────────────────────────────────────────────────── */

/** Column width for prose.
 *  · reading — 64ch, the default.
 *  · narrow  — 46ch. Used once, for the interstitial: a short piece set in a
 *              wide column reads as truncated; the same piece in a narrow
 *              column reads as intentionally small. */
export type EntryMeasure = "reading" | "narrow";

/** Space before the entry — the seam the reader crosses to reach it. */
export type EntrySeam = "normal" | "wide";

export interface EntryRhythm {
  measure: EntryMeasure;
  seam: EntrySeam;
  /** Centre the whole entry. Used once. */
  centered?: boolean;
  /** Set the opening paragraph as a standfirst — Fraunces, larger, above the
   *  body. Three of these essays open on a line that carries the whole piece;
   *  at body size it is indistinguishable from the sentence after it. Omit
   *  where the opening is ordinary, or the reader stops trusting the signal. */
  lede?: boolean;
  /** Zero-based paragraph indices set as display pull-quotes: Fraunces,
   *  centred, breaking wider than the prose measure, with large air either
   *  side. Reserved for lines already doing the work of a section break in
   *  the prose — three across the whole chapter. */
  isolate?: number[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  /** · plate — full bleed, edge to edge. Entirely dependent on being rare.
   *  · inset — sits inside the prose measure at `widthPercent`. */
  treatment: "plate" | "inset";
  widthPercent?: number;
  aspectRatio: string;
  caption?: string;
}

/** A small table set as HTML rather than dropped in as a screenshot.
 *  Screenshotting it from the submitted PDF would import Word's typography
 *  into a page set in Fraunces and Newsreader. */
export interface ProjectTable {
  columns: string[];
  rows: string[][];
  /** Rendered in ink rather than graphite — weight only. No fill, no accent:
   *  the row is the chapter's climax and colour would demote it to a
   *  callout. */
  emphasisRow?: number;
  note?: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  body: string[];
  /** Foot-of-entry attribution, not a header. Metadata above the prose would
   *  frame each essay as an instance of a category and blunt the openings,
   *  which were written to be unalike.
   *
   *  Descriptive, not categorical. That "Built for myself" recurs on two of
   *  five entries is the honest signal, and a better one than a tag. */
  attribution: string;
  rhythm: EntryRhythm;
  image?: ProjectImage;
  table?: ProjectTable;
  /** Zero-based paragraph index after which the figure is inserted. */
  mediaAfterParagraph?: number;
}

/**
 * ORDER IS LOAD-BEARING.
 *   1. "A place to stand" opens — smallest stake, plainest language, the only
 *      project nobody assigned.
 *   2. "The year that did both jobs" closes — most recent, entirely
 *      individual, ends unresolved, hands off cleanly to /now.
 *   3. "Understanding behaviour through data" sits immediately before Equinor.
 *      Its closing question is the question Equinor asks of a company's
 *      published accounts. Same dependency as Oxford→Cambridge on /media.
 */
export const projectEntries: ProjectEntry[] = [
  {
    id: "place-to-stand",
    title: "A place to stand",
    // TODO(sahil): confirm the years. `projectsData.ts` carries year: "2026",
    // status: "Ongoing" — that reads as "last touched", not "started". The
    // open end matters: the final paragraph depends on it still running.
    attribution: "Built for myself, 20XX–present.",
    // Duration shape: no event, no arc. Nothing isolated — the essay is about
    // something that thickened slowly and is still going, and the setting
    // should not manufacture a turn the prose declines to have.
    rhythm: { measure: "reading", seam: "normal", lede: true },
    body: [
      "Every Sunday I opened six or seven spreadsheets. Investments in one, SIPs in another, insurance in a third, cash balances somewhere else, and a running list of things I'd committed to paying for later. None of it was difficult. It took about an hour, and at the end of the hour I could usually answer the question I'd started with, which was: where do I stand?",
      "The strange part was that I had all the information already. Every number I needed existed, in a file I had made, and I still had to spend an hour assembling it into an answer.",
      "The first version was just a better spreadsheet, and for a while that was enough. What changed wasn't that it broke. It was that I kept wanting different views of the same information — by month, by category, by what was already committed — and every one of those meant going back and altering the file where everything was recorded.",
      "So I split it in two. The sheets stayed where they were, as the place I actually update things: a new policy, a changed balance, a payment I'd committed to. Everything else moved into Power BI, which only reads. That way I could change how something was calculated without touching where it was recorded, and change what I recorded without breaking the calculations.",
      "It sounds like a technical decision. It wasn't, particularly. I made it because I was tired of editing one file to answer a different question.",
      "What I got back was the hour, but that isn't quite the point either. What I got was a place to stand — one view, current, that answers the question without being asked twice. Assets, what I owe, what's committed, what's actually mine.",
      "It's still running. I still change it, usually when something in my life changes first: a new commitment, a different currency, a category that stopped making sense. It has never been finished, and I've stopped expecting it to be.",
    ],
    // TODO(sahil): no crop supplied. When one exists, set treatment: "plate".
    // The strongest image is NOT a net-worth chart — it's the panel that
    // answers the Sunday question. Leave `image` undefined until a real file
    // exists; a placeholder path ships a 404.
    mediaAfterParagraph: 5,
  },

  {
    id: "wrong-first-question",
    title: "The wrong first question",
    attribution:
      "Group project with USS, MSc Business Analytics, Bayes Business School, 2025.",
    // Encounter shape: moves toward a moment. Paragraphs 6 and 8 already
    // function as section breaks in the prose; set as pull-quotes, the page
    // agrees rather than argues.
    rhythm: {
      measure: "reading",
      seam: "normal",
      lede: true,
      isolate: [6, 8],
    },
    body: [
      "Someone has paid into a pension for fifteen years. Money leaves their salary every month, statements arrive once a year, and if you asked them what they'll actually have at retirement, most would say they don't really know. Not because they haven't tried. Because to answer it, they'd first have to learn what defined benefit means, and how it differs from defined contribution, and what a risk profile is, and what any of that has to do with them.",
      "The brief was about a pension concept. What we kept finding, the further into the research we went, was that the difficulty wasn't the pension. Every number a member needed already existed. It was arriving in a form that required them to become fluent in someone else's vocabulary before they could ask their own question.",
      "So we turned it round. Not \u201chere is your scheme, now learn to read it,\u201d but: what are you trying to do?",
      // The two questions below are representative of the principle, not
      // literal prototype copy — the exact wording isn't remembered.
      "The first thing a member saw wasn't contribution rates or investment options. It was a question about them. Not what the scheme offers, but what they wanted: when they hoped to stop, what they hoped to be living on. Then the pension arrived as an answer \u2014 this is what that would take, this is where you currently are, this is what changes if you adjust the amount going in. Same information. It just stopped being a document to decode and became a response to something they'd asked.",
      "That reversal was the project. The dashboard came afterwards, and so did everything else \u2014 the scenarios, the visualisations, the real-time feedback when someone moved a number. Those were the consequences of the decision, not the decision.",
      // The chapter's only group-work clause. One sentence, once.
      "I built the prototype and wrote the code, shaped how it moved, and put together what we presented. It was a group project and the research behind it was everyone's, but this part was mine to get wrong.",
      "At the end we presented to the USS team.",
      // Dialled to what is actually known. Not "USS is implementing this."
      "What I remember isn't the grade. It's the twenty minutes afterwards, when they stopped responding to the presentation and started talking about their own members \u2014 which questions come up, what people ask when they call, where the explanations tend to fail. They said they'd been thinking about some of this internally and would look at how the approach might inform their work on member engagement.",
      // "Somewhere in the middle of it" is load-bearing: it places the moment
      // inside a longer conversation rather than as its climax.
      "Somewhere in the middle of it, one of them asked whose idea the member-first approach had been. Before I could say anything, my professor said, \u201cSahil.\u201d",
      "I don't know what came of the rest of it. Possibly nothing; these things move slowly and I'm not in the room any more.",
    ],
    // TODO(sahil): if a crop is supplied it should show the goal-setting
    // interaction, not a results chart. treatment: "plate".
    mediaAfterParagraph: 3,
  },

  {
    id: "looking-properly",
    title: "Looking properly",
    // TODO(sahil): 2024 is inferred, not confirmed.
    attribution: "Built for myself, 2024.",
    // Inventory shape: a list of questions that never resolves. No lede — the
    // opening is ordinary on purpose, and enlarging it would claim a weight
    // the sentence doesn't have. The lightest passage on the page.
    rhythm: { measure: "reading", seam: "normal" },
    body: [
      "Netflix had become the thing that was on most evenings, and I realised I had no idea what was in it. Not what to watch \u2014 that gets decided for you. What was actually there. How much of it, from where, made when.",
      // TODO(sahil): "about eight thousand rows" and the field list describe
      // the standard Kaggle Netflix Titles dataset. Correct if a different
      // version was used — it's the only factual claim in the piece.
      "So I downloaded the catalogue. It's a public dataset on Kaggle: every title, with its country, its type, its release year, its rating, its cast and director, its duration. About eight thousand rows of something I'd been using for years without ever seeing whole.",
      "There was no question I was trying to answer. There were just questions. Which countries produce the most of it. Whether it's mostly films or mostly series, and whether that's changed. Which directors turn up again and again. How long a typical title runs. Which genres actually dominate, as opposed to which ones feel like they do.",
      "I built it in Power BI, and building it was the point. Each view answered something and immediately suggested the next thing to look at \u2014 the country breakdown made me want it by year, the year view made me want it split by type. The dashboard wasn't where the exploring ended up. It was how the exploring happened.",
      "There was no finding, no recommendation, nobody to show it to. I understood Netflix a bit better afterwards, and I'd got quicker at building things while I was at it.",
      "It's the only thing I've built that had no purpose beyond wanting to know. I'd assumed until then that analysis was something you did to a problem. This one was closer to reading \u2014 going somewhere because you're curious what's there.",
    ],
    // No figure, deliberately. Nothing came of it; by this point the reader
    // has learned that plates mean something, so the absence registers.
  },

  {
    id: "understanding-behaviour",
    title: "Understanding behaviour through data",
    attribution: "MSc Business Analytics, Bayes Business School, 2025.",
    // Interstitial. Narrow, centred, wide seam — the only entry set this way.
    // Two paragraphs in a 64ch column read as an essay that got cut; the same
    // two in a 46ch centred column with real air read as a caesura between
    // Netflix and Equinor, which is the actual function.
    rhythm: { measure: "narrow", seam: "wide", centered: true },
    // Sahil's own final wording, verbatim. Two edits were proposed and never
    // taken up; left as written rather than applied unilaterally.
    body: [
      "Six weeks, and for the first time nobody handed me the problem. We chose the dataset, framed the questions, built the analysis, and presented the findings.",
      "I picked a dating app dataset over a conventional business dataset because it felt more interesting to explore. The dataset was synthetic\u2014fifty thousand generated users\u2014which turned out to be the most valuable lesson. It taught me to question whether an analytical pattern reflects reality or simply the assumptions built into the data. That question has stayed with me far longer than the project itself.",
    ],
    // No figure: no artefact survives. The Bayes account is closed, so the
    // Tableau workbook and deck are gone.
  },

  {
    id: "did-both-jobs",
    title: "The year that did both jobs",
    attribution:
      "Applied Research Project, MSc Business Analytics, Bayes Business School, 2025.",
    // Discrepancy shape. Opens cold on eight words — the only essay that
    // starts at its own ending. Paragraph 5 closes the argument and opens the
    // table; as a pull-quote directly above the figure it does both.
    rhythm: {
      measure: "reading",
      seam: "normal",
      lede: true,
      isolate: [5],
    },
    body: [
      "Equinor said 11.0. I got 12.5.",
      "I'd spent weeks building the number myself \u2014 pulling Scope 1 and Scope 2 figures out of nine years of annual reports, sustainability reports and remuneration reports, and reconstructing the totals from the components rather than taking the headline. For seven years the two versions sat within rounding distance of each other. Then 2024 came apart by 1.5 million tonnes.",
      "The project was supposed to answer something else. The question was whether climate governance actually worked \u2014 whether tying executive pay to emissions targets produced real reductions, or just better-looking disclosure. Equinor was a reasonable place to ask it: state-owned, unusually forthcoming, and the weighting of climate targets in executive pay had risen from nothing to about thirty per cent across the period. If incentives moved emissions anywhere, they should have moved them here.",
      "The statistics said yes, faintly. Higher weighting, larger reductions, a coefficient pointing the right way.",
      "Except the weighting only really moved once. Zero for five years, ten per cent for three, thirty per cent in a single year \u2014 2024. Eight observations, and the relationship rested almost entirely on the last of them.",
      "And 2024 was the year that didn't reconcile.",
      "I couldn't close the gap. There were plausible explanations \u2014 a boundary change, a methodology revision, something in how a particular year's production was counted \u2014 but plausible isn't the same as documented, and I couldn't point to the disclosure that accounted for it.",
      "So I left it in the table, in its own row, with the word Unreconciled written next to it.",
      "That was the part I thought about longest. A 1.5 million tonne gap in the final year of a nine-year reconstruction is not a small thing to publish underneath your own analysis. It says, in effect: here is my finding, and here is the year it depends on, and I cannot fully account for that year. Everything after it has to be written more carefully.",
      "Which is roughly what happened. The conclusions came out associational rather than causal \u2014 the relationship is there, pointing the right way, resting on too few years and one of them unexplained.",
      "I had expected to end with an answer about whether governance works. What I ended with was a smaller and more specific thing: an unexplained figure, and a decision about what to do with it. I'm still not sure what the 1.5 was. I'm fairly sure that leaving it visible was the right call.",
    ],
    mediaAfterParagraph: 5,
    table: {
      columns: ["Year", "Reported", "Reconstructed", "Residual", ""],
      rows: [
        ["2021", "12.1", "12.0", "+0.10", "Methodology updates"],
        ["2022", "11.4", "11.4", "0.0", "Portfolio-driven changes"],
        ["2023", "11.6", "11.5", "+0.06", "Small rise despite incentives"],
        ["2024", "11.0", "12.5", "+1.5", "Unreconciled"],
      ],
      emphasisRow: 3,
      note: "Scope 1 and 2, MtCO\u2082e. Four of nine years shown.",
    },
  },
];

/**
 * A record.
 *
 * Not "Archive" — that word belongs to the same 2023 vocabulary as "digital
 * garden" and will date at the same rate.
 *
 * Set as a book's index: title flush left, hairline leader, context and year
 * flush right. One line each, no descriptions. If an item needs a paragraph to
 * justify its presence, it wanted to be an essay and didn't make it.
 *
 * LINKS: the supplied LinkedIn URLs carried `?profileId=ACoAAC…&lipi=urn:li:…`
 * query strings. Those are session and click-tracking parameters tied to a
 * logged-in view — they are not part of the address, and publishing them
 * embeds tracking identifiers in the page permanently. Stripped to the bare
 * /overlay/Project/{id}/treasury/ path, which resolves on its own.
 *
 * CAVEAT worth knowing: these are LinkedIn profile overlays. They may require
 * a login to view, and they are exactly the platform dependency the panel
 * review flagged — if LinkedIn changes its URL scheme, every link here breaks
 * at once. Fine as an interim measure; the durable version is hosting the
 * artefacts on your own domain.
 *
 * DELIBERATE EXCLUSIONS — accuracy, not editorial preference. Links were
 * supplied for both and are not used:
 *   · Select Fashion — carries invented Year 1 projections (+12% digital
 *     sales, \u221215% markdowns, +22% CTR) for a company never worked with.
 *   · Green Commute Analytics — invented product, invented \u00a355K/SME saving.
 * In a one-line format there is no room to caveat, and a bare linked title
 * implies the work is stood behind.
 *
 * Network Analytics is listed here by default rather than by decision — it
 * was left pending when the chapter closed at five essays.
 */
export interface RecordItem {
  title: string;
  context: string;
  year: string;
  href?: string;
}

const LI = "https://www.linkedin.com/in/sahil-business-analyst/overlay/Project";

export const projectRecord: RecordItem[] = [
  {
    title: "Enhancing R&D Project Success through Network Analytics",
    context: "MSc Business Analytics",
    year: "2024",
    href: `${LI}/1183891163/treasury/`,
  },
  {
    title: "Insightful Analytics for Smarter Lending",
    context: "MSc Business Analytics",
    year: "2024",
    href: `${LI}/758471972/treasury/`,
  },
  {
    title: "Interactive Machine Learning App: Decision Tree vs Random Forest",
    context: "Machine Learning",
    year: "2025",
    href: `${LI}/237896321/treasury/`,
  },
  {
    title: "AI Strategy for Mercedes-Benz",
    context: "Strategic Business Analytics",
    year: "2025",
    href: `${LI}/238246643/treasury/`,
  },
  {
    title: "GoPro: Creating a New Market",
    context: "New Market Creation",
    year: "2025",
    href: `${LI}/152053906/treasury/`,
  },
  {
    title: "Lacoste in MENA: Strategic Trend Analysis",
    context: "Fashion Brand Management",
    year: "2025",
    href: `${LI}/151924291/treasury/`,
  },
];