import { useEffect } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

import useAPI from "../../hook/useAPI";
import apiConfig from "../../config/global.json";

import type { Industry } from "../types/industry";
import { getIndustryIcon } from "../utils/industryIcons";
import { fallbackIndustries } from "../data/fallback";

export default function AllIndustries() {
  const {
    data: industries,
    loading,
    error,
    request,
  } = useAPI<Industry[]>();

  useEffect(() => {
    window.scrollTo(0, 0);

    request(apiConfig.api.endpoints.industries);
  }, [request]);

  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <SEOHead
        title="Industries We Serve"
        description="Comrade Coders builds technology shaped around your industry — healthcare, e-commerce, education, finance, logistics, and more."
        canonical="/industries"
      />
      <Navbar />

      <main>
        <section className="relative overflow-hidden pt-32 pb-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(88,173,255,0.12),transparent_25%),radial-gradient(circle_at_85%_35%,rgba(47,143,230,0.10),transparent_24%)]" />

          <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-black/[0.04] px-3.5 py-1.5 dark:border-white/[0.10] dark:bg-white/[0.04]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#58adff]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
                Industries we serve
              </span>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="font-['Montserrat'] text-[clamp(2.3rem,5vw,4.5rem)] font-bold leading-[1] tracking-[-0.05em]">
                  Technology shaped around your industry.
                </h1>

                <p className="mt-5 max-w-[600px] text-[15px] leading-7 text-black/50 dark:text-white/50">
                  Every industry has different workflows, constraints, and
                  opportunities. We build digital systems around the way your
                  business actually operates.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.25)] transition hover:-translate-y-0.5"
              >
                Discuss your needs
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto grid max-w-[1280px] gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-10">

            {loading && (
              <div className="col-span-full py-20 text-center text-sm text-black/50 dark:text-white/50">
                Loading industries...
              </div>
            )}

            {!loading && error && (
              <div className="col-span-full mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
                Live data unavailable — showing cached industries.
              </div>
            )}

            {!loading &&
              (industries ?? (error ? fallbackIndustries : []))?.map((industry) => {
                const Icon = getIndustryIcon(industry.icon);

                return (
                  <Link
                    key={industry.slug}
                    to={`/industries/${industry.slug}`}
                    className="group flex flex-col rounded-2xl border border-black/[0.07] bg-black/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-[#58adff]/40 hover:bg-[#58adff]/[0.04] dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:bg-white/[0.055]"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                      <Icon
                        size={20}
                        strokeWidth={1.6}
                        className="text-[#2f8fe6] dark:text-[#58adff]"
                      />
                    </div>

                    <h2 className="mb-1.5 text-[16px] font-semibold">
                      {industry.title}
                    </h2>

                    <p className="mb-3 text-[13px] font-medium text-[#2f8fe6] dark:text-[#58adff]">
                      {industry.tagline}
                    </p>

                    <p className="flex-1 text-[14px] leading-6 text-black/50 dark:text-white/50">
                      {industry.short_description}
                    </p>

                    <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-[#2f8fe6] dark:text-[#58adff]">
                      Explore industry
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}