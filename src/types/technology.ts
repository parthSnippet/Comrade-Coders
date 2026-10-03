export interface Technology {
  id: number;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  icon: string | null;
  image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}