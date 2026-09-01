import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        journey: "My Story",
        career: "Career",
        education: "Education",
        projects: "Projects",
        skills: "Skills",
        contact: "Contact",
      },
      hero: {
        greeting: "Hello, I'm",
        name: "Moise Diangelo Katemba",
        title: "Educator • Entrepreneur • Developer",
        description:
          "I am an educator, entrepreneur and technology enthusiast building meaningful projects that connect education, business and technology.",
        work: "Explore My Work",
        contact: "Contact Me",
      },
      about: {
        title: "About Me",
        description:
          "I am passionate about education, entrepreneurship, technology and helping people develop their potential.",
      },
      journey: {
        title: "My Story",
        teaching: "Teaching & Education",
        missionary: "Missionary Service",
        business: "Entrepreneurship",
        technology: "Technology",
      },
      projects: {
        title: "My Projects",
        subtitle:
          "Projects I am building to create practical solutions in education, finance, business and technology.",
      },
      skills: {
        title: "Skills & Expertise",
      },
      contact: {
        title: "Let's Connect",
        description:
          "Have a project, opportunity or idea you'd like to discuss? I'd love to hear from you.",
        button: "Get In Touch",
      },
      footer: {
        rights: "All rights reserved.",
      },
      language: {
        english: "English",
        french: "Français",
      },
    },
  },

  fr: {
    translation: {
      nav: {
        home: "Accueil",
        about: "À propos",
        journey: "Mon histoire",
        career: "Carrière",
        education: "Formation",
        projects: "Projets",
        skills: "Compétences",
        contact: "Contact",
      },
      hero: {
        greeting: "Bonjour, je suis",
        name: "Moise Diangelo Katemba",
        title: "Éducateur • Entrepreneur • Développeur",
        description:
          "Je suis éducateur, entrepreneur et passionné de technologie. Je développe des projets qui rapprochent l'éducation, les affaires et la technologie.",
        work: "Découvrir mes projets",
        contact: "Me contacter",
      },
      about: {
        title: "À propos de moi",
        description:
          "Je suis passionné par l'éducation, l'entrepreneuriat, la technologie et le développement du potentiel de chacun.",
      },
      journey: {
        title: "Mon histoire",
        teaching: "Enseignement & Éducation",
        missionary: "Service missionnaire",
        business: "Entrepreneuriat",
        technology: "Technologie",
      },
      projects: {
        title: "Mes projets",
        subtitle:
          "Des projets que je développe pour créer des solutions pratiques dans l'éducation, la finance, les affaires et la technologie.",
      },
      skills: {
        title: "Compétences & Expertise",
      },
      contact: {
        title: "Restons en contact",
        description:
          "Vous avez un projet, une opportunité ou une idée à discuter ? Je serais ravi d'échanger avec vous.",
        button: "Me contacter",
      },
      footer: {
        rights: "Tous droits réservés.",
      },
      language: {
        english: "English",
        french: "Français",
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
