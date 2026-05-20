import { SiteContent } from '../types';

export const content: SiteContent = {
  personal: {
    name: "Nikolai I. Kazimirov",
    logoText: "N.K. ⊬ ⊥",
    degree: "Ph.D.",
    headline: "Mathematical Logic & Foundations of Mathematics",
    tagline: "Scientific expertise, fundamental logic, and rigorous mathematical models.",
    email: "ngoogstein@gmail.com"
  },
  // ENGLISH UI LABELS
  ui: {
    headers: {
      services: "Services",
      projects: "Digital Projects",
      books: "Books",
      lectures: "Selected Lectures",
      materials: "Materials",
      about: "About Me",
      interests: "Research Interests",
      contacts: "Contact",
      location: "Location"
    },
    buttons: {
      details: "Details",
      watchAll: "Watch all lectures on YouTube",
      viewProject: "Launch Project"
    },
    footer: {
      rights: "All rights reserved."
    }
  },
  navigation: [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Books", href: "#books" },
    { label: "Lectures", href: "#lectures" },
    { label: "About", href: "#about" },
  ],
  services: [
    {
      id: "consulting",
      title: "Scientific Consulting",
      targetAudience: "IT Specialists, Analysts, R&D",
      description: "Expertise in mathematical models and detection of logical errors in complex system architectures.",
      details: [
        "Analysis of formal problem statements",
        "Assistance with scientific papers (Paper review)",
        "Consulting on Logic and Model Theory",
        "Bridging gaps in fundamental background"
      ],
      cta: "Discuss a Project",
      iconName: "Brain"
    },
    {
      id: "school",
      title: "Personal Mentorship",
      targetAudience: "One-on-One Education",
      description: "Cultivating mathematical thinking. We don't coach for tests; we build a foundation for solving non-standard research problems and rigorous reasoning.",
      details: [
        "Mathematical Logic, Set Theory, Model Theory",
        "Linear Algebra, Group Theory, Probability Theory",
        "Yandex SHAD / Masters Prep (Math Track)",
        "Academic Style, LaTeX & Proof Writing"
      ],
      cta: "Discuss Goals",
      iconName: "GraduationCap"
    }
  ],
  projects: [
    {
      id: "nexus",
      title: "Nexus Math",
      description: "An interactive 3D map of mathematical foundations. Visualizing connections between axiomatic systems, theorems, and definitions.",
      link: "https://nexus.mathem.at/",
      techStack: "WebGL / 3D Graph",
      vpnRequired: true
    },
    {
      id: "arxiv",
      title: "ArXiv Universe",
      description: "Interactive 3D visualization of the scientific landscape based on arXiv.org data. Disciplines are treated as massive planets with papers orbiting as satellites.",
      link: "https://arxiv.mathem.at/",
      techStack: "Data Viz / Big Data",
      vpnRequired: true
    }
  ],
  books: [
    {
      id: "springer",
      title: "Math as a Foreign Language",
      role: "Author",
      year: "Under Review",
      description: "The architecture of mathematical thought. A treatise on mathematics as a linguistic system: from the syntax of formulas to the semantics of formal theories.",
      coverImage: "/Springer_cover.png",
      link: "https://forms.gle/KWzAHGCjdPVmkabE9",
      type: "Philosophical Monograph"
    },
    {
      id: "savvateev",
      title: "Introduction to Real Mathematics",
      role: "Co-author",
      year: "2022",
      description: "Co-authored with A.V. Savvateev. A guide based on the '100 Lessons of Mathematics' course (in Russian).",
      coverImage: "/savvateev.png",
      link: "/100_final.pdf",
      type: "Best Selling Book"
    },
    {
      id: "archetypes",
      title: "Archetypes of Mathematics",
      role: "Author",
      year: "2019",
      description: "Monograph: General methods, techniques, constructions, and ideas of mathematics and its foundations. (Moscow: Justicinform).",
      coverImage: "/archetypes.png",
      link: "/book",
      type: "Monograph"
    },
//    {
//      id: "calculus",
//      title: "Lectures on Mathematical Analysis",
//      role: "Lecturer",
//      year: "2002",
//      description: "Full university calculus course. Limits, differentiation, integration, series. Fundamental basis for Data Science (in Russian).",
//      coverImage: "/calculus-cover.png",
//      link: "/mathan.pdf",
//      type: "University Course"
//    },
    {
      id: "phd-thesis",
      title: "Galton-Watson Forests and Rabdom Permutations",
      role: "PhD Thesis",
      year: "2003",
      description: "Abstract of the dissertation for the degree of Candidate of Physical and Mathematical Sciences (in Russian).",
      coverImage: "/thesis-cover.png",
      link: "/kdar.pdf",
      type: "Dissertation Abstract"
    }
  ],
  lectures: [
    {
      id: "game",
      title: "Ehrenfeucht-Fraïssé Games",
      thumbnail: "https://img.youtube.com/vi/FN_Sw4pKmZk/maxresdefault.jpg",
      duration: "Lecture",
      platform: "YouTube",
      link: "https://youtu.be/FN_Sw4pKmZk"
    },
    {
      id: "cantor",
      title: "Cantor-Bernstein Theorem",
      thumbnail: "https://img.youtube.com/vi/2S-ofA4SRcY/maxresdefault.jpg",
      duration: "Lecture",
      platform: "YouTube",
      link: "https://youtu.be/2S-ofA4SRcY"
    },
    {
      id: "godel",
      title: "Gödel's Second Incompleteness Theorem",
      thumbnail: "https://img.youtube.com/vi/KhaYjR2sCEY/maxresdefault.jpg",
      duration: "Lecture",
      platform: "YouTube",
      link: "https://www.youtube.com/watch?v=KhaYjR2sCEY"
    }
  ],
  about: {
    // Упрощено: Ph.D. in Mathematics, без кодов ВАК
    bio: "Ph.D. in Mathematics. Graduated from the Faculty of Mathematics at PetrSU and postgraduate studies at KarRC RAS. In 2024–2025, I lived and worked in Austria (Graz), where my experience learning German at TU Graz inspired me to write the book 'Math as a Foreign Language' (Springer, under review). I specialize in foundations of mathematics, model theory, and scientific popularization.",
    interests: [
      "Mathematical Logic",
      "Set Theory",
      "Model Theory",
      "Proof Theory",
      "Foundations of Mathematics",
      "Computer Science"
    ],
    socials: [
      { label: "Telegram", href: "https://t.me/mathreisender" },
      { label: "YouTube", href: "https://www.youtube.com/@reisedurchdiemathe" },
      { label: "Email", href: "mailto:ngoogstein@gmail.com" },
      // Добавляем новые пункты для баланса:
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nikolai-kazimirov/" },
      { label: "GitHub", href: "https://github.com/nkrishelie" }, // Если есть
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=GiQpW8MAAAAJ&hl=en" } // Если есть
    ],
    location: "Moscow, Russia"
  },
  // Добавить в конец объекта content
// В файле src/data/content-en.ts
  portfolio: {
    header: {
      title: "Nikolai Kazimirov",
      subtitle: "Data Scientist / Product Owner / Head of Content",
      back: "Back to Home",
      download: "Download CV" // <--- Убедитесь, что это поле есть!
    },
    summary: {
      title: "About Me",
      text: "Data analytics leader with 7+ years of experience designing and implementing end-to-end analytics ecosystems on Google Cloud Platform (GCP). I build scalable BI solutions, automate ETL pipelines, and drive data-informed decision-making with tools such as Looker Studio and DataLens. I hold a PhD in Mathematics with a focus on applied statistical methods and mathematical logic, and I am comfortable translating rigorous models into actionable business insights. Open to relocation and Blue Card sponsorship."
    },
    experience: {
      title: "Work Experience",
      items: [
        {
          role: "Head of Analysis and Content Department",
          company: "Softline (Digital solutions & services, 5000+ employees), Moscow",
          period: "Mar 2014 – Present",
          description: [
            "Piloted a self-hosted corporate AI platform (Open WebUI, LiteLLM, Dify, OpenRouter), replacing uncontrolled personal ChatGPT usage with a centralized solution featuring role-based access control, per-user cost tracking, and RAG integration for internal documentation.",
            "Orchestrated the implementation of a Business Intelligence (BI) solution on Google Cloud Platform (GCP), leading to a 50–70% reduction in manual ETL procedures (including web scraping).",
            "Constructed and configured 70+ dashboards in Looker Studio and DataLens to provide decision-makers with comprehensive eCommerce metrics.",
            "Designed and implemented an alert system for early detection of issues in e-commerce shopping carts.",
            "Led a cross-functional team of ~20 people (content managers and analysts), aligning their work with business goals.",
            "Enhanced the internal Price and Product Management System (MCF), automating product matching and pricing logic across showcases.",
            "Developed and deployed sales forecast dashboards for key product showcases using Python and Holt–Winters time-series models."
          ]
        },
        {
          role: "Lead Category Manager",
          company: "Utinet (Marketplace, 500+ employees), Moscow",
          period: "Jun 2011 – Nov 2013",
          description: [
            "Established and introduced over 100 categories of computer hardware with detailed specifications, contributing to a product range exceeding 100,000 items.",
            "Designed and implemented hundreds of search metrics based on technical characteristics, significantly improving search relevance and boosting conversion by 2–3x."
          ]
        },
        {
          role: "Content Engineer",
          company: "it4profit",
          period: "Mar 2004 – Jun 2011",
          description: [
            "Content Management: Managed product databases and technical specifications.",
            "Automation: Set up data processing and import workflows.",
            "Transitioned from academic research to the IT sector."
          ]
        }
      ]
    },
    skills: {
      title: "Skills & Tech Stack",
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
    // --- ВОТ ЭТОЙ СЕКЦИИ СКОРЕЕ ВСЕГО НЕ ХВАТАЛО ---
    languages: {
      title: "Languages",
      items: [
        { language: "English", level: "Fluent" },
        { language: "German", level: "B1/B2 (TU Graz)" },
        { language: "Russian", level: "Native" },
      ]
    },
    certs: {
      title: "Certifications & Courses",
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
  // В src/data/content-en.ts внутри объекта content:

  bookPage: {
    title: "Archetypes of Mathematics",
    subtitle: "Monograph",
    description: "Using examples from logic, set theory, algebra, geometry, analysis, and graph theory, the book explores common characteristic techniques and methods for constructing mathematical objects — the so-called archetypes. The material is presented at both naive and rigorous levels. Special attention is paid to the Axiom of Choice, Goodstein's Theorem, and Fermat's Last Theorem for n=3, 4.",
    authorBio: "Nikolai I. Kazimirov is a PhD mathematician specializing in the foundations of mathematics, model theory, and applied statistical methods. He graduated from the Faculty of Mathematics at PetrSU and completed his PhD at the Institute of Applied Mathematical Research of the Karelian Research Centre of the Russian Academy of Sciences. In addition to academic work, he builds data analytics ecosystems on Google Cloud Platform and popularizes mathematics through books and lectures.",
    mentorship: {
      title: "Personal Mentorship",
      text: "I work individually with those who want to understand mathematics more deeply — not as a set of formulas, but as a language of thought. My students include programmers, philosophers, and researchers from adjacent fields."
    },
    downloadButton: "Download Book (PDF)",
    back: "Back to Home",
    ui: {
      tabDescription: "Description",
      tabSections: "Sections"
    },
    stats: {
      pages: "612 Pages",
      images: "83 Diagrams",
      sources: "126 Sources",
      archetypes: "34 Archetypes"
    },
    chapters: [
      {
        id: "1",
        title: "Chapter 1. Sets and Multisets",
        description: "This chapter deals with the formal language of mathematics — set theory. We start with the 'naive' concept of a set, introduce the grammar of the language, and then examine the ZFC axiomatics in detail.",
        sections: [
          "1. Hereditarily finite sets",
          "2. Zermelo-Fraenkel axiomatics",
          "3. Basic instruments",
          "4. Universes and multisets"
        ],
        icon: "/emptyset.png"
      },
      {
        id: "2",
        title: "Chapter 2. Numbers",
        description: "Dedicated to 'linear' numbers ordered by a linear relation. Starting from natural numbers and ordinals, we progress through rational and real numbers to surreal numbers.",
        sections: [
          "1. Arithmetic of ordinal numbers",
          "2. Cardinal arithmetic",
          "3. A bit of number theory",
          "4. Numerical structures"
        ],
        icon: "/Aleph.png"
      },
      {
        id: "3",
        title: "Chapter 3. Further Generalizations",
        description: "We examine algebraic constructions and study numerical structures that might not look like numbers at first glance (e.g., polynomials, matrices, complex numbers).",
        sections: [
          "1. A window into general algebra",
          "2. Matrix representation of numbers",
          "3. Gaussian integers",
          "4. Eisenstein integers",
          "5. Linear spaces and operators",
          "6. Excursion into geometry",
          "7. Polynomials",
          "8. Groups: The final chord",
          "9. Numerical archetypes"
        ],
        icon: "/Zi.png"
      },
      {
        id: "4",
        title: "Chapter 4. Math Logic. Calculus I",
        description: "Dedicated to the foundations of mathematics. Essentially, a set of methods for working with numbers and symbolism, algorithms, and decidability problems.",
        sections: [
          "1. Propositional and predicate calculi",
          "2. Axiom of Choice: useful and strange",
          "3. Computability and provability"
        ],
        icon: "/ModusPonens.png"
      },
      {
        id: "5",
        title: "Chapter 5. Analysis. Calculus II",
        description: "Spaces and mappings. Transformations of spaces. Finite differences and variations. Probability. A few words on the big picture.",
        sections: [
          "1. Spaces and mappings",
          "2. Transformations of spaces",
          "3. Finite differences and variations",
          "4. Probability",
          "5. A few words on the big picture"
        ],
        icon: "/Integral.png"
      },
      {
        id: "6",
        title: "Chapter 6. Graphs",
        description: "Approaches to definition. Regular graphs. Probabilities on graphs (Random Graphs).",
        sections: [
          "1. Approaches to definition",
          "2. Regular graphs",
          "3. Probabilities on graphs"
        ],
        icon: "/Graph.png"
      }
    ]
  },
  materials: {
    sectionTitle: "Conceptual working notes",
    sectionIntro:
      "Texts and quizzes on foundations and nearby topics—the notes open on their own pages; quiz links use Google Forms.",
    menuOverview: "Jump to section",
    linkOpensNewTabHint: "Opens in a new tab",
    practiceTestsHeading: "Quizzes (Google Forms)",
    practiceTests: [
      {
        title: "Foundations of Mathematics, Part 1",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfeSoL7Zm0Z6wDoyqMAIundY0SsmOrz8HXin74AWFpnjjF4lA/viewform?usp=dialog",
      },
      {
        title: "Foundations of Mathematics, Part 2",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSeBjYS3UzkJ_D8oXrf6AMFAkUanAlM5jmrClWYze1MnMrZGSg/viewform?usp=dialog",
      },
    ],
  },
};
