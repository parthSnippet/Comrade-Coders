export interface ServiceUseCase {
  title: string;
  desc: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  tagline: string | null;
  short_description: string;
  description: string;
  highlights: string[];
  deliverables: string[];
  use_cases: ServiceUseCase[];
  image: string | null;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}