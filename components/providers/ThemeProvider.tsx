"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/**
 * Five papers, not two.
 *
 * `themes` has to be declared explicitly: next-themes only knows about
 * light/dark unless told otherwise, and without this the Blueprint, Foxed and
 * Nocturne classes are never written to <html>.
 *
 * The OS dark-mode preference is NOT followed (since Sept 2026): every first
 * visit opens on Paper, which is now plain white. A reader who wants Ink or
 * any other paper picks it from the switch, and next-themes remembers it.
 *
 * `disableTransitionOnChange` is deliberately OFF. globals.css gives `body` a
 * 600ms colour transition so a theme switch reads as paper being changed
 * rather than as the page reloading; next-themes' flag would suppress exactly
 * that. The flash-on-first-paint problem the flag exists to solve is handled
 * upstream by next-themes' own blocking script, which sets the class before
 * first paint.
 *
 * MotionConfig sits here rather than in app/layout.tsx because the layout is a
 * server component — this is already the app's one client boundary at the
 * root, so it costs nothing extra. `reducedMotion="user"` makes every Framer
 * animation on the site honour prefers-reduced-motion without each component
 * importing the hook.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      // White paper for every first visit, whatever the device's dark-mode
      // setting (Sahil, Sept 2026). The other papers stay one click away.
      defaultTheme="light"
      enableSystem={false}
      themes={["light", "dark", "blueprint", "foxed", "nocturne"]}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
