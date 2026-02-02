import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Header: React.FC = () => {
  const { language, setLanguage, content } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    // Проверяем, на главной ли мы странице
    setIsHome(window.location.pathname === '/');
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Функция для "умных" ссылок
  const getHref = (link: string) => {
    if (!isHome && link.startsWith('#')) {
      return '/' + link; // Превращаем #about в /#about
    }
    return link;
  };

  return (
    <header 
      className={`fixed w-full top-0 z-40 transition-all duration-300 ease-in-out border-b ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-academic-200 py-3 shadow-sm' 
          : 'bg-white border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo - теперь всегда ведет на главную */}
        <a href="/" className="font-serif font-bold text-xl tracking-tight hover:text-academic-600 transition-colors">
          {content.personal.logoText}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
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

        <div className="hidden md:flex items-center">
             {/* Language Switcher */}
            <button 
                onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
                className="text-sm font-bold uppercase tracking-wider text-academic-500 hover:text-academic-900 transition-colors border border-academic-300 px-2 py-1 rounded-sm"
            >
                {language === 'ru' ? 'EN' : 'RU'}
            </button>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-academic-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-academic-200 shadow-xl py-6 px-6 flex flex-col space-y-4">
           {content.navigation.map((item) => (
            <a 
              key={item.label}
              href={getHref(item.href)}
              className="text-lg font-serif text-academic-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {/* Язык в мобильном меню */}
           <button 
                onClick={() => {
                    setLanguage(language === 'ru' ? 'en' : 'ru');
                    setMobileMenuOpen(false);
                }}
                className="text-left text-lg font-serif text-academic-800 mt-4 font-bold"
            >
                {language === 'ru' ? 'Switch to English' : 'Переключить на Русский'}
            </button>
        </div>
      )}
    </header>
  );
};
