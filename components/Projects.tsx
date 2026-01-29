import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ExternalLink, Cuboid } from 'lucide-react'; // Cuboid - иконка для 3D

export const Projects: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="projects" className="py-24 bg-academic-900 text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {content.ui.headers.projects}
          </h2>
          <div className="w-16 h-1 bg-academic-500 mx-auto opacity-50"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {content.projects.map((project) => (
            <a 
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-academic-800 border border-academic-700 p-8 hover:bg-academic-700 hover:border-academic-500 transition-all duration-300 rounded-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-academic-900/50 rounded-sm text-academic-300 group-hover:text-white transition-colors">
                  <Cuboid size={32} strokeWidth={1.5} />
                </div>
                <ExternalLink size={20} className="text-academic-500 group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-2xl font-serif font-bold mb-3 text-white">
                {project.title}
              </h3>
              
              {project.techStack && (
                <div className="mb-4">
                  <span className="text-xs font-mono text-academic-400 uppercase tracking-widest border border-academic-600 px-2 py-1 rounded-sm">
                    {project.techStack}
                  </span>
                </div>
              )}

              <p className="text-academic-300 leading-relaxed group-hover:text-academic-100 transition-colors">
                {project.description}
              </p>
              
              <div className="mt-6 text-sm font-bold text-academic-400 group-hover:text-white uppercase tracking-wider flex items-center gap-2">
                {content.ui.buttons.viewProject}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
