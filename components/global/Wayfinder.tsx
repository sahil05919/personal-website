"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { destinations, isActiveRoute } from "@/data/navigation";
import { DOG_EAR_GLYPH, useDogEars } from "@/hooks/use-dog-ears";

export default function Wayfinder() {
  const pathname = usePathname();
  const { ears } = useDogEars(pathname);

  return (
    <nav
      aria-label="Chapter index rail"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 select-none lg:block xl:right-8"
    >
      <ul className="space-y-2.5 font-mono text-[10px] tracking-wider text-neutral-400 dark:text-neutral-500">
        {destinations.map((destination, idx) => {
          const active = isActiveRoute(pathname, destination.href);
          const hasDogEar = Boolean(ears && ears[destination.href]);
          const folioNum = String(idx + 1).padStart(2, "0");

          return (
            <li key={destination.href} className="flex items-center justify-end gap-2">
              <Link
                href={destination.href}
                className={`group flex items-center gap-2 uppercase transition-colors ${
                  active
                    ? "font-semibold text-neutral-900 dark:text-neutral-100"
                    : "hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
              >
                {/* Chapter Title */}
                <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {destination.label}
                </span>

                {/* Folio Number */}
                <span className="tabular-nums">
                  {folioNum}
                </span>

                {/* Bookmark indicator or active pip */}
                {hasDogEar ? (
                  <span
                    aria-label="Bookmarked"
                    className="text-amber-600 dark:text-amber-400 font-bold"
                  >
                    {DOG_EAR_GLYPH}
                  </span>
                ) : active ? (
                  <span className="inline-block h-1.5 w-1.5 bg-blue-600 dark:bg-blue-400" />
                ) : (
                  <span className="inline-block h-px w-2 bg-neutral-300 transition-colors group-hover:bg-neutral-500 dark:bg-neutral-700" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}