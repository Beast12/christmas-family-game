import { Settings2 } from 'lucide-react';
import { Language, t } from '@/lib/i18n';

interface HeaderProps {
  onOpenSettings: () => void;
  language: Language;
  currentPlayer: string;
}

const Header = ({ onOpenSettings, language, currentPlayer }: HeaderProps) => {
  return (
    <header className="text-center py-8 relative">
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground drop-shadow-lg">
        {t(language, 'currentTurn')}: {currentPlayer}
      </h1>
      
      {/* Settings button */}
      <button
        onClick={onOpenSettings}
        className="absolute top-4 right-4 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
        aria-label="Instellingen"
      >
        <Settings2 className="w-5 h-5 text-foreground/70" />
      </button>
    </header>
  );
};

export default Header;
