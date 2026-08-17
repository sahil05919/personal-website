// app/experience/page.tsx
//
// Server component. No 'use client', no state, no motion. The only dynamic
// behaviour on the page is CSS `position: sticky`, which needs no JS.
//
// ─────────────────────────────────────────────────────────────────────────────
// THE GOVERNING IDEA
//
// Two registers, kept apart in space:
//   APPARATUS — figures, years, organisations, places. Mono and Fraunces.
//               Dense, scannable, never read end to end.
//   VOICE     — the prose. Newsreader. Open, read linearly.
//
// Version 1 had only voice: 3,000 words in a centred column with no apparatus
// anywhere, so the eye had nothing to hold and a reader couldn't judge the
// shape before committing. The ledger is a plate of pure apparatus. The spread
// runs apparatus alongside voice in a fixed left column.
//
// ─────────────────────────────────────────────────────────────────────────────
// THE PAGE IS NOT CENTRED
//
// An 880px container, contents hard-left within it. Prose sits 240px in, and
// slack accumulates on the right. A centred 620px column with equal dead space
// each side is what made v1 read as a document; an uneven right edge is what
// makes a magazine read as composed. This is the single biggest change.
//
// Three measures, used deliberately:
//   880  plate    ledger, hinge line, photograph
//   620  prose    turn entries
//   720  prose    prologue only — widest on the page, marks it as outside the
//                 chronology before a word is read
//   520  prose    plain entries — narrower, quieter, parenthetical
//
// ─────────────────────────────────────────────────────────────────────────────
// TYPEFACE RULES (tailwind.config.js is the authority; these fail silently):
//   font-serif-display  Fraunces — standfirst, headings, ledger figures, hinge,
//                       gloss. Weights 400 and 500 ONLY.
//   font-reading        Newsreader — all prose and ledger glosses. Upright 400
//                       and italic 400/500 only. NEVER font-medium on upright
//                       text in this face; there is no upright 500 and the
//                       browser will synthesise one.
//   font-mono           JetBrains Mono — chapter label, date slot, stub meta,
//                       attribution.
//   font-serif          DOES NOT EXIST. Resolves to ui-serif with no error.
//                       If you see it here, it is a bug.
//
// Colour: Through-Line tokens only. No neutral-*, no shadcn semantic tokens, no
// dark: pairs — the tokens theme themselves via CSS variables. Dark values in
// globals.css are an unreviewed extrapolation; two optical corrections are
// noted inline below and should be applied at design review, not guessed now.
//
// No <main> here — app/layout.tsx already provides one, and that wrapper also
// supplies pt-16, which the header padding is calculated on top of.

import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ChapterOpening } from "@/components/type/ChapterOpening";
import { GlanceContents, type GlanceItem } from "@/components/global/GlanceContents";
import { GlanceRail } from "@/components/global/GlanceRail";
import {
  chapterLabel,
  dateSlot,
  standfirst,
  ledger,
  hinge,
  prologue,
  entries,
  coda,
  type ExperienceEntry,
} from "./experience-content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "A record of the work I was given rather than the work I chose — beginning with a saree shop in Mahendragarh.",
};

/**
 * PROTOTYPE TOGGLE.
 *
 * true  — the stub holds while its prose scrolls past, so at any scroll
 *         position the reader knows which entry they are inside without a
 *         floating nav, a progress bar or a rail.
 * false — the stub sits at the top of its entry and scrolls away normally.
 *
 * Flip and rebuild to compare. Nothing else changes.
 */
const STICKY_STUB = true;

const BODY =
  "font-reading text-[17px] leading-[1.65] text-ink sm:text-[19px] sm:leading-[1.72]";

// One step up from body, looser leading — a magazine lede. Newsreader has no
// upright 500, so size alone carries the emphasis.
const LEDE =
  "font-reading text-[19px] leading-[1.6] text-ink sm:text-[22px] sm:leading-[1.6]";

const META = "font-mono text-[11px] text-graphite sm:text-[12px]";

/**
 * Fallback place for the two entries whose stub omits `place` (both `plain`
 * tier, so they render with no left-column stub at all). Kept as a small
 * local lookup rather than parsed out of `attribution`'s free text, which
 * would be one string-format change away from silently breaking.
 */
const PLACE_FALLBACK: Record<string, string> = {
  "jay-bharat-maruti": "Gurgaon",
  "middlesex-university": "London",
};

/**
 * The route. A second apparatus alongside the ledger, reading the same
 * eleven-stop record as a shape instead of a set of figures: nine years on
 * one side of a line, everything after on the other. It is not a map and
 * not a calendar — points sit in the order the chapter tells them, which is
 * occasionally not chronological (Unitemps runs behind St Luke's in date but
 * after it in the text, on purpose — see the note in experience-content.ts),
 * because this diagram is illustrating the essay's own sequence, not
 * relitigating it against a calendar.
 *
 * Two lanes only — India/remote above, London below — because that is the
 * one geographic fact the whole chapter turns on. The single diagonal
 * segment is the hinge drawn as a line instead of only stated in prose; it
 * lands on the same entry (`enhanceer`) that `hinge.after` already names, so
 * the two devices cannot disagree with each other.
 */
function RouteDiagram() {
  const stops = [
    { id: "prologue", lane: 0 as const },
    ...entries.map((entry) => ({
      id: entry.id,
      lane: (entry.place ?? PLACE_FALLBACK[entry.id]) === "London" ? 1 : (0 as 0 | 1),
    })),
  ];

  const W = 880;
  const H = 64;
  const xPad = 4;
  const upperY = 14;
  const lowerY = 50;
  const usableWidth = W - xPad * 2;
  const x = (i: number) => xPad + (usableWidth * i) / (stops.length - 1);
  const y = (lane: 0 | 1) => (lane === 0 ? upperY : lowerY);

  const line = "rgb(var(--through-line))";
  const path = stops
    .map((s, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(s.lane)}`)
    .join(" ");

  const hingeIndex = stops.findIndex((s) => s.id === "enhanceer");

  return (
    <div className="mt-10 sm:mt-12" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="presentation">
        <path d={path} stroke={line} strokeWidth="1.25" fill="none" opacity="0.5" />
        {stops.map((s, i) => (
          <circle
            key={s.id}
            cx={x(i)}
            cy={y(s.lane)}
            r={i === hingeIndex ? 3.5 : 2}
            fill={i === hingeIndex ? "rgb(var(--paper))" : line}
            stroke={line}
            strokeWidth={i === hingeIndex ? 1.5 : 0}
            opacity={i === hingeIndex ? 1 : 0.55}
          />
        ))}
      </svg>
      <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-graphite sm:text-[11px]">
        <span>Mahendragarh &rarr; Ahmedabad</span>
        <span>London</span>
      </div>
    </div>
  );
}

/**
 * The opening plate. Right-aligned figures against left-aligned glosses — a
 * ledger, which is both the correct editorial form and, given the current job,
 * quietly apt.
 *
 * Semantically a description list. Using headings for the figures would repeat
 * the /about error of putting data values in the document outline; <dl> gives a
 * screen reader "40 — sarees opened for one sale", which is what it is.
 *
 * Figure sizes come from the data and vary by narrative weight. The ragged left
 * edge that produces IS the composition — equal sizes would be a table. Rows are
 * baseline-aligned so the varying sizes don't produce ragged vertical rhythm.
 *
 * DARK MODE: large Fraunces numerals gain apparent weight when inverted; 56px
 * near-white on near-black will bloom and turn a restrained plate into a
 * scoreboard. At design review, render these at `graphite` in dark rather than
 * `ink`. The plate should be quieter in dark than in light, not brighter.
 */
function Ledger() {
  return (
    <dl className="m-0 p-0">
      {ledger.map((row, i) => (
        <Reveal
          key={row.figure}
          index={i}
          step={0.06}
          duration={0.5}
          margin="-60px"
          style={
            {
              "--fig": `${row.scale}px`,
              "--fig-m": `${row.scaleMobile}px`,
            } as React.CSSProperties
          }
          className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-x-6 py-2.5 sm:grid-cols-[240px_minmax(0,1fr)] sm:gap-x-10 sm:py-3"
        >
          <dt className="text-right font-serif-display text-[length:var(--fig-m)] font-medium leading-none text-ink sm:text-[length:var(--fig)]">
            {row.figure}
          </dt>
          <dd className="m-0 font-reading text-[15px] leading-[1.45] text-graphite sm:text-[17px]">
            {row.gloss}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}

/**
 * One entry.
 *
 * TURN entries get an apparatus stub in the left column and a 620px measure.
 * PLAIN entries get no stub, a 520px measure, a smaller heading, and indent to
 * the prose edge so the reading edge never moves. They read as asides — which
 * is what they are. This is the whole answer to asymmetry-without-alternation:
 * the rhythm was already in the writing, and the layout stops hiding it.
 *
 * DOM order is heading → stub → prose, so a screen reader hears the title
 * first. On mobile the stub is moved above the heading visually with flex
 * `order`, which changes paint order only. Rendering it twice with one copy
 * CSS-hidden would reproduce the duplicated-content defect found on /journey.
 */
function Entry({
  entry,
  isPrologue = false,
}: {
  entry: ExperienceEntry;
  isPrologue?: boolean;
}) {
  const plain = entry.tier === "plain";
  const hasStub = !plain && !isPrologue && Boolean(entry.year);

  const measure = isPrologue
    ? "sm:max-w-[720px]"
    : plain
      ? "sm:max-w-[520px]"
      : "sm:max-w-[620px]";

  const heading = isPrologue
    ? "text-[26px] sm:text-[34px]"
    : plain
      ? "text-[20px] sm:text-[22px]"
      : "text-[24px] sm:text-[28px]";

  const prose = (
    <div className={measure}>
      {entry.body.map((paragraph, index) => {
        const paraClass = `${index === 0 ? LEDE : BODY} ${
          index === 0 ? "mt-7 sm:mt-8" : "mt-[22px] sm:mt-[26px]"
        }`;

        /*
          The drop cap goes on the first paragraph in the READING face. Index 0
          on every entry here is a lede at a larger size, and a cap inside a
          lede is two display treatments arguing over the same few words — so
          the cap lands on index 1, the first run of ordinary prose. Entries
          with only one paragraph get none, which ChapterOpening also decides
          for itself on length.
        */
        const carriesCap = index === 1;

        return (
        <div key={index}>
          {carriesCap ? (
            <ChapterOpening text={paragraph} className={paraClass} />
          ) : (
            <p className={paraClass}>{paragraph}</p>
          )}

          {/* The photograph, if it exists. Breaks to the full 880px plate —
              wider than its own prose and the only element reaching the
              container's right edge, which is what makes it an event.
              `sizes` is expressed in terms of rendered width; a hardcoded pixel
              value was a live bug on /media.

              Reveals on scroll and gains a faint hover-scale — the same
              restrained "image responds to touch" language used on Media and
              Projects, added here as part of the sitewide motion pass. The
              scale lives on the <Image>, the border/margin/overflow-hidden on
              its wrapper, so the crop never grows past its frame. */}
          {entry.image && entry.imageAfterParagraph === index && (
            <Reveal
              as="div"
              margin="-80px"
              className="group my-10 overflow-hidden border border-hairline bg-hairline sm:my-14 sm:max-w-[880px]"
            >
              <Image
                src={entry.image.src}
                alt={entry.image.alt}
                width={entry.image.width}
                height={entry.image.height}
                sizes="(max-width: 640px) 100vw, 880px"
                className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.02]"
              />
            </Reveal>
          )}
        </div>
        );
      })}

      <p className={`${META} mt-8 tracking-[0.02em] sm:mt-10`}>
        {entry.attribution}
      </p>
    </div>
  );

  if (!hasStub) {
    return (
      <article className={plain ? "sm:pl-[240px]" : undefined}>
        {entry.year && (
          <p className={`${META} mb-3 tracking-[0.08em]`}>{entry.year}</p>
        )}
        <h2
          id={entry.id}
          className={`scroll-mt-24 font-serif-display ${heading} font-medium leading-[1.25] text-ink`}
        >
          {entry.title}
        </h2>
        {prose}
      </article>
    );
  }

  return (
    <article className="flex flex-col sm:grid sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-x-[60px]">
      <h2
        id={entry.id}
        className={`scroll-mt-24 font-serif-display ${heading} font-medium leading-[1.25] text-ink sm:col-start-2 sm:row-start-1`}
      >
        {entry.title}
      </h2>

      {/* No border-left between the columns. The gutter separates them; a rule
          there would read as a table. */}
      <div
        className={`order-first mb-5 sm:order-none sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:mb-0 sm:self-start ${
          STICKY_STUB ? "sm:sticky sm:top-24" : ""
        }`}
      >
        <p className={`${META} tracking-[0.08em] text-ink`}>{entry.year}</p>
        {entry.organisation && (
          <p className={`${META} mt-1.5 tracking-[0.02em]`}>
            {entry.organisation}
          </p>
        )}
        {entry.place && (
          <p className={`${META} tracking-[0.02em]`}>{entry.place}</p>
        )}

        {/* Hidden below sm. A marginal note belongs in a margin, and on a phone
            there isn't one. Deliberately not relocated — see the note in
            experience-content.ts. */}
        {entry.gloss && (
          <p className="mt-8 hidden font-serif-display text-[17px] font-normal italic leading-[1.45] text-graphite sm:block">
            {entry.gloss}
          </p>
        )}
      </div>

      <div className="sm:col-start-2 sm:row-start-2">{prose}</div>
    </article>
  );
}

/**
 * The contents list, built from the same `prologue` and `entries` the page
 * renders — never a second hand-written list, so an entry added or reordered
 * cannot leave a dead anchor behind. Every `id` here is an id that exists,
 * because it is the id the heading is given a few lines further down.
 *
 * The prologue leads it, out of chronological order, exactly as it does on the
 * page: it is dated "since 2011" and sits before a 2018 entry, and the reason
 * for that is the whole first movement of the chapter.
 */
const glanceItems: GlanceItem[] = [
  {
    id: prologue.id,
    marker: "Since 2011",
    label: prologue.title,
    note: "Prologue",
  },
  ...entries.map((entry) => ({
    id: entry.id,
    marker: entry.year ?? "",
    label: entry.title,
    note: entry.organisation,
  })),
];

export default function ExperiencePage() {
  return (
    <div className="bg-paper">
      {/*
        THE FRAME WIDENED, THE MEASURE DID NOT.

        This page was a bare `max-w-[880px]` centred column. It is now that
        same column sitting in the right-hand track of a two-column grid, with
        a sticky rail in the left one — the layout /journey has always used,
        and the reason a reader can jump between entries without scrolling back
        to the top.

        Nothing about the reading width changed: the inner container is still
        capped at 880px and every measure inside it is untouched. What changed
        is the emptiness around it, which is now holding a contents rail.

        Below `lg` the grid collapses and the rail does not render at all —
        GlanceContents further down is the static equivalent for those sizes.
      */}
      <div className="mx-auto max-w-[76rem] px-6 pb-[100px] sm:pb-40 lg:px-10">
        <div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-12 xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-x-16">
          <aside className="hidden lg:block">
            {/* 112px ≈ the navbar plus breathing room, so the rail never sits
                flush under the fixed header. */}
            <div className="sticky top-[112px] pt-10 sm:pt-[72px]">
              <GlanceRail
                heading="At a glance"
                items={glanceItems}
                summary="Fifteen years, mostly not chosen."
              />
            </div>
          </aside>

          <div className="min-w-0 max-w-[880px]">
        {/* Header. /now convention: mono chapter label, mono date slot, Fraunces
            standfirst. The <h1> is the small label — the standfirst is a
            statement, not a heading.

            The standfirst is 48px on desktop, up from 36px. Against 56px ledger
            figures it would otherwise be outranked by its own apparatus, and it
            must remain the largest single statement above the fold. max-w-[34ch]
            keeps it breaking over two lines rather than running the full plate.

            `dateSlot` is derived in the content file so the header never carries
            a temporal claim that can go stale. "2011 — present" is also the
            first quiet contradiction on the page: a work history that starts
            seven years before the first job. */}
        <header className="pt-10 sm:pt-[72px]">
          <div className="mb-7 flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:mb-8">
            <h1 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink sm:text-[12px]">
              {chapterLabel}
            </h1>
            <span className={`${META} tracking-[0.12em]`}>{dateSlot}</span>
          </div>

          <Reveal
            as="p"
            duration={0.7}
            margin="0px"
            className="max-w-[34ch] text-balance font-serif-display text-[32px] font-medium leading-[1.12] text-ink sm:text-[48px]"
          >
            {standfirst}
          </Reveal>

          <Reveal as="div" duration={0.7} margin="0px" index={1} step={0.1}>
            <RouteDiagram />
          </Reveal>
        </header>

        {/* The plate. Two hairlines frame it and are the only rules on the first
            screen. Target: the whole thing lands around 780–820px tall, so on a
            900px viewport the last row and the closing rule are visible and the
            chapter start is not — a complete plate, and the promise of more.

            DARK MODE: `hairline` dark (40 40 38) against `paper` dark (10 10 11)
            is a 30-point separation and will be close to invisible on most
            screens. These four rules need a lighter dark value — around
            56 56 54 — or the plate loses its frame. */}
        <div className="mt-16 border-t border-hairline sm:mt-[88px]" />
        <div className="py-8 sm:py-10">
          <Ledger />
        </div>
        <div className="border-t border-hairline" />

        {/* At a glance. Twelve entries across fifteen years is a lot to ask
            somebody to start reading on faith, and the ledger above states
            figures without saying what they belong to. This is the only place
            on the page where the whole shape is visible at once. */}
        {/* The static equivalent, below `lg` only — above it the sticky rail
            in the left column is doing this job and doing it better, and
            rendering both would state the same twelve entries twice on one
            screen. Same split /journey makes between JourneyRail and
            JourneySnapshot. */}
        <Reveal
          as="div"
          duration={0.7}
          margin="-60px"
          className="mt-20 sm:mt-28 lg:hidden"
        >
          <GlanceContents
            heading="At a glance"
            note="Fifteen years, mostly not chosen. Jump to any of it."
            items={glanceItems}
          />
        </Reveal>

        <Reveal as="div" duration={0.7} margin="-60px" className="mt-24 sm:mt-40">
          <Entry entry={prologue} isPrologue />
        </Reveal>

        <hr className="my-20 border-0 border-t border-hairline sm:my-[120px]" />

        {/* Not a <ul>. A list implies items of equal kind, and the prologue is
            deliberately not one of them. Entries render in array order and are
            never sorted here. */}
        <section aria-label="Work history">
          {entries.map((entry, index) => {
            const previous = entries[index - 1];
            const gapClass =
              index === 0
                ? ""
                : entry.tier === "plain" || previous?.tier === "plain"
                  ? "mt-20 sm:mt-24"
                  : "mt-24 sm:mt-32";

            return (
              <div key={entry.id}>
                <Reveal as="div" duration={0.6} margin="-12% 0px" className={gapClass}>
                  <Entry entry={entry} />
                </Reveal>

                {/* The single display line on the page, at the chapter's real
                    hinge: nine years in India end here, everything after is
                    London. It repeats a sentence from the entry above — a print
                    convention that survives being done once and cheapens fast if
                    repeated, which is why there is exactly one.

                    aria-hidden because a screen-reader user should not hear the
                    same sentence twice, once as writing and once as display.

                    Given the slightly slower `duration` and larger `y` here
                    (matching Journey's `settleIn`) — the page's other single-
                    beat moments (the ledger's opening, the coda's return)
                    move at the ordinary pace; this one is allowed a fraction
                    longer because it is the chapter's actual turn.

                    This is the most cuttable element in the design. If it reads
                    as decorative, delete this block and the `hinge` export. */}
                {hinge.after === entry.id && (
                  <Reveal
                    as="p"
                    duration={0.8}
                    margin="-15%"
                    aria-hidden="true"
                    className="mt-24 font-serif-display text-[26px] font-normal leading-[1.25] text-ink sm:mt-[120px] sm:text-[40px]"
                  >
                    {hinge.line}
                  </Reveal>
                )}
              </div>
            );
          })}
        </section>

        <hr className="my-20 border-0 border-t border-hairline sm:my-[120px]" />

        {/* The coda returns to the shop. No heading — a heading would make it a
            section, and it is the last paragraph of the chapter. Set at the
            prologue's measure so the page closes at the width it opened at. */}
        <section aria-label="Afterword" className="sm:max-w-[720px]">
          {coda.map((paragraph, index) => (
            <Reveal
              key={index}
              as="p"
              index={index}
              step={0.12}
              margin="-10%"
              className={`${BODY} ${index === 0 ? "" : "mt-[22px] sm:mt-[26px]"}`}
            >
              {paragraph}
            </Reveal>
          ))}
        </section>
          </div>
        </div>
      </div>
    </div>
  );
}