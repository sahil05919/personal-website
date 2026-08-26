"use client";

import { useId, useMemo, useState } from "react";

export const FIGURE_WIDE = 560;
export const FIGURE_TALL = 140;

interface ResolveFigureProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  interactive?: boolean;
  layout?: number;
  seed?: number;
  width?: number | string;
  height?: number | string;
}

export default function ResolveFigure({
  className = "",
  interactive = true,
  layout,
  seed,
  ...props
}: ResolveFigureProps) {
  const [progress, setProgress] = useState(0.2);
  const [isHovered, setIsHovered] = useState(false);
  const filterId = useId();

  // 18 deterministic fragment positions
  const nodes = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const radius = 25 + ((i * 7) % 25);
      return {
        id: i,
        initialX: 50 + Math.cos(angle) * (radius * 1.6),
        initialY: 50 + Math.sin(angle) * (radius * 0.7),
        targetX: 8 + (i / 17) * 84,
      };
    });
  }, []);

  const activeProgress = isHovered && interactive ? Math.max(progress, 0.95) : progress;

  return (
    <figure className={`my-8 select-none ${className}`} {...props}>
      <div
        className={`relative h-28 w-full max-w-lg rounded border border-neutral-200/80 bg-neutral-100/40 p-4 transition-colors dark:border-neutral-800 dark:bg-neutral-900/40 ${
          interactive ? "cursor-ew-resize hover:border-neutral-300" : ""
        }`}
        onMouseEnter={() => interactive && setIsHovered(true)}
        onMouseLeave={() => interactive && setIsHovered(false)}
        onMouseMove={(e) => {
          if (!interactive) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          setProgress(x);
        }}
        role={interactive ? "slider" : undefined}
        aria-label="Clarity resolution slider"
        aria-valuenow={Math.round(activeProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={interactive ? 0 : undefined}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Datum line */}
          <line
            x1="8"
            y1="50"
            x2="92"
            y2="50"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="2 2"
            className="text-neutral-300 dark:text-neutral-700"
          />

          {/* Interpolated resolving connective line */}
          <path
            d={nodes
              .map((n, i) => {
                const cx = n.initialX + (n.targetX - n.initialX) * activeProgress;
                const cy = n.initialY + (50 - n.initialY) * activeProgress;
                return `${i === 0 ? "M" : "L"} ${cx.toFixed(2)} ${cy.toFixed(2)}`;
              })
              .join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-neutral-800 transition-all duration-150 ease-out dark:text-neutral-200"
          />

          {/* 18 fragments */}
          {nodes.map((n) => {
            const cx = n.initialX + (n.targetX - n.initialX) * activeProgress;
            const cy = n.initialY + (50 - n.initialY) * activeProgress;
            return (
              <circle
                key={n.id}
                cx={cx}
                cy={cy}
                r="1.8"
                className="fill-neutral-900 transition-all duration-150 ease-out dark:fill-neutral-100"
              />
            );
          })}
        </svg>
      </div>
    </figure>
  );
}