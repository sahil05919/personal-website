/**
 * Grain — a barely-perceptible paper texture, sitewide, static.
 *
 * Server component: pure CSS and an inlined SVG data-URI, no interactivity,
 * no client bundle cost. This never animates, never tracks the cursor and
 * never moves with scroll — it is item 6 of the motion brief ("editorial
 * paper-like depth"), the kind of thing that should only be noticeable by
 * its absence, not by its presence.
 *
 * Fixed + pointer-events-none + full-viewport, so it costs one composited
 * layer regardless of how tall a given page is (background-repeat tiles the
 * texture rather than sizing it to content) and never intercepts a click or
 * a focus ring. Sits above page content but below the navbar's z-50, so the
 * navbar itself stays perfectly crisp.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.035] mix-blend-overlay dark:opacity-[0.05]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
