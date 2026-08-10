import type { Metadata } from 'next';

import ContactHero from '@/components/contact/ContactHero';
import Imprint from '@/components/contact/Imprint';
import BeforeYouGo from '@/components/contact/BeforeYouGo';
import ClosingSignature from '@/components/contact/ClosingSignature';
import { contactContent } from '@/data/contactData';

/**
 * Contact — the last room of the record.
 *
 * The reader has already met the person across eight chapters, so this page
 * does not explain him again. It says where he is, and then hands over one
 * last thing.
 *
 * THE SCROLL. Opening, doors, invitation, breath, note, mark, way back. The
 * single largest interval on the site sits between the invitation and
 * "Before you go" — one breath, not three, so it reads as held rather than as
 * a page that has not been set.
 *
 * Server component. The version this replaces was 'use client' at the top
 * level, which made per-page metadata impossible and left this page sharing
 * the layout's default CV-line description with three others. All four
 * children carry their own 'use client'.
 *
 * <article>, not <main> — app/layout.tsx already renders <main>.
 *
 * lib/heroRhythm.ts is deleted and stays deleted. It held this page's
 * measurements in order to echo a Home hero that no longer exists, it had one
 * consumer, and every class it exported was being purged because ./lib was
 * never in the Tailwind content array — so the headline was rendering at
 * browser-default size in the default font.
 *
 * min-h-screen is no longer needed for length, but stays: body still carries
 * bg-background (#FAFAFA) while the book is set on paper (#F7F6F3), and
 * without it an over-scroll shows the seam.
 */
export const metadata: Metadata = {
  title: contactContent.meta.title,
  description: contactContent.meta.description,
};

export default function ContactPage() {
  return (
    <article className="min-h-screen bg-paper text-ink">
      <ContactHero />
      <Imprint />

      {/* The breath. Nothing goes in it — the emptiness is the device, and it
          only reads as deliberate because every other gap on the page is
          ordinary chapter spacing. */}
      <div aria-hidden="true" className="h-40 md:h-[17rem]" />

      <BeforeYouGo />
      <ClosingSignature />
    </article>
  );
}
