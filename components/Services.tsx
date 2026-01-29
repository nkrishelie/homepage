import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Brain, GraduationCap, CheckCircle2 } from 'lucide-react';

const icons = {
  Brain,
  GraduationCap,
  Scroll: Brain // Fallback
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-academic-900 mb-4">Услуги</h2>
          <div className="w-16 h-1 bg-academic-800 mx-auto opacity-20"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {content.services.map((service) => {
            const Icon = icons[service.iconName as keyof typeof icons] || Brain;
            
            return (
              <div key={service.id} className="group border border-academic-200 p-8 hover:border-academic-400 transition-colors bg-academic-50/50">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-academic-100 rounded-sm text-academic-800 group-hover:bg-academic-800 group-hover:text-white transition-colors">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-academic-900 mb-2">
                  {service.title}
                </h3>
                
                <p className="text-sm font-medium text-academic-500 mb-6 uppercase tracking-wide">
                  Аудитория: {service.targetAudience}
                </p>
                
                <p className="text-academic-600 mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-academic-700">
                      <CheckCircle2 size={18} className="mt-1 text-academic-400 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
  href="https://t.me/mathreisender" 
  target="_blank" 
  rel="noopener noreferrer"
  className="inline-block text-academic-900 font-bold border-b-2 border-academic-900 hover:text-academic-600 hover:border-academic-600 transition-colors pb-1 cursor-pointer"
>
  {service.cta}
</a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
