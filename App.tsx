import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Books } from './components/Books';
import { Lectures } from './components/Lectures';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { Portfolio } from './components/Portfolio'; // Убедись, что файл Portfolio.tsx создан в папке components

const App: React.FC = () => {
  // Состояние для хранения текущего пути URL
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Функция для обновления пути при нажатии кнопок "Назад/Вперед" в браузере
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    
    // Функция для скролл-бара
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // --- РОУТИНГ (Переключение страниц) ---
  
  // 1. Если адрес "/portfolio", показываем компонент портфолио
  if (currentPath === '/portfolio') {
    return <Portfolio />;
  }

  // 2. Иначе показываем главную страницу (Academic Profile)
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Полоска прогресса чтения сверху */}
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
