'use client';

/*
  Extracted from app/a-z/page.tsx so it can read the reader's language choice.

  The page file has to stay a server component — it exports `metadata` —
  and a server component cannot call a hook, so the whole render moved
  here and the page became four lines. Nothing about the markup changed;
  only the file it lives in, and the `useVariant` calls that pick between
  the English content and its Hinglish twin.
*/

import Link from 'next/link';
import { indexEntries, indexIntro, groupIndex } from '@/data/indexData';
import { indexIntroHi } from '@/data/hinglish';
import { useVariant } from '@/hooks/use-reading-mode';
/**
 * Index — back matter, beside the errata leaf.
 *
 * THE ROUTE IS /a-z AND NOT /index, which is not a naming preference. Next
 * normalises `/index` to `/`, so `app/index/page.tsx` built and deployed
 * perfectly happily and then served the HOME page at that address — caught in a
 * screenshot, not in the build, because nothing about it is an error. Do not
 * "tidy" this back to /index.
 *
 * The page still calls itself Index, because that is what it is; only the
 * address had to give way.
 *
 * NOT IN THE NAVIGATION, for the same reason /errata is not: the book is nine
 * chapters, and an index sits after them with the colophon. Both are reachable
 * from the imprint at the foot of every page, which is where a reader looks for
 * back matter without being told to.
 *
 * ---------------------------------------------------------------------------
 * SET AS AN INDEX, NOT AS A TAG CLOUD
 *
 * Two columns of ruled rows, term flush left, chapter references flush right,
 * with a leader of air between them. Letter groups are marked in the margin in
 * the display face — the only place on this page type is allowed to be large,
 * because in a printed index the letter is the only landmark.
 *
 * Deliberately NOT: pills, chips, a tag cloud, or anything sized by frequency.
 * Every one of those turns a reference list into a graphic, and a reader
 * scanning for a word they half-remember needs a straight alphabetical column
 * more than they need a picture of what this site talks about most.
 *
 * The references are the chapter names rather than page numbers, because the
 * unit of this book is the chapter and there are no pages. Multiple references
 * are separated by a middot and are individually clickable — a reader looking
 * up "Brighton" wants the choice of the photograph or the paragraph.
 *
 * Server component. No motion and no interaction beyond the links: this is a
 * lookup table and it should be usable the instant it paints.
 */


export default function IndexChapter() {
  const copy = useVariant(indexIntro, indexIntroHi);

  const groups = groupIndex(indexEntries);

  return (
    <article className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-shell px-5 pb-24 pt-[88px] sm:px-8 md:pt-[112px] lg:px-10">
        <p className="apparatus normal-case tracking-[0.08em]">
          {copy.eyebrow}
        </p>

        <h1 className="hang mt-7 font-serif-display text-fluid-display font-normal md:mt-9">
          {copy.title}
        </h1>

        <p className="mt-6 max-w-wide font-serif-display text-fluid-claim text-graphite text-balance">
          {copy.standfirst}
        </p>

        <div className="mt-10 max-w-measure space-y-6 font-reading text-fluid-read text-pretty md:mt-12">
          {copy.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        {/* The count, as apparatus. True by construction — it is the array's
            length, not a number typed into the copy that would go stale the
            first time an entry is added. */}
        <p className="mt-12 font-mono text-apparatus-xs uppercase text-graphite">
          {indexEntries.length} entries across nine chapters
        </p>

        {/*
          Two columns on wide screens, and `columns` rather than a grid on
          purpose: an index flows down one column and continues at the top of
          the next, the way a printed one does. `break-inside: avoid` on each
          letter group stops a letter's heading being orphaned at the foot of
          the first column.
        */}
        <div className="mt-14 md:columns-2 md:gap-16">
          {groups.map((group) => (
            <section
              key={group.letter}
              aria-labelledby={`index-${group.letter}`}
              className="mb-10 break-inside-avoid"
            >
              <h2
                id={`index-${group.letter}`}
                className="border-b border-hairline pb-2 font-serif-display text-fluid-row text-through-line"
              >
                {group.letter}
              </h2>

              <ul>
                {group.items.map((entry) => (
                  <li
                    key={entry.term}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-hairline/60 py-2.5"
                  >
                    <span className="font-reading text-fluid-aside text-ink">
                      {entry.term}
                      {entry.note ? (
                        <span className="text-graphite">, {entry.note}</span>
                      ) : null}
                    </span>

                    <span className="flex shrink-0 items-baseline font-mono text-apparatus-xs uppercase text-graphite">
                      {entry.refs.map((ref, i) => (
                        <span key={ref.href} className="flex items-baseline">
                          {i > 0 ? (
                            <span
                              aria-hidden="true"
                              className="mx-1.5 text-hairline"
                            >
                              ·
                            </span>
                          ) : null}
                          <Link
                            href={ref.href}
                            className="transition-colors duration-300 ease-editorial hover:text-through-line"
                          >
                            {ref.label}
                          </Link>
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* The other half of the back matter. The two leaves point at each
            other, because a reader who has found one is the kind of reader who
            wants the other. */}
        <section className="mt-16 border-t border-hairline pt-12">
          <p className="max-w-wide font-serif-display text-fluid-row text-balance">
            An index says what is here. The other leaf says what was wrong.
          </p>
          <Link
            href="/errata"
            className="link-rule group mt-6 inline-block font-mono text-apparatus uppercase text-ink"
          >
            Errata
            <span
              aria-hidden="true"
              className="ml-2 inline-block transition-transform duration-[700ms] ease-editorial group-hover:translate-x-[3px] motion-reduce:transition-none"
            >
              &rarr;
            </span>
          </Link>
        </section>
      </div>
    </article>
  );
}
