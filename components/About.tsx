import React from 'react';
import { useLanguage } from '../LanguageContext';

export const About: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="about" className="py-24 bg-academic-900 text-academic-100">
      <div className="container mx-auto px-6 max-w-7xl"> 
        
        {/* Flex-контейнер для трех колонок */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            
            {/* КОЛОНКА 1: Фотография (25%) */}
            <div className="w-full md:w-1/4 flex flex-col gap-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-academic-600 shadow-2xl">
                    <img 
                        src="/profile.jpg" 
                        alt="Nikolai Kazimirov" 
                        className="w-full h-full object-cover object-top grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    />
                </div>
                {/* Подпись или статус можно добавить сюда, если понадобится */}
            </div>

            {/* КОЛОНКА 2: Биография и Интересы (50%) */}
            <div className="w-full md:w-2/4 flex flex-col">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight border-b border-academic-700 pb-4">
                  {content.ui.headers.about}
                </h2>
                
                <div className="prose prose-invert prose-lg text-academic-300 mb-8 leading-relaxed text-justify">
                    <p>
                        {content.about.bio}
                    </p>
                </div>
                
                <div className="mt-auto">
                    <h3 className="text-sm font-bold text-academic-400 uppercase tracking-widest mb-3">
                      {content.ui.headers.interests}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {content.about.interests.map((interest) => (
                            <span key={interest} className="px-3 py-1 bg-academic-800 border border-academic-700 text-academic-200 text-sm rounded-sm hover:border-academic-500 transition-colors cursor-default">
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* КОЛОНКА 3: Контакты и Локация (25%) */}
            <div className="w-full md:w-1/4 bg-academic-800/30 p-6 rounded-sm border border-academic-700/50">
                <h3 className="text-lg font-serif font-bold text-white mb-6">
                  {content.ui.headers.contacts}
                </h3>
                
                <ul className="space-y-4 mb-8">
                    {content.about.socials.map((social) => (
                        <li key={social.label}>
                            <a 
                                href={social.href}
                                className="flex items-center gap-3 text-academic-300 hover:text-white transition-colors group"
                            >
                                <span className="w-8 h-px bg-academic-600 group-hover:bg-white transition-colors"></span>
                                <span className="font-medium">{social.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="pt-6 border-t border-academic-700/50">
                    <div className="text-academic-500 mb-2 font-mono text-xs uppercase tracking-widest">
                        {content.ui.headers.location}
                    </div>
                    <div className="text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-academic-500 rounded-full"></span>
                        {content.about.location || "Москва, Россия"}
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
