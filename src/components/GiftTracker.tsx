interface GiftTrackerProps {
  players: { name: string; gifts: number }[];
  activeIndex: number;
  maxGifts: number;
  onAward: (index: number) => void;
  onRemove: (index: number) => void;
}

const GiftTracker = ({ players, activeIndex, maxGifts, onAward, onRemove }: GiftTrackerProps) => {
  return (
    <section className="max-w-6xl mx-auto mb-6">
      <div className="flex gap-3 overflow-x-auto pb-2 px-1 justify-center md:justify-start no-scrollbar">
        {players.map((player, index) => {
          const isActive = index === activeIndex;
          const { gifts } = player;
          const progress = maxGifts === 0 ? 0 : Math.min(100, Math.round((gifts / maxGifts) * 100));
          return (
            <div
              key={player.name}
              className={`w-[260px] md:w-[280px] rounded-2xl border bg-card/80 backdrop-blur-sm p-4 transition-all flex-shrink-0 ${
                isActive ? 'border-accent shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]' : 'border-border/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-card-foreground/60">Cadeau teller</p>
                  <h3 className="font-display text-xl text-card-foreground">{player.name}</h3>
                </div>
                {isActive && (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-foreground/10 text-foreground">
                    Aan de beurt
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-card-foreground/80 mb-2">
                <span>{gifts} / {maxGifts} cadeaus</span>
                <span className="text-card-foreground/60">Nog {Math.max(0, maxGifts - gifts)}</span>
              </div>

              <div className="h-2 w-full rounded-full bg-card-foreground/10 overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-christmas-green to-christmas-gold transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => onRemove(index)}
                  disabled={gifts <= 0}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold flex-1 transition-colors border ${
                    gifts <= 0
                      ? 'bg-card-foreground/5 text-card-foreground/40 border-card-foreground/10 cursor-not-allowed'
                      : 'bg-card-foreground/5 text-card-foreground border-card-foreground/30 hover:bg-card-foreground/10'
                  }`}
                >
                  Cadeau -1
                </button>
                <button
                  onClick={() => onAward(index)}
                  disabled={gifts >= maxGifts}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold flex-1 transition-colors ${
                    gifts >= maxGifts
                      ? 'bg-card-foreground/10 text-card-foreground/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:opacity-90'
                  }`}
                >
                  Cadeau +1
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
