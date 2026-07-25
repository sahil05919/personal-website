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

export function Mission() {
  const { mission } = aboutContent;

  return (
    <section className="border-b border-border bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          // Slightly tightened the gap to ensure both columns fit perfectly on all screens
          className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-16"
        >
          {/* Left Column: The Sticky Pull Quote */}
          {/* The min-w-0 class is the magic fix that prevents the text from blowing out the grid */}
          <div className="min-w-0 lg:col-span-5 xl:col-span-6">
            <motion.div variants={item} className="sticky top-32">
              <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                The Mission
              </p>
              {/* Added break-words and scaled the typography so it fits naturally */}
              <h2 className="break-words text-4xl font-light leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-5xl xl:text-6xl">
                &quot;This website isn&apos;t just a portfolio.
                <br className="hidden lg:block" />
                <span className="italic text-muted-foreground">
                  {' '}It&apos;s becoming the story of my life.&quot;
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Right Column: The Narrative & Looking Ahead */}
          <div className="flex min-w-0 flex-col gap-16 lg:col-span-7 lg:col-start-6 xl:col-span-5 xl:col-start-8 lg:pt-16">
            
            {/* The Mission Paragraphs */}
            <motion.div variants={container} className="space-y-8">
              {mission.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={item}
                  className="text-lg leading-[1.8] text-muted-foreground md:text-xl"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Looking Ahead Section */}
            <motion.div variants={item} className="border-t border-border pt-12">
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-foreground">
                Looking Ahead
              </p>
              <p className="text-xl font-light leading-relaxed text-foreground md:text-2xl lg:text-2xl xl:text-3xl xl:leading-[1.5]">
                If someone visits this website ten or twenty years from now, I hope they won&apos;t just discover where I worked. I hope they&apos;ll discover how I thought, what I valued, what I learned, and the person I was becoming along the way.
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}