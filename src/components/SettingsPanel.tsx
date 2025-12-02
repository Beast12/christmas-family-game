import { X, Shuffle, Moon, Sun } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onShuffle: () => void;
  theme: 'christmas' | 'winter';
  onToggleTheme: () => void;
}

const SettingsPanel = ({ isOpen, onClose, onShuffle, theme, onToggleTheme }: SettingsPanelProps) => {
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

        <h2 className="font-display text-2xl text-card-foreground mb-6">Settings</h2>

        <div className="space-y-4">
          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-card-foreground/5 hover:bg-card-foreground/10 transition-colors"
          >
            <span className="flex items-center gap-3 text-card-foreground">
              {theme === 'christmas' ? (
                <Sun className="w-5 h-5 text-christmas-gold" />
              ) : (
                <Moon className="w-5 h-5 text-sky-400" />
              )}
              <span>Theme</span>
            </span>
            <span className="text-sm text-card-foreground/60 capitalize">
              {theme === 'christmas' ? 'Warm Red' : 'Winter Night'}
            </span>
          </button>

          {/* Shuffle button */}
          <button
            onClick={() => {
              onShuffle();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Shuffle className="w-5 h-5" />
            <span>Shuffle Now</span>
          </button>
        </div>

        <p className="text-center text-card-foreground/50 text-xs mt-6">
          Made with ❤️ for family game nights
        </p>
      </div>
    </div>
  );
};

export default SettingsPanel;
