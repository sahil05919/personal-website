'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Download, Send } from 'lucide-react';
import { contactInfo } from '@/data/contactData';
import { heroRhythm } from '@/lib/heroRhythm';

/**
 * ContactHero
 *
 * The Home frontispiece's skeleton with its content replaced and its opening
 * gesture withheld. Everything here is positioned to land where the
 * corresponding element lands on Home.
 *
 * Motion is inverted deliberately. The frontispiece resolves upward into
 * place — arrival. This settles downward into place — completion. Same
 * grammar, opposite direction.
 */

const SETTLE_EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactHero() {
  const reduceMotion = useReducedMotion();

  const group: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.16,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : -8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 1.1, ease: SETTLE_EASE },
    },
  };

  return (
    <motion.div variants={group} initial="hidden" animate="show">
      {/*
        The eyebrow slot, reserved and empty. On Home a small mono label sits
        here. Leaving the space without filling it is the page's first echo,
        and the only one that happens before reading begins.
      */}
      <div aria-hidden="true" className={heroRhythm.eyebrowSlot} />

      <motion.h1
        variants={item}
        className={`${heroRhythm.eyebrowToHeadline} ${heroRhythm.headline}`}
      >
        Let&apos;s talk.
      </motion.h1>

      <motion.p
        variants={item}
        className={`${heroRhythm.headlineToBody} ${heroRhythm.body}`}
      >
        Everything before this page has been about how I think and what
        I&apos;ve built. If you&apos;d like to talk about opportunities, ideas,
        or simply say hello, I&apos;d be glad to hear from you.
      </motion.p>

      <motion.div
        variants={item}
        className={`${heroRhythm.bodyToActions} flex flex-col sm:flex-row gap-4`}
      >
        {/*
          Ink, paper and hairline throughout. bg-primary, text-primary-foreground,
          border-border and bg-card are stale tokens predating the Through-Line
          system and do not render with reliable contrast beside it.
        */}
        <a
          href={`mailto:${contactInfo.email}?subject=Connecting%20from%20your%20website`}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send Email
        </a>

        <a
          href={`/documents/${contactInfo.resume.fileName}`}
          download
          className="inline-flex items-center justify-center gap-2 rounded-sm border border-hairline bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download My CV
        </a>
      </motion.div>
    </motion.div>
  );
}