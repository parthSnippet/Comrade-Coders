import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const WORD1 = "COMRADE";
const WORD2 = "CODERS";
const TOTAL = WORD1.length + WORD2.length;

export default function PageLoader({ onDone }: { onDone: () => void }) {
  const { isDark } = useTheme();
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (count < TOTAL) {
      const t = setTimeout(() => setCount((c) => c + 1), 72);
      return () => clearTimeout(t);
    }
    // all letters typed — wait then exit
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 500);
    }, 520);
    return () => clearTimeout(t);
  }, [count, onDone]);

  const w1 = WORD1.slice(0, Math.min(count, WORD1.length));
  const w2 = WORD2.slice(0, Math.max(0, count - WORD1.length));
  const showCursor = count < TOTAL;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white dark:bg-[#05070b] transition-opacity duration-500 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f8fe6]/8 blur-[120px]" />
      </div>

      {/* bracket + text */}
      <div className="relative flex items-center gap-3 select-none">
        {/* opening bracket */}
        <span
          className="font-mono text-[0.95rem] font-light text-[#2f8fe6]/50 transition-opacity duration-300"
          style={{ opacity: count > 0 ? 1 : 0 }}
        >
          {"<"}
        </span>

        <div className="flex flex-col items-start leading-none">
          {/* COMRADE */}
          <div className="flex">
            {WORD1.split("").map((ch, i) => (
              <span
                key={i}
                className="font-['Montserrat'] text-[1.1rem] font-bold tracking-[0.18em] transition-all duration-100"
                style={{
                  opacity: i < w1.length ? 1 : 0,
                  color: i < w1.length ? (isDark ? '#ffffff' : '#05070b') : "transparent",
                  transform: i < w1.length ? "translateY(0)" : "translateY(6px)",
                }}
              >
                {ch}
              </span>
            ))}
          </div>

          {/* CODERS */}
          <div className="flex">
            {WORD2.split("").map((ch, i) => (
              <span
                key={i}
                className="font-['Montserrat'] text-[1.1rem] font-bold tracking-[0.18em] transition-all duration-100"
                style={{
                  opacity: i < w2.length ? 1 : 0,
                  color: i < w2.length ? "#2f8fe6" : "transparent",
                  transform: i < w2.length ? "translateY(0)" : "translateY(6px)",
                }}
              >
                {ch}
              </span>
            ))}
            {/* blinking cursor */}
            {showCursor && (
              <span className="ml-0.5 inline-block h-[1.1rem] w-[2px] animate-[blink_0.7s_step-end_infinite] bg-[#58adff]" />
            )}
          </div>
        </div>

        {/* closing bracket */}
        <span
          className="font-mono text-[0.95rem] font-light text-[#2f8fe6]/50 transition-opacity duration-300"
          style={{ opacity: count >= TOTAL ? 1 : 0 }}
        >
          {"/>"}
        </span>
      </div>

      {/* progress bar */}
      <div className="mt-10 h-[2px] w-48 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] transition-all duration-75"
          style={{ width: `${(count / TOTAL) * 100}%` }}
        />
      </div>

      {/* tagline */}
      <p
        className="mt-4 font-mono text-[11px] tracking-[0.22em] text-white/25 transition-opacity duration-500"
        style={{ opacity: count >= TOTAL ? 1 : 0 }}
      >
        DIGITAL & WORKFORCE SOLUTIONS
      </p>
    </div>
  );
}
