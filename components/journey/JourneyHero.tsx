'use client';

import { motion } from 'framer-motion';
import { journeyIntro } from '@/data/journeyData';

// Ease unified to the site's signature settle curve (was 'easeOut') as part
// of the sitewide motion pass — Journey was the one page still on Framer's
// named easing instead of [0.16, 1, 0.3, 1].
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function JourneyHero() {
  return (
    <section
      aria-labelledby="journey-title"
      /* Navbar clearance now lives in the layout's <main> (pt-[72px]); this
         padding is editorial rhythm only. Horizontal padding and the
         page's max-width now live in app/journey/page.tsx, which also
         places this section next to the desktop rail — this component no
         longer centres itself, it just sits hard-left in its grid column. */
      /* The opening of a chapter, not a section of a page: it holds most of
         the first screen, so the title lands before the reader has to decide
         whether to keep going. */
      className="pt-[clamp(3rem,9vh,6rem)] pb-[clamp(4rem,10vh,7rem)]"
    >
      <motion.div
        initial="hidden"
        /* Above the fold — animate on mount, not on scroll into view. */
        animate="show"
        variants={fadeUp}
      >
        <p className="apparatus normal-case tracking-[0.08em] mb-7">
          {journeyIntro.eyebrow}
        </p>

        {/* Display scale, on the site's own type ramp. This was set at a
            hard 3rem, which was the largest thing on the page back when the
            body was 16px Inter and is now smaller than Home's contents rows.
            The measure breaks to `wide` because a display line held to the
            reading measure looks trapped rather than emphatic. */}
        <h1
          id="journey-title"
          className="hang font-serif-display font-normal text-fluid-display text-balance mb-8 max-w-wide"
        >
          {journeyIntro.title}
        </h1>

        <p className="font-serif-display italic text-fluid-claim font-normal leading-[1.3] text-graphite mb-10 max-w-wide text-balance">
          {journeyIntro.subtitle}
        </p>

        <div className="space-y-5 max-w-measure font-reading text-fluid-read text-pretty">
          {journeyIntro.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}