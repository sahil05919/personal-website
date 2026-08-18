'use client';

import { isRevision, type Paragraph } from '@/app/now/now-content';

import { useVariant } from '@/hooks/use-reading-mode';
import { Revised } from './Revised';

/**
 * Entry prose. Newsreader at reading measure, with revisions set inline.
 *
 * A paragraph is a sequence of runs, so a crossing-out sits *inside* a
 * sentence rather than being lifted out into a special block. That placement
 * is the point: the page is not displaying a changelog, it is a piece of
 * writing that has been edited in front of the reader.
 *
 * It was a server component — only the revision itself shipped JavaScript. It is
 * a client component now, because the reader's language choice is only knowable
 * in the browser. `paragraphsHi` is a prop rather than an import so the page,
 * which is a server component and owns the season's content, stays the one place
 * that decides which season is being rendered.
 */
export function SeasonProse({
  paragraphs: paragraphsEn,
  paragraphsHi,
  className = '',
}: {
  paragraphs: readonly Paragraph[];
  /** The same runs in Hinglish. Identical revision count and positions. */
  paragraphsHi?: readonly Paragraph[];
  className?: string;
}) {
  const paragraphs = useVariant(paragraphsEn, paragraphsHi);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, pIndex) => (
        <p
          key={pIndex}
          className="mb-7 max-w-[36rem] font-reading text-[1.0625rem] leading-[1.75] text-ink last:mb-0 md:text-[1.1875rem] md:leading-[1.8]"
        >
          {paragraph.map((run, rIndex) =>
            isRevision(run) ? (
              <Revised key={rIndex} {...run} />
            ) : (
              <span key={rIndex}>{run}</span>
            )
          )}
        </p>
      ))}
    </div>
  );
}
