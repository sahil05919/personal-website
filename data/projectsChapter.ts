/**
 * Chapter — Projects.
 *
 * NOT the old `featuredProjects` model. That shape (category, techStack,
 * objectives[], approachSteps[], results[], lessonsLearned[]) described six
 * projects through an identical set of fields, which is why the page read as
 * six instances of one template. Renaming the fields would not have fixed it;
 * the fields were the problem.
 *
 * This file holds prose. Each entry is a piece of writing with its own shape.
 * There is deliberately no `outcome`, `impact`, `lesson` or `techStack` field —
 * anything that mattered is in the sentences.
 *
 * `data/projectsData.ts` and `types/project.ts` are gone (August 2026). Both
 * were confirmed unused — no page imported `featuredProjects` — so this is a
 * correction of a stale comment, not a migration that still needs doing.
 */

/* ─────────────────────────────────────────────────────────────────────────
 * Rhythm
 *
 * These controls exist so each essay can hold its own shape. They are
 * deliberately few. Every additional knob is another way for the page to
 * become a system that announces itself.
 *
 * Not offered, on purpose: per-entry title size (titles are the page's fixed
 * landmarks and stay constant — length does the ranking on its own),
 * per-entry colour, per-entry typeface.
 * ───────────────────────────────────────────────────────────────────────── */

/** Column width for prose.
 *  · reading — 64ch, the default.
 *  · narrow  — 46ch. Used once, for the interstitial: a short piece set in a
 *              wide column reads as truncated; the same piece in a narrow
 *              column reads as intentionally small. */
export type EntryMeasure = "reading" | "narrow";

/** Space before the entry — the seam the reader crosses to reach it. */
export type EntrySeam = "normal" | "wide";

export interface EntryRhythm {
  measure: EntryMeasure;
  seam: EntrySeam;
  /** Centre the whole entry. Used once. */
  centered?: boolean;
  /** Set the opening paragraph as a standfirst — Fraunces, larger, above the
   *  body. Three of these essays open on a line that carries the whole piece;
   *  at body size it is indistinguishable from the sentence after it. Omit
   *  where the opening is ordinary, or the reader stops trusting the signal. */
  lede?: boolean;
  /** Zero-based paragraph indices set as display pull-quotes: Fraunces,
   *  centred, breaking wider than the prose measure, with large air either
   *  side. Reserved for lines already doing the work of a section break in
   *  the prose — three across the whole chapter. */
  isolate?: number[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  /** · plate — full bleed, edge to edge. Entirely dependent on being rare.
   *  · inset — sits inside the prose measure at `widthPercent`. */
  treatment: "plate" | "inset";
  widthPercent?: number;
  aspectRatio: string;
  caption?: string;
  /** A phone screenshot: rounded like the device, with a soft shadow. */
  device?: boolean;
}

/** A small table set as HTML rather than dropped in as a screenshot.
 *  Screenshotting it from the submitted PDF would import Word's typography
 *  into a page set in Fraunces and Newsreader. */
export interface ProjectTable {
  columns: string[];
  rows: string[][];
  /** Rendered in ink rather than graphite — weight only. No fill, no accent:
   *  the row is the chapter's climax and colour would demote it to a
   *  callout. */
  emphasisRow?: number;
  note?: string;
  /** Table only, no chart above it. The chart is Equinor's reported-versus-
   *  reconstructed plot and means nothing for any other table. */
  plain?: boolean;
  /** Accessible name for the scrolling wrapper. Defaults to the Equinor one. */
  ariaLabel?: string;
}

/** A file the reader can take away — the work itself, not a picture of it.
 *  Set under the attribution as apparatus, never above the prose. */
export interface ProjectDownload {
  href: string;
  label: string;
  /** A live page rather than a file: opens in a new tab, no `download`. */
  external?: boolean;
}

/**
 * A short, real fragment of evidence-of-thinking, promoted out of the body
 * prose and set in cobalt.
 *
 * This is the Projects equivalent of Journey's `MarkMoment` — same colour
 * token, deliberately different job. Journey uses cobalt for an emotional
 * turn; here it marks a moment of analytical reasoning already sitting in
 * the essay (a reframed question, a stated reason) so a fast reader meets it
 * without reading the whole piece. The lines are always lifted verbatim from
 * the entry's own prose, never written new for this purpose — see each
 * entry below for exactly which sentence moved and why.
 */
export interface EvidenceMark {
  /** Zero-based index into `body`, AFTER extraction — i.e. the array as it
   *  reads once the marked line(s) have already been removed from it. */
  insertAfter: number;
  lines: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  body: string[];
  /** Foot-of-entry attribution, not a header. Metadata above the prose would
   *  frame each essay as an instance of a category and blunt the openings,
   *  which were written to be unalike.
   *
   *  Descriptive, not categorical. That "Built for myself" recurs on two of
   *  five entries is the honest signal, and a better one than a tag. */
  attribution: string;
  rhythm: EntryRhythm;
  image?: ProjectImage;
  table?: ProjectTable;
  /** Zero-based paragraph index after which the figure is inserted. */
  mediaAfterParagraph?: number;
  evidenceMark?: EvidenceMark;
  download?: ProjectDownload;
  /** A drawn specimen of the work, with invented figures, in place of a
   *  screenshot that would publish private data. See
   *  components/projects/ProjectSpecimen.tsx. */
  specimen?: "uk-money" | "india-money";
}

/**
 * ORDER IS LOAD-BEARING.
 *   1. "The other door" opens (October 2026) — Sahil's call: his own people-
 *      analytics project, and the direction the work is going, so it leads
 *      the chapter rather than waiting behind five older pieces. Its first
 *      line is about recruitment, which is where /experience leaves off.
 *   1a. "Ten one-day absences" sits straight after it (October 2026) — the
 *      second people-analytics piece, kept beside the first so the two read
 *      as a pair rather than being split by the older work.
 *   1b. "The shape of leaving" is third (October 2026) — the third
 *      people-analytics piece, and the one that answers the doubt "The other
 *      door" ends on, so it follows the pair rather than joining it late.
 *   2. "A place to stand" follows — smallest stake, plainest language, and
 *      the second project nobody assigned.
 *   2a. Three tools built for himself follow it (October 2026): "What I can
 *      actually reach" (its sequel — the same Indian money, asked by time),
 *      "About this much a day" (London money) and "It didn't feel like home"
 *      (the Today app). Together they are the clearest evidence on the site
 *      of the thing he says he does: the simpler thing, tailored to one
 *      person, private, opened anywhere from a link.
 *   3. "The year that did both jobs" closes — most recent, entirely
 *      individual, ends unresolved, hands off cleanly to /now.
 *   4. "Understanding behaviour through data" sits immediately before Equinor.
 *      Its closing question is the question Equinor asks of a company's
 *      published accounts. Same dependency as Oxford→Cambridge on /media.
 */
export const projectEntries: ProjectEntry[] = [
  {
    id: "other-door",
    title: "The other door",
    attribution:
      "Built for myself, on the Huebner & Patalano HR dataset, 2026.",
    // Opens cold on recruitment, the way Equinor opens cold on its own
    // number. No pull-quote: the chapter's three are spent (USS ×2, Equinor)
    // and a fourth would make them a device. The evidence mark carries the
    // finding instead.
    rhythm: { measure: "reading", seam: "normal", lede: true },
    body: [
      "Every number I watched in recruitment stopped on the day someone joined.",
      "Funnel stages, time-to-hire, how close we were to filling a role. I studied HR, I worked in it for three years, and I loved it — but the part of it I knew best was the way in. This project was the first time I looked properly at the way out.",
      // Fictional company: the Huebner & Patalano set is a teaching dataset.
      // 311 rows, 104 with a termination date.
      "The dataset is a public one, made for teaching: a little over three hundred employees of a company that doesn't exist, with when they were hired, when they left if they did, why, which department, who managed them and where they were recruited from. A hundred and four of them had gone.",
      "I built it in Power BI as four pages, each answering one question — what the workforce looks like, where attrition is happening, what stands out on pay, and where to look more closely. What I wanted out of it was simpler than any of those. I wanted a description of the people who leave.",
      // Production: 83 of 104 leavers. TermReason: another position 20,
      // unhappy 14, more money 11.
      "The profile came out more specific than I expected. Most of the leavers were in Production — eighty-three of the hundred and four. The commonest reason given was another job, then being unhappy, then money. And the sharpest pattern was in where they had come from.",
      "That one stayed with me. Where to look for candidates is a choice a recruiter makes every week, and sourcing was a large part of my job. Here was the same choice, seen from the other end.",
      // Risk Score Base > 0 on 40 of 207 current employees.
      "The last page is a watchlist: current employees, scored on the things that went with leaving — a short time in the job, and having come in through Google Search. Forty people score above zero.",
      // Leavers' tenure at exit: 61 of 104 had three years or more.
      "I'm less sure of that page than of the others. Length of service is measured at the exit for the people who left and at the end of the data for those who stayed, so the newest starters look riskier partly by construction. And most of the people who actually left had been there three years or more. The score points at the first year; the leavers mostly didn't go then.",
      "So the watchlist is a place to start looking, not a verdict. A list of names is the easiest thing in a dashboard to act on, and the one that most needs a caveat underneath it.",
      "It's the project I'm happiest with. It's the first one that is entirely about people, which is where I want my work to be, and I learned a great deal building it — most of all from the one page I trust least.",
    ],
    // Lifted from the end of paragraph 4, where it followed "where they had
    // come from". The finding itself, so a fast reader meets it without the
    // table.
    evidenceMark: {
      insertAfter: 4,
      lines: [
        "Of the forty-nine people hired through Google Search, thirty left.",
        "Of the thirty-one who came through an employee referral, five did.",
      ],
    },
    mediaAfterParagraph: 5,
    // Recomputed from the .pbix's own model, not typed from memory. Sources
    // with fewer than ten hires (Other: 2, On-line Web application: 1) left
    // out — a 100% rate on one person is not a row worth reading.
    table: {
      columns: ["Recruitment source", "Hired", "Left", "Left %"],
      rows: [
        ["Google Search", "49", "30", "61%"],
        ["Diversity Job Fair", "29", "16", "55%"],
        ["CareerBuilder", "23", "11", "48%"],
        ["Indeed", "87", "21", "24%"],
        ["LinkedIn", "76", "18", "24%"],
        ["Employee Referral", "31", "5", "16%"],
        ["Website", "13", "1", "8%"],
      ],
      emphasisRow: 0,
      note: "Fictional company, hires 2006–2018. Left % is leavers ÷ everyone hired through that source over the whole period — not an annual rate. Sources with fewer than ten hires not shown.",
      plain: true,
      ariaLabel: "Attrition by recruitment source, scrolls sideways on small screens",
    },
    download: {
      href: "/files/HR_People_Analytics_Dashboard.pbix",
      label: "Download the dashboard · Power BI .pbix · 280 KB",
    },
  },

  {
    id: "ten-one-day-absences",
    title: "Ten one-day absences",
    attribution:
      "Built for myself, on the UCI Absenteeism at Work dataset, 2026.",
    // Written from Sahil's own words in the build session (October 2026) —
    // the Bradford Factor not landing at first, checking it by hand, walking
    // back into the sum-vs-average trap, and deciding to stop. Every number
    // is read from the .pbix; nothing here is something he didn't find.
    rhythm: { measure: "reading", seam: "normal" },
    body: [
      "The second dashboard was supposed to be revision.",
      "After the attrition project I wanted to do the same things again — clean the data, write the measures, decide what was fair to use — on a question I hadn't asked yet. Absence was the obvious one. The dataset is public: 740 absence records from a courier company in Brazil, July 2007 to July 2010, for thirty-six employees. Each row is one absence: who, when, why, and for how many hours.",
      "The first answers came quickly. About five thousand hours lost, roughly six hundred and forty working days. March and July were the worst months. Monday carried nearly a third of the hours, and the week got lighter towards Friday. Two reasons — musculoskeletal conditions and injury — made up about a third of everything, in a business where people lift and drive all day. And seven of the thirty-six people accounted for more than half of the hours.",
      "The new thing was the Bradford Factor, and it didn't make sense to me the first time it was explained. It took a plain comparison before it landed.",
      "B = S² × D. Spells squared, times days.",
      "A long absence — an operation, maternity leave — is something a manager can plan cover for. Ten mornings of someone not turning up is not. The squaring is the whole idea: how often counts for far more than how long.",
      "I worked it through by hand before I trusted the measure. Employee 3 had 113 separate absences and about sixty days off: 113 × 113 × 60.25, roughly 769,000. Employee 1 had 23 absences and about fifteen days: around 8,000. The calculator and the dashboard disagreed in the decimals, which turned out to be rounding on the card. The gap between the two people didn't move.",
      "The dataset also records whether people drink or smoke, and their BMI. My first chart said drinkers lost far more hours than non-drinkers — because I was adding hours up, and there were simply more drinkers. It was the same trap I had caught on the pay-gap work, and I walked straight back into it. Per person, drinkers still averaged more, smokers averaged less than non-smokers, and BMI turned out to be one or two people per value. None of it made sense as a finding, and on thirty-six people it shouldn't be treated as one. Those charts sit on a page marked exploration only.",
      "I stopped there. Thirty-six people is a small room, and past a certain point I would only have been practising the buttons. My job in a dashboard like this is to say what is happening, not to decide what to do about it. Here that means four names worth a conversation with their managers, and one measure I now understand.",
    ],
    // The comparison that finally made the measure make sense, promoted out
    // of the space between paragraphs 4 and 5 rather than written new.
    evidenceMark: {
      insertAfter: 4,
      lines: [
        "Ten one-day absences score far higher than one ten-day absence.",
      ],
    },
    mediaAfterParagraph: 6,
    // Read from the .pbix's Bradford Factor measure. Employee 1 is included
    // only for scale — the hand-worked comparison in paragraph 6.
    table: {
      columns: ["Employee", "Bradford score"],
      rows: [
        ["3", "769,332"],
        ["28", "250,534"],
        ["34", "130,075"],
        ["11", "90,000"],
        ["1", "8,001"],
      ],
      emphasisRow: 0,
      note: "Score = spells² × days, where days = hours ÷ 8. Calculated over the whole period rather than the usual rolling 52 weeks, because the data has no year field. Employee 1 shown for scale.",
      plain: true,
      ariaLabel: "Highest Bradford Factor scores by employee, scrolls sideways on small screens",
    },
    download: {
      href: "/files/Absence_at_Work_Dashboard.pbix",
      label: "Download the dashboard · Power BI .pbix · 65 KB",
    },
  },

  {
    id: "shape-of-leaving",
    title: "The shape of leaving",
    attribution:
      "Built for myself, on the Employee/HR Dataset (All In One) from Kaggle, 2026.",
    // Written October 2026 from Sahil's own account of why this one matters
    // (understanding how a workforce holds together; the when / where /
    // not-why / data-quality shape of the questions) and from the build
    // sessions. Every figure is computed from employee_data.csv. It opens on
    // the doubt "The other door" ends with, because this dataset settles it.
    rhythm: { measure: "reading", seam: "normal", lede: true },
    body: [
      "The first project ended on a doubt. The watchlist pointed at the first year, and most of the people who had actually left hadn't gone then.",
      "I wanted to settle it on something bigger. The third dataset was three thousand employees of another company that doesn't exist, each with a start date and an exit date, and twenty-six columns of everything else. This time I wanted to ask the questions in the order they deserve: whether the data can be trusted, then when people leave, then where, then why.",
      "This is the part of HR I like most, and it took me a while to say why. When I worked in it I knew people one at a time — who had joined, who was struggling, who had a question that morning. What I never saw from inside was how the whole thing holds together: whether leaving has a shape, or is just a long run of separate decisions.",
      "The data couldn't be trusted at first. 1,533 people had an exit date; only 387 were marked as terminated, and some still listed as active had, by the other column, left a while ago. Neither field was obviously wrong. They disagreed, and every number after that depended on which one I believed. I went with the exit date and wrote down why. The supervisor column went entirely: it named almost as many supervisors as there were employees.",
      "Where came next. I cut attrition by department, division, job function and state, and the first things that stood out were a handful of titles sitting at exactly a hundred per cent.",
      "So nothing under thirty people gets a rate. With that floor in place, what remained was smaller and more honest: clerks at 65 per cent, administrative roles at 61, and most of the rest within a few points of the average.",
      "When was the question that answered. Seven hundred and twenty-five of the 1,533 leavers went before their first anniversary. Then 412, then 241, then 155. Each year someone stayed, fewer of them walked. This time the first year held.",
      "I checked whether that was new — whether recent hires were leaving faster than earlier ones — by grouping everyone by the year they joined. Every cohort from 2018 to 2023 still had between 45 and 51 per cent of its people. Flat. Whatever happens in the first year had been happening the whole time.",
      "Why is the part I'm proudest of, because the answer is no. Performance score, rating, pay zone, gender, contract type: every one within a few points of fifty-one per cent. High performers didn't leave more. Better-paid zones didn't stay longer. It would have been easy to keep cutting until something moved. I wrote down that nothing did.",
      "The data is synthetic, which is probably why so little moves, and there is no company here to lose anyone in its first year. What I kept was the order. What the columns mean, which rates the sample can bear, then when and where, and an honest line where the why should be. It is the order I would want if the people were real. In HR they always were.",
    ],
    // Lifted out of the "where" paragraph, where it was the reason for the
    // thirty-person floor that follows — the judgement call, not its result.
    evidenceMark: {
      insertAfter: 4,
      lines: [
        "Every one of them was a group of one or two people. A one-person team that loses its one person has an attrition rate of a hundred per cent. That isn't a finding.",
      ],
    },
    mediaAfterParagraph: 6,
    // Computed from employee_data.csv: a leaver is anyone with an ExitDate,
    // tenure at exit = ExitDate − StartDate. Shares sum to 100%.
    table: {
      columns: ["Tenure at exit", "Leavers", "Share"],
      rows: [
        ["Under 1 year", "725", "47%"],
        ["1–2 years", "412", "27%"],
        ["2–3 years", "241", "16%"],
        ["3–5 years", "155", "10%"],
      ],
      emphasisRow: 0,
      note: "Leavers only, n = 1,533, out of 3,000 employees. Fictional company; synthetic data. Groups under thirty people are left out of every rate in the dashboard.",
      plain: true,
      ariaLabel: "Leavers by tenure at exit, scrolls sideways on small screens",
    },
    download: {
      href: "/files/Workforce_Analytics_Dashboard.pbix",
      label: "Download the dashboard · Power BI .pbix · 425 KB",
    },
  },

  {
    id: "place-to-stand",
    title: "A place to stand",
    // TODO(sahil): confirm the years. `projectsData.ts` carries year: "2026",
    // status: "Ongoing" — that reads as "last touched", not "started". The
    // open end matters: the final paragraph depends on it still running.
    attribution: "Built for myself, 2026–present.",
    // Duration shape: no event, no arc. Nothing isolated — the essay is about
    // something that thickened slowly and is still going, and the setting
    // should not manufacture a turn the prose declines to have.
    rhythm: { measure: "reading", seam: "normal", lede: true },
    body: [
      "Every Sunday I opened six or seven spreadsheets. Investments in one, SIPs in another, insurance in a third, cash balances somewhere else, and a running list of things I'd committed to paying for later. None of it was difficult. It took about an hour, and at the end of the hour I could usually answer the question I'd started with, which was: where do I stand?",
      "The strange part was that I had all the information already. Every number I needed existed, in a file I had made, and I still had to spend an hour assembling it into an answer.",
      "The first version was just a better spreadsheet, and for a while that was enough. What changed wasn't that it broke. It was that I kept wanting different views of the same information — by month, by category, by what was already committed — and every one of those meant going back and altering the file where everything was recorded.",
      "So I split it in two. The sheets stayed where they were, as the place I actually update things: a new policy, a changed balance, a payment I'd committed to. Everything else moved into Power BI, which only reads. That way I could change how something was calculated without touching where it was recorded, and change what I recorded without breaking the calculations.",
      "It sounds like a technical decision. It wasn't, particularly.",
      "What I got back was the hour, but that isn't quite the point either. What I got was a place to stand — one view, current, that answers the question without being asked twice. Assets, what I owe, what's committed, what's actually mine.",
      "It's still running. I still change it, usually when something in my life changes first: a new commitment, a different currency, a category that stopped making sense. It has never been finished, and I've stopped expecting it to be.",
    ],
    // The sentence that used to close this paragraph — "I made it because I
    // was tired of editing one file to answer a different question." — is
    // the real reason for the architecture two paragraphs up. Promoted to an
    // evidence mark rather than left as the tail end of a shorter paragraph,
    // so a fast reader meets the actual decision before the payoff line.
    evidenceMark: {
      insertAfter: 4,
      lines: [
        "I made it because I was tired of editing one file to answer a different question.",
      ],
    },
    // TODO(sahil): no crop supplied. When one exists, set treatment: "plate".
    // The strongest image is NOT a net-worth chart — it's the panel that
    // answers the Sunday question. Leave `image` undefined until a real file
    // exists; a placeholder path ships a 404. Once it exists, this is also
    // the point to reconsider whether it can move earlier than paragraph 5
    // for scan speed.
    mediaAfterParagraph: 5,
  },

  {
    id: "what-i-can-reach",
    title: "What I can actually reach",
    // October 2026. Written from Sahil's own account of why he built the
    // three personal tools (a simpler thing tailored to himself; privacy;
    // open it anywhere from a link, no sheet) and from the app itself —
    // every feature named here is on the live page. The figures in the
    // specimen are invented; his real ones are never published.
    attribution: "Built for myself, 2026. A web page that reads my own Google Sheet.",
    rhythm: { measure: "reading", seam: "normal", lede: true },
    body: [
      "A place to stand told me where I stood. This one tells me what I can actually reach.",
      "Most of what I own is in India: savings, mutual funds, fixed deposits, insurance policies, a gold bond, a pension account. Add it all together and you get one number. The trouble is that almost none of it moves at the same speed, so the total on its own doesn't answer much.",
      "What is in my account today. What I could have in one to three working days if I sold funds. What I could get by breaking a deposit early, for a small penalty. And what is locked until a date I can't move.",
      "Under the net worth there is one line: how much of it I could have in my account within three working days. That line does more work than the number above it.",
      "Then a small box that asks the question I'd actually ask on a bad day: if I need this much, where does it come from? Savings first, then funds, then a deposit. Sometimes the answer is one line — covered by savings alone — and nothing else needs to be touched.",
      "I didn't want my money in somebody else's app, and I didn't want to open a spreadsheet on my phone to find out. The records still live in a Google Sheet. The page only reads it, sits behind a link that opens for me alone, and looks the same on my laptop and my phone.",
      "Below that, the next twelve months — money coming in above the line, going out below — and the year each locked amount becomes usable. At the very bottom there is one honest note: what insurers promise to pay later isn't counted, because it only arrives if every future premium is paid.",
    ],
    // Lifted from the opening of paragraph 3, where it introduced the list.
    evidenceMark: {
      insertAfter: 1,
      lines: ["So this page doesn't start with the total. It starts with time."],
    },
    specimen: "india-money",
    mediaAfterParagraph: 4,
  },

  {
    id: "about-this-much-a-day",
    title: "About this much a day",
    attribution: "Built for myself, 2026. A web page that reads my own Google Sheet.",
    rhythm: { measure: "reading", seam: "normal", lede: true },
    body: [
      "In London the money question is smaller, and it comes round more often: how much can I spend today?",
      "My Indian money moves in years. My London money moves in weeks — rent, food, travel, a tiffin, the phone bill, and whatever else the month brings.",
      "I didn't need a budgeting app full of charts for things I don't buy. I needed one screen: what I've saved, what I've spent this month against what I said I would, and what's left.",
      "Then the line that does the work: how many days are left in the month, and roughly how much a day that leaves.",
      "Each category has its own budget and its own bar, so I can see which one is running ahead without doing the sums. Money a friend owes me sits in its own box until it comes back, so I don't have to remember it.",
      "Like the India page, it reads a Google Sheet I already keep. I add a line when I spend and the page does the rest. No bank login, nothing to install — just a link that opens on whatever is in my hand.",
      "Every month gets a bar of its own: blue if I stayed inside the budget, red if I didn't. That's the whole verdict.",
    ],
    // Lifted from the end of paragraph 4.
    evidenceMark: {
      insertAfter: 3,
      lines: ["Not a warning, not a score — just a number small enough to act on."],
    },
    specimen: "uk-money",
    mediaAfterParagraph: 4,
  },

  {
    id: "feel-like-home",
    title: "It didn't feel like home",
    // "Doesn't feel like home" is Sahil's own phrase for the first native
    // build. Features named are in the app's README and the screenshot is a
    // fresh install (no personal data), captured October 2026.
    attribution: "Built for myself, 2026. A web app and an Android app from the same code.",
    rhythm: { measure: "reading", seam: "normal", lede: true },
    body: [
      "The first version worked. It just didn't feel like home.",
      "For a long time my days lived in Google Keep: a card for each part of life — Power BI, meditation, job applications, English reading, walking — and inside each one, sessions. Power BI session 13. Meditation session 7. Counting them was the point.",
      "Keep could hold the list, but it couldn't plan a day. So I started building something that could, with two rules from the start: it costs nothing, and my data stays on my phone. No account, no server holding my life, no subscription.",
      "The version that finally felt like home is almost embarrassingly simple. One box at the bottom: type or say anything, in English, Hinglish or Hindi, and it gets filed. “Kal shaam 6 baje dentist” becomes a fixed event tomorrow at six, and the sessions that were sitting there move around it.",
      "It knows the shape of my weekdays — work until five, tea and food, a walk in the evening — and fits each week's sessions into the gaps. When something has to move, it says so in one line. It checks in at the moments I'd forget: wrap up work, sort the email, did you do today's sessions?",
      "What I didn't want was an assistant that does the work for me.",
      "It even limits how many days off I can take in a week — two — so I can't take advantage of it.",
      "It runs on the web and on my Android phone from the same code. Open the link below and it starts with my defaults, but whatever you add stays in your browser, not with me.",
    ],
    evidenceMark: {
      insertAfter: 5,
      lines: ["I wanted something that sorts, reminds and nudges — and then leaves the doing to me."],
    },
    image: {
      src: "/images/projects/today-app.webp",
      alt: "Today on a phone: the next session with Start, Done and Snooze, the day as a timeline, and a Hinglish note being read as a fixed event tomorrow at six.",
      treatment: "inset",
      widthPercent: 28,
      device: true,
      aspectRatio: "390 / 844",
      caption: "Typed in Hinglish. It read a fixed event for tomorrow at six and moved the sessions around it.",
    },
    mediaAfterParagraph: 3,
    download: {
      href: "https://today-app-pi.vercel.app",
      label: "Open Today →",
      external: true,
    },
  },

  {
    id: "wrong-first-question",
    title: "The wrong first question",
    attribution:
      "Group project with USS, MSc Business Analytics, Bayes Business School, 2025.",
    // Encounter shape: moves toward a moment. The two indices below already
    // function as section breaks in the prose; set as pull-quotes, the page
    // agrees rather than argues. A third line \u2014 the reversal itself \u2014 is
    // promoted separately below as an evidence mark, not a pull-quote: see
    // the note on `evidenceMark`.
    rhythm: {
      measure: "reading",
      seam: "normal",
      lede: true,
      isolate: [5, 7],
    },
    body: [
      "Someone has paid into a pension for fifteen years. Money leaves their salary every month, statements arrive once a year, and if you asked them what they'll actually have at retirement, most would say they don't really know. Not because they haven't tried. Because to answer it, they'd first have to learn what defined benefit means, and how it differs from defined contribution, and what a risk profile is, and what any of that has to do with them.",
      "The brief was about a pension concept. What we kept finding, the further into the research we went, was that the difficulty wasn't the pension. Every number a member needed already existed. It was arriving in a form that required them to become fluent in someone else's vocabulary before they could ask their own question.",
      // The two questions below are representative of the principle, not
      // literal prototype copy \u2014 the exact wording isn't remembered.
      "The first thing a member saw wasn't contribution rates or investment options. It was a question about them. Not what the scheme offers, but what they wanted: when they hoped to stop, what they hoped to be living on. Then the pension arrived as an answer \u2014 this is what that would take, this is where you currently are, this is what changes if you adjust the amount going in. Same information. It just stopped being a document to decode and became a response to something they'd asked.",
      "That reversal was the project. The dashboard came afterwards, and so did everything else \u2014 the scenarios, the visualisations, the real-time feedback when someone moved a number. Those were the consequences of the decision, not the decision.",
      // The chapter's only group-work clause. One sentence, once.
      "I built the prototype and wrote the code, shaped how it moved, and put together what we presented. It was a group project and the research behind it was everyone's, but this part was mine to get wrong.",
      "At the end we presented to the USS team.",
      // Dialled to what is actually known. Not "USS is implementing this."
      "What I remember isn't the grade. It's the twenty minutes afterwards, when they stopped responding to the presentation and started talking about their own members \u2014 which questions come up, what people ask when they call, where the explanations tend to fail. They said they'd been thinking about some of this internally and would look at how the approach might inform their work on member engagement.",
      // "Somewhere in the middle of it" is load-bearing: it places the moment
      // inside a longer conversation rather than as its climax.
      "Somewhere in the middle of it, one of them asked whose idea the member-first approach had been. Before I could say anything, my professor said, \u201cSahil.\u201d",
      "I don't know what came of the rest of it. Possibly nothing; these things move slowly and I'm not in the room any more.",
    ],
    // "So we turned it round..." used to open its own paragraph right after
    // the brief's difficulty is stated. It's the actual insight the rest of
    // the essay works out the consequences of \u2014 moved out of the body and
    // into an evidence mark so a fast reader meets it second in the essay,
    // rather than waiting for the pull-quotes further down.
    evidenceMark: {
      insertAfter: 1,
      lines: [
        "So we turned it round.",
        "Not \u201chere is your scheme, now learn to read it,\u201d but: what are you trying to do?",
      ],
    },
    // Real crop, supplied by Sahil (August 2026): the prototype's own
    // goal-setting screen, not a results chart, cropped down to exactly
    // that — both scenarios' Goal / Lower Bound / Upper Bound controls,
    // nothing from the collapsible detail sections or the chart underneath.
    // Full-bleed, as originally planned: the panel's own blue reads as
    // quoted material against the page's paper/ink/cobalt, the way a
    // photograph inserted into a printed essay looks different from the
    // typesetting around it on purpose.
    image: {
      src: "/images/projects/uss-goal-setting.webp",
      alt: "The USS prototype's Scenario 1 and Scenario 2 panels: a Goal selector and Lower Bound / Upper Bound sliders next to a plain-language readout of what the DC pot would need to reach the goal.",
      treatment: "plate",
      aspectRatio: "1294 / 337",
      caption:
        "The prototype's goal-setting screen, mid-session. Two scenarios, side by side.",
    },
    mediaAfterParagraph: 2,
  },

  {
    id: "looking-properly",
    title: "Looking properly",
    // TODO(sahil): 2024 is inferred, not confirmed.
    attribution: "Built for myself, 2024.",
    // Inventory shape: a list of questions that never resolves. No lede — the
    // opening is ordinary on purpose, and enlarging it would claim a weight
    // the sentence doesn't have. The lightest passage on the page.
    rhythm: { measure: "reading", seam: "normal" },
    body: [
      "Netflix had become the thing that was on most evenings, and I realised I had no idea what was in it. Not what to watch \u2014 that gets decided for you. What was actually there. How much of it, from where, made when.",
      // TODO(sahil): "about eight thousand rows" and the field list describe
      // the standard Kaggle Netflix Titles dataset. Correct if a different
      // version was used — it's the only factual claim in the piece.
      "So I downloaded the catalogue. It's a public dataset on Kaggle: every title, with its country, its type, its release year, its rating, its cast and director, its duration. About eight thousand rows of something I'd been using for years without ever seeing whole.",
      "There was no question I was trying to answer. There were just questions. Which countries produce the most of it. Whether it's mostly films or mostly series, and whether that's changed. Which directors turn up again and again. How long a typical title runs. Which genres actually dominate, as opposed to which ones feel like they do.",
      "I built it in Power BI, and building it was the point. Each view answered something and immediately suggested the next thing to look at \u2014 the country breakdown made me want it by year, the year view made me want it split by type. The dashboard wasn't where the exploring ended up. It was how the exploring happened.",
      "There was no finding, no recommendation, nobody to show it to. I understood Netflix a bit better afterwards, and I'd got quicker at building things while I was at it.",
      "It's the only thing I've built that had no purpose beyond wanting to know. I'd assumed until then that analysis was something you did to a problem. This one was closer to reading \u2014 going somewhere because you're curious what's there.",
    ],
    // No figure, deliberately. Nothing came of it; by this point the reader
    // has learned that plates mean something, so the absence registers.
  },

  {
    id: "understanding-behaviour",
    title: "Understanding behaviour through data",
    attribution: "MSc Business Analytics, Bayes Business School, 2025.",
    // Interstitial. Narrow, centred, wide seam — the only entry set this way.
    // Two paragraphs in a 64ch column read as an essay that got cut; the same
    // two in a 46ch centred column with real air read as a caesura between
    // Netflix and Equinor, which is the actual function.
    rhythm: { measure: "narrow", seam: "wide", centered: true },
    // Sahil's own final wording, verbatim. Two edits were proposed and never
    // taken up; left as written rather than applied unilaterally.
    body: [
      "Six weeks, and for the first time nobody handed me the problem. We chose the dataset, framed the questions, built the analysis, and presented the findings.",
      "I picked a dating app dataset over a conventional business dataset because it felt more interesting to explore. The dataset was synthetic \u2014 fifty thousand generated users \u2014 which turned out to be the most valuable lesson. It taught me to question whether an analytical pattern reflects reality or simply the assumptions built into the data. That question has stayed with me far longer than the project itself.",
    ],
    // No figure: no artefact survives. The Bayes account is closed, so the
    // Tableau workbook and deck are gone.
  },

  {
    id: "did-both-jobs",
    title: "The year that did both jobs",
    attribution:
      "Applied Research Project, MSc Business Analytics, Bayes Business School, 2025.",
    // Discrepancy shape. Opens cold on eight words — the only essay that
    // starts at its own ending. Paragraph 5 closes the argument and opens the
    // table; as a pull-quote directly above the figure it does both.
    //
    // seam: "wide" (August 2026 visual pass) — previously "normal". This is
    // the essay the whole order builds toward; the extra air on the way in
    // is a small, reversible presentational choice, not a change to the
    // order or the writing.
    rhythm: {
      measure: "reading",
      seam: "wide",
      lede: true,
      isolate: [5],
    },
    body: [
      "Equinor said 11.0. I got 12.5.",
      "I'd spent weeks building the number myself \u2014 pulling Scope 1 and Scope 2 figures out of nine years of annual reports, sustainability reports and remuneration reports, and reconstructing the totals from the components rather than taking the headline. For seven years the two versions sat within rounding distance of each other. Then 2024 came apart by 1.5 million tonnes.",
      "The project was supposed to answer something else. The question was whether climate governance actually worked \u2014 whether tying executive pay to emissions targets produced real reductions, or just better-looking disclosure. Equinor was a reasonable place to ask it: state-owned, unusually forthcoming, and the weighting of climate targets in executive pay had risen from nothing to about thirty per cent across the period. If incentives moved emissions anywhere, they should have moved them here.",
      "The statistics said yes, faintly. Higher weighting, larger reductions, a coefficient pointing the right way.",
      "Except the weighting only really moved once. Zero for five years, ten per cent for three, thirty per cent in a single year \u2014 2024. Eight observations, and the relationship rested almost entirely on the last of them.",
      "And 2024 was the year that didn't reconcile.",
      "I couldn't close the gap. There were plausible explanations \u2014 a boundary change, a methodology revision, something in how a particular year's production was counted \u2014 but plausible isn't the same as documented, and I couldn't point to the disclosure that accounted for it.",
      "So I left it in the table, in its own row, with the word Unreconciled written next to it.",
      "That was the part I thought about longest. A 1.5 million tonne gap in the final year of a nine-year reconstruction is not a small thing to publish underneath your own analysis. It says, in effect: here is my finding, and here is the year it depends on, and I cannot fully account for that year. Everything after it has to be written more carefully.",
      "Which is roughly what happened. The conclusions came out associational rather than causal \u2014 the relationship is there, pointing the right way, resting on too few years and one of them unexplained.",
      "I had expected to end with an answer about whether governance works. What I ended with was a smaller and more specific thing: an unexplained figure, and a decision about what to do with it. I'm still not sure what the 1.5 was. I'm fairly sure that leaving it visible was the right call.",
    ],
    mediaAfterParagraph: 5,
    table: {
      columns: ["Year", "Reported", "Reconstructed", "Residual", ""],
      rows: [
        ["2021", "12.1", "12.0", "−0.1", "Methodology updates"],
        ["2022", "11.4", "11.4", "0.0", "Portfolio-driven changes"],
        ["2023", "11.6", "11.5", "−0.1", "Small rise despite incentives"],
        ["2024", "11.0", "12.5", "+1.5", "Unreconciled"],
      ],
      emphasisRow: 3,
      note: "Scope 1 and 2, MtCO\u2082e. Residual is reconstructed minus reported. Four of nine years shown.",
    },
  },
];

/**
 * A record.
 *
 * Not "Archive" — that word belongs to the same 2023 vocabulary as "digital
 * garden" and will date at the same rate.
 *
 * Set as a book's index: title flush left, hairline leader, context and year
 * flush right. One line each, no descriptions. If an item needs a paragraph to
 * justify its presence, it wanted to be an essay and didn't make it.
 *
 * LINKS: the supplied LinkedIn URLs carried `?profileId=ACoAAC…&lipi=urn:li:…`
 * query strings. Those are session and click-tracking parameters tied to a
 * logged-in view — they are not part of the address, and publishing them
 * embeds tracking identifiers in the page permanently. Stripped to the bare
 * /overlay/Project/{id}/treasury/ path, which resolves on its own.
 *
 * CAVEAT worth knowing: these are LinkedIn profile overlays. They may require
 * a login to view, and they are exactly the platform dependency the panel
 * review flagged — if LinkedIn changes its URL scheme, every link here breaks
 * at once. Fine as an interim measure; the durable version is hosting the
 * artefacts on your own domain.
 *
 * DELIBERATE EXCLUSIONS — accuracy, not editorial preference. Links were
 * supplied for both and are not used:
 *   · Select Fashion — carries invented Year 1 projections (+12% digital
 *     sales, \u221215% markdowns, +22% CTR) for a company never worked with.
 *   · Green Commute Analytics — invented product, invented \u00a355K/SME saving.
 * In a one-line format there is no room to caveat, and a bare linked title
 * implies the work is stood behind.
 *
 * Network Analytics is listed here by default rather than by decision — it
 * was left pending when the chapter closed at five essays.
 *
 * TWO ADDED QUIETLY (August 2026) — HR Analytics Dashboard and the City
 * St George's reporting model. Both were real academic work, both used to
 * exist only in the now-deleted `projectsData.ts`, invisible on the live
 * site entirely. Title and year carry over from that file with reasonable
 * confidence; `context` is a reconstruction, not a confirmed module name —
 * flagged per item below. No outcome or description added for either: the
 * old file's language ("centralised", "improved visibility") was template
 * boilerplate, not something to reproduce here.
 *
 * ORDER (August 2026) — this list is NOT chronological and never was; it ran
 * in the order the LinkedIn links arrived. The two people/BI items now lead it
 * because they are the only entries in the chapter pointing at the direction
 * the work is actually going, and seventh of eight is where a reader stops.
 * The six strategy and ML pieces keep their relative order behind them.
 *
 * NO LONGER MISSING (October 2026): Sahil's own attrition project now exists
 * and is the first essay above, "The other door". The HR Analytics Dashboard
 * line below is the older coursework and a different piece of work — left
 * exactly as it was.
 */
export interface RecordItem {
  title: string;
  context: string;
  year: string;
  href?: string;
}

const LI = "https://www.linkedin.com/in/reach-sahil/overlay/Project";

export const projectRecord: RecordItem[] = [
  {
    title: "HR Analytics Dashboard",
    // TODO(sahil): context reconstructed from the old file's category field
    // ("Business Intelligence") — confirm the actual module name if there's
    // a more specific one.
    context: "Academic project",
    year: "2025",
    // No href supplied for this one — no LinkedIn overlay link exists.
  },
  {
    title: "Business Intelligence Reporting Model",
    // Context taken directly from the old subtitle ("developed for City
    // St George's"), so more reliable than the entry above.
    context: "City St George's, University of London",
    year: "2025",
  },
  {
    title: "Enhancing R&D Project Success through Network Analytics",
    context: "MSc Business Analytics",
    year: "2024",
    href: `${LI}/1183891163/treasury/`,
  },
  {
    title: "Insightful Analytics for Smarter Lending",
    context: "MSc Business Analytics",
    year: "2024",
    href: `${LI}/758471972/treasury/`,
  },
  {
    title: "Interactive Machine Learning App: Decision Tree vs Random Forest",
    context: "Machine Learning",
    year: "2025",
    href: `${LI}/237896321/treasury/`,
  },
  {
    title: "AI Strategy for Mercedes-Benz",
    context: "Strategic Business Analytics",
    year: "2025",
    href: `${LI}/238246643/treasury/`,
  },
  {
    title: "GoPro: Creating a New Market",
    context: "New Market Creation",
    year: "2025",
    href: `${LI}/152053906/treasury/`,
  },
  {
    title: "Lacoste in MENA: Strategic Trend Analysis",
    context: "Fashion Brand Management",
    year: "2025",
    href: `${LI}/151924291/treasury/`,
  },
];
