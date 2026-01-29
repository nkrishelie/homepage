import React from 'react';
import { content } from '../data/content';
import { PlayCircle } from 'lucide-react';

export const Lectures: React.FC = () => {
  return (
    <section id="lectures" className="py-24 bg-white border-t border-academic-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-academic-900 mb-16 text-center">
            Избранные лекции
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
            {content.lectures.map((lecture) => (
                <div key={lecture.id} className="group cursor-pointer">
                    <div className="relative aspect-video bg-academic-900 mb-4 overflow-hidden">
                        <img 
                            src={lecture.thumbnail} 
                            alt={lecture.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle size={48} className="text-white opacity-90 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded-sm">
                            {lecture.duration}
                        </div>
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-academic-900 group-hover:text-academic-600 transition-colors">
                        {lecture.title}
                    </h3>
                    <p className="text-sm text-academic-500 mt-1">{lecture.platform}</p>
                </div>
            ))}
        </div>
        
        <div className="text-center mt-12">
            <a href="#" className="inline-block border border-academic-300 px-6 py-3 text-sm font-medium hover:bg-academic-50 transition-colors">
                Смотреть все лекции на YouTube
            </a>
        </div>
      </div>
    </section>
  );
};