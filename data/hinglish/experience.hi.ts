/**
 * Experience — Hinglish.
 *
 * Parallel to app/experience/experience-content.ts. The longest chapter on the
 * site, and the one where the second language does the most work: the saree shop
 * happened in Hindi, so this is closer to the original than the English is.
 *
 * Same ids, same order, same `tier`, `year`, `organisation` and `place`. The
 * `attribution` line under each entry stays English — it is a citation, printed
 * the way a caption is printed, and the ledger `figure`s and `scale`s are
 * numbers and typography rather than language.
 *
 * DRAFT: written to match the English line by line. See data/hinglish/README.md.
 */

import type {
  ExperienceEntry,
  LedgerRow,
} from '@/app/experience/experience-content';

export const chapterLabelHi = 'Experience';
export const standfirstHi = 'Zyadatar maine chuna nahi tha.';

export const ledgerHi: LedgerRow[] = [
  { figure: '40', gloss: 'sarees ek sale ke liye khuli, aur baad mein wapas moodi gayin', scale: 56, scaleMobile: 34 },
  { figure: '30', gloss: 'kilometre — shaadi se pehle ka wholesale ka daayra', scale: 34, scaleMobile: 24 },
  { figure: '8', gloss: 'ghante hafte ke wapas mile, Excel mein, kyunki software ke paise lagte the', scale: 44, scaleMobile: 28 },
  { figure: '10,000', gloss: 'sensor records saaf kiye, pehla chart banne se pehle', scale: 38, scaleMobile: 26 },
  { figure: '35', gloss: 'assignments, aath departments, atthaarah mahine', scale: 48, scaleMobile: 30 },
  { figure: '50–70', gloss: 'invoices ek din mein, har ek ke peechhe koi paise ka intezaar karta hua', scale: 30, scaleMobile: 22 },
];

export const hingeHi = {
  after: 'enhanceer',
  line: 'May 2024 tak main tay kar chuka tha ki Bayes mein apply karoonga.',
};

export const prologueHi: ExperienceEntry = {
  id: 'pooja-saree-centre',
  title: 'Pooja Saree Centre',
  tier: 'turn',
  body: [
    'Dukaan Mahendragarh ki main market road par hai. Sankri hai aur andar tak lambi jaati hai. Pehli cheez jo dikhti hai woh dono taraf chhat tak lagi sarees ka dher hai, aur phir farsh par bichhi safed gaddiyan — kyunki customer ghoom kar dekhte nahi hain, woh baithte hain, aur cheezein unke saamne ek ke baad ek kholi jaati hain. Papa ki kursi aage counter ke paas hai, calculator, receipt book aur telephone haath ki pahunch mein. Roshni zyadatar tube light ki hai. Din ki roshni sirf kuch feet andar aati hai.',
    'Dukaan papa ne shuru ki thi. Main lagbhag 2011 se madad karne laga, jab main terah saal ka tha, halaanki judne ka koi ek pal nahi tha. Shaam ko parivaar wahin hota tha, bas.',
    'Pehla kaam mujhe milaa woh moodna tha. Ek customer baithti hai, uske liye chalis-pachaas sarees kholi jaati hain, phir woh ek khareedti hai ya ek bhi nahi — aur un sab ko wapas jaana hota hai, sahi tareeke se moodi, theek se seedhi, wahin par jahaan se aayi thi. Ismein ek sahi tareeka hota hai aur main bahut samay tak galat karta raha. Yeh kuch bhi nahi lagta, jab tak aap khud yeh nahi kar rahe hote. Do saal tak mera itna hi hissa tha: moodna, stock uthaana, cheezein wapas rakhna, aur papa ko logon ke saath dekhna.',
    'Hum retail ke saath wholesale bhi karte the. Lagbhag tees kilometre ke daayre ke kasbon se dukaandaar aate the, khaaskar shaadiyon se pehle, aur woh maatra mein khareedte the. Season mein dukaan raat tak khuli rehti hai, ek parivaar ke jaane aur doosre ke aane ke beech koi khaali waqt nahi hota, aur khaana dukaan par aata hai kyunki ghar jaakar khaane ka waqt kisi ke paas nahi hota. Sab kaam karte hain. Bada hone par main sirf moodna chhod kar collections nikaalne laga, stock chalta rakhne laga, aur jab koi khaali nahi hota tha tab customers dekhne laga.',
    'Yeh badlaav dheere-dheere hua aur main aapko nahi bata sakta ki kab. Papa kisi ke saath hote, doosra customer aa jaata, aur woh mujhse keh dete ki dekh lo. Phir yeh anokha lagna band ho gaya. Maine galtiyan ki — mujhe kapdon ke baare mein itna pata nahi tha, main aatmvishwaas se jawaab nahi de paata tha, aur zaroorat se zyada baar papa ko bulaane jaata tha. Wholesale khareedne waale sabse mushkil the. Unmein se kai us dhandhe mein mere paida hone se pehle se the aur daam aur quality mujhse behtar jaante the. Koi mujhe seriously nahi leta tha kyunki main dukaandaar ka beta tha. Unhone mujhe tab seriously liya jab main theek se jawaab dene laga aur har kuch minute papa ko bulaane jaana band ho gaya — aur ismein mahine nahi, saal lage.',
    'Us dukaan mein maine zyadatar unhein kaam karte hue dekha. Unka koi ek tareeka nahi tha. Woh saamne waale ko padhte the aur khud ko badal lete the — kuch log pehle ek ghanta baat karna chaahte the, kuch daam chaahte the, kuch mol-bhaav karna chaahte the aur kuch ko mol-bhaav asahaj lagta tha. Chai ya paani kabhi technique nahi thi; woh bas woh hai jo aap karte hain jab koi doosre shehar se gaadi chala kar aaya ho. Jo nahi badalta tha woh daam tha. Woh khareedne mein sakht the — stock ke liye Surat, Delhi, Ludhiana aur Amritsar jaate the aur wahaan aise mol-bhaav karte the jaise yeh unka kaam hai, kyunki tha. Lekin apni dukaan mein woh sabse ek hi daam lete the, is hisaab se nahi ki saamne waala kitna de sakta hai.',
    'Maine unse koi vaakya nahi seekha. Maine yeh seekha ki kisi ki problem hal karne se pehle aap us aadmi ke baare mein pata karte hain — aur mujhe yeh saalon baad pata chala ki main aisa kar raha hoon, ek recruitment call mein aur ek student ko bheje message mein jise main kabhi mila hi nahi.',
  ],
  attribution: 'Pooja Saree Centre, Mahendragarh — since 2011.',
};

export const entriesHi: ExperienceEntry[] = [
  {
    id: 'jay-bharat-maruti',
    title: 'Iska aakaar',
    tier: 'plain',
    year: '2018',
    body: [
      'Ek auto-components manufacturer ke HR department mein teen mahine, BBA ke through. Attendance systems, employee records, training aur development, DOJO room mein waqt. Zyadatar desk ka kaam, halaanki offices aur plant itne paas the ki dikh jaata tha ki ek doosre ko kaise chalaata hai.',
      'Main bees saal ka tha, aur tab tak maine sirf ek chhote dhandhe ko andar se dekha tha. Jo maine notice kiya woh iska aakaar tha — aise departments jo mukhya roop se doosre departments se baat karne ke liye maujood the, aise processes jo likhe gaye kyunki bahut se logon ko unka ek jaisa hona zaroori tha. Un teen mahinon mein mere saath khaas kuch nahi hua. Maine woh yeh samajhne mein bitaaye ki aisi jagah ke peechhe kuch bhi banne se pehle kitna taal-mel chalta hai.',
    ],
    attribution: 'Jay Bharat Maruti, Gurgaon, 2018.',
  },
  {
    id: 'ludifu-greenthusiast',
    title: 'Sab kuch ek kamre se',
    tier: 'turn',
    year: '2020',
    organisation: 'LUDIFU and Greenthusiast',
    place: 'Remote',
    gloss: 'Jo aaya, maine haan keh diya.',
    body: [
      'Ek saath teen roles, sab remote, sab Mahendragarh mein apne bedroom se. Yeh pehla saal tha jab mere paas apna laptop tha aur pehli baar main online kaam kar raha tha.',
      'Yeh jaanbujh kar tha. Us saal sab kuch anishchit tha, toh maine tay kiya ki sahi cheez ka intezaar karne se experience zyada maayne rakhta hai, aur jo aaya usmein haan keh di. Do internships poori garmi overlap karti rahin. October mein LUDIFU ne mujhse HR manager ka kaam sambhaalne ko kaha — promotion se kam, aur is baat ka nateeja zyada ki doosre log jaane ke baad bhi main wahin tha.',
      'Mujhe sau logon waali ek NGO ke liye standard operating procedures likhne mein madad karne ko kaha gaya. Maine kabhi ek bhi nahi likhi thi aur mujhe yeh shabd ka matlab bhi nahi pata tha. Maine pata kiya, phir likh di.',
      'Tab AI nahi tha, toh yeh sab haath se hua — documents, trackers, forms, slides. Us saal maine Word aur PowerPoint theek se seekhe, kyunki kuch bhi banaane ka doosra raasta nahi tha.',
      'Mujhe yeh yaad hai ki jaanne waale zyadatar log kaam kho rahe the aur mere paas pehle se zyada kaam tha. Maine un logon ko onboard kiya jinse main kabhi mila nahi, ek bedroom se, aur us waqt yeh bilkul aam lagta tha.',
    ],
    attribution: 'LUDIFU and Greenthusiast Foundation, remote, 2020.',
  },
  {
    id: 'hr-success-talk',
    title: 'Ek khaas cheez',
    tier: 'turn',
    year: '2021–2022',
    organisation: 'HR Success Talk',
    place: 'Remote',
    gloss: 'Lagataar bana rehna prerna se zyada maayne rakhta hai.',
    body: [
      'HR Success Talk company se zyada HR professionals ki ek community thi, aur main tab juda jab main apna MBA khatam kar raha tha. Chaudah mahine social accounts chalaaye aur events kiye, aur ek baar Naukri par ek training session diya un logon ke kamre mein jo HR mere use padhne se zyada samay se kar rahe the.',
      'Main baais saal ka tha aur ismein nervous tha, jab tak shuru nahi hua. Woh yeh pata karne nahi aaye the ki main expert hoon ya nahi. Woh ek tool seekhne aaye the, aur woh mujhe aata tha. Yeh us se sankri kism ki upyogita hai jitni main maan kar chalta tha ki chahiye hoti hai — aur uske baad mujhse jo bhi maanga gaya, usmein zyadatar par yeh sach nikla.',
      'Account ke liye likhne ne doosri cheez sikhaayi. Lagataar bana rehna prerna se zyada maayne rakhta hai. Kisi ko accha post yaad nahi rehta; log chuppi notice karte hain.',
    ],
    attribution: 'HR Success Talk, remote, 2021–2022.',
  },
  {
    id: 'solutiontech-hr',
    title: 'Jahaan do cheezein milti hain',
    tier: 'turn',
    year: '2021–2023',
    organisation: 'SolutionTech HR',
    place: 'Gurugram',
    gloss: 'Naa kehna hi recruitment ka zyadatar hissa hai.',
    body: [
      'Meri pehli full-time job, aur maine woh Mahendragarh chhode bina ki. Company Gurugram mein thi aur kaam hybrid tha, toh main ghar par raha. Pehli baar mera hafta university ki deadlines ke alawa kisi aur cheez se bana.',
      'SaaS aur PaaS clients ke liye recruitment. Sourcing, screening, interviews ka taal-mel, pipelines chalti rakhna, hafte ki calls is baare mein ki client ko kya chahiye aur hum kitne kareeb hain. Do saal mein do promotions, toh doosre saal tak main apne accounts khud chala raha tha aur clients se seedhe baat kar raha tha. Aakhir mein ek award bhi mila, star performer of the year, jo mukhya roop se isliye maayne rakhta tha kyunki pehli baar kisi ne khul kar kaha ki do saal lagataar aana notice kiya gaya hai.',
      'Kaam khud batana mushkil hai. Meri screen par har CV kisi ki ambition thi, likhi hui aur ummeed ke saath bheji hui. Client ka har brief ek business problem tha, requirements ki bhaasha mein likha hua. Kaam yeh tha ki woh sankri jagah dhoondhi jaaye jahaan yeh dono milte hain, aur zyadatar waqt aisi jagah hoti hi nahi thi. Naa kehna hi recruitment ka zyadatar hissa hai. Mujhe waqt laga rejection ko aadmi par faisla padhna band karne mein — aam taur par iska matlab tha ki jo woh chahte the aur jo zaroorat thi, unki shakal nahi mili, aur yeh kisi ke galat hone jaisi baat nahi hai.',
      'Maine analyst banne ka faisla nahi kiya. Yeh isse dheema tha. Maine do saal recruitment data ke andar bitaaye — funnel stages, time-to-hire, cohort reports, wahi aankde har hafte aate hue — aur dheere-dheere paaya ki mujhe placement se zyada dilchaspi is baat mein hai ki pattern kya dikha raha hai. Us waqt maine iske baare mein kuch nahi kiya. Bas notice kiya ki main CVs se zyada dhyaan se reports padh raha hoon.',
    ],
    attribution: 'SolutionTech HR, Gurugram, 2021–2023.',
  },
  {
    id: 'enhanceer',
    title: 'Ek Saturday ka kaam',
    tier: 'turn',
    year: '2023–2024',
    organisation: 'Enhanceer',
    place: 'Ahmedabad',
    gloss: 'Yeh job mujhe ek Saturday ki wajah se mili.',
    body: [
      'Yeh job mujhe ek Saturday ki wajah se mili. SolutionTech mein rehte hue main weekends par freelance recruitment ka kaam leta tha, aur unmein se ek placement Ahmedabad ki ek company ke liye tha. Woh accha gaya aur mujhe uska bonus mila. Kuch samay baad us dhandhe ke peechhe ke log apni company shuru ki aur poochha ki main unke saath aana chahta hoon kya. Meri zindagi ka ek saal ek weekend par kiye gaye ek acche kaam se aaya, un logon ke liye jinhein impress karne ki mere paas koi khaas wajah nahi thi.',
      'Main recruiter ke taur par juda. Company chhoti thi aur badh rahi thi, jiska matlab tha ki role wahi hai jo karna zaroori ho — aur kuch mahinon mein main reporting aur operational data ka bhi zimmedaar tha. Doosra title baad mein aaya, us kaam ko naam dene ke liye jo main pehle se kar raha tha.',
      'Technical hissa yahaan se shuru hua. SQL maine yahaan seekha, theek se, pehli baar — Power BI aur Power Query ke saath. Kisi course se nahi. Sab isliye ki mangalwaar tak kisi cheez ka hona zaroori tha aur banane waala koi doosra nahi tha.',
      'Sabse acchi yaad tracker ki hai. Candidate tracking haath se ho rahi thi — alag-alag spreadsheets, statuses jo purane pad jaate the, aur ek weekly report jo aise files se joddi jaati thi jo ek doosre se mel nahi khaati thi. Theek recruitment software ke paise us aakaar ki company ke paas nahi the. Toh maine Excel mein aisi cheez banaayi jo applicant tracking system jaise chalti thi, kyunki Excel ke paise pehle se diye hue the. Isne hafte mein lagbhag aath ghante ka haath ka kaam nikaal diya, aur isse zyada kaam ki baat yeh thi ki weekly report ka dobara jodna band ho gaya.',
      'May 2024 tak main tay kar chuka tha ki Bayes mein apply karoonga. Founders ko pata tha, humne khul kar baat ki, aur jab main nikla toh announce karne jaisa kuch nahi tha. Chhoti company thi aur wahaan kisi se kuch chhupaana kabhi mumkin hi nahi raha.',
    ],
    attribution: 'Enhanceer, Ahmedabad, 2023–2024.',
  },
  {
    id: 'bayes-analytics-society',
    title: 'Zyadatar emails',
    tier: 'turn',
    year: '2024–2025',
    organisation: 'Bayes Business School',
    place: 'London',
    gloss: 'Maine emails phir bhi likhi, aur uske baad follow-ups bhi.',
    body: [
      'Society ne mujhe president banane se pehle saath se zyada applications aur ek interview liya tha, jiska zikr main mukhya roop se isliye kar raha hoon ki jab maine apply kiya tab main is desh mein lagbhag ek mahine ka tha.',
      'Maine chhe logon ki committee chalaayi, har ek ka apna hissa — marketing, finance, operations, communications — aur mera kaam zyadatar unhein ek hi taraf rakhna tha. Saal mein humne chaar events kiye, jinmein ek flagship data science aur analytics session tha, aur main society ke accounts aur faculty aur speakers ke rishte dekhta tha.',
      'Events mushkil hissa nahi the. Mushkil hissa un logon ko likhna tha jinse main kabhi mila nahi tha, London bhar ki companies mein, apna parichay dete hue aur poochhte hue ki kya woh aakar ek aisi society se baat karenge jismein main khud haal hi mein juda tha. Mere paas unhein dene ke liye koi hasiyat nahi thi aur dikhaane ke liye kuch nahi. Maine emails phir bhi likhi, aur uske baad follow-ups bhi, aur yeh woh hissa hai jiske baare mein koi pehle se nahi bataata.',
      'Saal zyadatar isi ka bana tha. Emails bhejna, jawaabon ke peechhe lagna, rooms confirm karna, chhe logon ko batana ki mangalwaar se kya badla hai, aur yeh pakka karna ki us raat cheez asal mein ho jaaye. Zimmedaari us shabd se kai guna zyada aam nikli jitna woh sunai deti hai.',
    ],
    attribution: 'Bayes Business Analytics Society, London, 2024–2025.',
  },
  {
    id: 'rauha',
    title: 'Chart se pehle',
    tier: 'turn',
    year: '2024',
    organisation: 'Rauha',
    place: 'London',
    gloss: 'Dashboard woh hissa tha jo kisi ne dekha.',
    body: [
      'UK mein mera pehla tankhaah waala kaam, aane ke teen mahine baad. Ek chhota startup jo IoT sensor data par kaam kar raha tha, aur ek project jiska ant tay tha: use saaf karo, dhaancha do, padhne laayak banao.',
      'Data kaccha aaya. Kisi bhi dashboard se pehle das hazaar se zyada sensor records jaanchne, theek karne aur jamaane the, aur usmein mera zyadatar waqt gaya. Dashboard woh hissa tha jo kisi ne dekha. Taiyaari kaam thi.',
      'Chhoti company thi, toh main seedhe CEO aur CTO ko report karta tha, jo sunne mein us se zyada bada lagta hai jitna tha — report karne ke liye koi doosra hi nahi tha. Shuru mein yeh dara dene waala tha, ek aise desh mein teen mahine, jise main abhi seekh raha tha. Yeh woh sabse chhoti doori bhi thi jispar maine kabhi kaam kiya hai — analysis khatam hone aur uski wajah se kisi ke faisla lene ke beech.',
    ],
    attribution: 'Rauha, London, 2024.',
  },
  {
    id: 'student-ambassador',
    title: 'Teen mahine aage',
    tier: 'turn',
    year: '2024–2025',
    organisation: 'Bayes Business School',
    place: 'London',
    gloss: 'Main poochhne waalon se teen mahine aage tha.',
    body: [
      'University mujhe un logon ke sawaalon ke jawaab dene ke paise deti thi jo tay kar rahe the ki aana hai ya nahi. Zyadatar international students the, bahut se India se, aur unke sawaalon mein lagbhag koi bhi course ke baare mein nahi tha.',
      'Woh jaanna chaahte the ki London mein asal mein kitna kharch hota hai. Shuruaat mein akelapan lagta hai kya. Part-time kaam milna kitna mushkil hai. Degree iske laayak hai kya. Aur aakhir mein job milegi kya.',
      'Aakhri sawaal mushkil tha, kyunki sachcha jawaab hai nahi, apne aap nahi — aur mujhe wahi sansthan paise de raha tha jise woh bahut bada paisa dene par vichaar kar rahe the. Maine shuru mein hi tay kar liya ki main phir bhi sach bolunga. Bayes bahut acchha school hai, aur London mehnga hai aur pehle kuch mahine bhaari padta hai, aur yeh dono ek hi waqt par sach hain. Jab koi baad ke kaam ke baare mein poochhta, main bata deta ki kya taiyaari aur mehnat par hai aur kya unpar bilkul nahi hai.',
      'Main poochhne waalon se teen mahine aage tha. Poori qualification yahi thi, aur yeh kaafi nikli.',
    ],
    attribution: 'Bayes Business School, London, 2024–2025.',
  },
  {
    id: 'st-lukes',
    title: 'Hafte mein ek baar',
    tier: 'turn',
    year: '2025–present',
    organisation: "St Luke's",
    place: 'London',
    gloss: 'Us kamre mein baaki kisi cheez ka zikr karne laayak nahi hai.',
    body: [
      'Maine yahaan pehle saal se volunteering shuru ki, kyunki main London mein sirf ek student ki tarah nahi rehna chahta tha, aur uske baad se hafte mein ek baar jaata hoon.',
      'Baby bank un parivaaron ki madad karta hai jinke chhote bachche hain aur jinhein cheezein jutaane mein madad chahiye. Har hafte alag parivaar, alag volunteers, ek kamra jo bina kabhi bhaagam-bhaag ke bhi bhara rehta hai. Main logon ka swaagat karta hoon, samjhaata hoon ki yeh kaise chalta hai, daan mein aaye kapde aur zaroori cheezein chhaantta hoon, aur care packages banata hoon.',
      'Main stationery bhi dekhta hoon, jiska matlab hai bachchon ko apni chunne mein madad karna. Woh hafte ka mera sabse pasandeeda hissa hai aur main aaj tak theek se nahi bata paaya ki kyun.',
      'Ismein kuch bhi mushkil nahi hai. Yeh chhote-chhote kaamon ki ek badi ginti hai jo kisi ka hafta thoda aasaan kar deti hai, un logon dwaara kiye gaye jinhein zyadatar ek doosre ke naam bhi nahi pata.',
      'Wahaan kisi ko nahi pata ki maine kya padha hai ya baaki waqt main kahaan kaam karta hoon. Unke liye main ek aur volunteer hoon jo usi din aata hai. Yeh mujhe ummeed se zyada accha lagta hai. Us kamre mein baaki kisi cheez ka zikr karne laayak nahi hai.',
    ],
    attribution:
      "St Luke's Community Centre & Children's Baby Bank, London, 2025–present.",
  },
  {
    id: 'unitemps',
    title: 'Paintees pehle din',
    tier: 'turn',
    year: '2024–2026',
    organisation: 'Unitemps',
    place: 'London',
    gloss: 'Paintees pehle din, ek ke baad ek.',
    body: [
      'Unitemps university ki apni temping agency hai aur woh andar ke job board ki tarah chalti hai. Roles post hote hain, aap CV aur covering letter ke saath apply karte hain, kabhi interview bhi hota hai. Har assignment ek chhoti application hai. Lagbhag atthaarah mahinon mein maine unmein se karib paintees kiye, aath departments mein.',
      'Shuruaat paise se hui. Padhte hue mujhe tankhaah waala kaam chahiye tha aur yahi mil raha tha. Yeh wajah kaafi jaldi khatam ho gayi.',
      'Sabse lamba aur sabse accha kaam note-taking tha. Main midwifery, law aur media ke lectures mein baithta tha, un students ke liye structured notes likhta tha jinhein accessibility ki wajah se unki zaroorat thi. Mujhe in mein se kisi vishay ka kuch nahi pata tha, toh mujhe itni tezi se seekhna padta tha ki main kuch aisa bana sakoon jispar kisi doosre ki degree tiki hui thi. Midwifery ke lectures mein main aam taur par assi auraton ke theatre mein akela aadmi hota tha, ek aise vishay par notes leta hua jo maine kabhi padha nahi tha, kisi aise ke liye jise main kabhi milne waala nahi tha.',
      'Bees ke aas-paas invigilation shifts thin, khaamosh halls ke kinaare khade hue. Intake weeks mein registration desks aur ID card banana. International students ke liye campus tours. Teen campuses par students’ union ke chunaav. Welfare calls yeh pata karne ke liye ki students ka kaisa chal raha hai. Kuch samay workplace monitoring. Graduation ceremonies, ek careers fair, aur compressors par ek international conference.',
      'Aakhri hissa mushkil hissa tha. Mera master’s September 2025 mein khatam hua aur Middlesex April 2026 tak shuru nahi hua, aur beech mein maine bahut si permanent jobs ke liye apply kiya aur zyadatar mein mana ho gaya. Unitemps ne mujhe us daur mein chalte rakha. Isne mujhe aise buildings mein bhi rakha jahaan log the, aur lambe rejection ke daur mein yeh mere andaaze se zyada maayne rakha.',
      'Aakhir mein maine ismein se yeh liya. Har assignment aisi jagah pahunchne se shuru hota tha jahaan main kabhi nahi gaya tha, aise logon ke beech jinke saath main dobara kaam nahi karne waala tha, aur kaam ko zero se seekhna padta tha. Paintees pehle din, ek ke baad ek. Kisi mod par naya hona asahaj lagna band ho gaya aur wahi hissa ban gaya jo mujhe pasand hai.',
    ],
    attribution: 'Unitemps, City St George’s, University of London, 2024–2026.',
  },
  {
    id: 'middlesex-university',
    title: 'Pachaas se sattar',
    tier: 'plain',
    year: '2026–present',
    body: [
      'Yeh bhi Unitemps se aaya, jo iski sabse saaf-suthri baat hai — do saal ke hafte-dar-hafte contracts ke baad ek aisa contract jispar end date likhi hai, usi raaste se.',
      'Accounts payable. Oracle se invoices, sahi coding, farak nikaale gaye, aur payment ki line chalti rakhi gayi. Aam din mein pachaas se sattar invoices, jab jamaa ho jaaye toh zyada.',
      'Yeh dohraane waala kaam hai aur ismein sahi hona zaroori hai. Galat invoice aage kisi doosre ki problem ban jaati hai, aam taur par ek supplier ki jo paise ka intezaar kar raha hai — toh sahi hona koi abstract baat nahi hai. Mujhe lagta hai mujhe yeh pasand hai.',
      'Main pehle hi khud ko process ke hisson ko dekhte aur yeh sochte hue paa chuka hoon ki kya saada ho sakta hai. Main abhi iske baare mein kuch kar nahi raha. Yeh saaf lagta hai ki system ko theek se samajhna padta hai use behtar banane se pehle, aur main yahaan chaar mahine se hoon.',
    ],
    attribution: 'Middlesex University, London, 2026–present.',
  },
];

export const codaHi: string[] = [
  'Yahaan dopahar dhal rahi hai, jiska matlab Mahendragarh mein shaam hai, jiska matlab dukaan khuli hai.',
  'Mujhe bina bataaye lagbhag pata rehta hai ki usmein kya chal raha hai — kab shaadi ka season use namumkin bana dega, kab Surat ya Ludhiana se naya stock aayega, kab woh phir shaant ho jaayegi.',
  'Usmein mera hissa bahut pehle badal gaya. Woh khatam nahi hua, aur mujhe nahi lagta ki hone waala hai.',
];

/**
 * The glance rail's own words. The rail's ITEMS come from `entriesHi` above —
 * derived in the component, so the titles change with the chapter — and these
 * are the three strings around them.
 */
export const experienceGlanceHi = {
  heading: 'Ek nazar mein',
  summary: 'Pandrah saal, zyadatar chune hue nahi.',
  note: 'Pandrah saal, zyadatar chune hue nahi. Kisi bhi hisse par jaaiye.',
  prologue: 'Prastaavna',
};
