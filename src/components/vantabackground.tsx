import { useEffect, useRef } from "react";
import * as THREE from "three";

type VantaEffect = (options: Record<string, unknown>) => { destroy: () => void };

function resolveVantaEffect(module: unknown): VantaEffect {
  let candidate = module;

  for (let depth = 0; depth < 3 && typeof candidate !== "function"; depth += 1) {
    if (!candidate || typeof candidate !== "object" || !("default" in candidate)) break;
    candidate = (candidate as { default: unknown }).default;
  }

  if (typeof candidate !== "function") {
    throw new Error("Unable to load the Vanta Birds effect.");
  }

  return candidate as VantaEffect;
}

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    const element = vantaRef.current;
    if (!element) return;

    let disposed = false;
    const previousThree = (window as Window & { THREE?: typeof THREE }).THREE;
    (window as Window & { THREE?: typeof THREE }).THREE = THREE;

    import("vanta/dist/vanta.birds.min")
      .then((birdsModule) => {
        if (disposed) return;

        const BIRDS = resolveVantaEffect(birdsModule);
        effectRef.current = BIRDS({
          el: element,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          backgroundColor: 0x05070b,
          backgroundAlpha: 1,
          color1: 0x58adff,
          color2: 0xffffff,
          colorMode: "varianceGradient",
          quantity: 14,
          birdSize: 1.5,
          wingSpan: 38,
          speedLimit: 5,
          separation: 20,
          alignment: 20,
          cohesion: 20,
        });
      })
      .catch((error: unknown) => {
        if (!disposed) console.error("Unable to initialize Vanta Birds.", error);
      });

    return () => {
      disposed = true;
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
      (window as Window & { THREE?: typeof THREE }).THREE = previousThree;
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] [&>canvas]:!h-full [&>canvas]:!w-full"
    />
  );
}