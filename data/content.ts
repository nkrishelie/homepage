import { SiteContent } from '../types';

export const content: SiteContent = {
  personal: {
    name: "Николай Казимиров",
    logoText: "N.K. ⊬ ⊥",
    degree: "Ph.D.",
    headline: "Математическая логика и основания математики",
    tagline: "Научная экспертиза, фундаментальная логика и строгие математические модели.",
    email: "ngoogstein@gmail.com"
  },
  // Новая секция с переводами интерфейса
  ui: {
    headers: {
      services: "Услуги",
      projects: "Цифровые проекты",
      books: "Книги",
      lectures: "Избранные лекции",
      about: "Обо мне",
      interests: "Научные интересы",
      contacts: "Контакты",
      location: "Локация"
    },
    buttons: {
      details: "Подробнее",
      watchAll: "Смотреть все лекции на YouTube",
      viewProject: "Открыть проект"
    },
    footer: {
      rights: "Все права защищены."
    }
  },
  navigation: [
    { label: "Услуги", href: "#services" },
    { label: "Проекты", href: "#projects" },
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
        "Консультации по мат. логике и теории моделей",
        "Устранение пробелов в фундаментальной базе"
      ],
      cta: "Обсудить задачу",
      iconName: "Brain"
    },
    {
      id: "school",
      title: "Индивидуальное наставничество",
      targetAudience: "Персональное обучение",
      description: "Полноценный образовательный диалог. Мы разбираем сложные концепции, строим доказательства и развиваем математическую интуицию в режиме живого общения.",
      details: [
        "Живые онлайн-сессии (Zoom/Meet)",
        "Совместный разбор теории и задач",
        "Рецензирование кода и LaTeX",
        "Прямая связь через Telegram/Email"
      ],
      cta: "Обсудить формат",
      iconName: "GraduationCap"
    }
  ],
  projects: [
    {
      id: "nexus",
      title: "Nexus Math",
      description: "Интерактивная 3D-карта оснований математики. Визуализация связей между аксиоматическими системами, теоремами и определениями в виде графа.",
      link: "https://nexus.mathem.at/",
      techStack: "WebGL / 3D Graph"
    },
    {
      id: "arxiv",
      title: "ArXiv Universe",
      description: "3D-визуализация научного ландшафта на основе данных arXiv.org. Научные дисциплины представлены как планеты-гиганты, а отдельные статьи — как их спутники.",
      link: "https://arxiv.mathem.at/",
      techStack: "Data Viz / Big Data"
    }
  ],
  books: [
    {
      id: "archetypes",
      title: "Архетипы математики",
      role: "Автор",
      year: "2019",
      description: "Монография: общие методы, приемы, конструкции, идеи математики и ее оснований. (М.: Юстицинформ).",
      coverImage: "/archetypes.png",
      link: "/book"
    },
    {
      id: "savvateev",
      title: "Введение в настоящую математику",
      role: "Соавтор",
      year: "2022",
      description: "Совместно с А.В. Савватеевым. Пособие по мотивам курса «100 уроков математики».",
      coverImage: "/savvateev.png",
      link: "https://tinyurl.com/mr28x2t"
    },
    {
      id: "springer",
      title: "Math as a Foreign Language",
      role: "Автор",
      year: "Under Review",
      description: "Готовится к изданию. Книга посвящена языку математики и методологии мышления.",
      coverImage: "/MFL.png",
      link: "#"
    }
  ],
  lectures: [
    {
      id: "game",
      title: "Игра Эренфойхта-Фраиссе",
      thumbnail: "https://img.youtube.com/vi/FN_Sw4pKmZk/maxresdefault.jpg",
      duration: "Лекция",
      platform: "YouTube",
      link: "https://youtu.be/FN_Sw4pKmZk"
    },
    {
      id: "cantor",
      title: "Теорема Кантора-Бернштейна",
      thumbnail: "https://img.youtube.com/vi/2S-ofA4SRcY/maxresdefault.jpg",
      duration: "Лекция",
      platform: "YouTube",
      link: "https://youtu.be/2S-ofA4SRcY"
    },
    {
      id: "godel",
      title: "Вторая теорема Гёделя о неполноте",
      thumbnail: "https://img.youtube.com/vi/KhaYjR2sCEY/maxresdefault.jpg",
      duration: "Лекция",
      platform: "YouTube",
      link: "https://www.youtube.com/watch?v=KhaYjR2sCEY"
    }
  ],
  about: {
    bio: "Кандидат физико-математических наук. Окончил матфак ПетрГУ и аспирантуру КарНЦ РАН. В 2024–2025 годах жил и работал в Австрии (Грац), где опыт изучения немецкого языка в TU Graz вдохновил меня на написание книги «Math as a Foreign Language» (Springer, under review). Специализируюсь на основаниях математики, теории моделей и популяризации науки.",
    interests: [
      "Математическая логика",
      "Теория множеств",
      "Теория моделей",
      "Теория доказательств",
      "Основания математики",
      "Computer Science"
    ],
    socials: [
      { label: "Telegram", href: "https://t.me/mathreisender" },
      { label: "YouTube", href: "https://www.youtube.com/@reisedurchdiemathe" },
      { label: "Email", href: "mailto:ngoogstein@gmail.com" },
      // Добавляем новые пункты для баланса:
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nikolai-kazimirov/" },
      { label: "GitHub", href: "https://github.com/nkrishelie" }, // Если есть
      // { label: "Google Scholar", href: "..." } // Если есть
    ],
    location: "Москва, Россия"
  },
  // Добавить в конец объекта content, перед закрывающей скобкой };
  portfolio: {
    header: {
      title: "Николай Казимиров",
      subtitle: "Data Scientist / Product Owner / Head of Content",
      back: "Вернуться на главную",
      download: "Скачать резюме"
    },
    summary: {
      title: "Обо мне",
      text: "Как математик, я подхожу к работе с данными с исследовательской строгостью, выявляя скрытые и сложные закономерности. Мой основной фокус — это формулирование и тщательная проверка гипотез с использованием Python и возможностей BigQuery. Моя профессиональная цель — развитие в сферах Data Science и Machine Learning через решение сложных бизнес-задач и освоение новых технологий. Готов к релокации."
    },
    experience: {
      title: "Опыт работы",
      items: [
        {
          role: "Senior Data Analyst",
          company: "Softline (Ecommerce)",
          period: "Сен 2019 – Наст. время",
          description: [
            "Ключевые метрики: Поддержка выручки до $5M, 10 онлайн-магазинов в 8 странах.",
            "Архитектура данных: Внедрил BI-систему на GCP (BigQuery + Looker), сократив ручной ETL на 70%.",
            "Визуализация: Создал и поддерживаю 70+ дашбордов для мониторинга бизнес-метрик.",
            "Оптимизация: Внедрил систему алертов (раннее обнаружение проблем в корзине) и A/B тестирование на Python.",
            "Технический стек: Python, SQL, Google Cloud Platform, Looker Studio."
          ]
        },
        // 2. СРЕДНЯЯ РОЛЬ (PRODUCT OWNER / MANAGEMENT)
        {
          role: "Head of Content Division / Product Owner",
          company: "Softline",
          period: "Апр 2016 – Сен 2019",
          description: [
            "Рост бизнеса: За этот период выручка направления онлайн-продаж выросла в 3.5 раза ($3.5M).",
            "Управление продуктом: Внедрил новую CMS (MCF system), спроектировал функционал и руководил разработкой.",
            "Масштабирование: Увеличил каталог товаров до 100k позиций, управлял каталогами в 4 странах.",
            "Управление командой: Руководил отделом из 15-20 человек (контент-менеджеры, переводчики)."
          ]
        },
        // 3. НАЧАЛЬНАЯ РОЛЬ (TEAM LEAD)
        {
          role: "E-Com Manager / Team Lead",
          company: "Softline",
          period: "Мар 2014 – Апр 2016",
          description: [
            "Start-up фаза: Выстроил процесс наполнения витрин с нуля (рост с 0 до 5000 позиций).",
            "Создание команды: Сформировал и обучил первую группу контент-менеджеров (3 человека).",
            "Управление 25 товарными категориями оборудования и ПО."
          ]
        },
        {
          role: "Lead Category Manager / Product Owner",
          company: "Utinet (Маркетплейс)",
          period: "2011 – 2013",
          description: [
            "Разработал и внедрил более 100 категорий компьютерной техники с детальными спецификациями (100k+ товаров).",
            "Внедрил метрики поиска на основе технических характеристик, что увеличило конверсию в 2-3 раза.",
            "Управление товарной матрицей и аналитика продаж."
          ]
        },
        {
          role: "Content Engineer",
          company: "it4profit",
          period: "Мар 2004 – Июн 2011",
          description: [
            "Техническая работа с контентом: Управление базами данных товаров и спецификациями.",
            "Автоматизация: Настройка процессов обработки и импорта данных.",
            "Переход из академии в IT-сектор."
          ]
        },
        {
          role: "Научный сотрудник / Преподаватель",
          company: "КарНЦ РАН / ПетрГУ",
          period: "1998 – 2003",
          description: [
            "Преподавание матанализа, научные исследования в области теории вероятностей и случайных процессов.",
            "Написание научных статей и работа с абстрактными моделями."
          ]
        },
      ]
    },
    skills: {
      title: "Навыки и технологии",
      stack: [
        "Python (Pandas, NumPy, Scikit-learn)",
        "Google BigQuery / SQL",
        "ClickHouse / Redshift", 
        "Looker Studio / DataLens",
        "ETL / Web Scraping (BeautifulSoup)",
        "Statistical Modelling",
        "Team Leadership"
      ]
    },
    languages: {
      title: "Владение языками",
      items: [
        { language: "Русский", level: "Родной" },
        { language: "English", level: "Fluent (Свободный)" },
        { language: "Deutsch", level: "B1/B2 (TU Graz)" }, // Важно для Австрии!
      ]
    },
    certs: {
      title: "Сертификаты и курсы",
      items: [
        { title: "Google Cloud Data Engineering Specialization", issuer: "Coursera / Google Cloud", year: "2023" },
        { title: "Building Batch Data Pipelines on Google Cloud", issuer: "Coursera", year: "2023" },
        { title: "Analyzing and Visualizing Data in Looker", issuer: "Coursera / Google Cloud", year: "2023" },
        { title: "Data Scientist with Python", issuer: "DataCamp", year: "2023" },
        { title: "Data Analyst", issuer: "DataCamp", year: "2023" },
        { title: "Introduction to Tableau", issuer: "DataCamp", year: "2022" }
      ]
    }
  },
  // В src/data/content.ts внутри объекта content:

  bookPage: {
    title: "Архетипы математики",
    subtitle: "Монография",
    description: "В книге на примере изучения логики, теории множеств, алгебры, геометрии, анализа и теории графов рассматриваются общие характерные приемы и методы конструирования математических объектов — так называемые архетипы. Материал представлен как на наивном, так и на строгом уровне. Особое внимание уделено аксиоме выбора, теореме Гудстейна и Великой Теореме Ферма для n=3, 4.",
    downloadButton: "Скачать книгу (PDF)",
    back: "Вернуться на главную",
    ui: {
      tabDescription: "Описание",
      tabSections: "Разделы"
    },
    stats: {
      pages: "612 страниц",
      images: "83 схемы",
      sources: "126 источников",
      archetypes: "34 архетипа"
    },
    chapters: [
      {
        id: "1",
        title: "Глава 1. Множества и мультимножества",
        description: "Речь идет о формальном языке математики – теории множеств. Сначала мы оперируем «наивным» понятием множества, вводим грамматику языка, затем подробно рассматриваем аксиоматику теории множеств (ZFC).",
        sections: [
          "1. Наследственно-конечные множества",
          "2. Аксиоматика Цермело-Френкеля",
          "3. Основные инструменты",
          "4. Универсумы и мультимножества"
        ],
        icon: "/emptyset.png"
      },
      {
        id: "2",
        title: "Глава 2. Числа",
        description: "Глава посвящена «линейным» числам, т. е. числам, упорядоченным отношением линейного порядка. Начиная от натуральных чисел и ординалов, мы продвигаемся через рациональные и действительные к сюрреальным числам.",
        sections: [
          "1. Арифметика порядковых чисел",
          "2. Кардинальная арифметика",
          "3. Немного теории чисел",
          "4. Числовые структуры"
        ],
        icon: "/Aleph.png"
      },
      {
        id: "3",
        title: "Глава 3. Дальнейшие обобщения чисел",
        description: "Рассматриваем ряд алгебраических конструкций и на их основе изучаем некоторые числовые структуры, которые на первый взгляд трудно отнести к числам (например, многочлены и матрицы).",
        sections: [
          "1. Окно в общую алгебру",
          "2. Матричное представление чисел",
          "3. Гауссовы целые числа",
          "4. Целые числа Эйзенштейна",
          "5. Линейные пространства и операторы",
          "6. Экскурс в геометрию",
          "7. Многочлены",
          "8. Группы: завершающий аккорд",
          "9. Числовые архетипы"
        ],
        icon: "/Zi.png"
      },
      {
        id: "4",
        title: "Глава 4. Матлогика. Исчисления I",
        description: "Посвящена основаниям математики и связанным с ними исчислениям. По сути, все это — набор методов работы с числами и их символикой, набор алгоритмов и задач, посвященных проблемам разрешимости.",
        sections: [
          "1. Исчисления высказываний и предикатов",
          "2. Аксиома выбора: полезная и странная",
          "3. Вычислимость и доказуемость"
        ],
        icon: "ModusPonens.png"
      },
      {
        id: "5",
        title: "Глава 5. Анализ. Исчисления II",
        description: "Пространства и отображения. Преобразования пространств. Конечные разности и вариации. Вероятности. Несколько слов об общей картине.",
        sections: [
          "1. Пространства и отображения",
          "2. Преобразования пространств",
          "3. Конечные разности и вариации",
          "4. Вероятности",
          "5. Несколько слов об общей картине"
        ],
        icon: "Integral.png"
      },
      {
        id: "6",
        title: "Глава 6. Графы",
        description: "Подходы к определению. Обычные графы. Вероятности на графах (Случайные графы).",
        sections: [
          "1. Подходы к определению",
          "2. Обычные графы",
          "3. Вероятности на графах"
        ],
        icon: "Graph.png"
      }
    ]
  }
};
