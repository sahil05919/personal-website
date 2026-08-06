import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
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
        <ThemeProvider>
          <Navbar />
          <main className="pt-[72px]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}