import type { Metadata } from 'next';
import NotFoundChapter from '@/app/NotFoundChapter';

export const metadata: Metadata = {
  title: 'Not found',
  /* `noindex` matters more here than the copy does. Without it a 404 that
     returns readable prose is exactly the kind of page a crawler will happily
     index under whatever nonsense URL produced it. */
  robots: { index: false, follow: true },
};

export default function Page() {
  return <NotFoundChapter />;
}
