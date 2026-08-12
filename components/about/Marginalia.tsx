'use client';

import { motion } from 'framer-motion';

import { aboutContent } from '@/data/profileContent';
import { MARGIN_NOTE, SHELL_WIDE } from './layout';

/**
 * MARGINALIA — the small things.
 *
 * The brief said explicitly: not another five-card grid. So this is a spread,
 * not a grid. Five notes on a twelve-column field, each with a different start
 * and span, so no two items share a left edge and no row reads as a row. The
 * asymmetry is the whole treatment — an even arrangement puts this straight
 * back into card territory.
 *
 * One item runs the full width at display scale (the two players). It is the
 * section's only loud line, and it sits in the middle so the reader hits a
 * swell and then drops back to quiet before the essay resumes.
 *
 * No boxes, no borders on the items, no hover states, no icons. The section is
 * bounded by two hairlines and nothing else. The block also widens to 60rem
 * here — a deliberate spread against the 52rem manuscript block either side of
 * it, which is what makes the page feel like it opens out for a moment.
 *
 * The 12-column placement is applied as an inline `gridColumn` because Tailwind
 * cannot generate class names from data. Below `lg` the parent is not a grid,
 * so the inline value is simply inert and the items stack.
 */

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const field = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Marginalia() {
  const { eyebrow, heading, items } = aboutContent.marginalia;

  return (
    <section className="border-y border-hairline py-20 md:py-28">
      <div className={SHELL_WIDE}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-10 bg-through-line" />
            <span className={MARGIN_NOTE}>{eyebrow}</span>
          </div>
          <h2 className="font-serif-display text-[1.75rem] font-normal tracking-[-0.02em] text-ink md:text-[2.25rem]">
            {heading}
          </h2>
        </motion.div>

        <motion.dl
          variants={field}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-14 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 lg:space-y-0"
        >
          {items.map(({ label, value, start, span, scale }) => (
            <motion.div
              key={label}
              variants={item}
              style={{ gridColumn: `${start} / span ${span}` }}
            >
              <dt className={`${MARGIN_NOTE} mb-3`}>{label}</dt>
              <dd
                className={
                  scale === 'lg'
                    ? 'font-serif-display text-[2rem] font-normal leading-[1.1] tracking-[-0.025em] text-ink md:text-[3rem] lg:text-[3.5rem]'
                    : 'font-serif-display text-[1.5rem] font-normal leading-[1.2] tracking-[-0.015em] text-ink md:text-[1.875rem]'
                }
              >
                {value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
