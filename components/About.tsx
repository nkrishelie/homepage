import React from 'react';
import { useLanguage } from '../LanguageContext';

export const About: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="about" className="py-24 bg-academic-900 text-academic-100">
      <div className="container mx-auto px-6 max-w-5xl"> {/* Чуть расширил контейнер */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
            
            {/* Левая колонка: Текст */}
            <div className="md:w-3/5">
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
            
            {/* Правая колонка: Фото + Контакты */}
            <div className="md:w-2/5 w-full flex flex-col gap-6">
                
                {/* ФОТОГРАФИЯ */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-academic-700 bg-academic-800 group">
                    {/* Предполагаем, что файл называется profile.jpg и лежит в папке public */}
                    <img 
                        src="/profile.jpg" 
                        alt="Nikolai Kazimirov" 
                        className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    {/* Тонкая рамка внутри */}
                    <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
                </div>

                {/* Блок контактов */}
                <div className="bg-academic-800 p-8 rounded-sm border border-academic-700">
                    <h3 className="text-lg font-serif font-semibold text-white mb-6">
                      {content.ui.headers.contacts}
                    </h3>
                    <ul className="space-y-4">
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
                    
                    <div className="mt-8 pt-8 border-t border-academic-700">
                        <p className="text-sm text-academic-400 mb-2">
                          {content.ui.headers.location}
                        </p>
                        <p className="text-academic-200">
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
