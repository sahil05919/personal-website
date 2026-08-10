import type { ReactNode } from 'react';

import { gutter, shell } from './rhythm';

/**
 * Column — the page's structural unit, and the thing that draws the spine.
 *
 * The through-line is not five decorations that happen to line up. Each
 * section draws the segment of it that crosses that section, top edge to
 * bottom edge, in the reserved gutter. Because the sections are contiguous —
 * padding, never margin — the segments butt together and read as one
 * uninterrupted stroke from the figure's baseline to the colophon.
 *
 * That is why no section on this page may use vertical margin. A margin
 * between two sections would put a visible gap in the line.
 *
 * Variants:
 *   origin    the segment directly below Fig. 01. Inherits the figure's cobalt
 *             at the top and falls to hairline, so the vertical line reads as
 *             the resolved horizontal line turning the corner rather than as a
 *             second, unrelated rule.
 *   line      the ordinary segment.
 *   none      no spine. Used above the figure, where the line does not exist
 *             yet.
 *
 * There is no `terminal` variant. The line's ending is a turn from vertical
 * back to horizontal, which needs two rules positioned against each other, so
 * Colophon composes its own spine directly rather than asking for a variant
 * only one caller would ever use.
 */

type SpineVariant = 'origin' | 'line' | 'none';

interface ColumnProps {
  children: ReactNode;
  spine?: SpineVariant;
  /** Extra classes on the inner (gutter) element. */
  className?: string;
}

export default function Column({
  children,
  spine = 'line',
  className = '',
}: ColumnProps) {
  return (
    <div className={shell}>
      <div className={`${gutter} ${className}`}>
        {spine !== 'none' && (
          <span aria-hidden="true" className="pointer-events-none">
            {/* The stroke. Hairline weight throughout: this is architecture,
                not emphasis. The only cobalt on the page is the figure and the
                first inch of its descent. */}
            <span className="absolute left-0 top-0 bottom-0 w-px bg-hairline" />

            {spine === 'origin' && (
              <span className="absolute left-0 top-0 h-24 w-px bg-gradient-to-b from-through-line to-transparent" />
            )}
          </span>
        )}

        {children}
      </div>
    </div>
  );
}
