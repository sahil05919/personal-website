"use client";

import Image from "next/image";
import type {
  ProjectEntry as ProjectEntryType,
  ProjectImage,
  ProjectTable,
} from "@/data/projectsChapter";
import { useRevealOnView } from "@/hooks/use-reveal-on-view";

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
    <figure className="my-24 sm:my-32" style={bleed}>
      <div
        className="relative w-full bg-hairline/40"
        style={{ aspectRatio: image.aspectRatio }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={imageSizes(image)}
          className="object-cover"
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
      className="my-14"
      style={{ width: `${image.widthPercent ?? 100}%`, maxWidth: "100%" }}
    >
      <div
        className="relative w-full bg-hairline/40"
        style={{ aspectRatio: image.aspectRatio }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={imageSizes(image)}
          className="object-cover"
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
  const { title, body, attribution, rhythm, image, table, mediaAfterParagraph } =
    entry;

  const measure = MEASURE[rhythm.measure];
  const isolate = new Set(rhythm.isolate ?? []);
  const mediaIndex =
    mediaAfterParagraph !== undefined ? mediaAfterParagraph : body.length - 1;

  const figure = image ? (
    image.treatment === "plate" ? (
      <Plate image={image} />
    ) : (
      <Inset image={image} />
    )
  ) : table ? (
    <ReconciliationTable table={table} />
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
        "transition-all duration-[900ms] ease-out motion-reduce:transition-none",
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