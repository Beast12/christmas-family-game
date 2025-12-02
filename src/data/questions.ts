export interface Question {
  id: number;
  category: 'Riddle' | 'Family & Memories' | 'Task/Action' | 'Dilemma' | 'Reflection';
  question: string;
  answer?: string;
}

export const questions: Question[] = [
  // RIDDLES (15)
  { id: 1, category: 'Riddle', question: 'What becomes wetter the more it dries?', answer: 'A towel' },
  { id: 2, category: 'Riddle', question: 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?', answer: 'A map' },
  { id: 3, category: 'Riddle', question: 'What can you catch but never throw?', answer: 'A cold' },
  { id: 4, category: 'Riddle', question: 'The more you take, the more you leave behind. What am I?', answer: 'Footsteps' },
  { id: 5, category: 'Riddle', question: 'I speak without a mouth and hear without ears. I have no body, but come alive with the wind. What am I?', answer: 'An echo' },
  { id: 6, category: 'Riddle', question: 'What has keys but no locks, space but no room, and you can enter but can\'t go inside?', answer: 'A keyboard' },
  { id: 7, category: 'Riddle', question: 'What comes once in a minute, twice in a moment, but never in a thousand years?', answer: 'The letter M' },
  { id: 8, category: 'Riddle', question: 'I can fly without wings. I can cry without eyes. Wherever I go, darkness follows me. What am I?', answer: 'A cloud' },
  { id: 9, category: 'Riddle', question: 'What has a head and a tail but no body?', answer: 'A coin' },
  { id: 10, category: 'Riddle', question: 'The person who makes it, sells it. The person who buys it never uses it. The person who uses it never knows they\'re using it. What is it?', answer: 'A coffin' },
  { id: 11, category: 'Riddle', question: 'What can travel around the world while staying in a corner?', answer: 'A stamp' },
  { id: 12, category: 'Riddle', question: 'I have hands but cannot clap. What am I?', answer: 'A clock' },
  { id: 13, category: 'Riddle', question: 'What gets broken without being held?', answer: 'A promise' },
  { id: 14, category: 'Riddle', question: 'What has one eye but cannot see?', answer: 'A needle' },
  { id: 15, category: 'Riddle', question: 'I am not alive, but I grow. I don\'t have lungs, but I need air. What am I?', answer: 'Fire' },

  // FAMILY & MEMORIES (15)
  { id: 16, category: 'Family & Memories', question: 'Share a childhood memory that still makes you laugh.' },
  { id: 17, category: 'Family & Memories', question: 'What\'s your favorite family tradition and why?' },
  { id: 18, category: 'Family & Memories', question: 'Describe the best Christmas gift you\'ve ever received.' },
  { id: 19, category: 'Family & Memories', question: 'What\'s the funniest thing that ever happened during a family holiday?' },
  { id: 20, category: 'Family & Memories', question: 'Share a memory of a time when someone in this room made you really proud.' },
  { id: 21, category: 'Family & Memories', question: 'What\'s a family inside joke that always makes everyone laugh?' },
  { id: 22, category: 'Family & Memories', question: 'Describe your earliest Christmas memory.' },
  { id: 23, category: 'Family & Memories', question: 'What was your favorite family vacation and why?' },
  { id: 24, category: 'Family & Memories', question: 'Share a story about something silly you believed as a child.' },
  { id: 25, category: 'Family & Memories', question: 'What\'s the most valuable lesson a family member taught you?' },
  { id: 26, category: 'Family & Memories', question: 'Describe a moment when this family surprised you in a good way.' },
  { id: 27, category: 'Family & Memories', question: 'What\'s a family recipe that holds special meaning to you?' },
  { id: 28, category: 'Family & Memories', question: 'Share a time when you got in trouble together with a sibling or cousin.' },
  { id: 29, category: 'Family & Memories', question: 'What\'s something you used to hate as a kid but now appreciate?' },
  { id: 30, category: 'Family & Memories', question: 'Describe a moment that made you realize how much you love this family.' },

  // TASKS/ACTIONS (15)
  { id: 31, category: 'Task/Action', question: 'Do a slow-motion movie run across the room for 5 seconds.' },
  { id: 32, category: 'Task/Action', question: 'Tell a joke — if no one laughs, you must do 5 jumping jacks.' },
  { id: 33, category: 'Task/Action', question: 'Give everyone in the room a genuine compliment.' },
  { id: 34, category: 'Task/Action', question: 'Impersonate another family member until someone guesses who it is.' },
  { id: 35, category: 'Task/Action', question: 'Do your best impression of a penguin walking on ice.' },
  { id: 36, category: 'Task/Action', question: 'Make up a 4-line poem about the person on your left.' },
  { id: 37, category: 'Task/Action', question: 'Do an exaggerated fake sneeze — the more dramatic, the better.' },
  { id: 38, category: 'Task/Action', question: 'Strike 3 different dramatic poses like you\'re on a fashion magazine cover.' },
  { id: 39, category: 'Task/Action', question: 'Speak in a British accent for the next 2 rounds.' },
  { id: 40, category: 'Task/Action', question: 'Do your best robot dance for 10 seconds.' },
  { id: 41, category: 'Task/Action', question: 'Tell everyone what animal they remind you of and why.' },
  { id: 42, category: 'Task/Action', question: 'Act out your morning routine in fast-forward.' },
  { id: 43, category: 'Task/Action', question: 'Give a 30-second pep talk as if you\'re a coach before the big game.' },
  { id: 44, category: 'Task/Action', question: 'Stand up and do your best superhero pose with a dramatic introduction.' },
  { id: 45, category: 'Task/Action', question: 'Make up a new handshake with the person sitting closest to you.' },

  // DILEMMAS (15)
  { id: 46, category: 'Dilemma', question: 'Would you rather always be 10 minutes early or 10 minutes late to everything?' },
  { id: 47, category: 'Dilemma', question: 'Would you rather have unlimited money but no time, or unlimited time but just enough money?' },
  { id: 48, category: 'Dilemma', question: 'Would you rather know how you will die or when you will die?' },
  { id: 49, category: 'Dilemma', question: 'Would you rather be able to read minds or be invisible?' },
  { id: 50, category: 'Dilemma', question: 'Would you rather live in the mountains or by the beach?' },
  { id: 51, category: 'Dilemma', question: 'Would you rather never be able to use the internet again or never be able to fly in an airplane?' },
  { id: 52, category: 'Dilemma', question: 'Would you rather only eat sweet foods or only eat savory foods for the rest of your life?' },
  { id: 53, category: 'Dilemma', question: 'Would you rather be famous but misunderstood, or unknown but deeply appreciated by a few?' },
  { id: 54, category: 'Dilemma', question: 'Would you rather have the power to fly but only 3 feet off the ground, or run at super speed but only for 10 seconds at a time?' },
  { id: 55, category: 'Dilemma', question: 'Would you rather be able to talk to animals or speak every human language?' },
  { id: 56, category: 'Dilemma', question: 'Would you rather relive the same day forever or live every day as a new, random person?' },
  { id: 57, category: 'Dilemma', question: 'Would you rather always have to say everything on your mind or never speak again?' },
  { id: 58, category: 'Dilemma', question: 'Would you rather be incredibly lucky but never be able to work hard, or incredibly hardworking but never lucky?' },
  { id: 59, category: 'Dilemma', question: 'Would you rather give up cheese forever or give up chocolate forever?' },
  { id: 60, category: 'Dilemma', question: 'Would you rather have a rewind button or a pause button for your life?' },

  // REFLECTIONS (15)
  { id: 61, category: 'Reflection', question: 'Name one trait in someone here that you truly admire.' },
  { id: 62, category: 'Reflection', question: 'What\'s one thing you want to accomplish in the new year?' },
  { id: 63, category: 'Reflection', question: 'What are you most grateful for this year?' },
  { id: 64, category: 'Reflection', question: 'If you could give your younger self one piece of advice, what would it be?' },
  { id: 65, category: 'Reflection', question: 'What\'s something you\'ve changed your mind about in the past year?' },
  { id: 66, category: 'Reflection', question: 'Describe what your perfect day would look like.' },
  { id: 67, category: 'Reflection', question: 'What\'s a fear you\'ve overcome or want to overcome?' },
  { id: 68, category: 'Reflection', question: 'What makes you feel most alive?' },
  { id: 69, category: 'Reflection', question: 'If you could master any skill instantly, what would it be?' },
  { id: 70, category: 'Reflection', question: 'What\'s one thing that always makes you feel better when you\'re down?' },
  { id: 71, category: 'Reflection', question: 'Who has had the biggest positive influence on your life?' },
  { id: 72, category: 'Reflection', question: 'What do you think is your best quality?' },
  { id: 73, category: 'Reflection', question: 'What\'s something small that brings you unexpected joy?' },
  { id: 74, category: 'Reflection', question: 'If you could have dinner with anyone (living or dead), who would it be and why?' },
  { id: 75, category: 'Reflection', question: 'What does "home" mean to you?' },
];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
