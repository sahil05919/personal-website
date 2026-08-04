// app/projects/page.tsx

import type { Metadata } from "next";
import { ProjectsChapter } from "@/components/projects/ProjectsChapter";

// Bare title only. The root layout applies the "%s | Sahil Kumar" template,
// so anything more here double-suffixes the tab.
//
// This page previously inherited the site-wide default description
// ("Business Analytics graduate and Finance Assistant building analytical
// systems with Power BI, SQL, Python and business operations") — a CV line,
// shared verbatim with four other pages.
//
// No count and no date range: both go stale silently, which is the failure
// /media avoids by staying undated.
export const metadata: Metadata = {
  title: "Projects",
  description:
    "A few problems that became mine \u2014 what I built, what I decided, and what I couldn't explain.",
};

export default function ProjectsPage() {
  return <ProjectsChapter />;
}