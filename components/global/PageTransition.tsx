"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

// Editorial ease-out curve (simulating paper physics)
const editorialEase = [0.16, 1, 0.3, 1] as const;

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Reset scroll to top on chapter transition
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(1px)" }}
        transition={{
          duration: 0.38,
          ease: editorialEase,
        }}
        className="relative min-h-[calc(100vh-72px)] w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;