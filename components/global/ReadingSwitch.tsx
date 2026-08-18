'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { hasHinglish } from '@/data/hinglish';
import { useReadingMode } from '@/hooks/use-reading-mode';

/**
 * READING SWITCH — English or Hinglish, in the running head.
 *
 * Two words, mono, apparatus scale, one of them lit: the same vocabulary the
 * paper switcher and the chapter labels beside it already use. It is deliberately
 * NOT a flag, a globe icon, a select element or a pill. Nothing new was invented
 * for it, because a control that announces itself louder than the chapter title
 * would be the first thing on this site to do that.
 *
 * "EN / HI" rather than "English / Hinglish": the long forms are 15 characters in
 * a header that is already carrying nine chapter labels, and the short forms are
 * how the two are actually referred to. The accessible names carry the full words,
 * so nothing is lost to a screen reader.
 *
 * THE NOTE. When a reader has chosen Hinglish and is on a chapter that has not
 * been translated, the switch says so — "yeh chapter abhi English mein hai" —
 * instead of leaving them to work out why the page in front of them is in the
 * other language. That is the same choice as Now's empty photograph plates and
 * the open entries on the errata leaf: the gap is stated rather than hidden. It
 * renders only in Hinglish mode and only where it is true, so on the translated
 * chapters and for every English reader it costs nothing.
 */

const BUTTON =
  'tap-target font-mono text-apparatus-xs uppercase transition-colors duration-300 ease-editorial';

export default function ReadingSwitch({ className = '' }: { className?: string }) {
  const { mode, setMode } = useReadingMode();
  const pathname = usePathname();

  /* Keep <html lang> in step with the reading, including on a cold load where
     the reader's stored choice is only known after hydration. `setMode` sets it
     on click; this covers the first render, and it is the reason a screen reader
     switches voice for a returning Hinglish reader rather than pronouncing
     "kaamyaabi" as English. */
  useEffect(() => {
    document.documentElement.lang = mode === 'hi' ? 'hi-Latn' : 'en';
  }, [mode]);

  const untranslated = mode === 'hi' && !hasHinglish(pathname);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="flex items-center gap-1.5"
        role="group"
        aria-label="Reading language"
      >
        <button
          type="button"
          onClick={() => setMode('en')}
          aria-pressed={mode === 'en'}
          aria-label="Read in English"
          title="English"
          className={`${BUTTON} ${
            mode === 'en' ? 'text-ink' : 'text-graphite hover:text-ink'
          }`}
        >
          EN
        </button>

        <span aria-hidden="true" className="font-mono text-apparatus-xs text-graphite/70">
          /
        </span>

        <button
          type="button"
          onClick={() => setMode('hi')}
          aria-pressed={mode === 'hi'}
          aria-label="Read in Hinglish"
          title="Hinglish"
          className={`${BUTTON} ${
            mode === 'hi' ? 'text-ink' : 'text-graphite hover:text-ink'
          }`}
        >
          HI
        </button>
      </div>

      {untranslated ? (
        <span
          /* Announced once when it appears, not on every navigation: the reader
             already knows they switched. `polite` so it never interrupts. */
          aria-live="polite"
          /* Only where there is genuinely room for another 180px in the running
             head. Below that the switch state alone has to carry it. */
          className="hidden font-mono text-[10px] leading-none tracking-[0.06em] text-graphite min-[1560px]:inline"
        >
          yeh chapter abhi English mein hai
        </span>
      ) : null}
    </div>
  );
}
