"use client";

import { useEffect, useState, useCallback } from "react";

export interface CommonplaceEntry {
  id: string;
  quote: string;
  sourceChapter: string;
  sourceHref: string;
  clippedAt: string;
}

const STORAGE_KEY = "sk_commonplace_entries";

export function useCommonplace() {
  const [entries, setEntries] = useState<CommonplaceEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setEntries(JSON.parse(stored));
      }
    } catch {
      // Fallback for SSR / strict privacy mode
    }
    setMounted(true);
  }, []);

  const addEntry = useCallback(
    (quote: string, sourceChapter: string, sourceHref: string) => {
      const trimmed = quote.trim();
      if (!trimmed || trimmed.length < 5) return;

      const newEntry: CommonplaceEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        quote: trimmed,
        sourceChapter,
        sourceHref,
        clippedAt: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };

      setEntries((prev) => {
        // Prevent exact duplicates
        if (prev.some((e) => e.quote === trimmed)) return prev;
        const next = [newEntry, ...prev];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore write failure
        }
        return next;
      });
    },
    []
  );

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore write failure
      }
      return next;
    });
  }, []);

  const clearEntries = useCallback(() => {
    setEntries([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore write failure
    }
  }, []);

  return {
    entries,
    addEntry,
    removeEntry,
    clearEntries,
    mounted,
  };
}