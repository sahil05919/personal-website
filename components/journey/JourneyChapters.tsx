'use client';

import { motion } from 'framer-motion';
import { journeyChapters, type ChapterTone } from '@/data/journeyData';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

/** How the through-line segment leaving a chapter should read, visually. */
const SEGMENT_STYLE: Record<ChapterTone, string> = {
  calm: 'w-[1.5px] bg-through-line/70',
  building: 'w-[1.5px] bg-through-line/85',
  rupture: 'w-0 border-l border-dashed border-graphite/50',
  uncertain: 'w-[1.5px] bg-graphite/40',
  resolving: 'w-[1.5px] bg-through-line',
};

function Connector({ tone }: { tone: ChapterTone }) {
  return (
    <div className="flex justify-center" style={{ height: 72 }} aria-hidden="true">
      <div className={`h-full ${SEGMENT_STYLE[tone]}`} />
    </div>
  );
}

/** Small, abstract line-art artifacts for a few key chapters. Not photos, not decoration-for-its-own-sake — each ties directly to that chapter's content. */
function ChapterArtifact({ id }: { id: string }) {
  switch (id) {
    case 'mahendragarh':
      return (
        <svg viewBox="0 0 64 40" className="w-14 h-9" aria-hidden="true">
          <path d="M4 36 L20 12 L36 36" stroke="var(--through-line)" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M16 36 L32 16 L48 36" stroke="var(--through-line)" strokeWidth="1.5" fill="none" opacity="0.45" />
          <path d="M28 36 L44 20 L60 36" stroke="var(--through-line)" strokeWidth="1.5" fill="none" opacity="0.25" />
        </svg>
      );
    case 'turning-point':
      return (
        <svg viewBox="0 0 64 24" className="w-14 h-5" aria-hidden="true">
          <path d="M4 18 C 18 18, 22 6, 30 10" stroke="var(--through-line)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M34 12 C 38 14, 42 18, 60 18" stroke="var(--through-line)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="32" cy="11" r="2" fill="var(--through-line)" opacity="0.6" />
        </svg>
      );
    case 'the-leap':
      return (
        <svg viewBox="0 0 64 32" className="w-14 h-7" aria-hidden="true">
          <path d="M4 28 Q 32 -4 60 28" stroke="var(--through-line)" strokeWidth="1.5" fill="none" opacity="0.55" strokeDasharray="3 4" />
          <circle cx="60" cy="28" r="2.5" fill="var(--through-line)" />
        </svg>
      );
    case 'still-becoming':
      return (
        <svg viewBox="0 0 40 40" className="w-9 h-9" aria-hidden="true">
          <circle cx="20" cy="20" r="4" fill="var(--through-line)" />
          <circle cx="20" cy="20" r="10" fill="none" stroke="var(--through-line)" strokeWidth="0.75" opacity="0.4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function JourneyChapters() {
  return (
    <section aria-label="Chapters" className="bg-paper text-ink px-6 md:px-8">
      <div className="mx-auto max-w-2xl">
        {journeyChapters.map((chapter, i) => {
          const alternate = i % 2 === 1;

          return (
            <div key={chapter.id}>
              <motion.article
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-15%' }}
                variants={fadeUp}
                aria-labelledby={`chapter-${chapter.id}-title`}
                className="pb-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-graphite">
                    {chapter.era}
                  </span>
                  <ChapterArtifact id={chapter.id} />
                </div>

                <h2
                  id={`chapter-${chapter.id}-title`}
                  className="font-serif-display font-medium text-2xl md:text-[1.75rem] leading-snug tracking-tight mb-5"
                >
                  {chapter.title}
                </h2>

                <div
                  className={`space-y-4 mb-6 ${
                    alternate ? 'max-w-lg pl-0' : 'max-w-md'
                  }`}
                >
                  {chapter.body.map((paragraph, pi) => (
                    <p key={pi} className="text-[15px] md:text-base leading-relaxed text-graphite">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {chapter.lesson &&
                  (alternate ? (
                    <blockquote className="border-l border-hairline pl-4 ml-1">
                      <p className="font-serif-display italic text-[15px] text-ink/80">
                        {chapter.lesson}
                      </p>
                    </blockquote>
                  ) : (
                    <p className="font-serif-display italic text-[15px] text-through-line/80 max-w-sm ml-auto text-right">
                      {chapter.lesson}
                    </p>
                  ))}
              </motion.article>

              {i < journeyChapters.length - 1 && <Connector tone={chapter.tone} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}