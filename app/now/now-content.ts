// app/now/now-content.ts
//
// Edit this file whenever your season changes. Nothing here touches layout —
// update text, add or remove places or links, or add a new entry to a movement
// and the page re-renders correctly.
//
// ALWAYS update `lastUpdated` in the same commit. It is hand-set on purpose:
// a build-derived date would silently refresh every time an unrelated page
// changed, which is the one lie this page cannot afford to tell.

export type Movement = "doing" | "becoming" | "living";

export interface LinkGroup {
  label: string;
  links: { text: string; href: string }[];
}

/** A row of place chips. "visited" renders filled, "planned" renders outlined. */
export interface PlaceGroup {
  label: string;
  variant: "visited" | "planned";
  items: string[];
}

/**
 * A stated position, not a musing.
 *
 * `essayHref` stays undefined until the matching piece exists on /writing.
 * Once it does, Now names the belief and Writing argues it — that link is the
 * connective tissue between the two pages, so leave the field in place even
 * while it's empty.
 */
export interface Claim {
  text: string;
  essayHref?: string;
}

export interface Entry {
  label: string;
  /** Rendered before placeGroups, so prose frames the chips rather than trailing them. */
  paragraphs?: string[];
  claims?: Claim[];
  placeGroups?: PlaceGroup[];
  linkGroups?: LinkGroup[];
}

export interface MovementBlock {
  key: Movement;
  title: string;
  entries: Entry[];
}

/**
 * Displayed twice: in the eyebrow beside the page title, and again above the
 * closing line. Format: "D Month YYYY" — a precise date is a commitment,
 * a bare month is a hedge.
 */
export const lastUpdated = "29 July 2026";

export const seasonLine =
  "Learning my craft at work, building projects after hours, and saying yes to more of what London has to offer.";

export const movements: MovementBlock[] = [
  {
    key: "doing",
    title: "Doing",
    entries: [
      {
        label: "Working",
        paragraphs: [
          "Finance Assistant on the Accounts Payable team at Middlesex University — learning the rhythms of finance from the inside while keeping an eye on where I want to take it next.",
        ],
      },
      {
        label: "Building",
        paragraphs: [
          "This website, a Power BI project exploring the complete IPL dataset (2008–2024), a personal finance dashboard, and experiments with AI workflows.",
        ],
      },
      {
        label: "Thinking",
        claims: [
          { text: "Good systems outperform motivation." },
          {
            text: "Storytelling is one of the most undervalued skills in business.",
          },
          {
            text: "AI creates the most value when it solves ordinary business problems, not just impressive ones.",
          },
        ],
      },
    ],
  },
  {
    key: "becoming",
    title: "Becoming",
    entries: [
      {
        label: "Reading",
        paragraphs: [
          "Reading the Bhagavad Gita slowly, one chapter at a time. I'm spending more time reflecting on each chapter than trying to finish the book.",
        ],
      },
      {
        label: "Learning",
        paragraphs: [
          "Trying to become a better storyteller and communicator, exploring Hindi Shayari, and learning new vegetarian recipes.",
        ],
      },
    ],
  },
  {
    key: "living",
    title: "Living",
    entries: [
      {
        label: "Exploring",
        paragraphs: [
          "I've now done more than ten walking tours across London. They've become one of my favourite ways to understand the city's history, neighbourhoods, and character.",
        ],
        placeGroups: [
          {
            label: "Recently",
            variant: "visited",
            items: [
              "British Museum",
              "Cambridge",
              "Oxford",
              "Brighton",
              "Canterbury",
              "Seven Sisters",
            ],
          },
          {
            label: "Next up",
            variant: "planned",
            items: ["Bath", "Windsor"],
          },
        ],
      },
      {
        // When you have the specifics, this entry grows with detail — what you
        // actually do at St Luke's, and why you keep going. It does not grow
        // with a summarising clause.
        label: "Community",
        paragraphs: [
          "I volunteer at St Luke's Community Centre and regularly attend AI and tech meetups around London.",
        ],
      },
      {
        // TEMPORARY. This entry moves to /writing once that page exists, at which
        // point the pieces get republished here with canonical links back to the
        // originals. Delete this entry — do not leave a link to /writing behind
        // until the route actually resolves.
        label: "Writing",
        linkGroups: [
          {
            label: "LinkedIn",
            links: [
              {
                text: "What Happens to Our Childhood Dreams?",
                href: "https://www.linkedin.com/pulse/what-happens-our-childhood-dreams-sahil-kumar-w0fze/",
              },
              {
                text: "The Year AI Became Adult",
                href: "https://www.linkedin.com/pulse/year-ai-became-adult-sahil-kumar-m0ume/",
              },
              {
                text: "When Was the Last Time You Did Something Without Knowing It Would Work?",
                href: "https://www.linkedin.com/pulse/when-last-time-you-did-something-without-knowing-would-sahil-kumar-u4gve/",
              },
            ],
          },
          {
            label: "Bayes Business School",
            links: [
              {
                text: "From Haryana to London: My Journey at Bayes Business School",
                href: "https://www.bayes.citystgeorges.ac.uk/study/masters/blogs/2024/december/from-haryana-to-london-my-journey-at-bayes-business-school",
              },
              {
                text: "Student to Student: How to Make the Most of Your Master's at Bayes",
                href: "https://www.bayes.citystgeorges.ac.uk/study/masters/blogs/2025/september/student-to-student-how-to-make-the-most-of-your-masters-at-bayes",
              },
            ],
          },
        ],
      },
    ],
  },
];