import React, { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Header } from './Header'; // <--- 1. Импортируем Header
import { Footer } from './Footer';
import { Briefcase, Award, Code, GraduationCap, Download, Languages, Globe } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { content, language, setLanguage } = useLanguage();
  const p = content.portfolio;

  // ЛОГИКА АВТО-ПЕРЕКЛЮЧЕНИЯ
  // Оставляем принудительный английский при входе, так как резюме чаще всего нужно на EN.
  // Но теперь пользователь сможет переключить язык через верхнее меню, если захочет.
  useEffect(() => {
    setLanguage('en');
  }, [setLanguage]);

  const CV_LINK = "https://docs.google.com/document/d/14eF1EOT46sqvChjIu2Z_rbAwE7jiInSrVZosBpb3OJY/edit?usp=sharing"; 

  const getLangPercent = (level: string) => {
      const l = level.toLowerCase();
      if (l.includes('native') || l.includes('родной')) return '100%';
      if (l.includes('fluent') || l.includes('свободный')) return '90%';
      if (l.includes('c1') || l.includes('c2')) return '85%';
      if (l.includes('b1') || l.includes('b2')) return '60%';
      return '30%';
  };

  return (
    <div className="min-h-screen bg-academic-50 text-academic-900 font-sans flex flex-col">
      
      {/* 2. ВСТАВЛЯЕМ ГЛОБАЛЬНУЮ ШАПКУ */}
      <Header />

      {/* Hero Section (Header портфолио) */}
      {/* Добавили pt-32, чтобы текст не заезжал под меню */}
      <header className="bg-academic-900 text-white pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">{p.header.title}</h1>
                <p className="text-xl text-academic-300 max-w-xl leading-relaxed">{p.header.subtitle}</p>
            </div>

            {/* Кнопка скачивания CV теперь здесь, крупная и заметная */}
            <a 
                href={CV_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-3 px-6 py-3 bg-white text-academic-900 rounded font-bold hover:bg-academic-100 transition-transform hover:scale-105 shadow-lg"
            >
                <Download size={20} />
                {p.header.download}
            </a>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-6 py-16 space-y-16 flex-grow">
        
        {/* SUMMARY */}
        <section>
          <h2 className="text-2xl font-serif font-bold mb-4 flex items-center gap-3">
             <span className="w-8 h-1 bg-academic-900"></span> {p.summary.title}
          </h2>
          <p className="text-lg leading-relaxed text-academic-700 bg-white p-6 border-l-4 border-academic-900 shadow-sm rounded-r-sm">
            {p.summary.text}
          </p>
        </section>

        {/* EXPERIENCE */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
             <Briefcase className="text-academic-600" /> {p.experience.title}
          </h2>
          
          <div className="relative border-l-2 border-academic-200 ml-3 space-y-12">
            {p.experience.items.map((job, idx) => (
                <div key={idx} className="pl-8 relative">
                  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${idx === 0 ? 'bg-academic-900' : 'bg-academic-400'}`}></div>
                  <h3 className="text-xl md:text-2xl font-bold text-academic-900 leading-tight">{job.role}</h3>
                  <p className="text-academic-600 font-medium mb-3 text-sm uppercase tracking-wide mt-1">{job.company} • {job.period}</p>
                  
                  <ul className="list-disc list-outside space-y-2 text-academic-700 ml-4 text-base leading-relaxed">
                    {job.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
            ))}
          </div>
        </section>

        {/* SKILLS & LANGUAGES */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* SKILLS */}
            <section className="md:col-span-7">
              <h2 className="text-2xl font-serif font-bold mb-5 flex items-center gap-3">
                <Code className="text-academic-600" /> {p.skills.title}
              </h2>
              <div className="bg-white p-5 border border-academic-200 rounded-lg shadow-sm">
                <div className="flex flex-wrap gap-2">
                    {p.skills.stack.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-academic-50 text-academic-800 text-sm font-medium rounded-full border border-academic-200 hover:border-academic-400 transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
              </div>
            </section>

            {/* LANGUAGES */}
            <section className="md:col-span-5">
               <h2 className="text-2xl font-serif font-bold mb-5 flex items-center gap-3">
                 <Languages className="text-academic-600" /> {p.languages.title}
               </h2>
               <div className="bg-white p-5 border border-academic-200 rounded-lg shadow-sm flex flex-col gap-5">
                   {p.languages.items.map((lang, idx) => (
                       <div key={idx}>
                           <div className="flex justify-between items-baseline mb-1">
                               <span className="font-bold text-academic-900">{lang.language}</span>
                               <span className="text-academic-500 text-xs uppercase font-semibold">{lang.level}</span>
                           </div>
                           <div className="w-full h-1.5 bg-academic-100 rounded-full overflow-hidden">
                               <div 
                                   className="h-full bg-academic-600 rounded-full" 
                                   style={{ width: getLangPercent(lang.level) }}
                               ></div>
                           </div>
                       </div>
                   ))}
               </div>
            </section>
        </div>

        {/* CERTIFICATIONS */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
             <Award className="text-academic-600" /> {p.certs.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {p.certs.items.map((cert, idx) => (
                 <div key={idx} className="bg-white border border-academic-200 p-5 rounded-lg hover:shadow-md transition-all group">
                    <div className="text-xs font-bold text-academic-400 uppercase tracking-wider mb-2">{cert.issuer}</div>
                    <h3 className="font-bold text-academic-900 leading-snug group-hover:text-academic-700 transition-colors">
                        {cert.title}
                    </h3>
                    <div className="mt-3 text-sm text-academic-500">{cert.year}</div>
                 </div>
             ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section>
             <h2 className="text-3xl font-serif font-bold mb-6 flex items-center gap-3">
                <GraduationCap className="text-academic-600" /> {language === 'ru' ? 'Образование' : 'Education'}
             </h2>
             <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className="font-bold text-academic-900 text-lg">PhD in Mathematics</span>
                    <span className="hidden md:inline text-academic-300">•</span>
                    <span className="text-academic-700">{language === 'ru' ? 'КарНЦ РАН' : 'KarRC RAS'} (2003)</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className="font-bold text-academic-900 text-lg">Master's Degree in Math</span>
                    <span className="hidden md:inline text-academic-300">•</span>
                    <span className="text-academic-700">{language === 'ru' ? 'ПетрГУ' : 'PetrSU'} (2000)</span>
                </div>
             </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};
