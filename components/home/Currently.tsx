import Link from 'next/link';

/**
 * Currently — proof the record is alive.
 *
 * Takes its text as props on purpose. This component must never hold a copy of
 * a line that /now already owns; the page passes it in from the Now data
 * source so there is exactly one place to edit when the season changes.
 *
 * Apparatus register throughout, per the locked scale spec.
 */
interface CurrentlyProps {
  /** One line, lifted verbatim from the Now data source. Keep it short. */
  line: string;
  /** The Now page's own last-updated stamp. Never hand-set here. */
  updated: string;
}

export default function Currently({ line, updated }: CurrentlyProps) {
  return (
    <section
      aria-label="Currently"
      className="bg-paper text-ink px-6 md:px-8 pb-16 md:pb-20"
    >
      <div className="mx-auto max-w-2xl">
        <div className="border-t border-hairline pt-6 font-mono text-[11px] leading-[1.7] text-graphite">
          <p>
            <span className="tracking-[0.06em]">Currently</span>
            <span className="mx-2 text-hairline" aria-hidden="true">
              /
            </span>
            {line}
          </p>

          <p className="mt-1">
            <Link
              href="/now"
              className="underline underline-offset-4 decoration-hairline transition-colors hover:text-through-line hover:decoration-through-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
            >
              What I&apos;m doing now
            </Link>
            <span className="mx-2 text-hairline" aria-hidden="true">
              /
            </span>
            Updated {updated}
          </p>
        </div>
      </div>
    </section>
  );
}
