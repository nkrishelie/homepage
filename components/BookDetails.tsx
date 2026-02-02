import React, { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Header } from './Header'; // Импортируем нашу исправленную шапку
import { Footer } from './Footer';
import { BookChapterCard } from './BookChapterCard';
import { Download, BookOpen, Image as ImageIcon, List, Star } from 'lucide-react';

export const BookDetails: React.FC = () => {
  const { content, language } = useLanguage(); 
  const b = content.bookPage;
  const PDF_LINK = "archetypeswithface.pdf"; 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-academic-50 text-academic-900 font-sans flex flex-col">
      
      {/* 1. ГЛОБАЛЬНАЯ ШАПКА */}
      <Header />

      {/* 2. HEADER КНИГИ (Hero Section) */}
      {/* pt-32 (padding-top) увеличен, чтобы текст не перекрывался меню */}
      <header className="bg-academic-900 text-white pt-32 pb-24 px-6 relative overflow-hidden">
        
        {/* Фон */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-academic-800/20 skew-x-12 translate-x-20"></div>

        <div className="container mx-auto max-w-5xl relative z-10">
          
          {/* Старую панель с кнопкой "Назад" и языком мы УДАЛИЛИ отсюда, так как она теперь в Header */}

          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            
            {/* ОБЛОЖКА КНИГИ */}
            <div className="shrink-0 w-64 md:w-72 shadow-2xl rounded-sm border-4 border-white/10 rotate-1 transform hover:rotate-0 transition-transform duration-500 overflow-hidden bg-white">
               <img 
                 src="/archetypes.png" 
                 alt={b.title} 
                 className="w-full h-full object-cover"
               />
            </div>

            <div className="flex-grow text-center md:text-left pt-4">
               <div className="text-academic-400 text-sm uppercase tracking-widest mb-2 font-bold">{b.subtitle}</div>
               <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">{b.title}</h1>
               <p className="text-lg text-academic-300 mb-8 max-w-2xl leading-relaxed">{b.description}</p>
               
               <a 
                 href={PDF_LINK}
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 px-8 py-4 bg-white text-academic-900 font-bold rounded hover:bg-academic-100 transition-colors shadow-lg"
               >
                 <Download size={20} />
                 {b.downloadButton}
               </a>
            </div>
          </div>
        </div>
      </header>

      {/* STATS STRIP */}
      <div className="bg-academic-800 border-t border-academic-700 py-12">
        <div className="container mx-auto max-w-5xl px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center group">
                 <div className="text-academic-400 mb-2 group-hover:text-white transition-colors"><BookOpen size={28} /></div>
                 <div className="text-3xl font-serif font-bold text-white mb-1">612</div>
                 <div className="text-academic-500 text-xs uppercase tracking-widest">{b.stats.pages}</div>
              </div>
              <div className="flex flex-col items-center text-center group">
                 <div className="text-academic-400 mb-2 group-hover:text-white transition-colors"><ImageIcon size={28} /></div>
                 <div className="text-3xl font-serif font-bold text-white mb-1">83</div>
                 <div className="text-academic-500 text-xs uppercase tracking-widest">{b.stats.images}</div>
              </div>
              <div className="flex flex-col items-center text-center group">
                 <div className="text-academic-400 mb-2 group-hover:text-white transition-colors"><List size={28} /></div>
                 <div className="text-3xl font-serif font-bold text-white mb-1">126</div>
                 <div className="text-academic-500 text-xs uppercase tracking-widest">{b.stats.sources}</div>
              </div>
              <div className="flex flex-col items-center text-center group">
                 <div className="text-academic-400 mb-2 group-hover:text-white transition-colors"><Star size={28} /></div>
                 <div className="text-3xl font-serif font-bold text-white mb-1">34</div>
                 <div className="text-academic-500 text-xs uppercase tracking-widest">{b.stats.archetypes}</div>
              </div>
           </div>
        </div>
      </div>

      {/* CHAPTERS */}
      <main className="container mx-auto max-w-4xl px-6 py-16 flex-grow">
        <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            {language === 'ru' ? 'Содержание' : 'Table of Contents'}
        </h2>
        
        <div className="space-y-6">
           {b.chapters.map((chapter) => (
             <BookChapterCard 
                key={chapter.id} 
                chapter={chapter} 
                labels={b.ui} 
             />
           ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
