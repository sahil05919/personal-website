import Link from "next/link";
import TwoClocks from "@/components/global/TwoClocks";
import TypeLoupe from "@/components/global/TypeLoupe";

export default function Colophon() {
  return (
    <footer className="mt-32 border-t border-neutral-200/80 bg-neutral-50/50 py-16 text-neutral-600 dark:border-neutral-800/80 dark:bg-neutral-950/50 dark:text-neutral-400">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          {/* Left Column: Authorial Imprint */}
          <div className="space-y-2 text-xs">
            <p className="font-serif italic text-neutral-500 dark:text-neutral-400">
              Written in London. Revised when it stops being true.
            </p>
            <p className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
              Set in Fraunces, Newsreader, and JetBrains Mono.
            </p>
          </div>

          {/* Right Column: Solar Clocks */}
          <div className="flex items-center">
            <TwoClocks />
          </div>
        </div>

        {/* Interactive Typography Loupe */}
        <TypeLoupe />
      </div>
    </footer>
  );
}