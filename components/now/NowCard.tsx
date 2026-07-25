'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface NowCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  badge: string;
  onClick: () => void;
}

export default function NowCard({
  icon: Icon,
  title,
  subtitle,
  badge,
  onClick,
}: NowCardProps) {
  return (
    <motion.button
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={onClick}
      className="group w-full rounded-2xl border border-border bg-card p-6 text-left transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">

          <Icon className="h-6 w-6 text-primary" />

        </div>

        <span className="rounded-full border border-border px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          {badge}
        </span>

      </div>

      <div className="mt-8">

        <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
          {title}
        </h3>

        <p className="mt-2 text-muted-foreground">
          {subtitle}
        </p>

      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-4">

        <span className="text-sm text-muted-foreground">
          Click to explore
        </span>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white">

          →

        </div>

      </div>

    </motion.button>
  );
}