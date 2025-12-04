import { useState, useEffect, useCallback } from 'react';
import { getQuestions, shuffleArray, Question } from '@/data/questions';
import Snowflakes from '@/components/Snowflakes';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import SettingsPanel from '@/components/SettingsPanel';
import PlayerSpotlight from '@/components/PlayerSpotlight';
import GiftTracker from '@/components/GiftTracker';
import LootBoxModal from '@/components/LootBoxModal';
import { Language } from '@/lib/i18n';
import { t } from '@/lib/i18n';

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
  const [theme, setTheme] = useState<'christmas' | 'winter' | 'peppermint' | 'midnight'>('christmas');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [language, setLanguage] = useState<Language>('nl');
  const [lootBoxReward, setLootBoxReward] = useState<{ player: string; message: string } | null>(null);
  const [riddleMinutes, setRiddleMinutes] = useState(1);

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

  const initializeQuestions = useCallback(() => {
    const bank = getQuestions(language);
    const shuffled = shuffleArray(bank);
    setTotalQuestions(bank.length);
    setCurrentQuestion(shuffled[0]);
    setRemainingQuestions(shuffled.slice(1));
  }, [language]);

  useEffect(() => {
    initializeQuestions();
  }, [initializeQuestions]);

  useEffect(() => {
    const title = language === 'nl' ? 'Kerstavond Familiespel' : 'Christmas Eve Family Game';
    document.title = title;
  }, [language]);

  useEffect(() => {
    const themeClasses = ['theme-winter', 'theme-peppermint', 'theme-midnight'];
    document.body.classList.remove(...themeClasses);
    if (theme !== 'christmas') {
      document.body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

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

  const handleThemeChange = (value: 'christmas' | 'winter' | 'peppermint' | 'midnight') => {
    setTheme(value);
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
      <Snowflakes />
      
      <Header
        onOpenSettings={() => setSettingsOpen(true)}
        language={language}
      />

      <div className="px-4">
        <PlayerSpotlight
          players={players.map(player => ({ ...player, maxGifts }))}
          activeIndex={currentPlayerIndex}
          language={language}
        />
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
