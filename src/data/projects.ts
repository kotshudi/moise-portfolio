import { copy, type Bilingual } from "../content";
export type Project = {
  id: string;
  title: string;
  category: Bilingual;
  status: Bilingual;
  description: Bilingual;
  details: Bilingual;
  features: Bilingual[];
};
export const projects: Project[] = [
  {
    id: "kbb",
    title: "Katembatic Business Boost",
    category: copy("BUSINESS & WEB", "ENTREPRISE & WEB"),
    status: copy("In development", "En développement"),
    description: copy(
      "Practical websites and digital services for small businesses ready to reach their next customers.",
      "Des sites web et services numériques pour aider les petites entreprises à trouver leurs prochains clients.",
    ),
    details: copy(
      "KBB brings together my interests in business and web development. I build reusable website foundations, then adapt the content and experience to the needs of each business.",
      "KBB réunit mes intérêts pour les affaires et le développement web. Je crée des bases de sites réutilisables, puis j’adapte le contenu et l’expérience aux besoins de chaque entreprise.",
    ),
    features: [
      copy("Business websites and redesigns", "Sites d’entreprise et refontes"),
      copy("React and TypeScript interfaces", "Interfaces React et TypeScript"),
      copy(
        "Python reporting and automation",
        "Rapports et automatisation avec Python",
      ),
    ],
  },
  {
    id: "openpath",
    title: "OpenPath",
    category: copy("EDUCATION", "ÉDUCATION"),
    status: copy(
      "Teaching programme & platform",
      "Programme d’enseignement et plateforme",
    ),
    description: copy(
      "English learning that connects structured lessons with real conversations and practical confidence.",
      "Un apprentissage de l’anglais qui relie des leçons structurées à de vraies conversations et à la confiance en soi.",
    ),
    details: copy(
      "OpenPath grows out of my work as an English teacher and tutor. Alongside the teaching programme, I am developing enrollment and learning tools for students, teachers and parents.",
      "OpenPath est né de mon travail d’enseignant et de tuteur d’anglais. En parallèle du programme, je développe des outils d’inscription et d’apprentissage pour les élèves, les enseignants et les parents.",
    ),
    features: [
      copy("Progressive English lessons", "Leçons d’anglais progressives"),
      copy(
        "Enrollment and learner records",
        "Inscriptions et dossiers des apprenants",
      ),
      copy(
        "Teacher, learner and parent experiences",
        "Espaces enseignants, apprenants et parents",
      ),
    ],
  },
  {
    id: "ksf",
    title: "Katemba Solidarity Funds",
    category: copy("FINANCE & COMMUNITY", "FINANCE & COMMUNAUTÉ"),
    status: copy("Initiative in development", "Initiative en développement"),
    description: copy(
      "A community savings and lending initiative built around solidarity, clear records and shared responsibility.",
      "Une initiative communautaire d’épargne et de crédit fondée sur la solidarité, des comptes clairs et la responsabilité collective.",
    ),
    details: copy(
      "As CEO of KSF within Katembatic FFF, I work on the organisation and tools needed to manage contributions, member records and lending workflows. The platform is designed to record payments made outside the application.",
      "En tant que CEO de KSF au sein de Katembatic FFF, je travaille sur l’organisation et les outils de gestion des cotisations, des dossiers des membres et des prêts. La plateforme est conçue pour enregistrer les paiements effectués en dehors de l’application.",
    ),
    features: [
      copy(
        "Member and contribution records",
        "Dossiers des membres et cotisations",
      ),
      copy("Loan and repayment workflows", "Suivi des prêts et remboursements"),
      copy(
        "Staff reporting and accountability",
        "Rapports et suivi des responsabilités",
      ),
    ],
  },
  {
    id: "ksh",
    title: "Katembatic Store Hub",
    category: copy("COMMERCE", "COMMERCE"),
    status: copy("In development", "En développement"),
    description: copy(
      "An online shopping project exploring simpler product discovery and ordering.",
      "Un projet de boutique en ligne pour simplifier la découverte de produits et les commandes.",
    ),
    details: copy(
      "KSH is the commerce project in the Katembatic ecosystem. Its direction is to bring products and ordering into a straightforward digital experience.",
      "KSH est le projet commercial de l’écosystème Katembatic. Son objectif est de réunir les produits et les commandes dans une expérience numérique simple.",
    ),
    features: [
      copy("Product discovery", "Découverte de produits"),
      copy("Online store experience", "Expérience de boutique en ligne"),
    ],
  },
  {
    id: "ktrack",
    title: "K-Track",
    category: copy("EDUCATION TECHNOLOGY", "TECHNOLOGIE ÉDUCATIVE"),
    status: copy("In development", "En développement"),
    description: copy(
      "A tool for organising student progress, skills and fee records in one place.",
      "Un outil pour organiser les progrès, les compétences et les frais des élèves au même endroit.",
    ),
    details: copy(
      "K-Track addresses the practical administration behind teaching. I am developing a platform to make learner progress and fee tracking easier, with reporting grounded in actual student records.",
      "K-Track répond aux besoins administratifs de l’enseignement. Je développe une plateforme pour faciliter le suivi des progrès et des frais, avec des rapports fondés sur les dossiers réels des élèves.",
    ),
    features: [
      copy("Learner progress and skills", "Progrès et compétences"),
      copy("Fee tracking", "Suivi des frais"),
      copy("Student reports", "Rapports sur les élèves"),
    ],
  },
  {
    id: "kcompass",
    title: "K-Compass",
    category: copy("PRODUCTIVITY", "PRODUCTIVITÉ"),
    status: copy("In development", "En développement"),
    description: copy(
      "A personal planning tool that turns daily priorities into visible progress.",
      "Un outil de planification qui transforme les priorités quotidiennes en progrès visibles.",
    ),
    details: copy(
      "K-Compass explores my 100-point daily planning method. The project connects activities and goals with a clearer way to review how a day was spent.",
      "K-Compass explore ma méthode de planification quotidienne sur 100 points. Le projet relie les activités et les objectifs à un bilan plus clair de chaque journée.",
    ),
    features: [
      copy(
        "Daily priorities and activities",
        "Priorités et activités quotidiennes",
      ),
      copy(
        "100-point planning method",
        "Méthode de planification sur 100 points",
      ),
      copy("Progress reviews", "Bilans des progrès"),
    ],
  },
  {
    id: "kstream",
    title: "K-Stream",
    category: copy("MOBILE DEVELOPMENT", "DÉVELOPPEMENT MOBILE"),
    status: copy("Prototype", "Prototype"),
    description: copy(
      "A mobile media app being developed with Expo and React Native.",
      "Une application mobile multimédia développée avec Expo et React Native.",
    ),
    details: copy(
      "K-Stream is my hands-on mobile development project. Its current foundation includes the home experience and work toward browsing and playing video content.",
      "K-Stream est mon projet pratique de développement mobile. Sa base actuelle comprend l’écran d’accueil et le travail sur la découverte et la lecture de vidéos.",
    ),
    features: [
      copy("Expo and React Native", "Expo et React Native"),
      copy("Media browsing and playback", "Découverte et lecture de médias"),
    ],
  },
  {
    id: "glies",
    title: "Graceland International English School",
    category: copy("CLIENT PROJECT", "PROJET CLIENT"),
    status: copy(
      "Website & admissions system",
      "Site web et système d’admission",
    ),
    description: copy(
      "A school website and admissions workflow connecting family applications with administrative review.",
      "Un site scolaire et un parcours d’admission reliant les candidatures des familles au suivi administratif.",
    ),
    details: copy(
      "This React and TypeScript project combines a public school website with a multi-step registration process, an admissions dashboard and Google Sheets reporting.",
      "Ce projet React et TypeScript associe un site scolaire public, une inscription en plusieurs étapes, un tableau de bord des admissions et des rapports Google Sheets.",
    ),
    features: [
      copy("Multi-step registration", "Inscription en plusieurs étapes"),
      copy("Admissions review dashboard", "Tableau de bord des admissions"),
      copy("Google Sheets reporting", "Rapports Google Sheets"),
    ],
  },
];
