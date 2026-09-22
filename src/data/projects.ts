import projectOneImage from "../assets/project1.png";

export type Project = {
  title: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Project One",
    category: "Web platform",
    description:
      "A high-performance digital platform designed around a clear user journey and a scalable business workflow.",
    stack: ["React", "Node.js", "PostgreSQL"],
    image: projectOneImage,
    accent: "from-cyan-400 via-blue-500 to-slate-950",
  },
  {
    title: "Project Two",
    category: "Automation system",
    description:
      "A connected automation experience that removes repetitive work and gives teams a faster way to move.",
    stack: ["Next.js", "Python", "AWS"],
    image: "",
    accent: "from-fuchsia-400 via-violet-500 to-slate-950",
  },
  {
    title: "Project Three",
    category: "Business software",
    description:
      "A focused operational system that turns complex data into clear, actionable decisions for growing teams.",
    stack: ["TypeScript", "MongoDB", "Docker"],
    image: "",
    accent: "from-amber-300 via-orange-500 to-slate-950",
  },
];
