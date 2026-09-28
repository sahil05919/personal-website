# sahilarora.vercel.app

The source of Sahil Kumar's personal website — a record kept in London, set out
as a short book: nine chapters (Home, About, Journey, Now, Projects, Experience,
Media, Writing, Contact) and three pages of back matter (Index, Questions,
Errata).

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Framer Motion.
Fraunces, Newsreader and JetBrains Mono are self-hosted through Fontsource.
Deployed on Vercel.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; must pass before pushing
npm run lint
```

## Where the words live

Content is kept apart from layout. To change what a page says, edit its content
file, not its component:

| Page | Content |
| --- | --- |
| Home | `data/homeContent.ts` |
| About | `data/profileContent.ts` |
| Journey | `data/journeyData.ts` |
| Now | `app/now/now-content.ts` |
| Projects | `data/projectsChapter.ts` |
| Experience | `app/experience/experience-content.ts` |
| Media | `data/mediaData.ts` |
| Questions | `data/questions-content.ts` |
| Contact | `data/contactData.ts` |
| Writing / Errata / Index | `data/writingData.ts`, `data/errataData.ts`, `data/indexData.ts` |

Every English file has a Hinglish twin in `data/hinglish/`. The compiler checks
that the two stay the same shape, so a field added to one must be added to the
other. `CONTENT-GUIDE.md` has the editorial rules.

## Environment

| Variable | Used by |
| --- | --- |
| `NEXT_PUBLIC_UNSIGNED_ACCESS_KEY` | The anonymous form on Contact (Web3Forms). Without it the form says it is not connected, rather than failing silently. Inlined at build time, so redeploy after changing it. |
