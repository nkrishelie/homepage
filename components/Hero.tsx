import React from 'react';
import { content } from '../data/content';
import { useLanguage } from '../LanguageContext';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6 bg-academic-50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-academic-900 mb-6 leading-tight">
          {content.personal.name}
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-academic-600 font-serif italic mb-8">
          {content.personal.headline}
        </h2>
        
        <p className="text-lg md:text-xl text-academic-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          {content.personal.tagline}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#services"
            className="group px-8 py-4 bg-academic-900 text-white font-medium rounded-sm hover:bg-academic-800 transition-all flex items-center gap-2"
          >
            Научный консалтинг
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href="#services"
            className="group px-8 py-4 bg-white border border-academic-300 text-academic-800 font-medium rounded-sm hover:border-academic-800 transition-all flex items-center gap-2"
          >
            Заочная школа
            <BookOpen size={18} className="text-academic-500 group-hover:text-academic-800 transition-colors" />
          </a>
        </div>
      </div>
      
      {/* Decorative background element - Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </section>
  );
};
