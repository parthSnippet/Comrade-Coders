import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const W1 = "COMRADE";
const W2 = "CODERS";
const TOTAL = W1.length + W2.length;

export default function InlineLoader() {
  const { isDark } = useTheme();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= TOTAL) return;
    const t = setTimeout(() => setCount((c) => c + 1), 65);
    return () => clearTimeout(t);
  }, [count]);

  const w1 = W1.slice(0, Math.min(count, W1.length));
  const w2 = W2.slice(0, Math.max(0, count - W1.length));
  const showCursor = count < TOTAL;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-start leading-none select-none">
        <div className="flex">
          {W1.split("").map((ch, i) => (
            <span
              key={i}
              className="font-['Montserrat'] text-[1.1rem] font-bold tracking-[0.18em] transition-all duration-75"
              style={{
                opacity: i < w1.length ? 1 : 0,
                color: i < w1.length ? (isDark ? '#ffffff' : '#05070b') : "transparent",
                transform: i < w1.length ? "translateY(0)" : "translateY(4px)",
              }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div className="flex">
          {W2.split("").map((ch, i) => (
            <span
              key={i}
              className="font-['Montserrat'] text-[1.1rem] font-bold tracking-[0.18em] transition-all duration-75"
              style={{
                opacity: i < w2.length ? 1 : 0,
                color: i < w2.length ? "#2f8fe6" : "transparent",
                transform: i < w2.length ? "translateY(0)" : "translateY(4px)",
              }}
            >
              {ch}
            </span>
          ))}
          {showCursor && (
            <span className="ml-0.5 inline-block h-[1.1rem] w-[2px] animate-[blink_0.7s_step-end_infinite] bg-[#58adff]" />
          )}
        </div>
      </div>

      {/* progress bar */}
      <div className="h-[2px] w-32 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] transition-all duration-75"
          style={{ width: `${(count / TOTAL) * 100}%` }}
        />
      </div>
    </div>
  );
}
