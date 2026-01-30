import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Briefcase, Award, Code, GraduationCap, ArrowLeft, Globe } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { content, language, setLanguage } = useLanguage();
  const p = content.portfolio; // Сокращение для удобства

  return (
    <div className="min-h-screen bg-academic-50 text-academic-900 font-sans">
      
      {/* Header */}
      <header className="bg-academic-900 text-white py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          
          {/* Верхняя панель: Назад + Язык */}
          <div className="flex justify-between items-center mb-8">
            <a href="/" className="inline-flex items-center gap-2 text-academic-400 hover:text-white transition-colors">
              <ArrowLeft size={20} /> {p.header.back}
            </a>

            <button 
                onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
                className="flex items-center gap-2 px-3 py-1 rounded border border-academic-600 hover:bg-academic-800 transition-colors text-sm"
            >
                <Globe size={16} />
                {language === 'ru' ? 'English' : 'Русский'}
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{p.header.title}</h1>
          <p className="text-xl text-academic-300">{p.header.subtitle}</p>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-16 space-y-20">
        
        {/* SUMMARY */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-6 flex items-center gap-3">
             <span className="w-8 h-1 bg-academic-900"></span> {p.summary.title}
          </h2>
          <p className="text-lg leading-relaxed text-academic-700 bg-white p-6 border border-academic-200 shadow-sm rounded-sm">
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
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${idx === 0 ? 'bg-academic-900' : 'bg-academic-300'}`}></div>
                  <h3 className="text-2xl font-bold text-academic-900">{job.role}</h3>
                  <p className="text-academic-600 font-medium mb-4">{job.company} ({job.period})</p>
                  
                  <ul className="list-disc list-outside space-y-3 text-academic-700 ml-4">
                    {job.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
            ))}

          </div>
        </section>

        {/* SKILLS */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
             <Code className="text-academic-600" /> {p.skills.title}
          </h2>
          <div className="bg-white p-8 border border-academic-200 rounded-sm">
            <div className="flex flex-wrap gap-3">
                {p.skills.stack.map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-academic-100 text-academic-800 font-medium rounded-sm border border-academic-200">
                        {skill}
                    </span>
                ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
             <Award className="text-academic-600" /> {p.certs.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
             {p.certs.items.map((cert, idx) => (
                 <div key={idx} className="border border-academic-200 p-6 bg-white rounded-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-green-100 p-2 rounded text-green-700 font-bold text-xs shrink-0">DC</div>
                    <div>
                        <h3 className="font-bold text-academic-900">{cert.title}</h3>
                        <p className="text-sm text-academic-500">{cert.issuer}, {cert.year}</p>
                    </div>
                 </div>
             ))}
          </div>
        </section>

        {/* EDUCATION (Кратко) */}
        <section>
             <h2 className="text-3xl font-serif font-bold mb-6 flex items-center gap-3">
                <GraduationCap className="text-academic-600" /> {language === 'ru' ? 'Образование' : 'Education'}
             </h2>
             <div className="text-academic-700 space-y-2">
                <p><strong>PhD in Mathematics</strong> — {language === 'ru' ? 'КарНЦ РАН' : 'KarRC RAS'} (2003)</p>
                <p><strong>Master's Degree in Math</strong> — {language === 'ru' ? 'ПетрГУ' : 'PetrSU'} (2000)</p>
             </div>
        </section>

      </div>
    </div>
  );
};
