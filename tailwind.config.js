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
      /* ------------------------------------------------------------------
         COLOUR — one system, three themes.

         There used to be two complete palettes living side by side: a
         shadcn set (--background / --foreground / indigo --accent) and the
         Through-Line set (--paper / --ink / cobalt). Two near-identical
         greys and two near-identical blues is what makes a considered site
         read as assembled rather than authored, so the shadcn block is gone
         and every page is on these tokens.

         The values themselves live in app/globals.css, once per theme:
         `:root, .light` (Paper), `.dark` (Ink) and `.blueprint`. Nothing
         here knows which theme is active — that is the entire point.
      ------------------------------------------------------------------ */
      colors: {
        /** The page ground. Warm, never pure white, never pure black. */
        paper: "rgb(var(--paper) / <alpha-value>)",
        /** A surface raised off the page: plates, cards, inset panels. */
        vellum: "rgb(var(--vellum) / <alpha-value>)",
        /** A surface sunk into the page: wells, quotes, errata. */
        well: "rgb(var(--well) / <alpha-value>)",

        /** Primary text. */
        ink: "rgb(var(--ink) / <alpha-value>)",
        /** Secondary text: apparatus, captions, standfirsts. */
        graphite: "rgb(var(--graphite) / <alpha-value>)",
        /** Rules, borders, the spine at rest. */
        hairline: "rgb(var(--hairline) / <alpha-value>)",

        /**
         * The accent. One blue on the whole site, and there is deliberately
         * no second one: a warm counter-accent was defined here and then
         * used nowhere, which is the same defect as the `boxShadow.premium`
         * and `StatusChip` this pass removed. If a second accent is ever
         * genuinely needed, add it at the moment it acquires a consumer.
         */
        "through-line": "rgb(var(--through-line) / <alpha-value>)",
      },

      fontFamily: {
        /* All three faces are self-hosted via @fontsource-variable and
           imported in app/layout.tsx. Nothing is fetched from a third-party
           origin at runtime any more. */
        "serif-display": ["'Fraunces Variable'", "Fraunces", "Georgia", "serif"],
        reading: ["'Newsreader Variable'", "Newsreader", "Georgia", "serif"],
        mono: [
          "'JetBrains Mono Variable'",
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
        /* No `sans` and no `serif` key, deliberately. This site has three
           typographic roles and every one of them is named. A stray
           `font-sans` or `font-serif` in a component is a bug, and leaving
           the keys undefined is what makes it visible at review. */
      },

      /* ------------------------------------------------------------------
         TYPE SCALE

         These utilities were being used across the home page and were
         defined nowhere — `text-fluid-display`, `text-apparatus` and four
         siblings all resolved to nothing, so the title of the site rendered
         at inherited body size. That is why Home looked like a draft.

         The scale is fluid rather than breakpoint-stepped because the page
         is a reading column: type should track the viewport continuously,
         the way a printed page's measure tracks its trim size. Every entry
         carries its own leading and tracking so a size can never be used
         without them.
      ------------------------------------------------------------------ */
      fontSize: {
        /* Apparatus. Mono, uppercase, wide. Figure numbers, margin labels,
           stamps — everything that annotates rather than speaks. */
        apparatus: [
          "0.6875rem",
          { lineHeight: "1.45", letterSpacing: "0.1em" },
        ],
        "apparatus-xs": [
          "0.625rem",
          { lineHeight: "1.4", letterSpacing: "0.12em" },
        ],

        /* Voice. Fraunces. */
        "fluid-mega": [
          "clamp(3.25rem, 10.5vw, 8.5rem)",
          { lineHeight: "0.92", letterSpacing: "-0.035em" },
        ],
        "fluid-display": [
          "clamp(2.5rem, 7vw, 5.5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.028em" },
        ],
        "fluid-title": [
          "clamp(1.875rem, 4.4vw, 3.375rem)",
          { lineHeight: "1.07", letterSpacing: "-0.022em" },
        ],
        "fluid-claim": [
          "clamp(1.5rem, 3.2vw, 2.5rem)",
          { lineHeight: "1.2", letterSpacing: "-0.018em" },
        ],
        "fluid-row": [
          "clamp(1.1875rem, 1.8vw, 1.625rem)",
          { lineHeight: "1.28", letterSpacing: "-0.012em" },
        ],

        /* Reading. Newsreader. */
        "fluid-read": [
          "clamp(1.0625rem, 0.3vw + 1rem, 1.1875rem)",
          { lineHeight: "1.74" },
        ],
        "fluid-aside": [
          "clamp(0.9375rem, 0.22vw + 0.875rem, 1.0625rem)",
          { lineHeight: "1.66" },
        ],
      },

      /* The page's one easing curve. Named so a component can never invent
         a second one by typing slightly different numbers. */
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      boxShadow: {
        /* A plate lifted off the paper. Two layers: a hairline contact edge
           and a wide, very soft cast. Tuned per theme via --shade. */
        plate:
          "0 1px 2px rgb(var(--shade) / 0.05), 0 12px 32px -12px rgb(var(--shade) / 0.14)",
        /* The same plate, picked up. Used on hover only. */
        lift:
          "0 2px 4px rgb(var(--shade) / 0.06), 0 24px 56px -16px rgb(var(--shade) / 0.2)",
        /* Sunk into the page rather than raised off it. */
        well: "inset 0 1px 3px rgb(var(--shade) / 0.08)",
      },

      maxWidth: {
        /* Sustained prose. ~62 characters at the fluid reading size. */
        measure: "36rem",
        /* Display type breaking the measure: claims, standfirsts. */
        wide: "46rem",
        /* The reading shell: content plus the spine gutter. */
        shell: "62rem",
        /* The spread — pages that run two columns or a full-bleed figure. */
        spread: "84rem",
      },
    },
  },
  plugins: [],
};
