import { useEffect, useState } from 'react';
import { X, Shuffle } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { ThemeId, themeOptions } from '@/lib/themes';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onShuffle: () => void;
  theme: ThemeId;
  onThemeChange: (value: ThemeId) => void;
  maxGifts: number;
  onMaxChange: (value: number) => void;
  riddleMinutes: number;
  onRiddleMinutesChange: (value: number) => void;
  threshold: number;
  onThresholdChange: (value: number) => void;
  giftsEnabled: boolean;
  onGiftsEnabledChange: (value: boolean) => void;
  questionPools: { id: string; name: string }[];
  selectedQuestionPoolId: string;
  onQuestionPoolChange: (value: string) => void;
  questionAudience: 'kids' | 'adults';
  onQuestionAudienceChange: (value: 'kids' | 'adults') => void;
  customPools: { id: string; name: string; prompt: string; count: number }[];
  onRemoveCustomPool: (id: string) => void;
  onGenerateAiPool: (data: {
    name: string;
    prompt: string;
    count: number;
    apiKey: string;
    rememberKey: boolean;
    replaceId?: string;
  }) => void;
  aiLoading: boolean;
  aiError: string | null;
  apiKeyPrefill?: string;
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
  giftsEnabled,
  onGiftsEnabledChange,
  questionPools,
  selectedQuestionPoolId,
  onQuestionPoolChange,
  questionAudience,
  onQuestionAudienceChange,
  customPools,
  onRemoveCustomPool,
  onGenerateAiPool,
  aiLoading,
  aiError,
  apiKeyPrefill,
  players,
  onPlayerNameChange,
  onPlayerAdd,
  onPlayerRemove,
  language,
  onLanguageChange,
}: SettingsPanelProps) => {
  if (!isOpen) return null;

  const [aiPoolName, setAiPoolName] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiKey, setAiKey] = useState(apiKeyPrefill ?? '');
  const [aiCount, setAiCount] = useState(50);
  const [rememberKey, setRememberKey] = useState(!!apiKeyPrefill);

  useEffect(() => {
    setAiKey(apiKeyPrefill ?? '');
    setRememberKey(!!apiKeyPrefill);
  }, [apiKeyPrefill]);

  const handleGenerate = () => {
    if (!aiPoolName.trim() || !aiPrompt.trim() || !aiKey.trim()) return;
    onGenerateAiPool({
      name: aiPoolName.trim(),
      prompt: aiPrompt.trim(),
      count: aiCount,
      apiKey: aiKey.trim(),
      rememberKey,
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative bg-card rounded-2xl p-6 w-full max-w-sm shadow-2xl border-2 border-accent/30 max-h-[calc(100vh-2rem)] overflow-y-auto">
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

          {/* Question pool */}
          <div className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-card-foreground/5">
            <div className="text-card-foreground flex flex-col">
              <span className="font-semibold text-sm">{t(language, 'questionPoolLabel')}</span>
              <span className="text-xs text-card-foreground/60">{t(language, 'questionPoolSub')}</span>
            </div>
            <select
              value={selectedQuestionPoolId}
              onChange={(e) => onQuestionPoolChange(e.target.value)}
              className="rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {questionPools.map((pool) => (
                <option key={pool.id} value={pool.id}>
                  {pool.name}
                </option>
              ))}
            </select>
          </div>

          {(selectedQuestionPoolId === 'trivia' || selectedQuestionPoolId === 'truth-or-dare') && (
            <div className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-card-foreground/5">
              <div className="text-card-foreground flex flex-col">
                <span className="font-semibold text-sm">{t(language, 'audienceLabel')}</span>
                <span className="text-xs text-card-foreground/60">{t(language, 'audienceSub')}</span>
              </div>
              <select
                value={questionAudience}
                onChange={(e) => onQuestionAudienceChange(e.target.value as 'kids' | 'adults')}
                className="rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="kids">{t(language, 'audienceKids')}</option>
                <option value="adults">{t(language, 'audienceAdults')}</option>
              </select>
            </div>
          )}

          {/* AI pool builder */}
          <div className="p-4 rounded-xl bg-card-foreground/5 space-y-3">
            <div className="text-card-foreground flex flex-col">
              <span className="font-semibold text-sm">{t(language, 'aiPoolTitle')}</span>
              <span className="text-xs text-card-foreground/60">{t(language, 'aiPoolSub')}</span>
            </div>
            <input
              type="text"
              value={aiPoolName}
              onChange={(e) => setAiPoolName(e.target.value)}
              placeholder={t(language, 'aiPoolNamePlaceholder')}
              className="w-full rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={t(language, 'aiPoolNameLabel')}
            />
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder={t(language, 'aiPoolPromptPlaceholder')}
              className="w-full min-h-[90px] rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={t(language, 'aiPoolPromptLabel')}
            />
            <div className="flex items-center justify-between gap-4">
              <div className="text-card-foreground flex flex-col">
                <span className="font-semibold text-sm">{t(language, 'aiPoolCountLabel')}</span>
                <span className="text-xs text-card-foreground/60">{t(language, 'aiPoolCountSub')}</span>
              </div>
              <select
                value={aiCount}
                onChange={(e) => setAiCount(Number(e.target.value))}
                className="rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {[20, 30, 40, 50, 75, 100].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="password"
              value={aiKey}
              onChange={(e) => setAiKey(e.target.value)}
              placeholder={t(language, 'aiPoolApiKeyPlaceholder')}
              className="w-full rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={t(language, 'aiPoolApiKeyLabel')}
            />
            <label className="flex items-center gap-2 text-xs text-card-foreground/70">
              <input
                type="checkbox"
                checked={rememberKey}
                onChange={(e) => setRememberKey(e.target.checked)}
                className="h-4 w-4 rounded border border-card-foreground/30 bg-card-foreground/10 text-primary focus:ring-2 focus:ring-accent"
              />
              {t(language, 'aiPoolSaveKey')}
            </label>
            {aiError && (
              <div className="text-xs text-red-500">{t(language, 'aiPoolError')}</div>
            )}
            <button
              onClick={handleGenerate}
              disabled={aiLoading || !aiPoolName.trim() || !aiPrompt.trim() || !aiKey.trim()}
              className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                aiLoading || !aiPoolName.trim() || !aiPrompt.trim() || !aiKey.trim()
                  ? 'bg-card-foreground/5 text-card-foreground/40 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90'
              }`}
            >
              {aiLoading ? t(language, 'aiPoolGenerating') : t(language, 'aiPoolGenerate')}
            </button>
          </div>

          {/* Custom pools */}
          <div className="p-4 rounded-xl bg-card-foreground/5 space-y-2">
            <div className="text-card-foreground flex flex-col">
              <span className="font-semibold text-sm">{t(language, 'aiPoolListTitle')}</span>
              <span className="text-xs text-card-foreground/60">{t(language, 'aiPoolListSub')}</span>
            </div>
            {customPools.length === 0 ? (
              <div className="text-xs text-card-foreground/60">{t(language, 'aiPoolListEmpty')}</div>
            ) : (
              <div className="space-y-2">
                {customPools.map((pool) => (
                  <div key={pool.id} className="flex items-center justify-between gap-2">
                    <span className="text-sm text-card-foreground">{pool.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          onGenerateAiPool({
                            name: pool.name,
                            prompt: aiPrompt.trim() || pool.prompt,
                            count: aiCount || pool.count,
                            apiKey: aiKey.trim(),
                            rememberKey,
                            replaceId: pool.id,
                          })
                        }
                        disabled={aiLoading || !aiKey.trim()}
                        className={`px-2 py-1 rounded-md text-xs font-semibold border transition-colors ${
                          aiLoading || !aiKey.trim()
                            ? 'border-card-foreground/15 text-card-foreground/40 cursor-not-allowed'
                            : 'border-card-foreground/30 text-card-foreground hover:bg-card-foreground/10'
                        }`}
                      >
                        {t(language, 'aiPoolRegenerate')}
                      </button>
                      <button
                        onClick={() => onRemoveCustomPool(pool.id)}
                        className="px-2 py-1 rounded-md text-xs font-semibold border border-card-foreground/30 text-card-foreground hover:bg-card-foreground/10"
                      >
                        {t(language, 'aiPoolRemove')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gifts toggle */}
          <div className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-card-foreground/5">
            <div className="text-card-foreground flex flex-col">
              <span className="font-semibold text-sm">{t(language, 'giftsEnabledLabel')}</span>
              <span className="text-xs text-card-foreground/60">{t(language, 'giftsEnabledSub')}</span>
            </div>
            <label className="inline-flex items-center gap-2 text-sm text-card-foreground/70">
              <input
                type="checkbox"
                checked={giftsEnabled}
                onChange={(e) => onGiftsEnabledChange(e.target.checked)}
                className="h-4 w-4 rounded border border-card-foreground/30 bg-card-foreground/10 text-primary focus:ring-2 focus:ring-accent"
              />
            </label>
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

          {giftsEnabled && (
            <>
              {/* Max gifts per player */}
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
            </>
          )}

          {/* Theme select */}
          <div className="w-full flex items-center justify-between p-4 rounded-xl bg-card-foreground/5">
            <span className="text-card-foreground font-semibold text-sm">{t(language, 'theme')}</span>
            <select
              value={theme}
              onChange={(e) => onThemeChange(e.target.value as ThemeId)}
              className="rounded-lg border border-card-foreground/20 bg-card-foreground/10 px-3 py-2 text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent capitalize"
            >
              {themeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {t(language, option.labelKey)}
                </option>
              ))}
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
