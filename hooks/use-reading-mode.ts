'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * READING MODE — English or Hinglish, chosen by the reader, remembered.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS IS NOT
 *
 * It is not internationalisation. There is no `[locale]` segment, no route
 * duplication, no `hreflang`, and every URL on the site is unchanged — which was
 * the requirement, and is also the right call for this particular pair. Hinglish
 * here is not a translation of the record for a different audience; it is the
 * same person telling the same story in the other language he thinks in. One
 * page, one canonical URL, two readings.
 *
 * The consequence, stated plainly so nobody has to rediscover it: search engines
 * only ever see the English. That is deliberate. English is the original and the
 * default, `<link rel="canonical">` points at the one URL, and there is no
 * duplicate-content problem to have because there is no second URL.
 *
 * ---------------------------------------------------------------------------
 * WHY useSyncExternalStore AND NOT useState + useEffect
 *
 * `localStorage` is an external store: it has a subscribe (`storage` events plus
 * our own dispatch), a snapshot, and an unambiguous server snapshot — `'en'`,
 * which is exactly what the server prerenders. That is the same contract, and
 * the same reasoning, as use-reduced-motion-safe.ts, and it avoids the cascading
 * render that a setState-in-an-effect would cause on every page load.
 *
 * A reader who has chosen Hinglish sees English for one frame on a cold load,
 * because a statically prerendered page cannot know their choice. The
 * alternatives were both worse: rendering both languages into the DOM and
 * hiding one with CSS would double the prose in the page and hand crawlers two
 * copies of every essay, and reading a cookie on the server would make thirteen
 * static pages dynamic. One frame is the cheapest of the three.
 *
 * The `storage` listener is not decoration: two tabs open on the site stay in
 * step, which matters because the choice is a reading preference rather than a
 * per-tab setting.
 */

export type ReadingMode = 'en' | 'hi';

const KEY = 'sahil-reading-mode';

/** Dispatched on `window` when the mode changes in THIS tab. `storage` only
 *  fires in the others. */
const EVENT = 'reading-mode-change';

function normalise(value: string | null): ReadingMode {
  return value === 'hi' ? 'hi' : 'en';
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

function getSnapshot(): ReadingMode {
  try {
    return normalise(window.localStorage.getItem(KEY));
  } catch {
    /* Private mode, or storage disabled. English, and no error surfaced to a
       reader who only wanted to read. */
    return 'en';
  }
}

/** English is the original. It is also the only value the server can render. */
function getServerSnapshot(): ReadingMode {
  return 'en';
}

export function useReadingMode(): {
  mode: ReadingMode;
  setMode: (next: ReadingMode) => void;
} {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setMode = useCallback((next: ReadingMode) => {
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* Unstorable. The change below still applies for this page view. */
    }
    /* `hi-Latn`: Hinglish is Hindi written in Latin script, and that is the
       BCP-47 way to say so. A screen reader switching voice for it is the
       point; `lang="hi"` would send it looking for Devanagari. */
    document.documentElement.lang = next === 'hi' ? 'hi-Latn' : 'en';
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { mode, setMode };
}

/**
 * Widen a literal type, deeply, keeping the structure.
 *
 * Most content on this site is declared `as const`, which is right — it stops a
 * component quietly depending on a string that is about to change. It also means
 * `typeof exploring` has `heading: "Exploring"` in it, so a Hinglish twin saying
 * "Ghoomna" is not assignable to it and `useVariant` would refuse the pair.
 *
 * `Loose` relaxes the leaves (a literal string becomes `string`, a fixed tuple
 * becomes an array) and keeps everything else: every key still has to be present,
 * every nested shape still has to match, and an array of objects still has to be
 * an array of the same objects. So the parity guarantee survives — a Hinglish
 * file that drops a field or renames an id still fails the build, which is the
 * whole reason these are typed against the English interfaces — and only the
 * literal values are allowed to differ, which is the entire point of a
 * translation.
 */
type Loose<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Loose<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Loose<T[K]> }
          : T;

/**
 * Pick the reading. `hi` is optional throughout: a page, a section or a single
 * object with no Hinglish written for it yet falls back to English silently,
 * which is what makes it possible to add the second reading one file at a time.
 *
 * The return type is the ENGLISH type, so every existing call site keeps whatever
 * narrowing it already relied on. `NoInfer` on the second parameter is
 * load-bearing: without it TypeScript happily infers `T` from the Hinglish
 * argument instead, and then reports the ENGLISH object as the mismatch — which
 * is a confusing error message pointing at the wrong file.
 */
export function useVariant<T>(en: T, hi?: NoInfer<Loose<T>> | null): T {
  const { mode } = useReadingMode();
  return mode === 'hi' && hi != null ? (hi as unknown as T) : en;
}
