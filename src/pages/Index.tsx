import { useState, useEffect, useCallback } from 'react';
import { questions, shuffleArray, Question } from '@/data/questions';
import Snowflakes from '@/components/Snowflakes';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import SettingsPanel from '@/components/SettingsPanel';
import PlayerSpotlight from '@/components/PlayerSpotlight';
import GiftTracker from '@/components/GiftTracker';
import LootBoxModal from '@/components/LootBoxModal';

type Player = {
  name: string;
  gifts: number;
  bonuses: {
    skipUsed: boolean;
    jokerUsed: boolean;
    doubleUsed: boolean;
  };
};

const Index = () => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Broos', gifts: 0, bonuses: { skipUsed: false, jokerUsed: false, doubleUsed: false } },
    { name: 'Finn', gifts: 0, bonuses: { skipUsed: false, jokerUsed: false, doubleUsed: false } },
    { name: 'Tibo', gifts: 0, bonuses: { skipUsed: false, jokerUsed: false, doubleUsed: false } },
    { name: 'Jill', gifts: 0, bonuses: { skipUsed: false, jokerUsed: false, doubleUsed: false } },
  ]);
  const [maxGifts, setMaxGifts] = useState(3);
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'christmas' | 'winter'>('christmas');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [lootBoxReward, setLootBoxReward] = useState<{ player: string; message: string } | null>(null);

  const rewardMessages = [
    'Pak een klein pakje',
    'Pak een groot pakje',
    'Jij mag iemand anders een pakje laten pakken',
    'Kies een pakje en geef het door aan iemand naar keuze',
    'Pak een pakje en wissel van stoel met iemand',
    'Pak een pakje, maar open het pas na 1 minuut',
  ];

  const initializeQuestions = useCallback(() => {
    const shuffled = shuffleArray(questions);
    setCurrentQuestion(shuffled[0]);
    setRemainingQuestions(shuffled.slice(1));
  }, []);

  useEffect(() => {
    initializeQuestions();
  }, [initializeQuestions]);

  useEffect(() => {
    if (theme === 'winter') {
      document.body.classList.add('theme-winter');
    } else {
      document.body.classList.remove('theme-winter');
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

  const toggleTheme = () => {
    setTheme(prev => prev === 'christmas' ? 'winter' : 'christmas');
  };

  const handlePlayerNameChange = (playerIndex: number, name: string) => {
    setPlayers(prev =>
      prev.map((player, index) =>
        index === playerIndex ? { ...player, name: name || `Speler ${index + 1}` } : player
      )
    );
  };

  const handlePlayerAdd = () => {
    setPlayers(prev => [
      ...prev,
      { name: `Speler ${prev.length + 1}`, gifts: 0, bonuses: { skipUsed: false, jokerUsed: false, doubleUsed: false } },
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
        const randomMessage = rewardMessages[Math.floor(Math.random() * rewardMessages.length)];
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

  const handleRemoveGift = (playerIndex: number) => {
    setPlayers(prev =>
      prev.map((player, index) => {
        if (index !== playerIndex) return player;
        const nextGifts = Math.max(0, player.gifts - 1);
        return { ...player, gifts: nextGifts };
      })
    );
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
        <div className="text-foreground text-xl animate-pulse">Laden...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Snowflakes />
      
      <Header onOpenSettings={() => setSettingsOpen(true)} />

      <div className="px-4">
        <PlayerSpotlight
          players={players.map(player => ({ ...player, maxGifts }))}
          activeIndex={currentPlayerIndex}
        />
        <GiftTracker
          players={players}
          activeIndex={currentPlayerIndex}
          maxGifts={maxGifts}
          onAward={(index) => handleAwardGift(index)}
          onRemove={(index) => handleRemoveGift(index)}
          onSkip={(index) => handleUseSkip(index)}
          onJoker={(index) => handleUseJoker(index)}
        />
      </div>

      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        <QuestionCard
          question={currentQuestion}
          onNext={handleNextQuestion}
          remaining={remainingQuestions.length + 1}
          total={questions.length}
          currentPlayer={players[currentPlayerIndex].name}
        />
      </main>

      <LootBoxModal
        reward={lootBoxReward}
        onClose={() => setLootBoxReward(null)}
      />

        <SettingsPanel
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          onShuffle={handleShuffle}
          theme={theme}
          onToggleTheme={toggleTheme}
          maxGifts={maxGifts}
          onMaxChange={handleAdjustMaxGifts}
          players={players}
          onPlayerNameChange={handlePlayerNameChange}
          onPlayerAdd={handlePlayerAdd}
          onPlayerRemove={handlePlayerRemove}
        />
    </div>
  );
};

export default Index;
