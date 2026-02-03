import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ExternalLink, Mail, FileText, Book } from 'lucide-react';

export const Books: React.FC = () => {
  const { content } = useLanguage();

  // Функция для иконки в зависимости от типа
  const getTypeIcon = (type: string | undefined) => {
    if (!type) return <Book size={14} />;
    if (type.includes('Dissertation') || type.includes('Lecture')) return <FileText size={14} />;
    return <Book size={14} />;
  };

  return (
    <section id="books" className="py-24 bg-academic-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-academic-900 mb-16">
            {content.ui.headers.books}
        </h2>

        <div className="grid gap-12">
          {content.books.map((book) => {
            const isWaitlist = book.link && (book.link.includes('forms.gle') || book.link.includes('docs.google.com'));

            return (
              <div key={book.id} className="flex flex-col md:flex-row gap-8 items-start bg-white p-6 md:p-8 border border-academic-200 hover:shadow-sm transition-shadow">
                
                {/* ОБЛОЖКА */}
                <div className="w-full md:w-48 shrink-0 aspect-[2/3] bg-academic-100 relative overflow-hidden group border border-academic-100">
                   {book.coverImage ? (
                     <img 
                        src={book.coverImage} 
                        alt={book.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-academic-300">
                        <Book size={40} />
                     </div>
                   )}
                </div>

                <div className="flex-grow">
                   {/* ВЕРХНЯЯ СТРОКА: ТИП И ГОД */}
                   <div className="flex flex-wrap items-center justify-between gap-4 mb-3 border-b border-academic-100 pb-3">
                      <div className="flex items-center gap-2 text-academic-500 text-xs font-bold uppercase tracking-widest">
                          {getTypeIcon(book.type)}
                          {book.type || 'Book'}
                      </div>
                      <span className="text-academic-400 text-sm font-serif italic">{book.year}</span>
                   </div>
                   
                   {/* ЗАГОЛОВОК */}
                   <h3 className="text-2xl font-serif font-bold text-academic-900 mb-2 leading-tight">
                      {book.title}
                   </h3>
                   
                   {/* РОЛЬ (Автор/Соавтор) */}
                   <div className="text-sm text-academic-500 mb-4 font-medium">
                      Role: <span className="text-academic-800">{book.role}</span>
                   </div>

                   <p className="text-academic-600 mb-6 leading-relaxed max-w-2xl">
                      {book.description}
                   </p>
                   
                   {/* КНОПКИ */}
                   {(!book.link || book.link === '#') ? (
                      <div className="inline-flex items-center gap-2 text-academic-400 font-medium cursor-default bg-academic-50 px-3 py-1 rounded-sm border border-academic-100 text-sm">
                          Under Review / Unavailable
                      </div>
                   ) : isWaitlist ? (
                      <a 
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2 bg-academic-900 text-white font-medium rounded hover:bg-academic-700 transition-colors shadow-md text-sm"
                      >
                          <Mail size={16} />
                          Join Waitlist
                      </a>
                   ) : (
                      <a 
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 text-academic-800 font-bold border-b-2 border-academic-200 hover:border-academic-800 transition-colors pb-0.5"
                      >
                          {content.ui.buttons.details || 'Read / Download'}
                          <ExternalLink size={16} />
                      </a>
                   )}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
