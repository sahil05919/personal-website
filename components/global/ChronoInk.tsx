"use client";

import React from "react";

interface ChronoInkProps {
  children: React.ReactNode;
  year?: string | number;
  className?: string;
  as?: React.ElementType;
}

export function ChronoInk({
  children,
  year,
  className = "",
  as: Component = "span",
}: ChronoInkProps) {
  const currentYear = 2026;
  const parsedYear = typeof year === "string" ? parseInt(year, 10) : year;

  // Determine oxidation stage based on chronological age
  let inkStyle: React.CSSProperties = {};
  let oxidationClass = "text-neutral-900 dark:text-neutral-100";

  if (parsedYear) {
    const age = Math.max(0, currentYear - parsedYear);

    if (age === 0) {
      // 2026: Fresh lampblack carbon ink (deep black, high contrast)
      oxidationClass = "text-black dark:text-neutral-50";
    } else if (age <= 1) {
      // 2025: Early setting (crisp dark neutral)
      oxidationClass = "text-neutral-900 dark:text-neutral-100";
    } else if (age <= 2) {
      // 2024: Stage-1 iron gall oxidation (warm sepia undertone)
      oxidationClass = "text-[#241f1c] dark:text-[#f0ece8]";
      inkStyle = {
        filter: "url(#ink-feather-subtle)",
      };
    } else {
      // 2023 and earlier: Stage-2 archival oxidation (aged walnut halo)
      oxidationClass = "text-[#2e241e] dark:text-[#eae2da]";
      inkStyle = {
        filter: "url(#ink-feather-aged)",
        textShadow: "0.2px 0.2px 0.5px rgba(120, 80, 50, 0.15)",
      };
    }
  }

  return (
    <Component
      className={`transition-colors duration-300 ${oxidationClass} ${className}`}
      style={inkStyle}
      title={parsedYear ? `Archival Ink Chemistry · Circa ${parsedYear}` : undefined}
    >
      {children}
    </Component>
  );
}