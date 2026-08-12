'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { aboutContent } from '@/data/profileContent';
import { GRID, MARGIN_NOTE, SHELL } from './layout';

/**
 * THE OPENING.
 *
 * Composed on the shared manuscript block rather than the old 1400px canvas.
 * Previously the h1 sat left inside an 87.5rem container and the hairline
 * beneath it ran the full container width — the rule visibly outran the type
 * it was underlining. Everything here now ends where the block ends.
 *
 * The display type carries the page's thesis, not the author's name: the name
 * is already in the wordmark, the URL and the document title, and the homepage
 * is the site's only title page. The name sits in the mono eyebrow instead.
 *
 * The rewrite promise moves here from the Facts header, where it was set
 * right-aligned against nothing. It belongs beside the version stamp — the two
 * sentences are about the same thing.
 */

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Masthead() {
  const { name, title, portrait, revision } = aboutContent;
  const hasPortrait = portrait.src.length > 0;

  return (
    <header className="border-b border-hairline">
      <div className={`${SHELL} pb-16 pt-16 md:pb-24 md:pt-24`}>
        <motion.div
          custom={0}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mb-10 flex items-center gap-4 md:mb-12"
        >
          <span className="h-px w-10 bg-through-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
            {name}
          </span>
        </motion.div>

        {/* The {' '} is load-bearing: without it the two spans concatenate into
            one word in the accessible name and in extracted text. */}
        <motion.h1
          custom={1}
          variants={rise}
          initial="hidden"
          animate="show"
          className="font-serif-display font-normal leading-[0.94] tracking-[-0.03em] text-ink"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          {title.lead}{' '}
          <span className="block text-graphite">{title.quiet}</span>
        </motion.h1>

        {/* The portrait, or nothing at all. There is no placeholder state:
            an absent portrait reads as restraint, an empty frame reads as an
            unfinished page. Set `portrait.src` in data/profileContent.ts and
            the figure returns with no other change. */}
        {hasPortrait ? (
          <motion.figure
            custom={2}
            variants={rise}
            initial="hidden"
            animate="show"
            className="relative mt-12 aspect-[3/2] w-full overflow-hidden border border-hairline"
          >
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              priority
              sizes="(min-width: 1024px) 47rem, 100vw"
              className="object-cover"
            />
          </motion.figure>
        ) : null}

        <motion.div
          custom={2}
          variants={rise}
          initial="hidden"
          animate="show"
          className={`${GRID} mt-14 border-t border-hairline pt-6 md:mt-16`}
        >
          <p className={`${MARGIN_NOTE} lg:text-right`}>
            {revision.stamp}
            <span className="block">{revision.date}</span>
          </p>
          <p className="mt-4 max-w-[26rem] font-mono text-[10px] uppercase leading-[1.9] tracking-[0.22em] text-graphite lg:mt-0">
            {revision.promise}
          </p>
        </motion.div>
      </div>
    </header>
  );
}
