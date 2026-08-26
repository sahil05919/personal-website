import type { Metadata } from "next";
import { SOCIAL_CARD } from "@/lib/seo";

import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/jetbrains-mono";

import "./globals.css";

import Navbar from "@/components/global/Navbar";
import { Grain } from "@/components/global/Grain";
import SewnSpine from "@/components/global/SewnSpine";
import SolarGlow from "@/components/global/SolarGlow";
import DeckledEdge from "@/components/global/DeckledEdge";
import InkChemistry from "@/components/global/InkChemistry";
import CommonplaceBook from "@/components/global/CommonplaceBook";
import { PageTransition } from "@/components/global/PageTransition";
import Colophon from "@/components/global/Colophon";
import PageTurn from "@/components/global/PageTurn";
import Wayfinder from "@/components/global/Wayfinder";
import DogEar from "@/components/global/DogEar";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { DraftProvider, RevisionToggle } from "@/components/global/RevisionLayer";
import PageTurnPeel from "@/components/global/PageTurnPeel";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <DraftProvider>
            {/* Keyboard accessible skip link */}
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:border focus:border-neutral-300 focus:bg-neutral-50 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-neutral-900 focus:shadow-md dark:focus:border-neutral-700 dark:focus:bg-neutral-900 dark:focus:text-neutral-100"
            >
              Skip to content
            </a>

            {/* Interactive Dog-Ear Fold Bookmark */}
            <DogEar />

            {/* Tactile Paper, Lighting & Chemistry Layers */}
            <SolarGlow />
            <DeckledEdge />
            <InkChemistry />
            <Grain />
            <SewnSpine />

            {/* Persistent Navigation */}
            <Navbar />
            <Wayfinder />

            {/* Chapter Content */}
            <main id="content" className="pt-[72px]">
              <PageTransition>{children}</PageTransition>
            </main>

            {/* Chapter Exit / Page Turn */}
            <PageTurn />
            <PageTurnPeel />
            {/* Imprint & Dual Clocks */}
            <Colophon />

            {/* Commonplace Archival Collector */}
            <CommonplaceBook />

            {/* Revision Archaeology Floating Switch */}
            <RevisionToggle />
          </DraftProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}