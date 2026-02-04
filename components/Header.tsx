import React from 'react';
import { useLanguage } from '../LanguageContext';
import { LanguageSwitch } from './LanguageSwitch';

export const Header: React.FC = () => {
  const { content } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-academic-200 z-50">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Логотип / Имя */}
          <div className="font-serif font-bold text-lg md:text-xl text-academic-900 shrink-0">
            N. Kazimirov
          </div>

          {/* Навигация и Переключатель */}
          <div className="flex items-center gap-3 md:gap-8">
            {/* Меню (скрываем на совсем маленьких экранах, если нужно, или уменьшаем шрифт) */}
            <nav className="hidden sm:flex items-center gap-4 md:gap-8 text-sm font-medium text-academic-600">
              <button 
                onClick={() => scrollToSection('books')} 
                className="hover:text-academic-900 transition-colors"
              >
                {content.ui.nav.books}
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="hover:text-academic-900 transition-colors"
              >
                {content.ui.nav.about}
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="hover:text-academic-900 transition-colors"
              >
                {content.ui.nav.portfolio}
              </button>
            </nav>

            {/* Разделитель (только на десктопе) */}
            <div className="hidden sm:block w-px h-4 bg-academic-200"></div>

            {/* Переключатель языка (Всегда виден) */}
            <div className="shrink-0">
                <LanguageSwitch />
            </div>
          </div>
        </div>
      </div>
      
      {/* Мобильное меню (снизу полоской, если ссылки не влезают в шапку) - ОПЦИОНАЛЬНО */}
      {/* Если ссылок мало, они влезут и так. Если нет - лучше их скрыть на < sm */}
    </header>
  );
};
