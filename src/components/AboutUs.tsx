import { ArrowUpRight, CheckCircle2, Target, Users, Zap } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Tech Experts" },
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    desc: "Every line of code we write is tied to a business outcome. We don't build for the sake of building.",
  },
  {
    icon: Users,
    title: "People First",
    desc: "We invest in long-term relationships — with our clients, our team, and the communities we serve.",
  },
  {
    icon: Zap,
    title: "Execution Focused",
    desc: "Ideas are cheap. We're obsessed with shipping — fast, clean, and production-ready.",
  },
];

const pillars = [
  "Transparent communication at every stage",
  "Agile delivery with real milestones",
  "Post-launch support included",
  "No vendor lock-in, ever",
  "Clean, documented, maintainable code",
  "Security and performance by default",
];

function AboutUs() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const leftRef = useScrollReveal<HTMLDivElement>();
  const rightRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="about" className="relative bg-white py-24 dark:bg-[#05070b]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent dark:via-white/[0.08]" />

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="reveal mb-16 grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-black/[0.04] px-3.5 py-1.5 dark:border-white/[0.10] dark:bg-white/[0.04]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#58adff]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
                About Us
              </span>
            </div>
            <h2 className="font-['Montserrat'] text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#05070b] dark:text-white">
              We build software that{" "}
              <span className="bg-gradient-to-r from-[#2f8fe6] to-[#58adff] bg-clip-text text-transparent">
                moves businesses
              </span>{" "}
              forward
            </h2>
          </div>
          <div>
            <p className="text-[15px] leading-7 text-black/55 dark:text-white/55">
              Comrade Coders is a full-stack software company built for businesses that want real results.
              We combine technical depth with business understanding to deliver systems that actually work —
              on time, on budget, and built to last.
            </p>
            <a
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(47,143,230,0.38)]"
            >
              Work with us
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="reveal-stagger mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-black/[0.07] bg-black/[0.02] px-6 py-6 text-center dark:border-white/[0.07] dark:bg-white/[0.03]"
            >
              <div className="font-['Montserrat'] text-[2.4rem] font-bold leading-none tracking-tight text-[#05070b] dark:text-white">
                {s.value}
              </div>
              <div className="mt-2 text-[13px] text-black/50 dark:text-white/50">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Values + Pillars */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div ref={leftRef} className="reveal-left flex flex-col gap-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="flex gap-4 rounded-2xl border border-black/[0.07] bg-black/[0.02] p-5 transition-all duration-200 hover:border-black/[0.13] dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/[0.13]"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                    <Icon size={18} strokeWidth={1.6} className="text-[#2f8fe6] dark:text-[#58adff]" />
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-[15px] font-semibold text-[#05070b] dark:text-white">{v.title}</h3>
                    <p className="text-[13.5px] leading-6 text-black/50 dark:text-white/50">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={rightRef} className="reveal-right rounded-2xl border border-black/[0.07] bg-black/[0.02] p-7 dark:border-white/[0.07] dark:bg-white/[0.03]">
            <h3 className="mb-1.5 font-['Montserrat'] text-[18px] font-bold text-[#05070b] dark:text-white">
              How we work
            </h3>
            <p className="mb-6 text-[13.5px] leading-6 text-black/50 dark:text-white/50">
              Our process is built around clarity, speed and accountability.
            </p>
            <ul className="flex flex-col gap-3">
              {pillars.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 size={17} strokeWidth={2} className="mt-0.5 shrink-0 text-[#2f8fe6] dark:text-[#58adff]" />
                  <span className="text-[14px] leading-6 text-black/65 dark:text-white/65">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUs;
