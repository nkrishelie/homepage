import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SiteContent } from '../types';
import type { Language } from '../LanguageContext';
import { getMaterialsForLang, getMaterialsGroups } from '../data/materialsGroup';

type Props = {
  content: SiteContent;
  language: Language;
  getHref: (link: string) => string;
  variant: 'desktop' | 'mobile';
  onNavigate?: () => void;
};

export const HeaderMaterials: React.FC<Props> = ({
  content,
  language,
  getHref,
  variant,
  onNavigate,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const groups = getMaterialsGroups(language);
  const label = content.ui.headers.materials;

  const practiceTests = content.materials.practiceTests;
  const langItems = getMaterialsForLang(language);
  const hasStaticMaterials = langItems.length > 0;
  const hasPracticeTests = practiceTests.length > 0;

  if (!hasStaticMaterials && !hasPracticeTests) {
    return (
      <a
        href={getHref('#materials')}
        className={
          variant === 'desktop'
            ? 'text-sm font-medium text-academic-600 hover:text-black transition-colors uppercase tracking-wider whitespace-nowrap'
            : 'text-2xl font-serif font-bold text-academic-900 border-b border-academic-100 pb-4'
        }
        onClick={() => onNavigate?.()}
      >
        {label}
      </a>
    );
  }

  const divider =
    variant === 'desktop' ? (
      <div className="mx-2 my-1 h-px bg-academic-100" aria-hidden />
    ) : (
      <div className="h-px bg-academic-100 my-2 mr-4" aria-hidden />
    );

  const innerPanel = (
    <>
      <a
        href={getHref('#materials')}
        className={
          variant === 'desktop'
            ? 'block px-4 py-2.5 text-sm text-academic-900 hover:bg-academic-50 transition-colors font-medium'
            : 'text-lg font-serif text-academic-800 py-2 pl-3'
        }
        onClick={() => {
          setOpen(false);
          onNavigate?.();
        }}
      >
        {content.materials.menuOverview}
      </a>

      {divider}

      {hasStaticMaterials
        ? groups.map((group) => (
            <div key={group.categoryId}>
              <div
                className={
                  variant === 'desktop'
                    ? 'px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-academic-400'
                    : 'px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-academic-400'
                }
              >
                {group.label}
              </div>
              {group.items.map((item) => (
                <a
                  key={item.filename}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={content.materials.linkOpensNewTabHint}
                  className={
                    variant === 'desktop'
                      ? 'block px-4 py-2 text-sm text-academic-600 hover:bg-academic-50 hover:text-academic-900 transition-colors leading-snug'
                      : 'block pl-4 pr-2 py-2 text-base text-academic-700 hover:text-black border-b border-academic-50 last:border-b-0'
                  }
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                >
                  {item.title}
                </a>
              ))}
            </div>
          ))
        : null}

      {hasPracticeTests ? (
        <>
          {hasStaticMaterials ? divider : null}
          <div
            className={
              variant === 'desktop'
                ? 'px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-academic-400'
                : 'px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-academic-400'
            }
          >
            {content.materials.practiceTestsHeading}
          </div>
          {practiceTests.map((quiz) => (
            <a
              key={quiz.url}
              href={quiz.url}
              target="_blank"
              rel="noopener noreferrer"
              title={content.materials.linkOpensNewTabHint}
              className={
                variant === 'desktop'
                  ? 'block px-4 py-2 text-sm text-academic-600 hover:bg-academic-50 hover:text-academic-900 transition-colors leading-snug'
                  : 'block pl-4 pr-2 py-2 text-base text-academic-700 hover:text-black border-b border-academic-50 last:border-b-0'
              }
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
            >
              {quiz.title}
            </a>
          ))}
        </>
      ) : null}
    </>
  );

  if (variant === 'mobile') {
    return (
      <div className="border-b border-academic-100 pb-4">
        <button
          type="button"
          className="flex w-full items-center justify-between text-2xl font-serif font-bold text-academic-900 text-left"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span>{label}</span>
          <ChevronDown
            size={26}
            strokeWidth={2}
            className={`text-academic-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open ? <nav className="flex flex-col gap-1 mt-4">{innerPanel}</nav> : null}
      </div>
    );
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className={`flex items-center gap-1 text-sm font-medium uppercase tracking-wider whitespace-nowrap transition-colors ${
          open ? 'text-black' : 'text-academic-600 hover:text-black'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`text-academic-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open ? (
        <div className="absolute left-0 top-[calc(100%+0.35rem)] min-w-[min(100vw-2rem,22rem)] max-h-[min(70vh,520px)] overflow-y-auto rounded-lg border border-academic-200 bg-white py-2 shadow-lg z-[110]">
          {innerPanel}
        </div>
      ) : null}
    </div>
  );
};
