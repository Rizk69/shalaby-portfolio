import fs from "fs/promises";
import path from "path";
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

// JSON file fallback for local development when DATABASE_URL is not set
class JsonFileStorage implements IStorage {
  private filePath: string;

  constructor() {
    this.filePath = path.resolve(process.cwd(), "server", "dev-data.json");
  }

  private async readData() {
    try {
      const raw = await fs.readFile(this.filePath, "utf8");
      return JSON.parse(raw);
    } catch (err) {
      const initial = { personalInfo: [], experiences: [], education: [], projects: [], skills: [] };
      await this.writeData(initial);
      return initial;
    }
  }

  private async writeData(data: any) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), "utf8");
  }

  private nextId(items: any[]) {
    return items.length === 0 ? 1 : Math.max(...items.map((i: any) => i.id || 0)) + 1;
  }

  async getPersonalInfo() {
    const data = await this.readData();
    return data.personalInfo[0] || null;
  }

  async getExperiences() {
    const data = await this.readData();
    return data.experiences;
  }

  async getEducation() {
    const data = await this.readData();
    return data.education;
  }

  async getProjects() {
    const data = await this.readData();
    return data.projects;
  }

  async getSkills() {
    const data = await this.readData();
    return data.skills;
  }

  async createPersonalInfo(info: Omit<PersonalInfo, "id">) {
    const data = await this.readData();
    const id = this.nextId(data.personalInfo);
    const item = { id, ...info } as PersonalInfo;
    data.personalInfo.push(item);
    await this.writeData(data);
    return item;
  }

  async createExperience(exp: Omit<Experience, "id">) {
    const data = await this.readData();
    const id = this.nextId(data.experiences);
    const item = { id, ...exp } as Experience;
    data.experiences.push(item);
    await this.writeData(data);
    return item;
  }

  async createEducation(edu: Omit<Education, "id">) {
    const data = await this.readData();
    const id = this.nextId(data.education);
    const item = { id, ...edu } as Education;
    data.education.push(item);
    await this.writeData(data);
    return item;
  }

  async createProject(proj: Omit<Project, "id">) {
    const data = await this.readData();
    const id = this.nextId(data.projects);
    const item = { id, ...proj } as Project;
    data.projects.push(item);
    await this.writeData(data);
    return item;
  }

  async createSkill(skill: Omit<Skill, "id">) {
    const data = await this.readData();
    const id = this.nextId(data.skills);
    const item = { id, ...skill } as Skill;
    data.skills.push(item);
    await this.writeData(data);
    return item;
  }
}

// Use real DB storage only when DATABASE_URL is set
let storageImpl: IStorage;
if (process.env.DATABASE_URL) {
  // lazy import to avoid requiring pg when not needed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { db } = require("./db");
  const { eq } = require("drizzle-orm");

  class DatabaseStorage implements IStorage {
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

  storageImpl = new DatabaseStorage();
} else {
  storageImpl = new JsonFileStorage();
}

export const storage = storageImpl;
