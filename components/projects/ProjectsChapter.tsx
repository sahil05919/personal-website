'use client';

import {
  projectEntries,
  projectRecord,
  type ProjectEntry as ProjectEntryData,
} from "@/data/projectsChapter";
import {
  GlanceContents,
  type GlanceItem,
} from "@/components/global/GlanceContents";
import { GlanceRail } from "@/components/global/GlanceRail";
import { ProjectEntry } from "./ProjectEntry";
import { ProjectMargin } from "./ProjectMargin";
import { Seam } from "./Seam";
import { projectEntriesHi, projectRecordHi, projectsChapterHi } from "@/data/hinglish";
import { useVariant } from "@/hooks/use-reading-mode";

/**
 * Shorten an attribution down to something a contents row can hold.
 *
 * The full strings are written to close an essay, where a whole clause is
 * right: "Applied Research Project, MSc Business Analytics, Bayes Business
 * School, 2025." Dropped into a 64ch contents column they wrapped to a second
 * line and, on the longest title, forced the title itself into a three-line
 * stack with the attribution beside it — verified in a screenshot, not
 * predicted.
 *
 * So: the first clause, which is the part that actually distinguishes one
 * entry from another ("Built for myself", "Group project with USS", "Applied
 * Research Project"), plus the year if the string ends on one. Everything
 * between them is the same school named five times.
 */
function shortAttribution(attribution: string): string {
  const clause = attribution.split(",")[0]?.trim().replace(/\.$/, "") ?? "";
  const year = attribution.match(/(\d{4}(?:[–-][a-z]+)?)\.?\s*$/i)?.[1];

  if (!year) return clause;
  if (clause.includes(year)) return clause;
  return `${clause} · ${year}`;
}

/**
 * The chapter's contents, built from `projectEntries` rather than typed out —
 * so an essay added, removed or reordered cannot leave a dead anchor here.
 *
 * The marker is the case number the margin already uses. That "Built for
 * myself" recurs on two of the five is exactly the signal worth showing
 * somebody deciding where to start.
 */
function buildGlance(list: readonly ProjectEntryData[]): GlanceItem[] {
  return list.map((entry, i) => ({
    id: entry.id,
    marker: `Case ${String(i + 1).padStart(2, "0")}`,
    label: entry.title,
    note: shortAttribution(entry.attribution),
  }));
}

/**
 * Chapter — Projects.
 *
 * Not a portfolio section. Five pieces of writing about problems that became
 * mine somewhere along the way, followed by an index of everything else.
 *
 * ── The ground ──
 * The first page outside components/home/* to run on the Through-Line palette:
 * paper (#F7F6F3), ink, graphite, hairline. Warm paper under Fraunces and
 * Newsreader is most of the difference between "a website with nice fonts"
 * and a printed object.
 *
 * KNOWN CAVEAT: the dark values in globals.css are flagged as an unreviewed
 * extrapolation — the approved mockup was light-only. They render, but they
 * have not been designed. Review before this pattern spreads.
 *
 * ── Layout ──
 * One vertical axis. Prose is centred in the frame rather than flush left:
 * the earlier build left a wide band of dead paper down the right of every
 * screen, which reads as unbalanced rather than generous. Three things are
 * permitted to break that axis, and each break is an event —
 *   · pull-quotes, which widen to 26ch and centre;
 *   · the reconciliation table, which widens to 840px;
 *   · plates, which go full bleed.
 *
 * ── The margin (August 2026) ──
 * The frame widened from 1080px to 1320px — closer to Journey's 1400px, and
 * wide enough that the space either side of the centred column stops being
 * a rounding error and starts being real canvas. The reading column itself
 * did not move or resize; only the frame around it grew. That space is
 * filled asymmetrically and only on the right (`ProjectMargin` — case
 * number, a small per-project motif, one echoed figure on Equinor), never
 * on the left, which stays deliberate whitespace rather than a second rail.
 * This is not a reversal of the note above: that dead-paper problem was
 * empty, unexplained space; this is populated, and only where there's
 * enough width (`xl` and up) for it to read as considered rather than
 * cramped. Mobile and tablet see none of it — the single centred column is
 * still the whole page below `xl`.
 *
 * ── Fast layer / slow layer (August 2026) ──
 * The page works at two speeds by tightening the existing essay model, not
 * by bolting a second UI on top of it: no overview grid, no card layer, no
 * separate detail route. Title and lede are already the fast layer on most
 * entries; the addition here is `evidenceMark` (see data/projectsChapter.ts)
 * — a real sentence already in an essay's own prose, promoted in place and
 * set in cobalt, so a twenty-second reader meets the actual insight without
 * reading the whole piece. Used on two of five entries (USS, the dashboard)
 * where a genuine early "aha" existed to promote; not applied uniformly —
 * Equinor's opening line already does this job unaided, and Netflix and the
 * interstitial are deliberately left as they were.
 *
 * Cobalt here means something different than it does on /journey. There,
 * cobalt marks an emotional turn. Here it marks analytical evidence — a
 * reframed question, a stated reason — never decoration, never applied to a
 * whole paragraph or a whole entry.
 *
 * ── What is deliberately absent ──
 *   · No "Measured Outcome" field. It sat above six unmeasured sentences and
 *     was the only place the site oversold.
 *   · No tech pills, no category tags, no metadata rows.
 *   · No running head, no progress indicator, no parallax, no scroll-linked
 *     typography, no cursor effects. Motion happens once per entry.
 *   · No "next chapter" link. /garden is dead and the terminal link went with
 *     it. The chapter ends where it ends.
 *   · No case study of this website. That moves to a colophon.
 *
 * ── Type roles, matching /media and /now ──
 *   font-mono          (JetBrains Mono) — apparatus: chapter name, folios,
 *                                          attributions, table, index.
 *   font-serif-display (Fraunces)       — Sahil speaking: standfirst, titles,
 *                                          ledes, pull-quotes.
 *   font-reading       (Newsreader)     — read at length: essay body.
 *
 * font-sans and font-serif are both absent, and both are bugs elsewhere in the
 * codebase rather than choices here. `sans` names "Geist Sans" as a literal
 * family while next/font registers a hashed one; no `serif` key exists at all,
 * so font-serif silently resolves to Georgia.
 */
export function ProjectsChapter() {
  /* Hinglish. Same ids and order in both files, so the anchors resolve either
     way. The glance list is derived here rather than at module scope, so the
     rail's five case titles change with the chapter beside them. */
  const entries = useVariant(projectEntries, projectEntriesHi);
  const record = useVariant(projectRecord, projectRecordHi);
  const glanceItems = buildGlance(entries);
  const chapter = useVariant(
    {
      label: "Projects",
      standfirst: "Some refused to leave me alone until I built something.",
      glanceHeading: "In this chapter",
      glanceSummary: "The last one is the one I would read.",
    },
    projectsChapterHi,
  );

  return (
    // overflow-x-clip contains full-bleed plates. `clip`, not `hidden`, so
    // this does not become a scroll container.
    <div className="overflow-x-clip bg-paper">
      {/*
        THE RAIL COLUMN.

        The chapter keeps its own centred axis exactly as designed — the
        <section> below is untouched and still caps at 1320px with the prose
        centred inside it. What is new is a grid wrapped around it holding a
        sticky contents rail on the left at `lg` and up.

        This overrides the note in the header above about the left margin being
        "deliberate whitespace rather than a second rail". That was the right
        call when the alternative was decoration; it is the wrong call when the
        alternative is the only way to reach the fourth essay from the first
        without scrolling back to the top. The whitespace was never the point —
        not filling it with ornament was.
      */}
      <div className="mx-auto max-w-[84rem] lg:px-10">
        <div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-10 xl:grid-cols-[13rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-[112px] pt-[26vh]">
              <GlanceRail
                heading={chapter.glanceHeading}
                items={glanceItems}
                summary={chapter.glanceSummary}
              />
            </div>
          </aside>

          <div className="min-w-0">
      <section
        aria-labelledby="projects-title"
        className="relative mx-auto max-w-[1320px] px-6 pb-32 sm:px-10 xl:px-16"
      >
        {/* ── Opening ──
            The standfirst alone, occupying most of the first screen, with the
            first essay entirely below the fold. The one place worth spending a
            viewport on almost nothing: it makes the reader downshift before a
            word of the chapter has been read.

            min-h with vertical centring rather than a hard 100vh — robust on
            short landscape viewports and against mobile browser chrome. */}
        <header className="relative flex min-h-[82svh] flex-col justify-center py-24">
          <div className="mx-auto w-full max-w-[64ch]">
            <h1
              id="projects-title"
              className="font-mono text-[12px] font-medium tracking-[0.2em] text-graphite"
            >
              {chapter.label}
            </h1>

            {/* /media puts a count in a second slot here ("Eight moments").
                Nothing sits beside this on purpose: a count invites the reader
                to count, and goes stale the moment a sixth entry lands. */}

            {/* Observational, not declarative. It does not announce the
                chapter's thesis — the entries are examples of a behaviour
                rather than evidence for a claim made above them. */}
            <p className="mt-10 max-w-[15ch] text-balance font-serif-display text-[clamp(3rem,9vw,5.25rem)] font-normal leading-[0.98] tracking-[-0.03em] text-ink">
              {chapter.standfirst}
            </p>

            {/* Second-line positioning, the same device /media uses under its
                own standfirst ("Proof of presence, not a portfolio."). Names
                what the five entries below actually are, so a reader knows
                within seconds this isn't a tool list before reading one.
                Sahil's own wording (August 2026), replacing the placeholder
                line proposed during the visual pass. */}
            <p className="mt-6 max-w-[38ch] text-balance font-serif-display italic text-[1.0625rem] leading-[1.6] text-ink sm:text-[1.1875rem]">
              The problems I explored, the thinking behind them, and what I
              found along the way.
            </p>
          </div>

          {/* The one purely decorative mark on the page — five ledger lines
              of falling weight, an abstract stand-in for "a record" before
              the reader has met any of it. Not a chart: no axis, no values,
              nothing that could be mistaken for a claim. xl and up only. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 xl:block"
          >
            <svg viewBox="0 0 120 140" className="h-32 w-28 opacity-70" aria-hidden="true">
              <line x1="10" y1="20" x2="90" y2="20" stroke="rgb(var(--through-line))" strokeWidth="1.25" opacity="0.5" />
              <line x1="10" y1="46" x2="70" y2="46" stroke="rgb(var(--through-line))" strokeWidth="1.25" opacity="0.4" />
              <line x1="10" y1="72" x2="100" y2="72" stroke="rgb(var(--through-line))" strokeWidth="1.25" opacity="0.3" />
              <line x1="10" y1="98" x2="60" y2="98" stroke="rgb(var(--through-line))" strokeWidth="1.25" opacity="0.22" />
              <line x1="10" y1="124" x2="80" y2="124" stroke="rgb(var(--through-line))" strokeWidth="1.25" opacity="0.15" />
              <circle cx="90" cy="20" r="2" fill="rgb(var(--through-line))" opacity="0.55" />
            </svg>
          </div>
        </header>

        {/* ── At a glance ──
            Five essays, and until now the only way to find out what they were
            about was to read them in order. This sits on the same centred axis
            as the prose, directly under the standfirst, so it is the first
            thing after the opening rather than a sidebar competing with it —
            the chapter's own table of contents, at the moment a reader is
            deciding whether to start.

            It is deliberately NOT the "overview grid" the file header rules
            out further up: no cards, no thumbnails, no summaries. Five ruled
            rows of title and attribution, which is apparatus, not a second
            presentation of the same work. */}
        {/* Static equivalent, below `lg` only — above it the sticky rail is
            doing this job and rendering both would list the five essays twice
            on one screen. */}
        <div className="mx-auto w-full max-w-[64ch] pb-8 lg:hidden">
          <GlanceContents
            heading={chapter.glanceHeading}
            note="Five, and the last one is the one I would read."
            items={glanceItems}
            // These titles run long enough that some rows fit their
            // attribution inline and some don't. Below, always.
            notesBelow
          />
        </div>

        {/* ── The essays ──
            Seams are per-entry rather than a uniform space-y: the interstitial
            needs noticeably more air around it than the essays need between
            them, and that difference is the pacing mechanism. `Seam` now
            draws in on scroll rather than simply being there — see Seam.tsx.

            Each entry sits in a `relative` wrapper so `ProjectMargin` can
            anchor to the entry's own right edge rather than the page's. */}
        {entries.map((entry, index) => (
          <div key={entry.id}>
            {index > 0 && (
              <Seam
                wide={entry.rhythm.seam === "wide"}
                variant={entry.id === "did-both-jobs" ? "evidence" : "hairline"}
              />
            )}
            <div className={["relative", index === 0 ? "pt-8" : ""].join(" ")}>
              <ProjectEntry entry={entry} />
              <ProjectMargin id={entry.id} />
            </div>
          </div>
        ))}

        {/* ── Back matter ──
            Most of a screen of paper after Equinor's last sentence. The
            chapter ends on "the right call"; the index is a separate object
            and should feel like one. Without this the page's final words are
            somebody else's coursework title. */}
        <div aria-hidden className="h-[55svh]" />

        <section
          aria-labelledby="projects-record"
          className="mx-auto max-w-[840px] border-t border-hairline pt-10"
        >
          <h2
            id="projects-record"
            className="font-mono text-[11px] font-medium tracking-[0.2em] text-graphite"
          >
            A record
          </h2>

          {/* One line, so the index reads as "more of the same kind of
              work" rather than an unexplained list appearing after the
              chapter has already ended. */}
          <p className="mt-3 max-w-[48ch] font-serif-display italic text-[15px] leading-[1.6] text-graphite">
            The rest of it — briefer, and without the essays&rsquo; commentary.
          </p>

          {/* Set as a book's index: title flush left, hairline leader, context
              and year flush right. One line each, no descriptions. It does not
              ask to be read — it exists so the breadth is on the record
              without diluting the chapter.

              The leader collapses on narrow viewports, where the row wraps to
              two lines and a rule between them would be nonsense. */}
          <ul className="mt-8">
            {record.map((item) => {
              const row = (
                <>
                  <span className="text-ink transition-colors duration-200 group-hover:text-through-line">
                    {item.title}
                  </span>
                  <span
                    aria-hidden
                    className="hidden min-w-6 flex-1 translate-y-[-0.3em] border-b border-hairline sm:block"
                  />
                  <span className="whitespace-nowrap text-graphite">
                    {item.context}
                    <span className="ml-5 tabular-nums">{item.year}</span>
                  </span>
                </>
              );

              return (
                <li
                  key={item.title}
                  className="border-b border-hairline/50 last:border-b-0"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-1 py-4 font-mono text-[12px] leading-[1.7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line sm:flex-row sm:items-baseline sm:gap-4"
                    >
                      {row}
                    </a>
                  ) : (
                    <div className="flex flex-col gap-1 py-4 font-mono text-[12px] leading-[1.7] sm:flex-row sm:items-baseline sm:gap-4">
                      {row}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Stated once, quietly. These are LinkedIn profile overlays: they
              may ask for a login, and if LinkedIn changes its URL scheme every
              link here breaks at once. Saying so is more honest than letting a
              reader hit a wall — and it is the platform dependency worth
              designing out later by hosting the artefacts on this domain. */}
          <p className="mt-8 font-mono text-[11px] leading-[1.7] tracking-[0.06em] text-graphite">
            Linked items open on LinkedIn.
          </p>
        </section>
      </section>
          </div>
        </div>
      </div>
    </div>
  );
}