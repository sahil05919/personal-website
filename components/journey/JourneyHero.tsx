'use client';

import { motion } from 'framer-motion';
import { journeyIntro } from '@/data/journeyData';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function JourneyHero() {
  return (
    <section aria-labelledby="journey-title" className="bg-paper text-ink px-6 md:px-8 pt-[128px] pb-20 md:pt-[136px] md:pb-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mx-auto max-w-2xl"
      >
        <p className="font-mono text-[11px] tracking-[0.06em] text-graphite mb-6">
          {journeyIntro.eyebrow}
        </p>

        <h1 className="font-serif-display font-medium text-[2.25rem] md:text-[3rem] leading-[1.12] tracking-tight mb-6">
          {journeyIntro.title}
        </h1>

        <p className="font-serif-display italic text-lg md:text-xl leading-relaxed text-graphite mb-10 max-w-xl">
          {journeyIntro.subtitle}
        </p>

        <div className="space-y-4 max-w-lg">
          {journeyIntro.body.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-graphite">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}