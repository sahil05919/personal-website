"use client";

import { motion } from "framer-motion";
import type { Question } from "@/data/questions-content";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

type Props = {
  questions: Question[];
  intro: string;
  closing: string;
};

export default function QuestionsExperience({ questions, intro, closing }: Props) {
  const reduceMotion = useReducedMotionSafe();

  // One shared reveal used everywhere on the page — deliberately the only
  // motion this page has. No hover states, no repeat triggers: it fires once,
  // on the way into view, and never again.
  const reveal = {
    initial: reduceMotion ? {} : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  // Apparatus that states a true fact about the object, which is the only kind
  // this site allows. Both numbers are counted from the data at render, so the
  // line cannot go stale when a seventh answer gets written.
  const answered = questions.filter(
    (q) => q.paragraphs && q.paragraphs.length > 0
  ).length;

  const WORDS = [
    "None",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const spell = (n: number) => WORDS[n] ?? String(n);

  return (
    <div className="mx-auto max-w-[640px] px-6 pb-40 pt-24 sm:pt-28">
      {/*
        THE MASTHEAD.

        The page used to open on a visually hidden <h1> and roughly three
        hundred pixels of empty paper, then an italic sentence floating in the
        middle of the screen. The titlelessness was deliberate and the instinct
        behind it was right — this page is a held page, not a chapter — but the
        result on arrival was indistinguishable from a page that had failed to
        load its heading.

        So it has a masthead now, and it is the smallest one on the site: the
        name of the section, the tally, and a rule. The tally is the point.
        Stating "Seven, one answered" out loud is what converts six unwritten
        answers from an embarrassment into the page's subject.
      */}
      <motion.header
        {...reveal}
        className="mb-20 border-b border-hairline pb-5 sm:mb-28"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h1 className="font-mono text-apparatus uppercase text-ink">
            Questions
          </h1>
          <p className="font-mono text-apparatus-xs uppercase text-graphite">
            {spell(questions.length)} asked
            <span aria-hidden="true" className="mx-2 text-hairline">
              /
            </span>
            <span className="text-through-line">
              {spell(answered).toLowerCase()} answered
            </span>
          </p>
        </div>
      </motion.header>

      <motion.p
        {...reveal}
        className="mx-auto max-w-[46ch] text-balance text-center font-serif-display text-fluid-claim font-normal italic leading-[1.35] text-graphite"
      >
        {intro}
      </motion.p>

      <div className="mt-32 sm:mt-44">
        {questions.map((q, index) => {
          const hasAnswer = Boolean(q.paragraphs && q.paragraphs.length > 0);

          return (
            <div key={q.id}>
              <motion.section {...reveal} className="mx-auto max-w-[62ch]">
                <h2
                  className={[
                    "font-serif-display text-fluid-row font-normal italic leading-[1.28] text-balance",
                    hasAnswer ? "text-ink" : "text-graphite",
                  ].join(" ")}
                >
                  {q.question}
                </h2>

                <div className="mt-8 font-reading text-fluid-read text-ink/90 text-pretty">
                  {hasAnswer ? (
                    q.paragraphs!.map((p, i) => (
                      <p key={i} className="mb-6 last:mb-0">
                        {p}
                      </p>
                    ))
                  ) : (
                    // Set as apparatus (mono, small, tracked) rather than as
                    // a paragraph of prose — the six unwritten questions
                    // were previously six near-identical italic sentences in
                    // reading type, which read as an unfinished essay rather
                    // than an intentionally held page. A shorter mono note,
                    // matched to the dimmed heading above it, reads instead
                    // like a bookplate: held, not broken.
                    <p className="font-mono text-apparatus uppercase text-graphite">
                      Answer coming soon — updating this page as I go.
                    </p>
                  )}
                </div>

                {q.revisitNote && (
                  <p className="mt-8 font-reading text-fluid-aside italic text-graphite">
                    {q.revisitNote}
                  </p>
                )}
              </motion.section>

              {/* breath mark — a pause between entries, not a divider that
                  spans the column. Omitted after the final question. */}
              {index < questions.length - 1 && (
                <div
                  className="my-28 flex justify-center sm:my-36"
                  aria-hidden="true"
                >
                  <span className="h-px w-8 bg-hairline" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <motion.div {...reveal} className="mt-40 text-center sm:mt-52">
        <p className="text-balance font-serif-display text-fluid-claim font-normal italic text-ink">
          {closing}
        </p>
        <a
          href="/contact"
          className="mt-6 inline-block font-mono text-apparatus uppercase text-graphite transition-colors duration-300 ease-editorial hover:text-through-line"
        >
          Say hello →
        </a>
      </motion.div>
    </div>
  );
}