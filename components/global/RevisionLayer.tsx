"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface DraftContextType {
  showDrafts: boolean;
  toggleDrafts: () => void;
}

const DraftContext = createContext<DraftContextType>({
  showDrafts: false,
  toggleDrafts: () => {},
});

export const useDrafts = () => useContext(DraftContext);

export function DraftProvider({ children }: { children: React.ReactNode }) {
  const [showDrafts, setShowDrafts] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.key === "d" || e.key === "D") &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        setShowDrafts((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <DraftContext.Provider value={{ showDrafts, toggleDrafts: () => setShowDrafts((p) => !p) }}>
      {children}
    </DraftContext.Provider>
  );
}

/** Inline strike-through that reveals prior uncommitted thoughts */
export function GhostDraft({
  original,
  revised,
}: {
  original: string;
  revised: React.ReactNode;
}) {
  const { showDrafts } = useDrafts();

  if (!showDrafts) return <>{revised}</>;

  return (
    <span className="relative group">
      <span className="line-through decoration-neutral-400/80 text-neutral-400 dark:text-neutral-500 mr-1.5 font-mono text-[0.92em]">
        {original}
      </span>
      <span className="bg-amber-100/60 dark:bg-amber-950/30 px-1 rounded-sm text-neutral-900 dark:text-neutral-100 transition-colors">
        {revised}
      </span>
    </span>
  );
}

/** Marginal graphite editorial note */
export function MarginAnnotation({ children }: { children: React.ReactNode }) {
  const { showDrafts } = useDrafts();
  if (!showDrafts) return null;

  return (
    <span className="inline-block border-l-2 border-amber-600/70 dark:border-amber-400/70 pl-2 ml-2 my-1 font-mono text-[11px] text-amber-700 dark:text-amber-300/90 italic">
      [ed. {children}]
    </span>
  );
}

/** Floating Apparatus Toggle */
export function RevisionToggle() {
  const { showDrafts, toggleDrafts } = useDrafts();

  return (
    <aside className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleDrafts}
        type="button"
        title="Toggle Draft Archaeology (Hotkey: D)"
        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 backdrop-blur-md shadow-sm ${
          showDrafts
            ? "border-amber-600/60 bg-amber-50 text-amber-900 dark:border-amber-500/60 dark:bg-neutral-900 dark:text-amber-200 ring-2 ring-amber-500/20"
            : "border-neutral-300/80 bg-neutral-50/80 text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-400"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            showDrafts ? "bg-amber-600 animate-pulse" : "bg-neutral-400"
          }`}
        />
        <span>{showDrafts ? "Drafts: Exposed" : "Drafts: Press [D]"}</span>
      </button>
    </aside>
  );
}