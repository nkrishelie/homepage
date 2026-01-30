import React, { useState } from 'react';
import { BookChapter } from '../types';

interface Props {
  chapter: BookChapter;
  labels: { desc: string; sections: string };
}

export const BookChapterCard: React.FC<Props> = ({ chapter, labels }) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'sections'>('desc');

  return (
    <div className="bg-white border border-academic-200 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row overflow-hidden group">
      
      {/* ЛЕВАЯ ЧАСТЬ: Контент */}
      <div className="flex-grow p-6 md:p-8 flex flex-col">
        
        {/* Хедер карточки: Заголовок и Табы */}
        <div className="border-b border-academic-100 mb-6 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-academic-900">{chapter.title}</h3>
            
            {/* Переключатель Табов */}
            <div className="flex gap-6 text-sm font-medium">
                <button 
                    onClick={() => setActiveTab('desc')}
                    className={`pb-2 transition-colors relative ${activeTab === 'desc' ? 'text-red-600' : 'text-academic-400 hover:text-academic-600'}`}
                >
                    {labels.desc}
                    {activeTab === 'desc' && <span className="absolute bottom-[-9px] left-0 w-full h-0.5 bg-red-600"></span>}
                </button>
                <button 
                    onClick={() => setActiveTab('sections')}
                    className={`pb-2 transition-colors relative ${activeTab === 'sections' ? 'text-red-600' : 'text-academic-400 hover:text-academic-600'}`}
                >
                    {labels.sections}
                    {activeTab === 'sections' && <span className="absolute bottom-[-9px] left-0 w-full h-0.5 bg-red-600"></span>}
                </button>
            </div>
        </div>

        {/* Тело карточки */}
        <div className="min-h-[100px]">
            {activeTab === 'desc' ? (
                <div className="animate-fadeIn">
                    <p className="text-academic-600 leading-relaxed text-lg">
                        {chapter.description}
                    </p>
                </div>
            ) : (
                <div className="animate-fadeIn">
                    <ul className="space-y-2">
                        {chapter.sections.map((section, idx) => (
                            <li key={idx} className="text-academic-700 flex gap-3">
                                <span className="text-academic-300">•</span> 
                                <span>{section}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Иконка */}
      <div className="hidden md:flex w-40 shrink-0 bg-academic-50 border-l border-academic-100 items-center justify-center">
         <span className="text-5xl text-academic-800 font-serif italic font-bold opacity-80 group-hover:scale-110 transition-transform duration-500 select-none">
            {chapter.icon}
         </span>
      </div>

    </div>
  );
};
