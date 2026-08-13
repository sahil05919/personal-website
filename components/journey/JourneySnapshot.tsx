'use client';

import { motion } from 'framer-motion';
import { journeySnapshot } from '@/data/journeyData';

/**
 * The mobile/tablet counterpart to JourneyRail. Below `lg` there's no room
 * for a sidebar, and a sticky element competing with a narrow viewport for
 * scroll attention is exactly the "forcing a desktop layout onto mobile"
 * the visual refinement brief warned against — so this is deliberately
 * static: no scroll-tracking, no sticky positioning, just a calm block
 * read once after the hero. `<dl>` because year → label is genuinely
 * label/value data, the same reasoning Experience's ledger uses elsewhere
 * on the site.
 */
// Ease unified to the site's signature settle curve — see JourneyHero.tsx.
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function JourneySnapshot() {
  return (
    <section aria-label={journeySnapshot.heading} className="lg:hidden pb-14 md:pb-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-measure"
      >
        <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-graphite mb-5">
          {journeySnapshot.heading}
        </p>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
          {journeySnapshot.points.map((point) => (
            <div key={point.year}>
              <dt className="font-mono text-[11px] text-graphite mb-0.5">{point.year}</dt>
              <dd className="text-[13px] text-ink leading-snug">{point.label}</dd>
            </div>
          ))}
        </dl>

        <p className="font-reading italic text-[13px] leading-relaxed text-graphite mt-6">
          {journeySnapshot.summary}
        </p>
      </motion.div>
    </section>
  );
}
