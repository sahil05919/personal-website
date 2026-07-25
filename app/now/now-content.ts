// app/now/now-content.ts
//
// Edit this file whenever your "season" changes. Nothing here touches layout —
// update text, add/remove places or links, or add a new entry to a movement
// and the page re-renders correctly.

export type Movement = "doing" | "becoming" | "living";

export interface LinkGroup {
  label: string;
  links: { text: string; href: string }[];
}

export interface PlaceGroup {
  label: string;
  items: string[];
  /** "visited" renders as a filled chip, "planned" as an outlined one */
  variant: "visited" | "planned";
}

export interface Entry {
  label: string;
  paragraphs?: string[];
  linkGroups?: LinkGroup[];
  placeGroups?: PlaceGroup[];
}

export interface MovementBlock {
  key: Movement;
  title: string;
  entries: Entry[];
}

export const lastUpdated = "July 2026";

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
          "A few things I'm building right now: this website, a Power BI project exploring the complete IPL dataset (2008–2024), a personal finance dashboard, and experiments with AI workflows. Each one is a chance to learn something new.",
        ],
      },
      {
        label: "Current Focus",
        paragraphs: [
          "Lately I've been thinking about how good systems outperform motivation, why storytelling is becoming one of the most valuable business skills, and how AI can solve real business problems beyond the hype.",
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
          "Working through 5 books this year — currently on book 3, the Bhagavad Gita. Two to go.",
        ],
      },
      {
        label: "Learning Beyond Work",
        paragraphs: [
          "Trying to get better at storytelling and communication, exploring Hindi Shayari, learning new vegetarian recipes, and keeping up with the latest AI tools.",
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
        placeGroups: [
          {
            label: "Recently",
            variant: "visited",
            items: [
              "British Museum",
              "London walking tours (10+)",
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
        label: "Community",
        paragraphs: [
          "Volunteering at St Luke's Community Centre and showing up to AI and tech meetups around London whenever I can. I enjoy learning from people who think differently from me.",
        ],
      },
      {
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