'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { contactInfo } from '@/data/contactData';
import { heroRhythm } from '@/lib/heroRhythm';

/**
 * Horizon
 *
 * Where the Home frontispiece resolves a field of dots into a line, this page
 * has an open field with nothing in it, and then the line — already resolved,
 * flat, at rest.
 *
 * The imprint is set in the book's own face rather than in mono. Mono is the
 * data-label typeface across this site, and setting an imprint in it makes the
 * block read as metadata. Fraunces italic reads as printed matter. The one
 * exception is the telephone number, which stays mono because it genuinely is
 * a figure — a machine-set numeral inside printed prose, which is how books
 * have always handled it.
 *
 * NOTE: font-serif-display, not font-display. The `display` family points at
 * Cal Sans and Playfair Display, neither of which is loaded anywhere in the
 * app; these two lines rendered in the browser's default serif for the whole
 * life of the page. Delete the `display` key from tailwind.config.js so it
 * cannot be reached for again.
 *
 * Two lines, deliberately unequal. A short line in ink over a long line in
 * graphite. That asymmetry is the composition; nothing decorative is added to
 * produce it.
 */

const SETTLE_EASE = [0.22, 1, 0.36, 1] as const;

/** +447562267371 -> +44 7562 267371. Printed matter spaces its numbers. */
function formatPhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, '');
  const uk = digits.match(/^\+44(\d{4})(\d{6})$/);
  return uk ? `+44 ${uk[1]} ${uk[2]}` : raw;
}

/**
 * Ink with a hairline rule beneath. The half-pixel decoration and tight offset
 * keep these reading as typeset rather than as web links, while staying a
 * non-colour affordance for anyone who can't rely on contrast.
 */
const linkClass =
  'text-ink underline decoration-ink/25 decoration-[0.5px] ' +
  'underline-offset-[3px] transition-colors duration-500 ' +
  'hover:decoration-ink/70 ' +
  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink';

export default function Horizon() {
  const reduceMotion = useReducedMotion();
  const telHref = `tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`;
  const phoneLabel = formatPhone(contactInfo.phone);

  return (
    <div className={heroRhythm.actionsToField}>
      {/*
        The open field. On Home, Fig. 01 lives here. Its absence is only
        readable because the space it occupied is preserved.
      */}
      <div aria-hidden="true" className={heroRhythm.field} />

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 1.4,
          ease: SETTLE_EASE,
          delay: reduceMotion ? 0 : 0.2,
        }}
        viewport={{ once: true, amount: 0.6 }}
        className="max-w-2xl"
      >
        {/* The destination, stated once. */}
        <p className="font-serif-display italic text-lg md:text-xl leading-snug text-ink">
          Written in {contactInfo.location}.
        </p>

        {/* The practical sentence, quieter and longer. */}
        <p className="mt-3 font-serif-display italic text-[15px] md:text-base leading-relaxed text-graphite">
          By telephone on{' '}
          <a
            href={telHref}
            className={`${linkClass} font-mono not-italic text-[13px] md:text-sm tracking-[0.02em]`}
          >
            {phoneLabel}
          </a>
          , or at{' '}
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
          ,{' '}
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
          ,{' '}
          <a
            href={contactInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            WhatsApp
          </a>{' '}
          and{' '}
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Instagram
          </a>
          .
        </p>

        {/*
          The line, at rest. The same line the Home page spends its opening
          seconds arriving at — here it is simply already there.
        */}
        <div aria-hidden="true" className="mt-8 h-px w-full bg-hairline" />
      </motion.div>
    </div>
  );
}