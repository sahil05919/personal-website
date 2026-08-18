import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import WritingChapter from '@/app/writing/WritingChapter';

export const metadata: Metadata = pageMetadata({
  path: '/writing',
  title: 'Writing',
  description:
    'Published writing by Sahil Kumar — essays on LinkedIn and pieces commissioned by Bayes Business School.',
});

export default function Page() {
  return <WritingChapter />;
}
