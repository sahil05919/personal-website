import type { Metadata } from "next";

/* ---------------------------------------------------------------------------
   TYPE — self-hosted, three faces, no third-party origin.

   These were loaded with a CSS `@import` from fonts.googleapis.com at the top
   of globals.css. That is render-blocking and serialised: the browser fetches
   the stylesheet, parses it, fetches a second stylesheet, then fetches the
   fonts — a guaranteed flash of fallback text on every cold load, on the three
   faces that carry the entire design. Only Inter, the one face that has now
   been removed, was loaded properly.

   They are now bundled from node_modules and served from the site's own
   origin, versioned and immutable. Variable in every case, so the whole weight
   range and the optical-size axis cost one file per subset.

   Fraunces carries its full axis set (opsz / SOFT / WONK) because the display
   face uses all three — see the .font-serif-display rule in globals.css.
--------------------------------------------------------------------------- */
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/jetbrains-mono";

import "./globals.css";

import Navbar from "@/components/global/Navbar";
import { Grain } from "@/components/global/Grain";
import { PageTransition } from "@/components/global/PageTransition";
import Colophon from "@/components/global/Colophon";
import Wayfinder from "@/components/global/Wayfinder";
import ThemeProvider from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Sahil Kumar",
    template: "%s | Sahil Kumar",
  },
  description:
    "Business Analytics graduate and Finance Assistant building analytical systems with Power BI, SQL, Python and business operations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {/* Skip link. With a nine-item nav and a theme switcher, a keyboard
              user was tabbing through eleven controls on every page before
              reaching a word of content. It is invisible until focused and
              then it is a real, styled element rather than a browser default. */}
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:border focus:border-hairline focus:bg-vellum focus:px-4 focus:py-2 focus:font-mono focus:text-apparatus focus:uppercase focus:text-ink focus:shadow-plate"
          >
            Skip to content
          </a>

          <Grain />
          <Navbar />
          <Wayfinder />

          <main id="content" className="pt-[72px]">
            <PageTransition>{children}</PageTransition>
          </main>

          {/* The imprint, on every page. The site previously ended on Home
              and nowhere else — eight of nine pages simply stopped, with no
              way back and no mark of authorship. A book has one colophon and
              it is at the end of every copy. */}
          <Colophon />
        </ThemeProvider>
      </body>
    </html>
  );
}
