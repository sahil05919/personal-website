// app/now/page.tsx
//
// This assumes your project already has shadcn/ui-style CSS variable tokens
// defined for both light and dark themes — background, foreground, border,
// muted, muted-foreground, primary, primary-foreground, accent,
// accent-foreground (the same tokens `border-border` in your last version
// implied). If those aren't set up, either add them to your global CSS /
// tailwind config, or tell me your actual token names and I'll swap them in.
// With them in place, this page needs zero extra work to look right in dark
// mode — it inherits whatever your theme already defines.

import type { Metadata } from "next";
import {
  lastUpdated,
  seasonLine,
  movements,
  type Movement,
} from "./now-content";

export const metadata: Metadata = {
  title: "Now — Sahil Kumar",
  description:
    "A living snapshot of what Sahil Kumar is currently focused on — working, building, reading, and exploring.",
};

// Subtle per-movement rhythm using a single accent token at different
// opacities, so section breaks read as distinct without introducing new
// colors that would need their own dark-mode variants.
const movementOpacity: Record<Movement, string> = {
  doing: "border-primary",
  becoming: "border-primary/70",
  living: "border-primary/45",
};

export default function NowPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6 pb-24">
      {/* hero */}
      <div className="border-b border-border py-10">
        <div className="mb-3 text-xs uppercase tracking-[0.1em] text-muted-foreground">
          This season · Updated {lastUpdated}
        </div>
        <p className="max-w-[38ch] font-serif text-3xl font-semibold leading-snug text-foreground sm:text-5xl">
          {seasonLine}
        </p>
      </div>

      {/* movements */}
      {movements.map((movement) => (
        <section key={movement.key} className="mt-16">
          <div
            className={`mb-3 flex items-center gap-2 border-t-2 pt-3 ${movementOpacity[movement.key]}`}
          >
            <h2 className="font-serif text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
              {movement.title}
            </h2>
          </div>

          {movement.entries.map((entry) => (
            <div
              key={entry.label}
              className="grid grid-cols-1 gap-2 border-b border-border py-4 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-6 sm:py-5"
            >
              <div className="pt-px font-serif text-[15px] font-semibold text-foreground sm:text-base">
                {entry.label}
              </div>

              <div className="text-[15px] leading-relaxed text-muted-foreground sm:text-[15.5px]">
                {entry.paragraphs?.map((p, idx) => (
                  <p key={idx} className="mb-2 last:mb-0">
                    {p}
                  </p>
                ))}

                {/* place chips — visited (filled) vs planned (outlined) */}
                {entry.placeGroups?.map((group) => (
                  <div key={group.label} className="mb-3 last:mb-0">
                    <div className="mb-2 text-xs uppercase tracking-[0.06em] text-muted-foreground">
                      {group.label}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((place) =>
                        group.variant === "visited" ? (
                          <span
                            key={place}
                            className="rounded-full bg-muted px-3 py-1 text-[13px] text-foreground"
                          >
                            {place}
                          </span>
                        ) : (
                          <span
                            key={place}
                            className="rounded-full border border-dashed border-border px-3 py-1 text-[13px] text-muted-foreground"
                          >
                            {place}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                ))}

                {/* link chips */}
                {entry.linkGroups?.map((group) => (
                  <div key={group.label} className="mb-3 last:mb-0">
                    <div className="mb-2 text-xs uppercase tracking-[0.06em] text-muted-foreground">
                      {group.label}
                    </div>
                    <div className="flex flex-col gap-2">
                      {group.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-[13.5px] text-foreground no-underline transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          <span>{link.text}</span>
                          <span
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}

      <div className="mt-14 border-t border-border pt-5 text-xs tracking-[0.02em] text-muted-foreground">
        This page changes as life does — no fixed schedule, just whenever the season shifts.
      </div>
    </div>
  );
}