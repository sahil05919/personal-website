import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import { Grain } from "@/components/global/Grain";
import { PageTransition } from "@/components/global/PageTransition";
import ThemeProvider from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
      <body className={`${inter.variable} antialiased`}>
        {/* reducedMotion="user": respects the OS prefers-reduced-motion
            setting sitewide. Verified against the installed framer-motion
            source (motion-dom's positionalKeys check) rather than assumed:
            under reduced motion, any animated x/y/scale/rotate/width/height
            value jumps instantly to its target instead of animating, while
            opacity animations are left to run — a plain crossfade isn't
            what prefers-reduced-motion targets, sudden movement is. This is
            what makes Journey's connector "draw-in" and the settle-in
            moments (AIR 35, the motorcycle mark, the Bayes milestone)
            resolve instantly under reduced motion instead of animating. */}
        <MotionConfig reducedMotion="user">
          <ThemeProvider>
            <Grain />
            <Navbar />
            <main className="pt-[72px]">
              <PageTransition>{children}</PageTransition>
            </main>
          </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  );
}