import { LucideIcon } from 'lucide-react';

export interface LinkItem {
  label: string;
  href: string;
}

export interface SocialLink extends LinkItem {
  icon?: string; // Icon name reference
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
  navigation: LinkItem[];
  services: ServiceItem[];
  books: BookItem[];
  lectures: LectureItem[];
  about: {
    bio: string;
    interests: string[];
    socials: SocialLink[];
  };
}