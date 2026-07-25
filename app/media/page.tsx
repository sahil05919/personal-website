import type { Metadata } from "next";
import { MediaChapter } from "@/components/media/MediaChapter";

export const metadata: Metadata = {
  title: "Media — Sahil Kumar",
  description:
    "A small collection of moments from the last two years — proof of presence, not a portfolio.",
};

export default function MediaPage() {
  return <MediaChapter />;
}