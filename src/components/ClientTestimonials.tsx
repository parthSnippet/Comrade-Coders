import { ArrowUpRight, ImagePlus } from "lucide-react";
import projectOneImage from "../assets/project1.png";

const projects = [
  {
    title: "Project One",
    category: "Web platform",
    description: "A high-performance digital platform designed around a clear user journey and a scalable business workflow.",
    stack: ["React", "Node.js", "PostgreSQL"],
    image: projectOneImage,
    accent: "from-cyan-400 via-blue-500 to-slate-950",
  },
  {
    title: "Project Two",
    category: "Automation system",
    description: "A connected automation experience that removes repetitive work and gives teams a faster way to move.",
    stack: ["Next.js", "Python", "AWS"],
    image: "",
    accent: "from-fuchsia-400 via-violet-500 to-slate-950",
  },
  {
    title: "Project Three",
    category: "Business software",
    description: "A focused operational system that turns complex data into clear, actionable decisions for growing teams.",
    stack: ["TypeScript", "MongoDB", "Docker"],
    image: "",
    accent: "from-amber-300 via-orange-500 to-slate-950",
  },
];

export default function ClientTestimonials() {
  return (
    <section id="projects" className="relative overflow-hidden bg-[#070a0f] py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(56,189,248,0.12),transparent_25%),radial-gradient(circle_at_90%_80%,rgba(59,130,246,0.10),transparent_28%)]" />
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">Selected projects</p>
            <h2 className="max-w-[700px] text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
              Work with a point of view.
            </h2>
          </div>
          <p className="max-w-[280px] text-sm leading-6 text-white/50">
            A few digital products and systems built with ambitious teams.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.055] shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/35 hover:shadow-[0_28px_80px_rgba(14,165,233,0.14)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#101a27]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${project.accent}`}>
                    <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:28px_28px]" />
                    <div className="relative flex items-center gap-4 text-white/75">
                      <span className="font-mono text-7xl font-bold tracking-[-0.12em]">0{index + 1}</span>
                      <div className="h-14 w-px bg-white/35" />
                      <div>
                        <ImagePlus size={22} strokeWidth={1.4} />
                        <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.16em]">Project preview</span>
                      </div>
                    </div>
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm">
                  0{index + 1}
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">{project.category}</p>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{project.title}</h3>
                  <button type="button" aria-label={`View ${project.title}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-[#06101a] transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/50">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                  {project.stack.map((technology) => (
                    <span key={technology} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60">{technology}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
