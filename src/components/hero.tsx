import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  Cpu,
  Database,
  Globe2,
  Layers,
  Server,
  Smartphone,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import VantaBackground from "./vantabackground";

const techStack = [
  { icon: Code2, label: "React" },
  { icon: Server, label: "Node.js" },
  { icon: Database, label: "PostgreSQL" },
  { icon: Globe2, label: "Next.js" },
  { icon: Smartphone, label: "React Native" },
  { icon: Zap, label: "TypeScript" },
  { icon: Layers, label: "Docker" },
  { icon: Bot, label: "OpenAI" },
  { icon: Workflow, label: "n8n" },
  { icon: Cpu, label: "Python" },
  { icon: Server, label: "AWS" },
  { icon: Database, label: "MongoDB" },
];

const floatingCards = [
  { icon: Code2, label: "Software", pos: "left-[3%] top-[22%]", delay: "0s" },
  { icon: Globe2, label: "Web", pos: "right-[2%] top-[18%]", delay: "0.8s" },
  { icon: Workflow, label: "Automation", pos: "bottom-[18%] left-[3%]", delay: "1.4s" },
  { icon: Bot, label: "AI", pos: "bottom-[13%] right-[5%]", delay: "0.4s" },
];

function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent dark:from-[#05070b]" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent dark:from-[#05070b]" />
      <div className="flex w-max animate-marquee gap-3">
        {[...techStack, ...techStack].map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-black/[0.08] bg-black/[0.03] px-4 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.04]"
            >
              <Icon size={15} strokeWidth={1.8} className="text-[#2f8fe6] dark:text-[#58adff]" />
              <span className="text-[13px] font-medium text-black/65 dark:text-white/65">
                {tech.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-white pt-20 text-[#05070b] dark:bg-[#05070b] dark:text-white"
    >
      {/* Background Glow — static, no animation */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[18%] h-[360px] w-[360px] rounded-full bg-[#328fe8]/6 blur-[80px] dark:bg-[#328fe8]/10" />
        <div className="absolute right-[5%] top-[25%] h-[400px] w-[400px] rounded-full bg-[#58adff]/5 blur-[90px] dark:bg-[#58adff]/8" />
        <div className="absolute bottom-[-10%] left-1/2 h-[280px] w-[560px] -translate-x-1/2 rounded-full bg-[#328fe8]/5 blur-[80px] dark:bg-[#328fe8]/8" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Main Content */}
      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1280px] items-center px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">

          {/* LEFT — CSS fade-in */}
          <div className="animate-fadein">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-black/[0.04] px-3.5 py-2 text-xs font-medium text-black/60 dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-white/70">
              <Sparkles size={14} className="text-[#58adff]" />
              Technology. Strategy. Execution.
            </div>

            {/* Heading */}
            <h1 className="font-['Montserrat'] text-[clamp(2.6rem,5vw,5rem)] font-bold leading-[1.1] tracking-[-0.04em]">
              Technology That
              <br />
              <span className="inline-block bg-gradient-to-r from-[#05070b] via-[#1a6fc4] to-[#2f8fe6] bg-clip-text pr-1 text-transparent dark:from-white dark:via-white dark:to-[#58adff]">
                Moves Business
              </span>
              <br />
              Forward.
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-[520px] text-base leading-7 text-black/55 sm:text-[17px] sm:leading-8 dark:text-white/55">
              We turn complex business challenges into simple, scalable
              digital solutions through software, automation, AI and modern
              IT solutions.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#58adff] to-[#328fe8] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(50,143,232,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(50,143,232,0.40)]"
              >
                Start a Project
                <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#services"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-black/[0.12] bg-black/[0.04] px-6 text-sm font-semibold text-black/70 transition-all duration-300 hover:border-black/[0.20] hover:bg-black/[0.08] hover:text-black dark:border-white/[0.14] dark:bg-white/[0.035] dark:text-white/80 dark:hover:border-white/[0.25] dark:hover:bg-white/[0.07] dark:hover:text-white"
              >
                Explore Solutions
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* RIGHT VISUAL — CSS fade-in */}
          <div className="relative mx-auto w-full max-w-[500px] animate-fadein-right">
            {/* Static glow behind */}
            <div className="absolute inset-10 rounded-full bg-[#328fe8]/10 blur-[70px]" />

            <div className="relative aspect-square overflow-hidden rounded-[2rem]">
              <VantaBackground />

              {/* Center — static, no animation */}
              <div className="absolute left-1/2 top-1/2 z-20 flex h-[148px] w-[148px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#58adff]/25 bg-[#0b1622]/90 shadow-[0_0_40px_rgba(88,173,255,0.18)] sm:h-[172px] sm:w-[172px]">
                <div className="flex flex-col items-center">
                  <Cpu size={36} strokeWidth={1.3} className="text-[#58adff]" />
                  <span className="mt-2.5 font-['Montserrat'] text-[13px] font-semibold tracking-wide text-white">
                    COMERADE
                  </span>
                  <span className="mt-1 text-[8px] uppercase tracking-[0.3em] text-white/35">
                    Coders
                  </span>
                </div>
              </div>

              {/* Floating Cards — pure CSS float animation */}
              {floatingCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`absolute z-20 ${item.pos} animate-float flex items-center gap-3 rounded-2xl border border-black/[0.08] bg-white/90 px-4 py-3 shadow-[0_6px_20px_rgba(0,0,0,0.08)] dark:border-white/[0.10] dark:bg-[#0d1520]/90 dark:shadow-[0_6px_20px_rgba(0,0,0,0.30)]`}
                    style={{ animationDelay: item.delay }}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#58adff]/15 bg-[#58adff]/10">
                      <Icon size={16} strokeWidth={1.7} className="text-[#58adff]" />
                    </div>
                    <span className="text-xs font-medium text-black/70 dark:text-white/75">
                      {item.label}
                    </span>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-white to-transparent dark:from-[#05070b]" />

      {/* Tech Marquee */}
      <div className="relative z-10 pb-12 pt-2">
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-black/30 dark:text-white/25">
          Technologies We Work With
        </p>
        <TechMarquee />
      </div>
    </section>
  );
}

export default Hero;
