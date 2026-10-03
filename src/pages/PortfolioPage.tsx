import { useEffect } from "react";
import { ArrowUpRight, ImagePlus } from "lucide-react";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

import useAPI from "../../hook/useAPI";
import apiConfig from "../../config/global.json";

import type { Project } from "../types/project";

export default function PortfolioPage() {
  const {
    data: projects,
    loading,
    error,
    request,
  } = useAPI<Project[]>();

  useEffect(() => {
    window.scrollTo(0, 0);

    request(apiConfig.api.endpoints.projects);
  }, [request]);

  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <SEOHead
        title="Portfolio"
        description="Explore projects built by Comrade Coders — digital products, platforms, and custom software systems crafted for ambitious businesses."
        canonical="/portfolio"
      />
      <Navbar />

      <main className="pt-28">
        <section className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2f8fe6] dark:text-cyan-300">
              Portfolio
            </p>

            <h1 className="font-['Montserrat'] text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#05070b] dark:text-white">
              Work built to move businesses forward.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-black/55 dark:text-white/55 sm:text-lg">
              Explore selected digital products, platforms, and systems crafted
              by Comrade Coders for ambitious teams.
            </p>
          </div>

          {loading && (
            <div className="mt-16 flex min-h-[250px] items-center justify-center">
              <p className="text-sm text-black/50 dark:text-white/50">
                Loading projects...
              </p>
            </div>
          )}

          {error && !loading && (
            <div className="mt-16 flex min-h-[250px] items-center justify-center">
              <p className="text-sm text-red-500">
                Unable to load projects.
              </p>
            </div>
          )}

          {!loading && !error && projects && projects.length === 0 && (
            <div className="mt-16 flex min-h-[250px] items-center justify-center">
              <p className="text-sm text-black/50 dark:text-white/50">
                No projects available.
              </p>
            </div>
          )}

          {!loading && !error && projects && projects.length > 0 && (
            <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => {
                const projectNumber =
                  project.project_number ||
                  String(index + 1).padStart(2, "0");

                return (
                  <article
                    key={project.id}
                    className="group overflow-hidden rounded-[1.5rem] border border-black/[0.08] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#58adff]/50 hover:shadow-[0_28px_80px_rgba(14,165,233,0.14)] dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#eaf3fb] dark:bg-[#101a27]">
                      {project.featured_image ? (
                        <img
                          src={project.featured_image}
                          alt={`${project.title} preview`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#164e73] to-[#2f8fe6]">
                          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:28px_28px]" />

                          <div className="relative flex items-center gap-4 text-white/75">
                            <span className="font-mono text-7xl font-bold tracking-[-0.12em]">
                              {projectNumber}
                            </span>

                            <div className="h-14 w-px bg-white/35" />

                            <div>
                              <ImagePlus size={22} strokeWidth={1.4} />

                              <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.16em]">
                                Add project image
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
                        {projectNumber}
                      </span>
                    </div>

                    <div className="p-6 sm:p-7">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2f8fe6] dark:text-cyan-300">
                        {project.category || "Project"}
                      </p>

                      <div className="mt-3 flex items-start justify-between gap-4">
                        <h2 className="text-xl font-semibold tracking-[-0.03em]">
                          {project.title}
                        </h2>

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2f8fe6] text-white transition-transform duration-300 group-hover:rotate-45 dark:bg-cyan-300 dark:text-[#06101a]">
                          <ArrowUpRight size={16} />
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-black/50 dark:text-white/50">
                        {project.short_description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2 border-t border-black/[0.08] pt-5 dark:border-white/10">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full border border-black/[0.08] bg-black/[0.02] px-2.5 py-1 text-[11px] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}