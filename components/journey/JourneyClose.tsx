'use client';

import { motion } from 'framer-motion';
import { journeyClose } from '@/data/journeyData';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function JourneyClose() {
  return (
    <section aria-label="Closing" className="bg-paper text-ink px-6 md:px-8 pb-24 md:pb-32">
      <div className="mx-auto max-w-2xl">
        {/* Constrained to the same measure as the chapters so the resolving
            mark sits on the through-line's axis rather than 5rem to its right. */}
        <div className="max-w-lg">
          <div className="flex justify-center mb-2" aria-hidden="true">
            <svg width="40" height="72" viewBox="0 0 40 72">
              <line
                x1="20"
                y1="0"
                x2="20"
                y2="34"
                stroke="rgb(var(--through-line))"
                strokeWidth="1.5"
              />
              <circle cx="20" cy="34" r="5" fill="rgb(var(--through-line))" />
              <circle
                cx="20"
                cy="34"
                r="11"
                fill="none"
                stroke="rgb(var(--through-line))"
                strokeWidth="0.5"
                opacity="0.4"
              />
            </svg>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <p className="font-serif-display italic text-xl md:text-2xl leading-relaxed mx-auto mb-10">
              &ldquo;{journeyClose.quote}&rdquo;
            </p>

            <div className="space-y-3 max-w-md mx-auto">
              {journeyClose.body.map((paragraph, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}