import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

const values = [
  {
    id: "01",
    title: "Full-Stack Under One Roof",
    description:
      "Design, development, AI, automation and IT — all handled by one team. No handoffs, no gaps, no blame game.",
    icon: "layers",
  },
  {
    id: "02",
    title: "Fast Turnaround",
    description:
      "We move fast without cutting corners. Most projects go from brief to live in weeks, not months.",
    icon: "clock",
  },
  {
    id: "03",
    title: "Built for Scale",
    description:
      "Every system we build is architected to grow with your business — from 10 users to 10,000.",
    icon: "code",
  },
];

function WhatWeDo() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section id="services" className="relative bg-white py-24 dark:bg-[#05070b]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent dark:via-white/[0.08]" />

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-black/[0.04] px-3.5 py-1.5 dark:border-white/[0.10] dark:bg-white/[0.04]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#58adff]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
                What We Do
              </span>
            </div>
            <h2 className="max-w-[640px] font-['Montserrat'] text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#05070b] dark:text-white">
              Full-stack capabilities under
              <br className="hidden sm:block" />
              one accountable team
            </h2>
            <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-black/50 dark:text-white/50">
              From websites to AI platforms, we design and build the systems that run modern businesses.
            </p>
          </div>
          <Link
            to="/services"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-black/[0.12] bg-transparent px-5 py-2.5 text-sm font-semibold text-black/70 transition-all duration-200 hover:border-black/[0.22] hover:text-black dark:border-white/[0.14] dark:text-white/70 dark:hover:border-white/[0.28] dark:hover:text-white lg:inline-flex"
          >
            View all services
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="reveal-stagger mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item) => {
            const iconLabel =
              item.icon === "layers" ? "▣" : item.icon === "clock" ? "◔" : "</>";

            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-[1.5rem] border border-black/[0.08] bg-[#f7f9fb] p-6 shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-black/[0.12] hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-[0_10px_35px_rgba(0,0,0,0.18)] dark:hover:border-white/[0.14] dark:hover:bg-white/[0.05]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#58adff]/15 bg-[#dfeeff] text-2xl font-semibold text-[#2f8fe6] dark:bg-[#0d1d2d] dark:text-[#58adff]">
                  {iconLabel}
                </div>

                <div className="mb-4 text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-none tracking-[-0.08em] text-[#2f8fe6]/80 dark:text-[#58adff]/90">
                  {item.id}
                </div>

                <h3 className="mb-3 text-[1.05rem] font-semibold text-[#05070b] dark:text-white">
                  {item.title}
                </h3>

                <p className="flex-1 text-[15px] leading-7 text-black/55 dark:text-white/55">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center lg:hidden">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.12] px-5 py-2.5 text-sm font-semibold text-black/70 dark:border-white/[0.14] dark:text-white/70"
          >
            View all services <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
