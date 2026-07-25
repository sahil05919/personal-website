// app/questions/page.tsx
//
// This route is intentionally left unlabeled in Navbar for now, per our
// discussion — add it to `links` in components/global/Navbar.tsx whenever
// you decide whether it should carry a nav label at all.
//
// `force-dynamic` is required here: the question order is shuffled per
// request on the server (see shuffle() below), so this page can't be
// statically generated at build time without freezing one fixed order.

import type { Metadata } from "next";
import { questions, intro, closing } from "@/data/questions-content";
import QuestionsExperience from "@/components/questions/QuestionsExperience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Questions — Sahil Kumar",
  description:
    "A small set of questions worth sitting with, answered honestly, and left to change over time.",
};

function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuestionsPage() {
  const ordered = shuffle(questions);

  return (
    <QuestionsExperience questions={ordered} intro={intro} closing={closing} />
  );
}