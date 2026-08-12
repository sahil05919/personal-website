'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import {
  journeyChapters,
  type ChapterTone,
  type ChapterPause,
  type ResultMoment as ResultMomentData,
  type MarkMoment as MarkMomentData,
  type MilestoneMoment as MilestoneMomentData,
} from '@/data/journeyData';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

/**
 * A slightly slower, slightly larger-travel entrance than the default
 * `fadeUp`, reserved for the page's three promoted moments (AIR 35, the
 * motorcycle's mark, the Bayes milestone). The point is a different pace
 * for a different kind of beat — not a different fact of the same beat
 * repeated on every paragraph.
 */
const settleIn = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

/** How the through-line segment leaving a chapter should read, visually. */
const SEGMENT_STYLE: Record<ChapterTone, string> = {
  calm: 'w-[1.5px] bg-through-line/70',
  building: 'w-[1.5px] bg-through-line/85',
  rupture: 'w-0 border-l border-dashed border-graphite/50',
  uncertain: 'w-[1.5px] bg-graphite/40',
  resolving: 'w-[1.5px] bg-through-line',
};

/**
 * The connector's length, keyed to narrative weight rather than a single
 * fixed gap for every transition. `long` is used exactly once — leaving
 * the motorcycle chapter — so the page holds a beat before continuing.
 */
const PAUSE_HEIGHT: Record<ChapterPause, number> = {
  short: 40,
  medium: 72,
  long: 140,
};

/**
 * The connector is constrained to the same `max-w-lg` measure as the chapter
 * body so it centres on the reading column, not on the wider outer container.
 *
 * The bar itself now draws in — scaleY from 0 to 1, transform-origin top —
 * rather than simply fading with the rest of the chapter. This is the one
 * element on the page with its own distinct motion signature (settling vs.
 * drawing), so the two read as different things rather than "everything
 * fades up." Under reduced motion, `scaleY` is a transform-keyed value, so
 * MotionConfig's `reducedMotion="user"` (set in app/layout.tsx) replaces
 * this animation with an instant jump to full length — verified against the
 * installed framer-motion source, not assumed.
 */
function Connector({ tone, pause }: { tone: ChapterTone; pause: ChapterPause }) {
  return (
    <div className="max-w-lg" aria-hidden="true">
      <div className="flex justify-center" style={{ height: PAUSE_HEIGHT[pause] }}>
        <motion.div
          className={`h-full origin-top ${SEGMENT_STYLE[tone]}`}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/**
 * Small, abstract line-art artifacts for the chapters that have earned one.
 * Not photos, not decoration-for-its-own-sake — each ties directly to that
 * chapter's content. Five of nine chapters have none, deliberately: Building
 * Ambition and Finding Direction are momentum chapters, and their visual
 * silence is the device, not an omission.
 *
 * Colours must be wrapped in rgb(): the CSS custom properties store bare
 * channel values ("43 92 230"), which are not a valid SVG paint on their own.
 */
function ChapterArtifact({ id }: { id: string }) {
  const line = 'rgb(var(--through-line))';

  switch (id) {
    case 'mahendragarh':
      return (
        <svg viewBox="0 0 64 40" className="w-14 h-9" aria-hidden="true">
          <path d="M4 36 L20 12 L36 36" stroke={line} strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M16 36 L32 16 L48 36" stroke={line} strokeWidth="1.5" fill="none" opacity="0.45" />
          <path d="M28 36 L44 20 L60 36" stroke={line} strokeWidth="1.5" fill="none" opacity="0.25" />
        </svg>
      );
    case 'turning-point':
      return (
        <svg viewBox="0 0 64 24" className="w-14 h-5" aria-hidden="true">
          <path d="M4 18 C 18 18, 22 6, 30 10" stroke={line} strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M34 12 C 38 14, 42 18, 60 18" stroke={line} strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="32" cy="11" r="2" fill={line} opacity="0.6" />
        </svg>
      );
    case 'leaving-home':
      // A doorframe, not a door: two posts and a threshold line. Restrained
      // enough to read as apparatus rather than illustration.
      return (
        <svg viewBox="0 0 40 44" className="w-9 h-10" aria-hidden="true">
          <line x1="11" y1="4" x2="11" y2="36" stroke={line} strokeWidth="1.5" opacity="0.55" />
          <line x1="29" y1="4" x2="29" y2="36" stroke={line} strokeWidth="1.5" opacity="0.55" />
          <line x1="7" y1="36" x2="33" y2="36" stroke={line} strokeWidth="1.5" opacity="0.35" />
        </svg>
      );
    case 'first-chapter':
      // A scatter of points with one line finding a shape through them —
      // "which sources worked best, what patterns kept repeating."
      return (
        <svg viewBox="0 0 64 32" className="w-14 h-7" aria-hidden="true">
          <circle cx="6" cy="24" r="1.6" fill={line} opacity="0.5" />
          <circle cx="16" cy="10" r="1.6" fill={line} opacity="0.5" />
          <circle cx="26" cy="20" r="1.6" fill={line} opacity="0.5" />
          <circle cx="38" cy="8" r="1.6" fill={line} opacity="0.5" />
          <circle cx="48" cy="18" r="1.6" fill={line} opacity="0.5" />
          <circle cx="58" cy="12" r="1.6" fill={line} opacity="0.5" />
          <path
            d="M6 24 Q 20 4, 32 16 T 58 12"
            stroke={line}
            strokeWidth="1.25"
            fill="none"
            opacity="0.6"
          />
        </svg>
      );
    case 'the-leap':
      return (
        <svg viewBox="0 0 64 32" className="w-14 h-7" aria-hidden="true">
          <path
            d="M4 28 Q 32 -4 60 28"
            stroke={line}
            strokeWidth="1.5"
            fill="none"
            opacity="0.55"
            strokeDasharray="3 4"
          />
          <circle cx="60" cy="28" r="2.5" fill={line} />
        </svg>
      );
    case 'still-becoming':
      return (
        <svg viewBox="0 0 40 40" className="w-9 h-9" aria-hidden="true">
          <circle cx="20" cy="20" r="4" fill={line} />
          <circle cx="20" cy="20" r="10" fill="none" stroke={line} strokeWidth="0.75" opacity="0.4" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * AIR 35 — the page's one "result" register. Breaks the reading measure
 * slightly wider than the surrounding `max-w-lg` prose (a small negative
 * margin, not a full-bleed section) so it reads as a page the reader moves
 * *through* rather than past. No border, no background panel, no badge —
 * an editorial numeral, the same grammar Experience's ledger already uses
 * elsewhere on the site.
 */
function ResultMoment({ eyebrow, figure, caption }: ResultMomentData) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      variants={settleIn}
      className="-mx-4 md:-mx-8 my-8 py-2"
    >
      <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-graphite mb-2">
        {eyebrow}
      </p>
      <p className="font-serif-display font-medium text-[4rem] sm:text-[5rem] leading-none tracking-tight text-ink">
        {figure}
      </p>
      <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-graphite mt-2">
        {caption}
      </p>
    </motion.div>
  );
}

/**
 * The motorcycle's promoted line. Reserved for exactly one chapter — the
 * more sparingly this register is used, the more it means when it appears.
 */
function MarkMoment({ lines }: MarkMomentData) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      variants={settleIn}
      className="my-7"
    >
      {lines.map((line, i) => (
        <p
          key={i}
          className="font-serif-display font-medium text-[1.625rem] sm:text-[2rem] leading-snug tracking-tight"
          style={{ color: 'rgb(var(--through-line))' }}
        >
          {line}
        </p>
      ))}
    </motion.div>
  );
}

/**
 * The Bayes Business Analytics Society milestone. Visually related to
 * ResultMoment (mono eyebrow, Fraunces figure) but deliberately smaller and
 * without a breakout measure — AIR 35 is a number that happened; this is a
 * role someone was trusted with, and it should read as quieter than a
 * result, not louder. No period is stated unless one has actually been
 * confirmed — the chapter's own era label already carries the timeframe.
 */
function Milestone({ org, role, period, note }: MilestoneMomentData) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      variants={settleIn}
      className="my-7 pl-4 border-l border-hairline"
    >
      <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-graphite mb-1.5">
        {org}
      </p>
      <p className="font-serif-display font-medium text-xl sm:text-[1.375rem] leading-snug tracking-tight text-ink">
        {role}
        {period && (
          <span className="font-mono text-[11px] tracking-[0.04em] text-graphite ml-2 align-middle">
            {period}
          </span>
        )}
      </p>
      {note && (
        <p className="font-reading italic text-[14px] sm:text-[15px] leading-relaxed text-graphite mt-2 max-w-sm">
          {note}
        </p>
      )}
    </motion.div>
  );
}

/** Chapters with a ChapterArtifact case (kept in sync with the switch above by
 *  hand — there are only nine chapters, a generated set would be overkill).
 *  Used to decide, per chapter, whether to reserve a right-margin column at
 *  all: chapters without one (School Years, Building Ambition, Finding
 *  Direction — the first has its own result moment, the last its milestone,
 *  and Building Ambition stays visually silent on purpose) render as a plain
 *  single-column block, so the empty margin space next to them is real
 *  silence, not a reserved-but-unused grid track. */
const CHAPTERS_WITH_ARTIFACT = new Set([
  'mahendragarh',
  'turning-point',
  'leaving-home',
  'first-chapter',
  'the-leap',
  'still-becoming',
]);

/**
 * The right-margin content for the six chapters that have an artifact.
 * Desktop only (`lg` and up) — on narrower viewports the same artifact
 * renders inline next to the era label instead (see below), since there's
 * no margin to put it in. A large, quiet echo of the era sits above the
 * artifact: decorative only (the real era label is the mono one inline,
 * already announced to screen readers), so this is aria-hidden.
 */
function ChapterMargin({ era, id }: { era: string; id: string }) {
  return (
    <div className="hidden lg:flex lg:flex-col lg:items-start lg:pt-1">
      <p
        className="font-serif-display text-2xl leading-none text-graphite/35 mb-4"
        aria-hidden="true"
      >
        {era}
      </p>
      <ChapterArtifact id={id} />
    </div>
  );
}

export default function JourneyChapters() {
  return (
    <div>
      {journeyChapters.map((chapter, i) => {
        const hasMargin = CHAPTERS_WITH_ARTIFACT.has(chapter.id);

        return (
          <div key={chapter.id}>
            <motion.article
              id={chapter.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15%' }}
              variants={fadeUp}
              aria-labelledby={`chapter-${chapter.id}-title`}
              className={
                hasMargin
                  ? 'lg:grid lg:grid-cols-[minmax(0,34rem)_1fr] lg:gap-x-10 xl:gap-x-14 pb-2 scroll-mt-[88px]'
                  : 'max-w-lg pb-2 scroll-mt-[88px]'
              }
            >
              {/* The measure lives here so the era label, title and prose
                  share one column and one right edge, on every breakpoint —
                  at `lg` and up this is the grid's first track; below `lg`,
                  where there's no grid, `max-w-lg` alone does the job. */}
              <div className="max-w-lg lg:max-w-none">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-graphite">
                    {chapter.era}
                  </span>
                  {/* Inline fallback below `lg`; the margin column (right,
                      desktop-only) carries the artifact instead once there's
                      room for one. */}
                  <span className="lg:hidden">
                    <ChapterArtifact id={chapter.id} />
                  </span>
                </div>

                <h2
                  id={`chapter-${chapter.id}-title`}
                  className="font-serif-display font-medium text-2xl md:text-[1.75rem] leading-snug tracking-tight mb-5"
                >
                  {chapter.title}
                </h2>

                <div className="space-y-4 mb-6">
                  {chapter.body.map((paragraph, pi) => (
                    <Fragment key={pi}>
                      <p className="text-[15px] md:text-base leading-relaxed text-ink">
                        {paragraph}
                      </p>
                      {chapter.markMoment?.insertAfter === pi && (
                        <MarkMoment {...chapter.markMoment} />
                      )}
                      {chapter.resultMoment?.insertAfter === pi && (
                        <ResultMoment {...chapter.resultMoment} />
                      )}
                      {chapter.milestone?.insertAfter === pi && (
                        <Milestone {...chapter.milestone} />
                      )}
                    </Fragment>
                  ))}
                </div>

                {/* A paragraph, not a blockquote — these are Sahil's own
                    reflections, not quotations from elsewhere. Present on two
                    chapters only as of the August 2026 revision: the
                    motorcycle and the leap to London, the two chapters that
                    don't already narrate their own takeaway in prose. */}
                {chapter.lesson && (
                  <p className="border-l border-hairline pl-4 ml-1 font-serif-display italic text-[15px] text-ink max-w-md">
                    {chapter.lesson}
                  </p>
                )}
              </div>

              {hasMargin && <ChapterMargin era={chapter.era} id={chapter.id} />}
            </motion.article>

            {i < journeyChapters.length - 1 && (
              <Connector tone={chapter.tone} pause={chapter.pause} />
            )}
          </div>
        );
      })}
    </div>
  );
}
