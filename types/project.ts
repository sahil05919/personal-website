export type ProjectType = "Personal" | "Academic";
export type ProjectStatus = "Ongoing" | "Completed";

export interface FeaturedProject {
  slug: string;
  title: string;
  subtitle: string;
  featured: boolean;
  displayOrder: number;
  projectType: ProjectType;
  category: string;
  status: ProjectStatus;
  year: string;
  duration: string;
  coverImage: string;
  techStack: string[];
  skillsDemonstrated: string[];
  overview: string;
  executiveSummary: string;
  problemStatement: string;
  businessContext: string;
  objectives: string[];
  myThinking: string;
  architecture: string[];
  approachSteps: string[];
  challengesOvercome: string;
  results: string[];
  lessonsLearned: string[];
  futureImprovements: string[];
}