import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { ExternalLink, Mail, FileText, Book, GraduationCap, Check, Copy } from 'lucide-react';
import { renderWithLinks } from './renderWithLinks';
import type { BookPromo } from '../types';

const PromoBlock: React.FC<{ promo: BookPromo }> = ({ promo }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promo.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Буфер обмена недоступен (нет https или запрет браузера) — код виден на экране.
    }
  };

  return (
    <div className="mt-6 max-w-2xl border border-academic-200 bg-academic-50 rounded p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-sm text-academic-700">{promo.text}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`${promo.copyLabel}: ${promo.code}`}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-dashed border-academic-400 bg-white font-mono text-sm font-bold tracking-widest text-academic-900 hover:border-academic-900 transition-colors"
        >
          {promo.code}
          <span className="inline-flex items-center gap-1 font-sans text-xs font-normal tracking-normal text-academic-500">
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? promo.copiedLabel : promo.copyLabel}
          </span>
        </button>
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-academic-500">{promo.note}</p>
      <details className="mt-2 group">
        <summary className="cursor-pointer list-none text-[11px] uppercase tracking-widest text-academic-400 hover:text-academic-600 transition-colors">
          <span className="inline-block group-open:hidden">▸ </span>
          <span className="hidden group-open:inline-block">▾ </span>
          {promo.termsLabel}
        </summary>
        <p className="mt-2 border-l border-academic-200 pl-3 text-[11px] leading-relaxed text-academic-400">
          {promo.terms}
        </p>
      </details>
    </div>
  );
};

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

        <div className="grid grid-cols-1 gap-12" style={{ contain: 'layout' }}>
          {content.books.map((book) => {
            const isWaitlist = book.link && (book.link.includes('forms.gle') || book.link.includes('docs.google.com'));
            const hasLink = !!book.link;

            return (
              <div
                key={book.id}
                className="flex flex-col md:flex-row gap-8 items-start bg-white p-6 md:p-8 border border-academic-200 hover:shadow-sm transition-shadow"
                style={{ contain: 'layout paint' }}
              >
                {/* ОБЛОЖКА (Теперь кликабельна) */}
                <div className="w-full md:w-48 shrink-0 self-start min-h-0">
                    {hasLink ? (
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block aspect-[2/3] bg-academic-100 relative overflow-hidden group border border-academic-100 transition-opacity hover:opacity-90 cursor-pointer"
                      >
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
                      </a>
                    ) : (
                      <div className="block aspect-[2/3] bg-academic-100 relative overflow-hidden group border border-academic-100">
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
                    )}
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
                   {hasLink ? (
                     <a href={book.link} target="_blank" rel="noopener noreferrer" className="group">
                        <h3 className="text-2xl font-serif font-bold text-academic-900 mb-4 leading-tight group-hover:text-academic-700 transition-colors">
                            {book.title}
                        </h3>
                     </a>
                   ) : (
                     <h3 className="text-2xl font-serif font-bold text-academic-900 mb-4 leading-tight">
                        {book.title}
                     </h3>
                   )}
                   
                   {/* ОПИСАНИЕ */}
                  <p className="text-academic-600 mb-2 leading-relaxed max-w-2xl" style={{ whiteSpace: 'pre-line' }}>
                     {renderWithLinks(book.description)}
                  </p>

                   {/* ПОЯСНИТЕЛЬНАЯ ЗАМЕТКА */}
                   {book.note && (
                     <p className="text-sm text-academic-500 italic mb-6 max-w-2xl">
                        {book.note}
                     </p>
                   )}

                   {/* КНОПКИ */}
                   <div className="mt-auto">
                    {book.preorder ? (
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-academic-500 mb-3">
                          {book.preorder.label}
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {book.preorder.links.map((pl) => (
                            pl.disabled ? (
                              <button
                                key={pl.label}
                                type="button"
                                disabled
                                className="inline-flex items-center gap-2 px-4 py-2 bg-academic-50 text-academic-400 font-medium rounded border border-academic-200 text-sm cursor-not-allowed"
                              >
                                {pl.label}
                              </button>
                            ) : (
                              <a
                                key={pl.label}
                                href={pl.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-academic-900 text-white font-medium rounded hover:bg-academic-700 transition-colors shadow-md text-sm"
                              >
                                {pl.label}
                              </a>
                            )
                          ))}
                        </div>
                      </div>
                    ) : !hasLink ? (
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

                   {book.promo && <PromoBlock promo={book.promo} />}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
