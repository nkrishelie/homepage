import { SiteContent } from '../types';

export const content: SiteContent = {
  personal: {
    name: "Николай Казимиров",
    logoText: "N.K. ⊬ ⊥", 
    degree: "Ph.D.",
    // Точная формулировка специальности
    headline: "Дискретная математика и математическая кибернетика (01.01.05)", 
    tagline: "Научная экспертиза, фундаментальная логика и основания математики.",
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
        "Индивидуальный график без вебинаров",
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
      coverImage: "https://placehold.co/400x600/e2e8f0/1e293b?text=Archetypes", // Заменишь на фото обложки
      link: "https://mathem.at/book"
    },
    {
      id: "savvateev",
      title: "Введение в настоящую математику",
      role: "Соавтор",
      year: "2022",
      description: "Совместно с А.В. Савватеевым. Пособие по мотивам курса «100 уроков математики». (М.: Русский фонд содействия образованию и науке).",
      coverImage: "https://placehold.co/400x600/e2e8f0/1e293b?text=Savvateev+Book",
      link: "https://t.me/mathreisender" 
    },
    {
      id: "springer",
      title: "Math as a Foreign Language",
      role: "Автор",
      year: "In Review",
      description: "Готовится к изданию в Springer. Книга посвящена языку математики и методологии мышления.",
      coverImage: "https://placehold.co/400x600/e2e8f0/1e293b?text=Springer+Draft",
      link: "#"
    }
  ],
  lectures: [
    {
      id: "l1",
      title: "Математика как иностранный",
      thumbnail: "https://img.youtube.com/vi/q1eJ7Zg_vKQ/maxresdefault.jpg", // ID замени на реальный, если есть вводная лекция
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
    // Компиляция из двух текстов: строго фактологическая + текущий статус
    bio: "Кандидат физико-математических наук (2003). Окончил математический факультет ПетрГУ (2000) и аспирантуру Иракельского научного центра РАН. Диссертация посвящена дискретной математике («Леса Гальтона—Ватсона и случайные подстановки»). Работал научным сотрудником РАН, преподавал матанлиз на физфаке ПетрГУ и работал учителем в Университетском лицее. Автор более 10 научных работ. В последние годы специализируюсь на основаниях математики, логике и теории моделей, а также сотрудничаю с группой Алексея Савватеева в области популяризации «настоящей» математики.",
    interests: [
      "Дискретная математика",
      "Математическая логика",
      "Теория моделей",
      "Основания математики"
    ],
    socials: [
      { label: "Telegram", href: "https://t.me/mathreisender" },
      { label: "YouTube", href: "https://www.youtube.com/@reisedurchdiemathe" }, // Исправлена ссылка
      { label: "Email", href: "mailto:ngoogstein@gmail.com" }
    ]
  }
};
