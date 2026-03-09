import React, { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Header } from './Header'; // Импортируем нашу исправленную шапку
import { Footer } from './Footer';
import { BookChapterCard } from './BookChapterCard';
import { Download, BookOpen, Image as ImageIcon, List, Star, Send, Youtube, GraduationCap } from 'lucide-react';

export const BookDetails: React.FC = () => {
  const { content, language } = useLanguage(); 
  const b = content.bookPage;
  const socials = content.about?.socials || [];

  const telegram = socials.find((s) => s.label.toLowerCase().includes('telegram'));
  const youtube = socials.find((s) => s.label.toLowerCase().includes('youtube'));
  const scholar = socials.find((s) => s.label.toLowerCase().includes('scholar'));

  const relatedBook = content.books.find((book) => book.id === 'savvateev');
  const PDF_LINK = "/archetypeswithface.pdf"; 

  useEffect(() => {
    document.title = "Archetypes of Mathematics — Nikolai Kazimirov";

    const ogDescription = document.querySelector('meta[property=\"og:description\"]');
    if (ogDescription && b?.description) {
      ogDescription.setAttribute('content', b.description);
    }
  }, [b.description]);

  return (
    <div className="min-h-screen bg-academic-50 text-academic-900 font-sans flex flex-col">
      
      {/* 1. ГЛОБАЛЬНАЯ ШАПКА */}
      <Header />

      {/* 1.1 Хлебные крошки */}
      <div className="bg-white border-b border-academic-100">
        <div className="container mx-auto max-w-5xl px-6 py-3 text-xs text-academic-500">
          <a href="/" className="hover:text-academic-800 transition-colors">
            ← mathem.at
          </a>
          <span className="mx-1">/</span>
          <span className="text-academic-400">Books</span>
          <span className="mx-1 text-academic-300">/</span>
          <span className="text-academic-600">Archetypes of Mathematics</span>
        </div>
      </div>

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
                 className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 bg-white text-academic-900 font-bold rounded hover:bg-academic-100 transition-colors shadow-lg text-base sm:text-lg"
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

      {/* AUTHOR BLOCK */}
      <section className="bg-academic-50 py-12 border-b border-academic-100">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="bg-white border border-academic-200 rounded-lg shadow-sm px-5 py-6 md:px-6 md:py-7 flex flex-col sm:flex-row gap-5 items-start">
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-academic-200 bg-academic-100">
                <img
                  src="/profile.jpg"
                  alt="Nikolai I. Kazimirov"
                  className="w-full h-full object-cover object-top grayscale"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold tracking-wide text-academic-500 uppercase mb-1">
                {language === 'ru' ? 'Об авторе' : 'About the Author'}
              </h2>
              <p className="text-lg font-serif font-bold text-academic-900 mb-2">
                Nikolai I. Kazimirov, Ph.D.
              </p>
              <p className="text-sm md:text-[15px] text-academic-700 leading-relaxed mb-4">
                {b.authorBio}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-academic-700">
                {telegram && (
                  <a
                    href={telegram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-academic-900 transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#229ED9] text-white">
                      <Send size={14} />
                    </span>
                    <span>Telegram</span>
                  </a>
                )}
                {youtube && (
                  <a
                    href={youtube.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-academic-900 transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FF0000] text-white">
                      <Youtube size={14} />
                    </span>
                    <span>YouTube</span>
                  </a>
                )}
                {scholar && (
                  <a
                    href={scholar.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-academic-900 transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-academic-900 text-white">
                      <GraduationCap size={14} />
                    </span>
                    <span>Google Scholar</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <main className="container mx-auto max-w-4xl px-6 py-16 flex-grow">
        <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            {language === 'ru' ? 'Содержание' : 'Table of Contents'}
        </h2>
        
        <div>
           {b.chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className={index > 0 ? 'pt-8 mt-8 border-t border-academic-100' : ''}
            >
              <BookChapterCard 
                 chapter={chapter} 
                 labels={b.ui} 
              />
            </div>
           ))}
        </div>

        {/* RELATED BOOK */}
        {relatedBook && (
          <section className="mt-16">
            <h3 className="text-2xl font-serif font-bold mb-6 text-academic-900">
              {language === 'ru' ? 'Другие книги автора' : 'More by the author'}
            </h3>
            <div className="bg-white p-6 md:p-7 border border-academic-200 hover:shadow-sm transition-shadow flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-40 shrink-0 self-start">
                <a
                  href={relatedBook.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-[2/3] bg-academic-100 relative overflow-hidden group border border-academic-100 transition-opacity hover:opacity-90"
                >
                  {relatedBook.coverImage ? (
                    <img
                      src={relatedBook.coverImage}
                      alt={relatedBook.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-academic-300">
                      <BookOpen size={32} />
                    </div>
                  )}
                </a>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-academic-100 pb-3">
                  <div className="text-xs font-bold uppercase tracking-widest text-academic-600">
                    {relatedBook.type}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-academic-500">
                    <span className="font-medium text-academic-800 bg-academic-50 px-2 py-0.5 rounded">
                      {relatedBook.role}
                    </span>
                    <span className="text-academic-300">•</span>
                    <span className="font-serif italic">{relatedBook.year}</span>
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-serif font-bold text-academic-900 mb-3 leading-snug">
                  {relatedBook.title}
                </h4>
                <p className="text-academic-600 text-sm md:text-[15px] leading-relaxed mb-4">
                  {relatedBook.description}
                </p>
                {relatedBook.link && relatedBook.link !== '#' && (
                  <a
                    href={relatedBook.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-academic-900 font-semibold border-b-2 border-academic-300 hover:border-academic-900 transition-colors text-sm"
                  >
                    {language === 'ru' ? 'Открыть книгу' : 'View details'}
                  </a>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};
