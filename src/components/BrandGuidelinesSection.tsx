import React, { useState } from "react";
import { Palette, CheckCircle2, Sliders, Layout, Sparkles, BookOpen, Layers } from "lucide-react";
import { KanagamLogo, KanagamSocialBrandmark, KanagamSymbol } from "./KanagamLogo";

const CORE_COLORS = [
  {
    name: "Plum",
    hex: "#4B1D3F",
    role: "Primary Foundation",
    usage: "Backgrounds, display headlines, formal comms",
  },
  {
    name: "Gold",
    hex: "#D7AB6A",
    role: "Premium Accent",
    usage: "Rules, highlights, symbol details, button accents",
  },
  {
    name: "White",
    hex: "#FFFFFF",
    role: "Clean Neutral",
    usage: "Primary light background & reverse lettering",
  },
];

const SUPPORTING_COLORS = [
  { name: "Warm Ivory", hex: "#F7F1E8", usage: "Main light background" },
  { name: "Soft Sand", hex: "#EAD7BA", usage: "Section fields & quiet warmth" },
  { name: "Charcoal", hex: "#272128", usage: "Premium neutral & body copy" },
  { name: "Dusty Rose", hex: "#B9677B", usage: "Lifestyle & people-led campaigns" },
  { name: "Terracotta", hex: "#C66B4E", usage: "Event energy & CTAs" },
  { name: "Deep Teal", hex: "#2F6B68", usage: "Technology & insight content" },
];

const POSTER_PREVIEWS = [
  {
    id: "tech-forward",
    title: "TECH FORWARD",
    subtitle: "Annual Innovation Forum",
    meta: "24 September / Chennai",
    theme: "light",
    accent: "#D7AB6A",
    bgClass: "bg-[#F7F1E8] text-[#4B1D3F]",
    cta: "REGISTER NOW",
    ctaBg: "bg-[#4B1D3F] text-white",
  },
  {
    id: "smarter-systems",
    title: "SMARTER SYSTEMS.",
    subtitle: "DESIGNED TO CONNECT",
    meta: "Lead with a product benefit, then support with proof.",
    theme: "ivory",
    accent: "#D7AB6A",
    bgClass: "bg-[#EAD7BA] text-[#4B1D3F]",
    cta: "EXPLORE PLATFORM",
    ctaBg: "bg-[#D7AB6A] text-[#4B1D3F]",
  },
  {
    id: "ideas-in-motion",
    title: "IDEAS IN MOTION",
    subtitle: "01 Insight Series",
    meta: "Technology / Design / Growth",
    theme: "teal",
    accent: "#D7AB6A",
    bgClass: "bg-[#2F6B68] text-white",
    cta: "READ INSIGHTS",
    ctaBg: "bg-[#D7AB6A] text-[#4B1D3F]",
  },
];

export const BrandGuidelinesSection: React.FC = () => {
  const [activePoster, setActivePoster] = useState(POSTER_PREVIEWS[0]!.id);

  return (
    <section
      id="brand-guide"
      className="relative z-10 mx-auto max-w-6xl px-6 py-28 border-t border-border/60"
    >
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono">
            <BookOpen className="h-3.5 w-3.5" />
            Brand System Showcase
          </div>
          <h2 className="font-display mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight text-foreground">
            Kanagam Tech Brand Guidelines
          </h2>
        </div>
        <p className="max-w-md text-sm font-light text-muted-foreground">
          Built upon a refined Plum foundation and warm Gold accent. Governed by clean geometry,
          generous spacing, and purposeful contrast rules.
        </p>
      </div>

      {/* 60-30-10 Rule Banner */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-primary/30 bg-card p-6 shadow-xl backdrop-blur-md md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono">
              Campaign Ratio Rule
            </span>
            <h3 className="font-display mt-1 text-xl font-semibold text-foreground">
              The 60 / 30 / 10 Colour Balance Formula
            </h3>
            <p className="mt-2 text-xs text-muted-foreground font-light">
              60% Neutral Base (Warm Ivory/White/Charcoal) + 30% Plum Foundation + 10% Gold (or
              single campaign accent)
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-background p-3 border border-border">
            <div className="flex h-12 w-20 items-center justify-center rounded bg-[#F7F1E8] border border-[#EAD7BA] text-xs font-mono font-bold text-[#272128]">
              60%
            </div>
            <div className="flex h-12 w-16 items-center justify-center rounded bg-[#4B1D3F] text-xs font-mono font-bold text-white">
              30%
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded bg-[#D7AB6A] text-xs font-mono font-bold text-[#4B1D3F]">
              10%
            </div>
          </div>
        </div>
      </div>

      {/* Palette Swatches Grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {CORE_COLORS.map((c) => (
          <div
            key={c.name}
            className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-transform hover:-translate-y-1"
          >
            <div
              className="h-24 w-full p-4 flex items-end justify-between"
              style={{ backgroundColor: c.hex }}
            >
              <span
                className={`font-mono text-xs font-bold ${c.hex === "#FFFFFF" || c.hex === "#D7AB6A" ? "text-[#4B1D3F]" : "text-white"}`}
              >
                {c.hex}
              </span>
              <span
                className={`text-[0.6rem] uppercase tracking-wider font-mono px-2 py-0.5 rounded ${c.hex === "#FFFFFF" || c.hex === "#D7AB6A" ? "bg-[#4B1D3F]/10 text-[#4B1D3F]" : "bg-white/20 text-white"}`}
              >
                {c.name}
              </span>
            </div>
            <div className="p-4">
              <h4 className="font-display font-semibold text-sm text-foreground">{c.role}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{c.usage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Supporting Palette Chips */}
      <div className="mt-6 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
        <h4 className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-mono font-bold">
          Supporting Campaign Palette
        </h4>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {SUPPORTING_COLORS.map((sc) => (
            <div
              key={sc.name}
              className="flex items-center gap-2.5 rounded-lg border border-border p-2 bg-background"
            >
              <div
                className="h-6 w-6 rounded shrink-0 border border-black/10"
                style={{ backgroundColor: sc.hex }}
              />
              <div>
                <div className="font-display text-xs font-medium text-foreground">{sc.name}</div>
                <div className="font-mono text-[0.6rem] text-muted-foreground">{sc.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Poster System Showcase */}
      <div className="mt-12 rounded-3xl border border-primary/30 bg-gradient-to-b from-card to-background p-8 shadow-2xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.6rem] tracking-[0.25em] text-primary uppercase font-mono">
              <Layout className="h-3 w-3" />
              Poster System Design
            </div>
            <h3 className="font-display mt-2 text-xl font-bold text-foreground">
              Build Around One Dominant Message
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {POSTER_PREVIEWS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePoster(p.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-mono tracking-wider transition-all ${
                  activePoster === p.id
                    ? "bg-[#4B1D3F] text-white dark:bg-[#D7AB6A] dark:text-[#4B1D3F] font-semibold"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Poster Card Rendering */}
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            {POSTER_PREVIEWS.filter((p) => p.id === activePoster).map((p) => (
              <div
                key={p.id}
                className={`relative flex flex-col justify-between rounded-2xl p-8 shadow-xl min-h-[340px] transition-all ${p.bgClass}`}
              >
                <div className="flex items-center justify-between">
                  <KanagamLogo mode={p.theme === "teal" ? "reverse" : "primary"} size="sm" />
                  <KanagamSocialBrandmark />
                </div>

                <div className="my-8">
                  <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase opacity-75">
                    {p.subtitle}
                  </span>
                  <h4 className="font-display mt-2 text-3xl font-extrabold tracking-tight">
                    {p.title}
                  </h4>
                  <p className="mt-3 text-xs opacity-90 max-w-sm">{p.meta}</p>
                </div>

                <div>
                  <span
                    className={`inline-block rounded-full px-6 py-2 text-xs font-bold tracking-widest uppercase font-mono shadow-md ${p.ctaBg}`}
                  >
                    {p.cta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-6 space-y-4 text-xs font-light text-muted-foreground">
            <div className="rounded-xl border border-border p-4 bg-background">
              <div className="font-semibold text-foreground font-display text-sm">
                Typography Hierarchy
              </div>
              <p className="mt-1">
                Display Headings use <strong>Poppins Bold (44-64pt)</strong> in Plum{" "}
                <code className="text-primary">#4B1D3F</code> or White. Body copy uses{" "}
                <strong>Inter Regular (11-16pt)</strong> in Charcoal{" "}
                <code className="text-primary">#272128</code>.
              </p>
            </div>

            <div className="rounded-xl border border-border p-4 bg-background">
              <div className="font-semibold text-foreground font-display text-sm">
                Contrast Protection Rule
              </div>
              <p className="mt-1">
                Gold is reserved for accents, rules, badges, and symbol tiles. Never use small Gold
                text directly on light backgrounds.
              </p>
            </div>

            <div className="rounded-xl border border-border p-4 bg-background">
              <div className="font-semibold text-foreground font-display text-sm">
                Logo Protection Zone
              </div>
              <p className="mt-1">
                Maintain free clear space equal to <strong>1/4 H</strong> (height of gold symbol
                tile) on all four sides of the logo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
