"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Coordinates
const MAH_COORDS = { lat: 28.28, lng: 76.15, name: "Mahendragarh", code: "IND" };
const LDN_COORDS = { lat: 51.5, lng: -0.12, name: "London", code: "GBR" };
const TOTAL_GEODESIC_KM = 6710;

export default function SewnSpine() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentProgress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Interpolated Geodesic values
  const currentLat = (MAH_COORDS.lat + (LDN_COORDS.lat - MAH_COORDS.lat) * scrollProgress).toFixed(2);
  const currentKm = Math.round(scrollProgress * TOTAL_GEODESIC_KM);

  return (
    <aside
      aria-label="Geodesic Binding Thread"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed left-0 top-0 z-30 hidden h-full w-12 flex-col items-center justify-between py-8 select-none lg:flex"
    >
      {/* Top Coordinate: Mahendragarh */}
      <div className="flex flex-col items-center gap-1 font-mono text-[9px] tracking-widest text-neutral-400 dark:text-neutral-500">
        <span className="uppercase">{MAH_COORDS.code}</span>
        <span className="tabular-nums">28.28°N</span>
      </div>

      {/* The Physical Thread with Knot Stations */}
      <div className="relative flex-1 w-full flex items-center justify-center my-4">
        {/* Baseline Spine Rule */}
        <div className="absolute top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />

        {/* Traversed Geodesic Thread */}
        <div
          className="absolute top-0 w-[1.5px] bg-amber-600/70 dark:bg-amber-400/80 transition-all duration-100 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        />

        {/* 9 Stitched Chapter Knots */}
        {Array.from({ length: 9 }).map((_, i) => {
          const knotPos = (i / 8) * 100;
          const passed = scrollProgress * 100 >= knotPos;

          return (
            <div
              key={i}
              className={`absolute left-1/2 -translate-x-1/2 h-1 w-1 rounded-full border transition-all duration-300 ${
                passed
                  ? "border-amber-600 bg-amber-600 dark:border-amber-400 dark:bg-amber-400 scale-125"
                  : "border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
              }`}
              style={{ top: `${knotPos}%` }}
            />
          );
        })}

        {/* Active Geodesic Traveler Pip */}
        <div
          className="absolute left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-neutral-900 dark:bg-neutral-100 shadow-sm transition-all duration-100"
          style={{ top: `${scrollProgress * 100}%` }}
        />

        {/* Real-time Flyout Telemetry on Hover/Scroll */}
        <div
          className={`absolute left-8 rounded border border-neutral-200/90 bg-neutral-50/95 px-2 py-1 font-mono text-[10px] text-neutral-600 shadow-md backdrop-blur-md transition-opacity duration-200 dark:border-neutral-800 dark:bg-neutral-900/95 dark:text-neutral-300 ${
            isHovered || scrollProgress > 0.02 ? "opacity-100" : "opacity-0"
          }`}
          style={{ top: `calc(${scrollProgress * 100}% - 14px)` }}
        >
          <div className="flex flex-col whitespace-nowrap leading-tight">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {currentKm} km
            </span>
            <span className="text-[8px] text-neutral-400">{currentLat}° N</span>
          </div>
        </div>
      </div>

      {/* Bottom Coordinate: London */}
      <div className="flex flex-col items-center gap-1 font-mono text-[9px] tracking-widest text-neutral-400 dark:text-neutral-500">
        <span className="tabular-nums">51.50°N</span>
        <span className="uppercase">{LDN_COORDS.code}</span>
      </div>
    </aside>
  );
}