'use client';

import { motion } from 'framer-motion';
import { aboutContent } from '@/data/profileContent';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Snapshot() {
  return (
    <section className="border-b border-border bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Header */}
          <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <motion.div variants={item}>
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Snapshot
              </p>
              <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
                A few quick facts.
              </h2>
            </motion.div>
            <motion.p
              variants={item}
              className="max-w-xs text-sm leading-relaxed text-muted-foreground"
            >
              Before the story continues, here is a little context to set the stage.
            </motion.p>
          </div>

          {/* Facts Grid: Bulletproof layout */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4"
          >
            {aboutContent.snapshot.map((itemData) => (
              <motion.div
                key={itemData.label}
                variants={item}
                className="relative border-t border-border/50 pt-6 transition-colors duration-500 hover:border-foreground"
              >
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {itemData.label}
                </p>
                <h3 className="text-lg font-medium text-foreground md:text-xl">
                  {itemData.value}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Fun Fact: Bulletproof flex layout to prevent text squishing */}
          <motion.div
            variants={item}
            className="mt-32 flex flex-col gap-8 border-t border-border pt-16 lg:flex-row lg:gap-16"
          >
            <div className="shrink-0 lg:w-1/4">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                {aboutContent.funFact.title}
              </p>
            </div>
            <div className="lg:w-3/4">
              <p className="text-2xl font-light leading-[1.4] tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-[1.3]">
                &quot;{aboutContent.funFact.text}&quot;
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}