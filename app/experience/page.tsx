// app/experience/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  corporateExperience,
  internshipExperience,
  universityExperience,
  eventExperience,
  volunteerExperience,
  WorkRole
} from "@/data/experienceData";

import ExperienceHero from "@/components/experience/ExperienceHero";
import ExperienceFilter, { TabItem } from "@/components/experience/ExperienceFilter";
import ExperienceChapter from "@/components/experience/ExperienceChapter";
import ExperienceCTA from "@/components/experience/ExperienceCTA";

type TabType = "corporate" | "internships" | "university" | "events" | "volunteer";

const TABS: TabItem<TabType>[] = [
  { id: 'corporate', label: 'Corporate' },
  { id: 'internships', label: 'Internships' },
  { id: 'university', label: 'University' },
  { id: 'events', label: 'Events' },
  { id: 'volunteer', label: 'Volunteer' },
];

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<TabType>('corporate');

  const activeData = useMemo((): WorkRole[] => {
    switch (activeTab) {
      case "corporate":
        return corporateExperience || [];
      case "university":
        return universityExperience || [];
      case "events":
        return eventExperience || [];
      case "internships":
        return internshipExperience || [];
      case "volunteer":
        return volunteerExperience || [];
      default:
        return [];
    }
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background flex flex-col w-full overflow-x-hidden">
      
      <ExperienceHero />

      {/* Floating Segmented Control - Fixed z-index & top margin to clear main navbar */}
      <div className="sticky top-20 md:top-24 z-40 w-full flex justify-center mt-4 bg-background/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-border/20 md:border-none">
        <div className="w-full max-w-[100vw] overflow-hidden">
          <ExperienceFilter 
            tabs={TABS} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </div>
      </div>

      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto min-h-[60vh] mt-8 md:mt-16 w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full pb-24 min-w-0 origin-top"
          >
            {activeData.length > 0 ? (
              <div className="w-full flex flex-col gap-24 md:gap-32 min-w-0">
                {activeData.map((role, idx) => (
                  <div 
                    key={`${activeTab}-${role.organization || idx}-${idx}`} 
                    className="w-full min-w-0 block"
                  >
                    <ExperienceChapter role={role} index={idx} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 md:py-48 flex flex-col items-center justify-center text-center space-y-8 w-full">
                <span className="w-px h-24 bg-border block" />
                <p className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase">
                  Chapter Pending
                </p>
                <p className="text-lg md:text-xl text-muted-foreground/60 max-w-lg font-light leading-relaxed text-balance">
                  These pages are currently being written. Return later to read this chapter.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <ExperienceCTA />
      
    </main>
  );
}