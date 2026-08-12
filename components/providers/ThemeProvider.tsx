"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/**
 * MotionConfig sits here rather than in app/layout.tsx because the layout is a
 * server component and MotionConfig is not — this is already the app's one
 * client boundary at the root, so it costs nothing extra.
 *
 * `reducedMotion="user"` makes every Framer animation on the site honour
 * prefers-reduced-motion without each component importing useReducedMotion.
 * Home, Contact and Questions did; About, Journey and Media did not. One line
 * closes all of them, and new components inherit it by default.
 */
export default function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
