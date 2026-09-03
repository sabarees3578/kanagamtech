import { useEffect, useMemo, useRef, useState } from "react";
import { drawScene, type SceneState } from "@/lib/quantum-scene";
import { KanagamLogo } from "@/components/KanagamLogo";

const T = {
  genesis: 700,
  assembleEnd: 4700,
  igniteAt: 4500,
  logoAt: 5100,
  taglineAt: 5900,
  handoffAt: 8400,
  handoffDur: 1400,
};

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function QuantumIntro({
  brand,
  tagline,
  onComplete,
}: {
  brand: string;
  tagline: string;
  onComplete: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    const start = performance.now();
    let done = false;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (now: number) => {
      const e = now - start;
      setElapsed(e);
      const assemble = clamp01((e - T.genesis) / (T.assembleEnd - T.genesis));
      const ig = clamp01((e - T.igniteAt) / 1100);
      const handoff = clamp01((e - T.handoffAt) / T.handoffDur);

      const st: SceneState = {
        assemble,
        ignite: ig < 1 ? Math.sin(ig * Math.PI) : 0,
        zoom: 1 + easeInOut(handoff) * 0.9,
        alpha: 1 - easeInOut(handoff) * 0.92,
        time: e / 1000,
        reduced,
      };
      ctx.clearRect(0, 0, w, h);
      drawScene(ctx, w, h, st);

      if (!done && handoff >= 1) {
        done = true;
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 700);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logo = clamp01((elapsed - T.logoAt) / 900);
  const tagChars = Math.floor(clamp01((elapsed - T.taglineAt) / 1500) * tagline.length);
  const progress = clamp01(elapsed / T.handoffAt);
  const fadeOut = clamp01((elapsed - T.handoffAt) / T.handoffDur);
  const uiAlpha = isExiting ? 0 : 1 - fadeOut;
  // progress indicator clears out just before the camera zoom begins
  const loaderAlpha = 1 - easeInOut(clamp01((elapsed - (T.handoffAt - 650)) / 650));

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-background transition-opacity duration-700 ease-in-out ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-stage)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:var(--grain)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      <div
        className="absolute inset-x-0 bottom-[6vh] sm:bottom-[8vh] flex flex-col items-center gap-3 sm:gap-5 px-4 sm:px-6 text-center md:bottom-[10vh]"
        style={{ opacity: uiAlpha }}
      >
        <div
          style={{
            opacity: logo,
            filter: `blur(${(1 - logo) * 14}px)`,
            transform: `scale(${0.96 + logo * 0.04})`,
          }}
          className="flex flex-col items-center gap-3"
        >
          <KanagamLogo size="xl" mode="auto" />
        </div>
        <p className="min-h-[1.4em] text-[clamp(0.65rem,1.9vw,0.8rem)] font-medium tracking-[0.3em] text-muted-foreground uppercase font-mono mt-1">
          {tagline.slice(0, tagChars)}
          <span className="text-[#D7AB6A]">{tagChars < tagline.length ? "▍" : ""}</span>
        </p>

        <div
          className="flex flex-col items-center gap-3"
          style={{
            opacity: loaderAlpha,
            transform: `translateY(${(1 - loaderAlpha) * 6}px)`,
          }}
        >
          <div
            className="mt-3 h-0.5 w-[min(280px,60vw)] overflow-hidden rounded-full bg-border/40"
            role="progressbar"
            aria-label="Intro loading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <div
              className="h-full bg-[image:var(--gradient-gold)] transition-[width] duration-150 ease-out shadow-[0_0_12px_#D7AB6A]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-[0.6rem] tracking-[0.3em] text-muted-foreground/80 tabular-nums font-mono">
            {String(Math.round(progress * 100)).padStart(3, "0")} % · INITIALIZING QUANTUM CORE
          </span>
        </div>
      </div>
    </div>
  );
}
