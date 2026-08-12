"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Question } from "@/data/questions-content";

type Props = {
  questions: Question[];
  intro: string;
  closing: string;
};

export default function QuestionsExperience({ questions, intro, closing }: Props) {
  const reduceMotion = useReducedMotion();

  // One shared reveal used everywhere on the page — deliberately the only
  // motion this page has. No hover states, no repeat triggers: it fires once,
  // on the way into view, and never again.
  const reveal = {
    initial: reduceMotion ? {} : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <div className="mx-auto max-w-[640px] px-6 pb-40 pt-28 sm:pt-36">
      {/* Visually hidden page heading — screen readers still get a landmark,
          the page itself stays titleless. */}
      <h1 className="sr-only">Questions</h1>

      <motion.p
        {...reveal}
        className="mx-auto max-w-[46ch] text-center font-serif-display text-xl italic leading-relaxed text-graphite sm:text-2xl"
      >
        {intro}
      </motion.p>

      <div className="mt-32 sm:mt-44">
        {questions.map((q, index) => {
          const hasAnswer = Boolean(q.paragraphs && q.paragraphs.length > 0);

          return (
            <div key={q.id}>
              <motion.section {...reveal} className="mx-auto max-w-[62ch]">
                <h2 className="font-serif-display text-2xl italic leading-snug text-ink sm:text-3xl">
                  {q.question}
                </h2>

                <div className="mt-8 font-reading text-[18px] leading-[1.85] text-ink/85 sm:text-[19px]">
                  {hasAnswer ? (
                    q.paragraphs!.map((p, i) => (
                      <p key={i} className="mb-6 last:mb-0">
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="italic text-graphite">
                      Answer coming soon — updating this page as I go.
                    </p>
                  )}
                </div>

                {q.revisitNote && (
                  <p className="mt-8 font-reading text-[16px] italic text-graphite">
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
        <p className="font-serif-display text-xl italic text-ink sm:text-2xl">
          {closing}
        </p>
        <a
          href="/contact"
          className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-graphite transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Say hello →
        </a>
      </motion.div>
    </div>
  );
}