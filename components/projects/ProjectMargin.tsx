/**
 * The right margin.
 *
 * Desktop only (`xl` and up — this needs real width to avoid crowding the
 * reading column, more than Journey needed for its narrower right rail).
 * Static: no scroll-triggered reveal of its own. It's meant to read as
 * "always there, quietly," not as another thing arriving as you scroll —
 * the essay's own single reveal is the page's motion, this just fills space
 * that used to be empty.
 *
 * Three parts, not all present on every entry:
 *   · a case number (01–07) — apparatus, not decoration; the equivalent of
 *     Journey's era numeral, but counting case files instead of years.
 *   · a small abstract motif, tied to that entry's actual content the same
 *     way Journey's ChapterArtifact is. Withheld on the interstitial on
 *     purpose — see CASE below — so its visual quiet matches its narrow/
 *     centred prose treatment rather than fighting it.
 *   · on Equinor only, a one-line annotation. Not a new claim: it repeats
 *     the residual figure that's already sitting in the approved table,
 *     as a quiet echo rather than a second source of truth.
 *
 * Colours wrapped in rgb() — the CSS custom properties store bare channel
 * values, not a valid SVG paint on their own (same caveat as Journey).
 */

const CASE: Record<string, { number: string; motif?: "exits" | "dashboard" | "reversal" | "scatter" | "residual" | "ladder" | "days" | "loop" }> = {
  "other-door": { number: "01", motif: "exits" },
  "ten-one-day-absences": { number: "02" }, // no motif yet — added October 2026
  "shape-of-leaving": { number: "03" }, // no motif yet — added October 2026
  "place-to-stand": { number: "04", motif: "dashboard" },
  // October 2026 — the three tools built for himself, kept beside "A place to
  // stand" because the first of them is its sequel.
  "what-i-can-reach": { number: "05", motif: "ladder" },
  "about-this-much-a-day": { number: "06", motif: "days" },
  "feel-like-home": { number: "07", motif: "loop" },
  "wrong-first-question": { number: "08", motif: "reversal" },
  "looking-properly": { number: "09", motif: "scatter" },
  "understanding-behaviour": { number: "10" }, // no motif — stays as quiet as the essay itself
  "did-both-jobs": { number: "11", motif: "residual" },
};

function Motif({ kind }: { kind: NonNullable<(typeof CASE)[string]["motif"]> }) {
  const line = "rgb(var(--through-line))";

  switch (kind) {
    case "exits":
      // A row of people on one line; two have stepped off it — "the way
      // out". Abstract on purpose: no count, nothing that reads as a rate.
      return (
        <svg viewBox="0 0 56 36" className="h-8 w-14" aria-hidden="true">
          <line x1="4" y1="14" x2="52" y2="14" stroke={line} strokeWidth="1" opacity="0.3" />
          <circle cx="8" cy="14" r="2" fill={line} opacity="0.55" />
          <circle cx="18" cy="14" r="2" fill={line} opacity="0.55" />
          <circle cx="28" cy="26" r="2" fill={line} opacity="0.85" />
          <circle cx="38" cy="14" r="2" fill={line} opacity="0.55" />
          <circle cx="48" cy="28" r="2" fill={line} opacity="0.85" />
        </svg>
      );
    case "dashboard":
      // Ledger rows of falling weight, one current-position mark — "a place
      // to stand": not a chart, a settled view.
      return (
        <svg viewBox="0 0 56 36" className="h-8 w-14" aria-hidden="true">
          <line x1="4" y1="8" x2="52" y2="8" stroke={line} strokeWidth="1.25" opacity="0.6" />
          <line x1="4" y1="18" x2="40" y2="18" stroke={line} strokeWidth="1.25" opacity="0.4" />
          <line x1="4" y1="28" x2="46" y2="28" stroke={line} strokeWidth="1.25" opacity="0.25" />
          <circle cx="52" cy="8" r="2" fill={line} opacity="0.7" />
        </svg>
      );
    case "ladder":
      // Money by how fast it can move: one long bar that is yours now, then
      // shorter, fainter ones further down — "what I can actually reach".
      return (
        <svg viewBox="0 0 56 36" className="h-8 w-14" aria-hidden="true">
          <line x1="4" y1="7" x2="34" y2="7" stroke={line} strokeWidth="2" opacity="0.9" />
          <line x1="4" y1="15" x2="44" y2="15" stroke={line} strokeWidth="1.25" opacity="0.55" />
          <line x1="4" y1="23" x2="50" y2="23" stroke={line} strokeWidth="1.25" opacity="0.35" />
          <line x1="4" y1="31" x2="40" y2="31" stroke={line} strokeWidth="1.25" opacity="0.2" />
        </svg>
      );
    case "days":
      // A month as a row of days, the spent ones filled — "about this much a
      // day". No count that could be read as a figure.
      return (
        <svg viewBox="0 0 56 36" className="h-8 w-14" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={4 + i * 5} y="14" width="3" height="8" fill={line} opacity={i < 6 ? 0.8 : 0.2} />
          ))}
        </svg>
      );
    case "loop":
      // Capture, sort, remind, nudge: one loop with a single point moving on
      // it — the app that leaves the doing to you.
      return (
        <svg viewBox="0 0 56 36" className="h-8 w-14" aria-hidden="true">
          <circle cx="28" cy="18" r="11" fill="none" stroke={line} strokeWidth="1" opacity="0.35" />
          <circle cx="39" cy="18" r="2.25" fill={line} opacity="0.9" />
          <circle cx="28" cy="7" r="1.5" fill={line} opacity="0.45" />
          <circle cx="17" cy="18" r="1.5" fill={line} opacity="0.45" />
          <circle cx="28" cy="29" r="1.5" fill={line} opacity="0.45" />
        </svg>
      );
    case "reversal":
      // A line that turns back on itself — "we turned it round."
      return (
        <svg viewBox="0 0 56 40" className="h-8 w-14" aria-hidden="true">
          <path
            d="M12 8 C 12 24, 12 32, 28 32 L 42 32"
            stroke={line}
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <path d="M36 26 L42 32 L36 38" stroke={line} strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="12" cy="8" r="2" fill={line} opacity="0.55" />
        </svg>
      );
    case "scatter":
      // Points with no line drawn through them, deliberately — "no finding."
      return (
        <svg viewBox="0 0 56 32" className="h-7 w-14" aria-hidden="true">
          <circle cx="6" cy="22" r="1.6" fill={line} opacity="0.45" />
          <circle cx="18" cy="8" r="1.6" fill={line} opacity="0.45" />
          <circle cx="26" cy="24" r="1.6" fill={line} opacity="0.45" />
          <circle cx="38" cy="14" r="1.6" fill={line} opacity="0.45" />
          <circle cx="48" cy="20" r="1.6" fill={line} opacity="0.45" />
        </svg>
      );
    case "residual":
      // A steady line, then a late departure from where a dashed projection
      // says it "should" have gone — the unreconciled year, drawn once and
      // abstractly rather than restated as a second chart.
      return (
        <svg viewBox="0 0 56 36" className="h-8 w-14" aria-hidden="true">
          <path
            d="M4 26 L18 24 L32 22 L44 8"
            stroke={line}
            strokeWidth="1.5"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M32 22 L48 20"
            stroke={line}
            strokeWidth="1"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.3"
          />
          <circle cx="44" cy="8" r="2.5" fill={line} />
        </svg>
      );
    default:
      return null;
  }
}

export function ProjectMargin({ id }: { id: string }) {
  const entry = CASE[id];
  if (!entry) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-1 hidden xl:flex xl:w-40 xl:flex-col xl:items-end"
    >
      <p className="font-mono text-[11px] tracking-[0.1em] text-graphite/40">
        {entry.number}
      </p>
      {entry.motif && (
        <div className="mt-3">
          <Motif kind={entry.motif} />
        </div>
      )}
      {id === "did-both-jobs" && (
        <p className="mt-3 text-right font-mono text-[10px] leading-[1.6] tracking-[0.04em] text-through-line/70">
          +1.5 · 2024
          <br />
          Unreconciled
        </p>
      )}
    </div>
  );
}
