import Image from 'next/image';

import { aboutContent } from '@/data/profileContent';

/**
 * The page has no headline, so the name carries the <h1>. This is honest
 * (the page is him, the heading is his name), it restores a heading structure
 * the essay format would otherwise leave without one, and it gives the
 * photograph a caption that isn't "Fig 01."
 *
 * Deliberately NOT a hero: no min-h-[90vh], no full bleed. The opening
 * sentence is domestic and quiet; a hero portrait would shout over it.
 */
export function Portrait() {
  const { name, portrait, revision } = aboutContent;
  const hasPortrait = portrait.src.length > 0;

  return (
    <header className="px-6 pb-16 pt-20 md:px-12 md:pb-20 md:pt-28 lg:px-20">
      <div className="mx-auto w-full max-w-[46rem]">
        {hasPortrait && (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            priority
            sizes="(min-width: 768px) 46rem, 100vw"
            className="mb-10 w-full"
          />
        )}

        <h1 className="font-serif-display text-2xl font-normal tracking-tight text-ink md:text-3xl">
          {name}
        </h1>

        {/*
          The version stamp. Small, mono, sitting under the name as apparatus.
          It has to be visible for the revision mechanic to mean anything, and
          quiet enough not to read as a badge.
        */}
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          {revision.label} · {revision.date}
        </p>
      </div>
    </header>
  );
}
