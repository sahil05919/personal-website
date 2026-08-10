// app/question/page.tsx
//
// Only answered questions render. Unwritten ones stay in
// data/questions-content.ts with `paragraphs: null` and are filtered out here,
// so the page shows finished work and never announces its own gaps. To publish
// an essay, fill in its paragraphs — nothing in this file changes.
//
// No `force-dynamic` and no shuffle. Shuffling a single entry does nothing,
// and opting out of static generation for it was a real cost for no effect.
// When there are three or four essays and the order starts to matter,
// reintroduce the shuffle client-side after hydration.

import type { Metadata } from "next";
import { questions, intro, closing } from "@/data/questions-content";
import QuestionsExperience from "@/components/questions/QuestionsExperience";

export const metadata: Metadata = {
  // Bare title: the root layout applies the "%s | Sahil Kumar" template, so
  // anything more here double-suffixes the tab.
  title: "Questions",
  description:
    "A small set of questions worth sitting with, answered honestly, and left to change over time.",
};

export default function QuestionsPage() {
  const answered = questions.filter(
    (q) => q.paragraphs !== null && q.paragraphs.length > 0
  );

  return (
    <QuestionsExperience questions={answered} intro={intro} closing={closing} />
  );
}