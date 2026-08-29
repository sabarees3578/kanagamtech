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

const ORBIT_KEYS = `
  @keyframes kbsSpin { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
  @keyframes kbsPulseGlow { 0%,100% { opacity: 0.45; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.08); } }
  .kbs-stage { --kbsR: 260px; perspective: 1400px; }
  @media (min-width: 640px) { .kbs-stage { --kbsR: 330px; } }
  .kbs-ring { transform-style: preserve-3d; animation: kbsSpin 40s linear infinite; }
  .kbs-stage:hover .kbs-ring { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) {
    .kbs-ring { animation: none !important; }
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
          background: "linear-gradient(155deg, #7a2a63 0%, #4B1D3F 32%, #2b0b30 64%, #18051e 100%)",
          ["--background"]: "#17061f",
          ["--foreground"]: "#F7EDE3",
          ["--muted-foreground"]: "#D0B8A8",
          ["--card"]: "#23102b",
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
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase">
            <Handshake className="h-3.5 w-3.5" />
            Our Ecosystem
          </div>
          <h1 className="font-display mt-4 text-[clamp(2rem,5vw,3rem)] leading-tight font-bold tracking-tight text-foreground">
            Partners in Deep-Tech
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Kanagam Technology Solutions joins forces with leading deep-tech companies across
            quantum, semiconductor, AI and embedded systems — together, we build tomorrow's digital
            frontier.
          </p>
        </div>

        {/* Our Company — centre of the ecosystem */}
        <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card/60 p-8 text-center shadow-xl backdrop-blur-md">
          <span className="text-[0.6rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
            Our Company
          </span>
          <KanagamLogo mode="reverse" size="lg" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Kanagam Technology Solutions — your deep-tech partner in quantum, VLSI, embedded
            systems, AI and beyond.
          </p>
        </div>

        {/* 3D orbiting partner logos — motion theme animation */}
        <div className="mt-8">
          <OrbitStage />
        </div>

        <p className="mt-10 text-center text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
          Trusted by world-class companies across the deep-tech spectrum
        </p>
      </section>
    </main>
  );
}

function OrbitStage() {
  const doubled = [...PARTNERS, ...PARTNERS];
  const step = 360 / doubled.length;
  return (
    <div className="kbs-stage relative mx-auto h-[560px] max-w-4xl sm:h-[660px]">
      <div className="kbs-ring absolute inset-0">
        {doubled.map((partner, i) => (
          <OrbitCard
            key={`${partner.name}-${i}`}
            name={partner.name}
            src={partner.src}
            angle={i * step}
          />
        ))}
      </div>

      {/* Our company — glowing centre of the orbit */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-44 w-44 rounded-full sm:h-52 sm:w-52"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(240,196,120,0.5) 0%, rgba(215,171,106,0.15) 55%, transparent 75%)",
              animation: "kbsPulseGlow 5s ease-in-out infinite",
            }}
          />
          <KanagamLogo mode="reverse" size="lg" className="absolute -mt-2" />
        </div>
      </div>

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
  return (
    <div
      className={`${
        staticCard ? "relative" : "absolute left-1/2 top-1/2"
      } flex w-36 flex-col items-center gap-2.5 sm:w-44`}
      style={staticCard ? undefined : { transform, backfaceVisibility: "hidden" as const }}
    >
      <div className="flex h-20 w-full items-center justify-center rounded-2xl bg-white p-3 shadow-2xl sm:h-24">
        <img
          src={src}
          alt={`${name} — Kanagam Tech partner`}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <span className="text-[0.58rem] tracking-[0.22em] text-muted-foreground uppercase">
        {name}
      </span>
    </div>
  );
}
