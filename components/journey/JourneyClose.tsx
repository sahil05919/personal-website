'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { journeyClose, journeyExit } from '@/data/journeyData';
import { journeyCloseHi, journeyExitHi } from '@/data/hinglish';
import { useVariant } from '@/hooks/use-reading-mode';

// Ease unified to the site's signature settle curve — see JourneyHero.tsx.
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function JourneyClose() {
  const close = useVariant(journeyClose, journeyCloseHi);
  const exit = useVariant(journeyExit, journeyExitHi);

  return (
    <section aria-label="Closing" className="pb-24 md:pb-32">
      <div>
        {/* Constrained to the same measure as the chapters so the resolving
            mark sits on the through-line's axis rather than 5rem to its right. */}
        <div className="max-w-measure">
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
            <p className="font-serif-display italic text-fluid-claim font-normal leading-[1.35] mx-auto mb-10 text-balance">
              &ldquo;{close.quote}&rdquo;
            </p>

            <div className="space-y-3 max-w-md mx-auto">
              {close.body.map((paragraph, i) => (
                <p key={i} className="font-reading text-fluid-aside text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* The quiet hand-off to /now. Not a CTA — no arrow-button
              language, no "view my now page." Reads as a page turning:
              the story continuing somewhere else, not ending here. */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.15 }}
            className="mt-16 pt-10 border-t border-hairline text-center"
          >
            <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-graphite mb-3">
              {exit.eyebrow}
            </p>
            <Link
              href={exit.href}
              className="rounded-sm font-reading italic text-[15px] md:text-base text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-through-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
            >
              {exit.line}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
