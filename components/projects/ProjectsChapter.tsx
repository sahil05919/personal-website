import { projectEntries, projectRecord } from "@/data/projectsChapter";
import { ProjectEntry } from "./ProjectEntry";

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
  return (
    // overflow-x-clip contains full-bleed plates. `clip`, not `hidden`, so
    // this does not become a scroll container.
    <div className="overflow-x-clip bg-paper">
      <section
        aria-labelledby="projects-title"
        className="mx-auto max-w-[1080px] px-6 pb-32 sm:px-10"
      >
        {/* ── Opening ──
            The standfirst alone, occupying most of the first screen, with the
            first essay entirely below the fold. The one place worth spending a
            viewport on almost nothing: it makes the reader downshift before a
            word of the chapter has been read.

            min-h with vertical centring rather than a hard 100vh — robust on
            short landscape viewports and against mobile browser chrome. */}
        <header className="flex min-h-[82svh] flex-col justify-center py-24">
          <div className="mx-auto w-full max-w-[64ch]">
            <h1
              id="projects-title"
              className="font-mono text-[12px] font-medium tracking-[0.2em] text-graphite"
            >
              Projects
            </h1>

            {/* /media puts a count in a second slot here ("Eight moments").
                Nothing sits beside this on purpose: a count invites the reader
                to count, and goes stale the moment a sixth entry lands. */}

            {/* Observational, not declarative. It does not announce the
                chapter's thesis — the entries are examples of a behaviour
                rather than evidence for a claim made above them. */}
            <p className="mt-10 max-w-[15ch] text-balance font-serif-display text-[clamp(3rem,9vw,5.25rem)] font-normal leading-[0.98] tracking-[-0.03em] text-ink">
              Some refused to leave me alone until I built something.
            </p>
          </div>
        </header>

        {/* ── The essays ──
            Seams are per-entry rather than a uniform space-y: the interstitial
            needs noticeably more air around it than the essays need between
            them, and that difference is the pacing mechanism.

            The seam rule is a short centred hairline, not a full-width divider.
            It is the printed-book section break — enough to tell the eye a
            movement has ended, not enough to become furniture. */}
        {projectEntries.map((entry, index) => (
          <div key={entry.id}>
            {index > 0 && (
              <div
                aria-hidden
                className={
                  entry.rhythm.seam === "wide"
                    ? "flex justify-center py-40 sm:py-56"
                    : "flex justify-center py-28 sm:py-40"
                }
              >
                <span className="block h-px w-16 bg-hairline" />
              </div>
            )}
            <div className={index === 0 ? "pt-8" : ""}>
              <ProjectEntry entry={entry} />
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

          {/* Set as a book's index: title flush left, hairline leader, context
              and year flush right. One line each, no descriptions. It does not
              ask to be read — it exists so the breadth is on the record
              without diluting the chapter.

              The leader collapses on narrow viewports, where the row wraps to
              two lines and a rule between them would be nonsense. */}
          <ul className="mt-8">
            {projectRecord.map((item) => {
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
  );
}