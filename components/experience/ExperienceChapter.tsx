'use client';

import { motion } from 'framer-motion';
import type { WorkRole } from '@/data/experienceData';

interface ExperienceChapterProps {
  role: WorkRole;
  index: number;
}

export default function ExperienceChapter({ role, index }: ExperienceChapterProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 border-t border-border pt-10 md:pt-14"
    >
      {/* Left: index + meta */}
      <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-3">
        <span className="font-mono text-xs text-muted-foreground tracking-widest">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{role.period}</p>
          <p className="text-xs text-muted-foreground">{role.location}</p>
        </div>
      </div>

      {/* Right: content */}
      <div className="md:col-span-9 space-y-5">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            {role.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{role.organization}</p>
        </div>

        <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl">
          {role.summary}
        </p>

        {role.bullets.length > 0 && (
          <ul className="space-y-2.5 pt-2">
            {role.bullets.map((bullet, bulletIndex) => (
              <li
                key={bulletIndex}
                className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}