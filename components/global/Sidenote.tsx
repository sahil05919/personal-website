"use client";

import { useState, useId } from "react";

interface SidenoteProps {
  id?: string;
  number?: string | number;
  children: React.ReactNode;
  content: React.ReactNode;
  date?: string;
}

export function Sidenote({
  id: customId,
  number = 1,
  children,
  content,
  date,
}: SidenoteProps) {
  const generatedId = useId();
  const noteId = customId || generatedId;
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* 1. Anchored Word in the Reading Flow */}
      <span
        className="relative inline cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpenMobile((prev) => !prev)}
      >
        <span className="underline decoration-amber-700/40 decoration-dotted underline-offset-4 hover:decoration-amber-700 dark:decoration-amber-400/40 dark:hover:decoration-amber-300 transition-colors">
          {children}
        </span>
        <span
          className={`ml-0.5 inline-block -translate-y-1 font-mono text-[10px] font-semibold transition-colors ${
            isHovered
              ? "text-amber-800 dark:text-amber-300 scale-110"
              : "text-amber-700/80 dark:text-amber-400/80"
          }`}
        >
          [{number}]
        </span>
      </span>

      {/* 2. Desktop Tufte Gutter Note (Floats into the blank right margin without covering text) */}
      <span
        id={`sidenote-${noteId}`}
        role="note"
        aria-label="Margin Note"
        className={`hidden xl:block xl:float-right xl:clear-right xl:-mr-72 xl:w-60 xl:my-0 select-text transition-all duration-300 ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-75 hover:opacity-100"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className={`block rounded-r border-l-2 p-3 font-mono text-[11px] leading-relaxed backdrop-blur-xs transition-all ${
            isHovered
              ? "border-amber-600 bg-amber-50/80 text-neutral-900 shadow-sm dark:border-amber-400 dark:bg-neutral-900 dark:text-neutral-100 ring-1 ring-amber-500/10"
              : "border-neutral-300/80 bg-neutral-100/50 text-neutral-600 dark:border-neutral-700/80 dark:bg-neutral-900/40 dark:text-neutral-400"
          }`}
        >
          <span className="flex items-center justify-between gap-2 border-b border-neutral-200/60 pb-1 text-[9px] uppercase tracking-wider text-neutral-400 dark:border-neutral-800 dark:text-neutral-500">
            <span className="font-semibold text-amber-700 dark:text-amber-400">
              Note 0{number}
            </span>
            {date && <span>{date}</span>}
          </span>
          <span className="mt-1.5 block font-serif italic text-neutral-800 dark:text-neutral-200 leading-normal">
            {content}
          </span>
        </span>
      </span>

      {/* 3. Mobile/Tablet Collapsible Card (Toggles below the line on tap) */}
      {isOpenMobile && (
        <span className="block xl:hidden my-3 w-full rounded border-l-2 border-amber-600 bg-amber-50/70 p-3.5 font-mono text-xs leading-relaxed text-neutral-700 dark:border-amber-400 dark:bg-neutral-900 dark:text-neutral-300 animate-in fade-in zoom-in-95 duration-150">
          <span className="flex items-center justify-between text-[10px] uppercase tracking-wider text-amber-800 dark:text-amber-400 pb-1 border-b border-amber-200/60 dark:border-neutral-800">
            <span>Apparatus Note 0{number}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenMobile(false);
              }}
              className="font-mono text-[10px] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              [close]
            </button>
          </span>
          <span className="mt-2 block font-serif italic text-sm text-neutral-900 dark:text-neutral-100">
            {content}
          </span>
        </span>
      )}
    </>
  );
}