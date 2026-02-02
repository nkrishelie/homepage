import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ExternalLink, Mail } from 'lucide-react'; // Добавили иконку Mail

export const Books: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="books" className="py-24 bg-academic-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-academic-900 mb-4">
               {content.ui.headers.books}
            </h2>
          </div>
        </div>

        <div className="grid gap-12">
          {content.books.map((book) => {
            // Проверяем, является ли ссылка Google Формой (Waitlist)
            const isWaitlist = book.link && (book.link.includes('forms.gle') || book.link.includes('docs.google.com'));

            return (
              <div key={book.id} className="flex flex-col md:flex-row gap-8 items-start bg-white p-6 md:p-8 border border-academic-200 hover:shadow-sm transition-shadow">
                <div className="w-full md:w-48 shrink-0 aspect-[2/3] bg-academic-200 relative overflow-hidden group">
                   <img 
                      src={book.coverImage} 
                      alt={book.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                   />
                </div>

                <div className="flex-grow">
                   <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-academic-100 text-academic-700 text-xs font-semibold uppercase tracking-wider rounded-sm">
                          {book.role}
                      </span>
                      <span className="text-academic-400 text-sm">{book.year}</span>
                   </div>
                   
                   <h3 className="text-2xl font-serif font-bold text-academic-900 mb-4">
                      {book.title}
                   </h3>
                   
                   <p className="text-academic-600 mb-6 leading-relaxed max-w-2xl">
                      {book.description}
                   </p>
                   
                   {/* ЛОГИКА КНОПОК */}
                   {(!book.link || book.link === '#') ? (
                      // 1. Если ссылки нет -> Статус "На рецензии"
                      <div className="inline-flex items-center gap-2 text-academic-400 font-medium cursor-default bg-academic-50 px-3 py-1 rounded-sm border border-academic-100">
                          Under Review (Springer)
                      </div>
                   ) : isWaitlist ? (
                      // 2. Если это Waitlist -> Черная кнопка с призывом
                      <a 
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2 bg-academic-900 text-white font-medium rounded hover:bg-academic-700 transition-colors shadow-md"
                      >
                          <Mail size={16} />
                          Join Waitlist
                      </a>
                   ) : (
                      // 3. Обычная ссылка -> Кнопка Details
                      <a 
                          href={book.link}
                          className="inline-flex items-center gap-2 text-academic-800 font-medium hover:text-academic-500 transition-colors"
                      >
                          {content.ui.buttons.details}
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
