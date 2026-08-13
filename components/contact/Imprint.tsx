'use client';

import { motion, type Variants } from 'framer-motion';
import BrandMark from '@/components/contact/BrandMark';
import {
  contactInfo,
  contactContent,
  type Channel,
  type MarkName,
} from '@/data/contactData';
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';

/**
 * Imprint — the doors.
 *
 * THE MOTIF: ruled letterhead. Every channel sits on a full-width hairline
 * with a short ink tick at its left end, so at rest the section reads as a
 * sheet of ruled stationery — five lines, five tabs, before anything is
 * hovered. On hover or focus the ink draws across the whole rule, left to
 * right: the line completes when you choose a door.
 *
 * It is one motif, it is legible without interaction, and it means something —
 * an address is a set of lines you follow until you find someone. It also
 * deliberately avoids Home's device: Contents already owns the vertical
 * through-line with dot markers, and repeating it here would make the last
 * page look like the first.
 *
 * NOT CARDS. No boxes, no rounded containers, no grid. The rows are rules and
 * type; the only bounded shapes on the page are the marks themselves.
 *
 * HOVER, four things at once, all on the same 500–700ms curve so they read as
 * one gesture rather than four effects: the rule draws, the mono label lifts
 * from graphite to ink, the text block shifts 3px right, the mark takes its
 * platform's colour, and the arrow slides in from the left. Colour appears
 * only as an interaction reward — the page at rest is paper and ink.
 *
 * Every hover state is paired with its focus-visible equivalent, so a keyboard
 * user gets the same choreography rather than a consolation outline.
 */

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Literal class strings, not interpolated — Tailwind scans source text, so a
 * template built from data would be purged. Email uses the site's own cobalt
 * rather than a mail provider's colour; GitHub resolves to ink, which is what
 * its brand colour (#181717) effectively is on paper.
 */
const BRAND_HOVER: Record<MarkName, string> = {
  email:
    'group-hover:text-through-line group-focus-visible:text-through-line',
  linkedin: 'group-hover:text-[#0A66C2] group-focus-visible:text-[#0A66C2]',
  whatsapp: 'group-hover:text-[#25D366] group-focus-visible:text-[#25D366]',
  instagram: 'group-hover:text-[#E1306C] group-focus-visible:text-[#E1306C]',
  github: 'group-hover:text-ink group-focus-visible:text-ink',
};

/** +447562267371 -> +44 7562 267371. Printed matter spaces its numbers. */
function formatPhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, '');
  const uk = digits.match(/^\+44(\d{4})(\d{6})$/);
  return uk ? `+44 ${uk[1]} ${uk[2]}` : raw;
}

const SWEEP =
  'transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';

function ChannelRow({
  channel,
  variants,
}: {
  channel: Channel;
  variants: Variants;
}) {
  const { mark, label, title, href, external, ariaSuffix } = channel;

  return (
    <motion.li variants={variants}>
      <a
        href={href}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className="group relative block py-6 md:py-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-through-line"
      >
        {/* The rule at rest: hairline across, ink tick at the left. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-hairline"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-px w-7 bg-ink"
        />
        {/* The rule completing. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ink group-hover:scale-x-100 group-focus-visible:scale-x-100 ${SWEEP}`}
        />

        <div className="flex items-center justify-between gap-5 md:gap-8">
          <div
            className={`min-w-0 group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px] ${SWEEP}`}
          >
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-graphite transition-colors duration-500 group-hover:text-ink group-focus-visible:text-ink motion-reduce:transition-none">
              {label}
            </p>
            <p className="mt-2 break-words font-serif-display text-[1.25rem] md:text-[1.625rem] leading-[1.25] tracking-[-0.01em] text-ink">
              {title}
            </p>
            {ariaSuffix ? <span className="sr-only">{ariaSuffix}</span> : null}
            {external ? (
              <span className="sr-only">(opens in a new tab)</span>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center gap-3 md:gap-5">
            <BrandMark
              name={mark}
              className={`h-6 w-6 md:h-[26px] md:w-[26px] text-graphite transition-colors duration-500 motion-reduce:transition-none ${BRAND_HOVER[mark]}`}
            />
            <span
              aria-hidden="true"
              className={`inline-block -translate-x-2 text-graphite opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none`}
            >
              &rarr;
            </span>
          </div>
        </div>
      </a>
    </motion.li>
  );
}

export default function Imprint() {
  const prefersReducedMotion = useReducedMotionSafe();
  const { groups, apparatus, walk } = contactContent;

  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const rise: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: REVEAL_EASE },
    },
  };

  return (
    <section aria-label="Ways to reach me" className="px-6 md:px-8">
      <div className="mx-auto max-w-2xl">
        {groups.map((g) => (
          <motion.div
            key={g.eyebrow}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={group}
            className="mb-14 md:mb-20 last:mb-0"
          >
            <motion.p
              variants={rise}
              className="font-mono text-[11px] tracking-[0.08em] uppercase text-graphite"
            >
              {g.eyebrow}
            </motion.p>

            <motion.p
              variants={rise}
              className="mt-4 mb-8 md:mb-10 max-w-[34rem] font-reading text-fluid-read text-graphite text-pretty"
            >
              {g.line}
            </motion.p>

            <ul>
              {g.channels.map((c) => (
                <ChannelRow key={c.href} channel={c} variants={rise} />
              ))}
            </ul>

            {/* Closes the ruled block, so the last row sits on a sheet rather
                than trailing off. */}
            <div aria-hidden="true" className="h-px w-full bg-hairline" />
          </motion.div>
        ))}

        {/* Apparatus. Quiet by design: the telephone is a figure and the CV is
            a document, and neither is a door in the sense the rows above are. */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: REVEAL_EASE }}
          className="mt-10 font-mono text-[11px] leading-[1.9] tracking-[0.04em] text-graphite"
        >
          {apparatus.telephoneLabel}{' '}
          <a
            href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}
            className="underline decoration-hairline underline-offset-4 transition-colors duration-500 hover:text-ink hover:decoration-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-through-line motion-reduce:transition-none"
          >
            {formatPhone(contactInfo.phone)}
          </a>
          <span aria-hidden="true" className="mx-3 text-hairline">
            /
          </span>
          <a
            href={`/documents/${contactInfo.resume.fileName}`}
            download
            className="group underline decoration-hairline underline-offset-4 transition-colors duration-500 hover:text-ink hover:decoration-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-through-line motion-reduce:transition-none"
          >
            {apparatus.cvLabel}
            <span
              aria-hidden="true"
              className={`ml-2 inline-block group-hover:translate-x-[3px] ${SWEEP}`}
            >
              &rarr;
            </span>
          </a>
        </motion.p>

        {/* The invitation. Display register, because it is the one thing on
            this page offered rather than listed. */}
        <motion.div
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={group}
          className="mt-20 md:mt-28"
        >
          <motion.p
            variants={rise}
            className="font-mono text-[11px] tracking-[0.08em] uppercase text-graphite"
          >
            {walk.eyebrow}
          </motion.p>

          {walk.lines.map((line, i) => (
            <motion.p
              key={line.slice(0, 24)}
              variants={rise}
              className={
                i === 0
                  ? 'mt-6 font-serif-display text-[1.375rem] md:text-[1.75rem] leading-[1.35] tracking-[-0.01em] text-ink text-balance'
                  : 'mt-4 font-serif-display italic text-[1.375rem] md:text-[1.75rem] leading-[1.4] text-ink text-balance'
              }
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
