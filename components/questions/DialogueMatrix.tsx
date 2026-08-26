"use client";

import { useState } from "react";

export interface QuestionDocket {
  id: string;
  number: string;
  question: string;
  answer: string | string[];
  isPending?: boolean;
}

interface DialogueMatrixProps {
  questions: QuestionDocket[];
}

export default function DialogueMatrix({ questions }: DialogueMatrixProps) {
  // Open Q.01 by default so the reader immediately sees your full reflection
  const [activeId, setActiveId] = useState<string | null>("q-01");

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="my-16 w-full select-text">
      <ul className="divide-y divide-neutral-200/80 border-b border-t border-neutral-200/80 dark:divide-neutral-800/80 dark:border-neutral-800/80">
        {questions.map((item) => {
          const isOpen = activeId === item.id;

          return (
            <li key={item.id} className="transition-colors duration-200">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="group flex w-full flex-col justify-between gap-4 py-8 text-left focus:outline-hidden sm:flex-row sm:items-baseline"
              >
                <div className="flex flex-1 items-baseline gap-6 sm:gap-8">
                  {/* Tabular Index Numeral */}
                  <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-neutral-400 transition-colors group-hover:text-amber-700 dark:text-neutral-500 dark:group-hover:text-amber-400">
                    {item.number}
                  </span>

                  {/* Question Title */}
                  <h2
                    className={`font-serif text-2xl font-normal leading-snug tracking-tight transition-colors sm:text-[26px] ${
                      isOpen
                        ? "text-amber-800 dark:text-amber-300"
                        : "text-neutral-900 group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300"
                    }`}
                  >
                    {item.question}
                  </h2>
                </div>

                {/* Subtle Toggle Indicator */}
                <span className="shrink-0 font-mono text-[11px] text-neutral-400 dark:text-neutral-500 sm:self-center">
                  <span className="inline-block transition-transform duration-300">
                    {isOpen ? "— fold" : "+ read"}
                  </span>
                </span>
              </button>

              {/* Unfolded Reading Stanza */}
              {isOpen && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 pb-10 pl-10 pr-2 sm:pl-16">
                  <div className="relative space-y-4 border-l border-amber-600/40 pl-6 dark:border-amber-400/40 sm:pl-8">
                    {Array.isArray(item.answer) ? (
                      item.answer.map((para, idx) => (
                        <p
                          key={idx}
                          className="font-serif text-[17px] sm:text-[18px] font-normal leading-[1.8] text-neutral-800 dark:text-neutral-200"
                        >
                          {para}
                        </p>
                      ))
                    ) : (
                      <p
                        className={`text-[17px] leading-[1.8] ${
                          item.isPending
                            ? "font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500"
                            : "font-serif text-neutral-800 dark:text-neutral-200 sm:text-[18px]"
                        }`}
                      >
                        {item.answer}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}