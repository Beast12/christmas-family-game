import { useState, useEffect, useCallback } from 'react';
import { questions, shuffleArray, Question } from '@/data/questions';
import Snowflakes from '@/components/Snowflakes';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import SettingsPanel from '@/components/SettingsPanel';

const Index = () => {
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'christmas' | 'winter'>('christmas');

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

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-foreground text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Snowflakes />
      
      <Header onOpenSettings={() => setSettingsOpen(true)} />

      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        <QuestionCard
          question={currentQuestion}
          onNext={handleNextQuestion}
          remaining={remainingQuestions.length + 1}
          total={questions.length}
        />
      </main>

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onShuffle={handleShuffle}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
};

export default Index;
