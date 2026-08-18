/**
 * Back matter — Hinglish.
 *
 * /writing, /a-z, /errata and the 404. Small files, so they live together.
 *
 * WHAT IS NOT TRANSLATED HERE, AND WHY:
 *
 *   · The /a-z index TERMS. "Mahendragarh", "Equinor", "Scope 1 and 2",
 *     "Dishoom, the pav bhaji" — they are the names of things, and an index is
 *     sorted alphabetically by them. Translating them would resort the whole
 *     page into a different order and break every anchor. Only the intro prose
 *     changes.
 *   · The five published pieces' TITLES on /writing. They are the titles of
 *     documents that exist on LinkedIn and on the Bayes site, in English.
 *     Renaming them here would misquote them.
 *   · The errata ENTRIES — `struck`, `now`, `where`, `kind`, the dates. An
 *     erratum quotes the exact wording that was wrong. A translated quotation
 *     is no longer the quotation. The intro and the two section notes are prose
 *     and are translated; the record itself stays as it was published.
 *
 * DRAFT: written to match the English line by line. See data/hinglish/README.md.
 */

export const writingIntroHi = {
  eyebrow: 'Pichhla hissa',
  title: 'Likhaai',
  standfirst: 'Woh tukde jo poore hue, aur kahin aur chhape.',
  body: [
    'Main jo likhta hoon uska zyadatar aadha rukta hai aur waise hi reh jaata hai — Now page par uska ek dher hai, jaanbujh kar adhoora rakha gaya. Yeh woh hain jo aakhir tak pahunche aur kahin gaye.',
    'Do Bayes ke liye likhe the, unhone kaha tha. Baaki kisi ne nahi maange the.',
  ],
  note: 'Yeh sab doosron ki websites par hain. Links wahaan khulenge.',
  /** The unfinished half, at the foot of /writing. */
  unfinishedHeading: 'Jo aadhe ruk gaye, woh bhi rakhe hue hain.',
  unfinishedBody:
    'Now page par adhoori likhaai ka ek dher hai, aur har tukda theek wahaan khatam hota hai jahaan woh asal mein ruka tha. Do unmein se kuch nahi banenge.',
} as const;

export const indexIntroHi = {
  eyebrow: 'Pichhla hissa',
  title: 'Soochi',
  standfirst: 'Ismein asal mein kya hai.',
  body: [
    'Vishay-soochi aapko bataati hai ki chapters ke naam kya hain. Woh yeh nahi bataati ki ismein ek saree ki dukaan hai, ya nau saal ka emissions data, ya Brighton ka ek breakwater, ya woh wajah jiski chalte is site ka ek page sabke saamne galat hone ki ijaazat rakhta hai.',
    'Yeh doosri list hai. Agar aapke paas dopahar ki jagah nabbe second hain, toh yahaan se shuru kijiye aur seedhe us cheez par jaaiye jo aap pehchaanein.',
  ],
} as const;

export const errataIntroHi = {
  eyebrow: 'Pichhla hissa',
  title: 'Errata',
  standfirst: 'Jo baatein is record ne galat kahin.',
  body: [
    'Yahaan har page ek hi line par khatam hota hai: jab sach nahi rehta, badal diya jaata hai. Yeh chhaapna aasaan hai aur nibhaana mushkil, kyunki website theek karne ka aam tareeka yeh hai ki aap vaakya edit kar dein aur purana gayab ho jaaye — aur phir koi bata hi nahi sakta ki kaun sa page shuru se sahi tha aur kaun sa pichhle mangalwaar theek kiya gaya.',
    'Toh yeh woh list hai. Kya likha tha, ab kya likha hai, mujhe kab pata chala, aur — jo abhi neeche pade hain unke liye — mujhe kya galat pata hai aur maine theek nahi kiya.',
  ],
  openNote:
    'Pata chal gaya hai aur abhi bhi waisa hi hai. Aap jab yeh padh rahe hain, tab yeh site par galat hain.',
  correctedNote: 'Theek ho gaya. Purani wording yahin rehti hai.',
} as const;

export const notFoundHi = {
  label: '404',
  headingLead: 'Yeh panna',
  headingQuiet: 'kabhi rakha hi nahi gaya.',
  body:
    'Ya yeh hat gaya, ya yeh kabhi bas ek link tha jo maine kahin galat likh diya. Dono hota hai. Doosra mera theek karne ka kaam hai, aur uska hisaab rakhne waala panna hai',
  /** The link text inside the sentence above. */
  errataLink: 'errata ka panna',
  below: 'Jo maujood hai, woh neeche hai.',
} as const;
