import Link from "next/link";

/**
 * AT A GLANCE — a chapter's own contents, at the top of it.
 *
 * /journey has had this since it was built: eight points down the left rail,
 * so a reader can see the shape of the whole thing before committing to any of
 * it, and (since the last pass) jump straight to whichever part they came for.
 * /projects and /experience had nothing. Both are long — five essays and
 * twelve entries — and both opened with a standfirst and then simply began,
 * which asks a reader to trust several thousand words on the strength of one
 * line.
 *
 * Most people will not read all of it. That is not a failure of the writing;
 * it is how anybody reads anything longer than a page. The honest response is
 * to say what is in it up front and let them choose, which is what a table of
 * contents has done since books had pages.
 *
 * ---------------------------------------------------------------------------
 * WHY IT IS AT THE TOP AND NOT IN A RAIL
 *
 * Journey can afford a persistent left rail because its page frame is 76rem
 * with a 12rem column reserved for exactly that. /experience is an 880px
 * centred measure and /projects is a single centred axis whose left margin is
 * documented as "deliberate whitespace rather than a second rail" — bolting a
 * sticky column onto either would mean rebuilding a working layout to hold a
 * navigation aid.
 *
 * At the top it also does something a rail cannot: it is the first thing after
 * the standfirst, so it answers "what am I getting into" at the exact moment
 * the question is being asked, on every screen size rather than only above
 * `lg`.
 *
 * ---------------------------------------------------------------------------
 * SET AS AN INDEX, NOT AS CARDS
 *
 * Hairline rows, marker flush left, title beside it, the aside flush right.
 * No boxes, no thumbnails, no counts, no reading times. It has to read as
 * apparatus the eye can skip in one movement — a contents list that is itself
 * a substantial thing to read has defeated its own purpose.
 *
 * Server component, plain anchors. `scroll-behavior: smooth` and the 96px
 * `:target` margin in globals.css do the rest, so this works with JavaScript
 * unavailable.
 */

export interface GlanceItem {
  /** The DOM id to jump to. Must exist on the page. */
  id: string;
  /** Flush-left marker: a year, a number, whatever the chapter counts in. */
  marker: string;
  label: string;
  /** Flush-right aside. Kept short — it is a hint, not a summary. */
  note?: string;
}

export function GlanceContents({
  heading,
  items,
  note,
  notesBelow = false,
  className = "",
}: {
  heading: string;
  items: GlanceItem[];
  /** One line under the heading. Optional. */
  note?: string;
  /**
   * Put every row's aside on its own line instead of flush right.
   *
   * Needed where the titles are long enough that SOME rows fit their aside
   * inline and others wrap — which is what /projects did: four rows wrapped,
   * one didn't, and the single inline one read as a mistake rather than as a
   * variation. Deciding it explicitly per page is better than letting the
   * measure decide it per row.
   */
  notesBelow?: boolean;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={heading} className={className}>
      <p className="apparatus">{heading}</p>

      {note ? (
        <p className="mt-3 max-w-measure font-reading text-fluid-aside text-graphite text-pretty">
          {note}
        </p>
      ) : null}

      <ul className="mt-6 border-t border-hairline">
        {items.map((item) => (
          <li key={item.id} className="border-b border-hairline">
            <Link
              href={`#${item.id}`}
              className="group flex flex-wrap items-baseline gap-x-5 gap-y-1 py-3"
            >
              <span className="w-[4.5rem] shrink-0 font-mono text-apparatus-xs uppercase tabular-nums text-graphite transition-colors duration-300 ease-editorial group-hover:text-through-line">
                {item.marker}
              </span>

              {/* `basis-[18rem]` rather than a bare `flex-1`: with only
                  `flex-1` a long aside won the space negotiation and squeezed
                  the title into a three-line stack beside it. The title now
                  asks for a real width first and the aside takes what is left,
                  wrapping onto its own row when there isn't enough. */}
              <span className="min-w-0 flex-1 basis-[18rem] font-reading text-fluid-aside text-ink">
                {item.label}
              </span>

              {item.note ? (
                <span
                  className={`font-mono text-apparatus-xs uppercase text-graphite/80 ${
                    notesBelow ? "basis-full pl-[5.5rem]" : "shrink-0"
                  }`}
                >
                  {item.note}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
