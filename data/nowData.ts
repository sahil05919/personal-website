import {
  Briefcase,
  Hammer,
  BookOpen,
  MapPinned,
  Train,
  Users,
  Sprout,
  Heart,
  Target,
} from "lucide-react";

export const nowLastUpdated = "July 2026";

export const currentSnapshot = {
  role: "Finance Assistant",
  company: "Middlesex University",
  description:
    "Currently working within the Accounts Payable team while building personal projects, strengthening my analytical thinking, exploring London, attending technology meetups, and preparing for the next stage of my career in data and business analytics.",
};

export const nowCards = [
  {
    id: "working",
    icon: Briefcase,
    title: "Working",
    subtitle: "Finance Assistant",
    badge: "Current Role",

    content: [
      "Working within the Accounts Payable team at Middlesex University.",
      "Supporting day-to-day financial operations and invoice processing.",
      "Learning how finance teams operate within a higher education environment.",
      "Building professional experience while preparing for my transition into analytics.",
    ],
  },

  {
    id: "building",
    icon: Hammer,
    title: "Building",
    subtitle: "Personal Projects",
    badge: "2 Active",

    content: [
      "Designing and developing this personal portfolio website.",
      "Building a Personal Finance Dashboard in Power BI.",
      "Continuously refining both projects with better design and storytelling.",
    ],
  },

  {
    id: "reading",
    icon: BookOpen,
    title: "Reading",
    subtitle: "Bhagavad Gita",
    badge: "Current Read",

    content: [
      "Reading the Bhagavad Gita.",
      "Reflecting on discipline, purpose and decision-making.",
      "Applying timeless ideas to everyday life and work.",
    ],
  },

  {
    id: "london",
    icon: MapPinned,
    title: "Exploring London",
    subtitle: "10 Walking Tours",
    badge: "Explorer",

    content: [
      "Westminster",
      "City of London",
      "South Bank",
      "Tower Bridge",
      "St. Paul's Cathedral",
      "Covent Garden",
      "Soho",
      "Greenwich",
      "Notting Hill",
      "Canary Wharf",
      "",
      "Next:",
      "Camden Town",
      "Borough Market",
    ],
  },

  {
    id: "england",
    icon: Train,
    title: "Exploring England",
    subtitle: "Weekend Trips",
    badge: "Travel",

    content: [
      "Cambridge",
      "Oxford",
      "Brighton",
      "",
      "Next:",
      "Bath",
      "York",
    ],
  },

  {
    id: "community",
    icon: Users,
    title: "Community",
    subtitle: "Meetups & Events",
    badge: "Learning Together",

    content: [
      "Attending AI meetups across London.",
      "Exploring topics around AI, privacy, security and ethics.",
      "Meeting professionals and learning from different perspectives.",
    ],
  },

  {
    id: "growing",
    icon: Sprout,
    title: "Growing",
    subtitle: "Beyond Work",
    badge: "Personal Growth",

    content: [
      "Learning cooking.",
      "Adjusting to life in London.",
      "Improving storytelling.",
      "Building healthier routines and habits.",
    ],
  },

  {
    id: "life",
    icon: Heart,
    title: "Life Outside Work",
    subtitle: "Enjoying the Journey",
    badge: "Balance",

    content: [
      "Playing chess.",
      "Exploring new places.",
      "Weekend walks.",
      "Travelling whenever possible.",
    ],
  },

  {
    id: "focus",
    icon: Target,
    title: "Current Focus",
    subtitle: "This Month",
    badge: "Goals",

    content: [
      "Complete this portfolio website.",
      "Finish my Power BI dashboard.",
      "Continue exploring London.",
      "Attend more technology meetups.",
      "Keep growing personally and professionally.",
    ],
  },
];