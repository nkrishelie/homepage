import React from 'react';
import { useLanguage } from '../LanguageContext';

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const baseButtonClasses =
    'flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider border rounded-full transition-colors';

  const activeClasses = 'bg-academic-900 text-white border-academic-900';
  const inactiveClasses =
    'bg-white text-academic-700 border-academic-200 hover:border-academic-900 hover:text-academic-900';

  return (
    <div
      className="inline-flex items-center gap-1 px-1 py-0.5 rounded-full bg-white/90 border border-academic-200 shadow-sm"
      aria-label="Переключение языка"
    >
      <button
        type="button"
        onClick={() => setLanguage('ru')}
        className={`${baseButtonClasses} ${language === 'ru' ? activeClasses : inactiveClasses}`}
        aria-pressed={language === 'ru'}
      >
        <span className="text-lg leading-none">🇷🇺</span>
        <span className="leading-none">RU</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`${baseButtonClasses} ${language === 'en' ? activeClasses : inactiveClasses}`}
        aria-pressed={language === 'en'}
      >
        <span className="text-lg leading-none">🇬🇧</span>
        <span className="leading-none">EN</span>
      </button>
    </div>
  );
};
