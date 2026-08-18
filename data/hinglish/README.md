# Hinglish

The second reading of the record. English stays the original and the default; this
folder is a parallel set of content files, and nothing in it touches layout,
components or routes.

## The rules

1. **Same shape, same ids.** Every file here exports an object typed against the
   English one's own interface (`satisfies JourneyChapter[]`, and so on). If the
   English shape changes, this stops compiling — which is the point. Chapter and
   entry ids MUST match: the rail, the anchors, the search index and the A–Z all
   key off them and none of them are translated.

2. **Partial is fine, and expected.** Anything absent falls back to English
   silently (`useVariant` in `hooks/use-reading-mode.ts`), so a page can be added
   one file at a time and a page with no `.hi.ts` simply reads in English.

   As of August 2026 every route has a second reading, and the fallback is now
   insurance rather than the normal state. The technical chapters — the Equinor
   reconstruction, the pension case — are translated as code-mixing with all of
   their technical vocabulary left in English, which is how they would actually be
   said out loud. If a future chapter is better left in English, leave it: the
   header will say so.

3. **Apparatus stays English.** Labels, dates, folio numbers, "All India Rank",
   route names, `navLabel`, and anything a URL or an index entry depends on. The
   prose is the translation; the machinery is not.

4. **This is code-mixing, not translation.** Words that were English in the
   original thought stay English — school, scholarship, invoices, Power BI,
   master's, recruitment. Rendering them into formal Hindi would produce a
   register nobody actually speaks, and would read as a document translated by
   somebody who was not there.

5. **Register.** The English on this site is plain, concrete and slightly dry.
   The Hinglish has to be the same person, not a warmer one. No exclamation
   marks, no filmi cadence, no "yaar" for texture.

## Status — READ THIS BEFORE PUBLISHING

The prose in this folder is a **first draft written by Claude**, not by Sahil, and
it covers the whole site. The system is finished; the writing is a starting
point. It is structurally correct,
it is faithful to the English line by line, and it is somebody imitating a voice
rather than using their own — which on a site whose whole argument is that the
writing is his, matters more than usual.

Read it aloud and rewrite anything that is not how you would have said it. Nothing
here needs to survive; the files, the types and the toggle do.

## Adding a page

1. Write `data/hinglish/<chapter>.hi.ts`, typed against the English content's
   interface.
2. In the client component that renders it, wrap the English import:
   `const chapters = useVariant(journeyChapters, journeyChaptersHi)`.
3. Add the route to `TRANSLATED_ROUTES` in `data/hinglish/index.ts`, which is what
   the "yeh chapter abhi English mein hai" note in the header reads.

Parity is enforced by the compiler, not by discipline. `useVariant` takes the
English value and a `Loose<>` version of its type: literal strings and fixed
tuples are widened, everything else is not. Drop a field, rename an id or change
an array's shape in a `.hi.ts` file and the build fails.
