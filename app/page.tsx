'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  Eye,
  Layers,
  Compass,
  Quote,
  type LucideIcon,
} from 'lucide-react';
import Hero from '@/components/home/Hero';

/* ========================================================================== */
/*                                ANIMATIONS                                  */
/* ========================================================================== */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 20 }
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

/* ========================================================================== */
/*                             SHARED UI COMPONENTS                           */
/* ========================================================================== */

function SectionHeading({ title, description, align = 'left' }: { title: string; description?: string; align?: 'left' | 'center' }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }} variants={fadeUp} className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center flex flex-col items-center' : ''}`}>
      <h2 className="text-3xl md:text-[2.75rem] leading-tight font-semibold tracking-tight text-zinc-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className={`mt-6 text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

function IconBox({ icon: Icon, tone = 'neutral' }: { icon: LucideIcon, tone?: 'neutral' | 'emerald' | 'indigo' | 'amber' }) {
  const tones = {
    neutral: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
  };
  return (
    <div className={`p-2.5 rounded-xl ${tones[tone]}`}>
      <Icon className="w-5 h-5" />
    </div>
  );
}

/* ========================================================================== */
/*                               HOW I THINK                                  */
/* ========================================================================== */

function HowIThink() {
  return (
    <section id="how-i-think" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-white dark:bg-[#0B0F19] border-y border-zinc-200/80 dark:border-zinc-800">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeading
          title="My operating system."
          description="A look behind the work. Here is what I notice, how I approach problems, and what shapes my thinking."
        />

        {/* Strict Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }} variants={fadeUp} className="md:col-span-2 rounded-[2rem] border border-zinc-200/80 bg-[#FAFAFA] p-8 md:p-10 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-[#0F1420] flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <IconBox icon={Eye} tone="amber" />
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">What I notice</span>
            </div>
            <h3 className="text-2xl md:text-3xl leading-snug font-semibold tracking-tight text-zinc-900 dark:text-white mb-4">
              I hate watching smart people work like machines.
            </h3>
            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
              At my day job in finance operations, I watch capable people spend hours copying and pasting data. It drives me crazy. My entire focus is finding these repetitive loops and breaking them so teams can get back to actually solving problems.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }} variants={fadeUp} className="md:col-span-1 rounded-[2rem] border border-zinc-200/80 bg-zinc-900 p-8 md:p-10 shadow-sm dark:border-zinc-800 dark:bg-[#151B2B] flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <IconBox icon={Layers} tone="neutral" />
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Toolkit</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-4">
                I collect solutions, not tools.
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Complexity is a liability. Usually, that just means writing clean SQL, connecting it to Power BI, and tying it together with Python.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300">Power BI</span>
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300">SQL</span>
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300">Python</span>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }} variants={fadeUp} className="md:col-span-1 rounded-[2rem] border border-zinc-200/80 bg-[#FAFAFA] p-8 md:p-10 shadow-sm dark:border-zinc-800 dark:bg-[#0F1420] flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <IconBox icon={Compass} tone="emerald" />
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Perspective</span>
            </div>
            <h4 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white mb-3">Stepping back.</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              You can&apos;t fix a messy system while trapped inside it. Seeing how physical cities are structured across London helps me organize digital information.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }} variants={fadeUp} className="md:col-span-2 rounded-[2rem] border border-zinc-200/80 bg-[#FAFAFA] p-8 md:p-10 shadow-sm dark:border-zinc-800 dark:bg-[#0F1420] flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <IconBox icon={Quote} tone="indigo" />
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Current obsessions</span>
            </div>
            <h4 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white mb-3">The work is the reward.</h4>
            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              I’m currently reading the Bhagavad Gita. The core lesson that stuck with me is about detaching from the immediate reward and focusing entirely on the quality of the work itself. It changes everything about long-term projects.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*                             DYNAMIC CASE STUDIES                           */
/* ========================================================================== */

type CaseStudySection = 'context' | 'thinking' | 'solution' | 'impact';

function DynamicProjectCard({ title, hook, meta, content }: {
  title: string; hook: string; meta: { builtWith: string; focus: string }; content: Record<CaseStudySection, string>;
}) {
  const [activeTab, setActiveTab] = useState<CaseStudySection>('context');

  const tabs: { id: CaseStudySection; label: string }[] = [
    { id: 'context', label: 'Problem' },
    { id: 'thinking', label: 'Thinking' },
    { id: 'solution', label: 'Solution' },
    { id: 'impact', label: 'Impact' },
  ];

  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }} variants={fadeUp} className="group flex flex-col bg-white dark:bg-[#0B0F19] rounded-[2rem] border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden h-full">
      <div className="p-8 md:p-10 border-b border-zinc-100 dark:border-zinc-800/50 bg-[#FAFAFA]/50 dark:bg-zinc-900/20">
        <div className="flex gap-4 text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold mb-6">
          <span>{meta.focus}</span>
          <span>•</span>
          <span>{meta.builtWith}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-4">{title}</h3>
        <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{hook}</p>
      </div>

      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 md:gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative text-xs md:text-sm font-semibold transition-colors duration-300 pb-2 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'}`}>
                {tab.label}
                {isActive && <motion.div layoutId={`tab-${title.replace(/\s+/g, '')}`} className="absolute -bottom-[17px] left-0 right-0 h-px bg-zinc-900 dark:bg-white" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
              </button>
            );
          })}
        </div>

        <div className="relative flex-grow min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2, ease: "easeOut" }} className="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
              {content[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <section id="work" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 max-w-[90rem] mx-auto">
      <SectionHeading
        title="Systems I've Built."
        description="I rarely build things just to have another item on my portfolio. These projects started because I noticed a process that was entirely too manual, or a dataset that was impossible to read, and I wanted to fix it."
      />

      {/* Dynamic 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DynamicProjectCard
          title="The Personal Finance Automator"
          hook="I was tired of manually entering numbers into spreadsheets just to understand my own money."
          meta={{ focus: "Zero-touch automation", builtWith: "Power BI, Python" }}
          content={{
            context: "Tracking personal wealth across different accounts required nearly an hour of manual spreadsheet entry every Sunday. Because it was tedious, I skipped it, creating gaps in my budgeting and making it hard to see long-term trends.",
            thinking: "I didn't want another bloated budgeting app trying to categorize my coffee purchases. I just needed an invisible, highly structured pipeline that collected the raw numbers securely without me ever touching them.",
            solution: "I built scripts that extract transaction data and push it into a secure Google Sheet. I layered Power BI on top, focusing strictly on high-level metrics: net worth trajectory and runway. No noise, just the numbers that matter.",
            impact: "The entire system runs in the background. I went from spending hours managing financial data to opening a single, clean dashboard to instantly see my exact financial position. Good systems give you your time back."
          }}
        />
        <DynamicProjectCard
          title="Media Consumption Analysis"
          hook="Taking a massive, unreadable CSV file and turning it into a clear story about human behavior."
          meta={{ focus: "Information design", builtWith: "Power BI, SQL" }}
          content={{
            context: "My downloaded Netflix history was a massive, unreadable dataset of timestamps and obscure title IDs. This is a common business problem: having a massive volume of data, but absolutely no way for a human to extract insight from it.",
            thinking: "Most dashboards fail because they try to show the user everything at once, overwhelming them with 3D pie charts. I wanted to see exactly how much UI I could strip away while still telling an accurate story.",
            solution: "After heavily cleaning the dataset, I abandoned standard, complex visualisations in Power BI. Instead, I used typography, whitespace, and very simple bar structures to highlight macro-trends.",
            impact: "The result is remarkably quiet and readable. By completely removing visual noise, clear patterns surfaced immediately: shifts in genre preferences, peak viewing times, and how habits evolved over five years."
          }}
        />
      </div>
    </section>
  );
}

/* ========================================================================== */
/*                                  JOURNEY                                   */
/* ========================================================================== */

function Journey() {
  const chapters = [
    {
      sub: "The Foundation",
      title: "Operations over theory.",
      desc: "Studying business management gave me the blueprints, but I quickly realised that a perfect strategy on paper is completely useless if the team executing it is drowning in manual, repetitive tasks."
    },
    {
      sub: "The Pivot",
      title: "Moving towards the data.",
      desc: "Relocating to London shifted my focus from abstract management to ground-level problem-solving. To fix broken operational pipelines, I needed to learn how to manipulate the data flowing through them."
    },
    {
      sub: "Bayes Business School",
      title: "Finding the signal.",
      desc: "My MSc in Business Analytics provided the technical leverage. It wasn't about collecting coding languages; it was about learning to interrogate raw datasets, isolate the actual friction points, and engineer automated solutions."
    },
    {
      sub: "Finance Operations",
      title: "Execution in the real world.",
      desc: "Today, processing live transactions keeps me grounded. Seeing exactly where enterprise systems fail and where people resort to copying and pasting tells me exactly what needs to be automated next."
    }
  ];

  return (
    <section id="chapters" className="px-6 md:px-12 lg:px-20 py-24 md:py-40 max-w-[90rem] mx-auto border-t border-zinc-200/80 dark:border-zinc-800 overflow-hidden">
      <SectionHeading
        title="The Evolution."
        description="How my approach to problem-solving has compounded over time."
      />

      <div className="mt-16 md:mt-24 relative">
        {/* Continuous Background Line (Desktop) */}
        <div className="hidden lg:block absolute top-[11px] left-0 w-full h-[2px] bg-gradient-to-r from-zinc-200 via-zinc-300 to-transparent dark:from-zinc-800 dark:via-zinc-700 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
          {chapters.map((ch, i) => (
            <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }} variants={fadeUp} className="relative flex flex-col group">

              {/* Timeline Node & Line */}
              <div className="flex items-center mb-6 lg:mb-8">
                {/* The Dot */}
                <div className="w-6 h-6 rounded-full bg-white dark:bg-[#050505] border-4 border-zinc-200 dark:border-zinc-800 flex-shrink-0 relative z-10 transition-colors duration-300 group-hover:border-zinc-900 dark:group-hover:border-zinc-400"></div>

                {/* Connecting line for mobile/tablet (horizontal between grid items) */}
                {i !== chapters.length - 1 && (
                  <div className="lg:hidden w-full h-[2px] bg-zinc-200 dark:bg-zinc-800 ml-2"></div>
                )}
              </div>

              {/* The Content Card */}
              <div className="flex-grow flex flex-col bg-[#FAFAFA] dark:bg-[#0B0F19]/60 p-8 rounded-[2rem] border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-300 hover:bg-white dark:hover:bg-[#0B0F19] hover:shadow-lg hover:-translate-y-1">
                <span className="uppercase text-[11px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 block mb-4">
                  0{i + 1} • {ch.sub}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-4">
                  {ch.title}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mt-auto font-medium">
                  {ch.desc}
                </p>
              </div>

              {/* Arrow Indicator (Desktop Only) */}
              {i !== chapters.length - 1 && (
                <div className="hidden lg:flex absolute top-[18px] -right-5 w-10 h-10 items-center justify-center bg-[#FAFAFA] dark:bg-[#050505] z-20 text-zinc-400 dark:text-zinc-600">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}

            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }} variants={fadeUp} className="mt-24 md:mt-32 pt-16 border-t border-zinc-200/80 dark:border-zinc-800 flex justify-center text-center">
        <p className="text-2xl md:text-3xl font-serif italic font-light text-zinc-700 dark:text-zinc-300 max-w-3xl leading-snug">
          &quot;I used to think the goal was to learn every tool. Now I realize the goal is to simplify the workflow.&quot;
        </p>
      </motion.div>
    </section>
  );
}

/* ========================================================================== */
/*                                  FOOTER                                    */
/* ========================================================================== */

function Footer() {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-32 md:py-40 bg-zinc-950 dark:bg-[#030508] overflow-hidden flex flex-col items-center text-center">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="mx-auto max-w-4xl relative z-10 w-full flex flex-col items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }} variants={fadeUp} className="w-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-normal text-white mb-8 leading-snug">
            Let&apos;s build systems that quietly make work easier.
          </h2>
          <p className="text-base md:text-lg text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            If you have a messy process that needs untangling, or an interesting problem that needs solving, my inbox is always open.
          </p>

          <a href="mailto:sahil05919@gmail.com" className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 md:px-10 md:py-5 text-sm font-semibold text-zinc-950 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]">
            <Mail className="h-5 w-5" />
            Let&apos;s start a conversation
          </a>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="w-full mt-24 md:mt-32 pt-8 border-t border-zinc-800/60 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          <div>© {new Date().getFullYear()} Sahil Kumar</div>
          <div className="flex gap-6">
            <a href="https://github.com/sahil" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/sahil" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 opacity-70"></span>
            </span>
            Building in London
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*                               MAIN EXPORT                                  */
/* ========================================================================== */

export default function Home() {
  return (
    <main className="relative bg-[#FAFAFA] text-zinc-900 dark:bg-[#050505] dark:text-zinc-50 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <Hero />
      <HowIThink />
      <Projects />
      <Journey />
      <Footer />
    </main>
  );
}