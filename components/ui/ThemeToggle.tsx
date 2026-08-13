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

  // Icon-only buttons had no accessible name and no focus-visible ring of
  // their own — both added here as part of the sitewide motion/interaction
  // audit; a subtle scale on the active icon gives the switch a tactile
  // "settling into place" instead of a flat colour swap.
  const active = (value: string) =>
    theme === value
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:text-foreground";

  const base =
    "rounded p-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  const iconScale = (value: string) =>
    theme === value ? "scale-100" : "scale-90 hover:scale-100";

  return (
    <div className="flex items-center rounded-md border border-border bg-card p-1">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Light theme"
        aria-pressed={theme === "light"}
        className={`${base} ${active("light")}`}
      >
        <Sun className={`h-4 w-4 transition-transform duration-300 ${iconScale("light")}`} />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
        className={`${base} ${active("dark")}`}
      >
        <Moon className={`h-4 w-4 transition-transform duration-300 ${iconScale("dark")}`} />
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="Match system theme"
        aria-pressed={theme === "system"}
        className={`${base} ${active("system")}`}
      >
        <Monitor className={`h-4 w-4 transition-transform duration-300 ${iconScale("system")}`} />
      </button>
    </div>
  );
}