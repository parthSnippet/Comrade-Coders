import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import { useScrollReveal } from "../hooks/useScrollReveal";

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
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-black/[0.07] bg-black/[0.02] p-6 transition-all duration-200 hover:border-black/[0.14] hover:bg-black/[0.04] dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/[0.13] dark:hover:bg-white/[0.055]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                  <Icon size={20} strokeWidth={1.6} className="text-[#2f8fe6] dark:text-[#58adff]" />
                </div>
                <h3 className="mb-2.5 text-[16px] font-semibold text-[#05070b] dark:text-white">{s.title}</h3>
                <p className="flex-1 text-[14px] leading-6 text-black/50 dark:text-white/50">{s.desc.slice(0, 110)}…</p>
                <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-[#2f8fe6] dark:text-[#58adff]">
                  Learn more
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
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
