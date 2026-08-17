import type { Metadata } from 'next';

import ContactHero from '@/components/contact/ContactHero';
import Imprint from '@/components/contact/Imprint';
import Unsigned from '@/components/contact/Unsigned';
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
 * bg-paper (#FAFAFA) while the book is set on paper (#F7F6F3), and
 * without it an over-scroll shows the seam.
 */
export const metadata: Metadata = {
  title: contactContent.meta.title,
  description: contactContent.meta.description,
};

export default function ContactPage() {
  /*
    THE SECTION ALWAYS RENDERS. Whether it can actually deliver is a separate
    question, answered here and passed down.

    The first version of this hid the whole section when `UNSIGNED_ENDPOINT`
    was unset, on the reasoning that a form which cannot deliver is worse than
    no form at all. That reasoning was fine and the behaviour was wrong: it
    meant the section was invisible until an environment variable existed
    somewhere, so the person who owns the site could not see the thing that had
    been built for it. A feature you cannot look at is a feature you cannot
    judge.

    So it renders either way, and when it is not connected it says so in its
    own voice and points at the email address instead of offering a Send button
    that would fail. Nobody is invited to compose something and then lose it.

    `UNSIGNED_ENDPOINT` is a plain server variable — read at render, never sent
    to the browser. Set it in Vercel → Settings → Environment Variables; see
    app/api/unsigned/route.ts for the two variables and what accepts them.
  */
  const unsignedConfigured = Boolean(process.env.UNSIGNED_ENDPOINT);

  return (
    <article className="min-h-screen bg-paper text-ink">
      <ContactHero />
      <Imprint />

      <Unsigned configured={unsignedConfigured} />

      {/* The breath. Nothing goes in it — the emptiness is the device, and it
          only reads as deliberate because every other gap on the page is
          ordinary chapter spacing. */}
      <div aria-hidden="true" className="h-40 md:h-[17rem]" />

      <BeforeYouGo />
      <ClosingSignature />
    </article>
  );
}
