import {
  Bot,
  Code2,
  Cpu,
  Globe2,
  Layers,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  Globe2,
  Code2,
  Workflow,
  Bot,
  Layers,
  Cpu,
};

export function getServiceIcon(iconName: string | null): LucideIcon {
  if (!iconName) {
    return Globe2;
  }

  return serviceIcons[iconName] ?? Globe2;
}