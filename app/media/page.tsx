// app/media/page.tsx

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { MediaChapter } from "@/components/media/MediaChapter";

// Bare title only. The root layout applies the "%s | Sahil Kumar" template,
// so anything more here double-suffixes the tab.
//
// The description carries no temporal claim on purpose. It previously read
// "from the last two years", which quietly becomes false without anyone
// editing it — the same failure this page avoids by staying undated.
export const metadata: Metadata = pageMetadata({
  path: "/media",
  title: "Media",
  description:
    "A small collection of moments that stayed with me — proof of presence, not a portfolio.",
});

export default function MediaPage() {
  return <MediaChapter />;
}