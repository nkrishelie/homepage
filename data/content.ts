import { SiteContent } from '../types';

export const content: SiteContent = {
  personal: {
    name: "Николай Казимиров",
    logoText: "N.K. ⊬ ⊥", // Если рамка вокруг этого, скажи, уберем в Header.tsx
    degree: "Ph.D.",
    // Сделал покороче, чтобы не переносилось уродливо
    headline: "Математическая логика и Основания математики", 
    tagline: "Фундаментальная подготовка для исследователей и научная экспертиза сложных проектов.",
    email: "ngoogstein@gmail.com"
  },
  navigation: [
    { label: "Услуги", href: "#services" },
    { label: "Книги", href: "#books" },
    { label: "Лекции", href: "#lectures" },
    { label: "Обо мне", href: "#about" },
  ],
  services: [
    {
      id: "consulting",
      title: "Научное консультирование",
      // Убрал "R&D в ИИ", чтобы не давить ответственностью. Оставил широкое поле.
      targetAudience: "IT-специалисты, Аналитики, Исследователи",
      description: "Помощь в формализации задач, проверка корректности математических моделей и поиск логических ошибок в архитектуре.",
      details: [
        "Анализ математической составляющей проектов",
        "Помощь в чтении сложных научных статей (Papers)",
        "Консультации по теории моделей и графов",
        "Устранение пробелов в фундаментальной базе"
      ],
      cta: "Обсудить задачу",
      iconName: "Brain" 
    },
    {
      id: "school",
      title: "Заочная школа логики",
      targetAudience: "Для тех, кто хочет глубины",
      description: "Индивидуальное прохождение курса. Вы смотрите лекции и решаете задачи, я лично проверяю ваши доказательства.",
      details: [
        "Классический академический подход",
        "Письменная проверка решений (рукопись/LaTeX)",
        "Никаких вебинаров — работаем в удобном темпе",
        "Прямая связь через Telegram/Email"
      ],
      cta: "Записаться",
      iconName: "GraduationCap"
    }
  ],
  books: [
    {
      id: "archetypes",
      title: "Архетипы математики",
      role: "Автор",
      year: "2020",
      description: "Монография о методах конструирования математических объектов. От наивной теории множеств до теории категорий.",
      coverImage: "https://placehold.co/400x600/e2e8f0/1e293b?text=Archetypes", // Заменишь на ссылку на картинку позже
      link: "https://mathem.at/book"
    },
    {
      id: "pavlikov",
      title: "Математика для Data Science",
      role: "Научный консультант",
      year: "2024",
      description: "Книга А. Павликова («Математик МГУ»). Выполнил научное редактирование глав по логике и теории множеств.",
      coverImage: "https://placehold.co/400x600/e2e8f0/1e293b?text=Pavlikov",
      link: "https://t.me/mathreisender" // Пока ведем в тг, книги же еще нет в продаже?
    }
  ],
  lectures: [
    {
      id: "l1",
      title: "Теория моделей: Введение",
      thumbnail: "https://img.youtube.com/vi/q1eJ7Zg_vKQ/maxresdefault.jpg", // Поставь реальный ID видео вместо q1eJ7Zg_vKQ
      duration: "Лекция",
      platform: "YouTube"
    },
    {
      id: "l2",
      title: "Теорема Гёделя о неполноте",
      thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg", // Замени YOUR_VIDEO_ID
      duration: "Лекция",
      platform: "YouTube"
    },
    {
      id: "l3",
      title: "Парадокс Банаха-Тарского",
      thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID_2/maxresdefault.jpg",
      duration: "Лекция",
      platform: "YouTube"
    }
  ],
  about: {
    // Исправил био на более честное, но весомое
    bio: "Кандидат физико-математических наук. Диссертация была посвящена стохастике (случайные леса и подстановки), но последние годы я полностью сосредоточен на основаниях математики. Моя цель — дать строгую базу тем, кто работает с современными технологиями, но чувствует нехватку фундаментального понимания.",
    interests: [
      "Теория моделей",
      "Теория множеств (ZFC)",
      "Математическая логика",
      "Основания математики"
    ],
    socials: [
      { label: "Telegram", href: "https://t.me/mathreisender" }, // <--- ССЫЛКИ РАБОТАЮТ
      { label: "YouTube", href: "https://youtube.com/@mathreisender" },
      { label: "Email", href: "mailto:ngoogstein@gmail.com" }
    ]
  }
};
