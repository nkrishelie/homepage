import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SiteContent } from './types';
import { content as contentRu } from './data/content';
// Раскомментируй следующую строку, когда создашь файл
import { content as contentEn } from './data/content-en'; 

// Если файла content-en.ts пока нет, используем русскую заглушку, чтобы код не ломался:
// const contentEn = contentRu; 

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: SiteContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  // Здесь происходит магия подмены
  const content = language === 'ru' ? contentRu : contentEn;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук, который мы будем использовать в компонентах
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
