/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    /* lib/ was missing. Class strings kept there — lib/heroRhythm.ts, which
       the Contact page depends on entirely — were being purged from the build,
       so Contact's headline rendered at browser-default scale in a browser
       default face. */
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
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
  sans: ["var(--font-inter)", "system-ui", "sans-serif"],
  display: ["Cal Sans", "Playfair Display", "serif"],
  "serif-display": ["Fraunces", "serif"],
  reading: ["Newsreader", "Georgia", "serif"],
  mono: ["JetBrains Mono", "ui-monospace", "monospace"],
},

      /* Fluid type scale.
         Home previously stepped between two fixed sizes at one breakpoint,
         which leaves a dead zone: 3.25rem holds from 320px to 767px and then
         jumps to 4.5rem. These interpolate continuously, so the page has no
         width at which the type is wrong for the measure, and no <br> is ever
         needed to control a wrap. Line height and tracking travel with the
         size, because a display face set at 5rem needs tighter leading than
         the same face at 2.75rem. */
      fontSize: {
        "fluid-display": [
          "clamp(2.625rem, 1.2rem + 7.1vw, 6rem)",
          { lineHeight: "0.98", letterSpacing: "-0.03em" },
        ],
        "fluid-claim": [
          "clamp(1.75rem, 1.05rem + 3.5vw, 3.25rem)",
          { lineHeight: "1.18", letterSpacing: "-0.02em" },
        ],
        "fluid-row": [
          "clamp(1.375rem, 1.05rem + 1.65vw, 2.125rem)",
          { lineHeight: "1.25", letterSpacing: "-0.01em" },
        ],
        "fluid-read": [
          "clamp(1.0625rem, 1rem + 0.32vw, 1.1875rem)",
          { lineHeight: "1.75" },
        ],
        "fluid-aside": [
          "clamp(0.9375rem, 0.9rem + 0.2vw, 1rem)",
          { lineHeight: "1.6" },
        ],
        /* Apparatus. Fixed on purpose — mono labels are a constant, not part
           of the scale, and growing them with the viewport would turn a margin
           note into a heading. */
        apparatus: ["11px", { lineHeight: "1.7", letterSpacing: "0.06em" }],
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