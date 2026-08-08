'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { aboutContent } from '@/data/profileContent';

/**
 * THE OPENING.
 *
 * The previous build opened on a paragraph. Nothing arrived; nothing was
 * claimed. This opens the way an editorial spread does — the name at display
 * scale in Fraunces, the portrait as a real image with real presence, and a
 * single hairline holding them in tension.
 *
 * Scale contrast is the whole move: 10px mono against ~clamp(4rem, 11vw, 9rem)
 * display. The quiet parts only read as quiet because something else is loud.
 */

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Frontispiece() {
  const { name, standfirst, portrait, revision } = aboutContent;
  const hasPortrait = portrait.src.length > 0;

  return (
    <header className="relative overflow-hidden border-b border-hairline">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-20 pt-20 md:px-10 md:pb-28 md:pt-28">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT — the name at full display scale */}
          <div className="lg:col-span-7">
            <motion.div
              custom={0}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mb-10 flex items-center gap-4"
            >
              <span className="h-px w-10 bg-through-line" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                {standfirst}
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={rise}
              initial="hidden"
              animate="show"
              className="font-serif-display font-normal leading-[0.86] tracking-[-0.03em] text-ink"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}
            >
              Sahil
              <span className="block text-graphite">Kumar</span>
            </motion.h1>

            <motion.div
              custom={2}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline pt-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink">
                {revision.stamp}
              </span>
              <span className="h-3 w-px bg-hairline" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                {revision.date}
              </span>
            </motion.div>
          </div>

          {/* RIGHT — the portrait */}
          <motion.div
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            className="lg:col-span-5"
          >
            <div className="group relative aspect-[4/5] w-full overflow-hidden border border-hairline">
              {hasPortrait ? (
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              ) : (
                /**
                 * LOCALHOST ONLY — replace before deploying.
                 * A toned field with a hairline and no label text. A grey box
                 * captioned "Portrait Placeholder" is the exact defect this
                 * rewrite removed from the old Hero.
                 */
                <div aria-hidden="true" className="absolute inset-0 bg-graphite/[0.06]" />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
