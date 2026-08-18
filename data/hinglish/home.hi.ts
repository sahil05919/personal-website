/**
 * Home — Hinglish, plus the two pieces of sitewide furniture (the colophon and
 * the mobile index headings) that are written into components.
 *
 * Parallel to data/homeContent.ts. The title is a title and the figure caption
 * is apparatus with a real count in it, so both are translated but the count is
 * not touched. The invitation lines are QUOTATIONS of each chapter's own
 * standfirst — so each one here must be the same sentence as that chapter's
 * Hinglish standfirst, character for character, the same rule the English file
 * sets out.
 *
 * DRAFT: written to match the English line by line. See data/hinglish/README.md.
 */

export const homeContentHi = {
  eyebrow: 'Sahil Kumar — London',

  title: 'Woh cheezein jo main bhoolna nahi chahta.',

  figureCaption: 'Fig. 01 — attharah tukde, ek line mein sametey hue.',

  statement: {
    beats: [
      'Yeh shuru hua tha CV rakhne ki ek jagah ki tarah. Mujhe ek aisa page chahiye tha jo samajh mein aaye agar koi poochhe ki main karta kya hoon.',
      'Phir aisi cheezein aane lagin jinka job se koi lena-dena nahi tha. Jagahein jahaan main gaya tha, photos, jo main padh raha tha, sawaal jinke jawaab maine diye nahi the. Main phir bhi jodta raha.',
      'Aakhir mein samajh aaya ki yeh site kis liye hai. Agar yeh sab kal gayab ho jaaye, main kaam dobara bana loonga. Baaki main dobara nahi bana paaunga.',
      'Mujhe lagta hai complexity aam taur par ek bojh hai. Log complicated systems ko is baat ka saboot maan lete hain ki cheez serious hai. Maine yahaan bhi kiya hai — case files, operating systems, chapter numbers — saadi cheezon ko soch-samajh kar bani dikhaane ke liye saja diya. Jo hisse mujhe sabse achhe lagte hain, woh sabse saade hain.',
    ],
    claim: 'Main uljhi hui cheezon ko saada banata hoon.',
    coda: 'Apne hi kaam ke saath yeh karna abhi seekh raha hoon.',
  },

  /** Each line is the chapter's own Hinglish standfirst, quoted. */
  invitations: {
    '/journey': 'Kaam dekhne se pehle, main chahta hoon ki log aadmi ko samajh lein.',
    '/projects': 'Kuch ne mera peechha nahi chhoda, jab tak maine kuch bana nahi liya.',
    '/experience': 'Zyadatar maine chuna nahi tha.',
    '/media': 'Haazir hone ka saboot, portfolio nahi.',
    '/about': 'Patterns, ghatnaayein nahi.',
    '/questions': 'Agar humein ek ghanta aur mil jaata.',
    /* Deliberately empty in both readings — Now's opening line IS the season
       line, and the Currently strip below already carries it verbatim. */
    '/now': '',
    '/contact':
      'Is page se pehle sab kuch is baare mein tha ki main kaise sochta hoon aur maine kya banaya hai.',
  } as Record<string, string>,

  colophon: {
    close: 'London mein likha gaya. Jab sach nahi rehta, badal diya jaata hai.',
  },
};

/**
 * Sitewide furniture. These strings are written into components rather than a
 * data file, so they are collected here instead of being scattered across five
 * Hinglish files.
 */
export const chromeHi = {
  /** Home's contents heading, the colophon's, and the mobile index panel's. */
  contents: 'Vishay-soochi',
  currently: 'Filhaal',
  /** Prefix for the date on Home's Currently strip. */
  updated: 'Badla gaya',
  /** The colophon's standfirst, under the name. */
  imprint: 'London mein rakha gaya ek record. Jab sach nahi rehta, badal diya jaata hai.',
  backMatter: 'Pichhla hissa',
  reading: 'Padhna',
  paper: 'Kaagaz',
  /** The mobile index toggle, open and closed. */
  index: 'Soochi',
  close: 'Band',
  /** PageTurn. `backTo` is a prefix — it is followed by a chapter name. */
  next: 'Aage',
  turnsThePage: 'panna palatte hain',
  backTo: 'Wapas',
  /** Search. */
  search: 'Is record mein dhoondhiye',
  searchPlaceholder: 'Ek jagah, ek project, ek saal, ek shabd',
};
