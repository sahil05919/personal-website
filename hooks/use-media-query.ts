"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * A media query, read the way this codebase reads external state.
 *
 * WHY THIS EXISTS RATHER THAN A TAILWIND BREAKPOINT
 *
 * Most responsive decisions on this site are made in CSS, which is correct:
 * `min-[1600px]:block` on the Wayfinder costs nothing and cannot get out of
 * step with what is painted. But CSS can only hide a component, not stop it
 * running — a `hidden min-[1360px]:block` layer still mounts on a phone, still
 * measures the document, still holds a scroll listener and still pays for a
 * requestAnimationFrame loop, all to draw something no one will see.
 *
 * The marginal apparatus added in the August 2026 pass — the sewn spine, the
 * watermark under the lamp — is expensive in exactly that way, and belongs to
 * wide screens on compositional grounds rather than cosmetic ones. So it is
 * gated here, at the mount, and the work never starts.
 *
 * `useSyncExternalStore` for the same reason `use-reduced-motion-safe.ts` uses
 * it: `matchMedia` is an external store with a subscribe, a snapshot and an
 * unambiguous server snapshot. The server has no viewport, so it must answer
 * `false` and render nothing — anything else is a hydration mismatch. A layer
 * that appears one frame after hydration is the price, and it is the right one
 * to pay for decoration.
 *
 * `subscribe` is wrapped in `useCallback` and keyed on the query, and that is
 * load-bearing rather than tidiness: React re-subscribes whenever the subscribe
 * function's identity changes, so an inline closure would tear down and rebuild
 * the listener on every single render of every consumer. Pass a literal or a
 * module constant as the query, never a template built in render.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
