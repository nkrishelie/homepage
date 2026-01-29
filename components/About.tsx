import React from 'react';
import { useLanguage } from '../LanguageContext';

export const About: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="about" className="py-24 bg-academic-900 text-academic-100">
      <div className="container mx-auto px-6 max-w-6xl"> 
        <div className="flex flex-col md:flex-row gap-12 items-start">
            
            {/* Левая колонка: Текст (Теперь занимает 2/3 ширины - 66%) */}
            <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">
                  {content.ui.headers.about}
                </h2>
                <div className="prose prose-invert prose-lg text-academic-300 mb-10 leading-relaxed text-justify">
                    <p>
                        {content.about.bio}
                    </p>
                </div>
                
                <div className="mb-8">
                    <h3 className="text-lg font-serif font-semibold text-white mb-4">
                      {content.ui.headers.interests}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {content.about.interests.map((interest) => (
                            <span key={interest} className="px-3 py-1 bg-academic-800 border border-academic-700 text-academic-300 text-sm rounded-full">
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Правая колонка: Фото + Контакты (Теперь занимает 1/3 ширины - 33%) */}
            <div className="md:w-1/3 w-full flex flex-col gap-6">
                
                {/* ФОТОГРАФИЯ */}
                {/* Изменено: aspect-square (квадрат) вместо 4/5 */}
                <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-academic-700 bg-academic-800 group">
                    <img 
                        src="/profile.jpg" 
                        alt="Nikolai Kazimirov" 
                        // Добавлено: object-top (чтобы не обрезало голову)
                        className="w-full h-full object-cover object-top grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
                </div>

                {/* Блок контактов */}
                <div className="bg-academic-800 p-6 rounded-sm border border-academic-700">
                    <h3 className="text-lg font-serif font-semibold text-white mb-4">
                      {content.ui.headers.contacts}
                    </h3>
                    <ul className="space-y-3">
                        {content.about.socials.map((social) => (
                            <li key={social.label}>
                                <a 
                                    href={social.href}
                                    className="flex items-center gap-3 text-academic-300 hover:text-white transition-all group"
                                >
                                    <span className="w-1.5 h-1.5 bg-academic-500 rounded-full group-hover:bg-white transition-colors"></span>
                                    {social.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t border-academic-700">
                        <p className="text-sm text-academic-400 mb-1">
                          {content.ui.headers.location}
                        </p>
                        <p className="text-academic-200 text-sm">
                            {content.about.location || "Москва, Россия"}
                        </p>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
