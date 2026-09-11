import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { KanagamLogo } from "@/components/KanagamLogo";
import { ShiningBackground } from "@/components/ShiningBackground";
import { Footer } from "@/components/Footer";
import { ALL_SERVICES, getServiceBySlug } from "@/lib/services";
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

const IMG_ALT_SUFFIX = [
  "core capabilities and infrastructure",
  "advanced engineering solutions in action",
  "real-world applications and deployments",
];

const SERVICE_KEYS = `
  @keyframes kbsTopFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
  .kbs-top-icon { animation: kbsTopFloat 4.5s ease-in-out infinite; transition: border-color 0.3s ease, box-shadow 0.3s ease; }
  .kbs-top-icon:hover { animation-play-state: paused; }
  @keyframes kbsImgFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  .kbs-img-figure {
    position: relative;
    animation: kbsImgFloat 6s ease-in-out infinite;
    box-shadow: 0 22px 50px rgba(24,5,30,0.6), 0 0 22px rgba(232,197,118,0.25), 0 0 0 1px rgba(232,197,118,0.22);
    transition: box-shadow 0.4s ease, border-color 0.4s ease;
  }
  .kbs-img-figure:hover {
    animation-play-state: paused;
    box-shadow: 0 26px 60px rgba(24,5,30,0.65), 0 0 40px rgba(232,197,118,0.55), 0 0 0 1px rgba(232,197,118,0.5);
    border-color: rgba(232,197,118,0.7);
  }
  @media (prefers-reduced-motion: reduce) {
    .kbs-img-figure, .kbs-top-icon { animation: none; }
  }
`;

function imgAlt(svcTitle: string, idx: number): string {
  return `${svcTitle} ${IMG_ALT_SUFFIX[idx] ?? "services"} — Kanagam Technology Solutions`;
}

/** Renders a paragraph, highlighting **important words** in gold and bold. */
function Paragraph({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split("**");
  return (
    <p className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-[#EAD3A0]">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

const SEO_KEYWORDS: Record<string, string> = {
  quantum:
    "quantum computing services, GenQ, cryogenic control hardware, superconducting qubits, quantum algorithm orchestration, post-quantum cryptography, quantum infrastructure",
  semiconductor:
    "semiconductor design services, ESDM, ASIC and SoC architecture, custom microelectronics, electronics system design and manufacturing, chip design India",
  "vlsi-fpga":
    "VLSI FPGA engineering, RTL design, Verilog VHDL, UVM verification, logic synthesis, FPGA development boards, ASIC front-end design",
  "embedded-aiot":
    "embedded systems, IoT, AIoT, industrial IoT (IIoT), edge computing, embedded AI, firmware development, enterprise IoT deployment",
  aibots:
    "AIBots, AI agents, conversational AI chatbots, retrieval augmented generation RAG, task automation agents, enterprise AI assistants",
  "ar-vr":
    "AR VR solutions, augmented reality, virtual reality, mixed reality training, immersive simulations, AR VR development services",
  drones:
    "drone services, UAV engineering, drone pilot training, industrial drones, drone inspections and surveys",
  "scanner-3d":
    "3D scanning, 3D printing, additive manufacturing, 3D scanner, 3D printer, rapid prototyping services",
  "skill-dev":
    "technical training, skill development programs, engineering bootcamps, global certifications, industry internship training",
};

export const Route = createFileRoute("/service/$slug")({
  beforeLoad: ({ params }) => {
    if (!getServiceBySlug(params.slug)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const svc = getServiceBySlug(params.slug);
    const title = svc
      ? `${svc.title} Services | Kanagam Technology Solutions`
      : "Service — Kanagam Technology Solutions";
    const keywords = svc ? (SEO_KEYWORDS[svc.slug] ?? svc.title) : "deep technology services";
    const seoDesc = svc?.description
      ? svc.description.length > 158
        ? `${svc.description.slice(0, 158).replace(/\s+\S*$/, "")}…`
        : svc.description
      : "";
    return {
      meta: [
        { title },
        { name: "description", content: seoDesc },
        { name: "keywords", content: keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: svc?.description ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://kanagamtech.in/service/${params.slug}` },
        { property: "og:image", content: svc?.images?.[0] ?? "/images/services/quantum-1.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: seoDesc },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: svc?.title ?? "Deep Technology",
            category: svc?.category ?? "Engineering & Innovation",
            name: `${svc?.title ?? "Service"} — Kanagam Technology Solutions`,
            description: svc?.description ?? "",
            url: `https://kanagamtech.in/service/${params.slug}`,
            image: svc?.images?.[0] ?? "/images/services/quantum-1.jpg",
            provider: {
              "@type": "Organization",
              name: "Kanagam Technology Solutions",
              url: "https://kanagamtech.in/",
            },
            areaServed: "India",
          },
        },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://kanagamtech.in/" },
              {
                "@type": "ListItem",
                position: 2,
                name: svc?.group ?? "Services",
                item: "https://kanagamtech.in/#focus",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: svc?.title ?? "Service",
                item: `https://kanagamtech.in/service/${params.slug}`,
              },
            ],
          },
        },
      ],
      links: [{ rel: "canonical", href: `https://kanagamtech.in/service/${params.slug}` }],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const svc = getServiceBySlug(slug)!;
  const Icon = svc.icon;
  const others = ALL_SERVICES.filter((s) => s.slug !== svc.slug);
  const isAibots = svc.slug === "aibots";

  return (
    <main
      className="relative min-h-screen overflow-hidden font-sans"
      style={
        {
          background: "linear-gradient(155deg, #7a2a63 0%, #4B1D3F 30%, #2b0b30 62%, #18051e 100%)",
          ["--background"]: "#17061f",
          ["--foreground"]: "#F7EDE3",
          ["--muted-foreground"]: "#D0B8A8",
        } as CSSProperties
      }
    >
      <ShiningBackground variant="strong" />
      <style>{SERVICE_KEYS}</style>
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:var(--grain)]" />

      {/* Simple Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-4 md:px-6">
          <Link to="/" hash="focus" className="flex shrink-0 items-center gap-2 sm:gap-3 sm:ml-3">
            <KanagamLogo size="lg" />
          </Link>
          <Link
            to="/"
            hash="focus"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[0.6rem] tracking-[0.18em] text-foreground uppercase font-semibold transition-colors hover:bg-secondary sm:px-4 sm:text-[0.65rem]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* Detail Content */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-6 sm:pt-9 pb-12 sm:pb-18">
        {/* Breadcrumb (pillar pages show none) */}
        {svc.group !== "Core Focus" && (
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[0.55rem] sm:text-[0.65rem] tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground uppercase font-mono">
            <Link to="/" hash="focus" className="transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>{svc.group}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary">{svc.title}</span>
          </div>
        )}

        {/* Title Block */}
        <div className="mt-4 sm:mt-5 flex flex-col gap-4 sm:gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            {svc.group !== "Core Focus" && (
              <span className="text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
                {svc.category}
              </span>
            )}
            <div className="mt-1.5 sm:mt-2 flex items-center gap-3.5 sm:gap-4">
              <div className="kbs-top-icon flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-sm hover:border-accent/70 hover:shadow-[0_0_20px_rgba(232,197,118,0.55)]">
                <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <h1 className="font-display white-shine text-[clamp(1.7rem,4vw,2.6rem)] leading-tight font-bold tracking-tight">
                {svc.title}
              </h1>
            </div>
          </div>

          {svc.badge && (
            <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[0.6rem] tracking-[0.2em] text-primary uppercase font-mono font-medium">
              <Sparkles className="h-3 w-3" />
              {svc.badge}
            </span>
          )}
        </div>

        {/* Description */}
        <Paragraph
          className="mt-4 max-w-4xl text-base leading-relaxed text-foreground"
          text={svc.description}
        />

        {/* Expanded Deep-Dive Content — zig-zag text/image layout */}
        {svc.longDescription && svc.longDescription.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display mt-1 bg-clip-text text-[clamp(1.15rem,3vw,1.6rem)] leading-tight font-extrabold tracking-wide text-[#EAD3A0] uppercase">
              Capability Deep-Dive
            </h2>
            {(() => {
              const imgs = svc.images ?? [];
              const paras = svc.longDescription;
              const perChunk = Math.max(2, Math.ceil(paras.length / (imgs.length + 1)));
              const blocks: ReactNode[] = [];
              let blockIdx = 0;
              for (let i = 0; i < paras.length; i += perChunk) {
                const chunkParas = paras.slice(i, i + perChunk);
                const imgIdx = blockIdx;
                const hasImg = imgIdx < imgs.length;
                const flip = blockIdx % 2 === 1;
                blocks.push(
                  <div
                    key={`b-${i}`}
                    className="mt-8 grid items-center gap-6 lg:grid-cols-2 lg:gap-12"
                  >
                    <div className={`${flip ? "lg:order-2" : ""} ${hasImg ? "" : "lg:col-span-2"}`}>
                      {chunkParas.map((para, j) => (
                        <Paragraph
                          key={j}
                          text={para}
                          className={
                            j === 0 && i === 0
                              ? "border-l-2 border-primary/20 pl-6 text-base leading-relaxed text-foreground"
                              : "mt-3 text-base leading-relaxed text-foreground first:mt-0"
                          }
                        />
                      ))}
                    </div>
                    {hasImg && (
                      <figure
                        className={`kbs-img-figure group overflow-hidden rounded-2xl border border-border bg-card ${
                          isAibots ? "flex items-center justify-center" : ""
                        } ${flip ? "lg:order-1" : ""}`}
                        style={{ animationDelay: `${imgIdx * 0.9}s` }}
                      >
                        <span className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-[#E8C576]/0 via-transparent to-[#F6DFAE]/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                        <img
                          src={imgs[imgIdx]}
                          alt={imgAlt(svc.title, imgIdx)}
                          loading="lazy"
                          className={`${
                            isAibots
                              ? "block max-h-[26rem] w-auto max-w-full object-contain"
                              : "aspect-[16/10] w-full object-cover"
                          } transition-transform duration-500 group-hover:scale-[1.03]`}
                        />
                      </figure>
                    )}
                  </div>,
                );
                blockIdx++;
              }
              return blocks;
            })()}
          </div>
        )}

        {/* Highlights */}
        <div className="mt-8 sm:mt-10 rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-xl backdrop-blur-md">
          <h2 className="text-[0.75rem] sm:text-[0.85rem] tracking-[0.25em] text-[#EAD3A0] uppercase font-mono font-bold [text-shadow:0_0_16px_rgba(232,197,118,0.55)]">
            {svc.highlightsTitle}
          </h2>
          <div className="mt-4 sm:mt-5 grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
            {svc.highlights.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-background p-4 text-sm font-normal text-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
