import React, { useState } from 'react';
import { BookChapter } from '../types';

interface Props {
  chapter: BookChapter;
  labels: { tabDescription: string; tabSections: string };
}

export const BookChapterCard: React.FC<Props> = ({ chapter, labels }) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'sections'>('desc');

  // Уменьшаем шрифт для длинных формул
  const iconSizeClass = chapter.icon && chapter.icon.length > 4 ? 'text-3xl' : 'text-5xl';

  return (
    <div className="bg-white border border-academic-200 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row overflow-hidden group min-h-[250px]">
      
      {/* ЛЕВАЯ ЧАСТЬ: Контент */}
      <div className="flex-grow p-6 md:p-8 flex flex-col">
        
        {/* Хедер: Заголовок и Кнопки */}
        <div className="border-b border-academic-100 mb-6 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-academic-900">{chapter.title}</h3>
            
            <div className="flex gap-6 text-sm font-medium shrink-0">
                <button 
                    onClick={() => setActiveTab('desc')}
                    className={`pb-2 transition-colors relative uppercase tracking-wider ${activeTab === 'desc' ? 'text-red-700 font-bold' : 'text-academic-400 hover:text-academic-600'}`}
                >
                    {labels.tabDescription}
                    {activeTab === 'desc' && <span className="absolute bottom-[-9px] left-0 w-full h-0.5 bg-red-700"></span>}
                </button>
                
                <button 
                    onClick={() => setActiveTab('sections')}
                    className={`pb-2 transition-colors relative uppercase tracking-wider ${activeTab === 'sections' ? 'text-red-700 font-bold' : 'text-academic-400 hover:text-academic-600'}`}
                >
                    {labels.tabSections}
                    {activeTab === 'sections' && <span className="absolute bottom-[-9px] left-0 w-full h-0.5 bg-red-700"></span>}
                </button>
            </div>
        </div>

        {/* Тело карточки */}
        <div className="flex-grow">
            {activeTab === 'desc' ? (
                <div className="animate-fadeIn">
                    <p className="text-academic-600 leading-relaxed text-lg">
                        {chapter.description}
                    </p>
                </div>
            ) : (
                <div className="animate-fadeIn">
                    {chapter.sections && chapter.sections.length > 0 ? (
                        /* Убрали лишние точки, теперь просто чистый список */
                        <ul className="space-y-2">
                            {chapter.sections.map((section, idx) => (
                                <li key={idx} className="text-academic-700 leading-snug font-medium pl-2 border-l-2 border-transparent hover:border-red-200 hover:bg-academic-50 transition-colors py-1 rounded-r">
                                    {section}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-academic-300 italic text-sm">Нет данных о разделах</p>
                    )}
                </div>
            )}
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Иконка */}
      <div className="hidden md:flex w-48 shrink-0 bg-academic-50 border-l border-academic-100 items-center justify-center p-4">
         <span className={`${iconSizeClass} text-academic-800 font-serif font-medium group-hover:scale-110 transition-transform duration-500 select-none whitespace-nowrap`}>
            {chapter.icon}
         </span>
      </div>

    </div>
  );
};
