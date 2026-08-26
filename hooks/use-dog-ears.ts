"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

export const DOG_EAR_GLYPH = "◿";

const STORAGE_KEY = "sk_dog_ears";

export function useDogEars(currentPath?: string) {
  const [dogEars, setDogEars] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setDogEars(JSON.parse(stored));
      }
    } catch {
      // Fallback for private browsing
    }
    setMounted(true);
  }, []);

  const toggleDogEar = useCallback((path: string) => {
    setDogEars((prev) => {
      const next = prev.includes(path)
        ? prev.filter((p) => p !== path)
        : [...prev, path];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Fallback for storage errors
      }
      return next;
    });
  }, []);

  const ears = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (const path of dogEars) {
      map[path] = true;
    }
    return map;
  }, [dogEars]);

  const isDogEared = useCallback(
    (path?: string) => {
      const target = path || currentPath;
      return Boolean(target && ears[target]);
    },
    [currentPath, ears]
  );

  // Hybrid return supporting both object destructuring ({ ears, toggle }) and array destructuring ([ears, toggle])
  return useMemo(() => {
    const tuple = [ears, toggleDogEar] as const;
    return Object.assign(tuple, {
      ears,
      dogEars,
      isDogEared,
      isCurrentDogEared: Boolean(currentPath && ears[currentPath]),
      toggle: toggleDogEar,
      toggleDogEar,
      toggleCurrent: () => currentPath && toggleDogEar(currentPath),
      mounted,
    });
  }, [ears, toggleDogEar, dogEars, isDogEared, currentPath, mounted]);
}

export default useDogEars;