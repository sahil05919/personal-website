'use client';

import { motion } from 'framer-motion';

interface StatusChipProps {
  statusText: string;
  locationText: string;
}

export default function StatusChip({
  statusText,
  locationText,
}: StatusChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 shadow-premium"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>

      <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
        {statusText}
        <span className="mx-1 text-border">•</span>
        {locationText}
      </span>
    </motion.div>
  );
}