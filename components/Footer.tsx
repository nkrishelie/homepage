import React from 'react';
import { useLanguage } from '../LanguageContext';

export const Footer: React.FC = () => {
  const { content } = useLanguage();
  return (
    <footer className="bg-white py-12 border-t border-academic-200">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-academic-500">
        <div className="mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} {content.personal.name}. Все права защищены.</p>
        </div>
        
        <div className="flex space-x-6">
            {content.about.socials.map(social => (
                <a key={social.label} href={social.href} className="hover:text-academic-900 transition-colors">
                    {social.label}
                </a>
            ))}
        </div>
      </div>
    </footer>
  );
};
