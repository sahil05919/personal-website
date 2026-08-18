'use client';

import { motion } from 'framer-motion';
import { journeySnapshot, snapshotToChapterId } from '@/data/journeyData';
import { journeySnapshotHi } from '@/data/hinglish';
import { useVariant } from '@/hooks/use-reading-mode';

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
  const snapshot = useVariant(journeySnapshot, journeySnapshotHi);

  return (
    <section aria-label={snapshot.heading} className="lg:hidden pb-14 md:pb-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-measure"
      >
        <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-graphite mb-5">
          {snapshot.heading}
        </p>

        {/* Each pair jumps to its chapter, exactly as the desktop rail does.
            Wrapping the <a> around both <dt> and <dd> is not valid — a <dl>
            may only contain <div>, <dt> and <dd> — so the link sits inside
            the <dd> and the year moves into it, which keeps the markup legal
            and still gives a thumb the whole label to hit. */}
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1">
          {snapshot.points.map((point, i) => {
            const chapterId = snapshotToChapterId[i];

            return (
              <div key={point.year}>
                <dt className="sr-only">{point.year}</dt>
                <dd>
                  {chapterId ? (
                    <a
                      href={`#${chapterId}`}
                      className="group block rounded-[2px] py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-through-line focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                      <span className="mb-0.5 block font-mono text-[11px] text-graphite transition-colors duration-300 group-hover:text-through-line">
                        {point.year}
                      </span>
                      <span className="block text-[13px] leading-snug text-ink">
                        {point.label}
                      </span>
                    </a>
                  ) : (
                    <span className="block py-2">
                      <span className="mb-0.5 block font-mono text-[11px] text-graphite">
                        {point.year}
                      </span>
                      <span className="block text-[13px] leading-snug text-ink">
                        {point.label}
                      </span>
                    </span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="font-reading italic text-[13px] leading-relaxed text-graphite mt-6">
          {snapshot.summary}
        </p>
      </motion.div>
    </section>
  );
}
