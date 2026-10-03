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
  youtube_url: string | null;
  is_active: boolean;
  parent: number | null;
  sub_services: Service[];
  meta_title: string | null;
  meta_description: string | null;
  seo_keywords: string | null;
  page_h1: string | null;
  page_h2: string | null;
  image_alt_text: string | null;
  created_at: string;
  updated_at: string;
}