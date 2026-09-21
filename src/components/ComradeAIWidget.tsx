import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Bot, Check, MessageCircle, Send, X } from "lucide-react";

type StoredQuery = {
  id: string;
  query: string;
  createdAt: string;
};

const STORAGE_KEY = "comrade-ai-queries";

function saveQuery(query: string) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as StoredQuery[];
  const record: StoredQuery = {
    id: crypto.randomUUID(),
    query,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing]));
}

export default function ComradeAIWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const hasSeenWidget = sessionStorage.getItem("comrade-ai-seen");
    if (hasSeenWidget) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("comrade-ai-seen", "true");
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    saveQuery(cleanQuery);
    setSubmitted(true);
    setQuery("");
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open Comrade AI"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#58adff] to-[#2f8fe6] text-white shadow-[0_12px_35px_rgba(47,143,230,0.35)] transition-transform duration-300 hover:scale-105 sm:bottom-7 sm:right-7"
      >
        <MessageCircle size={23} strokeWidth={1.8} />
      </button>

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
                    <h2 id="comrade-ai-title" className="text-lg font-semibold text-[#05070b] dark:text-white">Comrade AI</h2>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Online
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-black/50 dark:text-white/50">Tell us what you are trying to build.</p>
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
                  <p className="font-medium text-[#05070b] dark:text-white">Message captured.</p>
                  <p className="mt-1 text-sm leading-6 text-black/50 dark:text-white/50">Our team can review it and connect the AI response layer next.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="mt-4 text-xs font-semibold text-[#2f8fe6] dark:text-[#78bdff]">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="comrade-ai-query" className="sr-only">Your question</label>
                  <textarea
                    id="comrade-ai-query"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="What can we help you build?"
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-black/[0.10] bg-black/[0.025] p-4 text-sm leading-6 text-[#05070b] outline-none transition focus:border-[#58adff] focus:ring-4 focus:ring-[#58adff]/10 dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-white"
                  />
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <p className="text-[10px] leading-4 text-black/40 dark:text-white/40">Your question is saved securely on this device for now.</p>
                    <button type="submit" className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#2f8fe6] px-4 text-xs font-semibold text-white transition hover:bg-[#247dcb] disabled:cursor-not-allowed disabled:opacity-50" disabled={!query.trim()}>
                      Save query
                      <Send size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-black/[0.07] px-6 py-3.5 dark:border-white/[0.08] sm:px-7">
              <span className="text-[10px] uppercase tracking-[0.16em] text-black/35 dark:text-white/35">Comrade Coders</span>
              <a href="/contact" onClick={() => setOpen(false)} className="flex items-center gap-1 text-[11px] font-semibold text-[#2f8fe6] dark:text-[#78bdff]">Talk to the team <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
