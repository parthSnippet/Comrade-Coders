export interface Project {
  id: number;
  project_number?: string;
  title: string;
  category?: string;
  slug: string;
  short_description: string;
  description: string;
  client_name: string;
  project_url: string;
  featured_image: string | null;
  services: string[];
  industries: string[];
  technologies: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}