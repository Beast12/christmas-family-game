import { TreePine, Snowflake, Settings2, Sparkles } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { ThemeId, isChristmasTheme } from '@/lib/themes';

interface HeaderProps {
  onOpenSettings: () => void;
  language: Language;
  theme: ThemeId;
}

const headerCopy: Record<
  ThemeId,
  {
    title: { nl: string; en: string };
    subtitle: { nl: string; en: string };
    tagline: { nl: string; en: string };
  }
> = {
  'christmas-eve': {
    title: { nl: 'Kerstavond', en: 'Christmas Eve' },
    subtitle: { nl: 'Familiespel', en: 'Family Game' },
    tagline: {
      nl: '✨ Vragen, raadsels & plezier voor het hele gezin ✨',
      en: '✨ Questions, riddles & fun for the whole family ✨',
    },
  },
  'christmas-day': {
    title: { nl: 'Eerste Kerstdag', en: 'Christmas Day' },
    subtitle: { nl: 'Familiequiz', en: 'Family Quiz' },
    tagline: {
      nl: '🎄 Samen quizzen, lachen en cadeaus delen 🎄',
      en: '🎄 Quiz, laugh, and share gifts together 🎄',
    },
  },
  easter: {
    title: { nl: 'Pasen', en: 'Easter' },
    subtitle: { nl: 'Familiequiz', en: 'Family Quiz' },
    tagline: {
      nl: '🐣 Lichte vragen en vrolijke uitdagingen 🐣',
      en: '🐣 Light questions and cheerful challenges 🐣',
    },
  },
  summer: {
    title: { nl: 'Zomer', en: 'Summer' },
    subtitle: { nl: 'Quizavond', en: 'Quiz Night' },
    tagline: {
      nl: '☀️ Luchtig spel voor elke zomerdag ☀️',
      en: '☀️ A breezy game for any summer day ☀️',
    },
  },
  cozy: {
    title: { nl: 'Familiequiz', en: 'Family Quiz' },
    subtitle: { nl: 'Spelavond', en: 'Game Night' },
    tagline: {
      nl: '✨ Speel mee, wanneer je maar wilt ✨',
      en: '✨ Play any day, any time ✨',
    },
  },
  sunset: {
    title: { nl: 'Quizavond', en: 'Quiz Night' },
    subtitle: { nl: 'Tijd voor spel', en: 'Time to Play' },
    tagline: {
      nl: '🌅 Vragen en plezier voor iedereen 🌅',
      en: '🌅 Questions and fun for everyone 🌅',
    },
  },
  slate: {
    title: { nl: 'Gezelschapsspel', en: 'Game Night' },
    subtitle: { nl: 'Familiequiz', en: 'Family Quiz' },
    tagline: {
      nl: '🎲 Klassiek, simpel en gezellig 🎲',
      en: '🎲 Classic, simple, and cozy 🎲',
    },
  },
};

const Header = ({ onOpenSettings, language, theme }: HeaderProps) => {
  const copy = headerCopy[theme] ?? headerCopy.cozy;
  return (
    <header className="text-center py-8 relative">
      <div className="flex items-center justify-center gap-3 mb-2">
        {isChristmasTheme(theme) ? (
          <>
            <Snowflake className="w-6 h-6 text-foreground/80 animate-pulse" />
            <TreePine className="w-10 h-10 text-christmas-green" />
            <Snowflake className="w-6 h-6 text-foreground/80 animate-pulse" />
          </>
        ) : (
          <>
            <Sparkles className="w-6 h-6 text-foreground/80 animate-pulse" />
            <span className="font-display text-2xl text-christmas-gold">★</span>
            <Sparkles className="w-6 h-6 text-foreground/80 animate-pulse" />
          </>
        )}
      </div>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-2 drop-shadow-lg">
        {language === 'nl' ? copy.title.nl : copy.title.en}
      </h1>
      <p className="font-display text-2xl md:text-3xl text-christmas-gold">
        {language === 'nl' ? copy.subtitle.nl : copy.subtitle.en}
      </p>
      <p className="text-foreground/60 mt-2 text-sm">
        {language === 'nl' ? copy.tagline.nl : copy.tagline.en}
      </p>
      <p className="text-foreground/50 mt-2 text-xs">
        {t(language, 'versionLabel')}: v{__APP_VERSION__}
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
