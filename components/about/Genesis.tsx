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

export function Genesis() {
  const { genesis } = aboutContent;

  return (
    <section className="border-b border-border bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-16 lg:flex-row lg:gap-24"
        >
          {/* Left Column: Sticky Editorial Index */}
          <motion.div variants={item} className="lg:w-1/3 lg:shrink-0">
            <div className="sticky top-32 flex flex-col gap-6">
              <div className="h-px w-12 bg-border" />
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Chapter 01 — Origins
              </p>
              <p className="max-w-[200px] text-xs leading-relaxed text-muted-foreground/60">
                The beginning of the story. Early influences, foundations, and shifts in perspective.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Long-form Reading Experience */}
          <motion.div variants={container} className="lg:w-2/3">
            <motion.h2
              variants={item}
              className="text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-[4rem]"
            >
              {genesis.heading}
            </motion.h2>

            {/* The "Deck" or Subtitle */}
            <motion.p
              variants={item}
              className="mt-10 text-2xl font-light leading-[1.4] text-foreground md:text-3xl lg:text-4xl"
            >
              {genesis.intro}
            </motion.p>

            {/* The Article Body */}
            <div className="mt-16 space-y-8">
              {genesis.paragraphs.map((paragraph, index) => (
                <motion.div key={index} variants={item}>
                  <p
                    className={`text-lg leading-[1.8] tracking-wide md:text-xl ${
                      index === 0
                        ? 'text-foreground first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-7xl first-letter:font-medium first-letter:leading-[0.8]'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {paragraph}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Editorial End Mark (signals the end of the chapter) */}
            <motion.div variants={item} className="mt-20 flex gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-border/60" />
              <div className="h-1.5 w-1.5 rounded-full bg-border/60" />
              <div className="h-1.5 w-1.5 rounded-full bg-border/60" />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}