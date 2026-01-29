import React from 'react';
import { useLanguage } from '../LanguageContext';

export const Hero: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-20 pb-16 px-6 bg-academic-50">
      <div className="max-w-4xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-academic-900 mb-6 leading-tight">
          {content.personal.name}
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-academic-600 font-serif italic mb-8">
          {content.personal.headline}
        </h2>
        
        <p className="text-lg md:text-xl text-academic-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          {content.personal.tagline}
        </p>
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      ></div>
    </section>
  );
};
