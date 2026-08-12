// app/question/page.tsx
//
// All questions render, answered or not. An unwritten one (`paragraphs: null`
// in data/questions-content.ts) shows a short "coming soon" note instead of
// full paragraphs — see components/questions/QuestionsExperience.tsx. To
// publish an essay, fill in its paragraphs there — nothing in this file
// changes.
//
// No `force-dynamic` and no shuffle — order follows the array in
// data/questions-content.ts. Reconsider a shuffle once several essays are
// finished and order starts to matter.

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
  return (
    <QuestionsExperience questions={questions} intro={intro} closing={closing} />
  );
}