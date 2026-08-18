"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

import PaperSwitch from "@/components/ui/PaperSwitch";
import ReadingSwitch from "@/components/global/ReadingSwitch";
import { chromeHi } from "@/data/hinglish";
import { useVariant } from "@/hooks/use-reading-mode";
import Search from "@/components/global/Search";
import { contactInfo } from "@/data/contactData";
import { destinations, isActiveRoute, navigation } from "@/data/navigation";

/**
 * The running head.
 *
 * A book does not put a menu at the top of every page — it puts the name of
 * the work on one side and the name of the chapter you are currently in on
 * the other, at a size you can ignore. That is what this is now.
 *
 * Four things changed and each is doing a job:
 *
 * 1. THE FOLIO. The wordmark carries a second line naming the section you are
 *    reading, numbered, in the accent. Nine identical nav labels told you
 *    where you could go and never told you where you were; the active
 *    underline was two pixels of answer to the most important question the
 *    chrome can answer. It updates on navigation and is the only place on the
 *    site where the reader's position is stated in words.
 *
 * 2. THE PROGRESS RULE. A hairline along the bottom edge advancing with
 *    scroll depth. On a site of long essays this is genuinely useful, and it
 *    is the through-line doing one more piece of work: the line that runs
 *    down Home's gutter and closes on Contact also measures how far into the
 *    page you are.
 *
 * 3. THE CONDENSE. 72px at the top of the page, 58px once you have started
 *    reading, with the wordmark stepping down with it. Nothing disappears —
 *    a header that hides itself makes a nine-page site feel like a scroll
 *    hunt — it simply stops occupying reading height.
 *
 * 4. THE INDEX. The mobile menu was a stack of small mono rows, the same
 *    treatment as the desktop bar, only larger. It is now a full-height
 *    index: numbered folios set in the display face, which is the one place
 *    the site's contents can be shown at the scale it deserves.
 *
 * The accessibility work that was already here is kept intact: aria-current,
 * aria-expanded/controls, body scroll lock, Escape-to-close with focus
 * returned to the toggle.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The CV, in the running head.
 *
 * It existed in exactly one place: an 11px mono line at the foot of /contact,
 * beside a telephone number, on the ninth page of nine. That is the wrong place
 * for the one document a visitor is most likely to have come for — reaching it
 * required reading to the end of the record first.
 *
 * It is not a nav item and is deliberately not in the `navigation` array: it is
 * a document, not a chapter, so it sits with the apparatus rather than in the
 * contents, and it is marked PDF because a link that downloads a file should say
 * so before it is clicked. `download` gives the file its own name rather than a
 * hashed one.
 *
 * The route is still also on /contact. Two places is right for this one thing.
 */
const CV_HREF = `/documents/${contactInfo.resume.fileName}`;

/** Back matter. Reachable, indexable, not part of the reading order — so it is
 *  in the colophon and, since this pass, in the mobile index too. It was in the
 *  colophon only, which meant a phone reader had to scroll a whole chapter to
 *  find the Index page that exists to save them scrolling a whole chapter. */
const BACK_MATTER = [
  { href: "/a-z", label: "Index" },
  { href: "/writing", label: "Writing" },
  { href: "/errata", label: "Errata" },
];

/** Folio number for a route, from the canonical order. Home is unnumbered —
 *  a title page does not carry a folio. */
function folio(href: string): string | null {
  const index = destinations.findIndex((d) => d.href === href);
  return index === -1 ? null : String(index + 1).padStart(2, "0");
}

export default function Navbar() {
  const t = {
    contents: useVariant("Contents", chromeHi.contents),
    backMatter: useVariant("Back matter", chromeHi.backMatter),
    reading: useVariant("Reading", chromeHi.reading),
    paper: useVariant("Paper", chromeHi.paper),
    index: useVariant("Index", chromeHi.index),
    close: useVariant("Close", chromeHi.close),
  };

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Condense once the reader has left the top of the page.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setCondensed(window.scrollY > 24);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Lock body scroll while the index is open.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Escape closes the index and returns focus to the toggle.
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

  // The index closes from the links themselves (every one calls closeMenu),
  // not from an effect watching `pathname`. Closing it in an effect would set
  // state synchronously during a render pass on every navigation, including
  // the eight where the index was never open.
  const closeMenu = () => setIsOpen(false);
  const isActive = (href: string) => isActiveRoute(pathname, href);

  const here = navigation.find((d) => isActive(d.href));
  const hereFolio = here ? folio(here.href) : null;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-paper/85 backdrop-blur-xl">
        <div
          className={`mx-auto flex max-w-spread items-center justify-between px-5 transition-all duration-500 ease-editorial sm:px-8 lg:px-10 ${
            condensed ? "h-[58px]" : "h-[72px]"
          }`}
        >
          {/* ── The work, and where you are in it ───────────────────────── */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex min-w-0 items-baseline gap-3"
          >
            <span
              /* `shrink-0 whitespace-nowrap`: with the reading switch and the CV
                 added to the right-hand cluster, the flex row ran out of width
                 at 1440px and the name itself broke over two lines. The name is
                 the one thing in the running head that must never wrap; the
                 folio beside it already truncates, which is the correct thing to
                 sacrifice. */
              className={`shrink-0 whitespace-nowrap font-serif-display leading-none text-ink transition-all duration-500 ease-editorial group-hover:text-through-line ${
                condensed ? "text-[15px]" : "text-[18px]"
              }`}
            >
              Sahil Kumar
            </span>

            {/* The running head. Hidden on the title page, where there is no
              chapter to name, and below sm where there is no room. */}
            <AnimatePresence mode="wait">
              {here && here.href !== "/" ? (
                <motion.span
                  key={here.href}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="hidden min-w-0 items-baseline gap-2 font-mono text-apparatus-xs uppercase text-graphite sm:flex"
                >
                  <span aria-hidden="true" className="text-hairline">
                    /
                  </span>
                  <span className="text-through-line">{hereFolio}</span>
                  {/* The chapter's name, and the one thing in this row that has to give
                      way when the row is full.

                      It was `truncate`, which produced "05 EXPERI…" — a word
                      broken mid-syllable, which reads as a rendering fault
                      rather than as a decision. It is now shown or not shown:
                      hidden exactly in the 1024–1279 band, where the nine-item
                      nav has just appeared and there is genuinely no room for it,
                      and present either side of that — below 1024 the nav has
                      collapsed to the index button and there is room to spare,
                      from 1280 the row is wide enough to carry both. The folio
                      NUMBER stays at every width, so the reader's position is
                      never unstated. */}
                  <span className="lg:hidden xl:inline">{here.label}</span>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </Link>

          {/*
            ONE Search, outside both responsive clusters.

            It was first placed inside each of them — the desktop bar and the
            mobile one — which mounts the component twice, because those
            clusters are hidden with CSS rather than unmounted. Two instances
            means two global `/` key listeners and two `fixed inset-0` dialogs
            opening on top of each other, both grabbing focus. Caught by a
            strict-mode locator resolving to two elements, not by the build.

            The search mark is useful at every size, so it lives here, once,
            and the clusters sit beside it.
          */}
          <div className="flex shrink-0 items-center gap-3 lg:gap-5">
            <Search />

          {/* ── Desktop contents ─────────────────────────────────────────── */}
          <div
            /* gap-5, flat, at every width the cluster is visible.
               It was gap-8, and the cluster gained two members in the August
               pass — the reading switch and the CV — so the generous gap stopped
               fitting. Two measured failures, not guesses: at 1024px, where the
               cluster first appears, gap-8 put 1026px of content into 1024px and
               produced a horizontal scrollbar on every page; and at 1440px the
               row came to exactly its 1264px content box, which is what was
               eating the 16px the running head needed. Restoring the wider gap
               above some breakpoint was tried and reverted — the row is full at
               1600px too, because the shell stops growing at max-w-spread while
               the gaps do not. */
            className="hidden items-center gap-5 lg:flex"
          >
            <nav aria-label="Primary">
              <ul
                /* gap-4 up to 1560px. Nine labels, and each gap is 4px of pure
                   air: at 1440px the row was exactly full (211px of running head
                   + 1053px of controls in a 1264px content box), so the running
                   head was truncated to "05 EXPERI…" not because the window was
                   small but because the gaps had eaten the 16px the word needed.
                   Measured per element, after two wrong guesses made from the
                   row's total width — which includes its padding. */
                className="flex items-center gap-4 min-[1560px]:gap-5"
              >
                {navigation.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`group relative flex items-center gap-2 py-2 font-mono text-apparatus-xs uppercase transition-colors duration-300 ease-editorial ${
                          active ? "text-ink" : "text-graphite hover:text-ink"
                        }`}
                      >
                        {/* The station. A filled square when you are on the
                          page, a hollow one when you are not — the same
                          vocabulary Home's contents list uses for its
                          stations, so the two read as one system. */}
                        <span
                          aria-hidden="true"
                          className={`h-[5px] w-[5px] shrink-0 border transition-all duration-300 ease-editorial ${
                            active
                              ? "border-through-line bg-through-line"
                              : "border-hairline bg-transparent group-hover:border-graphite"
                          }`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <span aria-hidden="true" className="h-4 w-px bg-hairline" />

            <ReadingSwitch />

            <a
              href={CV_HREF}
              download
              className="group flex items-center gap-2 py-2 font-mono text-apparatus-xs uppercase text-graphite transition-colors duration-300 ease-editorial hover:text-ink"
            >
              CV
              <span
                aria-hidden="true"
                className="hidden text-[9px] leading-none text-graphite/70 transition-colors duration-300 group-hover:text-through-line min-[1700px]:inline"
              >
                PDF
              </span>
            </a>

            <PaperSwitch />
          </div>

          {/* ── Index toggle ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-4 lg:hidden">
            <PaperSwitch className="hidden sm:flex" />

            <button
              ref={toggleButtonRef}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="index-panel"
              aria-label={isOpen ? "Close index" : "Open index"}
              className="flex h-11 min-w-[44px] items-center gap-2.5 px-1 font-mono text-apparatus uppercase text-ink"
            >
              {isOpen ? t.close : t.index}
              <span
                aria-hidden="true"
                className="relative flex h-3 w-4 flex-col justify-between"
              >
                <span
                  className={`h-px w-full bg-ink transition-transform duration-300 ease-editorial ${
                    isOpen ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-ink transition-opacity duration-200 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-px w-full bg-ink transition-transform duration-300 ease-editorial ${
                    isOpen ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
          </div>
        </div>

        {/* ── The progress rule ──────────────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-through-line"
        />
      </header>

      {/*
        THE INDEX — rendered as a sibling of <header>, not a child of it.

        It was inside the header and it never appeared. The header carries
        `backdrop-blur-xl`, and an element with a backdrop-filter establishes a
        containing block for `position: fixed` descendants: the panel's
        `top-[58px] bottom-0` resolved against a 58px-tall header instead of
        against the viewport, so it laid itself out with negative height. The
        button toggled, the markup mounted, and nothing was drawn.
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="index-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-0 bottom-0 top-[58px] z-[45] overflow-y-auto border-t border-hairline bg-paper lg:hidden"
          >
            <nav aria-label="Index" className="px-5 pb-16 pt-8 sm:px-8">
              <p className="apparatus">{t.contents}</p>

              <ul className="mt-6">
                {destinations.map((link, i) => {
                  const active = isActive(link.href);

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.04 + i * 0.035,
                        ease: EASE,
                      }}
                      className="border-b border-hairline last:border-b-0"
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className="flex items-baseline gap-5 py-4"
                      >
                        <span
                          className={`font-mono text-apparatus-xs ${
                            active ? "text-through-line" : "text-graphite"
                          }`}
                        >
                          {folio(link.href)}
                        </span>
                        <span
                          className={`font-serif-display text-fluid-row ${
                            active ? "text-through-line" : "text-ink"
                          }`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Back matter and the CV. Both were reachable on a phone only
                  from the colophon at the very bottom of whichever chapter the
                  reader happened to be in. */}
              <div className="mt-10 border-t border-hairline pt-6">
                <p className="apparatus">{t.backMatter}</p>

                <ul className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-3">
                  {BACK_MATTER.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={`inline-flex min-h-11 items-center font-mono text-apparatus uppercase ${
                          isActive(link.href) ? "text-through-line" : "text-ink"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href={CV_HREF}
                      download
                      onClick={closeMenu}
                      className="inline-flex min-h-11 items-baseline gap-2 font-mono text-apparatus uppercase text-ink"
                    >
                      CV
                      <span
                        aria-hidden="true"
                        className="text-[9px] leading-none text-graphite"
                      >
                        PDF
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-hairline pt-6">
                <span className="apparatus">{t.reading}</span>
                <ReadingSwitch />
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-hairline pt-6">
                <span className="apparatus">{t.paper}</span>
                <PaperSwitch />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
