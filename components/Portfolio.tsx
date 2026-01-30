import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Briefcase, Award, Code, GraduationCap, ArrowLeft, Globe, Download, Languages } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { content, language, setLanguage } = useLanguage();
  const p = content.portfolio;

  // Ссылка на PDF-файл резюме.
  // Положите файл cv.pdf в папку public/ вашего проекта.
  const CV_LINK = "/cv.pdf"; 

  return (
    <div className="min-h-screen bg-academic-50 text-academic-900 font-sans">
      
      {/* Header */}
      <header className="bg-academic-900 text-white py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <a href="/" className="inline-flex items-center gap-2 text-academic-400 hover:text-white transition-colors">
              <ArrowLeft size={20} /> {p.header.back}
            </a>

            <div className="flex gap-4">
                <button 
                    onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
                    className="flex items-center gap-2 px-3 py-1 rounded border border-academic-600 hover:bg-academic-800 transition-colors text-sm"
                >
                    <Globe size={16} />
                    {language === 'ru' ? 'English' : 'Русский'}
                </button>
                
                <a 
                    href={CV_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-1 bg-academic-100 text-academic-900 rounded font-bold hover:bg-white transition-colors text-sm"
                >
                    <Download size={16} />
                    {p.header.download}
                </a>
            </div>
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

        {/* SKILLS & LANGUAGES GRID */}
        <div className="grid md:grid-cols-2 gap-12">
            
            {/* SKILLS */}
            <section>
              <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
                <Code className="text-academic-600" /> {p.skills.title}
              </h2>
              <div className="bg-white p-6 border border-academic-200 rounded-sm h-full">
                <div className="flex flex-wrap gap-3">
                    {p.skills.stack.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 bg-academic-50 text-academic-800 font-medium rounded-sm border border-academic-200 text-sm">
                            {skill}
                        </span>
                    ))}
                </div>
              </div>
            </section>

            {/* LANGUAGES */}
            <section>
               <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
                 <Languages className="text-academic-600" /> {p.languages.title}
               </h2>
               <div className="bg-white p-6 border border-academic-200 rounded-sm h-full flex flex-col justify-center space-y-4">
                   {p.languages.items.map((lang, idx) => (
                       <div key={idx} className="flex justify-between items-center border-b border-academic-100 last:border-0 pb-2 last:pb-0">
                           <span className="font-bold text-academic-900">{lang.language}</span>
                           <span className="text-academic-600 bg-academic-50 px-2 py-0.5 rounded text-sm">{lang.level}</span>
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

        {/* EDUCATION */}
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
