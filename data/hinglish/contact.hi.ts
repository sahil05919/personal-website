/**
 * Contact — Hinglish.
 *
 * Parallel to data/contactData.ts. `contactInfo` is NOT duplicated: an email
 * address, a WhatsApp link and a filename are not language, and copying them
 * would create a second place for them to go stale. Only `contactContent` has a
 * Hinglish twin, and the email row's `title` still resolves to the address
 * itself from the English object.
 *
 * `mark`, `href`, `external` and the platform `label`s (Email, LinkedIn,
 * WhatsApp, Instagram, GitHub) stay English — a logo's accessible name is the
 * platform's own name in every language.
 *
 * DRAFT: written to match the English line by line. See data/hinglish/README.md.
 */

import { contactInfo, type ContactContent } from '@/data/contactData';

export const contactContentHi: ContactContent = {
  meta: {
    title: 'Contact',
    description:
      'Record ka aakhir. Mujhe kahaan dhoondhna hai, aur ek aakhri cheez saath le jaane ke liye.',
  },

  hero: {
    eyebrow: 'Endpaper',
    headline: 'Jawaab likhiye.',
    body: [
      'Aap record ke aakhir tak pahunch gaye. Agar ismein kisi cheez ne aapka dhyaan kheencha, toh mujhe khushi hai ki aap ruke.',
      'Mujhe dhoondhne ke kuch tareeke hain. Kaun sa, yeh is baat par hai ki aap kyun likh rahe hain.',
    ],
  },

  groups: [
    {
      eyebrow: 'Kaam ke liye',
      line: 'Koi mauka, koi project, ya aisi cheez jo milkar banaane laayak ho. Email mujhe sabse pehle milti hai aur main saari padhta hoon.',
      channels: [
        {
          mark: 'email',
          label: 'Email',
          title: contactInfo.email,
          href: `mailto:${contactInfo.email}?subject=Connecting%20from%20your%20website`,
          ariaSuffix: 'Email bhejiye',
        },
        {
          mark: 'linkedin',
          label: 'LinkedIn',
          title: 'Jahaan kaam ka record aaj tak ka rehta hai',
          href: contactInfo.linkedin,
          external: true,
        },
      ],
    },
    {
      eyebrow: 'Baaki sab ke liye',
      line: 'Koi khayal, koi sawaal, ya yahaan ki koi baat jo padhi aur aapko theek nahi lagi.',
      channels: [
        {
          mark: 'whatsapp',
          label: 'WhatsApp',
          title: 'Mujhe message bhejiye',
          href: contactInfo.whatsapp,
          external: true,
        },
        {
          mark: 'instagram',
          label: 'Instagram',
          title: 'Dekhiye main kya notice kar raha hoon',
          href: contactInfo.instagram,
          external: true,
        },
        {
          mark: 'github',
          label: 'GitHub',
          title: 'Dekhiye main kya bana raha hoon',
          href: contactInfo.github,
          external: true,
        },
      ],
    },
  ],

  apparatus: {
    cvLabel: 'CV download kijiye',
    cvNote: 'PDF · ek page · is record ki professional reedh',
  },

  unsigned: {
    eyebrow: 'Bina naam',
    heading: 'Ya bina yeh bataaye kahiye ki aap kaun hain.',
    line: 'Mujh tak pahunchne ka har doosra raasta aapke naam ke saath aata hai. Yeh nahi aata. Kuch store nahi hota, kuch log nahi hota, aur yeh bina kisi pate ke pahunchta hai — toh agar aapko mujhe kuch aisa kehna hai jispar aap apna naam nahi lagaayenge, yeh uske liye hi darwaaza hai.',
    messageLabel: 'Aapka message',
    messagePlaceholder: 'Yahaan likhiye.',
    replyLabel: 'Jawaab dene ka koi tareeka',
    replyHint:
      'Optional, aur is page par ek hi cheez hai jo aapki pehchaan bataayegi. Khaali chhod dijiye aur mere paas jawaab likhne ka koi raasta nahi hoga — aur yeh chunna bilkul theek hai.',
    action: 'Bhejiye',
    sending: 'Bhej raha hoon',
    sentHeading: 'Bhej diya.',
    sentLine:
      'Yeh mujh tak bina naam ke pahunch gaya. Main yeh sab padhta hoon, aur mujhe hamesha pata nahi hota kise shukriya kehna hai — toh: shukriya.',
    again: 'Ek aur bhejiye',
    failure:
      'Yeh bheja nahi gaya, aur main aapko bataana behtar samajhta hoon bajaay dikhaawa karne ke. Thodi der mein phir koshish kijiye, ya upar ke kisi darwaaze se aaiye.',
    unconfigured:
      'Yeh abhi juda nahi hai — main yeh keh dena behtar samajhta hoon bajaay ek aisa box dene ke jo aapka likha nigal jaaye. Jab tak juda nahi hai, sabse kareeb cheez hai',
  },

  walk: {
    eyebrow: 'Aamne-saamne',
    lines: [
      'Agar aap theek se baat karna chahein, toh message kijiye. Coffee chalegi.',
      'Lambi walk bhi — London paidal chalte hue khud ko behtar samjhaata hai, aur maine dekha hai ki zyadatar log bhi.',
    ],
  },

  lastNote: {
    eyebrow: 'Jaane se pehle',
    prompt: 'Ek aakhri cheez hai jo main chahta hoon aap saath le jaayein.',
    action: 'Padhiye',
    lines: [
      'Main desh badal kar aaya, yeh soch kar ki yeh ek faisle jaisa lagega. Zyadatar yeh ek mangalwaar jaisa laga.',
      'Aaj main jo kuch jaanta hoon, woh lagbhag poora us waqt aaya jab main kisi aur cheez mein laga tha. Mujhe der se pata chala, ya bilkul nahi.',
      'Mujhe aaj bhi nahi pata yeh sab kis taraf jaa raha hai. Shuru karne se pehle yeh jaanne ki zaroorat mujhe ab nahi rehti.',
      'Agar yahaan ki koi ek baat aapke saath reh jaaye, toh yeh rahe: woh number jo milta nahi hai, likh lene laayak hai — aur woh dopahar bhi, jiski photo lene ka khayaal aapko aaya hi nahi.',
    ],
  },

  close: {
    signature: 'Sahil Kumar',
    place: 'London.',
    returnLabel: 'Shuruaat par wapas',
  },
};
