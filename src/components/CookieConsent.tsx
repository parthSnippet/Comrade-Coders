import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const CONSENT_COOKIE = "comrade_cookie_consent";
const VISITOR_COOKIE = "comrade_visitor";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

type VisitorRecord = {
  id: string;
  firstSeen: string;
  lastSeen: string;
  visits: number;
  language: string;
  timezone: string;
  screen: string;
};

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`))
    ?.split("=")[1];
}

function writeCookie(name: string, value: string, maxAge = COOKIE_MAX_AGE) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

function createVisitorRecord(): VisitorRecord {
  const now = new Date().toISOString();
  const existing = readCookie(VISITOR_COOKIE);

  if (existing) {
    try {
      const record = JSON.parse(decodeURIComponent(existing)) as VisitorRecord;
      return {
        ...record,
        lastSeen: now,
        visits: record.visits + 1,
        screen: `${window.innerWidth}x${window.innerHeight}`,
      };
    } catch {
      // Recreate malformed or outdated local visitor data.
    }
  }

  return {
    id: crypto.randomUUID(),
    firstSeen: now,
    lastSeen: now,
    visits: 1,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${window.innerWidth}x${window.innerHeight}`,
  };
}

function storeVisitorData() {
  writeCookie(VISITOR_COOKIE, JSON.stringify(createVisitorRecord()));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = readCookie(CONSENT_COOKIE);
    if (consent === "accepted") storeVisitorData();
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    writeCookie(CONSENT_COOKIE, "accepted");
    storeVisitorData();
    setVisible(false);
  };

  const rejectCookies = () => {
    writeCookie(CONSENT_COOKIE, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-[620px] rounded-2xl border border-black/[0.10] bg-white/95 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:border-white/[0.12] dark:bg-[#0b1119]/95 dark:shadow-[0_20px_70px_rgba(0,0,0,0.55)] sm:inset-x-auto sm:bottom-6 sm:p-5">
      <button
        type="button"
        aria-label="Close cookie notice"
        onClick={rejectCookies}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-black/40 transition hover:bg-black/[0.06] hover:text-black dark:text-white/40 dark:hover:bg-white/[0.08] dark:hover:text-white"
      >
        <X size={15} />
      </button>
      <div className="flex gap-3 pr-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#58adff]/10 text-[#2f8fe6] dark:text-[#78bdff]">
          <Cookie size={20} strokeWidth={1.7} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#05070b] dark:text-white">A better experience, with your permission</h2>
          <p className="mt-1 text-xs leading-5 text-black/55 dark:text-white/55">
            We use a first-party cookie to remember consent and understand anonymous visits. We do not store names, messages, or personal identifiers here.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-end gap-2 pl-[52px]">
        <button type="button" onClick={rejectCookies} className="rounded-full px-3.5 py-2 text-xs font-medium text-black/55 transition hover:bg-black/[0.05] hover:text-black dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white">
          Only necessary
        </button>
        <button type="button" onClick={acceptCookies} className="rounded-full bg-[#2f8fe6] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#247dcb]">
          Accept analytics cookie
        </button>
      </div>
    </div>
  );
}
