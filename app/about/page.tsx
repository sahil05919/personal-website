import type { Metadata } from 'next';

import { Frontispiece, Prose, Facts, Exit } from '@/components/about';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The patterns that keep reappearing regardless of where I live or what I do for work. Rewritten when it stops being true.',
};

/**
 * <article>, not <main> — the root layout already renders <main>, and this
 * page was previously shipping two main landmarks on every load.
 */
export default function AboutPage() {
  return (
    <article className="bg-paper text-ink">
      <Frontispiece />
      <Prose />
      <Facts />
      <Exit />
    </article>
  );
}
