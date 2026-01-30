import React, { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Footer } from './Footer';
import { BookChapterCard } from './BookChapterCard';
import { ArrowLeft, Download, BookOpen, Image as ImageIcon, List, Star } from 'lucide-react';

export const BookDetails: React.FC = () => {
  const { content } = useLanguage();
  const b = content.bookPage;
  const PDF_LINK = "/book.pdf"; // PDF файл должен лежать в папке public

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-academic-50 text-academic-900 font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="bg-academic-900 text-white pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-academic-800/20 skew-x-12 translate-x-20"></div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <a href="/" className="inline-flex items-center gap-2 text-academic-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} /> {b.back}
          </a>

          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            {/* Обложка книги */}
            <div className="shrink-0 w-48 h-72 bg-red-600 shadow-2xl rounded-sm flex items-center justify-center text-center p-4 border-4 border-white/10 rotate-1 transform hover:rotate-0 transition-transform duration-500">
               <div>
                 <div className="text-white/80 text-sm uppercase tracking-widest mb-2">Н.И. Казимиров</div>
                 <div className="text-white font-serif font-bold text-2xl leading-tight">{b.title}</div>
                 <div className="mt-4 text-white/60 font-mono text-xs">eⁱπ + 1 = 0</div>
               </div>
            </div>

            <div className="flex-grow text-center md:text-left">
               <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{b.title}</h1>
               <p className="text-xl text-academic-300 mb-8 max-w-2xl">{b.description}</p>
               
               <a 
                 href={PDF_LINK}
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-900/50"
               >
                 <Download size={20} />
                 {b.downloadButton}
               </a>
            </div>
          </div>
        </div>
      </header>

      {/* STATS STRIP */}
      <div className="bg-academic-900 border-t border-academic-800 py-12">
        <div className="container mx-auto max-w-5xl px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4 text-white">
                    <BookOpen size={32} />
                 </div>
                 <div className="text-3xl font-bold text-white mb-1">612</div>
                 <div className="text-academic-400 text-sm uppercase tracking-wide">{b.stats.pages}</div>
              </div>
              <div className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4 text-white">
                    <ImageIcon size={32} />
                 </div>
                 <div className="text-3xl font-bold text-white mb-1">83</div>
                 <div className="text-academic-400 text-sm uppercase tracking-wide">{b.stats.images}</div>
              </div>
              <div className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4 text-white">
                    <List size={32} />
                 </div>
                 <div className="text-3xl font-bold text-white mb-1">126</div>
                 <div className="text-academic-400 text-sm uppercase tracking-wide">{b.stats.sources}</div>
              </div>
              <div className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4 text-white">
                    <Star size={32} />
                 </div>
                 <div className="text-3xl font-bold text-white mb-1">34</div>
                 <div className="text-academic-400 text-sm uppercase tracking-wide">{b.stats.archetypes}</div>
              </div>
           </div>
        </div>
      </div>

      {/* CHAPTERS */}
      <main className="container mx-auto max-w-4xl px-6 py-16 flex-grow">
        <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            {useLanguage().language === 'ru' ? 'Содержание' : 'Table of Contents'}
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
