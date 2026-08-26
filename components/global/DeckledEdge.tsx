"use client";

import { useId } from "react";

export default function DeckledEdge() {
  const filterId = useId();

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none"
    >
      <svg className="absolute h-0 w-0">
        <defs>
          {/* Microscopic fiber turbulence filter for organic paper tearing */}
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.95"
              numOctaves={3}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Left Deckled Gutter Strip (along the Sewn Spine) */}
      <div
        className="hidden lg:block absolute left-8 top-0 bottom-0 w-[2px] bg-neutral-300/40 dark:bg-neutral-700/40"
        style={{
          filter: `url(#${filterId})`,
          boxShadow: `var(--ldn-shadow-x, 2px) var(--ldn-shadow-y, 2px) 6px rgba(0, 0, 0, 0.04)`,
        }}
      />

      {/* Right Deckled Gutter Strip (along the Wayfinder Index) */}
      <div
        className="hidden lg:block absolute right-12 top-0 bottom-0 w-[2px] bg-neutral-300/30 dark:bg-neutral-700/30"
        style={{
          filter: `url(#${filterId})`,
          boxShadow: `var(--mah-shadow-x, -2px) var(--mah-shadow-y, 2px) 6px rgba(0, 0, 0, 0.04)`,
        }}
      />
    </aside>
  );
}