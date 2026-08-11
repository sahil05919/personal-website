import type { ReactNode } from 'react';

/**
 * THE LEAF.
 *
 * Every other page on this site is bound into the book. Now is tipped in — a
 * sheet printed separately, dated, and replaceable without touching the
 * binding. This component is that sheet's ruling.
 *
 * One structural device, used everywhere: a narrow margin column carrying
 * time (dates, states, counters, headings) and a main column carrying the
 * season. A hairline runs between them.
 *
 * The hairline is per-section rather than one absolute element spanning the
 * page, because the quiet centre must be able to break it. A page whose rule
 * runs unbroken through its own silence has not really stopped.
 *
 * On mobile the margin cannot sit beside the prose, so it rotates into the
 * flow: notes hang above the text they annotate and the hairline moves to the
 * left edge of the column. The margin becomes an interruption rather than a
 * companion — arguably the better reading of a manuscript.
 */

/**
 * Change one, change both: the hairline is positioned against this template.
 *
 * The main column is 46rem, not the 36rem reading measure. Prose caps itself
 * at 36rem; display moments — photographs, the couplet, the questions, Next up
 * — are supposed to BREAK the measure, and a 36rem column silently clamped
 * every one of them. The column is the widest thing allowed on the leaf, not
 * the reading width.
 */
const GRID =
  'lg:grid lg:grid-cols-[9.5rem_minmax(0,46rem)] lg:gap-x-12 lg:items-start';

/** 9.5rem margin column + half of the 3rem gap. */
const RULE_OFFSET = 'lg:left-[11rem]';

interface LeafProps {
  children: ReactNode;
  /** The quiet centre passes false. Nothing else should. */
  ruled?: boolean;
  className?: string;
}

export function Leaf({ children, ruled = true, className = '' }: LeafProps) {
  return (
    <section className={`relative ${className}`}>
      {ruled && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 h-full w-px bg-hairline ${RULE_OFFSET}`}
        />
      )}
      <div className="pl-5 lg:pl-0">{children}</div>
    </section>
  );
}

interface LeafRowProps {
  /** Sits in the margin: mono, right-aligned on desktop, hanging on mobile. */
  note?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * One row of the leaf. The template is repeated per row rather than inherited
 * via `display: contents`, so vertical spacing behaves identically at every
 * breakpoint instead of silently collapsing above `lg`.
 */
export function LeafRow({ note, children, className = '' }: LeafRowProps) {
  return (
    <div className={`${GRID} ${className}`}>
      <div className="mb-3 lg:mb-0 lg:pt-[0.4rem] lg:text-right">{note}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/**
 * The voice of the margin. If it is mono, it is about *when*.
 * Lowercase and hanging slightly out of alignment — the hand is expressed by
 * placement, not by a font pretending to be a pen.
 */
export function MarginNote({
  children,
  tone = 'quiet',
}: {
  children: ReactNode;
  tone?: 'quiet' | 'change' | 'heading';
}) {
  const tones = {
    quiet: 'text-graphite',
    change: 'text-through-line',
    heading: 'text-ink',
  } as const;

  return (
    <span
      className={`block font-mono text-[0.625rem] leading-[1.6] tracking-[0.18em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Section headings live in the margin, not as banners over the prose. */
export function LeafHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="block font-mono text-[0.625rem] uppercase leading-[1.6] tracking-[0.24em] text-ink">
      {children}
    </h2>
  );
}
