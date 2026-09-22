import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowUpRight,
  Bot,
  Check,
  MessageCircle,
  Send,
  X,
} from "lucide-react";

import useAPI from "../../hook/useAPI";
import apiConfig from "../../config/global.json";

interface ComradeAIResponse {
  id: number;
  query: string;
  created_at: string;
}

const WHATSAPP_NUMBER = "918128564899";

const WHATSAPP_SERVICES = [
  "Web Development",
  "Software Development",
  "Automation",
  "AI Platforms",
  "ERP & CRM",
  "IT Solutions",
  "Not Sure",
];

export default function ComradeAIWidget() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { loading, error, request } = useAPI<ComradeAIResponse>();

  useEffect(() => {
    const hasSeenWidget = sessionStorage.getItem("comrade-ai-seen");

    if (hasSeenWidget) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("comrade-ai-seen", "true");
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanQuery = query.trim();

    if (!cleanQuery || loading) return;

    const response = await request(
      apiConfig.api.endpoints.comradeAI,
      "POST",
      {
        query: cleanQuery,
      }
    );

    if (response) {
      setSubmitted(true);
      setQuery("");
    }
  };

  const openComradeAI = () => {
    setMenuOpen(false);
    setWhatsappOpen(false);
    setOpen(true);
  };

  const openWhatsAppMenu = () => {
    setMenuOpen(false);
    setOpen(false);
    setWhatsappOpen(true);
  };

  const closeAll = () => {
    setOpen(false);
    setMenuOpen(false);
    setWhatsappOpen(false);
  };

  const handleWhatsAppService = (service: string) => {
    const message =
      service === "Not Sure"
        ? "Hi Comrade Coders, I'm not sure which service I need. I'd like to discuss my requirements."
        : `Hi Comrade Coders, I'm interested in ${service}. I'd like to discuss my requirements.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setWhatsappOpen(false);
  };

  return (
    <>
      {/* Floating Toggle */}
      <div className="fixed bottom-5 right-5 z-[60] sm:bottom-7 sm:right-7">
        {menuOpen && (
          <div className="absolute bottom-[4.5rem] right-0 mb-2 flex w-48 flex-col overflow-hidden rounded-2xl border border-black/[0.10] bg-white p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] dark:border-white/[0.12] dark:bg-[#0b1119] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              onClick={openComradeAI}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-[#58adff]/10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#58adff]/10 text-[#2f8fe6] dark:text-[#78bdff]">
                <Bot size={18} strokeWidth={1.8} />
              </span>

              <span>
                <span className="block text-xs font-semibold text-[#05070b] dark:text-white">
                  Comrade AI
                </span>

                <span className="block text-[10px] text-black/45 dark:text-white/45">
                  Ask us anything
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={openWhatsAppMenu}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-emerald-500/10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <MessageCircle size={18} strokeWidth={1.8} />
              </span>

              <span>
                <span className="block text-xs font-semibold text-[#05070b] dark:text-white">
                  WhatsApp
                </span>

                <span className="block text-[10px] text-black/45 dark:text-white/45">
                  Talk to our team
                </span>
              </span>
            </button>
          </div>
        )}

        <button
          type="button"
          aria-label="Open communication options"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((previous) => !previous)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#58adff] to-[#2f8fe6] text-white shadow-[0_12px_35px_rgba(47,143,230,0.35)] transition-transform duration-300 hover:scale-105"
        >
          {menuOpen ? (
            <X size={23} strokeWidth={1.8} />
          ) : (
            <MessageCircle size={23} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {/* WhatsApp Service Selection */}
      {whatsappOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/35 p-4 backdrop-blur-[3px] sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-title"
            className="relative w-full max-w-[480px] overflow-hidden rounded-[1.75rem] border border-black/[0.10] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.22)] dark:border-white/[0.12] dark:bg-[#0b1119] dark:shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-300" />

            <div className="flex items-start justify-between p-6 pb-4 sm:p-7 sm:pb-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <MessageCircle size={23} strokeWidth={1.7} />
                </div>

                <div>
                  <h2
                    id="whatsapp-title"
                    className="text-lg font-semibold text-[#05070b] dark:text-white"
                  >
                    WhatsApp
                  </h2>

                  <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                    What are you interested in?
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close WhatsApp"
                onClick={closeAll}
                className="flex h-8 w-8 items-center justify-center rounded-full text-black/45 transition-colors hover:bg-black/[0.06] hover:text-black dark:text-white/45 dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 pb-6 sm:px-7 sm:pb-7">
              <div className="space-y-2">
                {WHATSAPP_SERVICES.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleWhatsAppService(service)}
                    className="group flex w-full items-center justify-between rounded-xl border border-black/[0.08] bg-black/[0.02] px-4 py-3.5 text-left transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06] dark:border-white/[0.10] dark:bg-white/[0.03] dark:hover:border-emerald-400/30 dark:hover:bg-emerald-500/[0.06]"
                  >
                    <span className="text-sm font-medium text-[#05070b] dark:text-white">
                      {service}
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="text-black/30 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500 dark:text-white/30 dark:group-hover:text-emerald-400"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-black/[0.07] px-6 py-3.5 dark:border-white/[0.08] sm:px-7">
              <span className="text-[10px] uppercase tracking-[0.16em] text-black/35 dark:text-white/35">
                Comrade Coders
              </span>

              <button
                type="button"
                onClick={closeAll}
                className="text-[11px] font-semibold text-black/45 transition hover:text-black dark:text-white/45 dark:hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comrade AI Modal */}
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/35 p-4 backdrop-blur-[3px] sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="comrade-ai-title"
            className="relative w-full max-w-[480px] overflow-hidden rounded-[1.75rem] border border-black/[0.10] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.22)] dark:border-white/[0.12] dark:bg-[#0b1119] dark:shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#58adff] via-[#2f8fe6] to-cyan-300" />

            <div className="flex items-start justify-between p-6 pb-4 sm:p-7 sm:pb-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#58adff]/10 text-[#2f8fe6] dark:text-[#78bdff]">
                  <Bot size={23} strokeWidth={1.7} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2
                      id="comrade-ai-title"
                      className="text-lg font-semibold text-[#05070b] dark:text-white"
                    >
                      Comrade AI
                    </h2>

                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Online
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                    Tell us what you are trying to build.
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close Comrade AI"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-black/45 transition-colors hover:bg-black/[0.06] hover:text-black dark:text-white/45 dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 pb-6 sm:px-7 sm:pb-7">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check size={18} />
                  </div>

                  <p className="font-medium text-[#05070b] dark:text-white">
                    Message captured.
                  </p>

                  <p className="mt-1 text-sm leading-6 text-black/50 dark:text-white/50">
                    Our team can review it and connect the AI response layer
                    next.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold text-[#2f8fe6] dark:text-[#78bdff]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="comrade-ai-query" className="sr-only">
                    Your question
                  </label>

                  <textarea
                    id="comrade-ai-query"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="What can we help you build?"
                    rows={4}
                    disabled={loading}
                    className="w-full resize-none rounded-2xl border border-black/[0.10] bg-black/[0.025] p-4 text-sm leading-6 text-[#05070b] outline-none transition focus:border-[#58adff] focus:ring-4 focus:ring-[#58adff]/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-white"
                  />

                  {error && (
                    <p className="mt-2 text-xs text-red-500">
                      {error}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between gap-4">
                    <p className="text-[10px] leading-4 text-black/40 dark:text-white/40">
                      Your question is securely submitted to Comrade Coders.
                    </p>

                    <button
                      type="submit"
                      className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#2f8fe6] px-4 text-xs font-semibold text-white transition hover:bg-[#247dcb] disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!query.trim() || loading}
                    >
                      {loading ? "Sending..." : "Send query"}
                      <Send size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-black/[0.07] px-6 py-3.5 dark:border-white/[0.08] sm:px-7">
              <span className="text-[10px] uppercase tracking-[0.16em] text-black/35 dark:text-white/35">
                Comrade Coders
              </span>

              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#2f8fe6] dark:text-[#78bdff]"
              >
                Talk to the team
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
