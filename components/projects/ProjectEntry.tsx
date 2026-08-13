"use client";

import Image from "next/image";
import type {
  ProjectEntry as ProjectEntryType,
  ProjectImage,
  ProjectTable,
} from "@/data/projectsChapter";
import { useRevealOnView } from "@/hooks/use-reveal-on-view";

/**
 * Evidence mark.
 *
 * Journey's cobalt marks an emotional turn; this marks a moment of
 * analytical reasoning — a reframed question, a stated reason — already
 * sitting in the essay's own prose. Never new copy: see `EvidenceMark` in
 * `data/projectsChapter.ts` for exactly which sentence moved and why.
 *
 * Kept deliberately unlike a pull-quote: left-aligned inside the reading
 * column rather than centred and widened, so it reads as something the
 * reader is walking past on the way through the essay, not a formal break
 * in it. The left rule is the one piece of "furniture" on the page that
 * isn't a hairline — cobalt here, doing real signalling work, not
 * decoration for its own sake.
 */
function EvidenceMarkBlock({ lines }: { lines: string[] }) {
  return (
    <div className="my-10 border-l-2 border-through-line py-0.5 pl-5 sm:my-12 sm:pl-6">
      {lines.map((line, i) => (
        <p
          key={i}
          className="font-serif-display text-[clamp(1.125rem,2.4vw,1.375rem)] font-normal leading-[1.35] tracking-[-0.01em] text-through-line"
        >
          {line}
        </p>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Column
 *
 * The prose measure is CENTRED inside the frame, not flush left. The previous
 * build left-aligned a 62ch column inside an 880px frame, which left roughly
 * 260px of dead paper down the right-hand side of every screen — the page
 * looked unbalanced rather than generous.
 *
 * Everything now sits on one vertical axis: titles, prose, attributions.
 * Pull-quotes and the table break symmetrically outward from that axis, so a
 * break reads as an event rather than as a misalignment.
 *
 * Measures in `ch` so the column tracks the reading face.
 * ───────────────────────────────────────────────────────────────────────── */
const MEASURE = {
  reading: "64ch",
  narrow: "46ch",
} as const;

/** Pull-quotes and the table exceed the prose measure. Wide enough to register
 *  as a break, narrow enough to stay readable. */
const QUOTE_MEASURE = "26ch";
const TABLE_MAX = "840px";

/**
 * Full-bleed escape from a centred container.
 *
 * `width: 100vw` overshoots by the scrollbar width on desktop Windows/Linux.
 * The container in ProjectsChapter carries `overflow-x: clip` — clip rather
 * than hidden, so it does not become a scroll container.
 */
const bleed: React.CSSProperties = {
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
};

function imageSizes(image: ProjectImage): string {
  if (image.treatment === "plate") return "100vw";
  const fraction = (image.widthPercent ?? 100) / 100;
  return `(min-width: 760px) ${Math.round(660 * fraction)}px, 90vw`;
}

/* ───────────────────────────── figures ───────────────────────────────── */

function Plate({ image }: { image: ProjectImage }) {
  return (
    <figure className="group my-24 sm:my-32" style={bleed}>
      <div
        className="relative w-full overflow-hidden bg-hairline/40"
        style={{ aspectRatio: image.aspectRatio }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={imageSizes(image)}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.025]"
        />
      </div>
      {image.caption && (
        <figcaption className="mx-auto mt-5 max-w-[64ch] px-6 font-mono text-[11px] leading-[1.6] tracking-[0.06em] text-graphite">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Inset({ image }: { image: ProjectImage }) {
  return (
    <figure
      className="group my-14"
      style={{ width: `${image.widthPercent ?? 100}%`, maxWidth: "100%" }}
    >
      <div
        className="relative w-full overflow-hidden bg-hairline/40"
        style={{ aspectRatio: image.aspectRatio }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={imageSizes(image)}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.035]"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-3 font-mono text-[11px] leading-[1.6] tracking-[0.06em] text-graphite">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * The reconciliation chart — a small paired-point plot, sitting above the
 * table it visualises rather than replacing it.
 *
 * FORM. Four years, two figures each (reported vs. reconstructed) and one
 * year where they disagree by a wide margin. A bar chart from a zero
 * baseline would waste most of its height on the shared ~11–12.5 range that
 * every year sits in; what actually matters is the *gap* between the two
 * figures in a given year, which a bar can't show directly. A dumbbell
 * (two points, one connecting stroke, no baseline) plots that gap as a
 * literal distance instead of asking the reader to subtract two bar heights
 * — and because nothing here reads off a baseline, an un-truncated,
 * non-zero y-domain is legitimate rather than the usual bar-chart sin.
 *
 * COLOUR. Two series, assigned by identity and never re-cycled: graphite
 * for the reported figure (what was filed), the site's accent for the
 * reconstructed one (what the analysis rebuilt). The single row that
 * doesn't reconcile is marked by a wider stroke and a faint ring around
 * both points — a difference in weight, not a third hue, so the chart
 * doesn't smuggle in a colour the rest of the site doesn't use for "wrong."
 *
 * LABELS. A two-item inline legend (swatch + mono word, not coloured text —
 * the mark carries identity, the label stays in ink) stands in for axis
 * titles; year labels sit under each pair; the one residual worth reading
 * on the chart itself — the 2024 gap — is set beside it in mono. The other
 * three residuals are already in the table a few lines below and aren't
 * repeated here.
 *
 * DATA. Parsed from `table.rows` at render time rather than re-entered, so
 * the chart cannot drift from the table it sits above.
 */
function ReconciliationChart({ table }: { table: ProjectTable }) {
  const points = table.rows.map((row, i) => ({
    year: row[0],
    reported: parseFloat(row[1]),
    reconstructed: parseFloat(row[2]),
    residual: row[3],
    emphasised: i === table.emphasisRow,
  }));

  const values = points.flatMap((p) => [p.reported, p.reconstructed]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.3 || 1;
  const domainMin = min - pad;
  const domainMax = max + pad;

  const W = 760;
  const H = 220;
  const xPad = 64;
  const yTop = 26;
  const yBottom = 168;
  const usableWidth = W - xPad * 2;

  const x = (i: number) =>
    points.length > 1 ? xPad + (usableWidth * i) / (points.length - 1) : W / 2;
  const y = (v: number) =>
    yBottom - ((v - domainMin) / (domainMax - domainMin)) * (yBottom - yTop);

  const reportedColor = 'rgb(var(--graphite))';
  const reconstructedColor = 'rgb(var(--through-line))';

  return (
    <div className="mx-auto w-full" style={{ maxWidth: TABLE_MAX }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Reported versus reconstructed emissions by year, showing a wide gap in 2024 that the analysis could not fully explain."
      >
        {points.map((p, i) => {
          const cx = x(i);
          const yReported = y(p.reported);
          const yReconstructed = y(p.reconstructed);
          return (
            <g key={p.year}>
              {p.emphasised && (
                <>
                  <circle cx={cx} cy={yReported} r={7} fill="none" stroke={reportedColor} strokeOpacity={0.25} />
                  <circle cx={cx} cy={yReconstructed} r={7} fill="none" stroke={reconstructedColor} strokeOpacity={0.3} />
                </>
              )}
              <line
                x1={cx}
                y1={yReported}
                x2={cx}
                y2={yReconstructed}
                stroke={reconstructedColor}
                strokeOpacity={p.emphasised ? 0.55 : 0.28}
                strokeWidth={p.emphasised ? 1.75 : 1}
                strokeDasharray={p.emphasised ? undefined : '2 3'}
              />
              <circle cx={cx} cy={yReported} r={3.25} fill={reportedColor} />
              <circle cx={cx} cy={yReconstructed} r={3.25} fill={reconstructedColor} />

              {p.emphasised && (
                <text
                  x={cx + 12}
                  y={(yReported + yReconstructed) / 2 + 4}
                  className="font-mono"
                  fontSize="11"
                  fill="rgb(var(--ink))"
                >
                  {p.residual}
                </text>
              )}

              <text
                x={cx}
                y={H - 8}
                textAnchor="middle"
                className="font-mono"
                fontSize="11"
                fill="rgb(var(--graphite))"
              >
                {p.year}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Inline legend — two swatches, not a boxed key. */}
      <div className="mt-1 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.08em] text-graphite">
        <span className="flex items-center gap-2">
          <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: reportedColor }} />
          {table.columns[1]}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: reconstructedColor }} />
          {table.columns[2]}
        </span>
      </div>
    </div>
  );
}

/**
 * The reconciliation table.
 *
 * Set rather than screenshotted, and allowed to exceed the prose measure —
 * the one moment in the chapter permitted to look like data, on the essay
 * that earned it. Mono throughout, hairline rules, no fills and no accent
 * colour. The emphasised row is distinguished by ink weight alone; a
 * highlight would turn the chapter's climax into a callout. `tabular-nums`
 * so columns align on the decimal, which is the whole reason the table is
 * legible at a glance.
 */
function ReconciliationTable({ table }: { table: ProjectTable }) {
  return (
    <div className="mx-auto my-20 w-full sm:my-24" style={{ maxWidth: TABLE_MAX }}>
      {/* Horizontal scroll on narrow viewports rather than reflow: five mono
          columns cannot stack without destroying the comparison. */}
      <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:overflow-x-visible sm:px-0">
        <table className="w-full min-w-[540px] border-collapse font-mono text-[13px] tabular-nums">
          <thead>
            <tr className="border-b border-hairline">
              {table.columns.map((column, i) => (
                <th
                  key={i}
                  scope="col"
                  className={[
                    "pb-3 text-left align-bottom text-[11px] font-normal uppercase tracking-[0.14em] text-graphite",
                    i === 0 ? "pr-6" : "px-6",
                    i === table.columns.length - 1 ? "pr-0" : "",
                  ].join(" ")}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => {
              const emphasised = r === table.emphasisRow;
              return (
                <tr key={r} className="border-b border-hairline/60">
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={[
                        "py-4 align-top",
                        c === 0 ? "pr-6" : "px-6",
                        c === row.length - 1 ? "pr-0" : "",
                        emphasised ? "text-ink" : "text-graphite",
                      ].join(" ")}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {table.note && (
        <p className="mt-4 font-mono text-[11px] tracking-[0.06em] text-graphite">
          {table.note}
        </p>
      )}
    </div>
  );
}

/* ───────────────────────────── entry ─────────────────────────────────── */

export function ProjectEntry({ entry }: { entry: ProjectEntryType }) {
  const { ref, isVisible } = useRevealOnView<HTMLElement>();
  const {
    title,
    body,
    attribution,
    rhythm,
    image,
    table,
    mediaAfterParagraph,
    evidenceMark,
  } = entry;

  const measure = MEASURE[rhythm.measure];
  const isolate = new Set(rhythm.isolate ?? []);
  const mediaIndex =
    mediaAfterParagraph !== undefined ? mediaAfterParagraph : body.length - 1;
  const evidenceMarkIndex = evidenceMark?.insertAfter;

  const figure = image ? (
    image.treatment === "plate" ? (
      <Plate image={image} />
    ) : (
      <Inset image={image} />
    )
  ) : table ? (
    <>
      <ReconciliationChart table={table} />
      <ReconciliationTable table={table} />
    </>
  ) : null;

  /** Everything that is not a break sits in this column, centred on the
   *  page's single vertical axis. */
  const Column = ({ children }: { children: React.ReactNode }) => (
    <div className="mx-auto w-full" style={{ maxWidth: measure }}>
      {children}
    </div>
  );

  return (
    <article
      ref={ref}
      aria-labelledby={`project-${entry.id}`}
      className={[
        // The chapter's only motion. No parallax, no scroll-linked type, no
        // progress indicator, no reading-position mechanics.
        "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        rhythm.centered ? "text-center" : "",
      ].join(" ")}
    >
      <Column>
        {/* Titles are the page's fixed landmarks: one size on every entry,
            large enough to read as a movement beginning rather than as
            slightly bigger text. The essays run from roughly 150 to 500 words
            and that difference does the ranking on its own — a size hierarchy
            on top would announce which ones matter, which is the reader's
            job. No numbering, no category label, no year badge. */}
        <h2
          id={`project-${entry.id}`}
          className="text-balance font-serif-display text-[clamp(2.5rem,6.5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.025em] text-ink"
          style={{ maxWidth: rhythm.centered ? undefined : "16ch" }}
        >
          {title}
        </h2>
      </Column>

      <div className="mt-10 sm:mt-12">
        {body.map((paragraph, i) => {
          const isLede = i === 0 && rhythm.lede;
          const isQuote = isolate.has(i);

          if (isQuote) {
            // Display pull-quote. Fraunces, centred, breaking wider than the
            // prose measure with large air either side. Reserved for lines
            // already acting as section breaks — three in the whole chapter,
            // and any more would make it a device rather than a response.
            return (
              <div key={i}>
                <p
                  className="mx-auto my-24 text-balance text-center font-serif-display text-[clamp(1.5rem,3.4vw,2.125rem)] font-normal leading-[1.28] tracking-[-0.015em] text-ink sm:my-32"
                  style={{ maxWidth: QUOTE_MEASURE }}
                >
                  {paragraph}
                </p>
                {i === mediaIndex && figure}
                {i === evidenceMarkIndex && evidenceMark && (
                  <Column>
                    <EvidenceMarkBlock lines={evidenceMark.lines} />
                  </Column>
                )}
              </div>
            );
          }

          return (
            <div key={i}>
              <Column>
                <p
                  className={[
                    isLede
                      ? // Standfirst: Fraunces, not Newsreader. Gives a real
                        // three-step hierarchy (title → standfirst → body)
                        // instead of two sizes of the same face.
                        "font-serif-display text-[clamp(1.375rem,2.6vw,1.625rem)] font-normal leading-[1.4] tracking-[-0.01em] text-ink"
                      : "font-reading text-[1.1875rem] leading-[1.8] text-ink",
                    i > 0 ? "mt-7" : "",
                  ].join(" ")}
                >
                  {paragraph}
                </p>
              </Column>
              {i === mediaIndex && figure}
              {i === evidenceMarkIndex && evidenceMark && (
                <Column>
                  <EvidenceMarkBlock lines={evidenceMark.lines} />
                </Column>
              )}
            </div>
          );
        })}
      </div>

      {/* Attribution at the foot, not under the title. A credit line, not a
          header. Mono so it reads as apparatus. */}
      <Column>
        <p className="mt-16 font-mono text-[11px] leading-[1.7] tracking-[0.1em] text-graphite">
          {attribution}
        </p>
      </Column>
    </article>
  );
}