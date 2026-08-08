'use client';

import { motion } from 'framer-motion';

import { aboutContent } from '@/data/profileContent';

/**
 * THE FACTS — as cards.
 *
 * This is where the old page's card treatment genuinely belongs. Cards are for
 * discrete, comparable, scannable items. The old site put PROSE in cards, which
 * fragmented reading; this puts DATA in them, which is what they're for.
 *
 * The interaction is lifted directly from the old Interests section — the one
 * that "pops": mono index top-left, arrow top-right rotating on hover, full
 * colour inversion to ink/paper over 500ms. It worked. It's back.
 */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Facts() {
  const { facts, revision } = aboutContent;

  return (
    <section className="border-t border-hairline px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <h2 className="font-serif-display text-3xl font-normal tracking-[-0.02em] text-ink md:text-5xl">
            The plain facts.
          </h2>
          <p className="max-w-xs font-mono text-[10px] uppercase leading-[2] tracking-[0.25em] text-graphite">
            {revision.promise}
          </p>
        </motion.div>

        <motion.dl
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {facts.map((fact, index) => (
            <motion.div
              key={fact.label}
              variants={card}
              className="group flex min-h-[13rem] flex-col justify-between border border-hairline p-7 transition-colors duration-500 hover:bg-ink md:p-8"
            >
              <div className="flex items-start justify-between">
                <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite transition-colors duration-500 group-hover:text-paper/60">
                  {fact.label}
                </dt>
                <span
                  aria-hidden="true"
                  className="text-graphite/40 transition-all duration-500 group-hover:-rotate-45 group-hover:text-paper/60"
                >
                  &rarr;
                </span>
              </div>

              <dd className="mt-10 font-serif-display text-2xl font-normal leading-[1.15] tracking-[-0.01em] text-ink transition-colors duration-500 group-hover:text-paper md:text-[1.75rem]">
                {fact.value}
              </dd>

              <span
                aria-hidden="true"
                className="mt-6 font-mono text-[10px] tracking-[0.25em] text-graphite/50 transition-colors duration-500 group-hover:text-paper/40"
              >
                {(index + 1).toString().padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
