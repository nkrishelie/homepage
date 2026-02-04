import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ExternalLink, Mail, FileText, Book, GraduationCap } from 'lucide-react';

export const Books: React.FC = () => {
  const { content } = useLanguage();

  const getTypeIcon = (type: string | undefined) => {
    if (!type) return <Book size={14} />;
    const lowerType = type.toLowerCase();
    
    if (lowerType.includes('dissertation') || lowerType.includes('диссертация') || lowerType.includes('автореферат')) {
      return <GraduationCap size={16} />;
    }
    if (lowerType.includes('lecture') || lowerType.includes('лекции') || lowerType.includes('курс')) {
      return <FileText size={14} />;
    }
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
            const hasLink = book.link && book.link !== '#';

            // Компонент-обертка для кликабельных элементов (Картинка и Заголовок)
            const LinkWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
                if (hasLink) {
                    return (
                        <a 
                            href={book.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`cursor-pointer ${className || ''}`}
                        >
                            {children}
                        </a>
                    );
                }
                return <div className={className}>{children}</div>;
            };

            return (
              <div key={book.id} className="flex flex-col md:flex-row gap-8 items-start bg-white p-6 md:p-8 border border-academic-200 hover:shadow-sm transition-shadow">
                
                {/* ОБЛОЖКА (Теперь кликабельна) */}
                <div className="w-full md:w-48 shrink-0 self-start">
                    <LinkWrapper className="block aspect-[2/3] bg-academic-100 relative overflow-hidden group border border-academic-100 transition-opacity hover:opacity-90">
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
                    </LinkWrapper>
                </div>

                <div className="flex-grow w-full">
                   {/* ВЕРХНЯЯ СТРОКА */}
                   <div className="flex flex-wrap items-center justify-between gap-4 mb-3 border-b border-academic-100 pb-3">
                      <div className="flex items-center gap-2 text-academic-600 text-xs font-bold uppercase tracking-widest">
                          {getTypeIcon(book.type)}
                          {book.type || 'Book'}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                          <span className="font-medium text-academic-800 bg-academic-50 px-2 py-0.5 rounded">
                            {book.role}
                          </span>
                          <span className="text-academic-300">•</span>
                          <span className="text-academic-500 font-serif italic">
                            {book.year}
                          </span>
                      </div>
                   </div>
                   
                   {/* ЗАГОЛОВОК (Теперь кликабелен) */}
                   <LinkWrapper className="group">
                        <h3 className="text-2xl font-serif font-bold text-academic-900 mb-4 leading-tight group-hover:text-academic-700 transition-colors">
                            {book.title}
                        </h3>
                   </LinkWrapper>
                   
                   {/* ОПИСАНИЕ */}
                   <p className="text-academic-600 mb-6 leading-relaxed max-w-2xl">
                      {book.description}
                   </p>
                   
                   {/* КНОПКИ */}
                   <div className="mt-auto">
                    {!hasLink ? (
                        <div className="inline-flex items-center gap-2 text-academic-400 font-medium cursor-default bg-academic-50 px-3 py-1 rounded-sm border border-academic-100 text-sm">
                            Unavailable
                        </div>
                    ) : isWaitlist ? (
                        <a 
                            href={book.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2 bg-academic-900 text-white font-medium rounded hover:bg-academic-700 transition-colors shadow-md text-sm"
                        >
                            <Mail size={16} />
                            Waitlist
                        </a>
                    ) : (
                        <a 
                            href={book.link}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 text-academic-800 font-bold border-b-2 border-academic-200 hover:border-academic-800 transition-colors pb-0.5"
                        >
                            {content.ui.buttons.details || 'Read'}
                            <ExternalLink size={16} />
                        </a>
                    )}
                   </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
