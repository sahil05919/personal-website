"use client";

import { useState } from "react";

interface StageData {
  label: string;
  badge: string;
  tagline: string;
}

const STAGES: StageData[] = [
  {
    label: "Raw Input",
    badge: "Stage 01 · Noise",
    tagline: "Unstructured telemetry, fragmented logs & cognitive friction",
  },
  {
    label: "Structured Schema",
    badge: "Stage 02 · Logic",
    tagline: "Normalized relational pipeline & reconciled ledger bounds",
  },
  {
    label: "Distilled Directive",
    badge: "Stage 03 · Essential",
    tagline: "The single actionable truth that remains",
  },
];

export default function ClarityEngine() {
  const [stage, setStage] = useState<number>(0);

  return (
    <section className="my-16 mx-auto max-w-2xl rounded-lg border border-neutral-200/90 bg-neutral-100/40 p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/40 backdrop-blur-sm">
      {/* Eyebrow & Live Stage Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-4 dark:border-neutral-800">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-pulse" />
          <span>Distillation Engine</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-300">
          {STAGES[stage].badge}
        </span>
      </div>

      {/* Stage Controller Tabs */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {STAGES.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setStage(idx)}
            className={`rounded border py-2 px-3 text-left font-mono text-xs transition-all ${
              stage === idx
                ? "border-neutral-900 bg-neutral-900 text-neutral-50 shadow-sm dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:border-neutral-600"
            }`}
          >
            <div className="text-[9px] uppercase tracking-widest opacity-70">
              0{idx + 1}
            </div>
            <div className="font-medium truncate">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Interactive Display Canvas */}
      <div className="mt-6 min-h-[190px] rounded border border-neutral-200/80 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950 flex flex-col justify-center">
        {stage === 0 && (
          <div className="space-y-2 font-mono text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed overflow-x-auto select-none">
            <p className="text-red-700/80 dark:text-red-400/80">
              [ERR_UNRECONCILED] 2,841 raw transaction nodes across 14 fragmented buckets
            </p>
            <p className="opacity-60">
              {`{ "payload": [0x4A, 0x1F, "AP_STALE", "DELTA_GBP_EUR", -4819.20, "PENDING_AUDIT"] }`}
            </p>
            <p className="opacity-40">
              {`SELECT * FROM unindexed_ledger WHERE status != 'RESOLVED' AND retry_count > 12;`}
            </p>
          </div>
        )}

        {stage === 1 && (
          <div className="space-y-2 font-mono text-xs text-neutral-700 dark:text-neutral-300">
            <div className="grid grid-cols-3 gap-2 border-b border-neutral-200 pb-2 dark:border-neutral-800 text-[10px] uppercase tracking-wider text-neutral-400">
              <span>Metric</span>
              <span>Vector</span>
              <span className="text-right">Variance</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <span className="font-medium">Accounts Payable</span>
              <span>Normalized</span>
              <span className="text-right text-emerald-700 dark:text-emerald-400">0.00%</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <span className="font-medium">Query Pipeline</span>
              <span>Indexed</span>
              <span className="text-right text-emerald-700 dark:text-emerald-400">4.2ms</span>
            </div>
          </div>
        )}

        {stage === 2 && (
          <div className="space-y-3 text-center py-2">
            <p className="font-serif text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-100 font-normal tracking-tight">
              &ldquo;The simplest system is the one with nothing left to remove.&rdquo;
            </p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-amber-700 dark:text-amber-400">
              Zero residual latency · Single source of truth
            </p>
          </div>
        )}
      </div>

      {/* Scrubbing Range Slider */}
      <div className="mt-5 space-y-2">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          <span>Entropy (100%)</span>
          <span>Clarity (0%)</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="1"
          value={stage}
          onChange={(e) => setStage(Number(e.target.value))}
          className="w-full h-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-neutral-100"
        />
      </div>

      <p className="mt-4 font-serif italic text-xs text-neutral-500 dark:text-neutral-400 text-center">
        {STAGES[stage].tagline}
      </p>
    </section>
  );
}