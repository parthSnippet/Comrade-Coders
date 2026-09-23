import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";

import useAPI from "../../hook/useAPI";
import apiConfig from "../../config/global.json";

import type { Industry } from "../types/industry";
import { getIndustryIcon } from "../utils/industryIcons";
import { fallbackIndustries, getFallbackIndustry } from "../data/fallback";

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: industry, loading, error, request } = useAPI<Industry>();
  const { data: industries, error: allError, request: requestIndustries } = useAPI<Industry[]>();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) { navigate("/industries", { replace: true }); return; }
    request(`${apiConfig.api.endpoints.industries}${slug}/`);
    requestIndustries(apiConfig.api.endpoints.industries);
  }, [slug, navigate, request, requestIndustries]);

  const displayIndustry: Industry | null =
    industry ?? (error ? (getFallbackIndustry(slug ?? "") ?? null) : null);

  const displayOthers: Industry[] =
    (industries ?? (allError ? fallbackIndustries : []))
      .filter((i) => i.slug !== slug)
      .slice(0, 3);

  if (loading || (!displayIndustry && !error)) {
    return (
      <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-black/10 border-t-[#2f8fe6] dark:border-white/10 dark:border-t-[#58adff]" />
            <p className="text-sm text-black/50 dark:text-white/50">Loading industry...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!displayIndustry) {
    return (
      <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="max-w-md text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2f8fe6] dark:text-[#58adff]">Industry not found</p>
            <h1 className="font-['Montserrat'] text-3xl font-bold">We couldn't find this industry.</h1>
            <Link to="/industries" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.25)] transition-all duration-200 hover:-translate-y-0.5">
              <ArrowLeft size={15} /> Back to Industries
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = getIndustryIcon(displayIndustry.icon);

  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <Navbar />

      <main className="page-transition">
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(88,173,255,0.12),transparent_25%),radial-gradient(circle_at_85%_35%,rgba(47,143,230,0.10),transparent_24%)]" />

          <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
            <div className="mb-8 flex items-center gap-2 text-[13px] text-black/40 dark:text-white/40">
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <Link to="/industries">Industries</Link>
              <ChevronRight size={13} />
              <span className="text-black/70 dark:text-white/70">{displayIndustry.title}</span>
            </div>

            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                    <Icon size={22} className="text-[#2f8fe6] dark:text-[#58adff]" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40 dark:text-white/40">Industry solutions</span>
                </div>

                <h1 className="font-['Montserrat'] text-[clamp(2.3rem,5vw,4.5rem)] font-bold leading-[1] tracking-[-0.05em]">{displayIndustry.title}</h1>
                <p className="mt-4 text-[1.1rem] font-medium text-[#2f8fe6] dark:text-[#58adff]">{displayIndustry.tagline}</p>
                <p className="mt-5 max-w-[650px] text-[15px] leading-7 text-black/55 dark:text-white/55">{displayIndustry.description}</p>
              </div>

              <div className="w-full rounded-2xl border border-black/[0.08] bg-black/[0.02] p-6 lg:w-[260px] dark:border-white/[0.08] dark:bg-white/[0.03]">
                <p className="mb-1 text-[15px] font-semibold">Have an industry challenge?</p>
                <p className="mb-5 text-[13px] leading-5 text-black/50 dark:text-white/50">Let's map the right digital solution for your team.</p>
                <Link to="/contact" className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] px-5 py-2.5 text-sm font-semibold text-white">
                  Let's Talk <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/[0.07] bg-black/[0.02] p-7 dark:border-white/[0.07] dark:bg-white/[0.03]">
                <h2 className="mb-5 text-[17px] font-bold">Common challenges</h2>
                <ul className="flex flex-col gap-3">
                  {displayIndustry.challenges.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f8fe6] dark:bg-[#58adff]" />
                      <span className="text-[14px] leading-6 text-black/65 dark:text-white/65">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-black/[0.07] bg-black/[0.02] p-7 dark:border-white/[0.07] dark:bg-white/[0.03]">
                <h2 className="mb-5 text-[17px] font-bold">How we help</h2>
                <ul className="flex flex-col gap-3">
                  {displayIndustry.solutions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#2f8fe6] dark:text-[#58adff]" />
                      <span className="text-[14px] leading-6 text-black/65 dark:text-white/65">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-14">
              <h2 className="mb-6 text-[20px] font-bold">Relevant use cases</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {displayIndustry.use_cases.map((item, index) => (
                  <div key={item.title} className="rounded-2xl border border-black/[0.07] bg-black/[0.02] p-5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                    <span className="mb-3 block text-[1.6rem] font-bold leading-none text-black/[0.06] dark:text-white/[0.06]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mb-2 text-[14px] font-semibold">{item.title}</h3>
                    <p className="text-[13px] leading-5 text-black/50 dark:text-white/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 border-t border-black/[0.07] pt-12 dark:border-white/[0.07]">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-[18px] font-bold">Explore other industries</h2>
                <Link to="/industries" className="text-[13px] font-medium text-[#2f8fe6] dark:text-[#58adff]">
                  View all <ArrowUpRight size={13} className="inline" />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {displayOthers.map((item) => {
                  const OtherIcon = getIndustryIcon(item.icon);
                  return (
                    <Link key={item.slug} to={`/industries/${item.slug}`} className="flex items-center gap-4 rounded-2xl border border-black/[0.07] bg-black/[0.02] p-5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                        <OtherIcon size={18} className="text-[#2f8fe6] dark:text-[#58adff]" />
                      </div>
                      <span className="text-[14px] font-semibold">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link to="/industries" className="mt-10 inline-flex items-center gap-2 text-[13px] text-black/50 dark:text-white/50">
              <ArrowLeft size={14} /> Back to all industries
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
