export interface GardenNote {
  slug: string;
  title: string;
  stage: 'seed' | 'bud' | 'evergreen';
  category: string;
  tags: string[];
  lastCultivated: string;
  snippet: string;
}

export const gardenNotes: GardenNote[] = [
  {
    slug: "bhagavad-gita-focus-on-action",
    title: "Focusing on the Work, Not the Outcome",
    stage: "evergreen",
    category: "Philosophy",
    tags: ["Mindset", "Gita Reflections", "Career"],
    lastCultivated: "June 2026",
    snippet: "My notes on a foundational lesson from the Bhagavad Gita: you have a right to your actions, but not to the fruits of your actions. How this shapes my approach to intense job searches and long-term skill building."
  },
  {
    slug: "oxford-climb-and-perspective",
    title: "What a Solo Trip to Oxford Taught Me About Perspective",
    stage: "bud",
    category: "Life Lessons",
    tags: ["Travel", "Reflections", "Independence"],
    lastCultivated: "April 2026",
    snippet: "Reflecting on my solo climb up the St Mary the Virgin church tower in Oxford. Sometimes, when you are deep in the daily grind of exams, applications, and shifting environments, you need to step completely out to see the bigger picture."
  },
  {
    slug: "moving-from-excel-to-dax-thinking",
    title: "Unlearning Excel to Understand Power BI Data Modeling",
    stage: "seed",
    category: "Technical Notes",
    tags: ["Power BI", "DAX", "Data Analysis"],
    lastCultivated: "May 2026",
    snippet: "Early notes on a common hurdle: breaking away from flat Excel worksheets to embrace dynamic star schemas and filter contexts in DAX. Writing down simple memory triggers to master scalar vs. table functions."
  },
  {
    slug: "unitemps-and-the-value-of-starting-over",
    title: "The Discipline Learned at the Registration Desk",
    stage: "bud",
    category: "Career Notes",
    tags: ["Humility", "Operations", "London Life"],
    lastCultivated: "March 2026",
    snippet: "Moving to London after already earning an MBA meant standing at induction desks checking student IDs and guiding tour groups. These raw notes detail why treating everyday operational tasks with absolute respect builds real character."
  }
];