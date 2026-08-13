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
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';

// Ease unified to the site's signature settle curve (was Framer's named
// 'easeOut') as part of the sitewide motion pass — see JourneyHero.tsx.
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
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
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

/**
 * Stroke language per tone. The connector used to be a single vertical bar
 * that only varied in width, opacity and dash — colour doing all the work.
 * It now also varies in *shape*: the line a chapter leaves behind is drawn
 * to read like the chapter itself, not like a progress rail between them.
 * This is the page's one concession to the brief's "tree with branches"
 * idea — not a literal tree, which would fight the page's restraint, but a
 * path whose bend genuinely means something before you've read the next
 * chapter's heading.
 */
const STROKE_STYLE: Record<
  ChapterTone,
  { stroke: string; width: number; opacity: number; dash?: string }
> = {
  calm: { stroke: 'rgb(var(--through-line))', width: 1.5, opacity: 0.7 },
  building: { stroke: 'rgb(var(--through-line))', width: 1.5, opacity: 0.85 },
  rupture: { stroke: 'rgb(var(--graphite))', width: 1.25, opacity: 0.55, dash: '1 5' },
  uncertain: { stroke: 'rgb(var(--graphite))', width: 1.5, opacity: 0.45 },
  resolving: { stroke: 'rgb(var(--through-line))', width: 1.75, opacity: 1 },
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
 * Each tone gets its own path, built proportionally to the connector's own
 * height so a `short` (40px) and a `long` (140px) instance of the same tone
 * still read as the same gesture at different lengths. Every path starts
 * and ends on the shared centre line (x = 20) so consecutive connectors of
 * different tones still stack into one continuous spine — only the
 * *interior* of the line editorialises.
 *
 *   calm       — a near-straight run. Nothing to say between these chapters.
 *   building   — bows out and back: reach, then return, gaining ground.
 *   rupture    — a sharp lateral kink, dashed either side of it. A line that
 *                does not simply continue.
 *   uncertain  — two opposed bows in sequence: a line that keeps changing
 *                its mind before it arrives anywhere.
 *   resolving  — starts off-centre and swings deliberately back onto the
 *                spine, landing precisely on it. Arrival, not drift.
 */
function pathFor(tone: ChapterTone, h: number): string {
  switch (tone) {
    case 'calm':
      return `M20,0 C 20,${h * 0.33} 20,${h * 0.67} 20,${h}`;
    case 'building':
      return `M20,0 C 27,${h * 0.35} 25,${h * 0.72} 20,${h}`;
    case 'rupture': {
      const kink = Math.min(h * 0.22, 9);
      return `M20,0 L20,${h * 0.4} L${20 + kink},${h * 0.5} L20,${h * 0.6} L20,${h}`;
    }
    case 'uncertain':
      return `M20,0 C 12,${h * 0.22} 28,${h * 0.4} 15,${h * 0.58} C 8,${h * 0.7} 26,${h * 0.86} 20,${h}`;
    case 'resolving':
      return `M14,0 C 25,${h * 0.32} 11,${h * 0.62} 20,${h}`;
  }
}

/**
 * The connector is constrained to the same `max-w-lg` measure as the chapter
 * body so it centres on the reading column, not on the wider outer container.
 *
 * The line draws in via `pathLength` (0 → 1) rather than the previous
 * `scaleY`: a curved path scaled vertically would distort its own bend, so
 * only an actual stroke-draw reads correctly once the connector stopped
 * being a straight bar. `pathLength` is not one of framer-motion's
 * positional keys (checked against the installed motion-dom source), so
 * MotionConfig's `reducedMotion="user"` does *not* auto-snap it the way it
 * does `scaleY` elsewhere on this page — reduced motion is handled by hand
 * here instead, rendering the finished line with no draw animation.
 *
 * `branch` marks the three connectors that lead into a chapter with a
 * promoted moment (AIR 35, the motorcycle's mark, the Bayes milestone): a
 * short offshoot splits from the main line in its final third and ends in a
 * small point, a quiet "something happens here" a beat before the reader
 * reaches it.
 */
function Connector({
  tone,
  pause,
  branch,
}: {
  tone: ChapterTone;
  pause: ChapterPause;
  branch: boolean;
}) {
  const prefersReducedMotion = useReducedMotionSafe();
  const h = PAUSE_HEIGHT[pause];
  const style = STROKE_STYLE[tone];
  const d = pathFor(tone, h);

  return (
    <div className="max-w-lg" aria-hidden="true">
      <div className="flex justify-center" style={{ height: h }}>
        <svg width="40" height={h} viewBox={`0 0 40 ${h}`} fill="none">
          <motion.path
            d={d}
            stroke={style.stroke}
            strokeWidth={style.width}
            strokeOpacity={style.opacity}
            strokeDasharray={style.dash}
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          {branch && (
            <motion.g
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.6 }}
            >
              <path
                d={`M20,${h * 0.72} L30,${h * 0.84}`}
                stroke={style.stroke}
                strokeWidth={1}
                strokeOpacity={0.5}
                strokeLinecap="round"
              />
              <circle cx="30" cy={h * 0.84} r="1.75" fill={style.stroke} opacity="0.65" />
            </motion.g>
          )}
        </svg>
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
              <Connector
                tone={chapter.tone}
                pause={chapter.pause}
                branch={Boolean(
                  journeyChapters[i + 1].resultMoment ||
                    journeyChapters[i + 1].markMoment ||
                    journeyChapters[i + 1].milestone
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
