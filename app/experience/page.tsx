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
      {ledger.map((row) => (
        <div
          key={row.figure}
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
        </div>
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
      {entry.body.map((paragraph, index) => (
        <div key={index}>
          <p
            className={`${index === 0 ? LEDE : BODY} ${
              index === 0 ? "mt-7 sm:mt-8" : "mt-[22px] sm:mt-[26px]"
            }`}
          >
            {paragraph}
          </p>

          {/* The photograph, if it exists. Breaks to the full 880px plate —
              wider than its own prose and the only element reaching the
              container's right edge, which is what makes it an event.
              `sizes` is expressed in terms of rendered width; a hardcoded pixel
              value was a live bug on /media. */}
          {entry.image && entry.imageAfterParagraph === index && (
            <Image
              src={entry.image.src}
              alt={entry.image.alt}
              width={entry.image.width}
              height={entry.image.height}
              sizes="(max-width: 640px) 100vw, 880px"
              className="my-10 h-auto w-full border border-hairline bg-hairline sm:my-14 sm:max-w-[880px]"
            />
          )}
        </div>
      ))}

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

export default function ExperiencePage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-[880px] px-6 pb-[100px] sm:pb-40">
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

          <p className="max-w-[34ch] text-balance font-serif-display text-[32px] font-medium leading-[1.12] text-ink sm:text-[48px]">
            {standfirst}
          </p>
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

        <div className="mt-24 sm:mt-40">
          <Entry entry={prologue} isPrologue />
        </div>

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
                <div className={gapClass}>
                  <Entry entry={entry} />
                </div>

                {/* The single display line on the page, at the chapter's real
                    hinge: nine years in India end here, everything after is
                    London. It repeats a sentence from the entry above — a print
                    convention that survives being done once and cheapens fast if
                    repeated, which is why there is exactly one.

                    aria-hidden because a screen-reader user should not hear the
                    same sentence twice, once as writing and once as display.

                    This is the most cuttable element in the design. If it reads
                    as decorative, delete this block and the `hinge` export. */}
                {hinge.after === entry.id && (
                  <p
                    aria-hidden="true"
                    className="mt-24 font-serif-display text-[26px] font-normal leading-[1.25] text-ink sm:mt-[120px] sm:text-[40px]"
                  >
                    {hinge.line}
                  </p>
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
            <p
              key={index}
              className={`${BODY} ${index === 0 ? "" : "mt-[22px] sm:mt-[26px]"}`}
            >
              {paragraph}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
}