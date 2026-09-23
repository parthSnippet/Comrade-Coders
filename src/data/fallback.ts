import { services as localServices } from "./services";
import { industries as localIndustries } from "./industries";
import type { Service } from "../types/service";
import type { Industry } from "../types/industry";

export const fallbackServices: Service[] = localServices.map((s, i) => ({
  id: i + 1,
  title: s.title,
  slug: s.slug,
  tagline: s.tagline,
  short_description: s.desc.slice(0, 160),
  description: s.desc,
  highlights: s.highlights,
  deliverables: s.deliverables,
  use_cases: s.useCases.map((u) => ({ title: u.title, desc: u.desc })),
  image: null,
  icon: s.icon.displayName ?? null,
  is_active: true,
  created_at: "",
  updated_at: "",
}));

export const fallbackIndustries: Industry[] = localIndustries.map((ind, i) => ({
  id: i + 1,
  title: ind.title,
  slug: ind.slug,
  tagline: ind.tagline,
  short_description: ind.desc.slice(0, 160),
  description: ind.desc,
  challenges: ind.challenges,
  solutions: ind.solutions,
  use_cases: ind.useCases.map((u) => ({ title: u.title, desc: u.desc })),
  image: null,
  icon: null,
  is_active: true,
  created_at: "",
  updated_at: "",
}));

export function getFallbackService(slug: string): Service | undefined {
  return fallbackServices.find((s) => s.slug === slug);
}

export function getFallbackIndustry(slug: string): Industry | undefined {
  return fallbackIndustries.find((i) => i.slug === slug);
}
