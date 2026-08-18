/**
 * Now — Hinglish.
 *
 * Parallel to app/now/now-content.ts. Same keys, same ids, same order, same
 * array lengths, same number and same positions of revisions — so the count in
 * the stamp, the anchors and the renderers cannot tell the two apart.
 *
 * Apparatus stays English (README rule 3): the season name and its stamp, entry
 * number, `until` dates, `dated`, the colophon note with its date, `state`
 * lines in the margin, the margin labels (`pileHeading`, `publishedNote`,
 * `archive.note`), the section headings, place names, the Gita attribution,
 * message attributions, hrefs, ids, `src`, and the published list — which is
 * imported from the same source the English reads, so the two cannot drift.
 *
 * The four revisions were rewritten so that the sentence around each one is
 * still grammatical and still TRUE with the struck words skipped, which is the
 * rule stated at length above `interface Revision`. In Hindi the verb wants the
 * end of the clause, so each frame names the slot with a colon and the old and
 * new wordings carry their own verb.
 *
 * DRAFT: written to match the English line by line, in the register the English
 * uses. See data/hinglish/README.md before publishing.
 */

import type {
  AskedQuestion,
  BecomingItem,
  ExploredPlace,
  Fragment,
  MakingItem,
  Paragraph,
  SeasonStamp,
} from '@/app/now/now-content';
import { publishedForNow } from '@/data/writingData';

/* -------------------------------------------------------------------------- */
/* The stamp                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Nothing here is prose. The season name is the entry's identity and the same
 * string the archive stamp keys off, the stamp is a date, and the entry number
 * is a folio. All three stay English, which is rule 3 doing its job rather than
 * a gap in the translation.
 */
export const seasonHi = {
  name: 'Summer 2026',
  stamp: 'True on 16 August 2026',
  entryNo: 'Entry 01',
};

/* -------------------------------------------------------------------------- */
/* 1 — The season                                                              */
/* -------------------------------------------------------------------------- */

export const openingHi: Paragraph[] = [
  [
    'Yeh London mein rehte hue mera doosra summer hai, aur ab bhi aisa nahi lagta ki main pahunch gaya hoon. April se mera working day yeh raha hai: ',
    {
      struck: 'City St George’s par students ke liye notes lena',
      now: 'Middlesex mein invoices process karna',
      until: 'until 14 April 2026',
    },
    ' — jo jitna bada sunai deta hai utna bada nahi hai, aur jitna chhota dikhta hai utna chhota bhi nahi.',
  ],
  [
    'Aage jo likha hai uska zyadatar hissa spring tak galat ho chuka hoga. Is page ka matlab hi yahi hai. Is season mein iska version yeh hai: ',
    {
      struck: 'yeh seekhna ki London kaisa ho sakta hai',
      now: 'yeh samajhna ki yahaan rehne mein asal mein kya lagta hai aur kya milta hai',
      until: 'until 2025',
    },
    '.',
  ],
];

/* -------------------------------------------------------------------------- */
/* 2 — Work + Making                                                           */
/* -------------------------------------------------------------------------- */

export const workHi = {
  // Margin heading — apparatus.
  heading: 'Work & making',
  paragraphs: [
    [
      'Accounts Payable ek queue hai. Invoices aate hain, woh kuch ginti ke tareekon se galat hote hain jo baar-baar wahi rehte hain, aur paisa jaane se pehle kisi ko dekhna hota hai ki is baar kaun sa tareeka hai. Chaar mahine baad, zyadatar kaam yeh hai: ',
      {
        struck: 'har field ko guidance se milaana',
        now: 'invoice ki shakal padh kar samajh jaana ki woh kahaan fail hogi',
        until: 'until June 2026',
      },
      '. Yeh kisi ne announce nahi kiya. Bas hone lag gaya.',
    ],
    [
      'Is season mein doosri cheez jo aage badhi woh isse dheemi thi aur usmein zyada waqt laga. Main ',
      {
        struck: 'khud ko business aur data analyst keh raha hoon',
        now: 'people analytics ki taraf jaa raha hoon',
        until: 'until August 2026',
      },
      '. Imaandaar version yeh hai ki code main likh sakta hoon aur likhna mujhe pasand nahi hai, is sab se pehle maine teen saal HR mein guzaare hain, aur jis kaam par main baar-baar laut kar aata hoon usmein sawaal logon ke baare mein hota hai aur tool Power BI hota hai. Wahaan pahunchne mein bahut draft lage, jahaan se main shuru kar sakta tha.',
    ],
    [
      'Season ka baaki hissa un cheezon mein jaata hai jo poori nahi hui hain, jinmein yeh page bhi hai jo aap padh rahe hain. Yeh live hote hue hi aapke neeche se dobara banaya jaa raha hai.',
    ],
  ] as Paragraph[],

  /** `state` is margin apparatus — lowercase, mono, English. */
  making: [
    { name: 'Yeh website', state: 'rebuilt this season · unfinished' },
    { name: 'IPL, 2008–2024', state: 'in Power BI · loading, not modelling' },
    { name: 'Personal finance dashboard', state: 'running · rewritten twice' },
    { name: 'AI workflows', state: 'experiments · nothing shipped' },
  ] satisfies MakingItem[],

  unfinished: {
    // Dated apparatus, set in mono at the head of the errata slip.
    note: 'Unfinished on this site, 16 August 2026',
    items: [
      'CV aaj bhi mere purane description se shuru hota hai',
      '/projects par abhi kuch bhi people analytics nahi hai',
      '/questions par chhah sawaal likhe hi nahi gaye',
      'jo adhoora nahi balki galat hai woh /errata par hai',
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 3 — Becoming (the workbench)                                                */
/* -------------------------------------------------------------------------- */

export const becomingHi = {
  heading: 'Becoming',
  standfirst: 'Woh cheezein jo main seekh raha hoon, achhi tarah seekh paane se pehle.',
  items: [
    {
      kind: 'photo',
      src: null,
      alt: '',
      awaiting: 'Dal, kitchen counter, ek Sunday',
      annotation: 'Teesri koshish. Behtar.',
      size: 'wide',
    },
    {
      kind: 'couplet',
      // The couplet is already Hindi, in Devanagari. It is quoted, not
      // translated, so it stays exactly as it is in the English file.
      lines: ['दिल ना-उमीद तो नहीं,', 'नाकाम ही तो है।'],
      translation: 'Dil na-umeed nahi hai — bas naakaam hai.',
      annotation: 'Hindi Shayari dheere-dheere padh raha hoon. Lagbhag aadha samajh aata hai.',
    },
    { kind: 'note', text: 'Storytelling', annotation: 'Do chapters ho gaye.' },
    {
      kind: 'photo',
      src: null,
      alt: '',
      awaiting: 'Koi vegetarian cheez jo theek bani',
      annotation: 'Abhi bhi samajh raha hoon.',
      size: 'small',
    },
    {
      kind: 'struck',
      struck: 'Theek se khaana banaana seekhna',
      annotation: 'April mein chhod diya. Ho sakta hai wapas aaoon.',
    },
  ] satisfies BecomingItem[],
};

/* -------------------------------------------------------------------------- */
/* 4 — The quiet centre                                                       */
/* -------------------------------------------------------------------------- */

export const quietHi = {
  line: 'Ek baar mein ek chapter.',
  under: 'Khatam karne se zyada waqt sochne mein.',
  attribution: 'Bhagavad Gita', // Citation — apparatus.
};

/* -------------------------------------------------------------------------- */
/* 5 — Answering (Community + Writing)                                        */
/* -------------------------------------------------------------------------- */

export const answeringHi = {
  heading: 'Answering',
  standfirst: 'Sawaal jo is season mein mujhe bheje gaye hain.',

  questions: [
    {
      text: 'Agar job pehle se tay na ho, tab bhi London aana sahi hai?',
      attribution: 'a message, 3 July',
    },
    {
      text: 'Aapko kaise pata chala ki apply karna kab band karna hai aur seekhna kab shuru karna hai?',
      attribution: 'a message, 11 July',
    },
    {
      text: 'Sach bataiye, Master’s karna sahi tha?',
      attribution: 'a message, 26 July',
    },
  ] satisfies AskedQuestion[],

  context:
    'Shuruaat St Luke’s Community Centre se hui, logon ke paas baith kar, jab woh samajhne ki koshish karte the ki form unse kya poochh raha hai. Kamra ek inbox ban gaya. Kaam nahi badla.',

  pileHeading: 'writing back', // Margin note — apparatus, two words.
  pileNote:
    'Adhoore. Inmein se har ek wahaan rukta hai jahaan main ruka. Do kabhi kuch nahi banenge.',

  pile: [
    {
      id: 'first-winter',
      opening: 'Koi yeh nahi batata ki pehla winter thand ke baare mein nahi hota.',
      dated: '19 Jul',
      body: [
        'Woh chaar baje ke baare mein hota hai. Roshni tab chali jaati hai jab aap abhi desk par hi hote hain aur shaam us se pehle aa jaati hai jab tak aapne use kamaaya ho, aur kuch hafte aap baar-baar waqt dekhte rehte hain, yeh soch kar ki isse zyada ho chuka hoga.',
        'Jo main aaj tak samajh nahi paaya woh yeh hai ki main adjust ho gaya ya bas dhyaan dena band kar diya. Yeh do alag cheezein hain aur mujhe lagta hai farak maayne rakhta hai, kyunki inmein se ek',
      ],
    },
    {
      id: 'advice',
      opening:
        'Is sawaal ka imaandaar jawaab — “was it worth it” — yeh hai ki main doosra version chala kar dekh nahi sakta.',
      dated: '26 Jul',
      body: [
        'Zindagi ka koi control group nahi hota. Toh jab koi poochta hai ki Master’s worth tha ya nahi, woh asal mein yeh poochh raha hota hai ki jo mujhe ab pata hai woh jaan kar main phir se karta ya nahi — aur yeh ek alag aur bahut aasaan sawaal hai.',
        'Main karta. Par un wajahon se nahi jo us waqt maine kisi ko bataayi thi.',
      ],
    },
    {
      id: 'clearer',
      opening: 'Ek sawaal jo log mujhse bahut poochte hain, chhah alag tareekon se.',
      dated: '2 Aug',
      body: [
        'Jab aapke paas kaafi information na ho toh faisla kaise lete hain? Nahi lete. Aap yeh nikaalte hain ki kaun si missing information asal mein aapka jawaab badal degi, aur jaakar wahi laate hain.',
        'Zyadatar baar pata chalta hai ki koi bhi cheez jawaab nahi badalti thi, aur der kisi aur wajah se ho rahi thi.',
      ],
    },
  ] satisfies Fragment[],

  publishedNote: 'finished, eventually', // Margin note — apparatus.
  // Published titles are the titles they were published under. Read from the
  // same source as the English so a sixth piece appears in both readings.
  published: publishedForNow,
};

/* -------------------------------------------------------------------------- */
/* 6 — Exploring                                                              */
/* -------------------------------------------------------------------------- */

export const exploringHi = {
  heading: 'Exploring',
  nextUp: ['Bath', 'Windsor'],
  index: [
    { name: 'British Library', href: 'https://www.bl.uk/' },
    { name: 'British Museum', href: 'https://www.britishmuseum.org/' },
    { name: 'Cambridge' },
    { name: 'Oxford' },
    { name: 'Brighton' },
    { name: 'Canterbury' },
    { name: 'Seven Sisters' },
  ] as ExploredPlace[],
  counter: { label: 'London walking tours', value: 'das se zyada' },
  featured: {
    name: 'Brighton',
    src: '/images/media/brighton.jpg',
    alt: 'Brighton mein ek breakwater par khade hue, baahein failaayi hui, pier door chhota dikhta hua.',
    paragraph:
      'Main ek din ke liye gaya tha aur aakhri theek-thaak train tak ruka raha. Pier shor waala hai aur samundar nahi, aur un dono ke beech ki walk hi woh hissa hai jiske baare mein main sochta rehta hoon.',
  },
};

/* -------------------------------------------------------------------------- */
/* 7 — The close and the archive                                              */
/* -------------------------------------------------------------------------- */

export const closeHi = {
  line: 'Yeh season guzar jaayega.',
  date: '16 August 2026',
  cadence:
    'Yeh page waise badalta hai jaise zindagi badalti hai — koi fixed schedule nahi, bas jab season badal jaata hai.',
};

export const archiveHi = {
  note: 'Previous seasons', // Margin note — apparatus.
  promise:
    'Jab yeh dobara likha jaayega, yeh entry rahegi. Neeche ke stamps se aap iske paas wapas aa sakte hain.',
  stamps: [
    { name: 'Summer 2026', stamped: '16 Aug 2026', current: true },
  ] as SeasonStamp[],
};
