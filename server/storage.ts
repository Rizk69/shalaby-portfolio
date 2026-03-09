import { db } from "./db";
import {
  personalInfo,
  experiences,
  education,
  projects,
  skills,
  type PersonalInfo,
  type Experience,
  type Education,
  type Project,
  type Skill,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPersonalInfo(): Promise<PersonalInfo | null>;
  getExperiences(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  
  // Seed methods
  createPersonalInfo(info: Omit<PersonalInfo, "id">): Promise<PersonalInfo>;
  createExperience(exp: Omit<Experience, "id">): Promise<Experience>;
  createEducation(edu: Omit<Education, "id">): Promise<Education>;
  createProject(proj: Omit<Project, "id">): Promise<Project>;
  createSkill(skill: Omit<Skill, "id">): Promise<Skill>;
}

export class DatabaseStorage implements IStorage {
  async getPersonalInfo(): Promise<PersonalInfo | null> {
    const results = await db.select().from(personalInfo);
    return results[0] || null;
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences);
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createPersonalInfo(info: Omit<PersonalInfo, "id">): Promise<PersonalInfo> {
    const [result] = await db.insert(personalInfo).values(info).returning();
    return result;
  }

  async createExperience(exp: Omit<Experience, "id">): Promise<Experience> {
    const [result] = await db.insert(experiences).values(exp).returning();
    return result;
  }

  async createEducation(edu: Omit<Education, "id">): Promise<Education> {
    const [result] = await db.insert(education).values(edu).returning();
    return result;
  }

  async createProject(proj: Omit<Project, "id">): Promise<Project> {
    const [result] = await db.insert(projects).values(proj).returning();
    return result;
  }

  async createSkill(skill: Omit<Skill, "id">): Promise<Skill> {
    const [result] = await db.insert(skills).values(skill).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
