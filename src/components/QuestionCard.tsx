import { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { Question } from '@/data/questions';

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
  remaining: number;
  total: number;
}

const categoryColors: Record<Question['category'], string> = {
  'Riddle': 'from-amber-600 to-amber-700',
  'Family & Memories': 'from-rose-600 to-rose-700',
  'Task/Action': 'from-emerald-600 to-emerald-700',
  'Dilemma': 'from-purple-600 to-purple-700',
  'Reflection': 'from-sky-600 to-sky-700',
};

const QuestionCard = ({ question, onNext, remaining, total }: QuestionCardProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    setShowAnswer(false);
    onNext();
  };

  const hasAnswer = !!question.answer;

  return (
    <div className="christmas-card rounded-2xl p-8 md:p-12 max-w-3xl w-full mx-4 relative">
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 text-2xl opacity-20">🎄</div>
      <div className="absolute top-4 right-4 text-2xl opacity-20">⭐</div>
      <div className="absolute bottom-4 left-4 text-2xl opacity-20">🔔</div>
      <div className="absolute bottom-4 right-4 text-2xl opacity-20">🎁</div>

      {/* Remaining counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-card-foreground/60 font-medium">
        {remaining} of {total} remaining
      </div>

      {/* Category badge */}
      <div className="flex justify-center mb-6 mt-4">
        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${categoryColors[question.category]} shadow-lg`}>
          {question.category}
        </span>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-card-foreground leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Answer section */}
      {hasAnswer && !showAnswer && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowAnswer(true)}
            className="btn-christmas-gold flex items-center gap-2 text-lg"
          >
            <Gift className="w-5 h-5" />
            Reveal Answer 🎁
          </button>
        </div>
      )}

      {hasAnswer && showAnswer && (
        <div className="answer-reveal text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-christmas-gold" />
            <span className="font-semibold text-card-foreground/70 uppercase text-sm tracking-wide">Answer</span>
            <Sparkles className="w-5 h-5 text-christmas-gold" />
          </div>
          <p className="font-display text-xl md:text-2xl text-card-foreground">
            {question.answer}
          </p>
        </div>
      )}

      {!hasAnswer && (
        <div className="text-center mb-6 p-4 rounded-xl bg-card-foreground/5">
          <p className="text-card-foreground/60 italic">
            ✨ This question has no fixed answer. Anything heartfelt or funny counts! ✨
          </p>
        </div>
      )}

      {/* Next button */}
      <div className="flex justify-center">
        <button
          onClick={handleNext}
          className="btn-christmas-green text-lg flex items-center gap-2"
        >
          Next Question
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
