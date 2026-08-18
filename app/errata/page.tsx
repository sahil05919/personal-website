import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ErrataChapter from '@/app/errata/ErrataChapter';

export const metadata: Metadata = pageMetadata({
  path: '/errata',
  title: 'Errata',
  description:
    'Corrections to this record: what it said, what it says now, and what is still wrong.',
});

export default function Page() {
  return <ErrataChapter />;
}
