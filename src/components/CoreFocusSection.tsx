import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, ChevronRight } from "lucide-react";
import { PILLARS, type Pillar } from "@/lib/services";

export type { Pillar };

// 4-2-4 honeycomb: x/y coordinates in multiples of the tile pitch (SX, SY).
// Middle row (05-06) nests symmetrically into the outer gaps of rows 1 and 3.
const POS: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [0.5, 1],
  [2.5, 1],
  [0, 2],
  [1, 2],
  [2, 2],
  [3, 2],
];
const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
const PLUM_BG = "linear-gradient(150deg, #6d1f55 0%, #3d1538 38%, #2b0b30 68%, #18051e 100%)";
const RING_BG =
  "linear-gradient(160deg, rgba(240,196,120,0.95) 0%, rgba(168,64,128,0.6) 45%, rgba(215,171,106,0.55) 100%)";

function HexCard({
  pillar,
  index,
  active,
  dimmed,
  onEnter,
  onLeave,
  onTap,
  isMobile,
}: {
  pillar: Pillar;
  index: number;
  active: boolean;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onTap?: () => void;
  isMobile?: boolean;
}) {
  const Icon = pillar.icon;

  return (
    <Link
      to="/service/$slug"
      params={{ slug: pillar.id }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={(e) => {
        if (isMobile) {
          if (!active) {
            // First tap: toggle active state, do not navigate yet
            e.preventDefault();
            e.stopPropagation();
            onTap?.();
          }
          // If already active: allow standard <Link> navigation to proceed!
        }
      }}
      className={`group relative block h-full w-full outline-none transition-all duration-300 ease-out will-change-transform focus-visible:scale-110 ${
        active
          ? "z-30 scale-105 sm:scale-110"
          : dimmed
            ? "z-10 scale-95 opacity-50 sm:opacity-65"
            : "z-10 scale-100 opacity-100"
      }`}
    >
      {/* Hexagonal ring */}
      <span
        className={`absolute inset-0 transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-90"
        }`}
        style={{ clipPath: HEX_CLIP, background: RING_BG }}
      />
      {/* Hexagonal plum face */}
      <span
        className="absolute inset-[5px] sm:inset-[6px] md:inset-[7px] flex flex-col items-center justify-between overflow-hidden px-2 sm:px-3 md:px-7 py-3 sm:py-4 md:py-6 text-center"
        style={{
          clipPath: HEX_CLIP,
          background: PLUM_BG,
          backgroundSize: "170% 170%",
          animation: `kfBg 8s ease-in-out ${index * 0.3}s infinite`,
        }}
      >
        {/* Rotating sheen */}
        <span
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 20% 20%, rgba(215,171,106,0.22) 0%, rgba(255,255,255,0.05) 35%, transparent 60%)",
            animation: "kfSheen 6s ease-in-out infinite",
            animationDelay: `${index * 0.3}s`,
          }}
        />
        {/* Uniform coordinate shine — sweeps top-left -> bottom-right, then back */}
        <span className="kf-shine" />

        {/* Top bar: 01 and Readiness Badge */}
        <span className="relative z-10 flex w-full items-center justify-between px-1 text-[0.55rem] sm:text-[0.6rem] md:text-[0.62rem] font-mono font-bold tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] text-[#D7AB6A]">
          <span>0{index + 1}</span>
          <span
            className="rounded-full bg-black/40 border border-white/10 px-1.5 sm:px-2 py-0.5 text-[0.45rem] sm:text-[0.5rem] tracking-wider text-white/85 uppercase truncate max-w-[72px] sm:max-w-[90px] md:max-w-[110px]"
            title={pillar.readiness}
          >
            {pillar.readiness}
          </span>
        </span>

        {/* Center: Icon + Title */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full px-0.5">
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center rounded-lg sm:rounded-xl border border-[#D7AB6A]/40 bg-white/10 text-[#E8C576] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(215,171,106,0.55)]">
            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          </span>

          <h3 className="font-display mt-1 sm:mt-1.5 md:mt-2.5 text-[0.64rem] sm:text-[0.72rem] md:text-[0.82rem] leading-snug font-bold tracking-tight text-[#FFF3E4] [text-shadow:0_1px_8px_rgba(0,0,0,0.4)] line-clamp-2">
            {pillar.title}
          </h3>
        </div>

        {/* Bottom CTA: View Page */}
        <span className="relative z-10 inline-flex items-center gap-1 text-[0.48rem] sm:text-[0.55rem] md:text-[0.6rem] font-bold tracking-[0.14em] sm:tracking-[0.18em] md:tracking-[0.2em] text-[#D7AB6A] uppercase transition-colors">
          <span>{active && isMobile ? "Tap to Open" : "View Page"}</span>
          <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}

export function CoreFocusSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hexSize, setHexSize] = useState(236);
  const wrapRef = useRef<HTMLDivElement>(null);

  const activePillar = PILLARS.find((p) => p.id === activeId);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const next = Math.round(Math.min(Math.max(w / 4.75, 128), 250));
      setHexSize(next);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const HEX_W = hexSize;
  const GAP = 16;
  const HEX_H = Math.round(hexSize * (2 / Math.sqrt(3)));
  const SX = hexSize + GAP;
  const SY = Math.round(SX * (Math.sqrt(3) / 2));
  const PAD_X = Math.round(hexSize / 2);
  const PAD_Y = Math.round(HEX_H / 2);
  const DESC_W = PAD_X + 3 * SX + HEX_W / 2;
  const DESC_H = PAD_Y + 2 * SY + HEX_H / 2;

  return (
    <section
      id="focus"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-6 py-12 sm:py-16 md:py-24"
      onMouseLeave={() => setActiveId(null)}
    >
      <style>{`
        @keyframes kfFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes kfDiag { 0% { transform: translate(-140%, -140%); } 100% { transform: translate(140%, 140%); } }
        @keyframes kfSheen { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes kfBg { 0%,100% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } }
        .kf-shine { position: absolute; inset: -20%; z-index: 1;
          background: linear-gradient(135deg, transparent 42%, rgba(255,255,255,0.42) 50%, rgba(240,196,120,0.5) 56%, transparent 64%);
          mix-blend-mode: screen;
          animation: kfDiag 3.8s ease-in-out infinite alternate;
          pointer-events: none; }
      `}</style>

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            10 Core Technology Focus Pillars
          </div>
          <h2 className="font-display mt-4 text-[clamp(1.9rem,4vw,2.8rem)] font-bold tracking-tight text-foreground">
            Our Key Focus Areas
          </h2>
        </div>
        <p className="max-w-md text-sm font-normal text-muted-foreground leading-relaxed">
          Pioneering deep-tech innovations across quantum systems, semiconductors &amp; VLSI,
          embedded &amp; edge AI, drones, additive manufacturing, and workforce skill development.
        </p>
      </div>

      {/* Honeycomb — desktop, fills the full available width */}
      <div ref={wrapRef} className="mt-12 hidden w-full md:block">
        <div className="relative mx-auto" style={{ width: DESC_W, height: DESC_H }}>
          {PILLARS.map((pillar, i) => {
            const [px, py] = POS[i];
            const centerX = px * SX;
            const centerY = py * SY;
            const left = PAD_X + centerX - HEX_W / 2;
            const top = PAD_Y + centerY - HEX_H / 2;
            return (
              <div
                key={pillar.id}
                className="absolute"
                style={{
                  left,
                  top,
                  width: HEX_W,
                  height: HEX_H,
                  animation: `kfFloat 6s ease-in-out ${i * 0.35}s infinite`,
                  filter:
                    activeId === pillar.id
                      ? "drop-shadow(0 18px 38px rgba(61,21,56,0.65)) drop-shadow(0 0 24px rgba(122,42,99,0.5))"
                      : "drop-shadow(0 8px 18px rgba(24,5,30,0.55)) drop-shadow(0 0 12px rgba(109,31,85,0.35))",
                }}
              >
                <HexCard
                  pillar={pillar}
                  index={i}
                  active={activeId === pillar.id}
                  dimmed={activeId !== null && activeId !== pillar.id}
                  onEnter={() => setActiveId(pillar.id)}
                  onLeave={() => setActiveId(null)}
                />
              </div>
            );
          })}

          {/* Brand mark — fills the center gap between the two middle hexes */}
          <div
            className="pointer-events-none absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
            style={{ left: PAD_X + 1.5 * SX, top: PAD_Y + SY, width: SX }}
          >
            <span className="font-display bg-gradient-to-b from-[#F6DFAE] via-[#E8C576] to-[#B9853F] bg-clip-text pb-1 pr-0.5 text-[clamp(1.05rem,2vw,1.6rem)] leading-[1.2] font-bold tracking-tight text-transparent">
              Kanagam
            </span>
            <span className="mt-1.5 text-[0.45rem] font-mono font-bold tracking-[0.22em] whitespace-nowrap text-[#D7AB6A]/90 uppercase">
              Technology Solution
            </span>
          </div>
        </div>
      </div>

      {/* Honeycomb — mobile (authentic 2-column staggered interlocking lattice) */}
      <div className="mt-8 md:hidden">
        {/* Interactive guidance pill */}
        <div className="mb-4 flex justify-center px-2">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[0.65rem] tracking-wider font-mono transition-all duration-300 ${
              activePillar
                ? "border-[#D7AB6A]/60 bg-[#D7AB6A]/15 text-[#E8C576] shadow-[0_0_15px_rgba(215,171,106,0.25)]"
                : "border-primary/20 bg-card/60 text-muted-foreground"
            }`}
          >
            <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            {activePillar ? (
              <span className="truncate max-w-[280px]">
                <strong className="text-foreground">{activePillar.title}</strong> — Tap again to open →
              </span>
            ) : (
              <span>Tap a hexagon to toggle • Tap again to open</span>
            )}
          </div>
        </div>

        {/* 2-column interlocking honeycomb container */}
        <div
          className="mx-auto flex max-w-[420px] justify-center gap-2 sm:gap-3 px-1"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveId(null);
            }
          }}
        >
          {/* Column 1 (Even indexed pillars: 01, 03, 05, 07, 09) */}
          <div className="flex flex-1 flex-col -space-y-4 sm:-space-y-6">
            {PILLARS.filter((_, i) => i % 2 === 0).map((pillar) => {
              const originalIndex = PILLARS.findIndex((p) => p.id === pillar.id);
              const isActive = activeId === pillar.id;
              const isDimmed = activeId !== null && !isActive;
              return (
                <div
                  key={pillar.id}
                  className="relative w-full transition-all duration-300"
                  style={{
                    aspectRatio: "1 / 1.155",
                    animation: `kfFloat 6s ease-in-out ${originalIndex * 0.35}s infinite`,
                    filter: isActive
                      ? "drop-shadow(0 14px 28px rgba(61,21,56,0.75)) drop-shadow(0 0 20px rgba(215,171,106,0.6))"
                      : "drop-shadow(0 6px 14px rgba(24,5,30,0.5)) drop-shadow(0 0 10px rgba(109,31,85,0.3))",
                    zIndex: isActive ? 30 : 10,
                  }}
                >
                  <HexCard
                    pillar={pillar}
                    index={originalIndex}
                    active={isActive}
                    dimmed={isDimmed}
                    onEnter={() => setActiveId(pillar.id)}
                    onLeave={() => setActiveId(null)}
                    onTap={() => setActiveId(isActive ? null : pillar.id)}
                    isMobile
                  />
                </div>
              );
            })}
          </div>

          {/* Column 2 (Odd indexed pillars: 02, 04, 06, 08, 10) — staggered downwards */}
          <div className="flex flex-1 flex-col -space-y-4 sm:-space-y-6 pt-10 sm:pt-14">
            {PILLARS.filter((_, i) => i % 2 === 1).map((pillar) => {
              const originalIndex = PILLARS.findIndex((p) => p.id === pillar.id);
              const isActive = activeId === pillar.id;
              const isDimmed = activeId !== null && !isActive;
              return (
                <div
                  key={pillar.id}
                  className="relative w-full transition-all duration-300"
                  style={{
                    aspectRatio: "1 / 1.155",
                    animation: `kfFloat 6s ease-in-out ${originalIndex * 0.35}s infinite`,
                    filter: isActive
                      ? "drop-shadow(0 14px 28px rgba(61,21,56,0.75)) drop-shadow(0 0 20px rgba(215,171,106,0.6))"
                      : "drop-shadow(0 6px 14px rgba(24,5,30,0.5)) drop-shadow(0 0 10px rgba(109,31,85,0.3))",
                    zIndex: isActive ? 30 : 10,
                  }}
                >
                  <HexCard
                    pillar={pillar}
                    index={originalIndex}
                    active={isActive}
                    dimmed={isDimmed}
                    onEnter={() => setActiveId(pillar.id)}
                    onLeave={() => setActiveId(null)}
                    onTap={() => setActiveId(isActive ? null : pillar.id)}
                    isMobile
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* All Ten Key Focus Areas — each opens its own service page */}
      <div className="mt-16 rounded-2xl border border-primary/30 bg-card/80 p-6 shadow-lg backdrop-blur-md">
        <h5 className="text-center text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
          All Ten Key Focus Areas
        </h5>
        <ul className="mt-4 grid gap-1 grid-cols-1 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <li key={pillar.id}>
              <Link
                to="/service/$slug"
                params={{ slug: pillar.id }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-normal text-foreground transition-colors hover:bg-secondary/60 hover:text-primary"
              >
                <span className="font-mono text-[0.6rem] tracking-widest text-muted-foreground/70">
                  0{i + 1}
                </span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
                <span>{pillar.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
