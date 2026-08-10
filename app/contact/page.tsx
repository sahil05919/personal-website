'use client';

import ContactHero from '@/components/contact/ContactHero';
import Horizon from '@/components/contact/Horizon';
import ClosingSignature from '@/components/contact/ClosingSignature';
import { heroRhythm } from '@/lib/heroRhythm';

/**
 * Contact — the last page of the book.
 *
 * Deliberately thin. The page's job is sequencing: the Home hero's shape, the
 * space where its opening figure was, the horizon, then the ending. All
 * measurement lives in lib/heroRhythm.ts so the echo cannot drift.
 *
 * Paper and ink, not background and foreground. The shadcn tokens this page
 * used are a different grey from the rest of the site — near enough to look
 * accidental rather than systematic.
 */
export default function ContactPage() {
  return (
    <section className={`min-h-screen bg-paper text-ink ${heroRhythm.page}`}>
      <div className={heroRhythm.container}>
        <ContactHero />
        <Horizon />

        {/*
          The only element permitted to break the echo. Everything above
          belongs to Home; this belongs only to the ending.

          Deliberately shorter than heroRhythm.actionsToField. The intervals
          above are structural — they hold the echo. This one is a seam
          between the horizon and the ending, and the ending should follow
          closely rather than be announced.
        */}
        <div className="mt-12 md:mt-16">
          <ClosingSignature />
        </div>
      </div>
    </section>
  );
}