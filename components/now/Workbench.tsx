import Image from 'next/image';

import { becoming, type BecomingItem } from '@/app/now/now-content';

import { Leaf, LeafRow, LeafHeading, MarginNote } from './Leaf';

/**
 * BECOMING — the workbench.
 *
 * One rule governs this section, and it is structural rather than decorative:
 *
 *   NO TWO ADJACENT ITEMS MAY SHARE A SIZE OR A MEDIUM.
 *
 * The moment they do, it is a card grid again no matter how it is styled — the
 * exact failure the old Now page had, and the one the About principles grid
 * had before it. A template is a container that works regardless of what you
 * put in it, so the defence is not styling: it is inequality. A photograph
 * running near the full measure, then a couplet at display scale, then four
 * words at 10px, then a small photograph, then a line struck out.
 *
 * Nothing here interacts. It is a shelf; you look at it. Spending interaction
 * budget on a photograph would hide the photograph, which is the whole reward.
 *
 * A missing photograph renders as an honest empty plate stating what it is
 * waiting for. It is not filled with a generated image: on a page stamped
 * "true on 29 July 2026", a fabricated dish is a lie in the one register this
 * site cannot afford one.
 */

function Annotation({ children }: { children: string }) {
  return (
    <p className="mt-3 font-mono text-[0.625rem] uppercase leading-[1.7] tracking-[0.16em] text-graphite">
      {children}
    </p>
  );
}

function Plate({
  awaiting,
  size,
}: {
  awaiting: string;
  size: 'wide' | 'small';
}) {
  return (
    <div
      className={`flex items-end border border-dashed border-hairline bg-ink/[0.015] p-4 ${
        size === 'wide' ? 'aspect-[3/2]' : 'aspect-square'
      }`}
    >
      <span className="font-mono text-[0.625rem] uppercase leading-[1.7] tracking-[0.16em] text-graphite">
        Photograph not taken yet
        <span className="mt-1 block normal-case tracking-[0.08em] text-graphite/70">
          {awaiting}
        </span>
      </span>
    </div>
  );
}

function Item({ item }: { item: BecomingItem }) {
  switch (item.kind) {
    case 'photo': {
      const wide = item.size === 'wide';
      return (
        <figure className={wide ? 'max-w-[46rem]' : 'max-w-[17rem] lg:ml-24'}>
          {item.src ? (
            <div
              className={`relative overflow-hidden ${
                wide ? 'aspect-[3/2]' : 'aspect-square'
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={wide ? '(max-width: 768px) 100vw, 46rem' : '17rem'}
                className="object-cover"
              />
            </div>
          ) : (
            <Plate awaiting={item.awaiting ?? ''} size={item.size} />
          )}
          <figcaption>
            <Annotation>{item.annotation}</Annotation>
          </figcaption>
        </figure>
      );
    }

    case 'couplet':
      return (
        <div className="max-w-[46rem]">
          <p className="font-serif-display text-[1.75rem] font-normal leading-[1.35] tracking-[-0.01em] text-ink md:text-[2.5rem] md:leading-[1.3]">
            {item.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          {item.translation && (
            <p className="mt-4 max-w-[30rem] font-reading text-[0.9375rem] italic leading-[1.7] text-graphite">
              {item.translation}
            </p>
          )}
          <Annotation>{item.annotation}</Annotation>
        </div>
      );

    case 'note':
      return (
        <div className="max-w-[36rem]">
          <p className="font-reading text-[1.0625rem] leading-[1.7] text-ink">
            {item.text}
          </p>
          {item.annotation && <Annotation>{item.annotation}</Annotation>}
        </div>
      );

    case 'struck':
      return (
        <div className="max-w-[36rem]">
          <p className="font-reading text-[1.0625rem] leading-[1.7] text-graphite/70 [text-decoration-color:rgb(var(--through-line)/0.6)] [text-decoration-line:line-through] [text-decoration-thickness:1px]">
            {item.struck}
          </p>
          <Annotation>{item.annotation}</Annotation>
        </div>
      );
  }
}

/** Vertical space is unequal too — the shelf is not evenly stocked. */
const SPACING: Record<BecomingItem['kind'], string> = {
  photo: 'mt-20 md:mt-28',
  couplet: 'mt-24 md:mt-36',
  note: 'mt-16 md:mt-20',
  struck: 'mt-20 md:mt-24',
};

export function Workbench() {
  return (
    <Leaf className="px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <LeafRow note={<LeafHeading>{becoming.heading}</LeafHeading>}>
          <p className="max-w-[36rem] font-reading text-[1.0625rem] leading-[1.75] text-ink md:text-[1.1875rem]">
            {becoming.standfirst}
          </p>
        </LeafRow>

        {becoming.items.map((item, index) => (
          <LeafRow
            key={index}
            className={SPACING[item.kind]}
            note={
              index === 0 ? <MarginNote>this season</MarginNote> : undefined
            }
          >
            <Item item={item} />
          </LeafRow>
        ))}
      </div>
    </Leaf>
  );
}
