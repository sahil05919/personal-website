"use client";

import { useState } from "react";

interface MarginaliaProps {
  id: string;
  index: number;
  note: string;
  children: React.ReactNode;
}

export default function Marginalia({
  id,
  index,
  note,
  children,
}: MarginaliaProps) {
  const [active, setActive] = useState(false);

  return (
    <span className="relative inline">
      {/* Anchor Text */}
      <span
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={() => setActive(!active)}
        className="cursor-pointer border-b border-dotted border-neutral-400 font-medium text-neutral-900 transition-colors hover:border-neutral-900 dark:border-neutral-600 dark:text-neutral-100 dark:hover:border-neutral-200"
      >
        {children}
        <sup className="ml-0.5 font-mono text-[10px] text-amber-600 dark:text-amber-400">
          [{index}]
        </sup>
      </span>

      {/* Desktop Sidenote in Right Gutter */}
      <aside
        id={id}
        className={`pointer-events-none absolute left-[calc(100%+2.5rem)] top-0 hidden w-56 font-mono text-[11px] leading-relaxed transition-all duration-200 xl:block ${
          active
            ? "translate-x-0 opacity-100 text-neutral-800 dark:text-neutral-200"
            : "translate-x-1 opacity-40 text-neutral-400 dark:text-neutral-600"
        }`}
      >
        <span className="mr-1 text-amber-600 dark:text-amber-400 font-bold">
          [{index}]
        </span>
        {note}
      </aside>

      {/* Mobile / Tablet Accordion */}
      {active && (
        <span className="my-2 block rounded border-l-2 border-amber-600 bg-neutral-100/80 p-2 font-mono text-xs leading-normal text-neutral-700 dark:border-amber-400 dark:bg-neutral-800/80 dark:text-neutral-300 xl:hidden">
          <strong className="text-amber-600 dark:text-amber-400 mr-1">
            [{index}]
          </strong>
          {note}
        </span>
      )}
    </span>
  );
}