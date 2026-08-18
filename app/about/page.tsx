import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

import { Masthead, Facts, Prose, Marginalia, Exit } from '@/components/about';
import { aboutContent } from '@/data/profileContent';
import { aboutEssayHi } from '@/data/hinglish';

export const metadata: Metadata = pageMetadata({
  path: '/about',
  title: 'About',
  description:
    'The patterns that keep reappearing regardless of where I live or what I do for work. Rewritten when it stops being true.',
});

/**
 * <article>, not <main> — the root layout already renders <main>, and this page
 * was previously shipping two main landmarks on every load.
 *
 * THE ARC. Who I am (masthead) → the surface facts (front matter) → how I think
 * and what I notice (movements I–III) → the small things (marginalia) → the
 * deepest admission (movement IV) → the turn to Journey.
 *
 * The essay is deliberately split around Marginalia. The small personal things
 * have to arrive BEFORE the family reversal, not after it: placed after, they
 * would dissipate the one line this page is actually built around. Placed
 * before, they are the quiet breath the reader takes just ahead of it.
 */
export default function AboutPage() {
  return (
    <article className="bg-paper text-ink">
      <Masthead />
      <Facts />
      <Prose
        paragraphs={aboutContent.essay.opening}
        paragraphsHi={aboutEssayHi.opening}
        dropCap
      />
      <Marginalia />
      <Prose paragraphs={aboutContent.essay.coda} paragraphsHi={aboutEssayHi.coda} />
      <Exit />
    </article>
  );
}
