import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Mail, Youtube, Send, MapPin, ExternalLink } from 'lucide-react';

export const About: React.FC = () => {
  const { content } = useLanguage();

  // Простая функция для подбора иконки по названию соцсети
  const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('telegram')) return <Send size={18} />;
    if (l.includes('youtube')) return <Youtube size={18} />;
    if (l.includes('email') || l.includes('mail')) return <Mail size={18} />;
    return <ExternalLink size={18} />;
  };

  return (
    <section id="about" className="py-24 bg-academic-900 text-academic-100">
      <div className="container mx-auto px-6 max-w-7xl"> 
        
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
            {/* Сделали более компактным (p-5 вместо p-6) и уплотнили список */}
            <div className="w-full md:w-1/4 bg-academic-800/30 p-5 rounded-sm border border-academic-700/50">
                <h3 className="text-lg font-serif font-bold text-white mb-4">
                  {content.ui.headers.contacts}
                </h3>
                
                {/* space-y-3 (было 4) - уменьшили расстояние между пунктами */}
                <ul className="space-y-3 mb-6">
                    {content.about.socials.map((social) => (
                        <li key={social.label}>
                            <a 
                                href={social.href}
                                className="flex items-center gap-3 text-academic-300 hover:text-white transition-colors group p-1 -ml-1" // увеличили область клика
                            >
                                <span className="text-academic-500 group-hover:text-white transition-colors">
                                    {getIcon(social.label)}
                                </span>
                                <span className="font-medium text-sm md:text-base">{social.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="pt-5 border-t border-academic-700/50">
                    <div className="text-academic-500 mb-1 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={14} />
                        {content.ui.headers.location}
                    </div>
                    <div className="text-white text-sm pl-6">
                        {content.about.location || "Москва, Россия"}
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
