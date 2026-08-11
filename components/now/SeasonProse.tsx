import { isRevision, type Paragraph } from '@/app/now/now-content';

import { Revised } from './Revised';

/**
 * Entry prose. Newsreader at reading measure, with revisions set inline.
 *
 * A paragraph is a sequence of runs, so a crossing-out sits *inside* a
 * sentence rather than being lifted out into a special block. That placement
 * is the point: the page is not displaying a changelog, it is a piece of
 * writing that has been edited in front of the reader.
 *
 * Server component. Only the revision itself ships JavaScript.
 */
export function SeasonProse({
  paragraphs,
  className = '',
}: {
  paragraphs: readonly Paragraph[];
  className?: string;
}) {
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
