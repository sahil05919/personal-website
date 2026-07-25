'use client';

import { motion } from 'framer-motion';

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
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  // We are hardcoding the highly optimized, punchy copy directly into the component 
  // to guarantee the layout never breaks and the impact is immediate.
  const optimizedContent = {
    eyebrow: "Sahil Kumar — Based in London, UK",
    headlineLine1: "Making sense of",
    headlineLine2: "complex data,",
    headlineLine3: "business systems,",
    headlineLine4: "and human stories.",
    subtitle: "I'm a Business & Data Analyst who thrives on solving problems and optimizing operations. This space is more than a résumé—it's the ongoing story of my work, principles, and the lessons I'm learning along the way.",
    focusAreas: [
      "Data Analytics & Reporting",
      "Business Operations",
      "Problem Solving",
      "Continuous Learning"
    ]
  };

  return (
    <section className="flex min-h-[90vh] flex-col justify-center bg-background px-6 py-24 md:px-12 lg:px-20 border-b border-border">
      <div className="mx-auto w-full max-w-7xl">
        
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12"
        >
          
          {/* LEFT COLUMN: The Massive Hook */}
          <div className="flex flex-col justify-center lg:col-span-7 xl:col-span-8">
            <motion.div variants={item} className="mb-10 flex items-center gap-4">
              <div className="h-px w-8 bg-foreground" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground">
                {optimizedContent.eyebrow}
              </p>
            </motion.div>

            {/* The Unforgettable Typographic Statement */}
            <motion.h1 
              variants={item}
              className="text-5xl font-medium tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[0.95]"
            >
              {optimizedContent.headlineLine1} <br />
              <span className="text-muted-foreground">{optimizedContent.headlineLine2}</span> <br />
              {optimizedContent.headlineLine3} <br />
              <span className="text-muted-foreground">{optimizedContent.headlineLine4}</span>
            </motion.h1>

            <motion.p 
              variants={item}
              className="mt-12 max-w-2xl text-lg font-light leading-[1.8] text-foreground md:text-xl lg:text-2xl lg:leading-[1.6]"
            >
              {optimizedContent.subtitle}
            </motion.p>
          </div>

          {/* RIGHT COLUMN: The Structural Index & Portrait */}
          <div className="flex flex-col justify-end gap-12 lg:col-span-5 xl:col-span-4 lg:pl-8">
            
            {/* The Core Focus Directory */}
            <motion.div variants={item} className="w-full">
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Core Focus
              </p>
              <ul className="flex flex-col border-t border-border">
                {optimizedContent.focusAreas.map((area, index) => (
                  <li 
                    key={index}
                    className="flex items-center justify-between border-b border-border py-4"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                      {area}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground/50">
                      0{index + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* The Bulletproof Portrait Container */}
            <motion.div variants={item} className="w-full">
              <div className="group relative aspect-[4/5] w-full overflow-hidden bg-muted/30 border border-border p-2">
                <div className="absolute inset-2 flex items-center justify-center bg-background/50 backdrop-blur-sm transition-all duration-500 group-hover:bg-transparent border border-border/50">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground transition-opacity duration-500 group-hover:opacity-0">
                    Portrait Placeholder
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Fig 01.
                </span>
                <div className="h-px w-16 bg-border" />
              </div>
            </motion.div>

          </div>

        </motion.div>
        
      </div>
    </section>
  );
}