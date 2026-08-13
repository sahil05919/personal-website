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
          {/* THE ERRATA SLIP.

              This list is the most unusual thing on the site — a dated, public
              register of what is currently wrong with the page you are
              standing on, the Equinor residual turned on the website itself.
              It was set as four em-dashed bullets in graphite: the single most
              generic object on a page that otherwise refuses generic objects.

              An errata slip is the exact printed form for this, and it is
              native to the page's own metaphor rather than borrowed into it —
              Now is a leaf tipped into the book, and an errata slip is the
              other thing that gets tipped in. So it is set as its own small
              sheet: bounded, faintly lifted off the paper, entries ruled and
              numbered.

              The tint and hairline are the pair the Workbench's empty plate
              already uses (bg-ink/[0.015]), so this reads as a second piece of
              paper in an established vocabulary rather than as a card.

              NO COBALT. On this page the accent means one thing — something
              changed — and it is spent on the crossings-out. These are things
              that have NOT changed yet, which is the opposite claim; colouring
              them would break the legend the rest of the page depends on.

              The numbering is real apparatus in the Fig. 01 tradition: it
              counts what is actually in the list, so the slip can neither
              overstate nor understate itself. Add an item to now-content.ts
              and the count follows. */}
          <div className="max-w-[34rem] border border-hairline bg-ink/[0.015]">
            <p className="border-b border-hairline px-5 py-3.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-graphite">
              {work.unfinished.note}
            </p>

            <ol className="m-0 list-none p-0">
              {work.unfinished.items.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 border-b border-hairline px-5 py-3.5 last:border-b-0"
                >
                  <span className="shrink-0 font-mono text-[0.625rem] leading-[1.8] tracking-[0.14em] text-graphite/60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-reading text-[0.9375rem] leading-[1.7] text-graphite">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </LeafRow>
      </div>
    </Leaf>
  );
}
