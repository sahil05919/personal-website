'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * THE DOG-EARS — where the reader stopped, kept between visits.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS IS
 *
 * A record of which pages of this copy have had their corner turned down, and
 * how far down each one the fold was made. It is the only state on this site
 * that belongs to the READER rather than to the author: the theme is a choice
 * about the object, the reading mode is a choice about the language, and this is
 * a mark somebody left in the book.
 *
 * Stored under one key as `{ [route]: { y, at } }`. `y` is the scroll position
 * at the moment the corner was turned, which is the honest translation of "the
 * page I was on" onto a medium where a chapter is one continuous sheet. `at` is
 * when, so the most recent fold can be found without keeping a separate cursor.
 *
 * ---------------------------------------------------------------------------
 * THE ONE TRAP IN THIS FILE
 *
 * `getSnapshot` MUST return the same object identity when nothing has changed.
 * `JSON.parse` on every call returns a fresh object every time, React compares
 * snapshots by identity, and the result is an infinite render loop rather than a
 * subtle bug — the page freezes. So the raw string is cached alongside its
 * parsed value and re-parsed only when the string itself differs, and both the
 * empty case and the server case return one shared frozen constant.
 *
 * Otherwise this is exactly the contract in hooks/use-reading-mode.ts: a
 * `storage` listener so two tabs agree, a private event for the tab that made
 * the change, and a server snapshot that is unambiguously empty because a
 * statically prerendered page cannot know what anybody wrote in it.
 */

export interface DogEar {
  /** Scroll position, in pixels, at the moment the corner was turned. */
  y: number;
  /** When, as a timestamp. */
  at: number;
}

export type DogEars = Readonly<Record<string, DogEar>>;

/**
 * The glyph, shared by the three places a folded corner is reported: the corner
 * itself, the fore-edge index and the colophon's contents.
 *
 * It is the shape of the FLAP, right angle at the top left — the same triangle
 * components/global/DogEar.tsx actually draws when a corner is turned, because
 * the corner piece reflects across the fold and lands on the opposite side of
 * the square from where it started. The first version pointed the other way,
 * which is the conventional page-corner icon and, next to the real fold two
 * inches away, plainly the wrong shape.
 */
export const DOG_EAR_GLYPH = 'polygon(0 0, 100% 0, 0 100%)';

const KEY = 'sahil-dog-ears';
const EVENT = 'dog-ears-change';

/** One shared identity for "nothing folded". See THE ONE TRAP above. */
const NONE: DogEars = Object.freeze({});

let cachedRaw: string | null = null;
let cachedValue: DogEars = NONE;

function parse(raw: string | null): DogEars {
  if (!raw) return NONE;

  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return NONE;

    /* Validated rather than trusted. This is localStorage: it survives
       deploys, so it can hold the shape an older version of this file wrote,
       and it is editable by hand. A bad entry is dropped, not thrown. */
    const out: Record<string, DogEar> = {};
    for (const [route, entry] of Object.entries(value as Record<string, unknown>)) {
      if (!entry || typeof entry !== 'object') continue;
      const { y, at } = entry as { y?: unknown; at?: unknown };
      if (typeof y !== 'number' || !Number.isFinite(y) || y < 0) continue;
      out[route] = { y, at: typeof at === 'number' ? at : 0 };
    }

    return Object.keys(out).length ? Object.freeze(out) : NONE;
  } catch {
    return NONE;
  }
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

function getSnapshot(): DogEars {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cachedRaw) return cachedValue;
    cachedRaw = raw;
    cachedValue = parse(raw);
    return cachedValue;
  } catch {
    /* Private mode, or storage disabled. Nothing is folded and no reader is
       told about it. */
    return NONE;
  }
}

function getServerSnapshot(): DogEars {
  return NONE;
}

function write(next: DogEars): void {
  try {
    if (Object.keys(next).length === 0) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* Unstorable. The change below still applies for this page view, so the
       corner folds; it simply will not be there tomorrow. */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useDogEars(): {
  ears: DogEars;
  fold: (route: string, y: number) => void;
  flatten: (route: string) => void;
} {
  const ears = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const fold = useCallback((route: string, y: number) => {
    write({
      ...getSnapshot(),
      [route]: { y: Math.max(0, Math.round(y)), at: Date.now() },
    });
  }, []);

  const flatten = useCallback((route: string) => {
    const next = { ...getSnapshot() };
    delete next[route];
    write(next);
  }, []);

  return { ears, fold, flatten };
}
