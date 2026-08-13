"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { isActiveRoute, navigation } from "@/data/navigation";

/* Order and labels come from data/navigation.ts. They used to be declared
   here as well as in homeContent, and the two disagreed on both the order and
   on whether the sixth page is called "Question" or "Questions". */
const links = navigation;

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Escape closes the menu and returns focus to the toggle button.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const isActive = (href: string) => isActiveRoute(pathname, href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-paper/95 backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 md:px-10">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="rounded-sm font-serif-display text-[17px] text-ink transition-opacity duration-300 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line"
        >
          Sahil Kumar
        </Link>

        {/* Desktop navigation — unchanged structure, restyled */}
        <div className="hidden items-center gap-7 md:flex">

          <nav className="flex items-center gap-7" aria-label="Primary">
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-sm py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-through-line ${
                    active
                      ? "text-ink"
                      : "text-graphite hover:text-ink"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-0 left-1/2 h-[1.5px] -translate-x-1/2 rounded-full bg-through-line transition-all duration-300 ${
                      active ? "w-5" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <ThemeToggle />

        </div>

        {/* Mobile menu toggle */}
        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-hairline bg-paper text-ink transition-colors hover:bg-hairline/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-through-line md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-hairline bg-paper md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-md px-3 py-3 font-mono text-[13px] uppercase tracking-[0.06em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-through-line ${
                      active
                        ? "bg-hairline/40 text-ink"
                        : "text-graphite hover:bg-hairline/30 hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="mt-3 flex items-center justify-between border-t border-hairline px-3 pt-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-graphite">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}