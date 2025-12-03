import { X, Shuffle } from 'lucide-react';
import { Language, t } from '@/lib/i18n';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onShuffle: () => void;
  theme: 'christmas' | 'winter' | 'peppermint' | 'midnight';
  onThemeChange: (value: 'christmas' | 'winter' | 'peppermint' | 'midnight') => void;
  maxGifts: number;
  onMaxChange: (value: number) => void;
  riddleMinutes: number;
  onRiddleMinutesChange: (value: number) => void;
  threshold: number;
  onThresholdChange: (value: number) => void;
  players: { name: string }[];
  onPlayerNameChange: (index: number, name: string) => void;
  onPlayerAdd: () => void;
  onPlayerRemove: (index: number) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const SettingsPanel = ({
  isOpen,
  onClose,
  onShuffle,
  theme,
  onThemeChange,
  maxGifts,
  onMaxChange,
  riddleMinutes,
  onRiddleMinutesChange,
  threshold,
  onThresholdChange,
  players,
  onPlayerNameChange,
  onPlayerAdd,
  onPlayerRemove,
  language,
  onLanguageChange,
}: SettingsPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative bg-card rounded-2xl p-6 w-full max-w-sm shadow-2xl border-2 border-accent/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-card-foreground/60 hover:text-card-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-display text-2xl text-card-foreground mb-6">{t(language, 'settingsTitle')}</h2>

        <div className="space-y-4">
          {/* Language toggle */}
          <div className="w-full flex items-center justify-between p-4 rounded-xl bg-card-foreground/5">
            <span className="text-card-foreground font-semibold text-sm">Taal / Language</span>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="nl">Nederlands</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Player names */}
          <div className="p-4 rounded-xl bg-card-foreground/5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-card-foreground flex flex-col">
                <span className="font-semibold text-sm">{t(language, 'playersTitle')}</span>
                <span className="text-xs text-card-foreground/60">{t(language, 'playersSub')}</span>
              </div>
              <button
                onClick={onPlayerAdd}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:opacity-90 transition-colors"
              >
                {t(language, 'addPlayer')}
              </button>
            </div>
            <div className="space-y-2">
              {players.map((player, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => onPlayerNameChange(index, e.target.value)}
                    className="flex-1 rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button
                    onClick={() => onPlayerRemove(index)}
                    disabled={players.length <= 1}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                      players.length <= 1
                        ? 'text-card-foreground/40 border-card-foreground/15 cursor-not-allowed'
                        : 'text-card-foreground border-card-foreground/30 hover:bg-card-foreground/10'
                    }`}
                    aria-label="Verwijder speler"
                  >
                    {t(language, 'remove')}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Max gifts per child */}
          <div className="w-full flex items-center justify-between p-4 rounded-xl bg-card-foreground/5">
            <div className="text-card-foreground flex flex-col">
              <span className="font-semibold text-sm">{t(language, 'maxPerChild')}</span>
              <span className="text-xs text-card-foreground/60">{t(language, 'maxPerChildSub')}</span>
            </div>
            <input
              type="number"
              min={0}
              value={maxGifts}
              onChange={(e) => onMaxChange(parseInt(e.target.value, 10) || 0)}
              className="w-20 rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Riddle timer minutes */}
          <div className="w-full flex items-center justify-between p-4 rounded-xl bg-card-foreground/5">
            <div className="text-card-foreground flex flex-col">
              <span className="font-semibold text-sm">{t(language, 'riddleTimerLabel')}</span>
              <span className="text-xs text-card-foreground/60">{t(language, 'riddleTimerSub')}</span>
            </div>
            <input
              type="number"
              min={0}
              step={0.5}
              value={riddleMinutes}
              onChange={(e) => onRiddleMinutesChange(parseFloat(e.target.value) || 0)}
              className="w-20 rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Threshold for gifts */}
          <div className="w-full flex items-center justify-between p-4 rounded-xl bg-card-foreground/5">
            <div className="text-card-foreground flex flex-col">
              <span className="font-semibold text-sm">{t(language, 'thresholdLabel')}</span>
              <span className="text-xs text-card-foreground/60">{t(language, 'thresholdSub')}</span>
            </div>
            <input
              type="number"
              min={1}
              value={threshold}
              onChange={(e) => onThresholdChange(parseInt(e.target.value, 10) || 1)}
              className="w-20 rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Theme select */}
          <div className="w-full flex items-center justify-between p-4 rounded-xl bg-card-foreground/5">
            <span className="text-card-foreground font-semibold text-sm">{t(language, 'theme')}</span>
            <select
              value={theme}
              onChange={(e) => onThemeChange(e.target.value as 'christmas' | 'winter' | 'peppermint' | 'midnight')}
              className="rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent capitalize"
            >
              <option value="christmas">{t(language, 'themeWarm')}</option>
              <option value="winter">{t(language, 'themeWinter')}</option>
              <option value="peppermint">{t(language, 'themePeppermint')}</option>
              <option value="midnight">{t(language, 'themeMidnight')}</option>
            </select>
          </div>

          {/* Shuffle button */}
          <button
            onClick={() => {
              onShuffle();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Shuffle className="w-5 h-5" />
            <span>{t(language, 'shuffleNow')}</span>
          </button>
        </div>

        <p className="text-center text-card-foreground/50 text-xs mt-6">
          {t(language, 'madeWithLove')}
        </p>
      </div>
    </div>
  );
};

export default SettingsPanel;
