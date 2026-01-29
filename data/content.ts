import { SiteContent } from '../types';

export const content: SiteContent = {
  personal: {
    name: "Николай Казимиров",
    logoText: "Н.К. ⊬ ⊥",
    degree: "Ph.D.",
    headline: "Математическая логика, Теория множеств, Теория моделей",
    tagline: "Научный консалтинг для R&D в области ИИ и фундаментальное образование.",
    email: "contact@kazimirov.math"
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
      targetAudience: "R&D в ИИ, Computer Science, Технологические компании",
      description: "Глубокое техническое руководство по формальным системам, верификации и онтологическому моделированию.",
      details: [
        "Формальная верификация алгоритмов",
        "Проектирование онтологий для графов знаний",
        "Логические ограничения в системах ИИ",
        "Математическое моделирование сложных областей"
      ],
      cta: "Заказать консультацию",
      iconName: "Brain"
    },
    {
      id: "school",
      title: "Заочная школа логики",
      targetAudience: "Частные лица, студенты, самообразование",
      description: "Строгая образовательная программа, сочетающая видеолекции с персональной проверкой доказательств.",
      details: [
        "Пошаговая программа через Stepik/LMS",
        "Персональная проверка письменных доказательств",
        "Фокус на теории множеств ZFC и теории моделей",
        "Сессии вопросов и ответов раз в две недели"
      ],
      cta: "Записаться",
      iconName: "GraduationCap"
    }
  ],
  books: [
    {
      id: "b1",
      title: "Архетипы математики",
      role: "Автор",
      description: "Всестороннее исследование фундаментальных структур, лежащих в основе современной математической мысли.",
      coverImage: "https://picsum.photos/300/450?grayscale&random=1",
      link: "#",
      year: "2023"
    },
    {
      id: "b2",
      title: "Математика для Data Science",
      role: "Научный редактор",
      description: "Научная редактура и консультирование для полного руководства А. Павликова по математическим основам современной науки о данных.",
      coverImage: "https://picsum.photos/300/450?grayscale&random=2",
      link: "#",
      year: "2022"
    },
    {
      id: "b3",
      title: "Математика для всех",
      role: "Соавтор",
      description: "Написана в соавторстве с А. Савватеевым. Книга призвана преодолеть разрыв между академической строгостью и общественным пониманием.",
      coverImage: "https://picsum.photos/300/450?grayscale&random=3",
      link: "#",
      year: "2021"
    }
  ],
  lectures: [
    {
      id: "l1",
      title: "Введение в теорию моделей",
      thumbnail: "https://picsum.photos/600/340?grayscale&random=10",
      duration: "1:15:00",
      platform: "YouTube"
    },
    {
      id: "l2",
      title: "Аксиоматическая теория множеств (ZFC)",
      thumbnail: "https://picsum.photos/600/340?grayscale&random=11",
      duration: "58:20",
      platform: "YouTube"
    },
    {
      id: "l3",
      title: "Парадокс Банаха-Тарского",
      thumbnail: "https://picsum.photos/600/340?grayscale&random=12",
      duration: "1:42:15",
      platform: "YouTube"
    }
  ],
  about: {
    bio: "Я математик, специализирующийся на математической логике и основаниях математики. Мои исследования посвящены теории моделей и её приложениям к алгебре. Помимо чистой науки, я занимаюсь тем, чтобы перекинуть мост между абстрактными математическими концепциями и их практическими применениями в Computer Science и искусственном интеллекте. Я верю, что строгое логическое мышление является краеугольным камнем надежного технологического прогресса.",
    interests: [
      "Теория моделей",
      "Теория множеств",
      "Формальная верификация",
      "Философия математики",
      "Безопасность ИИ (AI Alignment)"
    ],
    socials: [
      { label: "Telegram", href: "https://t.me/mathreisender" },
      { label: "YouTube", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Email", href: "mailto:contact@kazimirov.math" }
    ]
  }
};