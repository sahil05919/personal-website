"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Intentional: this second render after hydration prevents a
    // light/dark mismatch between server-rendered markup and the
    // client's real theme preference. This is next-themes' documented
    // pattern, not an accidental cascading update.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-[108px]" />;
  }

  const active = (value: string) =>
    theme === value
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:text-foreground";

  return (
    <div className="flex items-center rounded-md border border-border bg-card p-1">
      <button
        onClick={() => setTheme("light")}
        className={`rounded p-2 transition ${active("light")}`}
      >
        <Sun className="h-4 w-4" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`rounded p-2 transition ${active("dark")}`}
      >
        <Moon className="h-4 w-4" />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`rounded p-2 transition ${active("system")}`}
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
}