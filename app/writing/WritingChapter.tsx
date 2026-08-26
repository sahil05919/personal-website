"use client";

import Link from "next/link";
import { writing, writingIntro } from "@/data/writingData";
import { GhostDraft, MarginAnnotation } from "@/components/global/RevisionLayer";
import { ChronoInk } from "@/components/global/ChronoInk";
import { Sidenote } from "@/components/global/Sidenote";

export default function WritingChapter() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      {/* Chapter Eyebrow & Title */}
      <header className="space-y-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">
          {writingIntro.eyebrow}
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
          <ChronoInk year="2026">{writingIntro.title}</ChronoInk>
        </h1>

        <p className="font-serif italic text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
          <GhostDraft
            original="Essays, working notes, and published thoughts."
            revised={writingIntro.standfirst}
          />
        </p>

        {/* Real Authorial Prose */}
        <div className="space-y-4 pt-4 text-[16px] sm:text-[17px] font-serif leading-[1.75] text-neutral-700 dark:text-neutral-300">
          {writingIntro.body.map((paragraph, idx) => (
            <p key={idx}>
              {idx === 0 ? (
                <>
                  <GhostDraft
                    original="Writing is the only way I can see whether an argument holds."
                    revised={paragraph}
                  />
                  <MarginAnnotation>Keep link to /now explicit</MarginAnnotation>
                </>
              ) : idx === 1 ? (
                <>
                  Two were written for{" "}
                  <Sidenote
                    number={1}
                    date="2024–2025"
                    content="Bayes Business School (City, University of London), commissioned for the postgraduate cohort."
                  >
                    Bayes
                  </Sidenote>
                  , who asked. The rest were not asked for by anybody.
                </>
              ) : (
                paragraph
              )}
            </p>
          ))}
        </div>

        <p className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500 pt-3">
          {writingIntro.note}
        </p>
      </header>

      {/* Divider */}
      <hr className="my-12 border-t border-neutral-200 dark:border-neutral-800" />

      {/* Published Works List with Temporal Ink Chemistry */}
      <section>
        <ul className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
          {writing.map((piece, idx) => (
            <li key={idx} className="py-7 first:pt-0 last:pb-0">
              <a
                href={piece.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline"
              >
                <ChronoInk
                  year={piece.year || "2025"}
                  className="font-serif text-xl sm:text-2xl font-normal transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-400"
                >
                  {piece.title}
                </ChronoInk>

                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  {piece.source}
                  {piece.year ? ` · ${piece.year}` : ""}
                  <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer Turn Links */}
      <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800 pt-8 flex items-center justify-between font-mono text-xs text-neutral-400 dark:text-neutral-500">
        <Link
          href="/"
          className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors underline underline-offset-4"
        >
          ← Frontispiece
        </Link>
        <Link
          href="/now"
          className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors underline underline-offset-4"
        >
          Leaf 03: Now →
        </Link>
      </footer>
    </article>
  );
}