"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { searchIndex, score, KIND_ORDER, type SearchRecord } from "@/data/searchIndex";

/**
 * SEARCH — the one piece of software chrome on a site made of paper.
 *
 * ---------------------------------------------------------------------------
 * WHETHER IT BELONGED HERE AT ALL
 *
 * A search box on a nine-page personal site is usually a tell: it means the
 * navigation failed and a text input was added instead of fixing it. This one
 * earns its place for a specific reason — the site has an INDEX. Somebody who
 * looks up "Brighton" in the back matter and finds it under B is the same
 * person who would type it, and the index already proves those lookups happen.
 * This is the index with a keyboard attached.
 *
 * It is also the only way to find something whose name you half-remember
 * without knowing which of nine chapters it is in, which is the actual problem
 * on a site of essays.
 *
 * ---------------------------------------------------------------------------
 * HOW IT STAYS OUT OF THE WAY
 *
 * A mark in the running head, and the `/` key — the shortcut every reading site
 * has trained people on. No persistent input taking up bar space, no
 * placeholder text sitting on nine pages saying "Search…".
 *
 * The panel is a real dialog: Escape closes it, focus moves into the field on
 * open and returns to the trigger on close, the arrow keys walk the results and
 * Enter opens one. Nothing here needs a mouse.
 *
 * NO FUZZY MATCHING, and no library. See `score` in data/searchIndex.ts — on a
 * corpus this small, fuzzy matching returns confident nonsense and buries the
 * honest answer, which is sometimes "that is not on this site."
 */

const MAX_RESULTS = 8;

export default function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const listId = "search-results";

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchIndex
      .map((record) => ({ record, value: score(record, query) }))
      .filter((r) => r.value > 0)
      .sort((a, b) => {
        if (b.value !== a.value) return b.value - a.value;
        // Ties break by kind, so a chapter outranks an index term that scored
        // the same — otherwise the order would depend on array position.
        return (
          KIND_ORDER.indexOf(a.record.kind) - KIND_ORDER.indexOf(b.record.kind)
        );
      })
      .slice(0, MAX_RESULTS)
      .map((r) => r.record);
  }, [query]);

  // `/` opens it from anywhere, except while the reader is typing into
  // something — the unsigned form on /contact would otherwise be uneditable.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (open) return;
      if (event.key !== "/") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target;
      if (target instanceof HTMLElement) {
        if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
        if (target.isContentEditable) return;
      }

      event.preventDefault();
      setOpen(true);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Lock the page and move focus in. Both undone on close.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    input.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
    setCursor(0);
    trigger.current?.focus();
  }

  function go(record: SearchRecord) {
    if (record.external) {
      window.open(record.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(record.href);
    }
    close();
  }

  function onFieldKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (results.length === 0 ? 0 : (c + 1) % results.length));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) =>
        results.length === 0 ? 0 : (c - 1 + results.length) % results.length,
      );
      return;
    }
    if (event.key === "Enter") {
      const chosen = results[cursor];
      if (chosen) {
        event.preventDefault();
        go(chosen);
      }
    }
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search this record"
        title="Search  /"
        className="flex h-[26px] w-[26px] items-center justify-center text-graphite transition-colors duration-300 ease-editorial hover:text-ink"
      >
        {/* Drawn, not imported. A 1.25px stroke on `currentColor` sits at the
            same weight as every hairline on the site; an icon-set magnifier
            would be the one 2px-stroked object on the page. */}
        <svg
          viewBox="0 0 20 20"
          className="h-[15px] w-[15px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden="true"
        >
          <circle cx="8.5" cy="8.5" r="5.5" />
          <line x1="12.8" y1="12.8" x2="17" y2="17" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center px-5 pt-[14vh]"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* The scrim. Ink at low alpha rather than black, so it darkens the
              paper rather than replacing it. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="relative w-full max-w-[34rem] border border-hairline bg-vellum shadow-plate"
          >
            <div className="flex items-center gap-3 border-b border-hairline px-5">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 shrink-0 text-graphite"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                aria-hidden="true"
              >
                <circle cx="8.5" cy="8.5" r="5.5" />
                <line x1="12.8" y1="12.8" x2="17" y2="17" strokeLinecap="round" />
              </svg>

              <input
                ref={input}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onFieldKeyDown}
                placeholder="A place, a project, a year, a word"
                aria-label="Search this record"
                aria-controls={listId}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                className="w-full border-0 bg-transparent py-4 font-reading text-fluid-read text-ink outline-none placeholder:text-graphite/60 focus:outline-none focus:ring-0"
              />

              <button
                type="button"
                onClick={close}
                className="shrink-0 font-mono text-apparatus-xs uppercase text-graphite transition-colors duration-300 hover:text-ink"
              >
                Esc
              </button>
            </div>

            <div id={listId} role="listbox" aria-label="Results">
              {query.trim() && results.length === 0 ? (
                /* The honest empty state. It names what was searched and does
                   not suggest anything — a "did you mean" on a corpus this
                   small would be guessing out loud. */
                <p className="px-5 py-6 font-reading text-fluid-aside text-graphite">
                  Nothing here matches &ldquo;{query.trim()}&rdquo;. It may
                  still be in the prose — this searches titles, questions and
                  index terms, not every sentence.
                </p>
              ) : null}

              {results.map((record, i) => (
                <button
                  key={`${record.kind}-${record.href}-${record.title}`}
                  type="button"
                  role="option"
                  aria-selected={i === cursor}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => go(record)}
                  className={`flex w-full items-baseline gap-4 border-b border-hairline/60 px-5 py-3 text-left last:border-b-0 ${
                    i === cursor ? "bg-well" : ""
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-reading text-fluid-aside text-ink">
                      {record.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-apparatus-xs uppercase text-graphite">
                      {record.context}
                      {record.external ? " · opens off-site" : ""}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-apparatus-xs uppercase text-graphite/70">
                    {record.kind}
                  </span>
                </button>
              ))}

              {!query.trim() ? (
                <p className="px-5 py-6 font-reading text-fluid-aside text-graphite">
                  Search the chapters, the essays, the questions and the index.
                  Press{" "}
                  <kbd className="font-mono text-apparatus-xs">&uarr;</kbd>{" "}
                  <kbd className="font-mono text-apparatus-xs">&darr;</kbd> to
                  move, <kbd className="font-mono text-apparatus-xs">Enter</kbd>{" "}
                  to open.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
