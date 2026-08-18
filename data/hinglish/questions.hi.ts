/**
 * Questions — Hinglish.
 *
 * Parallel to data/questions-content.ts. Same ids, same order, and the six
 * unanswered questions stay unanswered — `paragraphs: null` in both readings.
 * Translating a question and then inventing an answer for it would be the one
 * thing this page cannot do.
 *
 * DRAFT: written to match the English line by line. See data/hinglish/README.md.
 */

import type { Question } from '@/data/questions-content';

/**
 * The chapter's own furniture, which lives in
 * components/questions/QuestionsExperience.tsx rather than in the data file.
 * The counts stay as digits-in-words in English in the apparatus row ("Seven
 * asked / one answered") because that row is a tally, not a sentence — only the
 * two words around it change.
 */
export const questionsChapterHi = {
  label: 'Sawaal',
  asked: 'poochhe gaye',
  answered: 'ka jawaab',
  /** Shown under a question that has been posed and not yet written. */
  pending: 'Jawaab aana baaki hai — yeh page main likhta jaa raha hoon.',
  hello: 'Hello kahiye →',
};

export const introHi =
  'Agar humein ek ghanta aur mil jaata, toh ghoom-phir kar baat inhi sawaalon par aati.';

export const closingHi = 'Poochhne ke liye shukriya.';

export const questionsHi: Question[] = [
  {
    id: 'changed-mind',
    question: 'Aisa kya hai jispar aapki raay badal gayi?',
    paragraphs: [
      'Bahut samay tak mujhe lagta tha ki khushi aisi cheez hai jo kamaani padti hai.',
      'Mujhe lagta tha ki jab mere paas kaafi paisa ho jaayega, kaafi kaamyaabi mil jaayegi, aur aas-paas ke logon ki kaafi problems solve ho jaayengi, tab main khud ko zindagi ka maza lene doonga. Us se pehle khushi ek dhyaan bhatkaane waali cheez lagti thi — aisi cheez jispar main baad mein wapas aa sakta hoon.',
      'Peechhe dekhta hoon toh samajh aata hai ki maine saalon use taal diya.',
      'Jab CAT mein mera 90th percentile aaya, mujhe woh kaamyaabi nahi lagi. Mujhe woh failure lagi, kyunki woh score nahi tha jo maine soch rakha tha. Kitna aage aa gaya hoon, iske bajaay mera poora dhyaan wahaan tha jahaan main pahunch nahi paaya.',
      'Yeh sirf padhaai ki baat nahi thi. Us soch ne chup-chaap baaki sab kuch bhi banaya.',
      'Mujhe ek birthday yaad hai, dadi ke jaane ke baad. Behen ghar par cake laayi thi. Maine kaatne se mana kar diya. Us waqt mujhe lagta tha main apne dukh ka maan rakh raha hoon. Saalon baad kuch aur samajh aaya: main khushi ke saath itna asahaj ho gaya tha ki jab woh saamne rakhi gayi tab mujhe use lena nahi aaya. Main aaj bhi sochta hoon ki us din use kaisa laga hoga.',
      'Kuch log dukh se bachte hain.',
      'Main khushi se bach raha tha.',
      'Jab zindagi ne mujhe jashn manaane ki wajahein di, tab bhi maine na manaane ki wajahein dhoondh li.',
      'Jab mujhe aisi job mili jismein pehle se kai guna zyada paisa tha, mujhe garv mehsoos nahi hua. Maine turant khud ko yakeen dila diya ki yeh phir bhi kaafi nahi hai. Jab behen aur jeeja mujhe wahaan le gaye jinke sapne main dekh chuka tha, main sharirik roop se wahaan tha aur dimaag kahin aur, is fikar mein ki jo abhi tak nahi kiya woh kya hai.',
      'Woh lamhe wahaan the.',
      'Mera dimaag hi mujhe unka maza lene nahi de raha tha.',
      'London aane se kuch badla. Akele rehne ne mujhe apne hi khayalon ke saath waqt bitaane par majboor kiya, doosron ki ummeedon se lagataar apni tulna kiye bina. Dheere-dheere main woh chhote lamhe notice karne laga jinhein pehle main nazarandaaz kar deta: kaam ke baad khud ke liye pasandeeda khaana khareedna, shehar ka koi naya hissa ghoomna, yeh website banaana — sirf isliye ki mera man tha, isliye nahi ki kisi par asar padega.',
      'In lamhon ne meri koi problem hal nahi ki.',
      'Lekin unhone yaad dilaaya ki zindagi kaamyaabi ke aakhir mein mera intezaar nahi kar rahi thi. Woh us waqt chal rahi thi jab main uske peechhe bhaag raha tha.',
      'Paisa aaj bhi maayne rakhta hai. Woh suraksha deta hai, mauke banata hai, aur kai asli problems hataa deta hai. Main aisa dikhaawa nahi karta ki nahi.',
      'Meri raay us cheez par badli hai jo iske baad aati hai.',
      'Mujhe ab yeh nahi lagta ki khushi tab aati hai jab aapne kaafi kamaa liya, kaafi kar liya, ya kaafi ban gaye.',
      'Mujhe lagta hai khushi aisi cheez hai jiska abhyaas aapko us waqt karna padta hai jab aap ban hi rahe hote hain.',
      'Main abhi bhi yeh seekh raha hoon. Kuch din main purani aadaton mein wapas chala jaata hoon. Lekin ab, jab kuch accha hota hai — kuch chhota bhi — main rukne, use notice karne aur khud ko uska maza lene dene ki koshish karta hoon.',
      'Kyunki peechhe dekhta hoon toh mujhe nahi lagta ki meri zindagi mein khushi nahi thi.',
      'Mujhe lagta hai main uske aage se nikalta raha, kyunki mujhe yakeen tha ki maine use abhi kamaaya nahi hai.',
    ],
  },
  {
    id: 'no-longer-prove',
    question: 'Ab kya saabit karne ki zaroorat mehsoos nahi hoti?',
    paragraphs: null,
  },
  {
    id: 'nobody-expecting',
    question: 'Jab kisi ko aapse kuch nahi chahiye, tab aap kaun hote hain?',
    paragraphs: null,
  },
  {
    id: 'careful-not-to-lose',
    question: 'Apne kis hisse ko kho dene se aap sabse zyada bachte hain?',
    paragraphs: null,
  },
  {
    id: 'enough',
    question: 'Kaisi zindagi kaafi lagegi?',
    paragraphs: null,
  },
  {
    id: 'still-figuring-out',
    question: 'Aap abhi bhi kya samajhne ki koshish kar rahe hain?',
    paragraphs: null,
  },
  {
    id: 'quiet-theme',
    question: 'Agar aapki zindagi ka ek chup-chaap theme hota, toh aap kya chahte ki woh ho?',
    paragraphs: null,
  },
];
