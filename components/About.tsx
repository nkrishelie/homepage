import React from 'react';
import { useLanguage } from '../LanguageContext';

export const About: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="about" className="py-24 bg-academic-900 text-academic-100">
      <div className="container mx-auto px-6 max-w-6xl"> 
        <div className="flex flex-col md:flex-row gap-12 items-start">
            
            {/* ЛЕВАЯ КОЛОНКА: Фото + Контакты (40% ширины) */}
            <div className="md:w-5/12 w-full flex flex-col gap-6 order-1"> {/* order-1 гарантирует, что на мобилках это будет первым */}
                
                {/* ФОТОГРАФИЯ - Портретный формат 3:4 (как на старом сайте) */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-academic-700 bg-academic-800 group shadow-2xl">
                    <img 
                        src="/profile.jpg" 
                        alt="Nikolai Kazimirov" 
                        // object-top важен, чтобы лицо всегда было в фокусе
                        className="w-full h-full object-cover object-top grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
                </div>

                {/* Блок контактов (теперь под фото, как опора) */}
                <div className="bg-academic-800 p-6 rounded-sm border border-academic-700 shadow-lg">
                    <h3 className="text-lg font-serif font-semibold text-white mb-4 border-b border-academic-600 pb-2">
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
                    
                    <div className="mt-6 pt-4 border-t border-academic-700">
                        <p className="text-sm text-academic-400 mb-1">
                          {content.ui.headers.location}
                        </p>
                        <p className="text-academic-200 text-sm flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            {content.about.location || "Москва, Россия"}
                        </p>
                    </div>
                </div>
            </div>

            {/* ПРАВАЯ КОЛОНКА: Текст (60% ширины) */}
            <div className="md:w-7/12 w-full order-2 flex flex-col justify-center h-full pt-2">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                  {content.ui.headers.about}
                </h2>
                
                {/* Текст с увеличенным межстрочным интервалом для читаемости */}
                <div className="prose prose-invert prose-lg text-academic-300 mb-10 leading-relaxed text-justify border-l-2 border-academic-700 pl-6">
                    <p>
                        {content.about.bio}
                    </p>
                </div>
                
                <div className="mb-8">
                    <h3 className="text-lg font-serif font-semibold text-white mb-5 flex items-center gap-2">
                      {content.ui.headers.interests}
                      <span className="h-px flex-grow bg-academic-700"></span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {content.about.interests.map((interest) => (
                            <span key={interest} className="px-4 py-2 bg-academic-800 border border-academic-600 hover:border-academic-400 text-academic-200 text-sm rounded-sm transition-colors cursor-default">
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
