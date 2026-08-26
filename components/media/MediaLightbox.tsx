"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
  location?: string;
  year?: string;
}

interface MediaLightboxProps {
  items: MediaItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function MediaLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: MediaLightboxProps) {
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;
  const currentItem = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onNavigate((activeIndex! + 1) % items.length);
      } else if (e.key === "ArrowLeft") {
        onNavigate((activeIndex! - 1 + items.length) % items.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    // Lock background scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-between bg-neutral-950/90 p-4 sm:p-8 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Header Bar */}
          <header
            className="flex w-full max-w-5xl items-center justify-between font-mono text-xs text-neutral-400"
            onClick={(e) => e.stopPropagation()}
          >
            <span>
              Plate {String(activeIndex! + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="rounded px-2.5 py-1 text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              Close [Esc]
            </button>
          </header>

          {/* Center Image Stage */}
          <main
            className="relative flex max-h-[75vh] w-full max-w-5xl flex-1 items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative h-full w-full"
            >
              <Image
                src={currentItem.src}
                alt={currentItem.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain select-none"
                priority
              />
            </motion.div>
          </main>

          {/* Footer Metadata */}
          <footer
            className="w-full max-w-5xl space-y-1 text-center font-mono text-xs text-neutral-400"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.caption && (
              <p className="font-serif italic text-sm text-neutral-200">
                {currentItem.caption}
              </p>
            )}
            <p className="text-[11px] uppercase tracking-wider text-neutral-500">
              {currentItem.location}
              {currentItem.year ? ` · ${currentItem.year}` : ""}
            </p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}