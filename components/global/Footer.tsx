'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background px-6 md:px-24 py-8 select-none">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:flex-row">
        <div>
          © {currentYear} Sahil Kumar. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>

          <span className="text-border">/</span>

          <div className="text-right font-light normal-case tracking-normal">
            Built with Next.js, Tailwind CSS and Framer Motion
          </div>
        </div>
      </div>
    </footer>
  );
}