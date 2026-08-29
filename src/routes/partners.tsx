import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { KanagamLogo } from "@/components/KanagamLogo";
import { ShiningBackground } from "@/components/ShiningBackground";
import { ArrowLeft, Handshake } from "lucide-react";

const PARTNERS = [
  { name: "ACCURA TECQ", src: "/partners img/ACCURA TECQ.jpeg" },
  { name: "AMSEMS", src: "/partners img/AMSEMS.jpeg" },
  { name: "ARK", src: "/partners img/ARK.jpeg" },
  { name: "QUANTUMMATE", src: "/partners img/QUANTUMMATE.jpeg" },
  { name: "RPBD", src: "/partners img/RPBD.jpeg" },
  { name: "SILICON SYSTEM", src: "/partners img/SILICON SYSTEM.jpeg" },
  { name: "ZORA TECH", src: "/partners img/ZORA TECH.jpeg" },
];

const DUST = [
  { left: 8, bottom: 34, size: 7, dur: 9, delay: 0 },
  { left: 16, bottom: 22, size: 5, dur: 7.5, delay: 1.4 },
  { left: 27, bottom: 40, size: 6, dur: 10, delay: 3.2 },
  { left: 38, bottom: 18, size: 4, dur: 6.5, delay: 0.8 },
  { left: 55, bottom: 30, size: 6, dur: 8.5, delay: 2.2 },
  { left: 64, bottom: 44, size: 5, dur: 9.5, delay: 4.1 },
  { left: 74, bottom: 20, size: 4, dur: 7, delay: 5 },
  { left: 82, bottom: 36, size: 7, dur: 9.8, delay: 1.8 },
  { left: 90, bottom: 24, size: 5, dur: 8, delay: 3.6 },
  { left: 5, bottom: 52, size: 5, dur: 8.2, delay: 2.6 },
  { left: 46, bottom: 50, size: 4, dur: 7.2, delay: 5.4 },
  { left: 94, bottom: 48, size: 5, dur: 8.8, delay: 0.5 },
];

const ORBIT_KEYS = `
  @keyframes kbsSpin { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
  @keyframes kbsSpinRev { 0% { transform: rotateY(360deg); } 100% { transform: rotateY(0deg); } }
  @keyframes kbsSweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes kbsHaloSpin { 0% { transform: translate(-50%,-50%) rotateX(74deg) rotateZ(0deg); } 100% { transform: translate(-50%,-50%) rotateX(74deg) rotateZ(360deg); } }
  @keyframes kbsHaloSpinRev { 0% { transform: translate(-50%,-50%) rotateX(76deg) rotateZ(360deg); } 100% { transform: translate(-50%,-50%) rotateX(76deg) rotateZ(0deg); } }
  @keyframes kbsBob { 0%,100% { transform: translateY(-16px); } 50% { transform: translateY(18px); } }
  @keyframes kbsRise { 0% { transform: translateY(0); opacity: 0; } 12% { opacity: 0.9; } 100% { transform: translateY(-260px); opacity: 0; } }
  @keyframes kbsCore { 0% { transform: rotateX(70deg) rotateZ(0deg); } 100% { transform: rotateX(70deg) rotateZ(360deg); } }
  @keyframes kbsCoreRev { 0% { transform: rotateX(70deg) rotateZ(360deg); } 100% { transform: rotateX(70deg) rotateZ(0deg); } }
  @keyframes kbsNucleus { 0%,100% { opacity: 0.55; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.2); } }
  @keyframes kbsPulseGlow { 0%,100% { opacity: 0.45; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.08); } }
  @keyframes kbsFloatDot { 0%,100% { opacity: 0.2; } 50% { opacity: 0.9; } }
  @keyframes kbsShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  .kbs-stage { --kbsR: 320px; perspective: 1500px; }
  @media (min-width: 640px) { .kbs-stage { --kbsR: 430px; } }
  @media (min-width: 1024px) { .kbs-stage { --kbsR: 540px; } }
  .kbs-tilt { position: absolute; inset: 0; transform-style: preserve-3d; transform: rotateX(12deg); }
  .kbs-ring { position: absolute; inset: 0; transform-style: preserve-3d; animation: kbsSpin 40s linear infinite; }
  .kbs-bob { will-change: transform; animation: kbsBob 40s ease-in-out infinite; }
  .kbs-beam { background-image: conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(240,196,120,0.12) 14deg, transparent 32deg, transparent 118deg, rgba(255,255,255,0.07) 142deg, transparent 172deg, transparent 248deg, rgba(215,171,106,0.09) 270deg, transparent 302deg); mix-blend-mode: screen; display: none; }
  @media (min-width: 640px) { .kbs-beam { display: block; } }
  .kbs-halo, .kbs-halo2 { position: absolute; left: 50%; top: 50%; border-radius: 9999px; will-change: transform; }
  .kbs-halo { width: calc(var(--kbsR) * 2.2); height: calc(var(--kbsR) * 2.2); border: 1.5px solid rgba(240,196,120,0.5); box-shadow: 0 0 40px rgba(240,196,120,0.18), inset 0 0 60px rgba(240,196,120,0.08); transform: translate(-50%,-50%) rotateX(74deg) rotateZ(0deg); animation: kbsHaloSpin 26s linear infinite; }
  .kbs-halo2 { width: calc(var(--kbsR) * 1.6); height: calc(var(--kbsR) * 1.6); border: 1px dashed rgba(240,196,120,0.35); transform: translate(-50%,-50%) rotateX(76deg) rotateZ(0deg); animation: kbsHaloSpinRev 34s linear infinite; }
  .kbs-comet { position: absolute; left: 50%; top: 50%; width: 10px; height: 10px; border-radius: 9999px; background: #D7AB6A; box-shadow: 0 0 14px 3px rgba(240,196,120,0.7); animation: kbsFloatDot 3s ease-in-out infinite; }
  .kbs-core-ring, .kbs-core-ring2 { position: absolute; border-radius: 9999px; }
  .kbs-core-ring { inset: 0; border: 1.5px solid rgba(240,196,120,0.55); box-shadow: 0 0 24px rgba(240,196,120,0.12), inset 0 0 18px rgba(240,196,120,0.1); transform: rotateX(70deg) rotateZ(0deg); animation: kbsCore 9s linear infinite; }
  .kbs-core-ring2 { inset: 22%; border: 1px dashed rgba(240,196,120,0.45); transform: rotateX(70deg) rotateZ(0deg); animation: kbsCoreRev 12s linear infinite; }
  .kbs-nucleus { position: absolute; left: 50%; top: 50%; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 9999px; background: radial-gradient(circle, #FBE7C8 0%, #D7AB6A 55%, rgba(215,171,106,0.25) 100%); box-shadow: 0 0 26px 8px rgba(240,196,120,0.55); animation: kbsNucleus 2.6s ease-in-out infinite; }
  .kbs-dust { position: absolute; border-radius: 9999px; background: radial-gradient(circle, rgba(240,196,120,0.9) 0%, rgba(215,171,106,0.15) 70%); animation: kbsRise ease-in-out infinite; will-change: transform, opacity; }
  .kbs-shine { position: absolute; inset: 0; border-radius: inherit; background-image: linear-gradient(115deg, transparent 30%, rgba(240,196,120,0.2) 44%, rgba(255,255,255,0.32) 50%, rgba(240,196,120,0.2) 56%, transparent 70%); background-size: 250% 100%; background-repeat: no-repeat; pointer-events: none; mix-blend-mode: screen; animation: kbsShimmer 3.2s linear infinite; }
  @media (prefers-reduced-motion: reduce) {
    .kbs-ring, .kbs-halo, .kbs-halo2, .kbs-beam, .kbs-bob, .kbs-comet, .kbs-comets, .kbs-core-ring, .kbs-core-ring2, .kbs-nucleus, .kbs-dust, .kbs-shine { animation: none !important; }
    .kbs-stage { display: none; }
    .kbs-static { display: flex; }
  }
`;

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Our Partners | Kanagam Technology Solutions" },
      {
        name: "description",
        content:
          "Kanagam Technology Solutions partners with world-class deep-tech companies across quantum computing, semiconductors, AI, embedded systems and more — building tomorrow's digital frontier together.",
      },
      {
        name: "keywords",
        content:
          "Kanagam Technology Solutions partners, deep-tech partner companies, quantum computing partners, semiconductor partners, VLSI partners, AI partners, embedded systems partners",
      },
      { property: "og:title", content: "Our Partners — Kanagam Technology Solutions" },
      {
        property: "og:description",
        content:
          "Explore the ecosystem of deep-tech companies partnered with Kanagam Technology Solutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kanagamtech.in/partners" },
    ],
    links: [{ rel: "canonical", href: "https://kanagamtech.in/partners" }],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden font-sans"
      style={
        {
          background: "linear-gradient(155deg, #5f1f4d 0%, #3a1631 32%, #230824 64%, #120317 100%)",
          ["--background"]: "#130417",
          ["--foreground"]: "#F7EDE3",
          ["--muted-foreground"]: "#D0B8A8",
          ["--card"]: "#1d0824",
          ["--card-foreground"]: "#F7EDE3",
          ["--border"]: "rgba(240,196,120,0.24)",
        } as CSSProperties
      }
    >
      <style>{ORBIT_KEYS}</style>
      <ShiningBackground variant="strong" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:var(--grain)]" />

      {/* Simple Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-3">
            <KanagamLogo size="md" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[0.65rem] tracking-[0.2em] text-foreground uppercase font-semibold transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-6 pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase">
            <Handshake className="h-3.5 w-3.5" />
            Our Ecosystem
          </div>
          <h1 className="font-display mt-3 text-[clamp(2rem,5vw,3rem)] leading-tight font-bold tracking-tight text-foreground">
            Partners in Deep-Tech
          </h1>
        </div>

        {/* 3D orbiting partner logos — full-width motion theme animation */}
        <div className="relative left-1/2 -translate-x-1/2 mt-0 w-screen overflow-hidden">
          <OrbitStage />
        </div>

        <p className="mt-6 text-center text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
          Trusted by world-class companies across the deep-tech spectrum
        </p>
      </section>
    </main>
  );
}

function OrbitStage() {
  const doubled = [...PARTNERS, ...PARTNERS];
  const step = 360 / doubled.length;
  const cometAngles = [30, 110, 190, 270];
  return (
    <div className="kbs-stage relative mx-auto h-[620px] w-full sm:h-[780px] lg:h-[920px]">
      {/* Tilted 3D canvas — logos + planetary halos spin together */}
      <div className="kbs-tilt">
        <div className="kbs-ring">
          {doubled.map((partner, i) => (
            <OrbitCard
              key={`${partner.name}-${i}`}
              name={partner.name}
              src={partner.src}
              angle={i * step}
            />
          ))}
        </div>

        {/* Planetary halo rings */}
        <div className="kbs-halo" />
        <div className="kbs-halo2" />
      </div>

      {/* Fast counter-rotating light dots */}
      <div
        className="kbs-comets absolute inset-0"
        style={{ transformStyle: "preserve-3d", animation: "kbsSpinRev 24s linear infinite" }}
      >
        {cometAngles.map((a) => (
          <div
            key={a}
            className="kbs-comet"
            style={{
              transform: `translate(-50%, -50%) rotateY(${a}deg) translateZ(calc(var(--kbsR) * 0.86))`,
            }}
          />
        ))}
      </div>

      {/* Sweeping golden light — cinematic motion across the logos */}
      <div
        className="kbs-beam pointer-events-none absolute inset-0 z-[5]"
        style={{ animation: "kbsSweep 16s linear infinite" }}
      />

      {/* Spinning quantum core — engine of the partnership */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div
          className="absolute h-72 w-72 rounded-full sm:h-96 sm:w-96"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(240,196,120,0.2) 0%, rgba(215,171,106,0.05) 55%, transparent 75%)",
            animation: "kbsPulseGlow 6s ease-in-out infinite",
          }}
        />
        <div className="relative h-36 w-36 sm:h-44 sm:w-44">
          <div className="kbs-core-ring" />
          <div className="kbs-core-ring2" />
          <div
            className="kbs-nucleus"
            style={{ animation: "kbsNucleus 2.6s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Rising ember dust — ambient particles */}
      {DUST.map((d, i) => (
        <div
          key={i}
          className="kbs-dust"
          style={{
            left: `${d.left}%`,
            bottom: `${d.bottom}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}

      {/* Static fallback for reduced-motion users */}
      <div className="kbs-static absolute inset-0 hidden flex-wrap items-center justify-center gap-6 px-6">
        {PARTNERS.map((partner) => (
          <OrbitCard
            key={partner.name}
            name={partner.name}
            src={partner.src}
            angle={0}
            staticCard
          />
        ))}
      </div>
    </div>
  );
}

function OrbitCard({
  name,
  src,
  angle,
  staticCard = false,
}: {
  name: string;
  src: string;
  angle: number;
  staticCard?: boolean;
}) {
  const transform = staticCard
    ? undefined
    : `translate(-50%, -50%) rotateY(${angle}deg) translateZ(var(--kbsR))`;
  const bobDelay = staticCard ? undefined : `${((-angle / 360) * 40).toFixed(2)}s`;
  return (
    <div
      className={`${staticCard ? "relative" : "absolute left-1/2 top-1/2"}`}
      style={staticCard ? undefined : { transform, backfaceVisibility: "hidden" as const }}
    >
      <div
        className="kbs-bob flex w-44 flex-col items-center gap-3 sm:w-56"
        style={staticCard ? undefined : { animationDelay: bobDelay }}
      >
        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#2f1138] to-[#1c0826] p-5 shadow-[0_14px_44px_rgba(0,0,0,0.5),0_0_30px_rgba(240,196,120,0.28),inset_0_0_20px_rgba(240,196,120,0.14)] ring-1 ring-[#D7AB6A]/60 sm:h-32 sm:w-32">
          <div className="kbs-shine" />
          <img
            src={src}
            alt={`${name} — Kanagam Tech partner`}
            loading="lazy"
            className="relative max-h-full max-w-full object-contain drop-shadow-[0_0_10px_rgba(240,196,120,0.35)]"
          />
        </div>
        <span className="text-[0.58rem] tracking-[0.22em] text-[#E9CD97] uppercase">{name}</span>
      </div>
    </div>
  );
}
