import { LucideIcon } from 'lucide-react';

export interface LinkItem {
  label: string;
  href: string;
  /** Кастомная отрисовка в шапке (например, выпадающее меню) */
  id?: 'materials';
}

export interface SocialLink extends LinkItem {
  icon?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  targetAudience: string;
  description: string;
  details: string[];
  cta: string;
  iconName: 'Brain' | 'GraduationCap' | 'Scroll';
}

export interface BookPreorderLink {
  label: string;
  href: string;
  disabled?: boolean;
}

export interface BookPreorder {
  label: string;
  links: BookPreorderLink[];
}

export interface BookPromo {
  /** Промокод, например SPRAUT */
  code: string;
  /** Короткая строка вида «Скидка 20% по коду» */
  text: string;
  /** Мелкий шрифт: где именно код действует и какие ограничения */
  note: string;
  /** Подпись кнопки копирования и её состояние «скопировано» */
  copyLabel: string;
  copiedLabel: string;
  /** Дословный текст условий издателя и подпись раскрывашки */
  terms: string;
  termsLabel: string;
}

export interface BookItem {
  id: string;
  title: string;
  role: string;
  description: string;
  coverImage: string;
  link: string;
  year: string;
  type?: string;
  /** Пояснительный текст под описанием (например, про исходную вёрстку) */
  note?: string;
  /** Группа кнопок предзаказа/покупки у разных дистрибьюторов */
  preorder?: BookPreorder;
  /** Промокод издателя со скидкой */
  promo?: BookPromo;
}

// 1. Интерфейс для одной главы
export interface BookChapter {
  id: string;
  title: string;
  description: string; // Текст для вкладки "Описание"
  sections: string[];  // Список для вкладки "Разделы"
  icon?: string;       // Символ главы
}

// 2. Интерфейс для всей страницы книги
export interface BookPageContent {
  title: string;
  subtitle: string;
  description: string;
  downloadButton: string;
  back: string;
  ui: {
    tabDescription: string; // Текст кнопки "Описание"
    tabSections: string;    // Текст кнопки "Разделы"
  };
  stats: {
    pages: string;
    images: string;
    sources: string;
    archetypes: string;
  };
  mentorship?: { title: string; text: string };
  chapters: BookChapter[];
}

export interface LectureItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  platform: string;
  link?: string;
}

// Новый раздел для интерфейсных текстов
export interface UILabels {
  headers: {
    services: string;
    projects: string; // <--- НОВОЕ
    books: string;
    lectures: string;
    materials: string;
    about: string;
    interests: string;
    contacts: string;
    location: string;
  };
  buttons: {
    details: string;
    watchAll: string;
    viewProject: string; // <--- НОВОЕ
  };
  footer: {
    rights: string;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  link: string;
  techStack?: string; // Например "Three.js, React"
  vpnRequired?: boolean;
}

// 1. Добавьте новые интерфейсы для портфолио
export interface PortfolioExperience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface PortfolioCertificate {
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface PortfolioContent {
  header: {
    title: string;
    subtitle: string;
    back: string;
    download: string;
  };
  summary: {
    title: string;
    text: string;
  };
  experience: {
    title: string;
    items: PortfolioExperience[];
  };
  skills: {
    title: string;
    stack: string[]; // Просто список строк для краткости
  };
  // Добавляем языки
  languages: {
    title: string;
    items: { language: string; level: string }[];
  };
  certs: {
    title: string;
    items: PortfolioCertificate[];
  };
}

export interface SiteContent {
  personal: {
    name: string;
    logoText: string;
    degree: string;
    headline: string;
    tagline: string;
    email: string;
  };
  ui: UILabels; // <--- Добавили сюда
  navigation: LinkItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  books: BookItem[];
  lectures: LectureItem[];
  about: {
    bio: string;
    interests: string[];
    socials: SocialLink[];
    location?: string;
  };
  bookPage: BookPageContent;
  portfolio: PortfolioContent;
  /** Тексты секции и меню статических материалов (папка public/Materials) */
  materials: {
    sectionTitle: string;
    sectionIntro: string;
    menuOverview: string;
    /** Подпись ко ссылке (страницы и формы открываются в новой вкладке) */
    linkOpensNewTabHint: string;
    practiceTestsHeading: string;
    practiceTests: { title: string; url: string }[];
  };
}
