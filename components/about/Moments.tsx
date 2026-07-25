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
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Moments() {
  return (
    // Note: No overflow-hidden here, otherwise the sticky effect breaks!
    <section className="bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20 border-b border-border">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Editorial Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-24 md:mb-32 max-w-3xl"
        >
          <motion.p
            variants={item}
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
          >
            Chapter 03 — Milestones
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-6 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-7xl"
          >
            Small Moments.
            <br />
            Lasting Lessons.
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-10 text-xl font-light leading-relaxed text-muted-foreground md:text-2xl"
          >
            Some experiences change us quietly. Looking back, these are the isolated
            moments that permanently shifted how I think, work, and see the world.
          </motion.p>
        </motion.div>

        {/* Sticky Stacking Gallery */}
        <div className="relative pb-[10vh]">
          {aboutContent.moments.map((moment, index) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              // The magic stacking effect
              className="sticky mb-8 md:mb-12 flex flex-col justify-between overflow-hidden rounded-t-2xl border-x border-t border-border bg-background p-8 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] md:flex-row md:p-16"
              style={{
                top: `calc(10vh + ${index * 1.5}rem)`, 
                zIndex: index + 10,
              }}
            >
              {/* Left Side: Massive Index & Title */}
              <div className="mb-12 flex max-w-xl flex-col md:mb-0 md:w-1/2">
                <span className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Moment {(index + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
                  {moment.title}
                </h3>
              </div>

              {/* Right Side: The Lesson */}
              <div className="flex flex-col justify-end md:w-5/12">
                <div className="border-l-2 border-foreground pl-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                    The Lesson
                  </p>
                  <p className="text-lg leading-[1.8] text-foreground md:text-xl">
                    {moment.lesson}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}