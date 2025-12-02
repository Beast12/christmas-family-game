export interface Question {
  id: number;
  category: 'Raadsel' | 'Familie & Herinneringen' | 'Taak/Actie' | 'Dilemma' | 'Reflectie';
  question: string;
  answer?: string;
}

export const questions: Question[] = [
  // RAADSELS (15)
  { id: 1, category: 'Raadsel', question: 'Wat wordt natter hoe meer het droogt?', answer: 'Een handdoek' },
  { id: 2, category: 'Raadsel', question: 'Ik heb steden, maar geen huizen. Ik heb bergen, maar geen bomen. Ik heb water, maar geen vissen. Wat ben ik?', answer: 'Een kaart' },
  { id: 3, category: 'Raadsel', question: 'Wat kun je vangen maar nooit gooien?', answer: 'Een verkoudheid' },
  { id: 4, category: 'Raadsel', question: 'Hoe meer je neemt, hoe meer je achterlaat. Wat ben ik?', answer: 'Voetstappen' },
  { id: 5, category: 'Raadsel', question: 'Ik spreek zonder mond en hoor zonder oren. Ik heb geen lichaam, maar kom tot leven met de wind. Wat ben ik?', answer: 'Een echo' },
  { id: 6, category: 'Raadsel', question: 'Wat heeft toetsen maar geen sloten, ruimte maar geen kamer, en je kunt enter drukken maar niet naar binnen gaan?', answer: 'Een toetsenbord' },
  { id: 7, category: 'Raadsel', question: 'Wat komt één keer voor in een minuut, twee keer in een moment, maar nooit in duizend jaar?', answer: 'De letter M' },
  { id: 8, category: 'Raadsel', question: 'Ik kan vliegen zonder vleugels. Ik kan huilen zonder ogen. Waar ik ook ga, duisternis volgt mij. Wat ben ik?', answer: 'Een wolk' },
  { id: 9, category: 'Raadsel', question: 'Wat heeft een kop en een staart maar geen lichaam?', answer: 'Een munt' },
  { id: 10, category: 'Raadsel', question: 'De persoon die het maakt, verkoopt het. De persoon die het koopt, gebruikt het nooit. De persoon die het gebruikt, weet niet dat hij het gebruikt. Wat is het?', answer: 'Een doodskist' },
  { id: 11, category: 'Raadsel', question: 'Wat kan de wereld rondreizen terwijl het in een hoek blijft?', answer: 'Een postzegel' },
  { id: 12, category: 'Raadsel', question: 'Ik heb handen maar kan niet klappen. Wat ben ik?', answer: 'Een klok' },
  { id: 13, category: 'Raadsel', question: 'Wat wordt gebroken zonder vastgehouden te worden?', answer: 'Een belofte' },
  { id: 14, category: 'Raadsel', question: 'Wat heeft één oog maar kan niet zien?', answer: 'Een naald' },
  { id: 15, category: 'Raadsel', question: 'Ik leef niet, maar ik groei. Ik heb geen longen, maar ik heb lucht nodig. Wat ben ik?', answer: 'Vuur' },

  // FAMILIE & HERINNERINGEN (15)
  { id: 16, category: 'Familie & Herinneringen', question: 'Deel een jeugdherinnering waar je nog steeds om moet lachen.' },
  { id: 17, category: 'Familie & Herinneringen', question: 'Wat is je favoriete familietraditie en waarom?' },
  { id: 18, category: 'Familie & Herinneringen', question: 'Beschrijf het beste kerstcadeau dat je ooit hebt gekregen.' },
  { id: 19, category: 'Familie & Herinneringen', question: 'Wat is het grappigste dat ooit is gebeurd tijdens een familievakantie?' },
  { id: 20, category: 'Familie & Herinneringen', question: 'Deel een herinnering van een moment waarop iemand in deze kamer je echt trots maakte.' },
  { id: 21, category: 'Familie & Herinneringen', question: 'Wat is een familie inside joke waar iedereen altijd om moet lachen?' },
  { id: 22, category: 'Familie & Herinneringen', question: 'Beschrijf je vroegste kerstherinnering.' },
  { id: 23, category: 'Familie & Herinneringen', question: 'Wat was je favoriete familievakantie en waarom?' },
  { id: 24, category: 'Familie & Herinneringen', question: 'Vertel een verhaal over iets geks dat je als kind geloofde.' },
  { id: 25, category: 'Familie & Herinneringen', question: 'Wat is de meest waardevolle les die een familielid je heeft geleerd?' },
  { id: 26, category: 'Familie & Herinneringen', question: 'Beschrijf een moment waarop dit gezin je op een goede manier verraste.' },
  { id: 27, category: 'Familie & Herinneringen', question: 'Wat is een familiereceptje dat een speciale betekenis voor je heeft?' },
  { id: 28, category: 'Familie & Herinneringen', question: 'Deel een keer dat je samen met een broer, zus of neef/nicht in de problemen kwam.' },
  { id: 29, category: 'Familie & Herinneringen', question: 'Wat is iets dat je als kind haatte maar nu waardeert?' },
  { id: 30, category: 'Familie & Herinneringen', question: 'Beschrijf een moment waarop je besefte hoeveel je van dit gezin houdt.' },

  // TAKEN/ACTIES (15)
  { id: 31, category: 'Taak/Actie', question: 'Doe een slow-motion filmrun door de kamer gedurende 5 seconden.' },
  { id: 32, category: 'Taak/Actie', question: 'Vertel een mop — als niemand lacht, moet je 5 jumping jacks doen.' },
  { id: 33, category: 'Taak/Actie', question: 'Geef iedereen in de kamer een oprecht compliment.' },
  { id: 34, category: 'Taak/Actie', question: 'Imiteer een ander familielid totdat iemand raadt wie het is.' },
  { id: 35, category: 'Taak/Actie', question: 'Doe je beste imitatie van een pinguïn die over ijs loopt.' },
  { id: 36, category: 'Taak/Actie', question: 'Verzin een gedicht van 4 regels over de persoon links van je.' },
  { id: 37, category: 'Taak/Actie', question: 'Doe een overdreven nep-nies — hoe dramatischer, hoe beter.' },
  { id: 38, category: 'Taak/Actie', question: 'Neem 3 verschillende dramatische poses alsof je op een modeblad staat.' },
  { id: 39, category: 'Taak/Actie', question: 'Spreek met een Brits accent voor de volgende 2 rondes.' },
  { id: 40, category: 'Taak/Actie', question: 'Doe je beste robotdans gedurende 10 seconden.' },
  { id: 41, category: 'Taak/Actie', question: 'Vertel iedereen aan welk dier ze je doen denken en waarom.' },
  { id: 42, category: 'Taak/Actie', question: 'Speel je ochtendroutine na in fast-forward.' },
  { id: 43, category: 'Taak/Actie', question: 'Geef een peptalk van 30 seconden alsof je een coach bent voor de grote wedstrijd.' },
  { id: 44, category: 'Taak/Actie', question: 'Sta op en neem je beste superhelden-pose aan met een dramatische introductie.' },
  { id: 45, category: 'Taak/Actie', question: 'Verzin een nieuwe handshake met de persoon die het dichtst bij je zit.' },

  // DILEMMA'S (15)
  { id: 46, category: 'Dilemma', question: 'Zou je liever altijd 10 minuten te vroeg of 10 minuten te laat zijn voor alles?' },
  { id: 47, category: 'Dilemma', question: 'Zou je liever onbeperkt geld hebben maar geen tijd, of onbeperkt tijd maar net genoeg geld?' },
  { id: 48, category: 'Dilemma', question: 'Zou je liever weten hoe je zult sterven of wanneer je zult sterven?' },
  { id: 49, category: 'Dilemma', question: 'Zou je liever gedachten kunnen lezen of onzichtbaar kunnen zijn?' },
  { id: 50, category: 'Dilemma', question: 'Zou je liever in de bergen wonen of aan het strand?' },
  { id: 51, category: 'Dilemma', question: 'Zou je liever nooit meer internet kunnen gebruiken of nooit meer in een vliegtuig kunnen vliegen?' },
  { id: 52, category: 'Dilemma', question: 'Zou je liever alleen zoet eten of alleen hartig eten voor de rest van je leven?' },
  { id: 53, category: 'Dilemma', question: 'Zou je liever beroemd maar verkeerd begrepen zijn, of onbekend maar diep gewaardeerd door enkelen?' },
  { id: 54, category: 'Dilemma', question: 'Zou je liever kunnen vliegen maar slechts 1 meter boven de grond, of supersnel kunnen rennen maar slechts 10 seconden per keer?' },
  { id: 55, category: 'Dilemma', question: 'Zou je liever met dieren kunnen praten of elke menselijke taal kunnen spreken?' },
  { id: 56, category: 'Dilemma', question: 'Zou je liever elke dag opnieuw beleven of elke dag als een nieuwe, willekeurige persoon leven?' },
  { id: 57, category: 'Dilemma', question: 'Zou je liever altijd alles moeten zeggen wat je denkt of nooit meer kunnen praten?' },
  { id: 58, category: 'Dilemma', question: 'Zou je liever ongelooflijk veel geluk hebben maar nooit hard kunnen werken, of ongelooflijk hard werkend zijn maar nooit geluk hebben?' },
  { id: 59, category: 'Dilemma', question: 'Zou je liever voor altijd afscheid nemen van kaas of van chocolade?' },
  { id: 60, category: 'Dilemma', question: 'Zou je liever een terugspoelknop of een pauzeknop voor je leven hebben?' },

  // REFLECTIES (15)
  { id: 61, category: 'Reflectie', question: 'Noem één eigenschap van iemand hier die je echt bewondert.' },
  { id: 62, category: 'Reflectie', question: 'Wat is één ding dat je wilt bereiken in het nieuwe jaar?' },
  { id: 63, category: 'Reflectie', question: 'Waar ben je dit jaar het meest dankbaar voor?' },
  { id: 64, category: 'Reflectie', question: 'Als je je jongere zelf één advies kon geven, wat zou dat zijn?' },
  { id: 65, category: 'Reflectie', question: 'Wat is iets waar je het afgelopen jaar van mening over bent veranderd?' },
  { id: 66, category: 'Reflectie', question: 'Beschrijf hoe jouw perfecte dag eruit zou zien.' },
  { id: 67, category: 'Reflectie', question: 'Wat is een angst die je hebt overwonnen of wilt overwinnen?' },
  { id: 68, category: 'Reflectie', question: 'Waardoor voel je je het meest levend?' },
  { id: 69, category: 'Reflectie', question: 'Als je direct een vaardigheid zou kunnen beheersen, welke zou dat zijn?' },
  { id: 70, category: 'Reflectie', question: 'Wat is één ding dat je altijd beter laat voelen als je je down voelt?' },
  { id: 71, category: 'Reflectie', question: 'Wie heeft de grootste positieve invloed op je leven gehad?' },
  { id: 72, category: 'Reflectie', question: 'Wat denk je dat je beste eigenschap is?' },
  { id: 73, category: 'Reflectie', question: 'Wat is iets kleins dat je onverwachte vreugde brengt?' },
  { id: 74, category: 'Reflectie', question: 'Als je met iemand (levend of dood) zou kunnen dineren, wie zou dat zijn en waarom?' },
  { id: 75, category: 'Reflectie', question: 'Wat betekent "thuis" voor jou?' },
];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
