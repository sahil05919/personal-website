"use client";

import { usePathname } from "next/navigation";
import { useDogEars } from "@/hooks/use-dog-ears";

export default function DogEar() {
  const pathname = usePathname();
  const { isDogEared, toggleCurrent, mounted } = useDogEars(pathname);

  if (!mounted) return null;

  const folded = isDogEared(pathname);

  return (
    <aside
      aria-label="Dog-ear bookmark"
      className="fixed right-0 top-0 z-[100] cursor-pointer select-none group"
      onClick={toggleCurrent}
      title={folded ? "Remove bookmark (folded)" : "Dog-ear this page"}
    >
      <div className="relative h-14 w-14 overflow-hidden">
        <svg
          viewBox="0 0 56 56"
          className="h-full w-full drop-shadow-md transition-all duration-300 ease-out"
        >
          {/* Paper backing shadow underneath fold */}
          <polygon
            points={folded ? "56,0 12,0 56,44" : "56,0 34,0 56,22"}
            className={
              folded
                ? "fill-neutral-900/20 dark:fill-black/50"
                : "fill-neutral-900/5 group-hover:fill-neutral-900/10 dark:fill-white/5 dark:group-hover:fill-white/10"
            }
          />

          {/* The folded paper flap */}
          <polygon
            points={
              folded
                ? "12,0 56,44 12,44"
                : "34,0 56,22 34,22"
            }
            className={`transition-all duration-300 ease-out ${
              folded
                ? "fill-amber-600 dark:fill-amber-500"
                : "fill-neutral-300/80 dark:fill-neutral-700/80 group-hover:fill-neutral-400 dark:group-hover:fill-neutral-600"
            }`}
          />

          {/* Diagonal crease line */}
          <line
            x1={folded ? "12" : "34"}
            y1="0"
            x2="56"
            y2={folded ? "44" : "22"}
            className={`transition-all duration-300 ${
              folded
                ? "stroke-amber-800/40 dark:stroke-amber-300/40"
                : "stroke-neutral-400/60 dark:stroke-neutral-500/60"
            }`}
            strokeWidth="1"
          />
        </svg>
      </div>
    </aside>
  );
}