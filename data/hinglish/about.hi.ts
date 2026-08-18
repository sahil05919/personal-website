/**
 * About — Hinglish.
 *
 * Parallel to data/profileContent.ts. The essay is translated; the front matter,
 * the marginalia labels and the revision stamp are apparatus and stay English
 * (README rule 3). `mode` and `note` positions are identical, so the drop cap,
 * the display break, the stanza and the turn all land in the same places.
 *
 * DRAFT: written to match the English line by line. See data/hinglish/README.md.
 */

import type { EssayParagraph } from '@/data/profileContent';

export const aboutTitleHi = {
  lead: 'Patterns,',
  quiet: 'ghatnaayein nahi.',
};

export const aboutRevisionHi = {
  stamp: 'Pehla version',
  date: 'August 2026',
  promise:
    'Jab yeh sach nahi rehta, main is page ko dobara likhta hoon. Purane version rehte hain.',
};

export const aboutEssayHi: {
  opening: EssayParagraph[];
  coda: EssayParagraph[];
} = {
  opening: [
    {
      mode: 'body',
      note: 'I — Ek khaali din',
      text: 'Agar mere paas poora khaali din ho, toh main shayad apna kamra theek karne se shuru karoonga.',
    },
    {
      mode: 'body',
      text: 'Aisa nahi hai ki mujhe safai pasand hai. Mujhe sochne mein aasaani hoti hai jab aas-paas ki cheezein settle ho jaati hain. Jab tak kamra theek hota hai, tab tak dimaag bhi ho jaata hai. Uske baad main koi shuru ki hui cheez aage badhaaunga, kahin aisi jagah nikal jaaunga jahaan pehle kabhi nahi gaya, ya kisi aise khayal mein ghus jaaunga jo kuch dinon se dimaag ke peechhe chup-chaap baitha hai. Ismein bahut kam kuch planned hota hai. Bas jab koi mujhse kuch nahi maang raha hota, main aise hi waqt bitaata hoon.',
    },
    {
      mode: 'body',
      text: 'Log mere paas aise problems lekar aate hain jinka ek doosre se koi rishta nahi hota. Ek dost ko laptop chunne mein madad chahiye. Doosre ko ek financial decision par baat karni hai. Kisi teesre ko bas yeh chahiye ki thodi der koi uske saath sochta rahe. Subject badalta rehta hai. Kaam nahi badalta. Mujhe jaldi jawaab dene ki zaroorat kam hi mehsoos hoti hai. Mujhe cheezein sulajhaana pasand hai, jab tak woh samajh mein na aa jaayein.',
    },
    {
      mode: 'break',
      text: 'Maine ek financial dashboard banaya kyunki main andaaza lagane ke bajaay yeh jaanna chahta tha ki main kahaan khada hoon. Kaam par, mujhe aam taur par ek aur step jodne se zyada dilchaspi us step mein hoti hai jo hata sakta hai. Mere liye clarity, certainty se zyada maayne rakhti hai. Kisi problem ke saath zyada der baithne mein mujhe dikkat nahi hoti, agar lag raha ho ki main dheere-dheere use samajh raha hoon.',
    },
    {
      mode: 'display',
      note: 'II — Dhyaan',
      text: 'Mera dhyaan sabse pehle us cheez par jaata hai jo adhoori hai, us cheez par nahi jo pehle se chal rahi hai.',
    },
    {
      mode: 'body',
      text: 'Jab kisi cheez ko sach mein theek karne ki zaroorat ho, tab yeh kaam ka hai. Iska matlab yeh bhi hai ki main apni achievements ke saath zyada der nahi rukta, main pehle hi dekh raha hota hoon ki kya behtar ho sakta hai. Mera dhyaan hamesha adhoore siron ki taraf bhatakta raha hai.',
    },
    {
      mode: 'body',
      text: 'Agar ek paragraph teen din mere saath reh jaata hai, toh ek kitaab khatam karne mein teen hafte lagne se mujhe koi dikkat nahi.',
    },
    {
      mode: 'body',
      note: 'III — Log',
      text: 'Log aam taur par maan lete hain ki main jitna hoon usse zyada chup hoon. Kisi baatcheet ke beech mein kahin main aisa mazaak kar deta hoon jo theek sahi waqt par aata hai. Meri kuch sabse pasandeeda shaamein woh hain jinmein sab bhool jaate hain ki kitna baj gaya, kyunki baat naye-naye raaste dhoondhti rehti hai — ya kyunki ek accha mazaak har baar dohraane par aur funny hota jaata hai.',
    },
    {
      mode: 'close',
      text: 'Main kisi shehar ko aam taur par ek khaane se aur un logon se yaad rakh paata hoon jinke saath woh khaaya tha.',
    },
  ],
  coda: [
    {
      mode: 'stanza',
      note: 'IV — Optimisation',
      text: 'Main kaam optimise karta hoon.\nMain projects optimise karta hoon.\nMain faisle optimise karta hoon.\nMain apna waqt, apne notes aur kabhi apne weekends tak optimise karta hoon.',
    },
    {
      mode: 'turn',
      text: 'Apne parivaar ke saath maine yeh kabhi nahi kiya.',
    },
    {
      mode: 'body',
      text: 'Unse roz baat karna aisi cheez nahi hai jise maine schedule kiya ho, naapa ho, ya aadat banaya ho. Maine kabhi asal mein yeh faisla bhi nahi liya ki karna hai.',
    },
    {
      mode: 'close',
      text: 'Yeh bas kabhi aisi cheez nahi rahi jispar maine khud se mol-bhaav kiya ho.',
    },
  ],
};

export const aboutExitHi = {
  eyebrow: 'Next',
  heading: 'Har aadmi ki ek kahaani hoti hai.',
  headingQuiet: 'Yeh meri hai.',
  blurb:
    'Haryana mein bada hona, woh saal jinhone raasta badla, aur ek cheez doosri kaise ban gayi.',
  action: 'Panna palatiye',
};
