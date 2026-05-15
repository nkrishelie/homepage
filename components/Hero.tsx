import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ChevronDown } from 'lucide-react'; // Импортируем стрелку
import { MATERIALS_ITEMS } from '../data/materials.generated';

export const Hero: React.FC = () => {
  const { content, language } = useLanguage();
  const materialsLabel = content.ui.headers.materials;
  const showMaterialsLink =
    language === 'ru' &&
    (MATERIALS_ITEMS.length > 0 || content.materials.practiceTests.length > 0);

  return (
    // Добавил 'relative', чтобы позиционировать стрелку абсолютно
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16 px-6 bg-white overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-academic-900 mb-6 leading-tight">
          {content.personal.name}
        </h1>
        
        <h2 className="text-2xl md:text-4xl text-academic-600 font-serif italic mb-8">
          {content.personal.headline}
        </h2>
        
        <p className="text-lg md:text-xl text-academic-500 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
          {content.personal.tagline}
        </p>

        {showMaterialsLink ? (
          <p className="mb-10 text-base text-academic-500">
            <a
              href="#materials"
              className="font-medium text-academic-700 hover:text-academic-900 underline decoration-academic-200 underline-offset-[6px] transition-colors"
            >
              {materialsLabel}
            </a>
          </p>
        ) : null}
      </div>
      
      {/* НОВОЕ: Индикатор скролла */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#services" className="text-academic-400 hover:text-academic-900 transition-colors cursor-pointer" aria-label="Scroll down">
            <ChevronDown size={32} strokeWidth={1.5} />
        </a>
      </div>

    </section>
  );
};
