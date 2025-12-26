import { Language } from '@/lib/i18n';

interface TranslatedText {
  nl: string;
  en: string;
}

export interface Question {
  id: number;
  category: string;
  question: string;
  answer?: string;
}

interface RawQuestion {
  id: number;
  category: TranslatedText;
  question: TranslatedText;
  answer?: TranslatedText;
}

const rawQuestions: RawQuestion[] = [
  // RAADSELS (15)
  { id: 1, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Wat wordt natter hoe meer het droogt?', en: 'What gets wetter the more it dries?' }, answer: { nl: 'Een handdoek', en: 'A towel' } },
  { id: 2, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Ik heb steden, maar geen huizen. Ik heb bergen, maar geen bomen. Ik heb water, maar geen vissen. Wat ben ik?', en: 'I have cities but no houses. I have mountains but no trees. I have water but no fish. What am I?' }, answer: { nl: 'Een kaart', en: 'A map' } },
  { id: 3, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Wat kun je vangen maar nooit gooien?', en: 'What can you catch but never throw?' }, answer: { nl: 'Een verkoudheid', en: 'A cold' } },
  { id: 4, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Hoe meer je neemt, hoe meer je achterlaat. Wat ben ik?', en: 'The more you take, the more you leave behind. What am I?' }, answer: { nl: 'Voetstappen', en: 'Footsteps' } },
  { id: 5, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Ik spreek zonder mond en hoor zonder oren. Ik heb geen lichaam, maar kom tot leven met de wind. Wat ben ik?', en: 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?' }, answer: { nl: 'Een echo', en: 'An echo' } },
  { id: 6, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Wat heeft toetsen maar geen sloten, ruimte maar geen kamer, en je kunt enter drukken maar niet naar binnen gaan?', en: 'What has keys but no locks, space but no room, and you can press enter but cannot go inside?' }, answer: { nl: 'Een toetsenbord', en: 'A keyboard' } },
  { id: 7, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Wat komt één keer voor in een minuut, twee keer in een moment, maar nooit in duizend jaar?', en: 'What occurs once in a minute, twice in a moment, but never in a thousand years?' }, answer: { nl: 'De letter M', en: 'The letter M' } },
  { id: 8, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Ik kan vliegen zonder vleugels. Ik kan huilen zonder ogen. Waar ik ook ga, duisternis volgt mij. Wat ben ik?', en: 'I can fly without wings. I can cry without eyes. Wherever I go, darkness follows me. What am I?' }, answer: { nl: 'Een wolk', en: 'A cloud' } },
  { id: 9, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Wat heeft een kop en een staart maar geen lichaam?', en: 'What has a head and a tail but no body?' }, answer: { nl: 'Een munt', en: 'A coin' } },
  { id: 10, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Wat heeft veel tanden maar kan niet bijten?', en: 'What has many teeth but cannot bite?' }, answer: { nl: 'Een kam', en: 'A comb' } },
  { id: 11, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Wat kan de wereld rondreizen terwijl het in een hoek blijft?', en: 'What can travel the world while staying in a corner?' }, answer: { nl: 'Een postzegel', en: 'A stamp' } },
  { id: 12, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Ik heb handen maar kan niet klappen. Wat ben ik?', en: 'I have hands but cannot clap. What am I?' }, answer: { nl: 'Een klok', en: 'A clock' } },
  { id: 13, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Wat wordt gebroken zonder vastgehouden te worden?', en: 'What is broken without being held?' }, answer: { nl: 'Een belofte', en: 'A promise' } },
  { id: 14, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Wat heeft één oog maar kan niet zien?', en: 'What has one eye but cannot see?' }, answer: { nl: 'Een naald', en: 'A needle' } },
  { id: 15, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Ik leef niet, maar ik groei. Ik heb geen longen, maar ik heb lucht nodig. Wat ben ik?', en: 'I am not alive, but I grow. I have no lungs, but I need air. What am I?' }, answer: { nl: 'Vuur', en: 'Fire' } },

  // Familie & Herinneringen (15)
  { id: 16, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Deel een jeugdherinnering waar je nog steeds om moet lachen.', en: 'Share a childhood memory that still makes you laugh.' } },
  { id: 17, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Wat is je favoriete familietraditie en waarom?', en: 'What is your favorite family tradition and why?' } },
  { id: 18, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Beschrijf het beste kerstcadeau dat je ooit hebt gekregen.', en: 'Describe the best Christmas gift you ever received.' } },
  { id: 19, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Wat is het grappigste dat ooit is gebeurd tijdens een familievakantie?', en: 'What is the funniest thing that ever happened on a family trip?' } },
  { id: 20, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Deel een herinnering van een moment waarop iemand in deze kamer je echt trots maakte.', en: 'Share a memory of a moment when someone in this room made you truly proud.' } },
  { id: 21, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Wat is een familie inside joke waar iedereen altijd om moet lachen?', en: 'What is a family inside joke that always makes everyone laugh?' } },
  { id: 22, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Beschrijf je vroegste kerstherinnering.', en: 'Describe your earliest Christmas memory.' } },
  { id: 23, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Wat was je favoriete familievakantie en waarom?', en: 'What was your favorite family holiday and why?' } },
  { id: 24, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Vertel een verhaal over iets geks dat je als kind geloofde.', en: 'Tell a story about something silly you believed as a child.' } },
  { id: 25, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Wat is de meest waardevolle les die een familielid je heeft geleerd?', en: 'What is the most valuable lesson a family member taught you?' } },
  { id: 26, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Beschrijf een moment waarop dit gezin je op een goede manier verraste.', en: 'Describe a moment when this family pleasantly surprised you.' } },
  { id: 27, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Wat is een familiereceptje dat een speciale betekenis voor je heeft?', en: 'What is a family recipe that has special meaning to you?' } },
  { id: 28, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Deel een keer dat je samen met een broer, zus of neef/nicht in de problemen kwam.', en: 'Share a time you got in trouble with a sibling or cousin.' } },
  { id: 29, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Wat is iets dat je als kind haatte maar nu waardeert?', en: 'What is something you hated as a kid but appreciate now?' } },
  { id: 30, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Beschrijf een moment waarop je besefte hoeveel je van dit gezin houdt.', en: 'Describe a moment when you realized how much you love this family.' } },

  // Taak/Actie (15)
  { id: 31, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Doe een slow-motion filmrun door de kamer gedurende 5 seconden.', en: 'Do a slow-motion movie run through the room for 5 seconds.' } },
  { id: 32, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Vertel een mop — als niemand lacht, moet je 5 jumping jacks doen.', en: 'Tell a joke — if nobody laughs, do 5 jumping jacks.' } },
  { id: 33, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Geef iedereen in de kamer een oprecht compliment.', en: 'Give everyone in the room a genuine compliment.' } },
  { id: 34, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Imiteer een ander familielid totdat iemand raadt wie het is.', en: 'Imitate another family member until someone guesses who it is.' } },
  { id: 35, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Doe je beste imitatie van een pinguïn die over ijs loopt.', en: 'Do your best impression of a penguin walking on ice.' } },
  { id: 36, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Verzin een gedicht van 4 regels over de persoon links van je.', en: 'Make up a 4-line poem about the person on your left.' } },
  { id: 37, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Doe een overdreven nep-nies — hoe dramatischer, hoe beter.', en: 'Do an exaggerated fake sneeze — the more dramatic, the better.' } },
  { id: 38, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Neem 3 verschillende dramatische poses alsof je op een modeblad staat.', en: 'Strike 3 dramatic poses as if you are on a magazine cover.' } },
  { id: 39, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Spreek met een Brits accent voor de volgende 2 rondes.', en: 'Speak with a British accent for the next 2 rounds.' } },
  { id: 40, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Doe je beste robotdans gedurende 10 seconden.', en: 'Do your best robot dance for 10 seconds.' } },
  { id: 41, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Vertel iedereen aan welk dier ze je doen denken en waarom.', en: 'Tell everyone which animal they remind you of and why.' } },
  { id: 42, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Speel je ochtendroutine na in fast-forward.', en: 'Act out your morning routine in fast-forward.' } },
  { id: 43, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Geef een peptalk van 30 seconden alsof je een coach bent voor de grote wedstrijd.', en: 'Give a 30-second pep talk as if you are the coach for the big game.' } },
  { id: 44, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Sta op en neem je beste superhelden-pose aan met een dramatische introductie.', en: 'Stand up and strike your best superhero pose with a dramatic intro.' } },
  { id: 45, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Verzin een nieuwe handshake met de persoon die het dichtst bij je zit.', en: 'Invent a new handshake with the person closest to you.' } },

  // Dilemma (15)
  { id: 46, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever altijd 10 minuten te vroeg of 10 minuten te laat zijn voor alles?', en: 'Would you rather always be 10 minutes early or 10 minutes late for everything?' } },
  { id: 47, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever onbeperkt geld hebben maar geen tijd, of onbeperkt tijd maar net genoeg geld?', en: 'Would you rather have unlimited money but no time, or unlimited time but just enough money?' } },
  { id: 48, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever altijd een dag in de toekomst kunnen kijken of een dag in het verleden kunnen herbeleven?', en: 'Would you rather always peek one day into the future or relive one day from the past?' } },
  { id: 49, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever gedachten kunnen lezen of onzichtbaar kunnen zijn?', en: 'Would you rather read minds or be invisible?' } },
  { id: 50, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever in de bergen wonen of aan het strand?', en: 'Would you rather live in the mountains or by the beach?' } },
  { id: 51, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever nooit meer internet kunnen gebruiken of nooit meer in een vliegtuig kunnen vliegen?', en: 'Would you rather never use the internet again or never fly again?' } },
  { id: 52, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever alleen zoet eten of alleen hartig eten voor de rest van je leven?', en: 'Would you rather eat only sweet or only savory for the rest of your life?' } },
  { id: 53, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever beroemd maar verkeerd begrepen zijn, of onbekend maar diep gewaardeerd door enkelen?', en: 'Would you rather be famous but misunderstood, or unknown but deeply valued by a few?' } },
  { id: 54, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever kunnen vliegen maar slechts 1 meter boven de grond, of supersnel kunnen rennen maar slechts 10 seconden per keer?', en: 'Would you rather fly but only 1 meter off the ground, or run super fast but only for 10 seconds at a time?' } },
  { id: 55, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever met dieren kunnen praten of elke menselijke taal kunnen spreken?', en: 'Would you rather speak with animals or speak every human language?' } },
  { id: 56, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever elke dag opnieuw beleven of elke dag als een nieuwe, willekeurige persoon leven?', en: 'Would you rather relive the same day over and over, or live each day as a new random person?' } },
  { id: 57, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever altijd alles moeten zeggen wat je denkt of nooit meer kunnen praten?', en: 'Would you rather always have to say everything you think or never speak again?' } },
  { id: 58, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever ongelooflijk veel geluk hebben maar nooit hard kunnen werken, of ongelooflijk hard werkend zijn maar nooit geluk hebben?', en: 'Would you rather be incredibly lucky but never able to work hard, or incredibly hardworking but never lucky?' } },
  { id: 59, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever voor altijd afscheid nemen van kaas of van chocolade?', en: 'Would you rather give up cheese forever or chocolate forever?' } },
  { id: 60, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever een terugspoelknop of een pauzeknop voor je leven hebben?', en: 'Would you rather have a rewind button or a pause button for your life?' } },

  // Reflecties (15)
  { id: 61, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Noem één eigenschap van iemand hier die je echt bewondert.', en: 'Name one trait of someone here that you truly admire.' } },
  { id: 62, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Wat is één ding dat je wilt bereiken in het nieuwe jaar?', en: 'What is one thing you want to achieve in the new year?' } },
  { id: 63, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Waar ben je dit jaar het meest dankbaar voor?', en: 'What are you most grateful for this year?' } },
  { id: 64, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Als je je jongere zelf één advies kon geven, wat zou dat zijn?', en: 'If you could give your younger self one piece of advice, what would it be?' } },
  { id: 65, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Wat is iets waar je het afgelopen jaar van mening over bent veranderd?', en: 'What is something you changed your mind about this past year?' } },
  { id: 66, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Beschrijf hoe jouw perfecte dag eruit zou zien.', en: 'Describe what your perfect day would look like.' } },
  { id: 67, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Wat is een angst die je hebt overwonnen of wilt overwinnen?', en: 'What is a fear you have overcome or want to overcome?' } },
  { id: 68, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Waardoor voel je je het meest levend?', en: 'What makes you feel the most alive?' } },
  { id: 69, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Als je direct een vaardigheid zou kunnen beheersen, welke zou dat zijn?', en: 'If you could instantly master a skill, which would it be?' } },
  { id: 70, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Wat is één ding dat je altijd beter laat voelen als je je down voelt?', en: 'What is one thing that always makes you feel better when you are down?' } },
  { id: 71, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Wie heeft de grootste positieve invloed op je leven gehad?', en: 'Who has had the biggest positive impact on your life?' } },
  { id: 72, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Wat denk je dat je beste eigenschap is?', en: 'What do you think your best quality is?' } },
  { id: 73, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Wat is iets kleins dat je onverwachte vreugde brengt?', en: 'What is a small thing that brings you unexpected joy?' } },
  { id: 74, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Als je met iemand (levend of dood) zou kunnen dineren, wie zou dat zijn en waarom?', en: 'If you could have dinner with anyone (alive or dead), who would it be and why?' } },
  { id: 75, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Wat betekent "thuis" voor jou?', en: 'What does “home” mean to you?' } },

  // Extra (25) om tot 100 te komen
  { id: 76, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Wat heeft een bed maar slaapt nooit?', en: 'What has a bed but never sleeps?' }, answer: { nl: 'Een rivier', en: 'A river' } },
  { id: 77, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Ik ga de wereld rond maar blijf op mijn plaats. Wat ben ik?', en: 'I travel the world but stay in the same spot. What am I?' }, answer: { nl: 'Een postzegel', en: 'A stamp' } },
  { id: 78, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Hoe heet een sneeuwpop in de zomer?', en: 'What do you call a snowman in summer?' }, answer: { nl: 'Een plas water', en: 'A puddle' } },
  { id: 79, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Wat heeft een ring maar geen vinger?', en: 'What has a ring but no finger?' }, answer: { nl: 'Een telefoon', en: 'A telephone' } },
  { id: 80, category: { nl: 'Raadsel', en: 'Riddle' }, question: { nl: 'Hoeveel maanden hebben 28 dagen?', en: 'How many months have 28 days?' }, answer: { nl: 'Allemaal', en: 'All of them' } },

  { id: 81, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Welke familiefilm kijk je het liefst opnieuw?', en: 'Which family movie do you love rewatching?' } },
  { id: 82, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Wat is je leukste herinnering aan een regenachtige dag?', en: 'What is your favorite memory of a rainy day?' } },
  { id: 83, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Welke familietraditie zou je willen starten?', en: 'Which family tradition would you like to start?' } },
  { id: 84, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Wie heeft je de beste tip ooit gegeven en wat was het?', en: 'Who gave you the best tip ever and what was it?' } },
  { id: 85, category: { nl: 'Familie & Herinneringen', en: 'Family & Memories' }, question: { nl: 'Wat is je favoriete familiefoto en waarom?', en: 'What is your favorite family photo and why?' } },

  { id: 86, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Doe een 10-seconden beatbox.', en: 'Do a 10-second beatbox.' } },
  { id: 87, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Laat je beste slow-motion high five zien met iemand.', en: 'Do your best slow-motion high five with someone.' } },
  { id: 88, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Noem 5 liedjes binnen 15 seconden.', en: 'Name 5 songs within 15 seconds.' } },
  { id: 89, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Speel een emoji uit zonder te praten tot iemand het raadt.', en: 'Act out an emoji without speaking until someone guesses it.' } },
  { id: 90, category: { nl: 'Taak/Actie', en: 'Action' }, question: { nl: 'Vertel een verhaal in 10 woorden.', en: 'Tell a story in 10 words.' } },

  { id: 91, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever alleen nog podcasts luisteren of alleen nog muziek?', en: 'Would you rather listen only to podcasts or only to music?' } },
  { id: 92, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever nooit meer koffie of nooit meer chocolade hebben?', en: 'Would you rather never have coffee again or never have chocolate again?' } },
  { id: 93, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever elke dag vroeg opstaan of elke dag laat slapen?', en: 'Would you rather wake up early every day or sleep late every day?' } },
  { id: 94, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever altijd je gedachten hardop zeggen of nooit meer grapjes maken?', en: 'Would you rather always say your thoughts out loud or never make jokes again?' } },
  { id: 95, category: { nl: 'Dilemma', en: 'Dilemma' }, question: { nl: 'Zou je liever altijd warm eten of altijd koud eten?', en: 'Would you rather always eat hot food or always eat cold food?' } },

  { id: 96, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Wat is een kleine overwinning van deze week?', en: 'What is a small win from this week?' } },
  { id: 97, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Welke gewoonte wil je volgend jaar aanleren?', en: 'Which habit do you want to build next year?' } },
  { id: 98, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Met wie zou je vaker contact willen hebben?', en: 'Who would you like to keep in touch with more often?' } },
  { id: 99, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Wat zou je jongere zelf leuk vinden aan wie je nu bent?', en: 'What would your younger self like about who you are now?' } },
  { id: 100, category: { nl: 'Reflectie', en: 'Reflection' }, question: { nl: 'Waar wil je dit jaar vaker “ja” tegen zeggen?', en: 'What do you want to say “yes” to more often this year?' } },
];

const questionPools = [
  {
    id: 'christmas',
    name: { nl: 'Kerstvragen', en: 'Christmas Questions' },
    questions: rawQuestions,
  },
] as const;

export type QuestionPoolId = (typeof questionPools)[number]['id'];

export function getQuestionPools(language: Language) {
  return questionPools.map((pool) => ({
    id: pool.id,
    name: pool.name[language],
  }));
}

export function getQuestions(language: Language, poolId: QuestionPoolId = 'christmas'): Question[] {
  const selectedPool =
    questionPools.find((pool) => pool.id === poolId) ?? questionPools[0];

  return selectedPool.questions.map((q) => ({
    id: q.id,
    category: q.category[language],
    question: q.question[language],
    answer: q.answer ? q.answer[language] : undefined,
  }));
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
