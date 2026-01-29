import React from 'react';
import { useLanguage } from '../LanguageContext';
import { MapPin, Mail, Send, Youtube } from 'lucide-react'; // Импортируем иконки, если есть, или используем текст

export const About: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="about" className="py-24 bg-academic-900 text-academic-100">
      <div className="container mx-auto px-6 max-w-6xl"> 
        
        {/* Используем Grid на 12 колонок для точного контроля пропорций */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* ЛЕВАЯ КОЛОНКА: Фото + Контакты (Занимает 4 из 12 колонок ~ 33%) */}
            <div className="md:col-span-4 flex flex-col gap-6">
                
                {/* ФОТОГРАФИЯ */}
                {/* Добавили тонкую рамку (border-academic-600), чтобы черная футболка не сливалась с темным фоном */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-academic-600 shadow-2xl">
                    <img 
                        src="/profile.jpg" 
                        alt="Nikolai Kazimirov" 
                        className="w-full h-full object-cover object-top grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    />
                </div>

                {/* КОНТАКТЫ - Убрали тяжелый фон (коробку), сделали минималистично */}
                <div className="pt-2">
                    <h3 className="text-lg font-serif font-bold text-white mb-4 border-b border-academic-700 pb-2">
                      {content.ui.headers.contacts}
                    </h3>
                    
                    <ul className="space-y-3">
                        {content.about.socials.map((social) => (
                            <li key={social.label}>
                                <a 
                                    href={social.href}
                                    className="flex items-center gap-3 text-academic-300 hover:text-white transition-colors group"
                                >
                                    {/* Небольшой акцент при наведении */}
                                    <span className="w-1.5 h-1.5 bg-academic-500 rounded-full group-hover:bg-white transition-colors"></span>
                                    <span className="font-medium tracking-wide">{social.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Локация отдельно */}
                    <div className="mt-6 pt-4 border-t border-academic-700 text-sm">
                        <div className="text-academic-400 mb-1 font-mono text-xs uppercase tracking-widest">
                            {content.ui.headers.location}
                        </div>
                        <div className="text-white flex items-center gap-2">
                            {content.about.location || "Москва, Россия"}
                        </div>
                    </div>
                </div>
            </div>

            {/* ПРАВАЯ КОЛОНКА: Текст (Занимает 8 из 12 колонок ~ 66%) */}
            <div className="md:col-span-8 flex flex-col justify-start">
                
                {/* Заголовок "Обо мне" делаем крупнее */}
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                  {content.ui.headers.about}
                </h2>
                
                {/* Текст биографии */}
                <div className="prose prose-invert prose-lg text-academic-300 mb-10 leading-relaxed text-justify">
                    <p>
                        {content.about.bio}
                    </p>
                </div>
                
                {/* Интересы */}
                <div className="mb-8">
                    <h3 className="text-lg font-serif font-semibold text-white mb-5 flex items-center gap-4">
                      {content.ui.headers.interests}
                      <span className="h-px flex-grow bg-academic-700"></span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {content.about.interests.map((interest) => (
                            <span key={interest} className="px-3 py-1.5 bg-academic-800 border border-academic-700 text-academic-200 text-sm rounded-sm hover:border-academic-500 transition-colors cursor-default">
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
