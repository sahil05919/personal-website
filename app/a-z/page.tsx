import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import IndexChapter from '@/app/a-z/IndexChapter';

export const metadata: Metadata = pageMetadata({
  path: '/a-z',
  title: 'Index',
  description:
    'An alphabetical index to this record — the places, people, projects and preoccupations in it, and where each one is.',
});

export default function Page() {
  return <IndexChapter />;
}
