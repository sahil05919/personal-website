import { work } from '@/app/now/now-content';

import { Leaf, LeafRow, LeafHeading, MarginNote } from './Leaf';
import { SeasonProse } from './SeasonProse';

/**
 * WORK + MAKING.
 *
 * Deliberately not cards. /projects already exists and does the finished
 * version of this; repeating it here would be the fourth telling of the same
 * arc that made the old site feel repetitive. What Now can say that no other
 * page can is what it currently *feels like* to be in the middle of these
 * things.
 *
 * So the work is prose, and the four things being made are a register: name on
 * the left, honest state on the right, hairline between. Their weight comes
 * from the state, not from a box. "nothing shipped" is allowed to sit on the
 * page next to "running".
 *
 * The colophon-in-progress at the foot is the Equinor residual turned on the
 * website itself: a dated, true list of what is unfinished on the site you are
 * currently reading. It is the one thing here a portfolio would never publish,
 * which is exactly the argument for publishing it.
 */
export function Making() {
  return (
    <Leaf className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-[1400px]">
        <LeafRow note={<LeafHeading>{work.heading}</LeafHeading>}>
          <SeasonProse paragraphs={work.paragraphs} />
        </LeafRow>

        <LeafRow className="mt-14" note={<MarginNote>state</MarginNote>}>
          <dl className="max-w-[36rem] border-t border-hairline">
            {work.making.map((item) => (
              <div
                key={item.name}
                className="flex flex-col gap-1 border-b border-hairline py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <dt className="font-reading text-[1.0625rem] leading-snug text-ink">
                  {item.name}
                </dt>
                <dd className="font-mono text-[0.625rem] uppercase leading-[1.6] tracking-[0.16em] text-graphite sm:text-right">
                  {item.state}
                </dd>
              </div>
            ))}
          </dl>
        </LeafRow>

        <LeafRow
          className="mt-14"
          note={<MarginNote>colophon</MarginNote>}
        >
          <div className="max-w-[36rem]">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-graphite">
              {work.unfinished.note}
            </p>
            <ul className="mt-4 space-y-2">
              {work.unfinished.items.map((item) => (
                <li
                  key={item}
                  className="font-reading text-[0.9375rem] leading-[1.7] text-graphite before:mr-3 before:text-hairline before:content-['—']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </LeafRow>
      </div>
    </Leaf>
  );
}
