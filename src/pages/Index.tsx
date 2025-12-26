import { useState, useEffect, useCallback } from 'react';
import { getQuestions, getQuestionPools, shuffleArray, Question, QuestionAudience } from '@/data/questions';
import Snowflakes from '@/components/Snowflakes';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import SettingsPanel from '@/components/SettingsPanel';
import PlayerSpotlight from '@/components/PlayerSpotlight';
import GiftTracker from '@/components/GiftTracker';
import LootBoxModal from '@/components/LootBoxModal';
import ThemeOrnaments from '@/components/ThemeOrnaments';
import { Language } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { ThemeId, themeOptions, isChristmasTheme, isThemeId } from '@/lib/themes';

type Player = {
  name: string;
  gifts: number;
  correct: number;
  bonuses: {
    skipUsed: boolean;
    jokerUsed: boolean;
    doubleUsed: boolean;
  };
};

type CustomPool = {
  id: string;
  name: string;
  questions: Question[];
  createdAt: string;
  prompt: string;
  count: number;
};

const CUSTOM_POOLS_STORAGE = 'customPools';
const AI_KEY_STORAGE = 'openaiApiKey';

const Index = () => {
  const [players, setPlayers] = useState<Player[]>([
  { name: 'Player 1', gifts: 0, correct: 0, bonuses: { skipUsed: false, jokerUsed: false, doubleUsed: false } },
  { name: 'Player 2', gifts: 0, correct: 0, bonuses: { skipUsed: false, jokerUsed: false, doubleUsed: false } },
  { name: 'Player 3', gifts: 0, correct: 0, bonuses: { skipUsed: false, jokerUsed: false, doubleUsed: false } },
  { name: 'Player 4', gifts: 0, correct: 0, bonuses: { skipUsed: false, jokerUsed: false, doubleUsed: false } },
  ]);

  const [maxGifts, setMaxGifts] = useState(3);
  const [threshold, setThreshold] = useState(3); // correcte antwoorden nodig voor cadeau
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return 'christmas-eve';
    const stored = window.localStorage.getItem('theme');
    return stored && isThemeId(stored) ? stored : 'christmas-eve';
  });
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [language, setLanguage] = useState<Language>('nl');
  const [lootBoxReward, setLootBoxReward] = useState<{ player: string; message: string } | null>(null);
  const [riddleMinutes, setRiddleMinutes] = useState(1);
  const [questionPoolId, setQuestionPoolId] = useState('christmas');
  const [questionAudience, setQuestionAudience] = useState<QuestionAudience>('kids');
  const [giftsEnabled, setGiftsEnabled] = useState(true);
  const [customPools, setCustomPools] = useState<CustomPool[]>(() => {
    if (typeof window === 'undefined') return [];
    const raw = window.localStorage.getItem(CUSTOM_POOLS_STORAGE);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as CustomPool[];
    } catch {
      return [];
    }
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [savedApiKey, setSavedApiKey] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem(AI_KEY_STORAGE) ?? '';
  });
  const supportUrl = 'https://www.buymeacoffee.com/koen1203';

  const rewardMessages: Record<Language, string[]> = {
    nl: [
      'Pak een klein pakje',
      'Pak een groot pakje',
      'Jij mag iemand anders een pakje laten pakken',
      'Kies een pakje en geef het door aan iemand naar keuze',
      'Pak een pakje en wissel van stoel met iemand',
      'Pak een pakje, maar open het pas na 1 minuut',
    ],
    en: [
      'Pick a small present',
      'Pick a big present',
      'Let someone else take a present',
      'Pick a present and pass it to anyone you choose',
      'Pick a present and swap seats with someone',
      'Pick a present but open it after 1 minute',
    ],
  };

  const questionPools = getQuestionPools(language);
  const mergedPools = [
    ...questionPools,
    ...customPools.map((pool) => ({ id: pool.id, name: pool.name })),
  ];

  const initializeQuestions = useCallback(() => {
    const customPool = customPools.find((pool) => pool.id === questionPoolId);
    const bank = customPool
      ? customPool.questions
      : getQuestions(language, questionPoolId as 'christmas' | 'trivia' | 'truth-or-dare', questionAudience);
    const shuffled = shuffleArray(bank);
    setTotalQuestions(bank.length);
    setCurrentQuestion(shuffled[0]);
    setRemainingQuestions(shuffled.slice(1));
  }, [language, questionPoolId, questionAudience, customPools]);

  useEffect(() => {
    initializeQuestions();
  }, [initializeQuestions]);

  useEffect(() => {
    const titles: Record<ThemeId, { nl: string; en: string }> = {
      'christmas-eve': { nl: 'Kerstavond Familiespel', en: 'Christmas Eve Family Game' },
      'christmas-day': { nl: 'Kerstdag Familiequiz', en: 'Christmas Day Family Quiz' },
      easter: { nl: 'Pasen Familiequiz', en: 'Easter Family Quiz' },
      summer: { nl: 'Zomer Quizavond', en: 'Summer Quiz Night' },
      cozy: { nl: 'Familiequiz', en: 'Family Quiz' },
      sunset: { nl: 'Quizavond', en: 'Quiz Night' },
      slate: { nl: 'Gezelschapsspel', en: 'Game Night' },
    };
    const title = language === 'nl' ? titles[theme].nl : titles[theme].en;
    document.title = title;
  }, [language, theme]);

  useEffect(() => {
    const themeClasses = themeOptions.map((option) => `theme-${option.id}`);
    document.body.classList.remove(...themeClasses);
    document.documentElement.classList.remove(...themeClasses);
    document.body.classList.add(`theme-${theme}`);
    document.documentElement.classList.add(`theme-${theme}`);
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CUSTOM_POOLS_STORAGE, JSON.stringify(customPools));
  }, [customPools]);

  const handleNextQuestion = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);

    if (remainingQuestions.length === 0) {
      // Reshuffle when all questions are exhausted
      initializeQuestions();
    } else {
      setCurrentQuestion(remainingQuestions[0]);
      setRemainingQuestions(remainingQuestions.slice(1));
    }
  };

  const handleShuffle = () => {
    initializeQuestions();
  };

  const handleThemeChange = (value: ThemeId) => {
    setTheme(value);
  };

  const handleRemoveCustomPool = (id: string) => {
    setCustomPools((prev) => {
      const next = prev.filter((pool) => pool.id !== id);
      return next;
    });
    if (questionPoolId === id) {
      setQuestionPoolId('christmas');
    }
  };

  const buildAiPrompt = (prompt: string, languageLabel: string, count: number) => {
    return [
      `Create a set of ${count} party-game questions for a family quiz.`,
      `Language: ${languageLabel}.`,
      `Questions can be uncensored.`,
      `Mix categories such as trivia, actions, dilemmas, reflections, or playful challenges.`,
      `Return JSON only with this shape: {"questions":[{"category":"...","question":"...","answer":"..."}]}.`,
      `Answers are optional; include them where a fixed answer makes sense.`,
      `User prompt: ${prompt}`,
    ].join(' ');
  };

  const parseAiResponse = (content: string) => {
    const trimmed = content.trim();
    const jsonText = trimmed.startsWith('{') || trimmed.startsWith('[')
      ? trimmed
      : trimmed.slice(trimmed.indexOf('{'));
    const parsed = JSON.parse(jsonText);
    const list = Array.isArray(parsed) ? parsed : parsed.questions;
    if (!Array.isArray(list)) {
      throw new Error('Invalid AI response');
    }
    return list as Array<{ category?: string; question?: string; answer?: string }>;
  };

  const handleGenerateAiPool = async (data: {
    name: string;
    prompt: string;
    count: number;
    apiKey: string;
    rememberKey: boolean;
    replaceId?: string;
  }) => {
    setAiLoading(true);
    setAiError(null);
    try {
      if (data.rememberKey) {
        window.localStorage.setItem(AI_KEY_STORAGE, data.apiKey);
        setSavedApiKey(data.apiKey);
      } else {
        window.localStorage.removeItem(AI_KEY_STORAGE);
        setSavedApiKey('');
      }

      const languageLabel = language === 'nl' ? 'Dutch' : 'English';
      const fullPrompt = buildAiPrompt(data.prompt, languageLabel, data.count);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.8,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful writer who returns strict JSON only, no markdown.',
            },
            { role: 'user', content: fullPrompt },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('AI request failed');
      }

      const payload = await response.json();
      const content = payload?.choices?.[0]?.message?.content ?? '';
      const rawQuestions = parseAiResponse(content);
      const mappedQuestions: Question[] = rawQuestions
        .filter((item) => item.question)
        .map((item, index) => ({
          id: index + 1,
          category: item.category?.trim() || (language === 'nl' ? 'Algemeen' : 'General'),
          question: item.question?.trim() || '',
          answer: item.answer?.trim() || undefined,
        }))
        .filter((item) => item.question);

      if (mappedQuestions.length === 0) {
        throw new Error('Empty AI result');
      }

      const newPool: CustomPool = {
        id: data.replaceId ?? `custom-${Date.now()}`,
        name: data.name,
        questions: mappedQuestions,
        createdAt: new Date().toISOString(),
        prompt: data.prompt,
        count: data.count,
      };

      setCustomPools((prev) => {
        const filtered = data.replaceId ? prev.filter((pool) => pool.id !== data.replaceId) : prev;
        return [newPool, ...filtered];
      });
      setQuestionPoolId(newPool.id);
    } catch (error) {
      setAiError('error');
    } finally {
      setAiLoading(false);
    }
  };

  const handlePlayerNameChange = (playerIndex: number, name: string) => {
  setPlayers(prev =>
    prev.map((player, index) =>
      index === playerIndex
        ? { ...player, name: name || (language === 'nl' ? `Speler ${index + 1}` : `Player ${index + 1}`) }
        : player
      )
    );
  };

  const handlePlayerAdd = () => {
  const defaultName = language === 'nl' ? `Speler ${players.length + 1}` : `Player ${players.length + 1}`;
  setPlayers(prev => [
    ...prev,
    { name: defaultName, gifts: 0, correct: 0, bonuses: { skipUsed: false, jokerUsed: false, doubleUsed: false } },
    ]);
  };


  const handlePlayerRemove = (playerIndex: number) => {
    setPlayers(prev => {
      if (prev.length <= 1) return prev; // minimaal één speler
      const nextPlayers = prev.filter((_, idx) => idx !== playerIndex);
      setCurrentPlayerIndex((prevIndex) => {
        if (prevIndex === playerIndex) {
          return prevIndex % nextPlayers.length;
        }
        if (prevIndex > playerIndex) {
          return Math.max(0, prevIndex - 1);
        }
        return prevIndex;
      });
      return nextPlayers;
    });
  };

  const handleAwardGift = (playerIndex: number, count: number = 1, { skipLoot }: { skipLoot?: boolean } = {}) => {
    if (!giftsEnabled) return;
    setPlayers(prev => {
      const target = prev[playerIndex];
      if (!target) return prev;
      const capacity = Math.max(0, maxGifts - target.gifts);
      const gained = Math.min(count, capacity);
      if (gained <= 0) return prev;

      const updated = prev.map((player, index) => {
        if (index !== playerIndex) return player;
        return { ...player, gifts: player.gifts + gained };
      });

      if (!skipLoot) {
        const pool = rewardMessages[language] || rewardMessages.nl;
        const randomMessage = pool[Math.floor(Math.random() * pool.length)];
        setLootBoxReward({ player: target.name, message: randomMessage });
      }

      return updated;
    });
  };

  const handleAdjustMaxGifts = (value: number) => {
    const sanitizedMax = Math.max(0, value);
    setMaxGifts(sanitizedMax);
    setPlayers(prev => prev.map(player => ({
      ...player,
      gifts: Math.min(player.gifts, sanitizedMax),
    })));
  };

  const handleAdjustRiddleMinutes = (value: number) => {
    const sanitized = Math.max(0, value);
    setRiddleMinutes(sanitized);
  };

  const handleAdjustThreshold = (value: number) => {
    const sanitized = Math.max(1, value);
    setThreshold(sanitized);
    setPlayers(prev => prev.map(player => ({
      ...player,
      correct: Math.min(player.correct, sanitized - 1),
    })));
  };

  const handleRemoveGift = (playerIndex: number) => {
    setPlayers(prev =>
      prev.map((player, index) => {
        if (index !== playerIndex) return player;
        const nextGifts = Math.max(0, player.gifts - 1);
        return { ...player, gifts: nextGifts };
      })
    );
  };

  const handleCorrect = (playerIndex: number) => {
    if (!giftsEnabled) return;
    setPlayers(prev => {
      const player = prev[playerIndex];
      if (!player) return prev;
      let newCorrect = player.correct + 1;
      let giftsToAdd = 0;
      if (newCorrect >= threshold) {
        giftsToAdd = Math.floor(newCorrect / threshold);
        newCorrect = newCorrect % threshold;
      }
      const updated = prev.map((p, idx) =>
        idx === playerIndex ? { ...p, correct: newCorrect } : p
      );
      if (giftsToAdd > 0) {
        handleAwardGift(playerIndex, giftsToAdd);
      }
      return updated;
    });
  };

  const handleUseSkip = (playerIndex: number) => {
    setPlayers(prev =>
      prev.map((player, index) =>
        index === playerIndex
          ? { ...player, bonuses: { ...player.bonuses, skipUsed: true } }
          : player
      )
    );
    if (playerIndex === currentPlayerIndex) {
      handleNextQuestion();
    }
  };

  const handleUseJoker = (playerIndex: number) => {
    setPlayers(prev =>
      prev.map((player, index) =>
        index === playerIndex
          ? { ...player, bonuses: { ...player.bonuses, jokerUsed: true } }
          : player
      )
    );
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-foreground text-xl animate-pulse">{t(language, 'loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ThemeOrnaments theme={theme} />
      {isChristmasTheme(theme) && <Snowflakes />}
      
      <Header
        onOpenSettings={() => setSettingsOpen(true)}
        language={language}
        currentPlayer={players[currentPlayerIndex].name}
        supportUrl={supportUrl}
      />

      <div className="px-4">
        <PlayerSpotlight
          players={players.map(player => giftsEnabled ? ({ ...player, maxGifts }) : ({ name: player.name }))}
          activeIndex={currentPlayerIndex}
          language={language}
        />
        {giftsEnabled && (
          <GiftTracker
            players={players}
            activeIndex={currentPlayerIndex}
            maxGifts={maxGifts}
            threshold={threshold}
            onAward={(index) => handleAwardGift(index)}
            onRemove={(index) => handleRemoveGift(index)}
            onCorrect={(index) => handleCorrect(index)}
            onSkip={(index) => handleUseSkip(index)}
            onJoker={(index) => handleUseJoker(index)}
            language={language}
          />
        )}
      </div>

      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        <QuestionCard
          question={currentQuestion}
          onNext={handleNextQuestion}
          remaining={remainingQuestions.length + 1}
          total={totalQuestions || remainingQuestions.length + 1}
          currentPlayer={players[currentPlayerIndex].name}
          language={language}
          riddleMinutes={riddleMinutes}
        />
      </main>

      <LootBoxModal
        reward={lootBoxReward}
        onClose={() => setLootBoxReward(null)}
        language={language}
      />

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onShuffle={handleShuffle}
        theme={theme}
        onThemeChange={handleThemeChange}
        maxGifts={maxGifts}
        onMaxChange={handleAdjustMaxGifts}
        riddleMinutes={riddleMinutes}
        onRiddleMinutesChange={handleAdjustRiddleMinutes}
        threshold={threshold}
        onThresholdChange={handleAdjustThreshold}
        giftsEnabled={giftsEnabled}
        onGiftsEnabledChange={setGiftsEnabled}
        questionPools={mergedPools}
        selectedQuestionPoolId={questionPoolId}
        onQuestionPoolChange={(value) => setQuestionPoolId(value as QuestionPoolId)}
        questionAudience={questionAudience}
        onQuestionAudienceChange={setQuestionAudience}
        customPools={customPools}
        onRemoveCustomPool={handleRemoveCustomPool}
        onGenerateAiPool={handleGenerateAiPool}
        aiLoading={aiLoading}
        aiError={aiError}
        apiKeyPrefill={savedApiKey}
        language={language}
        onLanguageChange={setLanguage}
        players={players}
        onPlayerNameChange={handlePlayerNameChange}
        onPlayerAdd={handlePlayerAdd}
          onPlayerRemove={handlePlayerRemove}
        />
    </div>
  );
};

export default Index;
