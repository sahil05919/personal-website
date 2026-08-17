import Image from 'next/image';

import { exploring } from '@/app/now/now-content';

import { Leaf, LeafRow, LeafHeading, MarginNote } from './Leaf';

/**
 * EXPLORING.
 *
 * Appetite first, record second. Media owns the past — what stayed, and what
 * the photograph failed to hold. Now can own the only thing Media cannot: what
 * has not happened yet. So Next up is set at display scale and Recently is
 * compressed into a single running index line.
 *
 * No map, no pins, no trail. A map is a dashboard object and it would rebuild
 * Media inside Now, which is the About/Journey collision repeating itself.
 *
 * One place gets a paragraph and a photograph. The other six get a name in an
 * index. That asymmetry is the entire design: a list stops being a list the
 * moment its items stop being equal.
 *
 * The separators are CSS pseudo-elements, not spans. A span carrying
 * aria-hidden would be deleted by the blanket print rule in globals.css and
 * the place names would run together on paper — verified in a PDF export.
 * A pseudo-element is invisible to assistive technology without needing the
 * attribute at all.
 *
 * The walking-tour counter is the only number on the page. It is true, and
 * across kept seasons it visibly grows — the Fig. 01 principle (apparatus that
 * states a true fact about the thing it labels) applied to a life rather than
 * to an animation.
 */
export function Exploring() {
  return (
    <Leaf className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-[62rem]">
        <LeafRow note={<LeafHeading>{exploring.heading}</LeafHeading>}>
          <div>
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-graphite">
              Next up
            </p>
            <p className="mt-5 max-w-[46rem] font-serif-display text-[2.5rem] font-normal leading-[1.05] tracking-[-0.03em] text-ink md:text-[3.75rem] lg:text-[4.5rem]">
              {exploring.nextUp.join('. ')}.
            </p>
          </div>
        </LeafRow>

        <LeafRow
          className="mt-16 md:mt-20"
          note={<MarginNote>recently</MarginNote>}
        >
          <ul className="m-0 flex max-w-[36rem] list-none flex-wrap p-0 font-mono text-[0.75rem] leading-[2] text-graphite">
            {exploring.index.map((place) => (
              <li
                key={place.name}
                className="before:mx-2 before:text-hairline before:content-['·'] first:before:hidden"
              >
                {place.href ? (
                  <a
                    href={place.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-rule text-ink"
                  >
                    {place.name}
                  </a>
                ) : (
                  place.name
                )}
              </li>
            ))}
          </ul>
        </LeafRow>

        <LeafRow
          className="mt-16 md:mt-20"
          note={<MarginNote>{exploring.counter.label}</MarginNote>}
        >
          <p className="font-serif-display text-[1.25rem] font-normal leading-snug text-ink md:text-[1.5rem]">
            {exploring.counter.value}
          </p>
        </LeafRow>

        <LeafRow className="mt-20 md:mt-28" note={<MarginNote>one of them</MarginNote>}>
          <figure className="max-w-[46rem]">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={exploring.featured.src}
                alt={exploring.featured.alt}
                fill
                sizes="(max-width: 768px) 100vw, 46rem"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-6 max-w-[36rem]">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-graphite">
                {exploring.featured.name}
              </p>
              <p className="mt-4 font-reading text-[1.0625rem] leading-[1.75] text-ink">
                {exploring.featured.paragraph}
              </p>
            </figcaption>
          </figure>
        </LeafRow>
      </div>
    </Leaf>
  );
}
