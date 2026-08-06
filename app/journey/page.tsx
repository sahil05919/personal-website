import type { Metadata } from 'next';
import {
  JourneyHero,
  JourneySnapshot,
  JourneyChapters,
  JourneyClose,
} from '@/components/journey';

export const metadata: Metadata = {
  title: 'Journey',
  description:
    'The story of how a curious child from a small town in India found his way into business, analytics, and technology.',
};

export default function JourneyPage() {
  return (
    <div className="bg-paper text-ink">
      <JourneyHero />
      <JourneySnapshot />
      <JourneyChapters />
      <JourneyClose />
    </div>
  );
}