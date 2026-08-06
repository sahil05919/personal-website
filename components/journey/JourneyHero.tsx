'use client';

import { motion } from 'framer-motion';
import { journeyIntro } from '@/data/journeyData';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function JourneyHero() {
  return (
    <section
      aria-labelledby="journey-title"
      /* Navbar clearance now lives in the layout's <main> (pt-[72px]); this
         padding is editorial rhythm only. */
      className="bg-paper text-ink px-6 md:px-8 pt-14 pb-20 md:pt-16 md:pb-24"
    >
      <motion.div
        initial="hidden"
        /* Above the fold — animate on mount, not on scroll into view. */
        animate="show"
        variants={fadeUp}
        className="mx-auto max-w-2xl"
      >
        <p className="font-mono text-[11px] tracking-[0.06em] text-graphite mb-6">
          {journeyIntro.eyebrow}
        </p>

        <h1
          id="journey-title"
          className="font-serif-display font-medium text-[2.25rem] md:text-[3rem] leading-[1.12] tracking-tight mb-6 max-w-lg"
        >
          {journeyIntro.title}
        </h1>

        <p className="font-serif-display italic text-lg md:text-xl leading-relaxed text-graphite mb-10 max-w-lg">
          {journeyIntro.subtitle}
        </p>

        <div className="space-y-4 max-w-lg">
          {journeyIntro.body.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}