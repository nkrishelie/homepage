import { SiteContent } from '../types';

export const content: SiteContent = {
  personal: {
    name: "Николай Казимиров",
    logoText: "N.K. ⊬ ⊥",
    degree: "Ph.D.",
    // Вернул как было про логику. Специфику про 01.01.05 убрал в About.
    headline: "Математическая логика и основания математики", 
    tagline: "Научная экспертиза, фундаментальная логика и строгие математические модели.",
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
      title: "Научный консалтинг",
      targetAudience: "IT-специалисты, Аналитики, R&D",
      description: "Экспертиза математических моделей и поиск логических ошибок в архитектуре сложных систем.",
      details: [
        "Анализ формальных постановок задач",
        "Помощь в чтении научных статей (Papers review)",
        "Консультации по дискретной математике и логике",
        "Устранение пробелов в фундаментальной базе"
      ],
      cta: "Обсудить задачу",
      iconName: "Brain"
    },
    {
      id: "school",
      title: "Заочная школа",
      targetAudience: "Индивидуальное обучение",
      description: "Работа один на один. Вы смотрите лекции и решаете задачи, я проверяю доказательства и логику рассуждений.",
      details: [
        "Классический университетский подход",
        "Письменная проверка решений (LaTeX/Рукопись)",
        "Индивидуальный график",
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
      year: "2019",
      description: "Монография: общие методы, приемы, конструкции, идеи математики и ее оснований. (М.: Юстицинформ).",
      // ВАЖНО: Положите файл archetypes.jpg в папку public
      coverImage: "/data/archetypes.png", 
      link: "https://tinyurl.com/3j7z25k2"
    },
    {
      id: "savvateev",
      title: "Введение в настоящую математику",
      role: "Соавтор",
      year: "2022",
      description: "Совместно с А.В. Савватеевым. Пособие по мотивам курса «100 уроков математики».",
      // ВАЖНО: Положите файл savvateev.jpg в папку public
      coverImage: "/data/savvateev.png",
      link: "https://tinyurl.com/mr28x2t2"
    },
    {
      id: "springer",
      title: "Math as a Foreign Language",
      role: "Автор",
      year: "Under Review",
      description: "Готовится к изданию. Книга посвящена языку математики и методологии мышления.",
      // Можете положить любую заглушку или лого Springer
      coverImage: "https://placehold.co/400x600/e2e8f0/1e293b?text=Springer+Draft",
      link: "#"
    }
  ],
  lectures: [
    {
      id: "l1",
      title: "Математика как иностранный",
      // Нужен ID видео (часть после v= в ссылке). Замените Zg_vKQ на реальный.
      thumbnail: "https://img.youtube.com/vi/q1eJ7Zg_vKQ/maxresdefault.jpg", 
      duration: "Цикл лекций",
      platform: "YouTube"
    },
    {
      id: "l2",
      title: "Теорема Гёделя о неполноте",
      thumbnail: "https://img.youtube.com/vi/YOUR_ID_HERE/maxresdefault.jpg", 
      duration: "Лекция",
      platform: "YouTube"
    },
    {
      id: "l3",
      title: "Сюрреальные числа",
      thumbnail: "https://img.youtube.com/vi/YOUR_ID_HERE_2/maxresdefault.jpg",
      duration: "Лекция",
      platform: "YouTube"
    }
  ],
  about: {
    bio: "Кандидат физико-математических наук (01.01.05 — Дискретная математика и математическая кибернетика). Окончил матфак ПетрГУ и аспирантуру Карельского научного центра РАН. Диссертация посвящена стохастике («Леса Гальтона—Ватсона и случайные подстановки»). Работал научным сотрудником РАН, преподавал матанализ на физфаке ПетрГУ. В настоящее время специализируюсь на основаниях математики, теории моделей и научной популяризации (сотрудничество с А. Савватеевым, А. Павликовым).",
    interests: [
      "Дискретная математика",
      "Математическая логика",
      "Теория моделей",
      "Основания математики"
    ],
    socials: [
      { label: "Telegram", href: "https://t.me/mathreisender" },
      { label: "YouTube", href: "https://www.youtube.com/@reisedurchdiemathe" },
      { label: "Email", href: "mailto:ngoogstein@gmail.com" }
    ],
    // Исправил локацию
    location: "Москва, Россия" 
  }
};
