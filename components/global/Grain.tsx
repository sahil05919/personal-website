/**
 * Texture — the paper itself, sitewide, static.
 *
 * Two layers, and they do different jobs:
 *
 *   grain    a fractal-noise tile at 4–7% depending on the theme. It gives
 *            flat colour a tooth, so a large field of paper stops reading as
 *            a filled rectangle. Never animates, never moves with scroll.
 *
 *   light    one very wide, very faint radial wash from the top-left. Real
 *            paper is lit from somewhere; without this the page is evenly
 *            flooded and the plates cast shadows in a room with no lamp.
 *            It is below 3% at its brightest and its only job is to give the
 *            eye a reason to start reading at the top left.
 *
 * Both are server-rendered, pure CSS, and carry no client bundle cost. Fixed
 * and pointer-events-none, so the whole texture is one composited layer
 * however tall the page gets, and it never intercepts a click or a focus ring.
 *
 * Sits below the navbar's z-50 so the chrome itself stays perfectly crisp,
 * and both layers carry data-texture so the print stylesheet can drop them.
 *
 * The opacity and blend mode are read from theme variables rather than from a
 * `dark:` variant, which is what lets a third theme exist at all.
 */
export function Grain() {
  return (
    <>
      <div
        aria-hidden="true"
        data-texture=""
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          opacity: "var(--grain-opacity)",
          mixBlendMode: "var(--grain-blend)" as React.CSSProperties["mixBlendMode"],
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        aria-hidden="true"
        data-texture=""
        className="pointer-events-none fixed inset-0 z-[39]"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 8% -10%, rgb(var(--ink) / 0.028) 0%, transparent 55%)",
        }}
      />
    </>
  );
}
