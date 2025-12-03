import { useState, useEffect } from 'react';
import { Gift, Sparkles, PartyPopper, Clock, Lightbulb } from 'lucide-react';
import { Question } from '@/data/questions';
import { Language, t } from '@/lib/i18n';

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
  remaining: number;
  total: number;
  currentPlayer: string;
  language: Language;
  riddleMinutes: number;
}

const categoryColors: Record<Question['category'], string> = {
  'Raadsel': 'from-amber-600 to-amber-700',
  'Familie & Herinneringen': 'from-rose-600 to-rose-700',
  'Taak/Actie': 'from-emerald-600 to-emerald-700',
  'Dilemma': 'from-purple-600 to-purple-700',
  'Reflectie': 'from-sky-600 to-sky-700',
};

const QuestionCard = ({
  question,
  onNext,
  remaining,
  total,
  currentPlayer,
  language,
  riddleMinutes,
}: QuestionCardProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [actionDuration, setActionDuration] = useState(25);
  const [actionTimeLeft, setActionTimeLeft] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [showTimeout, setShowTimeout] = useState(false);

  const isAction = question.category === 'Taak/Actie';
  const isRiddleWithAnswer = question.category === 'Raadsel' && !!question.answer;
  const isRiddle = question.category === 'Raadsel' || question.category === 'Riddle';
  const riddleTotalSeconds = Math.max(0, Math.round(riddleMinutes * 60));
  const [riddleTimeLeft, setRiddleTimeLeft] = useState(riddleTotalSeconds);

  const handleNext = () => {
    setShowAnswer(false);
    setShowConfetti(false);
    setTimerRunning(false);
    onNext();
  };

  const hasAnswer = !!question.answer;

  // Reset per vraag
  useEffect(() => {
    setShowAnswer(false);
    setShowConfetti(false);
    const newDuration = Math.floor(Math.random() * 11) + 20; // 20-30s
    setActionDuration(newDuration);
    setActionTimeLeft(newDuration);
    setTimerRunning(false);
    setRevealedIndices([]);
    setRiddleTimeLeft(Math.max(0, Math.round(riddleMinutes * 60)));
    setShowTimeout(false);
  }, [question.id, riddleMinutes]);

  // Timer tick
  useEffect(() => {
    if (!timerRunning) return;
    if (!isAction) return;
    if (actionTimeLeft <= 0) {
      setTimerRunning(false);
      return;
    }
    const interval = setInterval(() => {
      setActionTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, actionTimeLeft, isAction]);

  // Riddle timer tick
  useEffect(() => {
    if (!isRiddle) return;
    if (riddleTimeLeft <= 0) return;
    const interval = setInterval(() => {
      setRiddleTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRiddle, riddleTimeLeft]);

  useEffect(() => {
    if (!isRiddle) return;
    if (riddleTimeLeft === 0) {
      setShowTimeout(true);
    }
  }, [isRiddle, riddleTimeLeft]);

  const handleStartTimer = () => {
    if (!isAction) return;
    setActionTimeLeft(actionDuration);
    setTimerRunning(true);
  };

  const handleStopTimer = () => {
    setTimerRunning(false);
  };

  const handleSuccess = () => {
    setTimerRunning(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleRevealHint = () => {
    if (!question.answer) return;
    if (isRiddle) {
      setRiddleTimeLeft((prev) => Math.max(0, prev - 10));
    }
    const chars = question.answer.split('');
    const eligible = chars
      .map((char, idx) => ({ char, idx }))
      .filter(({ char, idx }) => !revealedIndices.includes(idx) && /[A-Za-z0-9]/.test(char));
    if (eligible.length === 0) return;
    const random = eligible[Math.floor(Math.random() * eligible.length)];
    setRevealedIndices((prev) => [...prev, random.idx]);
  };

  const getHintText = () => {
    if (!question.answer) return '';
    const chars = question.answer.split('');
    return chars
      .map((char, idx) => {
        if (!/[A-Za-z0-9]/.test(char)) return char;
        return revealedIndices.includes(idx) ? char : '•';
      })
      .join('');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="christmas-card rounded-2xl p-8 md:p-12 max-w-3xl w-full mx-4 relative">
      {showTimeout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowTimeout(false)} />
          <div className="relative bg-card rounded-2xl p-6 w-full max-w-sm border border-border shadow-2xl text-center">
            <h3 className="font-display text-2xl text-card-foreground mb-2">{t(language, 'riddleTimeUpTitle')}</h3>
            <p className="text-card-foreground/80 mb-4">{t(language, 'riddleTimeUpMessage')}</p>
            <button
              onClick={() => setShowTimeout(false)}
              className="w-full px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90 transition-colors"
            >
              {t(language, 'riddleTimeUpClose')}
            </button>
          </div>
        </div>
      )}
      {showConfetti && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: `${(i / 18) * 100}%`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              🎉
            </span>
          ))}
        </div>
      )}

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 text-2xl opacity-20">🎄</div>
      <div className="absolute top-4 right-4 text-2xl opacity-20">⭐</div>
      <div className="absolute bottom-4 left-4 text-2xl opacity-20">🔔</div>
      <div className="absolute bottom-4 right-4 text-2xl opacity-20">🎁</div>

      {/* Remaining counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-card-foreground/60 font-medium">
        {t(language, 'questionRemaining', { remaining, total })}
      </div>

      {/* Category badge */}
      <div className="flex justify-center mb-6 mt-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/90 text-card-foreground shadow-[0_6px_16px_rgba(0,0,0,0.25)] border border-border/70">
          <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[question.category]} shadow-[0_0_6px_rgba(0,0,0,0.3)]`} />
          {question.category}
        </span>
      </div>

      {/* Player */}
      <div className="flex justify-center mb-4">
        <span className="px-4 py-2 rounded-full bg-foreground/10 text-card-foreground text-sm font-semibold">
          🎄 {t(language, 'playerTurnLabel', { player: currentPlayer })}
        </span>
      </div>

      {/* All-play notice for riddles */}
      {isRiddle && (
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="px-4 py-2 rounded-full bg-accent/10 text-card-foreground text-sm font-semibold border border-accent/30">
            {t(language, 'riddleAllPlay')}
          </div>
          {riddleTotalSeconds > 0 && (
            <div className="flex items-center gap-2 text-card-foreground/80 text-sm">
              <Clock className="w-4 h-4" />
              <span>{t(language, 'riddleTimerLabel')}: {formatTime(riddleTimeLeft)}</span>
              {riddleTimeLeft <= 0 && <span className="text-red-500 font-semibold">Time up</span>}
            </div>
          )}
          {riddleTotalSeconds > 0 && (
            <div className="h-2 w-full max-w-sm rounded-full bg-card-foreground/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-700 transition-all"
                style={{ width: `${riddleTotalSeconds === 0 ? 0 : Math.max(0, Math.min(100, Math.round((riddleTimeLeft / riddleTotalSeconds) * 100))) }%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Action timer */}
      {isAction && (
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-card-foreground/80">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{t(language, 'timer')}: {actionTimeLeft}s</span>
            <span className="text-xs text-card-foreground/60">{t(language, 'timerRange')}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleStartTimer}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:opacity-90 transition-colors"
            >
              {t(language, 'timerStart')} ({actionDuration}s)
            </button>
            <button
              onClick={handleStopTimer}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-card-foreground/10 text-card-foreground hover:bg-card-foreground/15 transition-colors"
            >
              {t(language, 'timerStop')}
            </button>
            <button
              onClick={handleSuccess}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:opacity-90 transition-colors flex items-center gap-2"
            >
              <PartyPopper className="w-4 h-4" />
              {t(language, 'timerSuccess')}
            </button>
          </div>
        </div>
      )}

      {/* Riddle hint */}
      {isRiddleWithAnswer && (
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="text-sm text-card-foreground/70 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span>{t(language, 'hintPrompt')}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRevealHint}
              disabled={question.answer ? revealedIndices.length >= question.answer.replace(/[^A-Za-z0-9]/g, '').length : true}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
                question.answer && revealedIndices.length < question.answer.replace(/[^A-Za-z0-9]/g, '').length
                  ? 'bg-card-foreground/10 text-card-foreground hover:bg-card-foreground/15'
                  : 'bg-card-foreground/5 text-card-foreground/40 cursor-not-allowed'
              }`}
            >
              {t(language, 'hintButton')}
            </button>
            <span className="font-display text-lg text-card-foreground tracking-wide">
              {getHintText()}
            </span>
          </div>
        </div>
      )}

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
            {t(language, 'showAnswer')} 🎁
          </button>
        </div>
      )}

      {hasAnswer && showAnswer && (
        <div className="answer-reveal text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-christmas-gold" />
            <span className="font-semibold text-card-foreground/70 uppercase text-sm tracking-wide">{t(language, 'answerLabel')}</span>
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
            {t(language, 'noFixedAnswer')}
          </p>
        </div>
      )}

      {/* Next button */}
      <div className="flex justify-center">
        <button
          onClick={handleNext}
          className="btn-christmas-green text-lg flex items-center gap-2"
        >
          {t(language, 'nextQuestion')}
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
