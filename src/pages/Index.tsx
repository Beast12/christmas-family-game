import { useState, useEffect, useCallback } from 'react';
import { questions, shuffleArray, Question } from '@/data/questions';
import Snowflakes from '@/components/Snowflakes';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import SettingsPanel from '@/components/SettingsPanel';
import PlayerSpotlight from '@/components/PlayerSpotlight';
import GiftTracker from '@/components/GiftTracker';

type Player = {
  name: string;
  gifts: number;
};

const Index = () => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Broos', gifts: 0 },
    { name: 'Finn', gifts: 0 },
    { name: 'Tibo', gifts: 0 },
    { name: 'Jill', gifts: 0 },
  ]);
  const [maxGifts, setMaxGifts] = useState(3);
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'christmas' | 'winter'>('christmas');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

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

  const handleAwardGift = (playerIndex: number) => {
    setPlayers(prev =>
      prev.map((player, index) => {
        if (index !== playerIndex) return player;
        const nextGifts = Math.min(player.gifts + 1, maxGifts);
        return { ...player, gifts: nextGifts };
      })
    );
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

        <SettingsPanel
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          onShuffle={handleShuffle}
          theme={theme}
          onToggleTheme={toggleTheme}
          maxGifts={maxGifts}
          onMaxChange={handleAdjustMaxGifts}
        />
    </div>
  );
};

export default Index;
