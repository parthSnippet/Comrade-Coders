export interface IndustryUseCase {
  title: string;
  desc: string;
}

export interface Industry {
  id: number;
  title: string;
  slug: string;
  tagline: string | null;
  short_description: string;
  description: string;
  challenges: string[];
  solutions: string[];
  use_cases: IndustryUseCase[];
  image: string | null;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}