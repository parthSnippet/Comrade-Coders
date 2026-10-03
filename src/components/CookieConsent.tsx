import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const CONSENT_KEY = "comrade_consent";
const VISITOR_KEY = "comrade_visitor";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((e) => e.startsWith(`${name}=`))
    ?.split("=")[1];
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax`;
}

function saveVisitorCookie() {
  const existing = readCookie(VISITOR_KEY);
  const now = new Date().toISOString();

  if (existing) {
    try {
      const data = JSON.parse(decodeURIComponent(existing));
      writeCookie(VISITOR_KEY, JSON.stringify({ ...data, lastSeen: now, visits: (data.visits ?? 1) + 1 }));
      return;
    } catch { /* recreate */ }
  }

  writeCookie(VISITOR_KEY, JSON.stringify({
    id: crypto.randomUUID(),
    firstSeen: now,
    lastSeen: now,
    visits: 1,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${window.screen.width}x${window.screen.height}`,
    platform: navigator.platform,
    referrer: document.referrer || "direct",
  }));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = readCookie(CONSENT_KEY);
    if (consent === "accepted") saveVisitorCookie();
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    writeCookie(CONSENT_KEY, "accepted");
    saveVisitorCookie();
    setVisible(false);
  };

  const reject = () => {
    writeCookie(CONSENT_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-[580px] rounded-2xl border border-black/10 bg-white/95 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:border-white/[0.12] dark:bg-[#0b1119]/95 dark:shadow-[0_20px_70px_rgba(0,0,0,0.55)] sm:inset-x-auto sm:bottom-6 sm:p-5">
      <button
        type="button"
        aria-label="Close"
        onClick={reject}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-black/40 transition hover:bg-black/[0.06] hover:text-black dark:text-white/40 dark:hover:bg-white/[0.08] dark:hover:text-white"
      >
        <X size={15} />
      </button>

      <div className="flex gap-3 pr-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#58adff]/10 text-[#2f8fe6] dark:text-[#78bdff]">
          <Cookie size={20} strokeWidth={1.7} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#05070b] dark:text-white">We use cookies</h2>
          <p className="mt-1 text-xs leading-5 text-black/55 dark:text-white/55">
            We use cookies to remember your preferences and improve your experience on our site.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 pl-[52px]">
        <button type="button" onClick={reject} className="rounded-full px-3.5 py-2 text-xs font-medium text-black/55 transition hover:bg-black/[0.05] hover:text-black dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white">
          Reject
        </button>
        <button type="button" onClick={accept} className="rounded-full bg-[#2f8fe6] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#247dcb]">
          Accept cookies
        </button>
      </div>
    </div>
  );
}
