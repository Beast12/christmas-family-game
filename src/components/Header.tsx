import { TreePine, Snowflake, Settings2 } from 'lucide-react';
import { Language, t } from '@/lib/i18n';

interface HeaderProps {
  onOpenSettings: () => void;
  language: Language;
}

const Header = ({ onOpenSettings, language }: HeaderProps) => {
  return (
    <header className="text-center py-8 relative">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Snowflake className="w-6 h-6 text-foreground/80 animate-pulse" />
        <TreePine className="w-10 h-10 text-christmas-green" />
        <Snowflake className="w-6 h-6 text-foreground/80 animate-pulse" />
      </div>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-2 drop-shadow-lg">
        {language === 'nl' ? 'Kerstavond' : 'Christmas Eve'}
      </h1>
      <p className="font-display text-2xl md:text-3xl text-christmas-gold">
        {language === 'nl' ? 'Familiespel' : 'Family Game'}
      </p>
      <p className="text-foreground/60 mt-2 text-sm">
        {language === 'nl' ? '✨ Vragen, raadsels & plezier voor het hele gezin ✨' : '✨ Questions, riddles & fun for the whole family ✨'}
      </p>
      
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
