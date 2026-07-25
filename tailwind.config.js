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
        sans: ["Geist Sans", "Inter", "sans-serif"],
        display: ["Cal Sans", "Playfair Display", "serif"],
        /* Through-Line editorial serif, used for headings/chapter titles */
        "serif-display": ["Fraunces", "serif"],
        /* Long-form reading serif — used only on the /questions essay body */
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