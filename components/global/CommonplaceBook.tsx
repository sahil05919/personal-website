"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCommonplace } from "@/hooks/use-commonplace";

export default function CommonplaceBook() {
  const pathname = usePathname();
  const { entries, addEntry, removeEntry, clearEntries, mounted } = useCommonplace();
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{ x: number; y: number; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Monitor text selection across the document
  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setSelectionBox(null);
        return;
      }

      const text = selection.toString().trim();
      if (text.length > 12 && text.length < 500) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectionBox({
          x: rect.left + rect.width / 2,
          y: rect.top - 12 + window.scrollY,
          text,
        });
      } else {
        setSelectionBox(null);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleClip = () => {
    if (!selectionBox) return;
    const chapterName = pathname === "/" ? "Frontispiece" : pathname.replace("/", "").toUpperCase();
    addEntry(selectionBox.text, chapterName, pathname);
    setSelectionBox(null);
    window.getSelection()?.removeAllRanges();
  };

  const handleCopyTranscript = () => {
    if (entries.length === 0) return;
    const transcript = entries
      .map(
        (e) =>
          `“${e.quote}”\n— Sahil Kumar · ${e.sourceChapter} (${e.clippedAt})\n`
      )
      .join("\n---\n\n");

    navigator.clipboard.writeText(
      `COMMONPLACE FOLIO · SAHIL KUMAR\nLondon · Revised when it stops being true.\n\n${transcript}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Selection Clip Indicator */}
      {selectionBox && (
        <div
          className="fixed z-50 -translate-x-1/2 -translate-y-full animate-in fade-in zoom-in-95 duration-150"
          style={{ left: `${selectionBox.x}px`, top: `${selectionBox.y - window.scrollY}px` }}
        >
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              handleClip();
            }}
            className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-[11px] text-neutral-100 shadow-lg transition-transform hover:scale-105 active:scale-95 dark:border-neutral-200 dark:bg-neutral-100 dark:text-neutral-900"
          >
            <span>+ Clip to Commonplace</span>
          </button>
        </div>
      )}

      {/* Persistent Commonplace Pill Toggle (Bottom Center-Left) */}
      <aside className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 backdrop-blur-md shadow-sm ${
            isOpen || entries.length > 0
              ? "border-neutral-400 bg-neutral-100/90 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900/90 dark:text-neutral-100"
              : "border-neutral-300/80 bg-neutral-50/80 text-neutral-500 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-400"
          }`}
        >
          <span className="font-serif italic font-normal text-xs">§</span>
          <span>Commonplace</span>
          {entries.length > 0 && (
            <span className="rounded-full bg-amber-600 dark:bg-amber-500 px-1.5 py-0.2 text-[9px] font-semibold text-white dark:text-neutral-950">
              {entries.length}
            </span>
          )}
        </button>
      </aside>

      {/* Slide-out Commonplace Archival Folio */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-neutral-950/20 backdrop-blur-[2px] transition-opacity">
          <div
            className="relative flex h-full w-full max-w-md flex-col border-l border-neutral-200 bg-neutral-50 p-6 shadow-2xl transition-transform dark:border-neutral-800 dark:bg-neutral-950 sm:p-8"
            role="dialog"
            aria-label="Commonplace Book"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-neutral-200/80 pb-4 dark:border-neutral-800">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  Reader&apos;s Folio
                </div>
                <h2 className="font-serif text-2xl font-normal text-neutral-900 dark:text-neutral-100">
                  Commonplace Book
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs uppercase text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                [Close]
              </button>
            </div>

            {/* Sub-label */}
            <p className="py-3 font-serif italic text-xs text-neutral-500 dark:text-neutral-400">
              Selected excerpts gathered while reading across leaves. Highlight any text on the site to clip.
            </p>

            {/* Excerpts Scrollable List */}
            <div className="flex-1 space-y-4 overflow-y-auto py-4 divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
              {entries.length === 0 ? (
                <div className="py-16 text-center font-mono text-xs text-neutral-400">
                  No passages clipped yet. Select text anywhere on the page to collect it.
                </div>
              ) : (
                entries.map((entry) => (
                  <div key={entry.id} className="pt-4 first:pt-0 space-y-2 group">
                    <blockquote className="font-serif text-[15px] italic leading-relaxed text-neutral-800 dark:text-neutral-200">
                      &ldquo;{entry.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                      <span>
                        Leaf: <span className="uppercase text-neutral-600 dark:text-neutral-300">{entry.sourceChapter}</span> · {entry.clippedAt}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeEntry(entry.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-600/70 hover:text-red-600 transition-opacity"
                      >
                        [Discard]
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Folio Action Footer */}
            {entries.length > 0 && (
              <div className="border-t border-neutral-200/80 pt-4 space-y-3 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={handleCopyTranscript}
                  className="w-full rounded border border-neutral-900 bg-neutral-900 py-2.5 font-mono text-xs uppercase tracking-wider text-neutral-50 transition-colors hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-200"
                >
                  {copied ? "✓ Copied Folio Transcript" : "Export Commonplace Leaf"}
                </button>
                <div className="flex justify-between items-center px-1 font-mono text-[10px] text-neutral-400">
                  <span>{entries.length} passage{entries.length === 1 ? "" : "s"} retained</span>
                  <button
                    type="button"
                    onClick={clearEntries}
                    className="hover:text-red-500 transition-colors underline underline-offset-2"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}