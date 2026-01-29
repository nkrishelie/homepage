import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { LanguageProvider } from './LanguageContext'; // <--- Импорт

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <LanguageProvider>  {/* <--- Обертка */}
      <App />
    </LanguageProvider> {/* <--- Обертка */}
  </React.StrictMode>
);
