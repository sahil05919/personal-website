import { mediaMoments } from "@/data/mediaData";
import { MediaMoment } from "./MediaMoment";

/**
 * Chapter — Media.
 *
 * Deliberately not a gallery: no filters, no categories, no location
 * metadata, no closing summary. A small, capped sequence of moments meant
 * to be read in order, the way a photo insert sits inside a memoir rather
 * than a browsable library.
 *
 * Content lives in @/data/mediaData. Add or retire entries there — this
 * file only renders the sequence.
 *
 * Type roles, matching /now:
 *   font-mono          (JetBrains Mono) — the apparatus: title, count.
 *   font-serif-display (Fraunces)       — Sahil speaking: the standfirst.
 *   font-reading       (Newsreader)     — read at length: captions, epigraph.
 *
 * font-sans is deliberately absent. The `sans` key in tailwind.config.js
 * names "Geist Sans" as a literal family while next/font registers a hashed
 * one, so font-sans currently resolves to a system fallback sitewide. This
 * page uses only faces that actually load.
 */

const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
];

/** "Eight", not "8". Spelled out to sit in prose rather than read as data.
 *  Falls back to the numeral past twelve, which this page should never reach. */
function spellCount(n: number): string {
  const word = NUMBER_WORDS[n];
  if (!word) return String(n);
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function MediaChapter() {
  const count = mediaMoments.length;

  return (
    <section
      aria-labelledby="media-title"
      className="mx-auto max-w-[560px] px-6 pb-24 sm:px-0"
    >
      <header className="py-10">
        <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1
            id="media-title"
            className="font-mono text-[12px] font-medium tracking-[0.16em] text-ink"
          >
            Media
          </h1>
          <span className="font-mono text-[11px] tracking-[0.12em] text-graphite">
            {spellCount(count)} {count === 1 ? "moment" : "moments"}
          </span>
        </div>

        <p className="max-w-[34ch] text-balance font-serif-display text-[28px] font-medium leading-[1.15] text-ink sm:text-4xl">
          None of this was meant to be a record. It became one anyway.
        </p>

        {/* Set apart rather than appended — the line is the chapter's thesis,
            not the standfirst's third sentence. Exclusive to this page. */}
        <p className="mt-6 font-reading text-[15px] italic text-graphite">
          Proof of presence, not a portfolio.
        </p>
      </header>

      <div className="mt-16 space-y-28 sm:space-y-32">
        {mediaMoments.map((moment, index) => (
          <MediaMoment
            key={moment.id}
            moment={moment}
            // Only the first photograph is above the fold on any viewport.
            priority={index === 0}
            frame={index + 1}
            frameCount={count}
          />
        ))}
      </div>

      {/* No closing line, no summary, no link onward. The sequence
          just stops, the way memory doesn't resolve itself. */}
    </section>
  );
}