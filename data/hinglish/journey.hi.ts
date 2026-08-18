/**
 * Journey — Hinglish.
 *
 * Parallel to data/journeyData.ts. Same ids, same order, same eras, same
 * `resultMoment` / `markMoment` / `milestone` positions — everything the rail,
 * the anchors and the search index depend on is untouched. Only prose changes.
 *
 * DRAFT: written to match the English line by line, in the register the English
 * uses. See data/hinglish/README.md before publishing.
 */

import type { JourneyChapter } from '@/data/journeyData';

export const journeyIntroHi = {
  eyebrow: 'Résumé ke peechhe ki kahaani',
  title: 'Yeh kisi ne plan nahi kiya tha.',
  subtitle:
    'Mahendragarh ke bahar ek sadak par ek motorcycle. Ek hostel jahaan papa mujhe chhodne aaye the. Ek recruitment job jo bas wahi job thi jo mil rahi thi. Mujhe baad mein pata chala ki har ek ne mere saath kya kiya.',
  body: [
    'Kaam dekhne se pehle, main chahta hoon ki log aadmi ko samajh lein.',
    'Yeh achievements ki timeline nahi hai. Yeh un chhoti cheezon ki hai jo baad mein sabse zaroori nikleen: ek scholarship jo papa ne apni jeb se match ki, ek bike jo Mahendragarh ke bahar sadak par giri padi thi, aur ek recruitment job jismein main woh cheezein ginne laga jo ginne ke liye kisi ne kaha bhi nahi tha.',
  ],
};

export const journeySnapshotHi = {
  heading: 'Ek nazar mein mera safar',
  points: [
    { year: '1998', label: 'Paida hua' },
    { year: '2002', label: 'School' },
    { year: '2014', label: 'Commerce' },
    { year: '2016', label: 'BBA' },
    { year: '2019', label: 'MBA' },
    { year: '2021', label: 'HR career' },
    { year: '2024', label: 'MSc Analytics (London)' },
    { year: '2026', label: 'Accounts job (UK)' },
  ],
  summary: 'Mahendragarh se London · aath chapters, do chune hue.',
};

export const journeyChaptersHi: JourneyChapter[] = [
  {
    id: 'mahendragarh',
    era: '1998',
    title: 'Mahendragarh Mein Bada Hona',
    navLabel: 'Growing Up',
    tone: 'calm',
    pause: 'short',
    body: [
      'Main May 1998 mein Mahendragarh, Haryana mein paida hua, ek joint family mein — maa-baap, dada-dadi, chacha, cousins — jahaan ghar kabhi khaali nahi hota tha aur koi bhi faisla lagbhag akele nahi hota tha.',
      'Kisi ne mujhe bithaa kar yeh nahi samjhaaya ki kaamyaabi akele ki cheez nahi hoti. Jo maine seekha woh isse dheema tha: jo plan aap bhare hue table par bol nahi sakte, woh abhi plan bana hi nahi hai.',
      'School us ghar ke bahar pehli jagah thi jahaan main akela tha. Mujhe maths pasand tha, aur wajah us waqt main bata nahi paata — woh ek hi subject tha jismein mujhe khud pata chal jaata tha ki main sahi hoon, kisi ke batane se pehle.',
      'Main class mein aage ke number par tha aur kamre mein peechhe ki taraf. Dono aaj bhi sach hain.',
    ],
  },
  {
    id: 'school-years',
    era: '2002 – 2014',
    title: 'Mehnat Jama Hoti Rehti Hai',
    navLabel: 'Learning',
    tone: 'building',
    pause: 'medium',
    body: [
      'School sirf marks ke baare mein nahi tha. Woh pehli jagah thi jahaan mehnat ka nateeja dikhta tha.',
      'Main lagataar class mein top ke paas rehta tha, aur kismat se academic competitions se scholarships mileen — NTSE aur ek national commerce talent examination.',
      'Ek riwaaj main kabhi nahi bhoolunga: jo bhi scholarship main jeeta, papa ne utne hi paise apni taraf se milaa diye.',
      'Us waqt mujhe lagta tha yeh inaam hai. Saalon baad samajh aaya ki asal mein woh kya tha. Unki saree ki dukaan thi, toh woh paisa dene se pehle gina jaata tha — aur woh nateeje ka inaam nahi de rahe the, woh aadat chalti rehne ka kharch utha rahe the.',
    ],
    resultMoment: {
      insertAfter: 1,
      // Apparatus. The name of an examination and the words "All India Rank"
      // are not translated — see README rule 3.
      eyebrow: 'National Commerce Talent Examination',
      figure: '35',
      caption: 'All India Rank',
    },
  },
  {
    id: 'turning-point',
    era: '2014',
    title: 'Ek Motorcycle Ne Soch Badal Di',
    navLabel: 'The Accident',
    tone: 'rupture',
    pause: 'long',
    body: [
      'Baaki teenagers ki tarah, main bhi impressive dikhna chahta tha.',
      'Ek shaam, behen ko railway station se lene jaate hue main bahut tez chala raha tha aur motorcycle par se control chhoot gaya.',
      'Bike toot gayi. Mujhe sirf chotein aayin.',
      'Sadak ke kinaare akela baithe hue, ek baat dimaag mein reh gayi.',
      'Kisi ko farak nahi padta tha ki main kitni jaldi pahuncha.',
      'Us din se mujhe is baat ki fikar bahut kam hai ki cheez bahar se kaisi lag rahi hai, aur is baat ki bahut zyada ki main saabut pahunch jaoon.',
    ],
    markMoment: {
      insertAfter: 3,
      lines: [
        'Main aakhir kya saabit karne ki koshish kar raha tha?',
        'Koi dekh bhi nahi raha tha.',
      ],
    },
    lesson: 'Main sabr waala nahi ban gaya. Mujhe dekhe jaane mein dilchaspi khatam ho gayi.',
  },
  {
    id: 'leaving-home',
    era: '2016',
    title: 'Ghar Chhodna',
    navLabel: 'Leaving Home',
    tone: 'building',
    pause: 'short',
    body: [
      'BBA ke liye ghar chhodna pehla bada kadam tha — har jaani-pehchaani cheez se bahar.',
      'Woh sirf ek aur degree nahi thi. Woh apne kapde khud dhona seekhna tha. Apna paisa khud sambhaalna. Dosti zero se banaana.',
      'Pehle din papa mere saath hostel tak aaye the. Saalon baad bhi woh pal mujhe kai graduation ceremonies se zyada saaf yaad hai.',
      'Bada hona degree ke saath nahi aaya. Woh kapdon aur paise ke saath aaya.',
    ],
  },
  {
    id: 'building-ambition',
    era: '2016 – 2021',
    title: 'Ambition Banne Lagi',
    navLabel: 'Building Ambition',
    tone: 'calm',
    pause: 'short',
    body: [
      'College ne kamra bada kar diya. Main un logon se mila jinki zindagi meri se alag tareeke se lagi hui thi, CAT diya, aur wahi internships kiye jo sab karte hain.',
      'Mera 90th percentile aaya aur maine use failure ki tarah padha, kyunki woh woh number nahi tha jo maine soch rakha tha. Yeh aadat chhodne mein bahut waqt laga — har cheez ke saath.',
      'Un saalon mein jo mujhe asal mein mila, uska exam se koi lena-dena nahi tha. Yeh samajhna ki business asal mein kaise chalta hai, mujhe iske baare mein padhne se bahut zyada pasand tha.',
      'Us waqt meri ambition dilchasp nahi thi: formal kapde, business problems, aur ek career jo career jaisa sunai de.',
      'Baat kahin aur chali gayi.',
    ],
  },
  {
    id: 'first-chapter',
    era: '2021',
    title: 'Pehla Professional Chapter',
    navLabel: 'First Career',
    tone: 'building',
    pause: 'medium',
    body: [
      'Meri pehli full-time job recruitment thi, aur maine woh apne maa-baap ke ghar se ki. Company Gurugram mein thi aur kaam hybrid tha, toh mera hafta badal gaya aur pata badla hi nahi.',
      'Mere aas-paas sab log saamne wali vacancy bharne mein lage the. Mujhe pipeline ki shakal mein dilchaspi ho gayi: kitne log ek stage se doosre tak pahunchte hain, kaun se sources mehnat ke laayak hain, kaun si galtiyaan baar-baar hoti hain.',
      'Us waqt na kisi ne use analysis kaha, na maine. Do saal lage yeh pata chalne mein ki iska ek naam hai aur log iske paise dete hain.',
      'Aakhir tak main apne accounts chala raha tha aur teen logon ki team, aur job ka jo hissa main baar-baar wapas dekhne jaata tha woh reporting thi.',
    ],
  },
  {
    id: 'the-leap',
    era: '2024',
    title: 'India Chhod Kar London',
    navLabel: 'London',
    tone: 'uncertain',
    pause: 'medium',
    body: [
      'London aana koi bachpan ka sapna nahi tha. Ek mauka aaya aur maine haan keh di.',
      'Ghar chhodna dara dene waala tha. Naya desh. Nayi culture. Naya education system. Nayi zimmedaariyan. Paas mein family nahi.',
      'Akele rehne ne mujhe university se bahut zyada sikhaaya. Khaana banaana. Paisa sambhaalna. Flights book karna. Bills bharna. Routine banaana. Kisi par depend na hote hue confidence dhoondhna.',
      "Us saal ka bahut kuch maine university ki apni hi agency ke temp shifts se bhara, jiski wajah se ek master's degree ke saath atthaarah mahine aise bhi aaye jahaan main har kuch hafte kisi nayi jagah pahunch raha tha.",
    ],
    lesson: 'Us waqt kuch bhi growth jaisa nahi lagta tha. Admin jaisa lagta tha.',
  },
  {
    id: 'finding-direction',
    era: '2024 – 2025',
    title: 'Apni Direction Milna',
    navLabel: 'Finding Direction',
    tone: 'resolving',
    pause: 'short',
    body: [
      'Business analytics koi mod nahi tha. Woh pehla naam tha jo mujhe us cheez ka mila jo main saalon se buri tarah kar hi raha tha.',
      'Numbers, problems, aur yeh sawaal ki ek faisla kaam kar gaya aur doosra kyun nahi — yeh teen cheezein main alag-alag utha kar ghoom raha tha. Analytics pehli jagah thi jahaan teenon ko ek hi kamre mein aane ki ijaazat thi.',
      'Isse zyada saaf hone mein ek saal aur laga. Jis kaam par main baar-baar laut kar aata hoon, usmein sawaal logon ke baare mein hota hai aur tool Power BI hota hai. Code main likh sakta hoon. Likhna mujhe kabhi khaas pasand nahi aaya.',
    ],
    milestone: {
      insertAfter: 2,
      org: 'Bayes Business Analytics Society',
      role: 'Co-President',
      note: 'Aisa role jo pehle din main soch bhi nahi sakta tha ki main le paunga.',
    },
  },
  {
    id: 'still-becoming',
    era: '2026 — Present',
    title: 'Abhi Ban Raha Hoon',
    navLabel: 'Still Becoming',
    tone: 'resolving',
    pause: 'short',
    body: [
      "September 2025 mein master's khatam hone aur April 2026 mein Middlesex shuru hone ke beech saat mahine the — applications, aur zyadatar rejections. Kuch saal pehle main yeh hissa chhod deta.",
      'Ab jo main karta hoon woh invoices ki ek line hai — aam din mein pachaas se sattar — aur hafte mein ek shift ek community centre par, logon ke paas baith kar jab woh samajhne ki koshish karte hain ki form unse kya poochh raha hai. Yeh dono jitne alag lagte hain, utne alag nahi hain.',
      'Main aaj bhi roz ghar phone karta hoon. Yeh meri zindagi ki ek hi pakki cheez hai jise maine kabhi zyada efficient banane ki koshish nahi ki.',
      'Mere paas apna koi aisa version nahi hai jiski taraf main jaa raha hoon. Mere paas un cheezon ki list hai jo maine poori nahi ki, aur yeh page us list par hai.',
    ],
  },
];

export const journeyCloseHi = {
  quote:
    'Inmein se ek bhi us cheez ke baare mein nahi nikla jiske baare mein us waqt mujhe lagta tha.',
  body: [
    "Accident motorcycle ke baare mein nahi tha. Recruitment ki job recruitment ke baare mein nahi thi. Master's master's ke baare mein nahi tha.",
    'Yeh mujhe hamesha baad mein samajh aaya, isliye maine pehle se tay karna band kar diya hai ki abhi jo ho raha hai usmein se kaun si cheez maayne rakhegi.',
    'Mera andaaza hai is saal ke saath bhi aisa hi hoga.',
  ],
};

export const journeyExitHi = {
  href: '/now',
  eyebrow: 'Now',
  line: 'Kahaani khatam nahi hui. Yeh bas wahaan hai jahaan aaj hai.',
  action: 'Dekhiye aaj kahaan hai',
};
