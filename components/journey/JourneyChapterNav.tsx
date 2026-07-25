'use client';

import { motion } from 'framer-motion';
import { journeySnapshot } from '@/data/journeyData';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function JourneySnapshot() {
  const { points, summary } = journeySnapshot;

  return (
    <section aria-labelledby="snapshot-heading" className="bg-paper text-ink px-6 md:px-8 pb-16 md:pb-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mx-auto max-w-2xl"
      >
        <h2 id="snapshot-heading" className="font-mono text-[11px] tracking-[0.06em] uppercase text-graphite mb-8">
          My journey at a glance
        </h2>

        <div className="overflow-x-auto">
          <div className="relative min-w-[420px]">
            <div
              className="absolute left-0 right-0 top-[5px] h-[1.5px] bg-through-line/40"
              aria-hidden="true"
            />
            <div className="relative flex justify-between">
              {points.map((point) => (
                <div key={point.year} className="flex flex-col items-center text-center px-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-through-line mb-3 ring-4 ring-paper"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11px] text-graphite mb-1">{point.year}</span>
                  <span className="text-[13px] text-ink whitespace-nowrap">{point.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="font-mono text-[12px] text-graphite text-center mt-8 tracking-wide">
          {summary}
        </p>
      </motion.div>
    </section>
  );
}