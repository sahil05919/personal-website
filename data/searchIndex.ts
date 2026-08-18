import { journeyChapters } from "@/data/journeyData";
import { projectEntries, projectRecord } from "@/data/projectsChapter";
import { entries as experienceEntries, prologue } from "@/app/experience/experience-content";
import { questions } from "@/data/questions-content";
import { writing } from "@/data/writingData";
import { indexEntries } from "@/data/indexData";
import { destinations } from "@/data/navigation";
import { errata } from "@/data/errataData";

/**
 * THE SEARCH INDEX.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS IS A FILE AND NOT A SERVICE
 *
 * Every page on this site is static and the whole thing is a few thousand
 * words. Search here does not need a server, an API route, a third-party
 * index, or a 40kB fuzzy-matching library — it needs the titles and the
 * anchors, in memory, filtered on keystroke. This module is that list, built
 * by importing the same content the pages render.
 *
 * Derived, never transcribed. A chapter renamed, an essay reordered, a piece
 * of writing added — all of it flows through here without a second edit, and
 * there is no way for the search results to describe a site that no longer
 * exists.
 *
 * ---------------------------------------------------------------------------
 * WHAT IS INDEXED, AND WHAT IS NOT
 *
 * Headings, titles, questions and index terms — the things a person actually
 * searches a site of essays for. NOT the full prose.
 *
 * That is a deliberate limit, not a shortcut. Indexing every paragraph would
 * mean shipping the entire text of the site to every visitor as JSON before
 * they have typed anything, and it would return results like "…and grew up in
 * a large joint family…" — a fragment, out of context, with no way to tell
 * which chapter it belongs to. A reader looking for the saree shop wants
 * "Pooja Saree Centre", and a reader looking for Equinor wants the essay, not
 * the sentence.
 *
 * Each record carries a `kind` so results can be grouped, and `context` so a
 * bare title like "Once a week" is not orphaned from the chapter it lives in.
 */

export interface SearchRecord {
  /** What is shown large. */
  title: string;
  /** Where it lives, shown small beside the title. */
  context: string;
  /** Grouping label. */
  kind: "Chapter" | "Essay" | "Entry" | "Question" | "Writing" | "Index" | "Errata";
  href: string;
  /** Extra words that should match but are not displayed. */
  keywords?: string;
  /** Opens off-site. */
  external?: boolean;
}

const chapters: SearchRecord[] = destinations.map((d) => ({
  title: d.label,
  context: "Chapter",
  kind: "Chapter",
  href: d.href,
}));

const backMatter: SearchRecord[] = [
  { title: "Index", context: "Back matter", kind: "Chapter", href: "/a-z" },
  { title: "Writing", context: "Back matter", kind: "Chapter", href: "/writing" },
  { title: "Errata", context: "Back matter", kind: "Chapter", href: "/errata" },
];

const journey: SearchRecord[] = journeyChapters.map((c) => ({
  title: c.title,
  context: `Journey · ${c.era}`,
  kind: "Entry",
  href: `/journey#${c.id}`,
  keywords: c.navLabel,
}));

const projects: SearchRecord[] = [
  ...projectEntries.map((e) => ({
    title: e.title,
    context: "Projects",
    kind: "Essay" as const,
    href: `/projects#${e.id}`,
    keywords: e.attribution,
  })),
  // The record list at the foot of the chapter. No anchors of their own, so
  // they all point at the record itself rather than at a hash that isn't there.
  ...projectRecord.map((r) => ({
    title: r.title,
    context: `Projects · ${r.context}`,
    kind: "Essay" as const,
    href: "/projects#projects-record",
    keywords: r.year,
  })),
];

const experience: SearchRecord[] = [
  {
    title: prologue.title,
    context: "Experience · since 2011",
    kind: "Entry",
    href: `/experience#${prologue.id}`,
  },
  ...experienceEntries.map((e) => ({
    title: e.title,
    context: `Experience · ${e.year ?? ""}`.trim().replace(/·\s*$/, "").trim(),
    kind: "Entry" as const,
    href: `/experience#${e.id}`,
    keywords: [e.organisation, e.place, e.gloss].filter(Boolean).join(" "),
  })),
];

const questionRecords: SearchRecord[] = questions.map((q) => ({
  title: q.question,
  context: "Questions",
  kind: "Question",
  href: "/questions",
}));

const writingRecords: SearchRecord[] = writing.map((w) => ({
  title: w.title,
  context: w.source,
  kind: "Writing",
  href: w.href,
  external: true,
  keywords: w.year,
}));

/**
 * Index terms. These are the entries that make a search over TITLES behave a
 * little like a search over the text: "Brighton", "Dhoni", "invoices" and
 * "Oracle" are all findable here and appear in no heading anywhere.
 */
const indexTerms: SearchRecord[] = indexEntries.map((e) => ({
  title: e.term,
  context: e.refs.map((r) => r.label).join(" · "),
  kind: "Index",
  href: e.refs[0]?.href ?? "/a-z",
  keywords: e.note,
}));

const errataRecords: SearchRecord[] = errata.map((e) => ({
  title: e.struck ?? e.note.slice(0, 60),
  context: `Errata · ${e.where}`,
  kind: "Errata",
  href: "/errata",
  keywords: e.kind,
}));

export const searchIndex: SearchRecord[] = [
  ...chapters,
  ...backMatter,
  ...journey,
  ...projects,
  ...experience,
  ...questionRecords,
  ...writingRecords,
  ...indexTerms,
  ...errataRecords,
];

/** Order results are grouped in. Chapters first — a reader typing "cont" wants
 *  the Contact page, not an index entry that happens to contain the letters. */
export const KIND_ORDER: SearchRecord["kind"][] = [
  "Chapter",
  "Essay",
  "Entry",
  "Question",
  "Writing",
  "Index",
  "Errata",
];

/**
 * Rank a record against a query.
 *
 * Deliberately simple and deliberately NOT fuzzy. Fuzzy matching on a corpus
 * this small returns confident nonsense — every query matches everything at
 * some score, and the reader has to read the whole list to find out that what
 * they wanted is not there. An exact substring match, weighted by where it
 * lands, is honest: no results means no results.
 *
 * Returns 0 for no match, so callers can filter on it.
 */
export function score(record: SearchRecord, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const title = record.title.toLowerCase();
  const context = record.context.toLowerCase();
  const keywords = record.keywords?.toLowerCase() ?? "";

  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  // A match at a word boundary beats one buried mid-word: "sar" should find
  // "Pooja Saree Centre" ahead of anything that merely contains the letters.
  if (new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(title)) {
    return 60;
  }
  if (title.includes(q)) return 40;
  if (keywords.includes(q)) return 25;
  if (context.includes(q)) return 15;
  return 0;
}
