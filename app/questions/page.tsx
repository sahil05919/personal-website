import Link from "next/link";
import DialogueMatrix, { QuestionDocket } from "@/components/questions/DialogueMatrix";

export const metadata = {
  title: "Questions — Sahil Kumar",
  description:
    "If we had another hour together, these are probably the questions we'd eventually get to.",
};

const QUESTIONS_DATA: QuestionDocket[] = [
  {
    id: "q-01",
    number: "01",
    question: "What have you changed your mind about?",
    answer: [
      "For a long time, I believed happiness was something I had to earn.",
      "I thought that once I had enough money, achieved enough success, and solved enough problems for the people around me, then I would finally allow myself to enjoy life. Until then, happiness felt like a distraction — something I could come back to later.",
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
      "Moving to London changed something. Living alone forced me to spend time with my own thoughts, without constantly comparing myself to other people's expectations. Slowly, I started noticing small moments that I would once have ignored: buying myself a favourite meal after work, exploring a new part of the city, building this website simply because I wanted to — not because it would impress anyone.",
      "None of those moments solved my problems.",
      "But they reminded me that life wasn't waiting for me at the end of success. It was happening while I was busy chasing it.",
      "Money still matters. It brings security, creates opportunities, and removes many real problems. I don't pretend otherwise.",
      "What I've changed my mind about is what comes after.",
      "I no longer believe that happiness arrives once you've earned enough, achieved enough, or become enough.",
      "I think happiness is something you have to practise while you're still becoming.",
      "I'm still learning that. Some days I fall back into old habits. But now, when something good happens — even something small — I try to stop, notice it, and let myself enjoy it.",
      "Because looking back, I don't think happiness was missing from my life.",
      "I think I kept walking past it because I believed I hadn't earned it yet.",
    ],
  },
  {
    id: "q-02",
    number: "02",
    question: "What do you no longer feel the need to prove?",
    answer: "Answer coming soon — updating this page as I go.",
    isPending: true,
  },
  {
    id: "q-03",
    number: "03",
    question: "Who are you when nobody is expecting anything from you?",
    answer: "Answer coming soon — updating this page as I go.",
    isPending: true,
  },
  {
    id: "q-04",
    number: "04",
    question: "What part of yourself are you most careful not to lose?",
    answer: "Answer coming soon — updating this page as I go.",
    isPending: true,
  },
  {
    id: "q-05",
    number: "05",
    question: "What kind of life would feel like enough?",
    answer: "Answer coming soon — updating this page as I go.",
    isPending: true,
  },
  {
    id: "q-06",
    number: "06",
    question: "What are you still trying to figure out?",
    answer: "Answer coming soon — updating this page as I go.",
    isPending: true,
  },
  {
    id: "q-07",
    number: "07",
    question: "If your life had a quiet theme, what would you want it to be?",
    answer: "Answer coming soon — updating this page as I go.",
    isPending: true,
  },
];

export default function QuestionsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      {/* Chapter Header */}
      <header className="space-y-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">
          Chapter 07 — Inquiries
        </div>
        <h1 className="font-serif text-4xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
          Questions
        </h1>
        <p className="font-serif italic text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-xl pt-1">
          If we had another hour together, these are probably the questions we&apos;d eventually get to.
        </p>
      </header>

      {/* The Monograph Ruled Dialogue List */}
      <DialogueMatrix questions={QUESTIONS_DATA} />

      {/* Postscript & Direct Contact Callout */}
      <div className="my-14 space-y-3 font-serif text-[17px] text-neutral-700 dark:text-neutral-300">
        <p>Thanks for asking.</p>
        <p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-amber-700 underline underline-offset-4 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
          >
            Say hello →
          </Link>
        </p>
      </div>

      {/* Chapter Turn Navigation */}
      <footer className="mt-24 flex items-center justify-between border-t border-neutral-200 pt-8 font-mono text-xs text-neutral-400 dark:border-neutral-800 dark:text-neutral-500">
        <Link
          href="/media"
          className="underline underline-offset-4 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          ← Leaf 06: Media
        </Link>
        <Link
          href="/contact"
          className="underline underline-offset-4 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          Leaf 08: Contact →
        </Link>
      </footer>
    </article>
  );
}