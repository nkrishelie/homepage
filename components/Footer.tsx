import React from 'react';
import { useLanguage } from '../LanguageContext';

export const Footer: React.FC = () => {
  const { content } = useLanguage();

  return (
    <footer className="bg-white py-12 border-t border-academic-200">
      {/* Вместо 'container' используем w-full + max-w + px-5. 
         Это гарантирует, что текст никогда не прилипнет к краю экрана телефона.
      */}
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Копирайт (Центрируется на мобильном, слева на ПК) */}
        <div className="text-center md:text-left">
          <p className="text-sm text-academic-500">
            &copy; {new Date().getFullYear()} {content.personal?.name || "Nikolai Kazimirov"}. {content.ui.footer?.rights}
          </p>
        </div>
        
        {/* Ссылки (Центрируются на мобильном, справа на ПК) */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {content.about?.socials?.map(social => (
                <a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-academic-500 hover:text-academic-900 transition-colors uppercase tracking-wider py-2"
                >
                    {social.label}
                </a>
            ))}
        </div>
      </div>
    </footer>
  );
};
