import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { SiteContent } from './types';
import { content as contentRu } from './data/content';
// Раскомментируй следующую строку, когда создашь файл
import { content as contentEn } from './data/content-en'; 

// Если файла content-en.ts пока нет, используем русскую заглушку, чтобы код не ломался:
// const contentEn = contentRu; 

export type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  /**
   * Sets the display language. Persists to localStorage by default, so a
   * manual choice here (the header toggle) follows the visitor to other
   * pages of the site. Pass `{ persist: false }` for a page-local default
   * (e.g. Portfolio forcing English on entry) that shouldn't overwrite the
   * visitor's actual site-wide preference.
   */
  setLanguage: (lang: Language, options?: { persist?: boolean }) => void;
  content: SiteContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Same key the static Materials/*.html pages read/write (see the inline
// script next to each page's .lang-pills), so a language choice made
// anywhere on the site — this app or a static material page — carries
// over the next time either is opened.
const STORAGE_KEY = 'mathem_lang';

function getInitialLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'ru' || stored === 'en') return stored;
  } catch {
    // localStorage unavailable (private mode, etc.) -- fall through to default
  }
  return 'en';
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // useCallback with an empty dependency array keeps this reference stable
  // across renders, matching the raw useState setter's identity guarantee
  // that used to live here directly. Components that depend on
  // `setLanguage` in a useEffect dependency array (e.g. Portfolio's
  // force-English-on-mount effect) rely on that stability to only run
  // once per mount -- an inline (non-memoized) version here gets a new
  // identity on every language change, which re-fires those effects and
  // immediately stomps on any language switch made while mounted.
  const setLanguage = useCallback((lang: Language, options?: { persist?: boolean }) => {
    setLanguageState(lang);
    if (options?.persist === false) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

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
