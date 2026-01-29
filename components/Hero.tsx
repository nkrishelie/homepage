import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ChevronDown } from 'lucide-react'; // Импортируем стрелку

export const Hero: React.FC = () => {
  const { content } = useLanguage();

  return (
    // Добавил 'relative', чтобы позиционировать стрелку абсолютно
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16 px-6 bg-academic-50 overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-academic-900 mb-6 leading-tight">
          {content.personal.name}
        </h1>
        
        <h2 className="text-2xl md:text-4xl text-academic-600 font-serif italic mb-8">
          {content.personal.headline}
        </h2>
        
        <p className="text-lg md:text-xl text-academic-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          {content.personal.tagline}
        </p>
      </div>
      
      {/* Фоновая сетка */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* НОВОЕ: Индикатор скролла */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#services" className="text-academic-400 hover:text-academic-900 transition-colors cursor-pointer" aria-label="Scroll down">
            <ChevronDown size={32} strokeWidth={1.5} />
        </a>
      </div>

    </section>
  );
};
