import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, ImagePlus } from "lucide-react";
import gsap from "gsap";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const dragRef = useRef({ active: false, startX: 0, startPosition: 0 });

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const context = gsap.context(() => {
      const getLoopDistance = () => track.scrollWidth / 2;

      tweenRef.current = gsap.to(track, {
        x: () => -getLoopDistance(),
        duration: Math.max(projects.length * 5, 18),
        ease: "none",
        repeat: -1,
        paused: false,
        modifiers: {
          x: (value) => `${parseFloat(value) % getLoopDistance()}px`,
        },
      });
    }, track);

    return () => {
      tweenRef.current = null;
      context.revert();
    };
  }, []);

  const pauseSlider = () => tweenRef.current?.pause();
  const resumeSlider = () => tweenRef.current?.resume();

  const wrapPosition = (position: number) => {
    const track = trackRef.current;
    if (!track) return position;

    const loopDistance = track.scrollWidth / 2;
    return gsap.utils.wrap(-loopDistance, 0, position);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    pauseSlider();
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startPosition: Number(gsap.getProperty(track, "x")) || 0,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("cursor-grabbing");
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || !trackRef.current) return;

    const nextPosition = dragRef.current.startPosition + (event.clientX - dragRef.current.startX);
    gsap.set(trackRef.current, { x: wrapPosition(nextPosition) });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.classList.remove("cursor-grabbing");
    resumeSlider();
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-[#f7f9fc] py-24 text-[#05070b] dark:bg-[#070a0f] dark:text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(56,189,248,0.12),transparent_25%),radial-gradient(circle_at_90%_80%,rgba(59,130,246,0.10),transparent_28%)] dark:opacity-100 opacity-40" />
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2f8fe6] dark:text-cyan-300">Selected projects</p>
            <h2 className="max-w-[700px] text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
              Work with a point of view.
            </h2>
          </div>
          <p className="max-w-[280px] text-sm leading-6 text-black/50 dark:text-white/50">
            A few digital products and systems built with ambitious teams.
          </p>
        </div>

        <div
          className="relative cursor-grab select-none overflow-hidden touch-pan-y"
          onMouseEnter={pauseSlider}
          onMouseLeave={resumeSlider}
          onFocus={pauseSlider}
          onBlur={resumeSlider}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div ref={trackRef} className="flex w-max gap-5 py-3 will-change-transform">
          {[...projects, ...projects].map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              aria-hidden={index >= projects.length}
              className="group w-[min(82vw,390px)] shrink-0 overflow-hidden rounded-[1.35rem] border border-black/[0.08] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#58adff]/50 hover:shadow-[0_28px_80px_rgba(14,165,233,0.14)] dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#eaf3fb] dark:bg-[#101a27]">
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
                  0{(index % projects.length) + 1}
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2f8fe6] dark:text-cyan-300">{project.category}</p>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#05070b] dark:text-white">{project.title}</h3>
                  <button type="button" aria-label={`View ${project.title}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2f8fe6] text-white transition-transform duration-300 group-hover:rotate-45 dark:bg-cyan-300 dark:text-[#06101a]">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-black/50 dark:text-white/50">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2 border-t border-black/[0.08] pt-5 dark:border-white/10">
                  {project.stack.map((technology) => (
                    <span key={technology} className="rounded-full border border-black/[0.08] bg-black/[0.02] px-2.5 py-1 text-[11px] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60">{technology}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
