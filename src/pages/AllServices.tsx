import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

import useAPI from "../../hook/useAPI";
import apiConfig from "../../config/global.json";

import { getServiceIcon } from "../utils/serviceIcons";
import type { Service } from "../types/service";
import { fallbackServices } from "../data/fallback";

export default function AllServices() {
  const {
    data: services,
    loading,
    error,
    request,
  } = useAPI<Service[]>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    request(apiConfig.api.endpoints.services);
  }, [request]);

  const serviceList = services ?? (error ? fallbackServices : []);

  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <SEOHead
        title="Our Services"
        description="Full-stack software capabilities under one team — web development, AI platforms, ERP, CRM, automation, and IT solutions by Comrade Coders."
        canonical="/services"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-[#328fe8]/6 blur-[80px] dark:bg-[#328fe8]/10" />

          <div className="absolute right-[8%] top-[30%] h-[260px] w-[260px] rounded-full bg-[#58adff]/5 blur-[70px] dark:bg-[#58adff]/8" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-black/[0.04] px-3.5 py-1.5 dark:border-white/[0.10] dark:bg-white/[0.04]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#58adff]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
              What We Do
            </span>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-['Montserrat'] text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.035em]">
                Full-stack capabilities under
                <br className="hidden sm:block" />
                one accountable team
              </h1>

              <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-black/50 dark:text-white/50">
                From websites to AI platforms, we design and build the systems
                that run modern businesses.
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.25)] transition-all duration-200 hover:-translate-y-0.5"
            >
              Start a project

              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">

          {/* Loading */}
          {loading && (
            <div className="py-20 text-center">
              <p className="text-sm text-black/50 dark:text-white/50">
                Loading services...
              </p>
            </div>
          )}

          {/* Error — fallback data show karo */}
          {error && !loading && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
              Live data unavailable — showing cached services.
            </div>
          )}

          {/* Empty */}
          {!loading && !error && serviceList.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm text-black/50 dark:text-white/50">
                No services available.
              </p>
            </div>
          )}

          {/* Service Grid */}
          {!loading && serviceList.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {serviceList.map((service) => {
                const Icon = getServiceIcon(service.icon);

                return (
                  <Link
                    key={service.id}
                    to={`/services/${service.slug}`}
                    className="group flex flex-col rounded-2xl border border-black/[0.07] bg-black/[0.02] p-6 transition-all duration-200 hover:border-black/[0.14] hover:bg-black/[0.04] dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/[0.13] dark:hover:bg-white/[0.055]"
                  >
                    {/* Icon */}
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                      <Icon
                        size={20}
                        strokeWidth={1.6}
                        className="text-[#2f8fe6] dark:text-[#58adff]"
                      />
                    </div>

                    {/* Title */}
                    <h2 className="mb-1.5 text-[16px] font-semibold text-[#05070b] dark:text-white">
                      {service.title}
                    </h2>

                    {/* Tagline */}
                    {service.tagline && (
                      <p className="mb-3 text-[13px] font-medium text-[#2f8fe6] dark:text-[#58adff]">
                        {service.tagline}
                      </p>
                    )}

                    {/* Description */}
                    <p className="flex-1 text-[14px] leading-6 text-black/50 dark:text-white/50">
                      {service.short_description}
                    </p>

                    {/* CTA */}
                    <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-[#2f8fe6] dark:text-[#58adff]">
                      Learn more

                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}