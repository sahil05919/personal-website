'use client';

import { ChapterOpening } from '@/components/type/ChapterOpening';
import { motion } from 'framer-motion';

import type { EssayMode, EssayParagraph } from '@/data/profileContent';
import { useVariant } from '@/hooks/use-reading-mode';
import { MARGIN_NOTE, SHELL } from './layout';

const styles: Record<EssayMode, string> = {
  body:
    'font-reading text-ink text-[1.0625rem] leading-[1.72] md:text-[1.1875rem] md:leading-[1.72]',
  break:
    'font-reading text-ink text-[1.0625rem] leading-[1.72] md:text-[1.1875rem] md:leading-[1.72]',
  display:
    'font-serif-display text-ink font-normal tracking-[-0.02em] leading-[1.1] text-[1.75rem] md:text-[2.375rem] lg:text-[2.875rem]',
  stanza:
    'font-serif-display text-ink font-normal tracking-[-0.02em] leading-[1.3] text-[1.375rem] md:text-[1.875rem] lg:text-[2.125rem]',
  turn:
    'font-serif-display text-through-line font-normal tracking-[-0.02em] leading-[1.1] text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem]',
  close:
    'font-serif-display text-ink font-normal tracking-[-0.02em] leading-[1.25] text-[1.375rem] md:text-[1.75rem] lg:text-[2rem]',
};

/** Loud modes out-dent to the full block width; quiet modes stay in the reading column. */
const OUTDENT: Record<EssayMode, boolean> = {
  body: false,
  break: false,
  display: true,
  stanza: true,
  turn: true,
  close: false,
};

/** Space AFTER the paragraph. */
const spaces: Record<EssayMode, string> = {
  body: 'mb-7 md:mb-8',
  break: 'mb-14 md:mb-20',
  display: 'mb-14 md:mb-20',
  stanza: 'mb-14 md:mb-20',
  turn: 'mb-12 md:mb-14',
  close: 'mb-0',
};

const spineHeight: Partial<Record<EssayMode, string>> = {
  body: 'calc(100% + 2rem)',
  break: '100%',
  close: '100%',
};

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

function Ledger({ lines, className }: { lines: string[]; className: string }) {
  return (
    <div className="relative pl-6 md:pl-9">
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-px origin-top bg-hairline"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {lines.map((line, index) => (
        <div key={index} className="relative py-3 md:py-4">
          <p className={className}>{line}</p>

          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-px origin-left bg-hairline"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: 0.15 + index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function Prose({
  paragraphs: paragraphsEn,
  paragraphsHi,
  dropCap = false,
  className = '',
}: {
  paragraphs: EssayParagraph[];
  paragraphsHi?: EssayParagraph[];
  dropCap?: boolean;
  className?: string;
}) {
  const paragraphs = useVariant(paragraphsEn, paragraphsHi);

  const firstSpine = paragraphs.findIndex(({ mode }) => !OUTDENT[mode]);

  const capIndex = dropCap
    ? paragraphs.findIndex(
        ({ mode, text }) =>
          (mode === 'body' || mode === 'break') && !text.includes('\n'),
      )
    : -1;

  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className={SHELL}>
        {paragraphs.map(({ mode, note, text }, index) => {
          const lines = text.split('\n');
          const outdented = OUTDENT[mode];
          const height = spineHeight[mode];

          return (
            <motion.div
              key={index}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className={`relative ${spaces[mode]}`}
            >
              {/* Spine segment */}
              {height ? (
                <span
                  aria-hidden="true"
                  style={{ height }}
                  className="absolute left-[10.25rem] top-0 hidden w-px bg-hairline lg:block"
                >
                  {index === firstSpine ? (
                    <span className="absolute left-0 top-0 h-14 w-px bg-through-line" />
                  ) : null}
                </span>
              ) : null}

              {/* Running margin note */}
              {note ? (
                outdented ? (
                  <p className="mb-5 flex items-center gap-4">
                    <span aria-hidden="true" className="h-px w-10 bg-through-line" />
                    <span className={MARGIN_NOTE}>{note}</span>
                  </p>
                ) : (
                  <p
                    className={`${MARGIN_NOTE} mb-4 lg:absolute lg:left-0 lg:top-[0.6rem] lg:mb-0 lg:w-[9rem] lg:text-right`}
                  >
                    {note}
                  </p>
                )
              ) : null}

              {mode === 'stanza' ? (
                <Ledger lines={lines} className={styles[mode]} />
              ) : index === capIndex ? (
                <ChapterOpening
                  text={lines.join('\n')}
                  className={`${styles[mode]} max-w-[35.5rem] lg:ml-[11.5rem] lg:max-w-[35.5rem]`}
                />
              ) : (
                <p
                  className={`${styles[mode]} ${
                    outdented
                      ? 'max-w-none lg:ml-0'
                      : 'max-w-[35.5rem] lg:ml-[11.5rem] lg:max-w-[35.5rem]'
                  }`}
                >
                  {lines.map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}