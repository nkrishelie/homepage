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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHref = (link: string) => (!isHome && link.startsWith('#') ? '/' + link : link);

  return (
    <header 
      className={`fixed w-full top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out border-b ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-academic-200 py-3 shadow-sm' 
          : 'bg-white border-transparent py-4'
      }`}
    >
      {/* ИСПРАВЛЕНИЕ: Убрали класс 'container'. 
         Вместо него w-full + max-w-screen-xl.
         Это гарантирует, что контент никогда не вылезет за пределы viewport.
      */}
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-8 flex justify-between items-center h-10 md:h-12">
        
        {/* 1. Логотип */}
        <a href="/" className="font-serif font-bold text-lg md:text-xl tracking-tight text-academic-900 shrink-0 z-50 relative mr-4">
          {content.personal?.logoText || "N. Kazimirov"}
        </a>

        {/* 2. Правый блок */}
        <div className="flex items-center gap-3 md:gap-6 pr-1"> {/* pr-1 - страховка от края */}
          
          {/* Меню ПК: Только на больших экранах (lg+) */}
          <nav className="hidden lg:flex items-center space-x-6">
            {content.navigation.map((item) => (
              <a 
                key={item.label}
                href={getHref(item.href)}
                className="text-sm font-medium text-academic-600 hover:text-black transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Язык */}
          <button 
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            className="flex items-center justify-center w-10 h-8 text-xs font-bold uppercase tracking-wider text-academic-600 border border-academic-300 rounded hover:bg-academic-50 hover:text-black transition-colors shrink-0 z-50 relative bg-white"
          >
            {language === 'ru' ? 'EN' : 'RU'}
          </button>
          
          {/* БУРГЕР: Виден на Mobile и Tablet (< 1024px) */}
          <button 
            className="lg:hidden text-academic-900 p-2 -mr-2 shrink-0 z-50 relative focus:outline-none hover:bg-academic-50 rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={30} strokeWidth={2} /> : <Menu size={30} strokeWidth={2} />}
          </button>

        </div>
      </div>

      {/* Выпадающее меню */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-40 flex flex-col pt-28 px-6 gap-6 animate-in fade-in duration-200 lg:hidden overflow-y-auto">
           {content.navigation.map((item) => (
            <a 
              key={item.label}
              href={getHref(item.href)}
              className="text-2xl font-serif font-bold text-academic-900 border-b border-academic-100 pb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-auto mb-10 text-academic-400 text-sm">
            © 2026 Nikolai Kazimirov
          </div>
        </div>
      )}
    </header>
  );
};
