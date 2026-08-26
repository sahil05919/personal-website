"use client";

import { useState } from "react";

interface TypeSpecimen {
  fontName: string;
  sampleChar: string;
  category: string;
  hasAxes?: boolean;
}

const SPECIMENS: TypeSpecimen[] = [
  { fontName: "Fraunces", sampleChar: "R", category: "Variable Display Serif", hasAxes: true },
  { fontName: "Newsreader", sampleChar: "g", category: "Editorial Reading Serif", hasAxes: true },
  { fontName: "JetBrains Mono", sampleChar: "0", category: "Tabular Monospace", hasAxes: false },
];

export default function TypeLoupe() {
  const [activeSpecimen, setActiveSpecimen] = useState<TypeSpecimen>(SPECIMENS[0]);
  const [opsz, setOpsz] = useState(144);
  const [wonk, setWonk] = useState(1);
  const [soft, setSoft] = useState(50);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 border-t border-neutral-200/60 pt-6 dark:border-neutral-800/60">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Specimen Buttons */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
            Typeface Loupe:
          </span>
          {SPECIMENS.map((specimen) => (
            <button
              key={specimen.fontName}
              type="button"
              onClick={() => {
                setActiveSpecimen(specimen);
                setIsOpen(true);
              }}
              className={`font-mono text-xs underline underline-offset-4 transition-colors ${
                activeSpecimen.fontName === specimen.fontName && isOpen
                  ? "font-semibold text-amber-700 dark:text-amber-400"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
              }`}
            >
              {specimen.fontName}
            </button>
          ))}
        </div>

        {isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="font-mono text-[10px] uppercase text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          >
            [Close Specimen]
          </button>
        )}
      </div>

      {/* Expanded Letterpress Inspection Stage */}
      {isOpen && (
        <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-100/50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Magnified Optical Glyph Stage */}
            <div className="relative flex h-52 items-center justify-center rounded border border-neutral-200/80 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 overflow-hidden select-none">
              {/* Center Hairline Reticle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-full w-px border-r border-dashed border-neutral-300/60 dark:border-neutral-800" />
                <div className="w-full h-px border-b border-dashed border-neutral-300/60 dark:border-neutral-800" />
              </div>

              {/* Variable Font Character */}
              <span
                className="text-[130px] leading-none text-neutral-900 dark:text-neutral-100 transition-all"
                style={{
                  fontFamily:
                    activeSpecimen.fontName === "Fraunces"
                      ? "var(--font-fraunces), serif"
                      : activeSpecimen.fontName === "Newsreader"
                      ? "var(--font-newsreader), serif"
                      : "var(--font-jetbrains-mono), monospace",
                  fontVariationSettings:
                    activeSpecimen.fontName === "Fraunces"
                      ? `'opsz' ${opsz}, 'WONK' ${wonk}, 'SOFT' ${soft}`
                      : activeSpecimen.fontName === "Newsreader"
                      ? `'opsz' ${opsz}`
                      : undefined,
                }}
              >
                {activeSpecimen.sampleChar}
              </span>

              {/* Loupe Badge */}
              <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                12× Optical Loupe Reticle
              </span>
            </div>

            {/* Variable Axis Calibration Dials */}
            <div className="space-y-4 font-mono text-xs">
              <div>
                <p className="font-serif text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  {activeSpecimen.fontName}
                </p>
                <p className="text-[11px] text-neutral-400">{activeSpecimen.category}</p>
              </div>

              {activeSpecimen.hasAxes ? (
                <div className="space-y-3 pt-2">
                  {/* Optical Size Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-neutral-500">
                      <span>Optical Size (`opsz`)</span>
                      <span className="tabular-nums font-semibold">{opsz}pt</span>
                    </div>
                    <input
                      type="range"
                      min="9"
                      max="144"
                      value={opsz}
                      onChange={(e) => setOpsz(Number(e.target.value))}
                      className="w-full h-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {activeSpecimen.fontName === "Fraunces" && (
                    <>
                      {/* Wonkiness Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-neutral-500">
                          <span>Wonkiness (`WONK`)</span>
                          <span className="tabular-nums font-semibold">{wonk}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={wonk}
                          onChange={(e) => setWonk(Number(e.target.value))}
                          className="w-full h-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      {/* Softness Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-neutral-500">
                          <span>Serif Softness (`SOFT`)</span>
                          <span className="tabular-nums font-semibold">{soft}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={soft}
                          onChange={(e) => setSoft(Number(e.target.value))}
                          className="w-full h-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-[11px] italic text-neutral-400 pt-4">
                  Fixed geometric tabular monospaced axis.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}