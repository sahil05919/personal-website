'use client';

import {
  Hero,
  Snapshot,
  Genesis,
  Principles,
  Interests,
  Moments,
  Detours,
  Mission,
  JourneyCTA,
} from '@/components/about';

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <Snapshot />
      <Genesis />
      <Principles />
      <Interests />
      <Moments />
      <Detours />
      <Mission />
      <JourneyCTA />
    </main>
  );
}