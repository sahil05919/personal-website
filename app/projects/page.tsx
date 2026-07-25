'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { featuredProjects } from "@/data/projectsData";

export default function ProjectsPage() {
  return (
    <section className="min-h-screen bg-background text-foreground px-6 md:px-24 py-24 select-none">
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Header */}
        <div>
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase block mb-3">
            Chapter 04 // Portfolio
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground font-display mb-4">
            Case Studies
          </h1>
          <p className="text-base text-muted-foreground font-light max-w-2xl leading-relaxed">
            I treat projects as business problems to be solved, not just code repositories. Here is a look at my thinking process, technical approach, and how I use tools like Power BI, SQL, and Python to find practical answers.
          </p>
        </div>

        {/* Deep Case Studies List */}
        <div className="space-y-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
              className="border border-border bg-card rounded-sm p-6 md:p-10 shadow-premium grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Side: Summary & Core Impact */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-sm">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* Highlighted Metric Box */}
                <div className="p-4 bg-background border border-border rounded-sm">
                  <span className="font-mono text-[10px] uppercase text-border block mb-1 tracking-wider">Measured Outcome</span>
                  <p className="text-xs font-mono text-emerald-400 font-light leading-normal">
                    {project.results[0]}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="font-mono text-[11px] text-foreground bg-muted px-2.5 py-1 rounded-sm border border-transparent">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: The Breakdown */}
              <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8 space-y-5 text-sm">
                <div>
                  <h4 className="font-mono text-xs text-foreground uppercase tracking-wider mb-1">The Context & Problem</h4>
                  <p className="text-muted-foreground font-light leading-relaxed">{project.problemStatement}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-foreground uppercase tracking-wider mb-1">My Approach</h4>
                  <ul className="space-y-1.5 text-muted-foreground font-light">
                    {project.approachSteps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-border mt-1.5 select-none shrink-0 text-xs">└</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-foreground uppercase tracking-wider mb-1">The Challenge</h4>
                  <p className="text-muted-foreground font-light leading-relaxed">{project.challengesOvercome}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Next Gateway Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full pt-8 flex justify-end"
        >
          <Link 
            href="/garden" 
            className="group inline-flex items-center gap-3 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span>Chapter 05: The Digital Garden</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}