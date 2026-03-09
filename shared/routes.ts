import { z } from 'zod';
import { 
  personalInfo,
  experiences,
  education,
  projects,
  skills
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  portfolio: {
    get: {
      method: 'GET' as const,
      path: '/api/portfolio' as const,
      responses: {
        200: z.object({
          personalInfo: z.custom<typeof personalInfo.$inferSelect>().nullable(),
          experiences: z.array(z.custom<typeof experiences.$inferSelect>()),
          education: z.array(z.custom<typeof education.$inferSelect>()),
          projects: z.array(z.custom<typeof projects.$inferSelect>()),
          skills: z.array(z.custom<typeof skills.$inferSelect>()),
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type PortfolioResponse = z.infer<typeof api.portfolio.get.responses[200]>;
