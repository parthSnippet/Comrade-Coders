import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  Globe2,
  Workflow,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const floatingCards = [
  { icon: Code2, label: "Custom Software", sub: "Scalable & Secure", pos: "left-[3%] top-[22%]", delay: "0s" },
  { icon: Globe2, label: "Web & Mobile", sub: "Modern Interfaces", pos: "right-[2%] top-[18%]", delay: "0.8s" },
  { icon: Workflow, label: "AI Automation", sub: "Smart Workflows", pos: "bottom-[18%] left-[3%]", delay: "1.4s" },
  { icon: Bot, label: "AI & ERP/CRM", sub: "Intelligent Systems", pos: "bottom-[13%] right-[5%]", delay: "0.4s" },
];

const COLORS = [
  "#58adff",
  "#7dd3fc",
  "#a78bfa",
  "#f472b6",
  "#2dd4bf",
  "#60a5fa",
  "#fbbf24",
  "#38bdf8",
  "#c084fc",
  "#f87171",
];

const COUNT = 90;

interface Particle {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  color: string;
  angle: number;
}

function ParticleCanvas({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const section = sectionRef.current;

    if (!section) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    window.addEventListener("resize", resize);

    particles.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      ox: 0,
      oy: 0,
      vx: 0,
      vy: 0,
      w: Math.random() * 3 + 2,
      h: Math.random() * 6 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * Math.PI * 2,
    }));

    particles.current.forEach((particle) => {
      particle.ox = particle.x;
      particle.oy = particle.y;
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      const ATTRACT_RADIUS = 220;
      const ATTRACT_STRENGTH = 0.18;
      const RETURN_STRENGTH = 0.04;
      const DAMPING = 0.78;

      for (const particle of particles.current) {
        const dx = mx - particle.x;
        const dy = my - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ATTRACT_RADIUS && mx > 0) {
          const force = (ATTRACT_RADIUS - dist) / ATTRACT_RADIUS;

          particle.vx += dx * force * ATTRACT_STRENGTH;
          particle.vy += dy * force * ATTRACT_STRENGTH;
        }

        particle.vx +=
          (particle.ox - particle.x) * RETURN_STRENGTH;

        particle.vy +=
          (particle.oy - particle.y) * RETURN_STRENGTH;

        particle.vx *= DAMPING;
        particle.vy *= DAMPING;

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.angle += 0.01;

        ctx.save();

        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.angle);

        ctx.globalAlpha = 0.75;
        ctx.fillStyle = particle.color;

        ctx.beginPath();

        ctx.roundRect(
          -particle.w / 2,
          -particle.h / 2,
          particle.w,
          particle.h,
          particle.w / 2
        );

        ctx.fill();

        ctx.restore();
      }

      raf.current = requestAnimationFrame(draw);
    };

    draw();

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      mouse.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onLeave = () => {
      mouse.current = {
        x: -9999,
        y: -9999,
      };
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf.current);

      window.removeEventListener("resize", resize);

      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
    />
  );
}

function GlobOrb({ cursor }: { cursor: { x: number; y: number } }) {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 420;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const R = 155;

    // Latitude + longitude lines
    const LAT_LINES = 9;
    const LON_LINES = 12;

    const draw = () => {
      timeRef.current += 0.004;
      const t = timeRef.current;

      // tilt based on cursor (cursor is 0-100)
      const tiltX = ((cursor.y - 50) / 50) * 0.35;
      const tiltY = ((cursor.x - 50) / 50) * 0.35;

      ctx.clearRect(0, 0, SIZE, SIZE);

      // ── Outer glow ──
      const glow = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 1.35);
      glow.addColorStop(0, isDark ? "rgba(88,173,255,0.13)" : "rgba(50,143,232,0.10)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // ── Globe sphere fill ──
      const sphereGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      if (isDark) {
        sphereGrad.addColorStop(0, "rgba(30,60,100,0.55)");
        sphereGrad.addColorStop(0.5, "rgba(10,20,45,0.70)");
        sphereGrad.addColorStop(1, "rgba(5,10,25,0.85)");
      } else {
        sphereGrad.addColorStop(0, "rgba(200,225,255,0.60)");
        sphereGrad.addColorStop(0.5, "rgba(160,200,245,0.50)");
        sphereGrad.addColorStop(1, "rgba(100,160,230,0.40)");
      }
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // ── Helper: project 3D point on sphere to 2D canvas ──
      const project = (lat: number, lon: number): [number, number, number] => {
        // 3D point on unit sphere
        let x = Math.cos(lat) * Math.sin(lon);
        let y = Math.sin(lat);
        let z = Math.cos(lat) * Math.cos(lon);
        // apply tilt rotation (X axis)
        const y1 = y * Math.cos(tiltX) - z * Math.sin(tiltX);
        const z1 = y * Math.sin(tiltX) + z * Math.cos(tiltX);
        y = y1; z = z1;
        // apply tilt rotation (Y axis)
        const x1 = x * Math.cos(tiltY) + z * Math.sin(tiltY);
        const z2 = -x * Math.sin(tiltY) + z * Math.cos(tiltY);
        x = x1;
        return [cx + x * R, cy - y * R, z2];
      };

      const lineColor = (z: number) => {
        const alpha = isDark
          ? 0.12 + (z + 1) * 0.22
          : 0.10 + (z + 1) * 0.18;
        return isDark
          ? `rgba(88,173,255,${alpha.toFixed(2)})`
          : `rgba(50,143,232,${alpha.toFixed(2)})`;
      };

      const SEGMENTS = 64;

      // ── Latitude lines ──
      for (let i = 1; i < LAT_LINES; i++) {
        const lat = -Math.PI / 2 + (Math.PI / LAT_LINES) * i;
        ctx.beginPath();
        let avgZ = 0;
        for (let j = 0; j <= SEGMENTS; j++) {
          const lon = (Math.PI * 2 / SEGMENTS) * j + t;
          const [px, py, pz] = project(lat, lon);
          avgZ += pz;
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = lineColor(avgZ / SEGMENTS);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // ── Longitude lines ──
      for (let i = 0; i < LON_LINES; i++) {
        const lon = (Math.PI * 2 / LON_LINES) * i + t;
        ctx.beginPath();
        let avgZ = 0;
        for (let j = 0; j <= SEGMENTS; j++) {
          const lat = -Math.PI / 2 + (Math.PI / SEGMENTS) * j;
          const [px, py, pz] = project(lat, lon);
          avgZ += pz;
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = lineColor(avgZ / SEGMENTS);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // ── Highlight shimmer ──
      const shimmer = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.38, 0, cx - R * 0.2, cy - R * 0.2, R * 0.7);
      shimmer.addColorStop(0, isDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.45)");
      shimmer.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = shimmer;
      ctx.fill();

      // ── Border ring ──
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(88,173,255,0.18)" : "rgba(50,143,232,0.20)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [isDark, cursor]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ imageRendering: "crisp-edges" }}
    />
  );
}

function Hero() {

  const [cursor, setCursor] = useState({
    x: 50,
    y: 50,
  });

  const sectionRef = useRef<HTMLElement>(null);

  const handlePointerMove = (
    event: React.PointerEvent<HTMLElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    setCursor({
      x,
      y,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-white pt-20 text-[#05070b] dark:bg-[#05070b] dark:text-white"
      onPointerMove={handlePointerMove}
      onPointerLeave={() =>
        setCursor({
          x: 50,
          y: 50,
        })
      }
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[18%] h-[360px] w-[360px] rounded-full bg-[#328fe8]/6 blur-[80px] dark:bg-[#328fe8]/10" />

        <div className="absolute right-[5%] top-[25%] h-[400px] w-[400px] rounded-full bg-[#58adff]/5 blur-[90px] dark:bg-[#58adff]/8" />

        <div className="absolute bottom-[-10%] left-1/2 h-[280px] w-[560px] -translate-x-1/2 rounded-full bg-[#328fe8]/5 blur-[80px] dark:bg-[#328fe8]/8" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <ParticleCanvas sectionRef={sectionRef} />
      </div>

      {/* Main Content */}
      <div className="relative z-[2] mx-auto flex min-h-[calc(100vh-80px)] max-w-[1280px] items-center px-5 py-08 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">

          {/* LEFT */}
          <div className="animate-fadein">

            {/* Heading */}
            <h1 className="font-['Montserrat'] text-[clamp(2.6rem,5vw,5rem)] font-bold leading-[1.1] tracking-[-0.04em]">
              Technology That
              <br />

              <span className="inline-block bg-gradient-to-r from-[#05070b] via-[#1a6fc4] to-[#2f8fe6] bg-clip-text pr-1 text-transparent dark:from-white dark:via-white dark:to-[#58adff]">
                Moves Business
              </span>

              <br />

              Forward.
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-[520px] text-base leading-7 text-black/55 sm:text-[17px] sm:leading-8 dark:text-white/55">
              We turn complex business challenges into simple,
              scalable digital solutions through software,
              automation, AI and modern IT solutions.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#58adff] to-[#328fe8] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(50,143,232,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(50,143,232,0.40)]"
              >
                Start a Project

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="#services"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-black/[0.12] bg-black/[0.04] px-6 text-sm font-semibold text-black/70 transition-all duration-300 hover:border-black/[0.20] hover:bg-black/[0.08] hover:text-black dark:border-white/[0.14] dark:bg-white/[0.035] dark:text-white/80 dark:hover:border-white/[0.25] dark:hover:bg-white/[0.07] dark:hover:text-white"
              >
                Explore Solutions

                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          {/* RIGHT VISUAL — Interactive Glob */}
          <div className="relative mx-auto w-full max-w-[460px] animate-fadein-right">
            <div className="relative aspect-square">

              {/* Glob */}
              <div className="absolute left-1/2 top-1/2 z-10 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 sm:h-[400px] sm:w-[400px]">
                <GlobOrb cursor={cursor} />
              </div>

              {/* Floating Cards */}
              {floatingCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`absolute z-20 ${item.pos} animate-float flex items-center gap-3 rounded-2xl border border-black/[0.08] bg-white/90 px-4 py-3 shadow-[0_6px_20px_rgba(0,0,0,0.08)] dark:border-white/[0.10] dark:bg-[#0d1520]/90 dark:shadow-[0_6px_20px_rgba(0,0,0,0.30)]`}
                    style={{
                      animationDelay: item.delay,
                      transform: `translate(${(cursor.x - 50) * 0.45}px, ${(cursor.y - 50) * 0.45}px)`,
                      transition: "transform 0.18s ease-out",
                    }}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#58adff]/15 bg-[#58adff]/10">
                      <Icon size={16} strokeWidth={1.7} className="text-[#58adff]" />
                    </div>
                    <span className="flex flex-col">
                      <span className="text-xs font-semibold text-black/80 dark:text-white/85">{item.label}</span>
                      <span className="text-[10px] text-black/40 dark:text-white/40">{item.sub}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-white to-transparent dark:from-[#05070b]" />
    </section>
  );
}

export default Hero;