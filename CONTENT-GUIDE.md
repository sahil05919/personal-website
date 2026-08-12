# Content Guide — sahilarora.vercel.app

This document exists so that if you ever lose access to Claude, this project, or your chat history, you can still open your own website's code and understand it well enough to change it yourself — safely. It explains how the site is put together, exactly which file to open for each kind of change, what every piece of code in the project actually does, which files to never touch, and how to get a change live once you've made it.

Keep this file. It lives at the root of your project folder (`CONTENT-GUIDE.md`), right next to your code, so it survives even if everything else — this chat, this Claude project, your memory of any of this — is lost. Everything in it was checked directly against your actual code on 12 August 2026, not assumed.

---

## 1. How this site actually works, in plain terms

Your site is built with **Next.js** (a framework for building websites with React, a UI library) and hosted on **Vercel**, which watches your GitHub repository and automatically rebuilds and republishes the live site every time you push a change to it.

That means the loop for any change is always the same:

1. Edit a file on your computer.
2. Save it.
3. Commit and push it to GitHub (`git add`, `git commit`, `git push`).
4. Vercel notices the push and redeploys automatically — usually live within a minute or two.

There is no separate "publish" button and no admin panel. The code *is* the website.

The one thing that makes this manageable for a non-developer maintaining their own site: **your words and your website's construction are kept in separate files, deliberately, by design — this isn't incidental.** Nearly every file in this project (and every content file, without exception) opens with a comment explaining *why* it's built the way it is. Almost everything you'll ever want to change — a job, a sentence, a link, a date — lives in a small number of plain-content files. The complicated part (how things animate, how they're laid out, what fonts are used) lives elsewhere, in `components/`, and you should never need to touch it.

**Two other things worth knowing about how this particular site is written**, because they explain a lot of the file organisation below:

- **The site is metaphorically "a book."** You'll see this language throughout the code's own comments: pages are "chapters," the site-wide component order is "the spine," the Contact page is "the last room of the record," the Now page is "a leaf tipped into the book." This isn't just flavour text — it's the actual design principle the layout code follows (a consistent visual "through-line" spine runs down the Home page, for instance, made of literal component code in `components/home/Column.tsx`).
- **A recurring rule across almost every content file is "no two adjacent things may look the same."** You'll see comments enforcing this — no repeated grid of identical cards, no six uncontestable bullet points in a row. If you add new entries to a list (a new job, a new fact), try to follow the same voice and shape as what's around it rather than making everything uniform.

---

## 2. The one rule that matters

> **If you're changing what something *says*, you're safe. If you're changing how something *works*, stop and ask.**

Concretely: in almost every file described below, you are looking for a piece of text between quote marks, like this:

```ts
title: "Fifty to seventy",
```

Changing the words inside the quotes is safe:

```ts
title: "Sixty to eighty",
```

That is the entire skill. You do not need to understand the rest of the file. Do not delete commas, quote marks, curly braces `{ }`, or square brackets `[ ]` — those hold the structure together. If you copy an existing entry and change the words inside it, you are doing it exactly right.

---

## 3. Folder map

```
personal-website/
├── app/                    Each page's route + a few page-specific content files
│   ├── layout.tsx          ⚠️ Site-wide wrapper (fonts, theme, nav). Don't touch.
│   ├── page.tsx              Home page structure (content is in data/homeContent.ts)
│   ├── globals.css          ⚠️ Design tokens: colours, fonts. Don't touch.
│   ├── about/page.tsx        About page structure (content is in data/profileContent.ts)
│   ├── contact/page.tsx      Contact page structure (content is in data/contactData.ts)
│   ├── experience/
│   │   ├── page.tsx          Experience page structure
│   │   └── experience-content.ts   ✅ YOUR JOBS LIVE HERE
│   ├── journey/page.tsx      Journey page structure (content is in data/journeyData.ts)
│   ├── media/page.tsx        Media page structure (content is in data/mediaData.ts)
│   ├── now/
│   │   ├── page.tsx          Now page structure
│   │   └── now-content.ts    ✅ YOUR CURRENT LIFE / ARTICLES LIVE HERE
│   ├── projects/page.tsx     Projects page structure (content is in data/projectsChapter.ts)
│   └── question/page.tsx     Questions page structure (content is in data/questions-content.ts)
│
├── components/              ⚠️ HOW pages look and animate. Don't touch unless told exactly what line.
│   (about/, contact/, home/, journey/, media/, now/, projects/, questions/, ui/, global/, providers/)
│
├── data/                    ✅ MOST OF YOUR CONTENT LIVES HERE
│   ├── contactData.ts        Contact page: email, phone, links, closing note
│   ├── homeContent.ts        Home page: headline, statement, per-page invitation lines
│   ├── journeyData.ts        Journey page: your life-story chapters
│   ├── mediaData.ts          Media page: your photo moments + captions
│   ├── navigation.ts         ✅ Single source of truth for site-wide page order (nav, Home contents list)
│   ├── profileContent.ts     About page: the essay, the facts grid, "things that stay"
│   ├── projectsChapter.ts    Projects page: your project write-ups
│   └── questions-content.ts  Questions page: the Q&A entries
│
├── public/                  Images, icons, and your CV
│   ├── documents/Sahil_Kumar_CV.pdf   ✅ Replace this file directly to update your CV
│   └── images/
│       ├── media/            Photos used on the Media page
│       └── projects/         Screenshots used on the Projects page
│
├── lib/heroRhythm.ts        Shared layout measurements (currently unused — see §6)
├── hooks/use-reveal-on-view.ts   Shared "fade in on scroll" behaviour
├── types/                    Empty — kept as a placeholder folder
├── tailwind.config.js        ⚠️ Design system (colours, fonts, spacing). Don't touch.
├── next.config.ts            ⚠️ Build configuration. Don't touch.
├── package.json               ⚠️ Dependencies. Don't touch unless told to.
└── CONTENT-GUIDE.md          This file.
```

**Rule of thumb:** if a file is inside `data/`, or is named `*-content.ts`, it's almost certainly safe to edit. If it's inside `components/`, or is one of the files marked ⚠️ above, leave it alone unless you know exactly what you're doing (or you're asking Claude to make the change for you).

---

## 4. What every piece of code actually does, page by page

This section exists so that even the parts you should never edit aren't a mystery. For each page: which content file holds your words, and — briefly — what each supporting component file in `components/` is responsible for rendering. You don't need to memorise this; it's here so you can look something up if you're ever curious what a file does before you go near it.

### Home (`/`)
**Content file:** `data/homeContent.ts` — headline, the four-paragraph statement, and the "invitation" line quoted next to each page in the Contents list.
**Page structure file:** `app/page.tsx` — assembles the sections below in order and enforces that they stay directly adjacent (there's a visual line, the "through-line," drawn down the left edge of the page that depends on the sections having no gaps between them — this is why you should never add spacing between Home's sections yourself).

| Component | What it does |
|---|---|
| `components/home/Frontispiece.tsx` | The title page: eyebrow, the animated "Fig. 01" figure, caption, and the main headline. |
| `components/home/ResolveFigure.tsx` | The actual animation — scattered fragments resolving into one line. Purely decorative, respects reduced-motion settings. |
| `components/home/Statement.tsx` | Renders the four-paragraph "statement" essay beneath the title, deliberately without animation so it reads as writing, not an effect. |
| `components/home/Contents.tsx` | The list of links to your other eight pages, each with its own quoted opening line. Reads its order from `data/navigation.ts`. |
| `components/home/Currently.tsx` | The "proof the record is alive" line — pulls its text from `app/now/now-content.ts`, not from any Home file, so it's never out of sync with the actual Now page. |
| `components/home/Colophon.tsx` | The closing/footer block: "Written in London...", GitHub/LinkedIn/Contact links. |
| `components/home/Column.tsx` | Not visible content — a structural helper that draws the vertical "spine" line running down the page. |
| `components/home/Wayfinder.tsx` | The right-margin index of page links visible on wide desktop screens, also reading from `data/navigation.ts`. |
| `components/home/rhythm.ts` | Shared spacing/width measurements so every Home section lines up consistently. Not content. |

### About (`/about`)
**Content file:** `data/profileContent.ts` — the essay (explicitly marked LOCKED in the file's own comments — see §6), the six-row facts grid, and the "Things that stay" marginalia section.
**Page structure file:** `app/about/page.tsx`.

| Component | What it does |
|---|---|
| `components/about/Masthead.tsx` | The opening: page title ("The patterns, not the events.") and portrait area. |
| `components/about/Facts.tsx` | Renders the `facts` array (Originally from / Based in / Work / Studied / Languages / Favourite food) as a ledger of rows. |
| `components/about/Prose.tsx` | Renders the essay itself, paragraph by paragraph, using the `mode` field on each paragraph (body/display/stanza/turn/etc.) to decide type size and layout. |
| `components/about/Marginalia.tsx` | The "Things that stay" section — five small personal notes laid out asymmetrically on purpose (see the file's own comment: deliberately not a grid). |
| `components/about/Exit.tsx` | The full-width link at the bottom leading to the Journey page. |
| `components/about/layout.ts` | Shared column/grid measurements for this page. Not content. |
| `components/about/index.ts` | Just re-exports the five components above so `app/about/page.tsx` can import them in one line. Not content. |

### Journey (`/journey`)
**Content file:** `data/journeyData.ts` — your life-story chapters, the "journey at a glance" snapshot, era labels.
**Page structure file:** `app/journey/page.tsx`.

| Component | What it does |
|---|---|
| `components/journey/JourneyHero.tsx` | The opening title and intro text. |
| `components/journey/JourneySnapshot.tsx` | The mobile/tablet "journey at a glance" summary — a static list, no scroll tracking. |
| `components/journey/JourneyRail.tsx` | The desktop equivalent — a sticky sidebar that highlights which chapter you're currently reading as you scroll. |
| `components/journey/JourneyChapters.tsx` | Renders all nine life chapters in order, including the promoted quotes (like the motorcycle line) and the AIR 35 typographic moment. |
| `components/journey/JourneyClose.tsx` | The closing reflection and hand-off link to the Now page. |
| `components/journey/index.ts` | Re-exports the components above. Not content. |

### Experience (`/experience`)
**Content file:** `app/experience/experience-content.ts` — every job entry, in an array called `entries`, plus a separate `prologue` entry for Pooja Saree Centre (deliberately kept separate so it can never accidentally get sorted or filtered in with the rest — see the file's own comment).
**Page structure file:** `app/experience/page.tsx` — a server component (meaning no interactive JavaScript beyond CSS) that lays out a "ledger" of apparatus (figures, years, organisations) alongside the prose.

This page doesn't have its own `components/experience/` folder with separate files — the layout logic lives directly inside `app/experience/page.tsx` itself. (There is an empty `components/experience/` folder left over from an earlier version; it holds nothing and can be deleted — see the dead-code notes in the project's history.)

### Media (`/media`)
**Content file:** `data/mediaData.ts` — each photo "moment": image path, caption, layout width. **Order matters** — see the file's own comment: Oxford must stay immediately before Cambridge (the captions reference each other), and Brighton must stay last (it's the chapter's closing line).
**Page structure file:** `app/media/page.tsx`.

| Component | What it does |
|---|---|
| `components/media/MediaChapter.tsx` | Renders the full sequence of moments from `data/mediaData.ts`, in order. Deliberately not a gallery — no filters, no grid. |
| `components/media/MediaMoment.tsx` | Renders one individual moment — the photograph(s) and caption — and handles the "diptych" layout for the two-photo entries (London Bridge / Notting Hill). |

### Now (`/now`)
**Content file:** `app/now/now-content.ts` — the page you'll update most often. See §5 below for exactly which part to edit for what.
**Page structure file:** `app/now/page.tsx`.

| Component | What it does |
|---|---|
| `components/now/Stamp.tsx` | The season heading ("Summer 2026") and the "Updated [date]" postmark. |
| `components/now/SeasonProse.tsx` / `Revised.tsx` | Render the opening paragraphs, including the "visible revision" feature — where an old sentence is shown struck through next to its replacement, rather than silently edited away. This is a real, distinctive feature of this page; see the file's own comment for why it's kept public rather than hidden. |
| `components/now/Making.tsx` | The "Work & making" section — your current job and the projects you're building. |
| `components/now/QuietCentre.tsx` | A deliberate pause/break in the middle of the page — no content, no interaction, by design. |
| `components/now/Workbench.tsx` | The "Becoming" section — reading, learning, cooking. |
| `components/now/Answering.tsx` | The "Community and Writing" section — questions people have asked you, and links to what you've published. |
| `components/now/Pile.tsx` / `Leaf.tsx` | Shared structural pieces — `Leaf` is the two-column (margin + prose) layout used throughout this page; `Pile` is the interactive "stack of unfinished writing" you can click through one at a time. |
| `components/now/Exploring.tsx` | Places you've recently been / want to go next. |
| `components/now/Close.tsx` | The closing statement and the "archive" date-stamp. |
| `components/now/index.ts` | Re-exports all of the above, in the exact order they appear on the page — the file's own comment notes this ordering is deliberate. |

### Projects (`/projects`)
**Content file:** `data/projectsChapter.ts` — two tiers: `projectEntries` (the five full written essays) and `projectRecord` (the simple list, "A record").
**Page structure file:** `app/projects/page.tsx`.

| Component | What it does |
|---|---|
| `components/projects/ProjectsChapter.tsx` | Assembles the whole page: the five essays plus the simple record list. |
| `components/projects/ProjectEntry.tsx` | Renders one full essay, including any promoted "evidence mark" sentence and any image. |
| `components/projects/ProjectMargin.tsx` | The right-margin decoration on wide screens — case numbers and small abstract motifs per project. Purely visual. |
| `components/projects/Seam.tsx` | The animated divider line between essays. |

### Questions (`/question`)
**Content file:** `data/questions-content.ts` — each entry has a `question` and a `paragraphs` field (or `null` if unanswered).
**Page structure file:** `app/question/page.tsx` — passes every question (answered or not) to the component below.

| Component | What it does |
|---|---|
| `components/questions/QuestionsExperience.tsx` | Renders the intro line, every question, and — for any question whose `paragraphs` is `null` — the "Answer coming soon" note instead of an essay. |

### Contact (`/contact`)
**Content file:** `data/contactData.ts` — email, phone, social links, and the closing note.
**Page structure file:** `app/contact/page.tsx`.

| Component | What it does |
|---|---|
| `components/contact/ContactHero.tsx` | The opening headline ("Write back.") and intro lines. |
| `components/contact/Imprint.tsx` | The list of ways to reach you (email, LinkedIn, WhatsApp, Instagram, GitHub), styled as a "ruled letterhead." |
| `components/contact/BrandMark.tsx` | The small hand-drawn icon used next to each contact method. Purely visual, not content. |
| `components/contact/BeforeYouGo.tsx` | The closed-by-default "one last thing" note near the bottom of the page. |
| `components/contact/ClosingSignature.tsx` | Your name, "London.", and the link back to the homepage. |
| `components/contact/Horizon.tsx` | **Not currently used.** An older version of this page's ending. Left over from a previous design — see §6, it's a confirmed dead-code candidate. |

### Site-wide navigation
**Content file:** `data/navigation.ts` — one array, `navigation`, controls the navbar order, the Home page's Contents list, and the Home page's Wayfinder rail, all at once. This file replaced an earlier version of the site where the same list existed in two different places and quietly disagreed with itself (the file's own comment tells this story) — so this is deliberately the *only* place page order is ever written.

| Component | What it does |
|---|---|
| `components/global/Navbar.tsx` | The top navigation bar on every page, including the mobile menu. Reads its links and order from `data/navigation.ts`. |
| `components/global/Footer.tsx` | **Not currently used.** An older footer design, superseded by `components/home/Colophon.tsx`. See §6. |
| `components/providers/ThemeProvider.tsx` | Wires up light/dark mode and a site-wide animation setting that makes every animation on the site respect a visitor's "reduce motion" accessibility preference. |
| `components/ui/ThemeToggle.tsx` | The light/dark mode switch shown in the navbar. |
| `components/ui/StatusChip.tsx` | **Not currently used.** Leftover component, never wired into any page. See §6. |

### Shared helpers (used by more than one page)
| File | What it does |
|---|---|
| `hooks/use-reveal-on-view.ts` | A small reusable "fade in as you scroll to it" effect, used by the Media and Projects pages. Respects reduced-motion. |
| `lib/heroRhythm.ts` | **Not currently used.** Was shared spacing between Home and the old Contact hero (`Horizon.tsx`). Since that old Contact hero was replaced, this file has nothing left to serve. See §6. |

---

## 5. Common changes — quick lookup

**I got a new job.**
→ Add an entry in `app/experience/experience-content.ts` (`entries` array — copy the most recent entry, give the copy a new unique `id`, and change the title/dates/description).
→ Update `Work` in the `facts` array of `data/profileContent.ts`.
→ Consider updating the `work` section of `app/now/now-content.ts` ("what I'm currently doing").
→ Your CV PDF (`public/documents/Sahil_Kumar_CV.pdf`) will now be out of date — replace the file with a freshly exported PDF that matches. **This was a real, confirmed problem on this site before:** the file's own comment in `data/contactData.ts` documents, line by line, exactly how the CV and the Experience page used to disagree — different dates, different titles, a 30% vs 20% metric mismatch. That comment is left in the code on purpose, as a warning. Keep the CV and the Experience page in sync every single time either changes.

**I moved to a new city/country.**
→ `data/contactData.ts` → `contactInfo.location`
→ `data/profileContent.ts` → the `Based in` row in `facts`
→ `data/homeContent.ts` → the `eyebrow` field ("Sahil Kumar — London") and the `colophon.close` line ("Written in London...")
→ `app/now/now-content.ts` if it references your city
→ `data/contactData.ts` → `contactContent.close.place` too.
This is the change that touches the most files, because "London" is quoted in several places rather than stored once. If in doubt, search the `data/` folder for the old city name and check every match.

**I published a new article.**
→ `app/now/now-content.ts` → `answering.published` array. Add a new entry in the same shape:
```ts
{
  text: 'Your article title',
  href: 'https://...',
  source: 'LinkedIn',   // or wherever it's published
},
```

**I finished a new project.**
→ Quick version: `data/projectsChapter.ts` → `projectRecord` array (title/context/year — safe and easy, copy an existing row).
→ Full write-up: `data/projectsChapter.ts` → `projectEntries` — more advanced. Paragraphs are cross-referenced by their position in the array with visual elements (`isolate`, `mediaAfterParagraph`), so inserting or removing a paragraph can shift where an image or pull-quote appears. Follow an existing entry very closely, or have Claude do this one.

**I want to add a new photo to Media.**
→ Put the image file in `public/images/media/`.
→ Add an entry in `data/mediaData.ts` pointing at it, with a caption. Mind the ordering note in that file (Oxford immediately before Cambridge, Brighton last).

**I finally know how to answer one of the open Questions.**
→ `data/questions-content.ts` → find the entry by its `id`, fill in `paragraphs` with an array of paragraph strings.

**I want to reorder the site's pages.**
→ `data/navigation.ts` → reorder the `navigation` array. Nothing else needs to change — the navbar, Home's Contents list, and Home's Wayfinder rail all update automatically.

**I want to update what I'm currently reading/doing/exploring.**
→ `app/now/now-content.ts` → the `becoming`, `work`, and `exploring` sections. **Always update `close.date` in the same change** — it's hand-set on purpose (the file's own comment explains: an automatic date would silently refresh even when nothing on the page actually changed, which this page can't afford to do).

---

## 6. Known loose ends in the code right now

These aren't things to fix immediately, but they're worth knowing about since this document is meant to be the full picture.

**Files confirmed unused, safe to delete whenever you like:**
`components/contact/Horizon.tsx`, `lib/heroRhythm.ts`, `components/global/Footer.tsx`, `components/ui/StatusChip.tsx`, `components/index.ts`, and the empty `components/experience/` folder. Full detail and the exact `git rm` commands are in this project's `dead-code-cleanup.md` review doc (or ask Claude — this was already investigated in detail).

**A live checklist inside `app/now/now-content.ts` itself.** The top of that file has a block literally titled "REPLACE BEFORE DEPLOY," listing four things that are currently placeholders dressed as real content:
1. `answering.questions` — must be actual messages people have sent you, not invented examples.
2. `answering.pile` — must be genuinely unfinished writing of yours, each fragment ending where you actually stopped writing it.
3. Any `becoming` item with `src: null` — deliberately renders as an honest empty photo slot rather than a filled placeholder; needs a real photograph, not a generated one.
4. `work.making[].state` — a "what state is this in" label for things you're building; worth double-checking it's still accurate.

Worth reviewing this list yourself next time you're in that file — it's your own note to yourself, left in the code.

**The Contact page's meta description.** Every other page now has its own unique one-line description (shown in browser tabs and search results); Contact still uses the old generic site-wide one. This was flagged and deliberately left alone in an earlier review — not urgent, easy to revisit later if you want it fixed.

---

## 7. Never touch this — and why

| File / folder | Why it's off-limits |
|---|---|
| `app/layout.tsx` | Wires up fonts, theme, and site-wide motion settings. A small mistake here can break every page at once. |
| `app/globals.css` | Colour and font definitions for the whole site. |
| `tailwind.config.js` | The design system — spacing, colour tokens, font families. |
| `next.config.ts`, `tsconfig.json`, `package.json`, `eslint.config.mjs` | Build tooling. These don't hold any of your words. |
| Anything in `components/` | This is *how* things are displayed — animations, layout, spacing logic (see §4 for what each one does, for reference only). The content that flows into these components lives in `data/` or `*-content.ts` files instead; that's the file you want. |
| `lib/`, `hooks/`, `types/` | Shared code plumbing used across multiple pages. |
| `node_modules/`, `.next/` | Auto-generated. Never edit; safe to ignore entirely. |

If you're ever unsure whether a file is safe to touch, the fastest check: is it inside `data/`, or does its name end in `-content.ts`? If yes, it's almost certainly fine. If it ends in `.tsx` and lives in `components/` or is one of the structural `app/*/page.tsx` files (not the `-content.ts` ones), leave it for Claude or a developer.

---

## 8. How to actually make a change and get it live

1. Open the relevant file in a code editor (VS Code is the standard free option, if you don't already have one).
2. Find the text you want to change, edit it between the quote marks, and save the file.
3. Open a terminal in your project folder and run:
   ```
   git add -A
   git commit -m "Describe what you changed, e.g. 'update job title on About'"
   git push
   ```
4. Vercel will pick up the push automatically and redeploy. Give it a minute or two, then check the live site.

Optional but recommended before pushing: run `npm run dev` in the terminal and open `http://localhost:3000` to preview your change locally first, so you catch anything obviously broken before it goes live.

---

## 9. If something breaks

Because this is a Git repository, nothing is ever really lost. Every change you've committed is saved in the project's history.

- To see what changed recently: `git log --oneline`
- To undo an uncommitted edit you haven't pushed yet: `git checkout -- <filename>`
- To go back to how a file looked in a previous commit: `git checkout <commit-id> -- <filename>`

If you're not comfortable with any of that, the safest option is always to describe the problem to Claude in a new session and ask it to look at the live site and the repository directly — the code itself is the source of truth, so a new session can always re-establish what's going on even with no memory of this conversation.

---

## 10. Quick file reference

| Page | Content file |
|---|---|
| Home | `data/homeContent.ts` |
| About | `data/profileContent.ts` |
| Journey | `data/journeyData.ts` |
| Experience | `app/experience/experience-content.ts` |
| Media | `data/mediaData.ts` |
| Now | `app/now/now-content.ts` |
| Projects | `data/projectsChapter.ts` |
| Questions | `data/questions-content.ts` |
| Contact | `data/contactData.ts` |
| Site-wide nav order | `data/navigation.ts` |
| CV | `public/documents/Sahil_Kumar_CV.pdf` (replace the file directly) |

---

*Written 12 August 2026, checked directly against the actual codebase at that date — every file description above was read from the real source, not assumed. If the folder structure changes significantly in the future, ask Claude to re-generate this document against the current code.*
