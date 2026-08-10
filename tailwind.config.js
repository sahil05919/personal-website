/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    /* ./lib and ./data are included because class strings can legitimately
       live outside a component file. They were not, and lib/heroRhythm.ts —
       which held every measurement on the Contact page — was silently purged
       in full: the headline rendered at browser-default size in the default
       font, and two reserved spacer heights collapsed to nothing. Nothing
       errored. Any future file that composes class names outside ./app or
       ./components fails the same way, so both globs stay whether or not
       anything currently matches them. */
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",

        card: "rgb(var(--card) / <alpha-value>)",
        "card-foreground": "rgb(var(--card-foreground) / <alpha-value>)",

        border: "rgb(var(--border) / <alpha-value>)",

        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",

        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-foreground":
          "rgb(var(--primary-foreground) / <alpha-value>)",

        accent: "rgb(var(--accent) / <alpha-value>)",

        /* Through-Line. No longer scoped to components/home/* — Contact is
           fully migrated. Still to migrate: Now, Experience, Questions. The
           shadcn block above cannot be deleted until they are. */
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        graphite: "rgb(var(--graphite) / <alpha-value>)",
        hairline: "rgb(var(--hairline) / <alpha-value>)",
        "through-line": "rgb(var(--through-line) / <alpha-value>)",
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        "serif-display": ["Fraunces", "serif"],
        reading: ["Newsreader", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },

      boxShadow: {
        premium:
          "0 0 0 1px rgb(var(--border) / 0.3), 0 8px 32px rgb(0 0 0 / 0.08)",
      },
    },
  },
  plugins: [],
};

/* REMOVED: the `display` family, which mapped to ["Cal Sans", "Playfair
   Display", serif]. Neither font is loaded anywhere in the app, so every use
   of `font-display` rendered in the browser's default serif. Its only
   consumers were the two imprint lines on Contact and the Contact headline
   via lib/heroRhythm.ts; all three now use `font-serif-display` (Fraunces).
   Deleting the key means a future `font-display` fails loudly at review
   instead of quietly in the browser.

   NOTE: no `serif` key is defined, deliberately — the two serif roles are
   `serif-display` and `reading`. `font-serif` therefore resolves to Tailwind's
   default ui-serif/Georgia stack and renders in a system face with no error.
   If you see `font-serif` in a component, it is a bug. */
