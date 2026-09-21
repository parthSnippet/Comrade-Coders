import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ComeradeScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => {
        return Math.max(Math.ceil(track.scrollWidth - section.clientWidth), 0);
      };

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[52vh] min-h-[320px] overflow-hidden bg-white dark:bg-black"
    >
      <div
        ref={trackRef}
        className="relative z-10 flex h-full w-max min-w-max items-center will-change-transform"
      >
        <div className="h-full w-screen shrink-0" />

        <div className="flex shrink-0 items-center">
          <h2 className="inline-block pr-[0.12em] whitespace-nowrap bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-300 bg-clip-text text-[18vw] font-semibold leading-none tracking-[-0.08em] text-transparent sm:text-[13vw] md:text-[8vw] xl:text-[7vw]">
            COMRADE CODERS
          </h2>
        </div>

        <div className="h-full w-screen shrink-0" />

      </div>

      {/* Small fixed label */}
      <div className="pointer-events-none absolute bottom-5 left-5 z-20 md:bottom-8 md:left-8">
        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500/70 dark:text-slate-300/70 md:text-xs">
          Technology That Moves Business Forward
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-5 right-5 z-20 flex items-center gap-3 md:bottom-8 md:right-8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500/70 dark:text-slate-300/70 md:text-xs">
          Scroll
        </span>

        <span className="h-px w-10 bg-slate-500/35 dark:bg-white/35 md:w-12" />
      </div>
    </section>
  );
}