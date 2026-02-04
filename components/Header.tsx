import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Header: React.FC = () => {
  const { language, setLanguage, content } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(window.location.pathname === '/');
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHref = (link: string) => {
    if (!isHome && link.startsWith('#')) {
      return '/' + link;
    }
    return link;
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out border-b ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-academic-200 py-3 shadow-sm' 
          : 'bg-white border-transparent py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        
        {/* 1. Логотип (Слева) */}
        <a href="/" className="font-serif font-bold text-lg md:text-xl tracking-tight hover:text-academic-600 transition-colors shrink-0 mr-4">
          {content.personal?.logoText || "N. Kazimirov"}
        </a>

        {/* 2. Правая часть (Навигация + Кнопки) */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Desktop Nav (Скрыто на мобильных) */}
          <nav className="hidden md:flex space-x-6">
            {content.navigation.map((item) => (
              <a 
                key={item.label}
                href={getHref(item.href)}
                className="text-sm font-medium text-academic-600 hover:text-black transition-colors uppercase tracking-wider"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Язык (Всегда виден!) */}
          <button 
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            className="shrink-0 text-xs font-bold uppercase tracking-wider text-academic-500 hover:text-academic-900 transition-colors border border-academic-300 px-2 py-1 rounded hover:bg-academic-50"
          >
            {language === 'ru' ? 'EN' : 'RU'}
          </button>
          
          {/* Mobile Menu Toggle (Только на мобильных) */}
          <button 
            className="md:hidden text-academic-800 p-1 shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Выпадающее мобильное меню */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-academic-200 shadow-xl py-4 px-4 flex flex-col space-y-4 animate-in slide-in-from-top-2 duration-200">
           {content.navigation.map((item) => (
            <a 
              key={item.label}
              href={getHref(item.href)}
              className="text-lg font-serif text-academic-800 py-2 border-b border-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
