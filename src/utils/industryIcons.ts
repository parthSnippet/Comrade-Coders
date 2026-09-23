import {
  BriefcaseBusiness,
  Calculator,
  Factory,
  GraduationCap,
  HeartPulse,
  Truck,
  UsersRound,
  Utensils,
  type LucideIcon,
} from "lucide-react";

const industryIcons: Record<string, LucideIcon> = {
  Factory,
  BriefcaseBusiness,
  HeartPulse,
  Utensils,
  UsersRound,
  Truck,
  GraduationCap,
  Calculator,
};

export function getIndustryIcon(
  iconName: string | null
): LucideIcon {
  if (!iconName) {
    return Factory;
  }

  return industryIcons[iconName] ?? Factory;
}