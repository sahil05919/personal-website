import { mediaMoments } from "@/data/mediaData";
import { MediaMoment } from "./MediaMoment";

/**
 * Chapter 06 — Media.
 *
 * Deliberately not a gallery: no filters, no categories, no date or
 * location metadata, no hero, no closing summary. A small, capped
 * sequence of moments meant to be read in order, the way a photo
 * insert sits inside a memoir rather than a browsable library.
 *
 * Content lives in ./media-moments.ts. Add or retire entries there —
 * this file only renders the sequence.
 */
export function MediaChapter() {
  return (
    <section
      aria-label="Chapter 06: Media"
      className="relative mx-auto max-w-[560px] px-6 py-24 sm:px-0"
    >
      {/* Folio marker — a page number, not a section title. */}
      <div
        aria-hidden="true"
        className="mb-16 font-sans text-[11px] tracking-wide text-neutral-400 dark:text-neutral-600 md:absolute md:mb-0 md:-left-10"
      >
        06
      </div>

      <div className="space-y-28 sm:space-y-32">
        {mediaMoments.map((moment) => (
          <MediaMoment key={moment.id} moment={moment} />
        ))}
      </div>

      {/* No closing line, no summary, no link onward. The sequence
          just stops, the way memory doesn't resolve itself. */}
    </section>
  );
}
