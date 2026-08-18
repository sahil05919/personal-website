'use client';

/*
  Extracted from app/errata/page.tsx so it can read the reader's language choice.

  The page file has to stay a server component — it exports `metadata` —
  and a server component cannot call a hook, so the whole render moved
  here and the page became four lines. Nothing about the markup changed;
  only the file it lives in, and the `useVariant` calls that pick between
  the English content and its Hinglish twin.
*/

import Link from 'next/link';
import {
  errataIntro,
  errataCorrected,
  errataOpen,
  type Erratum,
} from '@/data/errataData';
import { errataIntroHi } from '@/data/hinglish';
import { useVariant } from '@/hooks/use-reading-mode';
/**
 * Errata — back matter, not a chapter.
 *
 * IT IS DELIBERATELY NOT IN THE NAVIGATION. The book is nine chapters and this
 * is not the tenth: an errata leaf belongs after the text, with the colophon,
 * and putting it in the running head would give a list of mistakes the same
 * standing as the Journey. It is reachable from the imprint at the foot of
 * every page, which is exactly where a reader goes looking for this kind of
 * thing, and from the Now page's own list of what is unfinished.
 *
 * TYPOGRAPHY. The site's revision vocabulary, borrowed wholesale from /now and
 * not reinvented: <del> for the wording that was wrong, <ins> for what replaced
 * it, and cobalt meaning change and nothing else. Those are the semantics of an
 * edited document, which is what this page is a record of.
 *
 * The one thing this page adds to that vocabulary is the OPEN entry — struck
 * text with nothing beside it yet. On /now every revision is finished by
 * definition, because the page only records what has already changed. Here a
 * correction can be outstanding, and those entries are set first, above the
 * fixed ones. A list of mistakes you have already tidied away costs nothing to
 * publish; a list of the ones still on the page is the reason to have the page.
 *
 * Server component throughout. No motion, no reveal-on-scroll, no interaction:
 * this is a document of record and it should be readable with everything
 * turned off, printed, or piped through a reader.
 */


/** Apparatus line for one entry: where it was, and the dates. */
function Stamp({ entry }: { entry: Erratum }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-apparatus-xs uppercase text-graphite">
      <span className="text-ink">{entry.where}</span>
      <span aria-hidden="true" className="text-hairline">
        /
      </span>
      <span>{entry.kind}</span>
      <span aria-hidden="true" className="text-hairline">
        /
      </span>
      <span>
        Noticed {entry.noticed}
        {entry.corrected ? ` · Corrected ${entry.corrected}` : ''}
      </span>
    </div>
  );
}

function Entry({ entry }: { entry: Erratum }) {
  return (
    <li className="border-t border-hairline py-10 first:border-t-0 first:pt-0 md:py-12">
      <Stamp entry={entry} />

      {/*
        `struck` is null where the fault was an omission rather than a wrong
        word — nothing was said that should have been unsaid, so there is
        nothing to strike, and printing an empty <del> to keep the shape
        regular would be inventing a sentence that never existed.
      */}
      {entry.struck ? (
        <p className="mt-6 max-w-wide font-serif-display text-fluid-row text-balance">
          <del
            className="
              text-graphite/70 no-underline
              [text-decoration-line:line-through]
              [text-decoration-color:rgb(var(--through-line)/0.5)]
              [text-decoration-thickness:1px]
            "
          >
            {entry.struck}
          </del>
        </p>
      ) : null}

      {entry.now ? (
        <p className="mt-3 max-w-wide font-serif-display text-fluid-row text-ink text-balance">
          <ins className="no-underline">{entry.now}</ins>
        </p>
      ) : null}

      <p className="mt-6 max-w-measure font-reading text-fluid-aside text-graphite text-pretty">
        {entry.note}
      </p>
    </li>
  );
}

export default function ErrataChapter() {
  const copy = useVariant(errataIntro, errataIntroHi);

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

        {/* ── Still wrong ─────────────────────────────────────────────────
            First, and above the fixed ones, because this is the half of the
            page that is actually worth something to a reader. */}
        {errataOpen.length > 0 ? (
          <section aria-labelledby="errata-open" className="mt-20 md:mt-28">
            <h2
              id="errata-open"
              className="font-mono text-apparatus uppercase text-through-line"
            >
              Still wrong
            </h2>
            <p className="mt-4 max-w-measure font-reading text-fluid-aside text-graphite text-pretty">
              {copy.openNote}
            </p>

            <ul className="mt-12">
              {errataOpen.map((entry) => (
                <Entry key={entry.id} entry={entry} />
              ))}
            </ul>
          </section>
        ) : null}

        {/* ── Corrected ───────────────────────────────────────────────────── */}
        {errataCorrected.length > 0 ? (
          <section aria-labelledby="errata-corrected" className="mt-20 md:mt-28">
            <h2
              id="errata-corrected"
              className="font-mono text-apparatus uppercase text-graphite"
            >
              Corrected
            </h2>
            <p className="mt-4 max-w-measure font-reading text-fluid-aside text-graphite text-pretty">
              {copy.correctedNote}
            </p>

            <ul className="mt-12">
              {errataCorrected.map((entry) => (
                <Entry key={entry.id} entry={entry} />
              ))}
            </ul>
          </section>
        ) : null}

        {/* ── The ask ──────────────────────────────────────────────────────
            The page has just spent its whole length arguing that being wrong
            in public is survivable. The only honest way to end it is to invite
            more of it — and to point at the one door on the site that does not
            ask the reader for their name, because telling someone their
            website is wrong is easier unsigned. */}
        <section className="mt-24 border-t border-hairline pt-12 md:mt-32">
          <p className="max-w-wide font-serif-display text-fluid-row text-balance">
            If something here is still wrong, I would rather know than not.
          </p>
          <p className="mt-5 max-w-measure font-reading text-fluid-aside text-graphite text-pretty">
            There is a form at the foot of the Contact page that takes a message
            without taking your name with it. It exists partly for this.
          </p>
          <Link
            href="/contact"
            className="link-rule group mt-8 inline-block font-mono text-apparatus uppercase text-ink"
          >
            Contact
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
