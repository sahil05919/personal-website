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
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Principles() {
  return (
    <section className="border-b border-border bg-background py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
        
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Mental Architecture
            </p>
            <h2 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
              How I Try To Think.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:text-right">
            The core operating principles that guide how I solve problems, analyze systems, and navigate life.
          </p>
        </motion.div>

        {/* The Strict Row Directory */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="border-t-2 border-foreground"
        >
          {aboutContent.principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              variants={item}
              className="group grid grid-cols-1 gap-6 border-b border-border py-12 transition-colors duration-500 hover:bg-muted/20 md:grid-cols-12 md:gap-8 md:py-16"
            >
              {/* Column 1: Technical Index */}
              <div className="md:col-span-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-foreground">
                  SYS.{(index + 1).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Column 2: Heavy Title */}
              <div className="md:col-span-4">
                <h3 className="text-3xl font-medium tracking-tight text-foreground lg:text-4xl">
                  {principle.title}
                </h3>
              </div>

              {/* Column 3: Constrained Description */}
              <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
                <p className="text-lg leading-[1.8] text-muted-foreground md:text-xl">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}