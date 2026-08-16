import React from 'react';
import { ClipboardList, ExternalLink, CheckCircle2, GraduationCap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { getMaterialsForLang, getMaterialsGroups } from '../data/materialsGroup';

export const Materials: React.FC = () => {
  const { language, content } = useLanguage();

  const practiceTests = content.materials.practiceTests;
  const langItems = getMaterialsForLang(language);
  const hasStaticMaterials = langItems.length > 0;
  const hasPracticeTests = practiceTests.length > 0;

  if (!hasStaticMaterials && !hasPracticeTests) return null;

  const groups = hasStaticMaterials ? getMaterialsGroups(language) : [];

  return (
    <section
      id="materials"
      className="py-24 bg-white border-t border-academic-100"
      aria-labelledby="materials-heading"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2
            id="materials-heading"
            className="text-3xl md:text-4xl font-serif font-bold text-academic-900 mb-4"
          >
            {content.ui.headers.materials}
          </h2>
          <div className="w-16 h-1 bg-academic-800 mx-auto opacity-20" />
          <p className="mt-6 text-xl font-serif text-academic-800 max-w-3xl mx-auto">
            {content.materials.sectionTitle}
          </p>
          <p className="mt-4 text-academic-600 max-w-2xl mx-auto leading-relaxed">
            {content.materials.sectionIntro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {hasStaticMaterials
            ? groups.map((group) => (
                <div
                  key={group.categoryId}
                  className="group border border-academic-200 p-8 hover:border-academic-400 transition-colors bg-academic-50/50"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-academic-100 rounded-sm text-academic-800 group-hover:bg-academic-800 group-hover:text-white transition-colors">
                    {(() => {
                      const categories: Record<string, string> = {
                        analysis: '∫',
                        algebra: '±×÷',
                        geometry: '≃',
                        sets: '∅',
                        foundations: '⊢',
                        probability: 'P',
                      };
                      const isProbability = group.categoryId === 'probability';
                      return (
                        <span
                          style={{
                            font: isProbability
                              ? 'bold 24px Arial, Helvetica, sans-serif'
                              : 'normal 24px Georgia, "Times New Roman", serif',
                            lineHeight: '1',
                          }}
                        >
                          {categories[group.categoryId] || 'Σ'}
                        </span>
                      );
                    })()}
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-academic-900 mb-6">
                    {group.label}
                  </h3>

                  <div className="mb-6 h-1 w-12 bg-academic-300 rounded group-hover:bg-academic-800 transition-colors"></div>

                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item.filename} className="flex items-start gap-3 text-academic-700">
                        <ExternalLink
                          size={18}
                          className="mt-1 text-academic-600 shrink-0"
                          aria-hidden
                        />
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={content.materials.linkOpensNewTabHint}
                          className="leading-relaxed hover:text-academic-900 underline-offset-4 decoration-academic-600 hover:underline"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            : null}

          {hasPracticeTests ? (
            <div className="group border border-academic-200 p-8 hover:border-academic-400 transition-colors bg-academic-50/50">
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-academic-100 rounded-sm text-academic-800 group-hover:bg-academic-800 group-hover:text-white transition-colors">
                <GraduationCap size={20} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-serif font-bold text-academic-900 mb-6">
                {content.materials.practiceTestsHeading}
              </h3>

              <div className="mb-4 h-1 w-12 bg-academic-300 rounded"></div>

              <ul className="space-y-3">
                {practiceTests.map((quiz) => (
                  <li key={quiz.url} className="flex items-start gap-3 text-academic-700">
                    <ExternalLink
                      size={18}
                      className="mt-1 text-academic-600 shrink-0"
                      aria-hidden
                    />
                    <a
                      href={quiz.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={content.materials.linkOpensNewTabHint}
                      className="leading-relaxed hover:text-academic-900 underline-offset-4 decoration-academic-600 hover:underline"
                    >
                      {quiz.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

        </div>
      </div>
    </section>
  );
};
