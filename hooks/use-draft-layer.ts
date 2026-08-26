"use client";

import { useEffect, useState } from "react";

export function useDraftLayer() {
  const [showDrafts, setShowDrafts] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle draft inspection with 'D' key if not typing in an input
      if (
        (e.key === "d" || e.key === "D") &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        setShowDrafts((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    showDrafts,
    toggleDrafts: () => setShowDrafts((prev) => !prev),
    setDrafts: setShowDrafts,
  };
}