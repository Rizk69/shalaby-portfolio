import { useQuery } from "@tanstack/react-query";

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const res = await fetch("/portfolio-data.json");
      if (!res.ok) throw new Error("Failed to fetch portfolio data");
      const data = await res.json();
      return {
        personalInfo: data.personalInfo[0] ?? null,
        experiences: data.experiences ?? [],
        education: data.education ?? [],
        projects: data.projects ?? [],
        skills: data.skills ?? [],
      };
    },
  });
}
