'use client';

/*
  Extracted from app/writing/page.tsx so it can read the reader's language choice.

  The page file has to stay a server component — it exports `metadata` —
  and a server component cannot call a hook, so the whole render moved
  here and the page became four lines. Nothing about the markup changed;
  only the file it lives in, and the `useVariant` calls that pick between
  the English content and its Hinglish twin.
*/

import Link from 'next/link';
import { writing, writingIntro } from '@/data/writingData';
import { writingIntroHi } from '@/data/hinglish';
import { useVariant } from '@/hooks/use-reading-mode';
/**
 * Writing — back matter, beside the index and the errata leaf.
 *
 * The Now page's own list of what is unfinished on this site had "/writing does
 * not exist yet" on it since 10 August. It exists now, and that line has been
 * struck from the list rather than quietly deleted.
 *
 * ---------------------------------------------------------------------------
 * IT IS A LIST, AND THAT IS THE WHOLE DESIGN
 *
 * Five pieces. No cards, no excerpts, no cover images, no reading times, no
 * tags. Every one of those exists to make a short list look like a substantial
 * one, and five is a perfectly respectable number that needs no help.
 *
 * Titles at display scale, because these titles are the argument — three of the
 * five are questions, and a question set at 14px is a link, while a question set
 * at 26px is a question. The apparatus line underneath carries the publication
 * and, where it is genuinely known, the year.
 *
 * Every link leaves the site, which is stated once at the top rather than
 * five times in five little icons.
 *
 * NOT IN THE NAVIGATION, for the same reason /a-z and /errata are not: the book
 * is nine chapters and this is back matter. It sits in the imprint at the foot
 * of every page, with the other two.
 *
 * Server component. No motion, no reveal-on-scroll — the page is five links and
 * it should be usable the instant it paints.
 */


export default function WritingChapter() {
  const copy = useVariant(writingIntro, writingIntroHi);

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

        <p className="mt-12 font-mono text-apparatus-xs uppercase text-graphite">
          {copy.note}
        </p>

        <ol className="mt-12 border-t border-hairline">
          {writing.map((piece, i) => (
            <li key={piece.href} className="border-b border-hairline">
              <a
                href={piece.href}
                target="_blank"
                rel="noreferrer"
                className="group block py-8 md:py-10"
              >
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="shrink-0 font-mono text-apparatus-xs tabular-nums text-graphite/70 transition-colors duration-300 ease-editorial group-hover:text-through-line">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0">
                    <h2 className="font-serif-display text-[1.375rem] leading-[1.3] tracking-[-0.01em] text-ink text-balance md:text-[1.75rem]">
                      {piece.title}
                      <span
                        aria-hidden="true"
                        className="ml-3 inline-block whitespace-nowrap text-graphite transition-transform duration-[700ms] ease-editorial group-hover:translate-x-1 motion-reduce:transition-none"
                      >
                        &nbsp;&rarr;
                      </span>
                    </h2>

                    <p className="mt-3 font-mono text-apparatus-xs uppercase text-graphite">
                      {piece.source}
                      {piece.year ? (
                        <>
                          <span aria-hidden="true" className="mx-2 text-hairline">
                            ·
                          </span>
                          <span className="tabular-nums">{piece.year}</span>
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>

                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ol>

        {/* The unfinished half. Everything above got to an end; the pile on
            /now did not, and pointing at it from here is more honest than
            letting this page imply these five are all there is. */}
        <section className="mt-20 border-t border-hairline pt-12">
          <p className="max-w-wide font-serif-display text-fluid-row text-balance">
            The ones that stopped halfway are kept too.
          </p>
          <p className="mt-5 max-w-measure font-reading text-fluid-aside text-graphite text-pretty">
            There is a pile of unfinished writing on the Now page, each piece
            ending exactly where it actually stopped. Two of them will not become
            anything.
          </p>
          <Link
            href="/now"
            className="link-rule group mt-8 inline-block font-mono text-apparatus uppercase text-ink"
          >
            Now
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
