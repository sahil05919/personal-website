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

export function Interests() {
  return (
    <section className="border-b border-border bg-background py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
        
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-2xl border-b border-border pb-12"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Interests & Obsessions
          </p>
          <h2 className="mt-6 text-3xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            What keeps me curious.
          </h2>
          <p className="mt-8 text-lg font-light leading-relaxed text-muted-foreground">
            The list always changes. Here is where my attention naturally gravitates outside of work hours.
          </p>
        </motion.div>

        {/* Bulletproof CSS Columns Layout */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          // Using CSS columns instead of Flex/Grid guarantees the layout never breaks
          className="columns-1 gap-8 md:columns-2 lg:columns-3 xl:columns-4"
        >
          {aboutContent.interests.map((interest, index) => (
            <motion.div
              key={interest}
              variants={item}
              className="group mb-8 break-inside-avoid rounded-lg border border-border bg-muted/10 p-8 transition-colors duration-500 hover:bg-foreground hover:text-background"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-background/60">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-muted-foreground/30 transition-transform duration-500 group-hover:-rotate-45 group-hover:text-background/60">
                  →
                </span>
              </div>

              <h3 className="text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-background md:text-3xl">
                {interest}
              </h3>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}