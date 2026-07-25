// components/experience/ExperienceFilter.tsx
'use client';

import { motion } from 'framer-motion';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
}

interface ExperienceFilterProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onTabChange: (id: T) => void;
  className?: string;
}

export default function ExperienceFilter<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className = ""
}: ExperienceFilterProps<T>) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center px-4 md:px-0 py-4">
        <div className="flex gap-1 p-1.5 mx-auto w-fit bg-background/95 backdrop-blur-xl border border-border/50 rounded-full shadow-sm relative z-50">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                aria-selected={isActive}
                role="tab"
                className="relative group px-5 py-2.5 whitespace-nowrap focus:outline-none rounded-full cursor-pointer z-20"
              >
                <span className={`relative z-30 font-mono text-xs md:text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground/80'
                }`}>
                  {tab.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-foreground/[0.05] dark:bg-foreground/[0.1] rounded-full z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}