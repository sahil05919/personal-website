'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

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

export function JourneyCTA() {
  return (
    <section className="bg-background">
      <Link 
        href="/journey" 
        className="group block w-full border-b border-border transition-colors duration-500 hover:bg-foreground"
      >
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-12 px-6 py-24 md:flex-row md:items-end md:px-12 md:py-32 lg:px-20"
        >
          
          {/* Left Side: The Headline */}
          <motion.div variants={item} className="max-w-2xl transition-colors duration-500 group-hover:text-background">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground transition-colors duration-500 group-hover:text-background/60">
              Chapter 02
            </p>
            <h2 className="text-5xl font-medium tracking-tight md:text-6xl lg:text-[5rem] lg:leading-[1.1]">
              Every person has a story.
              <span className="block text-muted-foreground transition-colors duration-500 group-hover:text-background/70">
                Here&apos;s mine.
              </span>
            </h2>
          </motion.div>

          {/* Right Side: Description & Arrow */}
          <motion.div variants={item} className="flex max-w-sm flex-col items-start gap-8 md:items-end md:text-right">
            <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-background/70">
              This page explained who I am. The next chapter explores how I became this person—from growing up in India to moving to London, embracing change, and continuing to build a life shaped by curiosity.
            </p>
            
            <div className="flex items-center gap-4 text-foreground transition-colors duration-500 group-hover:text-background">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                Turn Page
              </span>
              <span className="text-3xl font-light transition-transform duration-500 group-hover:translate-x-4">
                →
              </span>
            </div>
          </motion.div>

        </motion.div>
      </Link>
    </section>
  );
}