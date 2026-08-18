/**
 * Projects — Hinglish.
 *
 * Parallel to data/projectsChapter.ts. Same ids, same order, same array
 * lengths, same `rhythm` / `isolate` / `evidenceMark.insertAfter` /
 * `mediaAfterParagraph` positions — everything the layout, the pull-quotes,
 * the anchors and the search index depend on is untouched. Only prose changes.
 *
 * TECHNICAL VOCABULARY IS DELIBERATELY LEFT IN ENGLISH. Scope 1 and Scope 2,
 * defined benefit, defined contribution, risk profile, reconcile, residual,
 * Power BI, dataset, coefficient, associational, disclosure, weighting — these
 * were English in the original thought and stay English inside the Hinglish
 * sentences (README rule 4). Hindi equivalents would produce a register nobody
 * working in this field actually speaks.
 *
 * Apparatus stays English too (README rule 3): ids, `attribution` citations,
 * `image.src` and `alt`, the table's columns, cells and note, every figure,
 * year and org name, and the whole of `projectRecord` — which is titles,
 * module names, years and links, i.e. index apparatus with no prose in it.
 *
 * DRAFT: written to match the English line by line, in the register the English
 * uses. This is a first draft for Sahil to rewrite. See
 * data/hinglish/README.md before publishing.
 */

import type { ProjectEntry, RecordItem } from '@/data/projectsChapter';

export const projectEntriesHi: ProjectEntry[] = [
  {
    id: "place-to-stand",
    title: "Khade hone ki ek jagah",
    // Apparatus — the citation is not translated (README rule 3).
    attribution: "Built for myself, 2026–present.",
    rhythm: { measure: "reading", seam: "normal", lede: true },
    body: [
      "Har Sunday main chhah-saat spreadsheets kholta tha. Investments ek mein, SIPs doosri mein, insurance teesri mein, cash balances kahin aur, aur ek chalti hui list un cheezon ki jinka paisa maine baad mein dene ka waada kar rakha tha. Inmein se kuch bhi mushkil nahi tha. Lagbhag ek ghanta lagta tha, aur ghante ke aakhir mein main aam taur par us sawaal ka jawaab de paata tha jisse shuruaat hui thi: main kahaan khada hoon?",
      "Ajeeb baat yeh thi ki saari information mere paas pehle se thi. Jo bhi number mujhe chahiye tha woh maujood tha, ek file mein jo maine hi banayi thi, aur phir bhi mujhe ek ghanta lagaana padta tha use jodkar ek jawaab banane mein.",
      "Pehla version bas ek behtar spreadsheet tha, aur kuch waqt tak wahi kaafi tha. Jo badla woh yeh nahi tha ki woh toot gaya. Yeh tha ki mujhe usi information ke alag-alag views chahiye hote rahe — mahine se, category se, jo pehle se committed tha usse — aur inmein se har ek ka matlab tha wapas jaakar us file ko badalna jismein sab kuch record hota tha.",
      "Toh maine use do hisson mein baant diya. Sheets wahin rahin jahaan thi, us jagah ki tarah jahaan main asal mein cheezein update karta hoon: ek nayi policy, ek badla hua balance, ek payment jiska waada maine kar diya. Baaki sab Power BI mein chala gaya, jo sirf padhta hai. Isse main yeh badal sakta tha ki kisi cheez ka calculation kaise hota hai, bina us jagah ko chhue jahaan woh record hoti hai, aur yeh badal sakta tha ki main kya record karta hoon, bina calculations tode.",
      "Sunne mein yeh technical decision lagta hai. Khaas woh tha nahi.",
      "Jo mujhe wapas mila woh woh ghanta tha, lekin baat theek wahi bhi nahi hai. Jo mila woh khade hone ki ek jagah thi — ek view, aaj ka, jo sawaal ka jawaab do baar poochhe jaane ke bina de deta hai. Assets, jo mujhe dena hai, jo committed hai, jo asal mein mera hai.",
      "Yeh aaj bhi chal raha hai. Main aaj bhi ise badalta hoon, aam taur par jab pehle meri zindagi mein kuch badalta hai: ek naya commitment, ek doosri currency, ek category jiska matlab hi khatam ho gaya. Yeh kabhi poora nahi hua, aur maine iski umeed karna band kar diya hai.",
    ],
    // Same line, same position: lifted verbatim from the entry's own prose.
    evidenceMark: {
      insertAfter: 4,
      lines: [
        "Maine ise isliye banaya kyunki main ek doosre sawaal ka jawaab dene ke liye ek hi file ko edit karte-karte thak gaya tha.",
      ],
    },
    mediaAfterParagraph: 5,
  },

  {
    id: "wrong-first-question",
    title: "Pehla sawaal hi galat tha",
    attribution:
      "Group project with USS, MSc Business Analytics, Bayes Business School, 2025.",
    rhythm: {
      measure: "reading",
      seam: "normal",
      lede: true,
      isolate: [5, 7],
    },
    body: [
      "Kisi ne pandrah saal se ek pension mein paisa daala hai. Har mahine salary se paisa jaata hai, saal mein ek baar statements aate hain, aur agar aap unse poochhein ki retirement par unke paas asal mein kya hoga, zyadatar log kahenge ki unhe theek se pata nahi. Isliye nahi ki unhone koshish nahi ki. Isliye ki jawaab dene ke liye unhe pehle yeh seekhna padega ki defined benefit ka matlab kya hai, aur woh defined contribution se kaise alag hai, aur risk profile kya cheez hai, aur in sab ka unse lena-dena kya hai.",
      "Brief ek pension concept ke baare mein tha. Research mein jitna aage gaye, baar-baar yehi milta raha ki dikkat pension nahi thi. Ek member ko jo bhi number chahiye tha, woh pehle se maujood tha. Woh aise form mein aa raha tha jismein apna sawaal poochhne se pehle unhe kisi aur ki vocabulary mein fluent hona padta tha.",
      "Member ko sabse pehle contribution rates ya investment options nahi dikhte the. Ek sawaal dikhta tha, unke baare mein. Yeh nahi ki scheme kya deti hai, balki yeh ki woh kya chahte hain: kab woh rukna chahte hain, kitne mein jeena chahte hain. Uske baad pension ek jawaab ki tarah aata tha — iske liye itna lagega, aaj aap yahaan hain, andar jaane waali amount badalne se yeh badal jaata hai. Wahi information. Bas woh decode karne waala document rehna band ho gaya aur unke poochhe hue kisi cheez ka jawaab ban gaya.",
      "Woh ulta karna hi project tha. Dashboard baad mein aaya, aur baaki sab bhi — scenarios, visualisations, kisi ne number hilaaya toh real-time feedback. Woh us decision ke nateeje the, decision nahi.",
      "Prototype maine banaya aur code maine likha, woh kaise chalta hai woh maine tay kiya, aur jo humne present kiya woh maine jodkar taiyaar kiya. Yeh group project tha aur iske peechhe ki research sab ki thi, lekin yeh hissa galat karne ke liye mera tha.",
      "Aakhir mein humne USS team ko present kiya.",
      "Mujhe grade yaad nahi hai. Uske baad ke bees minute yaad hain, jab woh presentation par jawaab dena band karke apne members ke baare mein baat karne lage — kaun se sawaal aate hain, phone karne par log kya poochhte hain, explanations kahaan fail hote hain. Unhone kaha ki inmein se kuch cheezon ke baare mein woh andar hi soch rahe the, aur woh dekhenge ki yeh approach member engagement par unke kaam mein kaise kaam aa sakta hai.",
      "Us baat ke beech mein kahin, unmein se ek ne poochha ki member-first approach kiska idea tha. Main kuch keh paata, usse pehle mere professor ne kaha, “Sahil.”",
      "Baaki ka kya hua mujhe nahi pata. Ho sakta hai kuch bhi nahi; yeh cheezein dheere chalti hain aur main ab us kamre mein nahi hoon.",
    ],
    evidenceMark: {
      insertAfter: 1,
      lines: [
        "Toh humne ise ulta kar diya.",
        "Yeh nahi ki “yeh aapki scheme hai, ab ise padhna seekhiye,” balki: aap karna kya chahte hain?",
      ],
    },
    // `src` and `alt` are apparatus and stay English: the alt text names the
    // prototype's own on-screen controls (Goal, Lower Bound, Upper Bound, DC
    // pot), which are English labels in the artefact itself.
    image: {
      src: "/images/projects/uss-goal-setting.webp",
      alt: "The USS prototype's Scenario 1 and Scenario 2 panels: a Goal selector and Lower Bound / Upper Bound sliders next to a plain-language readout of what the DC pot would need to reach the goal.",
      treatment: "plate",
      aspectRatio: "1294 / 337",
      caption:
        "Prototype ki goal-setting screen, session ke beech mein. Do scenarios, saath-saath.",
    },
    mediaAfterParagraph: 2,
  },

  {
    id: "looking-properly",
    title: "Theek se dekhna",
    attribution: "Built for myself, 2024.",
    rhythm: { measure: "reading", seam: "normal" },
    body: [
      "Netflix woh cheez ban gaya tha jo zyadatar shaamon ko chalti rehti thi, aur mujhe samajh aaya ki mujhe pata hi nahi hai ki usmein kya hai. Yeh nahi ki kya dekhna hai — woh aapke liye tay ho jaata hai. Asal mein wahaan kya tha. Kitna, kahaan se, kab bana.",
      "Toh maine catalogue download kar liya. Kaggle par ek public dataset hai: har title, uske saath uska country, type, release year, rating, cast aur director, duration. Lagbhag aath hazaar rows us cheez ki jo main saalon se use kar raha tha aur kabhi poori dekhi nahi thi.",
      "Koi ek sawaal nahi tha jiska main jawaab dhoondh raha tha. Bas sawaal the. Kaun se desh sabse zyada banate hain. Zyadatar films hain ya series, aur woh badla hai ya nahi. Kaun se directors baar-baar aate hain. Ek aam title kitna lamba hota hai. Kaun se genres asal mein chhaaye hue hain, un genres ke muqaable jo lagte hain ki chhaaye hue hain.",
      "Maine ise Power BI mein banaya, aur banana hi asal baat thi. Har view kuch jawaab deta tha aur turant agli dekhne waali cheez sujhaa deta tha — country breakdown dekh kar mann kiya ki ise saal ke hisaab se dekhoon, saal waala view dekh kar mann kiya ki ise type ke hisaab se baant doon. Dashboard woh jagah nahi tha jahaan exploring khatam hui. Woh tareeka tha jisse exploring hui.",
      "Koi finding nahi thi, koi recommendation nahi, dikhaane ke liye koi nahi. Uske baad main Netflix ko thoda behtar samajhta tha, aur isi ke saath cheezein banane mein tez ho gaya tha.",
      "Yeh ek hi cheez hai jo maine banayi hai aur jiska jaanne ki chaah ke alaawa koi maksad nahi tha. Tab tak main yeh maanta tha ki analysis woh cheez hai jo aap kisi problem par karte hain. Yeh padhne ke zyada kareeb thi — kahin jaana kyunki dilchaspi hai ki wahaan kya hai.",
    ],
  },

  {
    id: "understanding-behaviour",
    title: "Data se behaviour samajhna",
    attribution: "MSc Business Analytics, Bayes Business School, 2025.",
    rhythm: { measure: "narrow", seam: "wide", centered: true },
    body: [
      "Chhah hafte, aur pehli baar problem kisi ne mere haath mein nahi di. Dataset humne chuna, sawaal humne banaye, analysis humne banayi, aur findings humne present kiye.",
      "Maine ek conventional business dataset ki jagah ek dating app dataset chuna kyunki use explore karna zyada dilchasp lag raha tha. Dataset synthetic tha—pachaas hazaar generated users—aur wahi sabse kaam ka sabak nikla. Usne mujhe yeh poochhna sikhaaya ki koi analytical pattern asliyat dikhaata hai ya bas woh assumptions jo data ke andar bana diye gaye hain. Yeh sawaal project se bahut zyada waqt tak mere saath raha hai.",
    ],
  },

  {
    id: "did-both-jobs",
    title: "Woh saal jisne dono kaam kiye",
    attribution:
      "Applied Research Project, MSc Business Analytics, Bayes Business School, 2025.",
    rhythm: {
      measure: "reading",
      seam: "wide",
      lede: true,
      isolate: [5],
    },
    body: [
      "Equinor ne 11.0 kaha. Mujhe 12.5 mila.",
      "Maine hafte lagaakar woh number khud banaya tha — nau saal ke annual reports, sustainability reports aur remuneration reports se Scope 1 aur Scope 2 ke figures nikaal kar, aur headline uthaane ki jagah components se totals dobara banaakar. Saat saal tak dono versions ek doosre se rounding ke faasle par baithe rahe. Phir 2024 mein dono 1.5 million tonne se alag ho gaye.",
      "Project ko kuch aur jawaab dena tha. Sawaal yeh tha ki climate governance asal mein kaam karti hai ya nahi — executive pay ko emissions targets se jodne se asli reductions aate hain, ya sirf behtar dikhne waali disclosure. Yeh sawaal poochhne ke liye Equinor theek jagah thi: state-owned, aam se zyada khulkar batane waali, aur is poore daur mein executive pay mein climate targets ki weighting zero se lagbhag tees per cent tak pahunch gayi thi. Agar incentives kahin bhi emissions ko hilaate hain, toh yahaan hilaate.",
      "Statistics ne haan kaha, halke se. Zyada weighting, badi reductions, ek coefficient jo sahi taraf ishaara kar raha tha.",
      "Sirf yeh ki weighting asal mein ek hi baar hili. Paanch saal zero, teen saal das per cent, ek hi saal mein tees per cent — 2024. Aath observations, aur poora relationship lagbhag unmein se aakhri par tika tha.",
      "Aur 2024 wahi saal tha jo reconcile nahi hua.",
      "Main gap band nahi kar paaya. Mumkin explanations the — ek boundary change, ek methodology revision, kisi ek saal ki production kaise gini gayi usmein kuch — lekin mumkin hona documented hona nahi hai, aur main woh disclosure nahi dikha sakta tha jo iska hisaab deti ho.",
      "Toh maine use table mein hi rehne diya, apni alag row mein, uske saath likha hua Unreconciled.",
      "Isi hisse ke baare mein maine sabse zyada socha. Nau saal ki reconstruction ke aakhri saal mein 1.5 million tonne ka gap apni hi analysis ke neeche chhaapna chhoti baat nahi hai. Asal mein woh kehta hai: yeh mera finding hai, aur yeh woh saal hai jis par woh tika hai, aur us saal ka poora hisaab main nahi de sakta. Uske baad ka sab kuch zyada dhyaan se likhna padta hai.",
      "Lagbhag wahi hua. Conclusions causal ki jagah associational nikle — relationship hai, sahi taraf ishaara karta hua, bahut kam saalon par tika hua aur unmein se ek bina explanation ke.",
      "Mujhe lagta tha ki main is jawaab par khatam karunga ki governance kaam karti hai ya nahi. Main jis cheez par khatam hua woh chhoti aur zyada saaf thi: ek figure jiski explanation nahi hai, aur uske saath kya karna hai iska ek decision. Mujhe aaj bhi pakka nahi pata ki woh 1.5 kya thi. Yeh mujhe kaafi pakka lagta hai ki use dikhne dena sahi faisla tha.",
    ],
    mediaAfterParagraph: 5,
    // The table is apparatus end to end: the chart above it reads these cells
    // by index, "Unreconciled" is the word actually published in the
    // dissertation, and the note carries units. Nothing here is translated.
    table: {
      columns: ["Year", "Reported", "Reconstructed", "Residual", ""],
      rows: [
        ["2021", "12.1", "12.0", "+0.10", "Methodology updates"],
        ["2022", "11.4", "11.4", "0.0", "Portfolio-driven changes"],
        ["2023", "11.6", "11.5", "+0.06", "Small rise despite incentives"],
        ["2024", "11.0", "12.5", "+1.5", "Unreconciled"],
      ],
      emphasisRow: 3,
      note: "Scope 1 and 2, MtCO₂e. Four of nine years shown.",
    },
  },
];

const LI = "https://www.linkedin.com/in/reach-sahil/overlay/Project";

/**
 * The record, unchanged.
 *
 * Every field in this list is apparatus: project titles as submitted, module
 * and institution names, years, and LinkedIn overlay hrefs. There is no prose
 * to translate — a one-line index carries none. It exists here so the Hinglish
 * page renders the same eight lines, in the same order, rather than falling
 * back to a separate import.
 */
export const projectRecordHi: RecordItem[] = [
  {
    title: "HR Analytics Dashboard",
    context: "Academic project",
    year: "2025",
  },
  {
    title: "Business Intelligence Reporting Model",
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

/**
 * The chapter's own furniture, which lives in
 * components/projects/ProjectsChapter.tsx rather than in the data file.
 */
export const projectsChapterHi = {
  label: 'Projects',
  standfirst: 'Kuch ne mera peechha nahi chhoda, jab tak maine kuch bana nahi liya.',
  glanceHeading: 'Is chapter mein',
  glanceSummary: 'Aakhri waala hi woh hai jo main padhta.',
};
