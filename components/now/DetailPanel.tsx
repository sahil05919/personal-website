'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { nowCards } from '@/data/nowData';

interface DetailPanelProps {
  selectedId: string | null;
  onClose: () => void;
}

export default function DetailPanel({
  selectedId,
  onClose,
}: DetailPanelProps) {
  const card = nowCards.find((item) => item.id === selectedId);
  const Icon = card?.icon;
  return (
    <AnimatePresence>
      {card && (
        <>
          {/* Background */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 40,
              scale: 0.96,
            }}
            transition={{
              duration: 0.35,
            }}
            className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-background shadow-2xl"
          >
            <div className="p-8">

              <div className="flex items-start justify-between">

                <div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">

                    {Icon && <Icon className="h-8 w-8 text-primary" />}

                  </div>

                  <h2 className="mt-6 text-3xl font-bold">
                    {card.title}
                  </h2>

                  <p className="mt-2 text-muted-foreground">
                    {card.subtitle}
                  </p>

                </div>

                <button
                  onClick={onClose}
                  className="rounded-full border border-border p-2 transition hover:bg-card"
                >
                  <X className="h-5 w-5" />
                </button>

              </div>

              <div className="mt-10 space-y-4">

                {card.content.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-2 h-2 w-2 rounded-full bg-primary" />

                    <p className="leading-7 text-muted-foreground">
                      {item}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}