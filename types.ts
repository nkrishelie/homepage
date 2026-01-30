import { LucideIcon } from 'lucide-react';

export interface LinkItem {
  label: string;
  href: string;
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

export interface BookItem {
  id: string;
  title: string;
  role: string;
  description: string;
  coverImage: string;
  link: string;
  year: string;
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
  portfolio: PortfolioContent;
}
