// components/experience/ExperienceHero.tsx
'use client';

import { motion } from 'framer-motion';

export default function ExperienceHero() {
  return (
    <motion.header 
      className="relative w-full pt-32 pb-12 md:pt-48 md:pb-20 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
        
        {/* Left: Section Number & Massive Title */}
        <div className="lg:col-span-8 flex flex-col gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <span className="font-mono text-xs md:text-sm text-muted-foreground tracking-[0.3em] uppercase">
              Chapter 03
            </span>
            <span className="w-24 h-px bg-foreground/20 block" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-bold tracking-tighter text-foreground font-display leading-[0.9] -ml-2"
          >
            Work &<br />Craft.
          </motion.h1>
        </div>

        {/* Right: Editorial Narrative */}
        <div className="lg:col-span-4 lg:pb-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg md:text-xl text-foreground font-light leading-[1.6] text-pretty">
              I don’t believe any honest work is too small. 
              <span className="text-muted-foreground"> Here is how I built my skills—moving from traditional corporate offices in India, to customer-facing university jobs in London, and down to the manual layout tasks that taught me real-world discipline.</span>
            </p>
          </motion.div>
        </div>

      </div>
    </motion.header>
  );
}