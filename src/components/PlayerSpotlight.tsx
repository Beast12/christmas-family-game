import { Language, t } from '@/lib/i18n';

interface PlayerSpotlightProps {
  players: { name: string; gifts?: number; maxGifts?: number; bonuses?: { skipUsed: boolean; jokerUsed: boolean; doubleUsed: boolean } }[];
  activeIndex: number;
  language: Language;
}

const PlayerSpotlight = ({ players, activeIndex, language }: PlayerSpotlightProps) => {
  const activeName = players[activeIndex]?.name ?? '';
  return (
    <section className="relative max-w-4xl mx-auto mb-6">
      <div className="text-center text-foreground/70 text-sm mb-2">
        🎯 {t(language, 'currentTurn')}: <span className="font-semibold text-foreground">{activeName}</span>
      </div>

      <div className="flex gap-3 justify-center items-end">
        {players.map((player, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={player.name}
              className={`transition-all duration-300 flex-1 min-w-[120px] max-w-[180px] rounded-2xl border bg-card/70 backdrop-blur-sm ${
                isActive
                  ? 'border-accent shadow-[0_10px_35px_-15px_rgba(0,0,0,0.5)] scale-105'
                  : 'border-border/60 opacity-80'
              }`}
            >
              <div
                className={`p-4 text-center ${
                  isActive ? 'bg-gradient-to-r from-primary/20 to-accent/20' : ''
                } rounded-2xl`}
              >
                <div className="text-xs uppercase tracking-wide text-card-foreground/60 mb-1">
                  {isActive ? t(language, 'spotlight') : t(language, 'waiting')}
                </div>
                <div className="font-display text-xl text-card-foreground">{player.name}</div>
                {typeof player.gifts === 'number' && typeof player.maxGifts === 'number' && (
                  <div className="text-xs text-card-foreground/60 mt-1">
                    {t(language, 'giftCount', { gifts: player.gifts, max: player.maxGifts })}
                  </div>
                )}
                {isActive && (
                  <div className="mt-2 text-xs text-christmas-green font-semibold">
                    {t(language, 'takeSpotlight')} ✨
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PlayerSpotlight;
