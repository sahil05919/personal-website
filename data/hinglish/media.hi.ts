/**
 * Media — Hinglish.
 *
 * Parallel to data/mediaData.ts, plus the chapter header that lives in
 * components/media/MediaChapter.tsx.
 *
 * Same ids, same order, same `src`, `widthPercent`, `aspectRatio` and
 * `alignEnd` — the composition is not a language. `alt` IS translated: it is
 * prose written for somebody who cannot see the photograph, and with
 * `lang="hi-Latn"` on the document an English description would be read out in
 * the wrong voice.
 *
 * DRAFT: written to match the English line by line. See data/hinglish/README.md.
 */

import type { MediaMoment } from '@/data/mediaData';

/** The header copy, which is written into the component rather than the data. */
export const mediaChapterHi = {
  label: 'Media',
  /** Replaces the spelt-out English count ("Eight moments"). */
  count: 'Aath lamhe',
  standfirst: 'Inmein se kuch bhi record banane ke liye nahi tha. Ban gaya phir bhi.',
  thesis: 'Haazir hone ka saboot, portfolio nahi.',
};

export const mediaMomentsHi: MediaMoment[] = [
  {
    id: 'graduation',
    image: {
      src: '/images/media/graduation.jpg',
      alt: 'Bayes Business School ke bahar graduation gown mein khada hua.',
    },
    widthPercent: 100,
    aspectRatio: '4 / 3',
    caption:
      'Mahinon ki mehnat kuch second chalne par aa gayi, aur phir agla naam pukaara jaa raha tha. Intezaar hi sabse zyada tha — gown ke liye, seat ke liye, naam pukaare jaane ke liye. Ghar waale India mein the, toh gale milne ki jagah phone call thi, lekin us shaam humne theek se baat ki. Baahar ki photos hi woh hain jinpar main aaj bhi wapas jaata hoon.',
  },
  {
    id: 'middlesex',
    image: {
      src: '/images/media/middlesex.jpg',
      alt: 'Middlesex University ke finance office mein desk par, laptop khula, peechhe deewaar par university ka sign.',
    },
    widthPercent: 58,
    aspectRatio: '5 / 4',
    caption:
      'Kisi ne kabhi nahi kaha ki main taiyaar hoon. Log bas pehle sab kuch samjhaana band kar diye. Outlook, shared inbox, finance system aur do screens — tab tak yeh alag-alag cheezein lagna band ho gayi thi, aur ek aam din ki shakal lagne lagi thi. Mujhe yaad nahi kab badla. Bas yaad hai ki badal gaya tha.',
  },
  {
    id: 'london',
    image: {
      src: '/images/media/london-bridge.jpg',
      alt: 'Badli waale dopahar mein London Bridge.',
    },
    secondary: {
      src: '/images/media/notting-hill.jpg',
      alt: 'Notting Hill ki ek rangeen terraced gali.',
    },
    widthPercent: 100,
    aspectRatio: '1 / 1',
    caption:
      'Pehle main London Bridge aur Buckingham Palace gaya, jab main woh jagahein dekhna chahta tha jo filmon se pehchaanta tha. Uske baad sab kuch dheema raha — ek walking tour jahaan guide Sherlock Holmes se zyada galiyon ke baare mein bola, ek dopahar Notting Hill mein jo dekhne se zyada jeene jaisa laga. Yeh sab lagbhag akele kiya, jis raftaar par us din man tha. Mausam forecast se kam hi milta tha. Do saal ke aam mausam aur wahi Tube lines ke beech kahin, main stations ke beech Google Maps kholna band kar chuka tha — aur yeh mujhe tab pata chala jab yeh ho hi gaya tha.',
  },
  {
    id: 'ifly',
    image: {
      src: '/images/media/ifly.jpg',
      alt: 'iFLY par indoor skydiving ke dauraan hawa mein.',
    },
    widthPercent: 70,
    aspectRatio: '3 / 4',
    caption:
      'Maine sheeshe ke us taraf sabko pehle jaate dekha, aur lagta tha yeh aasaan hai — nikla nahi. Andar, hawa waisi nahi thi jaisi maine sochi thi — tairne se kam, aur zyada aisa ki hawa khud mujhe uthaa kar rakhe hue hai. Main asal mein control mein nahi tha; instructor chhote-chhote adjustments karta raha jo mujhe pata bhi nahi chalta tha ki zaroori hain. Phir, kuch second ke liye, usne chhod diya. Udne ke sabse kareeb woh hi tha. Woh mere taiyaar hone se pehle khatam ho gaya.',
  },
  {
    id: 'birthday',
    image: {
      src: '/images/media/birthday.jpg',
      alt: 'London mein birthday ki shaam, café ki table par ek chhota cake kaatte hue.',
    },
    widthPercent: 40,
    aspectRatio: '4 / 5',
    alignEnd: true,
    caption:
      'Kuch bhi plan nahi tha. Main khaana khaane bahar gaya, thodi der ghooma, kuch photos leen jo mere hisaab se maine phir dekhi bhi nahi. Subah ghar se call aayi — woh call jismein sab thoda zyada khush sunai dene ki koshish karte hain, kyunki woh khush hain, itni door se bhi. Dopahar mein kahin main ruka aur socha: aaj mera birthday hai, aur main London mein hoon. Phir main chalta raha.',
  },
  {
    id: 'oxford',
    image: {
      src: '/images/media/oxford.jpg',
      alt: 'Badle hue aasmaan ke neeche Oxford ka Radcliffe Camera.',
    },
    widthPercent: 64,
    aspectRatio: '4 / 3',
    caption:
      'Mujhe lagta tha mashhoor alumni ke baare mein sunne ko milega. Uski jagah guide darwaazon, deewaaron aur chhoti riwaayaton ke baare mein bola — woh cheezein jinke aage se aap seedhe nikal jaate, agar koi ishaara na kare. Jab bhi dhoop nikalti, patthar shahad jaisa garam rang le leta, jo meri kisi photo mein theek se nahi aaya. Main yeh sochte hue nikla ki abhi bhi kahaaniyan bachi hain jo maine suni nahi.',
  },
  {
    id: 'cambridge',
    image: {
      src: '/images/media/cambridge.jpg',
      alt: 'Peechhe ek college building ke saath River Cam.',
    },
    widthPercent: 55,
    aspectRatio: '4 / 3',
    alignEnd: true,
    caption:
      'Oxford aur Cambridge par sabki apni raay hai, toh main apni banane gaya. Har kuch minute mein cycles nikalti rahin, chup-chaap, jab tak yeh koi anokhi baat lagna band ho gaya — bas shehar ki aam raftaar. Tour ke baad main dekhne layak cheezein dhoondhna chhod kar nadi ke kinaare chalta raha. Oxford ne mujhe impress kiya tha. Cambridge aisi jagah lagi jahaan main bina kisi plan ke wapas aa sakta hoon.',
  },
  {
    id: 'brighton',
    image: {
      src: '/images/media/brighton.jpg',
      alt: 'Brighton ke breakwater par khada hua, baahein failaayi hui, door pier chhota dikhta hua.',
    },
    widthPercent: 60,
    aspectRatio: '4 / 3',
    caption:
      'Samundar se pehle hawa promenade tak pahunch gayi — lehron ki aawaaz unhein dekhne se kai minute pehle sunai deti thi. Maine saalon se us beach ki photos dekhi thi, lekin ret ki jagah patthar par khade hone ne phir bhi chauka diya. Mausam ne England se ummeed se zyada saath diya, aur main plan se zyada der ruka. London wapas ki train aane waali se zyada shaant lagi.',
  },
];
