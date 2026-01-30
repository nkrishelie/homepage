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
      title: "Distance Logic School",
      targetAudience: "Individual Learners",
      description: "One-on-one mentorship. You watch lectures and solve problems; I verify your proofs and reasoning logic.",
      details: [
        "Classical university approach",
        "Written proof verification (LaTeX/Manuscript)",
        "Individual schedule (No webinars)",
        "Direct contact via Telegram/Email"
      ],
      cta: "Enroll",
      iconName: "GraduationCap"
    }
  ],
  projects: [
    {
      id: "nexus",
      title: "Nexus Math",
      description: "An interactive 3D map of mathematical foundations. Visualizing connections between axiomatic systems, theorems, and definitions.",
      link: "https://nexus.mathem.at/",
      techStack: "WebGL / 3D Graph"
    },
    {
      id: "arxiv",
      title: "ArXiv Universe",
      description: "Interactive 3D visualization of the scientific landscape based on arXiv.org data. Disciplines are treated as massive planets with papers orbiting as satellites.",
      link: "https://arxiv.mathem.at/",
      techStack: "Data Viz / Big Data"
    }
  ],
  books: [
    {
      id: "archetypes",
      title: "Archetypes of Mathematics",
      role: "Author",
      year: "2019",
      description: "Monograph: General methods, techniques, constructions, and ideas of mathematics and its foundations. (Moscow: Justicinform).",
      coverImage: "/archetypes.png",
      link: "https://tinyurl.com/3j7z25k2"
    },
    {
      id: "savvateev",
      title: "Introduction to Real Mathematics",
      role: "Co-author",
      year: "2022",
      description: "Co-authored with A.V. Savvateev. A guide based on the '100 Lessons of Mathematics' course.",
      coverImage: "/savvateev.png",
      link: "https://tinyurl.com/mr28x2t2"
    },
    {
      id: "springer",
      title: "Math as a Foreign Language",
      role: "Author",
      year: "Under Review",
      description: "In preparation. The book is dedicated to the language of mathematics and the methodology of thinking.",
      coverImage: "/MFL.png",
      link: "#"
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
      //{ label: "GitHub", href: "https://github.com/nkrishelie" }, // Если есть
      // { label: "Google Scholar", href: "..." } // Если есть
    ],
    location: "Moscow, Russia"
  },
  // Добавить в конец объекта content
  portfolio: {
    header: {
      title: "Nikolai Kazimirov",
      subtitle: "Data Scientist / Product Owner / Head of Content",
      back: "Back to Home"
    },
    summary: {
      title: "About Me",
      text: "Mathematician with a passion for uncovering data patterns. I combine rigorous hypothesis testing with modern tools like Python and BigQuery. My focus is applying Data Science and ML to solve complex problems. Open to relocation."
    },
    experience: {
      title: "Work Experience",
      items: [
        {
          role: "Head of Content & Data Analyst",
          company: "Softline",
          period: "2014 – Present",
          description: [
            "Orchestrated the implementation of a Business Intelligence (BI) solution leveraging Google Cloud Platform (GCP), reducing manual ETL procedures by 50-70%.",
            "Constructed and configured over 70 dashboards using Looker to deliver comprehensive business metric insights.",
            "Lead a team of 20 individuals (content managers, analysts), ensuring seamless collaboration.",
            "Innovated and implemented an alert system for early problem detection in shopping carts. Conducted A/B testing using Python.",
            "Enhanced Price and Product Management System (MCF), integrating and automating pricing processes."
          ]
        },
        {
          role: "Researcher / Lecturer",
          company: "KarRC RAS / PetrSU",
          period: "1998 – 2003",
          description: [
            "Teaching mathematical analysis, research in probability theory and random processes.",
            "Academic writing and abstract modeling."
          ]
        }
      ]
    },
    skills: {
      title: "Skills & Tech Stack",
      stack: [
        "Google BigQuery (Data Warehouse)",
        "SQL (Expert)",
        "Looker Studio",
        "Python (Pandas, NumPy, Scikit-learn)",
        "ETL Pipelines",
        "Statistical Analysis",
        "Team Management"
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
  }
};
