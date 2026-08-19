import type { Metadata } from "next";

import { SOCIAL_CARD } from "@/lib/seo";

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
import SewnSpine from "@/components/global/SewnSpine";
import DogEar from "@/components/global/DogEar";
import { PageTransition } from "@/components/global/PageTransition";
import Colophon from "@/components/global/Colophon";
import PageTurn from "@/components/global/PageTurn";
import Wayfinder from "@/components/global/Wayfinder";
import ThemeProvider from "@/components/providers/ThemeProvider";

/* ---------------------------------------------------------------------------
   METADATA — what the site says about itself when it is not being read.

   The previous description was a CV line ("Business Analytics graduate and
   Finance Assistant building analytical systems with Power BI, SQL, Python and
   business operations"), and it was wrong in two separate ways.

   First, it was the retired positioning: that sentence describes the generic
   business-and-data-analyst framing this record no longer leads with.

   Second, and worse, it was not this site. Nine pages of essays about a saree
   shop in Mahendragarh, thirty-five first days and a residual of 1.5 million
   tonnes were being announced to every search engine and every shared link as
   a skills list. Home already had the right sentence in data/homeContent.ts;
   it simply was not being used anywhere the site is seen from outside.

   `metadataBase` is required for the relative OpenGraph URLs below to resolve.
   Without it Next emits a build warning and social cards resolve nothing.

   WHAT MOVED OUT OF HERE, AND WHY

   This object used to carry `alternates: { canonical: "/" }`, plus an
   `openGraph` block naming the home page's title, description and URL. Layout
   metadata is INHERITED, not merged per field, so every one of the thirteen
   routes was declaring Home as its canonical URL — an instruction to search
   engines to treat nine chapters as duplicates of the title page — and every
   shared link, whichever page it pointed at, previewed as Home.

   Both now come from `pageMetadata()` in lib/seo.ts, which each page calls
   with its own path. Nothing route-specific is declared here any more: what
   stays is only what is true of the whole book — the base URL, the title
   template, authorship, and the card format.

   The card image is `SOCIAL_CARD` (public/og.png, declared in lib/seo.ts). It
   is attached here as the sitewide default — /_not-found is the one route that
   does not call `pageMetadata` — and again per page, because a page's own
   `openGraph` block replaces an inherited one rather than merging into it. The
   `summary_large_image` card below previously had no image at all, which is why
   every shared link rendered as a blank plate.
--------------------------------------------------------------------------- */
const SITE = "https://sahilarora.vercel.app";

const DESCRIPTION =
  "A record kept by Sahil Kumar in London: the places, the reading, the questions still open, and the work behind them.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Sahil Kumar",
    template: "%s | Sahil Kumar",
  },
  description: DESCRIPTION,
  authors: [{ name: "Sahil Kumar", url: SITE }],
  creator: "Sahil Kumar",
  openGraph: {
    type: "website",
    siteName: "Sahil Kumar",
    locale: "en_GB",
    images: [SOCIAL_CARD],
  },
  twitter: {
    card: "summary_large_image",
    images: [SOCIAL_CARD],
  },
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

          {/* The binding. A layer of the sheet rather than a piece of chrome,
              so it mounts beside the paper texture and above nothing. */}
          <SewnSpine />

          <Navbar />
          <Wayfinder />

          <main id="content" className="pt-[72px]">
            <PageTransition>{children}</PageTransition>
          </main>

          {/* The turn. Above the colophon, because in a book you reach the
              next chapter before you reach the imprint. Renders only on the
              nine chapters — back matter is not part of the reading order. */}
          <PageTurn />

          {/* The imprint, on every page. The site previously ended on Home
              and nowhere else — eight of nine pages simply stopped, with no
              way back and no mark of authorship. A book has one colophon and
              it is at the end of every copy. */}
          <Colophon />

          {/* The corner. Last in the body, because a fold is the last thing that
              happens to a page and because it must sit above the colophon it
              overlaps at the foot of every chapter. */}
          <DogEar />
        </ThemeProvider>
      </body>
    </html>
  );
}
