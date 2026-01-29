import { SiteContent } from '../types';

export const content: SiteContent = {
  personal: {
    name: "Nikolai Kazimirov",
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
      books: "Books",
      lectures: "Selected Lectures",
      about: "About Me",
      interests: "Research Interests",
      contacts: "Contact",
      location: "Location"
    },
    buttons: {
      details: "Details",
      watchAll: "Watch all lectures on YouTube"
    },
    footer: {
      rights: "All rights reserved."
    }
  },
  navigation: [
    { label: "Services", href: "#services" },
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
      coverImage: "/springer.png",
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
      { label: "Email", href: "mailto:ngoogstein@gmail.com" }
    ],
    location: "Moscow, Russia"
  }
};
