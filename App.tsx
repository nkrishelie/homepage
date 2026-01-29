import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Books } from './components/Books';
import { Lectures } from './components/Lectures';
import { About } from './components/About';
import { Footer } from './components/Footer';

// Если вы решили обернуть провайдер здесь (хотя лучше в main.tsx), 
// то импорт должен выглядеть так:
// import { LanguageProvider } from './LanguageContext'; 

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Scroll Progress Bar */}
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
