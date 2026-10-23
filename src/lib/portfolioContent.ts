import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

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

const defaultProfile: ProfileData = {
  name: "Moise Diangelo Katemba",
  title: "",
  bio: "",
  location: "Kinshasa, Democratic Republic of the Congo",
  email: "",
  phone: "",
  website: "moise.katembaticfff.com",
};

const defaultBiography: StoryData = {
  headline: "",
  introduction: "",
  journey: "",
  mission: "",
  vision: "",
  values: "",
};

async function readDocument(
  collection: string,
  documentId = "main"
): Promise<Record<string, unknown>> {
  try {
    const snapshot = await getDoc(doc(db, collection, documentId));

    if (!snapshot.exists()) {
      return {};
    }

    return snapshot.data() as Record<string, unknown>;
  } catch (error) {
    console.error(`Failed to load ${collection}/${documentId}:`, error);
    return {};
  }
}

export async function getProfile(): Promise<ProfileData> {
  const data = await readDocument("profile");

  return {
    ...defaultProfile,
    ...data,
  } as ProfileData;
}

export async function getBiography(): Promise<StoryData> {
  const data = await readDocument("biography");

  return {
    ...defaultBiography,
    ...data,
  } as StoryData;
}

export async function getCareer(): Promise<CareerEntry[]> {
  const data = await readDocument("career");

  return Array.isArray(data.entries)
    ? (data.entries as CareerEntry[])
    : [];
}

export async function getEducation(): Promise<EducationEntry[]> {
  const data = await readDocument("education");

  return Array.isArray(data.entries)
    ? (data.entries as EducationEntry[])
    : [];
}

export async function getProjects(): Promise<Project[]> {
  const data = await readDocument("projects");

  return Array.isArray(data.entries)
    ? (data.entries as Project[])
    : [];
}

export async function getSkills(): Promise<Skill[]> {
  const data = await readDocument("skills");

  return Array.isArray(data.entries)
    ? (data.entries as Skill[])
    : [];
}

export async function getMedia(): Promise<MediaItem[]> {
  const data = await readDocument("media");

  return Array.isArray(data.items)
    ? (data.items as MediaItem[])
    : [];
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const [
    profile,
    biography,
    career,
    education,
    projects,
    skills,
    media,
  ] = await Promise.all([
    getProfile(),
    getBiography(),
    getCareer(),
    getEducation(),
    getProjects(),
    getSkills(),
    getMedia(),
  ]);

  return {
    profile,
    biography,
    career,
    education,
    projects,
    skills,
    media,
  };
}
