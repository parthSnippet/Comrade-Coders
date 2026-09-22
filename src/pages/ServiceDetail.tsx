import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";

import useAPI from "../../hook/useAPI";
import apiConfig from "../../config/global.json";

import { getServiceIcon } from "../utils/serviceIcons";
import type { Service } from "../types/service";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  /*
   * Current service
   */
  const {
    data: service,
    loading,
    error,
    request,
  } = useAPI<Service>();

  /*
   * Other services
   */
  const {
    data: allServices,
    request: requestAllServices,
  } = useAPI<Service[]>();

  /*
   * Fetch current service by slug
   */
  useEffect(() => {
    if (!slug) {
      navigate("/services", { replace: true });
      return;
    }

    request(`${apiConfig.api.endpoints.services}${slug}/`);
  }, [slug, request, navigate]);

  /*
   * Fetch all services for "Other services"
   */
  useEffect(() => {
    requestAllServices(apiConfig.api.endpoints.services);
  }, [requestAllServices]);

  /*
   * Scroll to top whenever service changes
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
        <Navbar />

        <main className="flex min-h-screen items-center justify-center px-5 pt-32">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-black/10 border-t-[#2f8fe6] dark:border-white/10 dark:border-t-[#58adff]" />

            <p className="text-sm text-black/50 dark:text-white/50">
              Loading service...
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  /*
   * Error / service not found
   */
  if (error || !service) {
    return (
      <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
        <Navbar />

        <main className="flex min-h-screen items-center justify-center px-5 pt-32">
          <div className="max-w-md text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2f8fe6] dark:text-[#58adff]">
              Service not found
            </p>

            <h1 className="font-['Montserrat'] text-3xl font-bold">
              We couldn't find this service.
            </h1>

            <p className="mt-3 text-sm leading-6 text-black/50 dark:text-white/50">
              The service may have been removed, disabled, or the URL may
              be incorrect.
            </p>

            <Link
              to="/services"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.25)] transition-all duration-200 hover:-translate-y-0.5"
            >
              <ArrowLeft size={15} />
              Back to Services
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const Icon = getServiceIcon(service.icon);

  /*
   * Remove current service from "Other services"
   */
  const others =
    allServices?.filter(
      (item) => item.slug !== service.slug
    ) ?? [];

  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <Navbar />

      <div key={service.id} className="page-transition">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[10%] top-[20%] h-[320px] w-[320px] rounded-full bg-[#328fe8]/6 blur-[80px] dark:bg-[#328fe8]/10" />

            <div className="absolute right-[8%] top-[30%] h-[280px] w-[280px] rounded-full bg-[#58adff]/5 blur-[70px] dark:bg-[#58adff]/8" />
          </div>

          <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
            {/* Breadcrumb */}
            <div className="mb-8 flex items-center gap-2 text-[13px] text-black/40 dark:text-white/40">
              <Link
                to="/"
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                Home
              </Link>

              <ChevronRight size={13} />

              <Link
                to="/services"
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                Services
              </Link>

              <ChevronRight size={13} />

              <span className="text-black/70 dark:text-white/70">
                {service.title}
              </span>
            </div>

            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                {/* Icon + eyebrow */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      className="text-[#2f8fe6] dark:text-[#58adff]"
                    />
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                    Service
                  </span>
                </div>

                <h1 className="font-['Montserrat'] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
                  {service.title}
                </h1>

                {service.tagline && (
                  <p className="mt-3 text-[1.1rem] font-medium text-[#2f8fe6] dark:text-[#58adff]">
                    {service.tagline}
                  </p>
                )}

                <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-black/55 dark:text-white/55">
                  {service.description}
                </p>
              </div>

              {/* CTA card */}
              <div className="w-full rounded-2xl border border-black/[0.08] bg-black/[0.02] p-6 lg:w-[260px] dark:border-white/[0.08] dark:bg-white/[0.03]">
                <p className="mb-1 text-[15px] font-semibold text-[#05070b] dark:text-white">
                  Ready to get started?
                </p>

                <p className="mb-5 text-[13px] leading-5 text-black/50 dark:text-white/50">
                  Let's talk about your project and how we can help.
                </p>

                <Link
                  to="/contact"
                  className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.25)] transition-all duration-200 hover:-translate-y-0.5"
                >
                  Let's Talk

                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              {/* Highlights */}
              <div className="rounded-2xl border border-black/[0.07] bg-black/[0.02] p-7 dark:border-white/[0.07] dark:bg-white/[0.03]">
                <h2 className="mb-5 font-['Montserrat'] text-[17px] font-bold text-[#05070b] dark:text-white">
                  What's included
                </h2>

                <ul className="flex flex-col gap-3">
                  {service.highlights?.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={16}
                        strokeWidth={2}
                        className="mt-0.5 shrink-0 text-[#2f8fe6] dark:text-[#58adff]"
                      />

                      <span className="text-[14px] leading-6 text-black/65 dark:text-white/65">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="rounded-2xl border border-black/[0.07] bg-black/[0.02] p-7 dark:border-white/[0.07] dark:bg-white/[0.03]">
                <h2 className="mb-5 font-['Montserrat'] text-[17px] font-bold text-[#05070b] dark:text-white">
                  What you get
                </h2>

                <ul className="flex flex-col gap-3">
                  {service.deliverables?.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f8fe6] dark:bg-[#58adff]" />

                      <span className="text-[14px] leading-6 text-black/65 dark:text-white/65">
                        {deliverable}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Use Cases */}
            <div className="mt-8">
              <h2 className="mb-6 font-['Montserrat'] text-[20px] font-bold text-[#05070b] dark:text-white">
                Common use cases
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {service.use_cases?.map((useCase, index) => (
                  <div
                    key={useCase.title}
                    className="rounded-2xl border border-black/[0.07] bg-black/[0.02] p-5 dark:border-white/[0.07] dark:bg-white/[0.03]"
                  >
                    <span className="mb-3 block font-['Montserrat'] text-[1.6rem] font-bold leading-none text-black/[0.06] dark:text-white/[0.06]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mb-2 text-[14px] font-semibold text-[#05070b] dark:text-white">
                      {useCase.title}
                    </h3>

                    <p className="text-[13px] leading-5 text-black/50 dark:text-white/50">
                      {useCase.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Other services */}
            <div className="mt-16 border-t border-black/[0.07] pt-12 dark:border-white/[0.07]">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-['Montserrat'] text-[18px] font-bold text-[#05070b] dark:text-white">
                  Other services
                </h2>

                <Link
                  to="/services"
                  className="text-[13px] font-medium text-[#2f8fe6] transition-colors hover:text-[#58adff] dark:text-[#58adff]"
                >
                  View all →
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.slice(0, 3).map((otherService) => {
                  const OtherIcon = getServiceIcon(
                    otherService.icon
                  );

                  return (
                    <Link
                      key={otherService.slug}
                      to={`/services/${otherService.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-black/[0.07] bg-black/[0.02] p-5 transition-all duration-200 hover:border-black/[0.13] dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/[0.13]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                        <OtherIcon
                          size={18}
                          strokeWidth={1.6}
                          className="text-[#2f8fe6] dark:text-[#58adff]"
                        />
                      </div>

                      <div>
                        <p className="text-[14px] font-semibold text-[#05070b] dark:text-white">
                          {otherService.title}
                        </p>

                        <p className="text-[12px] text-black/45 dark:text-white/45">
                          {otherService.tagline ||
                            otherService.short_description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Back */}
            <div className="mt-10">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
              >
                <ArrowLeft size={14} />
                Back to all services
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}