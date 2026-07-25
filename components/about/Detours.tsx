'use client';

import { motion } from 'framer-motion';
import { aboutContent } from '@/data/profileContent';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

export function Detours() {
  return (
    // Subtle background shift to signal a different psychological chapter
    <section className="border-b border-border bg-muted/20 px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-24 md:mb-32 flex flex-col justify-between gap-10 md:flex-row md:items-end"
        >
          <motion.div variants={item} className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Chapter 04 — Corrections
            </p>
            <h2 className="mt-6 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-7xl">
              Growth Isn&apos;t Linear.
            </h2>
          </motion.div>
          <motion.p
            variants={item}
            className="max-w-sm text-lg font-light leading-relaxed text-muted-foreground md:text-right"
          >
            Every setback forced me to rethink something fundamental. Looking back, the
            course correction mattered far more than the initial mistake.
          </motion.p>
        </motion.div>

        {/* The Post-Mortem Case Files */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-12 md:space-y-16"
        >
          {aboutContent.setbacks.map((setback, index) => (
            <motion.div
              key={setback.title}
              variants={item}
              className="group border-l-4 border-muted-foreground/20 bg-background p-8 transition-colors duration-500 hover:border-foreground md:p-12 lg:p-16 shadow-sm"
            >
              {/* Top Row: Context & Title */}
              <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-border pb-8">
                <div>
                  <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Case File {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl font-medium tracking-tight text-foreground md:text-4xl">
                    {setback.title}
                  </h3>
                </div>
                <div className="shrink-0">
                  <span className="inline-block rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                    {setback.context}
                  </span>
                </div>
              </div>

              {/* Bottom Row: The Analytical Grid */}
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
                
                {/* Problem Column */}
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500/80" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      The Problem
                    </p>
                  </div>
                  <p className="text-base leading-[1.8] text-foreground md:text-lg">
                    {setback.rootCause}
                  </p>
                </div>

                {/* Adjustment Column */}
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500/80" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      The Adjustment
                    </p>
                  </div>
                  <p className="text-base leading-[1.8] text-foreground md:text-lg">
                    {setback.correction}
                  </p>
                </div>

                {/* Synthesis Column */}
                <div className="rounded-lg bg-muted/30 p-6 md:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground">
                      Synthesis
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Progress rarely comes from avoiding mistakes. It comes
                    from adapting, improving, and continuing anyway.
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}