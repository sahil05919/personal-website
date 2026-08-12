'use client';

import { motion } from 'framer-motion';

import { aboutContent } from '@/data/profileContent';
import { GRID, MARGIN_NOTE, SHELL } from './layout';

/**
 * FRONT MATTER.
 *
 * This was six 13rem cards with a label pinned to the top, a value floating in
 * the middle, an index at the bottom and an arrow in the corner that rotated on
 * hover. It had every affordance of a button and no destination, and the arrow
 * was the worst of it — a directional signifier pointing nowhere.
 *
 * A ledger instead: hairline rows, mono label in the margin column, value in
 * Fraunces at the reading measure. Nothing here looks clickable because nothing
 * here is clickable, and the vertical space is set by the type rather than by a
 * min-height, so there is no dead air inside a row.
 *
 * It opens the page because this is front matter — the surface facts a reader
 * needs before the essay can mean anything.
 */

const row = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export function Facts() {
  const { facts } = aboutContent;

  return (
    <section className="border-b border-hairline py-20 md:py-24">
      <div className={SHELL}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`${GRID} mb-12 md:mb-14`}
        >
          <p className={`${MARGIN_NOTE} mb-3 lg:mb-0 lg:pt-3 lg:text-right`}>Front matter</p>
          <h2 className="font-serif-display text-[1.75rem] font-normal tracking-[-0.02em] text-ink md:text-[2.25rem]">
            The plain facts.
          </h2>
        </motion.div>

        <motion.dl
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="border-t border-hairline"
        >
          {facts.map((fact) => (
            <motion.div
              key={fact.label}
              variants={row}
              className={`${GRID} border-b border-hairline py-5 md:py-6`}
            >
              <dt className={`${MARGIN_NOTE} lg:pt-[0.45rem] lg:text-right`}>{fact.label}</dt>
              <dd className="mt-1 font-serif-display text-[1.375rem] font-normal leading-[1.25] tracking-[-0.01em] text-ink md:text-[1.625rem] lg:mt-0">
                {fact.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
