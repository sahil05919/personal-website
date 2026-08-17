// app/experience/experience-content.ts
//
// All Experience copy lives here. Nothing in this file touches layout — edit
// prose, add an entry, or attach the photograph and the page re-renders
// correctly.
//
// STRUCTURE. The page is ABA: a ledger plate, an undated prologue, a dated
// chronology, a coda that returns to the prologue. `prologue` is deliberately a
// separate export rather than `entries[0]`, so it can never be sorted, filtered
// or mapped alongside the chronology by accident.
//
// ORDER. `entries` is rendered in array order and is NOT sorted at runtime.
// Unitemps sits after St Luke's despite starting earlier, because Middlesex
// arrived through Unitemps and that dependency has to be readable.

export interface ExperienceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * One row of the opening ledger.
 *
 * EDITORIAL RULE, do not break it: at least half these figures must be
 * unflattering. Forty sarees opened for one sale is futility. Fifty to seventy
 * invoices is data entry. Thirty kilometres is a radius, not a result. That mix
 * is the only thing separating this plate from a KPI strip, and it is why the
 * two impressive figures in the middle land at all. If this section is ever
 * edited toward the flattering, it becomes LinkedIn.
 *
 * The rows are also in chronological order, so the plate gives the shape of the
 * working life as a side effect of giving it an identity.
 */
export interface LedgerRow {
  /** A string, not a number — "50–70" and "10,000" both have to work. */
  figure: string;
  /** One line. Must not wrap at 600px on desktop; cut rather than wrap. */
  gloss: string;
  /**
   * Rendered size in px. Set by hand and by narrative weight — NOT derived from
   * the magnitude of the figure. The varying sizes against a right-aligned
   * column are what produce the ragged left edge; equal sizes would be a table.
   */
  scale: number;
  scaleMobile: number;
}

export interface ExperienceEntry {
  /** Anchor id. Stable — these are linkable. Don't rename casually. */
  id: string;
  title: string;
  /**
   * Drives the entire layout branch. An editorial judgement made when the
   * entry was written — whether it documents the work or carries a genuine
   * observation. NEVER derive this from body.length.
   *
   *   "turn"  — apparatus stub, 620px measure, 28px heading
   *   "plain" — no stub, 520px measure, 22px heading, indented to the prose edge
   *
   * Two plain entries against nine turn entries is what gives the chapter its
   * texture. Making everything a turn would flatten the page back into a column.
   */
  tier: "turn" | "plain";
  /** Omitted on the prologue. Its absence is what marks the prologue as outside
   *  the chronology, and it does that work silently. */
  year?: string;
  /** Stub lines 2 and 3. Turn entries only. */
  organisation?: string;
  place?: string;
  /**
   * The marginal sentence. Lifted verbatim from `body` — it must be a real
   * sentence from the entry, not a summary written for the margin. Keep under
   * about ten words; it sets at 17px italic in a 180px column.
   *
   * PROVISIONAL. These nine are candidates. They should be judged in position
   * once the layout is standing, not from a list.
   *
   * Hidden on mobile — a marginal note belongs in a margin, and below 768px
   * there isn't one. Deliberately not relocated: rendering it twice with one
   * copy CSS-hidden is the duplicated-content defect found on /journey.
   */
  gloss?: string;
  body: string[];
  attribution: string;
  image?: ExperienceImage;
  /** Zero-based index of the paragraph the image renders after. */
  imageAfterParagraph?: number;
}

export const chapterLabel = "Experience";

/** Feeds the date slot. A number, not part of a hardcoded string, so the header
 *  never carries a temporal claim that can quietly go stale. */
export const sinceYear = 2011;

export const dateSlot = `${sinceYear} — present`;

export const standfirst = "Most of it I didn't choose.";

export const ledger: LedgerRow[] = [
  {
    figure: "40",
    gloss: "sarees opened for one sale, and folded back after",
    scale: 56,
    scaleMobile: 34,
  },
  {
    figure: "30",
    gloss: "kilometres — the wholesale radius before a wedding",
    scale: 34,
    scaleMobile: 24,
  },
  {
    figure: "8",
    gloss: "hours a week returned, in Excel, because software cost money",
    scale: 44,
    scaleMobile: 28,
  },
  {
    figure: "10,000",
    gloss: "sensor records cleaned before the first chart existed",
    scale: 38,
    scaleMobile: 26,
  },
  {
    figure: "35",
    gloss: "assignments, eight departments, eighteen months",
    scale: 48,
    scaleMobile: 30,
  },
  {
    figure: "50–70",
    gloss: "invoices a day, each one somebody waiting to be paid",
    scale: 30,
    scaleMobile: 22,
  },
];

/**
 * The single display line on the page, rendered after the entry whose id is
 * `after`. It marks the chapter's real hinge: nine years in India end here and
 * everything after is London.
 *
 * It repeats a sentence from the entry above it. That is a print convention and
 * survives being done once; done three or four times it becomes a pull-quote
 * pattern and cheapens immediately. It is also the most cuttable element in the
 * design — if it reads as decoration in the browser, delete this export and the
 * block in page.tsx, and the system is unaffected.
 */
export const hinge = {
  after: "enhanceer",
  line: "By May 2024 I had decided to apply to Bayes.",
};

export const prologue: ExperienceEntry = {
  id: "pooja-saree-centre",
  title: "Pooja Saree Centre",
  tier: "turn",
  // No `year`, no stub. The prologue runs at the widest prose measure on the
  // page (720px), which marks it as outside the chronology before a word is read.
  body: [
    "The shop is on the main market road in Mahendragarh. It is narrow and it goes back a long way. The first thing you see is saree stacked almost to the ceiling on both sides, and then the white mattresses spread across the floor, because customers do not browse — they sit, and things are opened in front of them, one after another. My father's chair is by the counter at the front, with the calculator, the receipt book and the telephone in reach of it. Most of the light is from tube lights. Daylight only gets a few feet in.",
    "My father started it. I began helping around 2011, when I was thirteen, though there was no moment of joining. It was simply where the family was in the evenings.",
    "The first job I was given was folding. A customer sits down and forty or fifty sarees get opened for her, and then she buys one, or she buys none, and every single one of them has to go back — folded the right way, aligned properly, returned to the exact place it came from. There is a correct way to do it and I got it wrong for a long time. It looks like nothing until you are the one doing it. For a couple of years that was the whole of my involvement: folding, carrying stock, putting things back, and watching my father deal with people.",
    "We were wholesale as well as retail. Shopkeepers came from towns across a radius of about thirty kilometres, especially before weddings, and they bought in quantity. During the season the shop stays open late, there is no gap between one family leaving and the next arriving, and food comes to the shop because nobody has time to go home and eat. Everyone works. As I got older I stopped only folding and started bringing out collections, keeping the stock moving, handling customers when there was nobody else free.",
    "The crossing over was gradual and I could not tell you when it happened. My father would be with someone, another customer would come in, and he would ask me to look after them. Then it stopped being unusual. I got things wrong — I did not know enough about the fabrics, I could not answer confidently, I fetched him more often than I should have needed to. The wholesale buyers were the hard audience. Many of them had been in the trade longer than I had been alive and knew the prices and the quality better than I did. Nobody took me seriously because I was the shopkeeper's son. They took me seriously once I could answer properly and stop going to get my father every few minutes, and that took years rather than months.",
    "What I mostly did in that shop was watch him work. He had no single method. He read whoever was in front of him and adjusted — some people wanted to talk for an hour first, some wanted the price, some wanted to negotiate and some found negotiating uncomfortable. Tea or water was never a technique; it is just what you do when someone has driven in from another town. What did not move was the pricing. He bought hard — he travelled to Surat, Delhi, Ludhiana and Amritsar for stock and he negotiated there like it was his job, because it was. But in his own shop he charged the same to everyone, rather than charging what he thought a particular person could pay.",
    "I did not learn a sentence from him. I learned that you find out about the person before you try to solve their problem, and I only noticed I was doing it years later, in a recruitment call and in a message to a student I had never met.",
  ],
  attribution: "Pooja Saree Centre, Mahendragarh — since 2011.",
  // The photograph. Uncomment and fill when it exists; put the file in
  // /public/images/experience/. It renders at the full 880px plate width —
  // wider than its own prose — and is the only element on the page that reaches
  // the container's right edge. That is what makes it an event.
  //
  // Write the alt text by hand, to the standard set on /media: describe what is
  // in the frame, not what it means. If no photograph can be obtained, the page
  // ships with no images at all. Do not substitute a stock photograph or add
  // images to other entries for parity.
  //
  // image: {
  //   src: "/images/experience/pooja-saree-centre.jpg",
  //   alt: "",
  //   width: 0,
  //   height: 0,
  // },
  // imageAfterParagraph: 0,
};

export const entries: ExperienceEntry[] = [
  {
    id: "jay-bharat-maruti",
    title: "The size of it",
    tier: "plain",
    year: "2018",
    body: [
      "Three months in the HR department of an auto-components manufacturer, arranged through my BBA. Attendance systems, employee records, training and development, time in the DOJO room. Desk work, mostly, though the offices and the plant were close enough that you could see how one fed the other.",
      "I was twenty, and until then I had only ever seen a small business from the inside. What I noticed was the size of it — departments that existed mainly to talk to other departments, processes written down because too many people needed them to be the same. Nothing much happened to me in those three months. I spent them working out how much coordination goes on behind a place like that before anything gets made.",
    ],
    attribution: "Jay Bharat Maruti, Gurgaon, 2018.",
  },
  {
    id: "ludifu-greenthusiast",
    title: "Everything from one room",
    tier: "turn",
    year: "2020",
    organisation: "LUDIFU and Greenthusiast",
    place: "Remote",
    gloss: "I said yes to whatever arrived.",
    body: [
      "Three roles at once, all remote, all of them done from my bedroom in Mahendragarh. It was the first year I had a laptop of my own and the first time I had worked online at all.",
      "It was deliberate. Everything was uncertain that year, so I decided experience mattered more than waiting for the right thing, and I said yes to whatever arrived. Two internships overlapped through the summer. In October, LUDIFU asked me to take over as HR manager — less a promotion than the consequence of still being there after other people had gone.",
      "I was asked to help write standard operating procedures for an NGO with a hundred people in it. I had never written one and did not know what the term meant. I found out, then wrote them.",
      "There was no AI then, so all of it was done by hand — the documents, the trackers, the forms, the slides. I learned Word and PowerPoint properly that year because there was no other way to produce anything at all.",
      "What I remember is that most people I knew were losing work and I had more of it than I had ever had. I onboarded people I never met, from a bedroom, and at the time it felt completely normal.",
    ],
    attribution: "LUDIFU and Greenthusiast Foundation, remote, 2020.",
  },
  {
    id: "hr-success-talk",
    title: "One specific thing",
    tier: "turn",
    year: "2021–2022",
    organisation: "HR Success Talk",
    place: "Remote",
    gloss: "Consistency matters more than inspiration.",
    body: [
      "HR Success Talk was a community for HR professionals rather than a company, and I joined while I was finishing my MBA. Fourteen months of running the social accounts and organising events, and at one point delivering a training session on Naukri to a room of people who had been doing HR for longer than I had been studying it.",
      "I was twenty-two and nervous about that until it started. They had not come to find out whether I was an expert. They had come to learn one tool, and I happened to know it. That is a narrower kind of usefulness than I had assumed was required, and it has been true of most things I have been asked to do since.",
      "Writing for the account taught me the other thing. Consistency matters more than inspiration. Nobody remembers a good post; they notice the silence.",
    ],
    attribution: "HR Success Talk, remote, 2021–2022.",
  },
  {
    id: "solutiontech-hr",
    title: "Where two things overlap",
    tier: "turn",
    year: "2021–2023",
    organisation: "SolutionTech HR",
    place: "Gurugram",
    gloss: "Saying no is the majority of recruitment.",
    body: [
      "My first full-time job, and I did it without leaving Mahendragarh. The company was in Gurugram and the work was hybrid, so I stayed at home. It was the first time my week was shaped by something other than university deadlines.",
      "Recruitment for SaaS and PaaS clients. Sourcing, screening, coordinating interviews, keeping pipelines moving, weekly calls about what a client needed and whether we were getting close. Two promotions across the two years, so that by the second I was running accounts on my own and dealing with clients directly. There was an award at the end of it, star performer of the year, which mattered mainly because it was the first time anyone had said out loud that turning up consistently for two years had been noticed.",
      "The work itself is harder to summarise. Every CV on my screen was somebody's ambition, written down and sent out hopefully. Every brief from a client was a business problem, described in the language of requirements. The job was to find the narrow place where those two things overlapped, and most of the time there wasn't one. Saying no is the majority of recruitment. It took me a while to stop reading a rejection as a verdict on a person — usually it meant the shape of what they wanted and the shape of what was needed did not match, which is not the same thing as anybody being wrong.",
      "I did not decide to become an analyst. It was slower than that. I spent two years inside recruitment data — funnel stages, time-to-hire, cohort reports, the same figures arriving every week — and gradually found I was more interested in what the pattern showed than in the placement it produced. I did nothing about it at the time. I just noticed I was reading the reports more carefully than the CVs.",
    ],
    attribution: "SolutionTech HR, Gurugram, 2021–2023.",
  },
  {
    id: "enhanceer",
    title: "A Saturday's work",
    tier: "turn",
    year: "2023–2024",
    organisation: "Enhanceer",
    place: "Ahmedabad",
    gloss: "I got this job because of a Saturday.",
    body: [
      "I got this job because of a Saturday. While I was at SolutionTech I took freelance recruitment work at weekends, and one of those placements was for a company in Ahmedabad. It went well and I was paid a bonus for it. Some time later the people behind that business started a company of their own and asked whether I wanted to come with them. A year of my life arrived through one good piece of work done on a weekend, for people I had no particular reason to impress.",
      "I joined as a recruiter. It was small and growing, which meant a role was whatever needed doing, and within a few months I was also responsible for the reporting and the operational data. The second title arrived afterwards, to describe work I was already doing.",
      "This is where the technical part started. I learned SQL here, properly, for the first time, along with Power BI and Power Query. None of it through a course. All of it because something needed to exist by Tuesday and nobody else was going to build it.",
      "The thing I remember best is the tracker. Candidate tracking was being done by hand — separate spreadsheets, statuses that went stale, a weekly report assembled from files that disagreed with each other. Proper recruitment software costs money a company that size did not have. So I built something that behaved like an applicant tracking system out of Excel, because Excel was already paid for. It took about eight hours of manual work a week out of the process, and more usefully it meant the weekly report stopped being an act of reconstruction.",
      "By May 2024 I had decided to apply to Bayes. The founders knew, we talked about it openly, and when I left there was nothing to announce. It was a small company and it had never been possible to keep anything from anyone.",
    ],
    attribution: "Enhanceer, Ahmedabad, 2023–2024.",
  },
  {
    id: "bayes-analytics-society",
    title: "Mostly emails",
    tier: "turn",
    year: "2024–2025",
    organisation: "Bayes Business School",
    place: "London",
    gloss: "I wrote the emails anyway, and then wrote the follow-ups.",
    body: [
      "There were more than sixty applications and an interview before the society appointed me president, which I mention mainly because I had been in the country about a month when I applied.",
      "I led a committee of six, each with an area — marketing, finance, operations, communications — and my job was largely to keep them pointing the same way. We ran four events across the year, including a flagship data science and analytics session, and I looked after the society's accounts and the relationships with faculty and speakers.",
      "The events were not the difficult part. The difficult part was writing to people I had never met, at companies across London, introducing myself and asking whether they would come and speak to a society I had only recently joined myself. I had no standing to offer them and nothing to point at. I wrote the emails anyway, and then wrote the follow-ups, which is the part nobody warns you about.",
      "That is most of what the year consisted of. Sending emails, chasing replies, confirming rooms, telling six people what had changed since Tuesday, making sure the thing actually happened on the night. Responsibility turned out to be a great deal more ordinary than the word makes it sound.",
    ],
    attribution: "Bayes Business Analytics Society, London, 2024–2025.",
  },
  {
    id: "rauha",
    title: "Before the chart",
    tier: "turn",
    year: "2024",
    organisation: "Rauha",
    place: "London",
    gloss: "The dashboard was the part anyone saw.",
    body: [
      "My first paid work in the UK, three months after arriving. A small startup working with IoT sensor data, and a project with a fixed end: clean it, structure it, make it legible.",
      "The data arrived raw. Before there was any dashboard there were more than ten thousand sensor records to check, correct and organise, and that took most of the time I had. The dashboard was the part anyone saw. The preparation was the job.",
      "Small company, so I reported to the CEO and CTO directly, which sounds more impressive than it was — there was nobody else to report to. It was intimidating at first, three months into a country I was still learning. It was also the shortest distance I have ever worked at between finishing an analysis and somebody deciding something because of it.",
    ],
    attribution: "Rauha, London, 2024.",
  },
  {
    id: "student-ambassador",
    title: "Three months ahead",
    tier: "turn",
    year: "2024–2025",
    organisation: "Bayes Business School",
    place: "London",
    gloss: "I was three months ahead of the people asking me.",
    body: [
      "The university paid me to answer questions from people deciding whether to come. Most of them were international students, a lot of them from India, and almost none of their questions were about the course.",
      "They wanted to know what London actually costs. Whether it is lonely at the beginning. How hard it is to find part-time work. Whether the degree is worth it. Whether they would get a job at the end of it.",
      "That last one was the difficult one, because the honest answer is no, not automatically, and I was being paid by the institution they were considering paying a great deal of money to. I decided early that I would answer honestly anyway. Bayes is a very good school, and London is expensive and overwhelming for the first few months, and both of those are true at the same time. When someone asked about work afterwards, I told them what depended on preparation and effort and what did not depend on them at all.",
      "I was three months ahead of the people asking me. That was the entire qualification, and it turned out to be enough.",
    ],
    attribution: "Bayes Business School, London, 2024–2025.",
  },
  {
    id: "st-lukes",
    title: "Once a week",
    tier: "turn",
    year: "2025–present",
    organisation: "St Luke's",
    place: "London",
    gloss: "In that room, none of the rest of it is worth mentioning.",
    body: [
      "I started volunteering during my first year here because I did not want to live in London only as a student, and I have gone once a week since.",
      "The baby bank supports families with young children who need help getting hold of things. Different families each week, different volunteers, a room that is busy without ever being frantic. What I do is welcome people, explain how it works, sort donated clothes and essentials, and put care packages together.",
      "I also look after the stationery, which means helping the children choose theirs. That is my favourite part of the week and I have never entirely been able to explain why.",
      "None of it is complicated. It is a large number of small acts that make somebody's week slightly easier, done by people who mostly do not know each other's names.",
      "Nobody there knows what I studied or where I work the rest of the time. To them I am another volunteer who turns up on the same day. I like that more than I expected to. In that room, none of the rest of it is worth mentioning.",
    ],
    attribution:
      "St Luke's Community Centre & Children's Baby Bank, London, 2025–present.",
  },
  {
    // Sits after St Luke's despite starting earlier. Middlesex came through
    // Unitemps, and that dependency has to be readable in the sequence.
    id: "unitemps",
    title: "Thirty-five first days",
    tier: "turn",
    year: "2024–2026",
    organisation: "Unitemps",
    place: "London",
    gloss: "Thirty-five first days in a row.",
    body: [
      "Unitemps is the university's own temping agency and it works like an internal job board. Roles are posted, you apply with a CV and a covering letter, sometimes there is an interview. Every assignment is a small application. Over about eighteen months I did around thirty-five of them, across eight departments.",
      "It began as money. I needed paid work while I was studying and this was the paid work available. That stopped being the reason fairly quickly.",
      "The longest and the best of them was note-taking. I sat in lectures on midwifery, law and media, writing structured notes for students who needed them for accessibility reasons. I knew nothing about any of those subjects, so I had to learn fast enough to produce something another person's degree depended on. In the midwifery lectures I was usually the only man in a theatre of eighty women, taking notes on a subject I had never studied, for someone I would never meet.",
      "There were twenty or so invigilation shifts, standing at the side of silent halls. Registration desks and ID card production during intake weeks. Campus tours for international students. The students' union elections across three campuses. Welfare calls to find out how students were getting on. A stretch of workplace monitoring. Graduation ceremonies, a careers fair, an international conference on compressors.",
      "The last part of it was the hard part. My master's finished in September 2025 and I did not start at Middlesex until April 2026, and in between I applied for a great many permanent jobs and was turned down for most of them. Unitemps was what kept me solvent through that. It also kept me in buildings with people in them, which mattered more than I would have guessed during a long run of rejections.",
      "What I took from it in the end was this. Every assignment began with arriving somewhere I had never been, among people I would probably not work with again, and learning the task from nothing. Thirty-five first days in a row. At some point being new stopped being uncomfortable and became the part I liked.",
    ],
    attribution: "Unitemps, City St George's, University of London, 2024–2026.",
  },
  {
    id: "middlesex-university",
    title: "Fifty to seventy",
    tier: "plain",
    year: "2026–present",
    body: [
      // "a permanent job" until August 2026, which it is not: this is a fixed
      // contract running to March 2027. The sentence still turns on the same
      // contrast — a settled thing arriving by the route that had only ever
      // produced unsettled ones — so only the false word needed replacing.
      "This came through Unitemps as well, which is the tidiest thing about it — a contract with an end date on it at the end of two years of week-to-week ones, by the same route.",
      "Accounts payable. Invoices through Oracle, coded correctly, discrepancies chased down, the payment queue kept moving. Fifty to seventy invoices on an ordinary day, more when it backs up.",
      "It is repetitive and it has to be right. An invoice that is wrong becomes somebody else's problem further down the line, usually a supplier waiting to be paid, so the accuracy is not abstract. I find that I like it.",
      // "I have been here four months" is a live temporal claim. It will need
      // editing, or removing, once it stops being true.
      "I have already caught myself looking at parts of the process and wondering what could be simpler. I am not doing anything about it yet. It seems obvious that you have to understand a system properly before you start improving it, and I have been here four months.",
    ],
    attribution: "Middlesex University, London, 2026–present.",
  },
];

export const coda: string[] = [
  "It is mid-afternoon here, which makes it evening in Mahendragarh, which means the shop is open.",
  "I know roughly what is happening in it without being told — when the wedding season will make it impossible, when the new stock arrives from Surat or Ludhiana, when it will go quiet again.",
  "My part in it changed a long time ago. It hasn't ended, and I don't think it is going to.",
];