/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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

        /* Through-Line homepage tokens — additive, scoped to components/home/* */
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        graphite: "rgb(var(--graphite) / <alpha-value>)",
        hairline: "rgb(var(--hairline) / <alpha-value>)",
        "through-line": "rgb(var(--through-line) / <alpha-value>)",
      },

      fontFamily: {
        /* KNOWN ISSUE: next/font registers a generated family name exposed as
           --font-geist-sans, so the literal "Geist Sans" below never matches
           and Inter is not loaded. font-sans currently falls back to the system
           sans everywhere. Fix alongside the /writing build. */
        sans: ["Geist Sans", "Inter", "sans-serif"],
        display: ["Cal Sans", "Playfair Display", "serif"],
        /* Through-Line editorial serif — headings, chapter titles, and the
           short Fraunces statements that carry Sahil's voice. Loaded at 400
           and 500 only; never use a heavier weight. */
        "serif-display": ["Fraunces", "serif"],
        /* Long-form reading serif — prose read at length: the /questions essay
           body and the /media captions. Loaded upright 400, italic 400 and
           italic 500. There is no upright 500, so never apply font-medium to
           non-italic text set in this face; the browser will synthesise it. */
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

/* NOTE: no `serif` key is defined, deliberately — the two serif roles are
   `serif-display` and `reading`. `font-serif` therefore resolves to Tailwind's
   default ui-serif/Georgia stack and renders in a system face with no error.
   If you see `font-serif` in a component, it is a bug. */