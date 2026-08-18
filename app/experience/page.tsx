import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ExperienceChapter from '@/app/experience/ExperienceChapter';

export const metadata: Metadata = pageMetadata({
  path: "/experience",
  title: "Experience",
  description:
    "A record of the work I was given rather than the work I chose — beginning with a saree shop in Mahendragarh.",
});

export default function Page() {
  return <ExperienceChapter />;
}
