import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Books } from './components/Books';
import { Lectures } from './components/Lectures';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { Portfolio } from './components/Portfolio';
import { BookDetails } from './components/BookDetails';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. СЛЕЖЕНИЕ ЗА URL (Back/Forward buttons)
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 2. SCROLL PROGRESS BAR
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 3. НОВОЕ: ИСПРАВЛЕНИЕ ЯКОРЕЙ (ANCHOR FIX) ---
  useEffect(() => {
    // Этот код сработает каждый раз, когда меняется путь (например, вернулись на главную)
    if (currentPath === '/' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // Если элемент уже есть - крутим сразу
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Если элемента нет (React еще рисует), ждем 100мс и пробуем снова
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300); // 300мс задержки обычно хватает для отрисовки
      }
    }
  }, [currentPath]); // Следим за изменением пути

  // --- РОУТИНГ ---
  
  if (currentPath === '/portfolio' || currentPath === '/portfolio/') {
    return <Portfolio />;
  }
  if (currentPath === '/book' || currentPath === '/book/') {
    return <BookDetails />;
  }

  // ГЛАВНАЯ СТРАНИЦА
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div 
        className="fixed top-0 left-0 h-1 bg-academic-800 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />
      
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Services />
        <Projects />
        <Books />
        <Lectures />
        <About />
      </main>

      <Footer />
    </div>
  );
};

export default App;
