// data/questions-content.ts
//
// Content lives here, layout lives in the page/component. To add or edit an
// answer, just edit this file — no component changes needed.
//
// `paragraphs: null` (or an empty array) renders the shared placeholder line
// in the exact typographic rhythm of a finished essay, so half-written pages
// never look visually "unfinished" — only textually so.
//
// `revisitNote` is optional and rare by design — use it on at most one or two
// questions, only where it's actually true. It is NOT meant to appear on
// every entry (that would turn a sincere admission into a template).

export type Question = {
  id: string;
  question: string;
  paragraphs: string[] | null;
  revisitNote?: string;
};

export const intro =
  "If we had another hour together, these are probably the questions we'd eventually get to.";

export const closing = "Thanks for asking.";

export const questions: Question[] = [
  {
    id: "changed-mind",
    question: "What have you changed your mind about?",
    paragraphs: [
      "For a long time, I believed happiness was something I had to earn.",
      "I thought that once I had enough money, achieved enough success, and solved enough problems for the people around me, then I would finally allow myself to enjoy life. Until then, happiness felt like a distraction—something I could come back to later.",
      "Looking back, I realise I spent years postponing it.",
      "When I scored in the 90th percentile on the CAT exam, I didn't see an achievement. I saw a failure because it wasn't the score I had imagined. Instead of celebrating how far I'd come, I focused entirely on where I hadn't reached.",
      "It wasn't just my studies. That mindset quietly shaped everything else.",
      "I remember one birthday after my grandmother passed away. My sister brought home a cake. I refused to cut it. At the time, I thought I was honouring my grief. Years later, I realised something else: I had become so uncomfortable with happiness that I didn't know how to accept it when it was offered. I often think about how she must have felt that day.",
      "Some people avoid sadness.",
      "I was avoiding happiness.",
      "Even when life gave me reasons to celebrate, I found reasons not to.",
      "When I landed a job that paid far more than I had ever earned before, I didn't feel proud. I immediately convinced myself it still wasn't enough. When my sister and brother-in-law treated me to experiences I had once dreamed about, I was physically there, but mentally somewhere else, worrying about what I hadn't achieved yet.",
      "The moments were there.",
      "My mind simply wasn't letting me enjoy them.",
      "Moving to London changed something. Living alone forced me to spend time with my own thoughts, without constantly comparing myself to other people's expectations. Slowly, I started noticing small moments that I would once have ignored: buying myself a favourite meal after work, exploring a new part of the city, building this website simply because I wanted to—not because it would impress anyone.",
      "None of those moments solved my problems.",
      "But they reminded me that life wasn't waiting for me at the end of success. It was happening while I was busy chasing it.",
      "Money still matters. It brings security, creates opportunities, and removes many real problems. I don't pretend otherwise.",
      "What I've changed my mind about is what comes after.",
      "I no longer believe that happiness arrives once you've earned enough, achieved enough, or become enough.",
      "I think happiness is something you have to practise while you're still becoming.",
      "I'm still learning that. Some days I fall back into old habits. But now, when something good happens—even something small—I try to stop, notice it, and let myself enjoy it.",
      "Because looking back, I don't think happiness was missing from my life.",
      "I think I kept walking past it because I believed I hadn't earned it yet.",
    ],
  },
  {
    id: "no-longer-prove",
    question: "What do you no longer feel the need to prove?",
    paragraphs: null,
  },
  {
    id: "nobody-expecting",
    question: "Who are you when nobody is expecting anything from you?",
    paragraphs: null,
  },
  {
    id: "careful-not-to-lose",
    question: "What part of yourself are you most careful not to lose?",
    paragraphs: null,
  },
  {
    id: "enough",
    question: "What kind of life would feel like enough?",
    paragraphs: null,
  },
  {
    id: "still-figuring-out",
    question: "What are you still trying to figure out?",
    paragraphs: null,
  },
  {
    id: "quiet-theme",
    question: "If your life had a quiet theme, what would you want it to be?",
    paragraphs: null,
  },
];