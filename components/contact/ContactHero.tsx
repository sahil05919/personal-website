'use client';

import { motion, type Variants } from 'framer-motion';
import { contactContent } from '@/data/contactData';
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';
import { contactContentHi } from '@/data/hinglish';
import { useVariant } from '@/hooks/use-reading-mode';

/**
 * ContactHero — the endpaper's opening.
 *
 * TYPOGRAPHY. Same column and left edge as every other page: px-6 md:px-8,
 * mx-auto max-w-2xl. The headline sits one full step below Home's title
 * (2.75/3.5rem against 3.25/4.5rem) on purpose — Home earns display scale
 * because that string is the title of the record. A two-word heading at the
 * same size reads as a second title page, and as shouting.
 *
 * MOTION. Three registers, deliberately unequal, because uniform fades on
 * everything are what make a page feel templated:
 *
 *   1. The eyebrow simply arrives. It is apparatus; it should not perform.
 *   2. The headline is revealed rather than faded — each word rises out of an
 *      overflow-hidden mask, as though the line were being set. Slowest thing
 *      on the page (0.95s) and the only masked reveal on the site.
 *   3. The prose follows well after the headline has landed, in two beats.
 *
 * The eases are the site's settle curve, not Framer defaults. REVEAL_EASE has
 * a long tail, so the word decelerates into place instead of stopping.
 *
 * Reduced motion returns the finished page immediately — no mask, no stagger,
 * plain text nodes rather than animated spans.
 */

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const SETTLE_EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactHero() {
  const prefersReducedMotion = useReducedMotionSafe();
  const { eyebrow, headline, body } = useVariant(
    contactContent.hero,
    contactContentHi.hero,
  );

  const words = headline.split(' ');

  const proseGroup: Variants = {
    hidden: {},
    show: {
      transition: { delayChildren: 0.72, staggerChildren: 0.14 },
    },
  };

  const proseItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: SETTLE_EASE },
    },
  };

  return (
    <section
      aria-label="Contact"
      className="px-6 md:px-8 pt-[88px] md:pt-[112px] pb-16 md:pb-20"
    >
      <div className="mx-auto max-w-2xl">
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="apparatus normal-case tracking-[0.08em]"
        >
          {eyebrow}
        </motion.p>

        {/*
          The masked reveal. Each word gets a clipping span; the inner span
          starts fully below its own baseline and rises into the frame. The
          negative margin cancels the padding that keeps Fraunces' descenders
          and the full stop from being clipped by overflow-hidden.
        */}
        <h1 className="hang mt-7 md:mt-9 font-serif-display font-normal text-fluid-display text-balance">
          {/*
            The split words are separate inline-blocks with no whitespace text
            node between them — the gap is a margin — so assistive technology
            would announce "Writeback." The visual words are hidden from the
            accessibility tree and the heading's real text is supplied once.
          */}
          {!prefersReducedMotion && <span className="sr-only">{headline}</span>}

          {prefersReducedMotion
            ? headline
            : words.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  aria-hidden="true"
                  className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
                  style={{
                    marginRight: i < words.length - 1 ? '0.24em' : undefined,
                  }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: '115%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 0.95,
                      delay: 0.24 + i * 0.09,
                      ease: REVEAL_EASE,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
        </h1>

        <motion.div
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="show"
          variants={proseGroup}
          className="mt-9 md:mt-11 font-reading text-fluid-read space-y-6 text-pretty"
        >
          {body.map((paragraph) => (
            <motion.p key={paragraph.slice(0, 32)} variants={proseItem}>
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
