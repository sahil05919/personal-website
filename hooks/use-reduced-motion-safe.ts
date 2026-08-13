"use client";

import { useEffect, useState } from "react";

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
 * This starts at `false` (matching the server's guess every time, same as
 * a user with no preference set) and only reads the real preference after
 * mount, inside an effect — the same mount-gating already used for the
 * theme toggle (components/ui/ThemeToggle.tsx) for the identical reason: a
 * client-only preference that the server cannot know in advance. The cost
 * is one extra render immediately after mount, before most users register
 * the first paint; the benefit is zero hydration errors for the part of the
 * audience that actually has Reduced Motion on — which is precisely the
 * audience this check exists to serve.
 *
 * Note this is unrelated to `<MotionConfig reducedMotion="user">`
 * (app/layout.tsx), which stays exactly as it was: it reads the same
 * preference imperatively, inside Framer's animation engine, only once an
 * animation actually starts — well after hydration — so it was never at
 * risk of this mismatch. This hook exists only for the handful of
 * components that branch their own JSX or variants on the preference
 * directly (Home's Frontispiece/Contents/ResolveFigure, Contact's four
 * components, Questions), which is where the mismatch was reproduced.
 */
export function useReducedMotionSafe(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}
