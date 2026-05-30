import { readFile } from "node:fs/promises";
import path from "node:path";
import type { PortfolioData, Project } from "@/types/portfolio";
import { fetchAppStoreMeta } from "@/lib/app-store";

export interface HeroShowcaseItem {
  appName: string;
  category: string;
  rating: number | null;
  icon: string | null;
  screenshot: string;
}

export async function getPortfolioData() {
  const file = await readFile(
    path.join(process.cwd(), "public", "portfolio-data.json"),
    "utf-8"
  );
  const data = JSON.parse(file) as PortfolioData;

  const projects: Project[] = await Promise.all(
    (data.projects ?? []).map(async (project) => {
      if (!project.storeLink) return project;
      const meta = await fetchAppStoreMeta(project.storeLink);
      if (!meta) return project;
      return {
        ...project,
        appStore: {
          icon: meta.icon,
          rating: meta.rating,
          ratingCount: meta.ratingCount,
          screenshots: meta.screenshots,
          sellerName: meta.sellerName,
          version: meta.version,
          url: meta.url,
        },
      };
    })
  );

  // Build a flat list of hero showcase items (one screenshot per app, up to 2 per app)
  const heroShowcase: HeroShowcaseItem[] = [];
  for (const p of projects) {
    if (!p.appStore?.screenshots?.length) continue;
    const shots = p.appStore.screenshots.slice(0, 2);
    for (const screenshot of shots) {
      heroShowcase.push({
        appName: p.name,
        category: p.category,
        rating: p.appStore.rating,
        icon: p.appStore.icon,
        screenshot,
      });
    }
  }

  return {
    personalInfo: data.personalInfo[0] ?? null,
    experiences: data.experiences ?? [],
    education: data.education ?? [],
    projects,
    skills: data.skills ?? [],
    heroShowcase,
  };
}
