import {
  ArrowRight,
  Database,
  Layers,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useScrollReveal } from "../hooks/useScrollReveal";
import useAPI from "../../hook/useAPI";
import apiConfig from "../../config/global.json";
import type { Technology } from "../types/technology";
import { getServiceIcon } from "../utils/serviceIcons";

const CATEGORY_ORDER = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps / Tools",
  "AI / ML",
];

const CATEGORY_ICONS = {
  Frontend: Layers,
  Backend: Server,
  Database: Database,
  "DevOps / Tools": Wrench,
  "AI / ML": Sparkles,
};

function Technologies() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const contentRef = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });

  const { data, loading, request } = useAPI<Technology[]>();

  useEffect(() => {
    request(apiConfig.api.endpoints.technologies);
  }, [request]);

  const technologies = (data ?? []).filter((technology) => technology.is_active);

  const categories = CATEGORY_ORDER.filter((category) =>
    technologies.some((technology) => technology.category === category)
  );

  return (
    <section
      id="technologies"
      className="relative overflow-hidden bg-white py-24 dark:bg-[#05070b]"
    >
      {/* Top Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent dark:via-white/[0.08]" />

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#58adff]/[0.04] blur-[100px] dark:bg-[#58adff]/[0.06]" />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-black/[0.04] px-3.5 py-1.5 dark:border-white/[0.10] dark:bg-white/[0.04]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#58adff]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
                Our Technology Stack
              </span>
            </div>

            <h2 className="max-w-[700px] font-['Montserrat'] text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#05070b] dark:text-white">
              Technologies we work with
              <br className="hidden sm:block" />
              to build modern systems
            </h2>

            <p className="mt-4 max-w-[560px] text-[15px] leading-7 text-black/50 dark:text-white/50">
              We use proven technologies across frontend, backend, databases,
              DevOps and AI to build scalable digital solutions.
            </p>
          </div>

          <Link
            to="/services"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-black/[0.12] bg-transparent px-5 py-2.5 text-sm font-semibold text-black/70 transition-all duration-200 hover:border-black/[0.22] hover:text-black dark:border-white/[0.14] dark:text-white/70 dark:hover:border-white/[0.28] dark:hover:text-white lg:inline-flex"
          >
            Explore our services
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Technology Categories */}
        <div
          ref={contentRef}
          className="reveal-stagger mt-12 space-y-5"
        >
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-32 animate-pulse rounded-[1.5rem] border border-black/[0.06] bg-[#f7f9fb] dark:border-white/[0.06] dark:bg-white/[0.03]"
                />
              ))}
            </div>
          ) : categories.length > 0 ? (
            categories.map((category) => {
              const CategoryIcon =
                CATEGORY_ICONS[
                  category as keyof typeof CATEGORY_ICONS
                ] ?? Layers;

              const categoryTechnologies = technologies.filter(
                (technology) => technology.category === category
              );

              return (
                <div
                  key={category}
                  className="rounded-[1.5rem] border border-black/[0.08] bg-[#f7f9fb] p-5 shadow-[0_10px_35px_rgba(15,23,42,0.04)] dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-[0_10px_35px_rgba(0,0,0,0.18)] sm:p-6"
                >
                  {/* Category Header */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#58adff]/15 bg-[#dfeeff] dark:bg-[#0d1d2d]">
                      <CategoryIcon
                        size={18}
                        strokeWidth={1.7}
                        className="text-[#2f8fe6] dark:text-[#58adff]"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#05070b] dark:text-white">
                        {category}
                      </h3>

                      <p className="mt-0.5 text-xs text-black/40 dark:text-white/40">
                        {categoryTechnologies.length}{" "}
                        {categoryTechnologies.length === 1
                          ? "technology"
                          : "technologies"}
                      </p>
                    </div>
                  </div>

                  {/* Technology Cards */}
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoryTechnologies.map((technology) => {
                      const Icon = getServiceIcon(technology.icon);

                      return (
                        <div
                          key={technology.id}
                          className="group flex items-center gap-3 rounded-2xl border border-black/[0.07] bg-white px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#58adff]/30 hover:shadow-[0_8px_25px_rgba(50,143,232,0.08)] dark:border-white/[0.07] dark:bg-white/[0.025] dark:hover:border-[#58adff]/25 dark:hover:bg-white/[0.045]"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#58adff]/15 bg-[#58adff]/[0.08]">
                            <Icon
                              size={18}
                              strokeWidth={1.7}
                              className="text-[#2f8fe6] transition-transform duration-200 group-hover:scale-110 dark:text-[#58adff]"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#05070b] dark:text-white">
                              {technology.title}
                            </p>

                            <p className="mt-0.5 truncate text-[11px] text-black/35 dark:text-white/35">
                              {technology.category}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-black/[0.10] px-6 py-12 text-center dark:border-white/[0.10]">
              <p className="text-sm text-black/45 dark:text-white/45">
                Technologies will appear here once they are added from the
                admin panel.
              </p>
            </div>
          )}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center lg:hidden">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.12] px-5 py-2.5 text-sm font-semibold text-black/70 dark:border-white/[0.14] dark:text-white/70"
          >
            Explore our services
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Technologies;