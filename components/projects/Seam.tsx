"use client";

import { motion } from "framer-motion";

/**
 * The seam between essays.
 *
 * Previously a static hairline. Now draws in — scaleX from 0, transform
 * origin centre — so a transition between projects is a small event in the
 * scroll rather than a fixed rule that was always there. Same motion family
 * as Journey's `Connector` (a transform-keyed value, so MotionConfig's
 * `reducedMotion="user"` replaces it with an instant appearance rather than
 * a draw-in — verified, not assumed, against the installed framer-motion
 * source during the Journey work).
 *
 * `variant="evidence"` adds a small cobalt dot at the centre of the line —
 * reserved for exactly one seam, the one before "The year that did both
 * jobs." Everywhere else the seam stays plain hairline; a cobalt mark on
 * every transition would stop meaning anything.
 */
export function Seam({
  wide,
  variant = "hairline",
}: {
  wide: boolean;
  variant?: "hairline" | "evidence";
}) {
  return (
    <div
      aria-hidden
      className={
        wide ? "flex justify-center py-40 sm:py-56" : "flex justify-center py-28 sm:py-40"
      }
    >
      <div className="relative flex items-center">
        <motion.span
          className="block h-px w-16 origin-center bg-hairline"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        {variant === "evidence" && (
          <motion.span
            className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-through-line"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          />
        )}
      </div>
    </div>
  );
}
