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

const MARQUEE_KEYS = `
  @keyframes kbsMarqueeL { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .kbs-marquee:hover .kbs-track { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) {
    .kbs-track { animation: none !important; }
    .kbs-marquee { overflow-x: auto; }
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
      <style>{MARQUEE_KEYS}</style>
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

        {/* Looping partner marquee — motion theme animation */}
        <div className="mt-14">
          <MarqueeRow />
        </div>

        <p className="mt-10 text-center text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
          Trusted by world-class companies across the deep-tech spectrum
        </p>
      </section>
    </main>
  );
}

function MarqueeRow() {
  const doubled = [...PARTNERS, ...PARTNERS];
  return (
    <div className="kbs-marquee group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 py-8 backdrop-blur-md">
      <div
        className="kbs-track flex w-max items-center gap-6 px-6"
        style={{
          animation: "kbsMarqueeL 42s linear infinite",
        }}
      >
        {doubled.map((partner, i) => (
          <LogoCard key={`${partner.name}-${i}`} name={partner.name} src={partner.src} />
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#18051e] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#18051e] to-transparent" />
    </div>
  );
}

function LogoCard({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex w-52 shrink-0 flex-col items-center gap-3">
      <div className="flex h-20 w-full items-center justify-center rounded-xl bg-white p-4 shadow-lg">
        <img
          src={src}
          alt={`${name} — Kanagam Tech partner`}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <span className="text-[0.6rem] tracking-[0.22em] text-muted-foreground uppercase">
        {name}
      </span>
    </div>
  );
}
