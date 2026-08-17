"use client";

import { useSyncExternalStore } from "react";

/**
 * A hydration-safe replacement for Framer Motion's own `useReducedMotion()`.
 *
 * Framer's hook reads `window.matchMedia` synchronously on first render
 * (`useState(prefersReducedMotion.current)`), which is correct once mounted
 * but wrong during hydration: the server has no `window` and always renders
 * the full-motion branch, so a client whose OS has Reduced Motion enabled
 * hydrates straight into the reduced branch and React discards the server
 * HTML and re-renders from scratch — a real, verified hydration error
 * (React #418) under `prefers-reduced-motion: reduce`, reproduced with
 * Playwright's `reducedMotion: 'reduce'` context option during the sitewide
 * motion pass, not a theoretical one.
 *
 * ---------------------------------------------------------------------------
 * NOW BUILT ON useSyncExternalStore (August 2026)
 *
 * The previous version was `useState(false)` plus an effect that called
 * `setReduced(query.matches)` on mount. That produced the right answer and the
 * right hydration behaviour, and it was also a setState called synchronously
 * inside an effect body — a cascading render, and the last outstanding lint
 * error in the codebase.
 *
 * `matchMedia` is an external store. It has a subscribe, it has a snapshot, and
 * it has a server snapshot that is unambiguously `false` — which is precisely
 * the contract this hook needs, because `false` is exactly the guess the server
 * has to make for hydration to match. React subscribes without a render pass,
 * so the mismatch window closes and the extra render disappears.
 *
 * ResolveFigure already reads its pointer-capability query this way, for the
 * same reason. This makes the two consistent.
 *
 * Note this is unrelated to `<MotionConfig reducedMotion="user">` (see
 * components/providers/ThemeProvider.tsx), which reads the same preference
 * imperatively inside Framer's animation engine, only once an animation starts
 * — well after hydration — so it was never at risk of this mismatch. This hook
 * exists only for the components that branch their own JSX or variants on the
 * preference directly.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * The server cannot know the preference, and `false` is the only value that
 * matches what it renders. Returning `true` here would reintroduce exactly the
 * hydration mismatch this hook was written to remove.
 */
function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
