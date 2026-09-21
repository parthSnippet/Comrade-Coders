import { Clock, Code2, Layers, Shield, Users, Zap } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const reasons = [
  {
    icon: Layers,
    title: "Full-Stack Under One Roof",
    desc: "Design, development, AI, automation and IT — all handled by one team. No handoffs, no gaps, no blame game.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    desc: "We move fast without cutting corners. Most projects go from brief to live in weeks, not months.",
  },
  {
    icon: Code2,
    title: "Built for Scale",
    desc: "Every system we build is architected to grow with your business — from 10 users to 10,000.",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    desc: "We treat your business like our own. Transparent communication, honest timelines, real results.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    desc: "Security isn't an afterthought. We bake best practices into every layer of what we build.",
  },
  {
    icon: Zap,
    title: "Modern Tech Stack",
    desc: "We use the latest, proven technologies so your product stays competitive and maintainable long-term.",
  },
];

function WhyComerade() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section id="why-us" className="relative bg-black/[0.02] py-24 dark:bg-white/[0.02]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent dark:via-white/[0.08]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent dark:via-white/[0.08]" />

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="reveal mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-black/[0.04] px-3.5 py-1.5 dark:border-white/[0.10] dark:bg-white/[0.04]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#58adff]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
              Why Us
            </span>
          </div>
          <h2 className="font-['Montserrat'] text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#05070b] dark:text-white">
            Why{" "}
            <span className="bg-gradient-to-r from-[#2f8fe6] to-[#58adff] bg-clip-text text-transparent">
              Comrade Coders
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] text-[15px] leading-7 text-black/50 dark:text-white/50">
            We're not just another dev agency. Here's what makes working with us different.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="group rounded-2xl border border-black/[0.07] bg-white p-6 transition-all duration-200 hover:border-black/[0.13] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/[0.13] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                    <Icon size={20} strokeWidth={1.6} className="text-[#2f8fe6] dark:text-[#58adff]" />
                  </div>
                  <span className="font-['Montserrat'] text-[2rem] font-bold leading-none text-black/[0.06] dark:text-white/[0.06]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-2.5 text-[16px] font-semibold text-[#05070b] dark:text-white">{r.title}</h3>
                <p className="text-[14px] leading-6 text-black/50 dark:text-white/50">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyComerade;
