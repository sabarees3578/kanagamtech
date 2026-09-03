import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import type { CSSProperties } from "react";
import { KanagamLogo } from "@/components/KanagamLogo";
import { CoverflowMotion } from "@/components/CoverflowMotion";
import { PARTNERS, type Partner } from "@/lib/partners";
import { ArrowLeft, ExternalLink, Handshake } from "lucide-react";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Our Partners | Kanagam Technology Solutions" },
      {
        name: "description",
        content:
          "Kanagam partners with world-class deep-tech companies across quantum computing, semiconductors, AI and embedded systems — building tomorrow's digital frontier together.",
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
  const [activeName, setActiveName] = useState<string>(PARTNERS[0].name);
  const active = PARTNERS.find((p) => p.name === activeName) ?? PARTNERS[0];

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
      {/* Soft royal glow behind the carousel */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_50%_42%,rgba(75,29,63,0.4)_0%,rgba(18,3,23,0)_62%)]" />
      {/* Shining gold glow, sweep and sparks over the plum page */}
      <div className="kbs-shining" />
      <div className="kbs-streak" />
      {[
        { top: "16%", left: "12%", delay: "0s" },
        { top: "26%", left: "84%", delay: "1.1s" },
        { top: "58%", left: "7%", delay: "0.4s" },
        { top: "64%", left: "90%", delay: "1.8s" },
        { top: "38%", left: "49%", delay: "2.4s" },
        { top: "78%", left: "30%", delay: "0.9s" },
        { top: "82%", left: "70%", delay: "2.9s" },
        { top: "10%", left: "56%", delay: "2.1s" },
      ].map((s, i) => (
        <span
          key={i}
          className="kbs-spark"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:var(--grain)]" />

      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <KanagamLogo size="md" />
          </Link>
          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[0.6rem] tracking-[0.18em] text-foreground uppercase font-semibold transition-colors hover:bg-secondary sm:px-4 sm:text-[0.65rem]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 py-3 pb-6 min-h-[calc(100vh-3.6rem)]">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-0.5 text-[0.6rem] tracking-[0.25em] text-primary uppercase">
            <Handshake className="h-3 w-3" />
            Our Ecosystem
          </div>
          <h1 className="font-display text-[clamp(1.5rem,3.4vw,2.6rem)] leading-tight font-bold tracking-tight text-foreground">
            Partners in Deep-Tech
          </h1>
          <div className="flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-0.5">
            {PARTNERS.map((p) => (
              <span
                key={p.name}
                className={`whitespace-nowrap text-[0.55rem] tracking-[0.22em] uppercase transition-colors ${
                  p.name === activeName ? "text-[#EAD3A0]" : "text-[#E9CD97]/55"
                }`}
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* — Motion theme: bigger 3D coverflow carousel — */}
        <div className="flex flex-1 items-center justify-center py-2">
          <CoverflowMotion
            onCenterChange={setActiveName}
            heightClass="h-[30vh] min-h-[220px] md:h-full md:min-h-0"
            cardSize="clamp(96px, 22vh, 264px)"
            glowSize="min(26vh, 360px)"
          />
        </div>

        {/* Company info of the centred partner */}
        <InfoPanel
          key={active.name}
          name={active.name}
          tagline={active.tagline}
          overview={active.overview}
          tags={active.tags}
          site={active.site}
        />
      </section>
    </main>
  );
}

function InfoPanel({ name, tagline, overview, tags, site }: Partner) {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl border border-[#D7AB6A]/30 bg-[#130418]/70 px-5 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <span className="truncate text-base font-semibold tracking-[0.14em] text-[#EAD3A0] uppercase sm:text-lg">
              {name}
            </span>
            <span className="text-[0.62rem] tracking-[0.16em] text-[#E9CD97]/70 uppercase italic">
              {tagline}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 max-w-2xl text-xs text-[#E8D5C3]/90 sm:mt-0.5 sm:text-sm">
            {overview}
          </p>
        </div>
        <div className="flex shrink-0 flex-row items-center gap-2">
          <div className="hidden flex-wrap items-center justify-end gap-1.5 md:flex">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#D7AB6A]/25 bg-[#1d0824]/70 px-2.5 py-0.5 text-[0.55rem] tracking-[0.14em] whitespace-nowrap text-[#E9CD97]/90 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
          {site && (
            <a
              href={site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D7AB6A]/40 bg-[#D7AB6A]/10 px-3 py-1 text-[0.6rem] tracking-[0.16em] text-[#EAD3A0] uppercase transition-colors hover:bg-[#D7AB6A]/20"
            >
              Visit
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
