import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { KanagamLogo } from "@/components/KanagamLogo";
import { PartnerOrbit3D } from "@/components/PartnerOrbit3D";
import { ShiningBackground } from "@/components/ShiningBackground";
import { ArrowLeft, Handshake } from "lucide-react";

const PARTNERS = [
  { name: "Accura Tequipment", src: "/partners img/Accura Tequipment.png" },
  { name: "AMS EMS", src: "/partners img/AMS EMS.jpeg" },
  { name: "ARK Infosolutions", src: "/partners img/ARK Infosolutions.svg" },
  { name: "QuantumMate", src: "/partners img/QUANTUMMATE.jpeg" },
  { name: "RP3D Products", src: "/partners img/RP3D Products.jpg" },
  { name: "Silicon Systems", src: "/partners img/SILICON SYSTEM.jpeg" },
  { name: "Zorah Tech", src: "/partners img/Zora Technologies.png" },
];

const ORBIT_KEYS = `
  .kbs-hex { clip-path: polygon(0% 14%, 5% 5%, 14% 0%, 86% 0%, 95% 5%, 100% 14%, 100% 86%, 95% 95%, 86% 100%, 14% 100%, 5% 95%, 0% 86%); }
  .kbs-shine { position: absolute; inset: 0; border-radius: inherit; background-image: linear-gradient(115deg, transparent 30%, rgba(240,196,120,0.2) 44%, rgba(255,255,255,0.32) 50%, rgba(240,196,120,0.2) 56%, transparent 70%); background-size: 250% 100%; background-repeat: no-repeat; pointer-events: none; mix-blend-mode: screen; animation: kbsShimmer 3.2s linear infinite; }
  @keyframes kbsShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  @media (prefers-reduced-motion: reduce) {
    .kbs-canvas { display: none; }
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
      {/* — Motion theme: full-screen, fixed, centred hologram — */}
      <div className="fixed inset-0 z-0">
        <ShiningBackground variant="strong" />
        <PartnerOrbit3D className="kbs-canvas absolute inset-0" />

        {/* Static fallback for reduced-motion users */}
        <div className="kbs-static absolute inset-0 hidden flex-wrap content-center items-center justify-center gap-6 overflow-y-auto px-6 py-10">
          {PARTNERS.map((partner) => (
            <CapsuleCard key={partner.name} name={partner.name} src={partner.src} />
          ))}
        </div>

        {/* Cinematic vignette so the headline stays readable over the hologram */}
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_50%_40%,rgba(18,3,23,0.1)_0%,rgba(18,3,23,0.35)_46%,rgba(18,3,23,0.7)_78%,rgba(18,3,23,0.92)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:var(--grain)]" />
      </div>

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

      {/* Page Content — centred over the motion theme */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-6xl flex-col items-center justify-center gap-5 px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase backdrop-blur-sm">
          <Handshake className="h-3.5 w-3.5" />
          Our Ecosystem
        </div>
        <h1 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-tight font-bold tracking-tight text-foreground drop-shadow-[0_2px_18px_rgba(18,3,23,0.8)]">
          Partners in Deep-Tech
        </h1>
        <p className="max-w-2xl text-sm text-[#E8D5C3]/85 drop-shadow-[0_1px_10px_rgba(18,3,23,0.9)] sm:text-base">
          A royal orbit of world-class companies — quantum, silicon, AI, embedded and beyond —
          animating Kanagam's deep-tech future.
        </p>

        {/* Partner name legend */}
        <div className="flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-3xl border border-[#D7AB6A]/25 bg-[#1d0824]/60 px-5 py-3 backdrop-blur-md">
          {PARTNERS.map((p) => (
            <span
              key={p.name}
              className="whitespace-nowrap text-[0.6rem] tracking-[0.22em] text-[#E9CD97]/90 uppercase"
            >
              {p.name}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

function CapsuleCard({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex w-44 flex-col items-center gap-3 sm:w-56">
      <div className="kbs-hex relative flex h-32 w-32 items-center justify-center bg-gradient-to-b from-[#E9CD97] via-[#D7AB6A] to-[#B98A3E] drop-shadow-[0_0_22px_rgba(240,196,120,0.35)] sm:h-36 sm:w-36">
        <div className="kbs-hex relative m-[3px] flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#2f1138] to-[#1c0826] p-4">
          <div className="kbs-shine" />
          <img
            src={src}
            alt={`${name} — Kanagam Tech partner`}
            loading="lazy"
            className="kbs-hex relative max-h-full max-w-full object-contain drop-shadow-[0_0_10px_rgba(240,196,120,0.35)]"
          />
        </div>
      </div>
      <span className="text-[0.58rem] tracking-[0.22em] text-[#E9CD97] uppercase">{name}</span>
    </div>
  );
}
