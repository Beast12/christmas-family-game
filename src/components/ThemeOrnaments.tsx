import { ThemeId, isChristmasTheme } from '@/lib/themes';

interface ThemeOrnamentsProps {
  theme: ThemeId;
}

const ThemeOrnaments = ({ theme }: ThemeOrnamentsProps) => {
  if (isChristmasTheme(theme)) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="theme-ornament top-10 left-8 text-3xl">🎄</span>
        <span className="theme-ornament top-24 right-10 text-2xl">✨</span>
        <span className="theme-ornament bottom-16 left-12 text-2xl">🎁</span>
        <span className="theme-ornament bottom-24 right-16 text-3xl">⭐</span>
      </div>
    );
  }

  if (theme === 'easter') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="theme-ornament top-12 left-8 text-3xl">🥚</span>
        <span className="theme-ornament top-28 right-12 text-2xl">🐣</span>
        <span className="theme-ornament bottom-20 left-16 text-2xl">🌼</span>
        <span className="theme-ornament bottom-24 right-10 text-3xl">🐰</span>
      </div>
    );
  }

  if (theme === 'summer') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="theme-ornament top-12 left-10 text-3xl">☀️</span>
        <span className="theme-ornament top-28 right-12 text-2xl">🌴</span>
        <span className="theme-ornament bottom-20 left-16 text-2xl">🍉</span>
        <span className="theme-ornament bottom-24 right-10 text-3xl">🌊</span>
      </div>
    );
  }

  if (theme === 'sunset') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="theme-ornament top-12 left-10 text-3xl">🌅</span>
        <span className="theme-ornament top-28 right-12 text-2xl">✨</span>
        <span className="theme-ornament bottom-20 left-16 text-2xl">🌙</span>
        <span className="theme-ornament bottom-24 right-10 text-3xl">🌇</span>
      </div>
    );
  }

  if (theme === 'slate') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="theme-ornament top-14 left-12 text-2xl">◆</span>
        <span className="theme-ornament top-24 right-12 text-2xl">◇</span>
        <span className="theme-ornament bottom-20 left-16 text-2xl">■</span>
        <span className="theme-ornament bottom-24 right-10 text-2xl">□</span>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="theme-ornament top-14 left-12 text-2xl">🕯️</span>
      <span className="theme-ornament top-28 right-12 text-2xl">✨</span>
      <span className="theme-ornament bottom-20 left-16 text-2xl">☕</span>
      <span className="theme-ornament bottom-24 right-10 text-2xl">📖</span>
    </div>
  );
};

export default ThemeOrnaments;
