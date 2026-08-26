"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { destinations } from "@/data/navigation";

export default function PageTurnPeel() {
  const pathname = usePathname();
  const router = useRouter();
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Find next chapter index
  const currentIndex = destinations.findIndex((d) => d.href === pathname);
  const nextDest = currentIndex >= 0 && currentIndex < destinations.length - 1 ? destinations[currentIndex + 1] : null;

  if (!nextDest) return null;

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const offset = Math.max(0, Math.min(180, window.innerWidth - e.clientX));
    setDragOffset(offset);
  };

  const handlePointerUp = () => {
    if (dragOffset > 90) {
      router.push(nextDest.href);
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const peelWidth = isDragging ? dragOffset : 0;

  return (
    <aside
      aria-label="Tactile Page Turn Peel"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="fixed right-0 top-1/3 bottom-1/3 z-40 hidden w-10 cursor-grab active:cursor-grabbing xl:block select-none"
    >
      {/* Visual Curl / Peel Container */}
      <div
        className="absolute right-0 top-0 bottom-0 pointer-events-none transition-all duration-75"
        style={{
          width: `${Math.max(peelWidth, 8)}px`,
          background: peelWidth > 10 ? "linear-gradient(to left, rgba(0,0,0,0.06), transparent)" : undefined,
        }}
      >
        {/* Revealed Next Leaf Preview */}
        {peelWidth > 40 && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2 whitespace-nowrap rounded border border-neutral-300/80 bg-neutral-100/90 px-3 py-1.5 font-mono text-[11px] text-neutral-800 shadow-md backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-200">
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 block">
              Release to Turn →
            </span>
            <span className="font-serif italic font-medium">{nextDest.label}</span>
          </div>
        )}

        {/* Paper Crease Spine Highlight */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[1.5px] transition-colors ${
            peelWidth > 10 ? "bg-amber-600/60 dark:bg-amber-400/60 shadow-sm" : "bg-transparent"
          }`}
        />
      </div>
    </aside>
  );
}