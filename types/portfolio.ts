export interface PersonalInfo {
  id: number;
  name: string;
  role: string;
  tagline: string;
  objective: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string | null;
  github: string | null;
  resumeUrl?: string | null;
  languages: Language[] | null;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Experience {
  id: number;
  company: string;
  location: string | null;
  role: string;
  period: string;
  type?: string;
  achievements: string[] | null;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  period: string;
  detail?: string | null;
}

export interface Project {
  id: number;
  name: string;
  tagline?: string;
  category: string;
  description: string;
  githubLink: string | null;
  storeLink: string | null;
  technologies: string[] | null;
  highlights?: string[] | null;
  appStore?: AppStoreInfo | null;
}

export interface AppStoreInfo {
  icon: string | null;
  rating: number | null;
  ratingCount: number | null;
  screenshots: string[];
  sellerName: string | null;
  version: string | null;
  url: string;
}

export interface Skill {
  id: number;
  category: string;
  icon: string;
  items: string[] | null;
}

export interface PortfolioData {
  personalInfo: PersonalInfo[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
}
