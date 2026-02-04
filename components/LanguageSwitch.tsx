import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-academic-200 text-academic-600 hover:text-academic-900 hover:border-academic-900 transition-all text-xs font-bold tracking-wider uppercase bg-white"
      aria-label="Switch language"
    >
      <Globe size={14} />
      <span>{language}</span>
    </button>
  );
};
