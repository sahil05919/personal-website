import type { Metadata } from 'next';
import {
  JourneyHero,
  JourneySnapshot,
  JourneyChapterNav,
  JourneyChapters,
  JourneyClose,
} from '@/components/journey';

export const metadata: Metadata = {
  title: 'Journey — Sahil Kumar',
  description:
    'The story of how a curious child from a small town in India found his way into business, analytics, and technology.',
};

export default function JourneyPage() {
  return (
    <main className="bg-paper text-ink">
      <JourneyHero />
      <JourneySnapshot />
      <JourneyChapterNav />
      <JourneyChapters />
      <JourneyClose />
    </main>
  );
}