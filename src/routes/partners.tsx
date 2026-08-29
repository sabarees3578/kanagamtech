import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { KanagamLogo } from "@/components/KanagamLogo";
import { ArrowLeft, ExternalLink, Handshake } from "lucide-react";

type Partner = {
  name: string;
  src: string;
  overview: string;
  tags: string[];
  site: string | null;
};

const PARTNERS: Partner[] = [
  {
    name: "Accura Tequipment",
    src: "/partners img/Accura Tequipment.png",
    overview:
      "Designs, manufactures and supplies lab & experimental equipment plus turnkey industrial solutions for technical education — Centre of Excellence labs, IoT & automation, and Training-of-Trainers.",
    tags: ["Industrial Solutions", "IoT & Automation", "COE Laboratories"],
    site: "https://www.theaccura.com",
  },
  {
    name: "AMS EMS",
    src: "/partners img/AMS EMS.jpeg",
    overview:
      "Electronics Manufacturing Services (EMS) specialised in PCB assembly, from Coimbatore — supporting product design, SMT assembly and end-to-end electronics production.",
    tags: ["PCB Assembly", "Electronics Manufacturing", "SMT"],
    site: "https://amsems.in",
  },
  {
    name: "ARK Infosolutions",
    src: "/partners img/ARK Infosolutions.svg",
    overview:
      "India's leading value-added distributor for technology products — spanning Media & Entertainment, AEC, Digital Manufacturing (Ansys, Formlabs) and Education across 100+ Indian cities.",
    tags: ["Value-added Distribution", "Media & Entertainment", "Digital Manufacturing"],
    site: "https://www.arkinfo.in",
  },
  {
    name: "QuantumMate",
    src: "/partners img/QUANTUMMATE.jpeg",
    overview:
      "A quantum computing company — education, training and hands-on enablement that makes quantum accessible to students, researchers and industry.",
    tags: ["Quantum Computing", "Training & Education", "Research Enablement"],
    site: null,
  },
  {
    name: "RP3D Products",
    src: "/partners img/RP3D Products.jpg",
    overview:
      "Chennai-based 3D printing house — professional-to-industrial 3D printers, rapid prototyping services, 3D scanning, filaments, resins and moulding for automotive, medical, education and R&D.",
    tags: ["3D Printing", "Additive Manufacturing", "Rapid Prototyping"],
    site: "https://rp3dproducts.com",
  },
  {
    name: "Silicon Systems",
    src: "/partners img/SILICON SYSTEM.jpeg",
    overview:
      "Electronics design, embedded engineering and manufacturing services — turning deep-tech concepts into reliable hardware for IoT, mobility and industrial applications.",
    tags: ["Electronics Design", "Embedded", "Manufacturing"],
    site: null,
  },
  {
    name: "Zorah Tech",
    src: "/partners img/Zora Technologies.png",
    overview:
      "Industrial IoT & automation — condition monitoring, predictive maintenance and smart-factory solutions that make industrial operations measurable and intelligent.",
    tags: ["Industrial IoT", "Automation", "Predictive Maintenance"],
    site: "https://zorahtech.in",
  },
];

/* =========================================================
   3D COVERFLOW MOTION ENGINE — adapted from the reference
   skeleton and restyled with the plum + gold brand palette.
   ========================================================= */
const MOTION_CSS = `
  .kbs-stage {
    --motion-card-w: clamp(128px, 30vh, 264px);
    --motion-card-h: clamp(128px, 30vh, 264px);
    --motion-idle-bob: 6px;
    --motion-idle-duration: 3.6s;
    perspective: 1200px;
  }
  .kbs-track {
    position: relative;
    width: var(--motion-card-w);
    height: var(--motion-card-h);
    transform-style: preserve-3d;
  }
  .kbs-card {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--motion-card-w);
    height: var(--motion-card-h);
    will-change: transform, opacity, filter;
    animation: kbsIdleBob var(--motion-idle-duration) ease-in-out infinite;
    animation-delay: var(--kbs-bob-delay, 0s);
  }
  @keyframes kbsIdleBob {
    0%, 100% { margin-top: 0px; }
    50% { margin-top: calc(var(--motion-idle-bob) * -1); }
  }
  .kbs-card .kbs-cover {
    position: absolute;
    inset: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 20px;
    background: linear-gradient(160deg, #24102d 0%, #12061a 100%);
    border: 2px solid rgba(215, 171, 106, 0.78);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(215, 171, 106, 0.18);
  }
  .kbs-card .kbs-cover img {
    max-width: 64%;
    max-height: 64%;
    object-fit: contain;
  }
  .kbs-card.is-center { filter: none; }
  .kbs-card.is-edge { filter: saturate(0.9) brightness(0.96); }
  .kbs-card.is-center .kbs-cover {
    border-color: rgba(233, 205, 151, 0.95);
    box-shadow: 0 0 0 3px rgba(217, 171, 102, 0.25), 0 26px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(215, 171, 106, 0.34);
  }

  /* Shining gold ambiance over the plum page */
  .kbs-shining {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    background:
      radial-gradient(ellipse 42% 34% at 50% 40%, rgba(215, 171, 106, 0.14) 0%, rgba(18, 3, 23, 0) 68%),
      radial-gradient(ellipse 22% 30% at 50% 50%, rgba(240, 196, 120, 0.09) 0%, rgba(18, 3, 23, 0) 70%);
    animation: kbsShine 6s ease-in-out infinite;
  }
  @keyframes kbsShine {
    0%, 100% { opacity: 0.55; transform: translateY(0px) scale(1); }
    50% { opacity: 1; transform: translateY(-3%) scale(1.05); }
  }
  .kbs-streak {
    position: absolute;
    left: 0;
    right: 0;
    top: -30%;
    height: 45%;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(18, 3, 23, 0) 0%,
      rgba(233, 205, 151, 0.1) 45%,
      rgba(240, 196, 120, 0.16) 55%,
      rgba(18, 3, 23, 0) 100%
    );
    transform: rotate(-7deg);
    animation: kbsStreak 7s linear infinite;
  }
  @keyframes kbsStreak {
    0% { top: -35%; }
    100% { top: 115%; }
  }
  .kbs-spark {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, #f7e3b8 0%, rgba(215, 171, 106, 0) 75%);
    box-shadow: 0 0 10px 2px rgba(233, 205, 151, 0.55);
    animation: kbsTwinkle 3.4s ease-in-out infinite;
  }
  @keyframes kbsTwinkle {
    0%, 100% { opacity: 0.12; transform: scale(0.55); }
    50% { opacity: 1; transform: scale(1.3); }
  }

  @media (prefers-reduced-motion: reduce) {
    .kbs-card { animation: none; }
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
  const [activeName, setActiveName] = useState<string>(PARTNERS[0].name);
  const active = PARTNERS.find((p) => p.name === activeName) ?? PARTNERS[0];

  return (
    <main
      className="relative h-screen overflow-hidden font-sans"
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
      <style>{MOTION_CSS}</style>

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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
          <Link to="/" className="flex items-center gap-3">
            <KanagamLogo size="md" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[0.65rem] tracking-[0.2em] text-foreground uppercase font-semibold transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex h-[calc(100vh-3.6rem)] w-full max-w-7xl flex-col px-6 py-3">
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
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <MotionThemeStage onCenterChange={setActiveName} />
        </div>

        {/* Live overview of the centred partner */}
        <InfoPanel
          key={active.name}
          name={active.name}
          overview={active.overview}
          tags={active.tags}
          site={active.site}
        />
      </section>
    </main>
  );
}

function MotionThemeStage({ onCenterChange }: { onCenterChange: (name: string) => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = PARTNERS.map((item, i) => {
      const el = document.createElement("div");
      el.className = "kbs-card";
      el.style.setProperty("--kbs-bob-delay", `${(i % 5) * 0.3}s`);
      const cover = document.createElement("div");
      cover.className = "kbs-cover";
      const shine = document.createElement("span");
      shine.className = "kbs-shine";
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.name;
      img.loading = "lazy";
      cover.append(img, shine);
      el.appendChild(cover);
      track.appendChild(el);
      return { el, img, item };
    });

    let spacing = (cards[0]?.el.offsetWidth || 150) * 2;
    const total = cards.length;
    const maxAngle = 55;
    const speed = 0.4;
    let loopWidth = spacing * total;
    let depth = spacing * 0.85;
    let fadeDist = spacing * 3.2;
    let offset = 0;
    let lastCenter = -1;
    let rafId = 0;
    let paused = false;

    const measure = () => {
      spacing = (cards[0]?.el.offsetWidth || 150) * 2;
      loopWidth = spacing * total;
      depth = spacing * 0.85;
      fadeDist = spacing * 3.2;
    };

    const frame = () => {
      if (!paused) {
        offset += speed;
        if (offset > loopWidth) offset -= loopWidth;

        let currentCenter = 0;
        let currentCenterDist = Infinity;

        for (let i = 0; i < total; i++) {
          let pos = (i * spacing - offset) % loopWidth;
          if (pos < -loopWidth / 2) pos += loopWidth;
          if (pos > loopWidth / 2) pos -= loopWidth;

          const distRatio = Math.min(Math.abs(pos) / fadeDist, 1);
          const angle = (pos / (loopWidth / 2)) * maxAngle;
          const z = (-Math.abs(pos) / (loopWidth / 2)) * depth;
          const push = (1 - distRatio) * 76;
          const scale = 1.25 - distRatio * 0.4;
          const opacity = 1 - distRatio * 0.85;
          const isCenter = Math.abs(pos) < spacing * 0.4;

          const { el, img } = cards[i];
          el.style.transform = `translateX(${pos}px) translateZ(${z + push}px) rotateY(${-angle}deg) scale(${scale})`;
          el.style.opacity = String(opacity);
          el.style.zIndex = String(Math.round(1000 - Math.abs(pos)));
          el.classList.toggle("is-center", isCenter);
          el.classList.toggle("is-edge", distRatio > 0.6);
          img.style.filter = isCenter ? "none" : "grayscale(1) contrast(1.05)";
          img.style.opacity = isCenter ? "1" : ".85";

          if (Math.abs(pos) < currentCenterDist) {
            currentCenterDist = Math.abs(pos);
            currentCenter = i;
          }
        }

        if (currentCenter !== lastCenter) {
          lastCenter = currentCenter;
          onCenterChange(cards[currentCenter].item.name);
        }
      }
      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    stage.addEventListener("mouseenter", onEnter);
    stage.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(rafId);
      stage.removeEventListener("mouseenter", onEnter);
      stage.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", measure);
      track.innerHTML = "";
    };
  }, [onCenterChange]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-visible">
      <div
        ref={stageRef}
        className="kbs-stage kbs-canvas relative flex h-full w-full max-w-6xl items-center justify-center"
      >
        <div ref={trackRef} className="kbs-track" />
      </div>

      {/* Static fallback for reduced-motion users */}
      <div className="kbs-static absolute inset-0 hidden flex-wrap content-center items-center justify-center gap-5 overflow-y-auto px-6 py-4">
        {PARTNERS.map((partner) => (
          <CapsuleCard key={partner.name} name={partner.name} src={partner.src} />
        ))}
      </div>
    </div>
  );
}

function InfoPanel({ name, overview, tags, site }: Partner) {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl border border-[#D7AB6A]/30 bg-[#130418]/70 px-5 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="truncate text-base tracking-[0.14em] font-semibold text-[#EAD3A0] uppercase sm:text-lg">
            {name}
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
