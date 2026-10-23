export type ProfileData = {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
};

export type StoryData = {
  headline: string;
  introduction: string;
  journey: string;
  mission: string;
  vision: string;
  values: string;
};

export type CareerEntry = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string;
};

export type EducationEntry = {
  id: string;
  institution: string;
  program: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  technologies: string;
  startDate: string;
  endDate: string;
  status: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  imageUrl: string;
  story: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
  description: string;
};

export type MediaItem = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  caption: string;
  altText: string;
  featured: boolean;
  order: number;
};

export type PortfolioContent = {
  profile: ProfileData;
  biography: StoryData;
  career: CareerEntry[];
  education: EducationEntry[];
  projects: Project[];
  skills: Skill[];
  media: MediaItem[];
};

export type SectionKey = keyof PortfolioContent | "settings";
export type SettingsData = {
  heroTitle: string;
  heroAccent: string;
  philosophy: string;
  seoDescription: string;
  portrait: string;
  defaultLanguage: string;
};
