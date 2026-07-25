// components/experience/ExperienceCTA.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ExperienceCTA() {
  return (
    <section className="w-full py-24 md:py-32 relative">
      
      {/* Editorial End Mark (Tombstone) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background flex items-center justify-center">
        <span className="w-2 h-2 rotate-45 bg-foreground/20 block" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 mt-16"
      >
        <Link
          href="/projects"
          className="group relative flex flex-col md:flex-row md:items-end justify-between gap-12 overflow-hidden focus:outline-none"
        >
          {/* Text Content */}
          <div className="space-y-6 md:space-y-10">
            <div className="flex items-center gap-6">
              <span className="w-12 h-px bg-foreground/20 block group-hover:w-24 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="font-mono text-xs md:text-sm text-muted-foreground tracking-[0.3em] uppercase">
                Next Chapter // 04
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-medium tracking-tighter text-foreground font-display transition-colors duration-700 group-hover:text-foreground/70 leading-[0.9]">
              Case Studies
              <span className="block text-muted-foreground font-light italic mt-2 md:mt-4 text-3xl md:text-5xl lg:text-[5rem]">
                & Deep Dives.
              </span>
            </h2>
          </div>

          {/* Premium Animated Button */}
          <div className="flex items-center justify-center w-20 h-20 md:w-32 md:h-32 rounded-full border border-border group-hover:border-foreground group-hover:bg-foreground transition-colors duration-700 shrink-0 overflow-hidden relative">
            <div className="relative flex items-center justify-center w-full h-full text-foreground group-hover:text-background transition-colors duration-700">
              <ArrowRight className="w-6 h-6 md:w-10 md:h-10 absolute transform -translate-x-16 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <ArrowRight className="w-6 h-6 md:w-10 md:h-10 absolute transform translate-x-0 opacity-100 group-hover:translate-x-16 group-hover:opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}