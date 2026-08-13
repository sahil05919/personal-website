/**
 * PageMark — eight marks, one per destination.
 *
 * WHAT THIS IS FOR
 *
 * Home's Contents is the one place on the site that introduces the whole
 * record, and it was eight rows of identical apparatus: a station dot, a
 * title, a borrowed line. Typographically correct and visually anonymous —
 * nothing distinguished /media from /questions except the words, and a table
 * of contents is exactly where a reader is deciding where to go.
 *
 * So each row now carries a mark. The rule that makes these worth having,
 * and the rule that keeps them from being clip-art:
 *
 *   EVERY MARK IS A MINIATURE OF THAT PAGE'S OWN VISUAL MOTIF.
 *
 * Not an icon *about* the page — a scale model of something the page
 * actually does. /experience's mark is its two-lane route with the crossing.
 * /projects' is the reconciliation chart's dumbbell. /contact's is Imprint's
 * ruled letterhead. /question's is one full rule and six short ones, which is
 * literally the state of that page: one question answered, six not.
 *
 * The payoff is on arrival rather than here. You read eight distinct marks on
 * the contents page, and then you meet each one full size on the page it came
 * from. The contents becomes a legend for the site instead of a list of links.
 *
 * DRAWING RULES
 *
 * One view box for all eight (32×20), so no mark is optically larger than
 * another and the right-hand column stays a column. `currentColor` throughout
 * — the row owns the colour, so the mark takes the through-line on hover with
 * the title and the station, as one gesture rather than three.
 *
 * Hairline weights only. These sit at apparatus scale beside a display-size
 * title and must never compete with it: if a mark reads before the words do,
 * it is drawn too heavy.
 */

const VIEW_BOX = '0 0 32 20';

/** Shared by every mark. Hairline, round caps, no fills except where noted. */
const STROKE = {
  stroke: 'currentColor',
  strokeWidth: 1,
  fill: 'none',
  strokeLinecap: 'round',
} as const;

function Mark({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox={VIEW_BOX}
      className="h-5 w-8 shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/**
 * Keyed by route, not by label — `data/navigation.ts` owns the labels and they
 * are allowed to change wording without silently dropping a mark. The route
 * is `/question` (singular) because that is the directory name in app/; see
 * the note in navigation.ts.
 */
export function PageMark({ href }: { href: string }) {
  switch (href) {
    /* About — the manuscript block. A narrow margin column ruled off a wide
       reading column, which is the grid the whole page is composed on
       (components/about/layout.ts). The page's shape, at 32px. */
    case '/about':
      return (
        <Mark>
          <path {...STROKE} d="M2 3 L2 17" />
          <path {...STROKE} d="M10 3 L10 17" strokeOpacity={0.55} />
          <path {...STROKE} d="M14 6 H30" strokeOpacity={0.55} />
          <path {...STROKE} d="M14 10 H30" strokeOpacity={0.55} />
          <path {...STROKE} d="M14 14 H26" strokeOpacity={0.55} />
        </Mark>
      );

    /* Journey — the tone curve. The connectors on that page bend according to
       each chapter's tone; this is that line, with the one branch tick that
       marks a chapter carrying a promoted moment. */
    case '/journey':
      return (
        <Mark>
          <path {...STROKE} d="M10 2 C 18 6, 6 12, 14 18" />
          <path {...STROKE} d="M12.5 13 L20 16" strokeOpacity={0.6} />
          <circle cx="20" cy="16" r="1.4" fill="currentColor" stroke="none" opacity={0.75} />
        </Mark>
      );

    /* Now — the leaf, with a crossing-out on it. A sheet tipped into the book,
       carrying the one thing that page does that no other page does: it keeps
       what stopped being true, struck through, in public. */
    case '/now':
      return (
        <Mark>
          <path {...STROKE} d="M6 2 H26 V18 H6 Z" strokeOpacity={0.55} />
          <path {...STROKE} d="M9 7 H23" strokeOpacity={0.45} />
          <path {...STROKE} d="M9 13 H19" strokeOpacity={0.45} />
          <path {...STROKE} d="M7.5 7 H24.5" />
        </Mark>
      );

    /* Projects — the reconciliation dumbbell. Two figures for one year and the
       gap between them, which is the shape of the chart on that page and the
       shape of its argument: the residual is the finding. */
    case '/projects':
      return (
        <Mark>
          <path {...STROKE} d="M8 6 V14" strokeOpacity={0.4} strokeDasharray="1.5 2.5" />
          <circle cx="8" cy="6" r="1.6" fill="currentColor" stroke="none" opacity={0.55} />
          <circle cx="8" cy="14" r="1.6" fill="currentColor" stroke="none" opacity={0.55} />
          <path {...STROKE} d="M22 3 V17" />
          <circle cx="22" cy="3" r="2" fill="currentColor" stroke="none" />
          <circle cx="22" cy="17" r="2" fill="currentColor" stroke="none" />
        </Mark>
      );

    /* Experience — the route. Two lanes, India above and London below, and the
       single crossing between them. The diagram at the head of that page,
       reduced to the only fact it exists to carry. */
    case '/experience':
      return (
        <Mark>
          <path {...STROKE} d="M2 6 H12 L20 14 H30" />
          <circle cx="16" cy="10" r="1.8" fill="currentColor" stroke="none" />
        </Mark>
      );

    /* Media — the contact sheet. Frames of unequal width, because the page's
       whole layout rule is that no two photographs share a footprint. */
    case '/media':
      return (
        <Mark>
          <path {...STROKE} d="M2 4 H13 V16 H2 Z" strokeOpacity={0.65} />
          <path {...STROKE} d="M16 4 H23 V11 H16 Z" strokeOpacity={0.65} />
          <path {...STROKE} d="M26 4 H30 V9 H26 Z" strokeOpacity={0.65} />
          <path {...STROKE} d="M16 14 H30" strokeOpacity={0.35} />
        </Mark>
      );

    /* Questions — one answered, six not. This is not a metaphor: the page
       currently holds one written answer and six questions still open, and
       the mark counts them. If that changes, this mark becomes false and
       should be redrawn — the same contract Fig. 01's caption carries. */
    case '/question':
      return (
        <Mark>
          <path {...STROKE} d="M2 3 H30" />
          <path {...STROKE} d="M2 7 H12" strokeOpacity={0.4} />
          <path {...STROKE} d="M16 7 H24" strokeOpacity={0.4} />
          <path {...STROKE} d="M2 11 H10" strokeOpacity={0.4} />
          <path {...STROKE} d="M14 11 H26" strokeOpacity={0.4} />
          <path {...STROKE} d="M2 15 H14" strokeOpacity={0.4} />
          <path {...STROKE} d="M18 15 H28" strokeOpacity={0.4} />
        </Mark>
      );

    /* Contact — ruled letterhead. Full-width rules, each with a short ink tick
       at its left end: exactly the motif Imprint sets the channels on, where
       the rule completes when you choose a door. */
    case '/contact':
      return (
        <Mark>
          <path {...STROKE} d="M2 5 H30" strokeOpacity={0.4} />
          <path {...STROKE} d="M2 5 H9" />
          <path {...STROKE} d="M2 11 H30" strokeOpacity={0.4} />
          <path {...STROKE} d="M2 11 H9" />
          <path {...STROKE} d="M2 17 H30" strokeOpacity={0.4} />
          <path {...STROKE} d="M2 17 H9" />
        </Mark>
      );

    /* A destination without a mark renders without one, the same way a row
       without an invitation renders without one. Nothing is invented to fill
       the column. */
    default:
      return null;
  }
}
