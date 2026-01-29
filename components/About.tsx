import React from 'react';
import { useLanguage } from '../LanguageContext';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-academic-900 text-academic-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">Обо мне</h2>
                <div className="prose prose-invert prose-lg text-academic-300 mb-10">
                    <p className="leading-relaxed">
                        {content.about.bio}
                    </p>
                </div>
                
                <div className="mb-8">
                    <h3 className="text-lg font-serif font-semibold text-white mb-4">Научные интересы</h3>
                    <div className="flex flex-wrap gap-2">
                        {content.about.interests.map((interest) => (
                            <span key={interest} className="px-3 py-1 bg-academic-800 border border-academic-700 text-academic-300 text-sm rounded-full">
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="md:w-1/3 bg-academic-800 p-8 rounded-sm border border-academic-700 w-full">
                <h3 className="text-lg font-serif font-semibold text-white mb-6">Контакты</h3>
                <ul className="space-y-4">
                    {content.about.socials.map((social) => (
                        <li key={social.label}>
                            <a 
                                href={social.href}
                                className="block text-academic-300 hover:text-white hover:translate-x-1 transition-all"
                            >
                                {social.label}
                            </a>
                        </li>
                    ))}
                </ul>
                
                <div className="mt-8 pt-8 border-t border-academic-700">
                    <p className="text-sm text-academic-400 mb-2">Локация</p>
                    <p className="text-academic-200">
    {content.about.location || "Москва, Россия"}
</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
