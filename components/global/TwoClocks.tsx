"use client";

import { useEffect, useState } from "react";

function getTimeData(timeZone: string) {
  const now = new Date();
  const timeStr = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  const hour = parseInt(
    new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "numeric",
      hour12: false,
    }).format(now),
    10
  );

  const isDay = hour >= 6 && hour < 19;

  return { time: timeStr, isDay };
}

export default function TwoClocks() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState({
    london: { time: "00:00", isDay: true },
    mahendragarh: { time: "00:00", isDay: true },
  });

  useEffect(() => {
    const update = () => {
      setData({
        london: getTimeData("Europe/London"),
        mahendragarh: getTimeData("Asia/Kolkata"),
      });
    };
    update();
    setMounted(true);
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-6 font-mono text-xs text-neutral-500">
      {/* London */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            mounted
              ? data.london.isDay
                ? "bg-amber-500/90"
                : "bg-indigo-400/90"
              : "bg-neutral-300"
          }`}
          title={mounted ? (data.london.isDay ? "Day" : "Night") : ""}
        />
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
            London
          </span>
          <span className="tabular-nums font-medium text-neutral-700 dark:text-neutral-300">
            {mounted ? data.london.time : <span className="opacity-30">--:--</span>}
          </span>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" />

      {/* Mahendragarh */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            mounted
              ? data.mahendragarh.isDay
                ? "bg-amber-500/90"
                : "bg-indigo-400/90"
              : "bg-neutral-300"
          }`}
          title={mounted ? (data.mahendragarh.isDay ? "Day" : "Night") : ""}
        />
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
            Mahendragarh
          </span>
          <span className="tabular-nums font-medium text-neutral-700 dark:text-neutral-300">
            {mounted ? data.mahendragarh.time : <span className="opacity-30">--:--</span>}
          </span>
        </div>
      </div>
    </div>
  );
}