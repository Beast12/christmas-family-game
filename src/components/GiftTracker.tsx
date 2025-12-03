import { Language, t } from '@/lib/i18n';

interface GiftTrackerProps {
  players: { name: string; gifts: number; correct: number; bonuses: { skipUsed: boolean; jokerUsed: boolean; doubleUsed: boolean } }[];
  activeIndex: number;
  maxGifts: number;
  threshold: number;
  onAward: (index: number) => void;
  onRemove: (index: number) => void;
  onCorrect: (index: number) => void;
  onSkip: (index: number) => void;
  onJoker: (index: number) => void;
  language: Language;
}

const GiftTracker = ({
  players,
  activeIndex,
  maxGifts,
  threshold,
  onAward,
  onRemove,
  onCorrect,
  onSkip,
  onJoker,
  language,
}: GiftTrackerProps) => {
  return (
    <section className="max-w-6xl mx-auto mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-2 px-1">
        {players.map((player, index) => {
          const isActive = index === activeIndex;
          const { gifts, correct, bonuses } = player;
          const progress = maxGifts === 0 ? 0 : Math.min(100, Math.round((gifts / maxGifts) * 100));
          const correctProgress = Math.min(100, Math.round((correct / threshold) * 100));
          return (
            <div
              key={player.name}
              className={`w-full rounded-2xl border bg-card/80 backdrop-blur-sm p-4 transition-all ${
                isActive ? 'border-accent shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]' : 'border-border/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-card-foreground/60">{t(language, 'giftTracker')}</p>
                  <h3 className="font-display text-xl text-card-foreground">{player.name}</h3>
                </div>
                {isActive && (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-foreground/10 text-foreground">
                    {t(language, 'currentTurn')}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-card-foreground/80 mb-2">
                <span>{t(language, 'giftCount', { gifts, max: maxGifts })}</span>
                <span className="text-card-foreground/60">{t(language, 'giftRemaining', { remaining: Math.max(0, maxGifts - gifts) })}</span>
              </div>

              <div className="h-2 w-full rounded-full bg-card-foreground/10 overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-christmas-green to-christmas-gold transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-card-foreground/80 mb-2">
                  <span>{t(language, 'correctCount', { correct, threshold })}</span>
                  <span className="text-card-foreground/60">{t(language, 'correctRemaining', { remaining: Math.max(0, threshold - correct) })}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-card-foreground/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-accent transition-all"
                    style={{ width: `${correctProgress}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => onCorrect(index)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold flex-1 transition-colors bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:opacity-90"
                >
                  {t(language, 'correctPlus')}
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => onSkip(index)}
                  disabled={bonuses.skipUsed || !isActive}
                  className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                    bonuses.skipUsed || !isActive
                      ? 'bg-card-foreground/5 text-card-foreground/40 cursor-not-allowed'
                      : 'bg-card-foreground/10 text-card-foreground hover:bg-card-foreground/15'
                  }`}
                >
                  {t(language, 'skip')}
                </button>
                <button
                  onClick={() => onJoker(index)}
                  disabled={bonuses.jokerUsed || !isActive}
                  className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                    bonuses.jokerUsed || !isActive
                      ? 'bg-card-foreground/5 text-card-foreground/40 cursor-not-allowed'
                      : 'bg-card-foreground/10 text-card-foreground hover:bg-card-foreground/15'
                  }`}
                >
                  {t(language, 'lifeline')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GiftTracker;
