import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { QuantumIntro } from "@/components/QuantumIntro";
import { QuantumAmbient } from "@/components/QuantumAmbient";
import { CoreFocusSection } from "@/components/CoreFocusSection";
import { AcademiaSection } from "@/components/AcademiaSection";
import { InquiryFormSection } from "@/components/InquiryFormSection";
import { BrandGuidelinesSection } from "@/components/BrandGuidelinesSection";
import { KanagamLogo } from "@/components/KanagamLogo";
import { PILLARS, ACADEMIC_PROGRAMS } from "@/lib/services";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Quote,
  Globe,
  Zap,
  Compass,
  Sun,
  Moon,
  Target,
  Eye,
  GraduationCap,
} from "lucide-react";

const BRAND = "Kanagam Tech";
const FULL_BRAND = "Kanagam Technology Solutions";
const TAGLINE = "Driving the Next Wave of Technological Evolution";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Kanagam Technology Solutions | Quantum, AI & Deep-Tech India",
      },
      {
        name: "description",
        content:
          "India's GenQ enterprise — Quantum Computing, Semiconductor & ESDM, VLSI/FPGA, Embedded & AIoT, AI/GenAI, AR/VR, Drones, 3D printing and deep-tech training.",
      },
      {
        name: "keywords",
        content:
          "quantum computing company India, GenQ, semiconductor design, ESDM, VLSI FPGA engineering, embedded systems, industrial IoT, AIoT, edge AI, AI engineering, generative AI, AI agents, AR VR solutions, drone services, 3D printing, deep tech company, technology training, Centers of Excellence",
      },
      { property: "og:title", content: "Kanagam Technology Solutions — GenQ & Deep-Tech Leader" },
      {
        property: "og:description",
        content:
          "Pioneering Quantum Computing, AI, VLSI, Embedded and Semiconductor innovation while empowering global academic ecosystems to lead tomorrow's digital frontier.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kanagamtech.in/" },
      { property: "og:image", content: "/images/services/quantum-1.jpg" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Kanagam Technology Solutions",
          alternateName: "Kanagam Tech",
          url: "https://kanagamtech.in/",
          logo: "https://kanagamtech.in/favicon.ico",
          slogan: "Driving the Next Wave of Technological Evolution",
          description:
            "Kanagam Technology Solutions is a premier GenQ (Quantum Generation) enterprise delivering Quantum Computing, Semiconductor & ESDM, VLSI/FPGA, Embedded & IIoT, AI/GenAI, AIBots, AR/VR, Drones, 3D fabrication and skill-development solutions for industry and academia.",
          knowsAbout: [
            "Quantum Computing",
            "Semiconductor Design & ESDM",
            "VLSI / FPGA Engineering",
            "Embedded Systems & IIoT",
            "AI Engineering & Generative AI",
            "AIBots / AI Agents",
            "Augmented Reality & Virtual Reality",
            "Drones",
            "3D Printing & Scanning",
            "Technical Training & Certifications",
          ],
        },
      },
    ],
    links: [{ rel: "canonical", href: "https://kanagamtech.in/" }],
  }),
  component: Index,
});

const METRICS = [
  { val: "2 Decades", label: "Combined Veteran Tech Leadership" },
  {
    val: "10 Core Focus",
    label: "Powering Tomorrow's Technology",
  },
  { val: "Global", label: "Academic & Industrial Training Ecosystem" },
  { val: "Homegrown", label: "Design, Prototyping, Assembly, and Engineering Solutions" },
];

function isPageReload(): boolean {
  try {
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries.length > 0) {
      return (navEntries[0] as PerformanceNavigationTiming).type === "reload";
    }
    return (performance as unknown as { navigation?: { type?: number } }).navigation?.type === 1;
  } catch {
    return false;
  }
}

// True only while the app mounts for the very first time on this page load.
let isFirstMountOnLoad = true;

function checkShouldShowIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (!isFirstMountOnLoad) return false;
  isFirstMountOnLoad = false;
  return isPageReload();
}

const MULTILINGUAL_TAGLINES = [
  {
    lang: "English",
    text: "KanagamTech — Where Deep Technology Meets Real-World Innovation.",
    fontClass: "font-display font-semibold tracking-tight text-[clamp(0.88rem,1.9vw,1.25rem)]",
  },
  {
    lang: "Tamil",
    text: "கனகம்டெக் — ஆழ்ந்த தொழில்நுட்பமும் நிஜ உலகப் புதுமையும் இணையும் களம்.",
    fontClass: "font-lang-ta font-semibold text-[clamp(0.82rem,1.8vw,1.15rem)]",
  },
  {
    lang: "Telugu",
    text: "కనగమ్‌టెక్ — లోతైన సాంకేతికత మరియు వాస్తవ ప్రపంచ ఆవిష్కరణల సంగమం.",
    fontClass: "font-lang-te font-semibold text-[clamp(0.82rem,1.8vw,1.15rem)]",
  },
  {
    lang: "Kannada",
    text: "ಕನಗಮ್‌ಟೆಕ್ — ಆಳವಾದ ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ನೈಜ ಜಗತ್ತಿನ ನಾವೀನ್ಯತೆಯ ಸಂಗಮ.",
    fontClass: "font-lang-kn font-semibold text-[clamp(0.82rem,1.8vw,1.15rem)]",
  },
  {
    lang: "Malayalam",
    text: "കനകംടെക് — ആഴത്തിലുള്ള സാങ്കേതികവിദ്യയും യഥാർത്ഥ ലോക നവീകരണവും ഒന്നിക്കുന്ന ഇടം.",
    fontClass: "font-lang-ml font-semibold text-[clamp(0.80rem,1.75vw,1.12rem)]",
  },
  {
    lang: "Hindi",
    text: "कनगमटेक — जहाँ गहन तकनीक और वास्तविक दुनिया का नवाचार मिलते हैं।",
    fontClass: "font-lang-hi font-semibold text-[clamp(0.82rem,1.8vw,1.15rem)]",
  },
];

function RotatingTagline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % MULTILINGUAL_TAGLINES.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const current = MULTILINGUAL_TAGLINES[currentIndex % MULTILINGUAL_TAGLINES.length];

  return (
    <div className="mx-auto mt-5 flex min-h-[2.5rem] w-full max-w-4xl items-center justify-center px-2 text-center">
      {current && (
        <p
          className={`whitespace-nowrap text-foreground transition-all duration-300 ease-in-out ${current.fontClass} ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-1 scale-[0.98]"
          }`}
        >
          {current.text}
        </p>
      )}
    </div>
  );
}

function Index() {
  const [intro, setIntro] = useState(false);
  // Dark theme is the brand default; user's explicit choice persists via localStorage.
  const [isDark, setIsDark] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIntro(checkShouldShowIntro());
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("kanagam-theme");
    if (stored) setIsDark(stored === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("kanagam-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleIntroComplete = () => {
    setIntro(false);
  };

  return (
    <>
      {intro && <QuantumIntro brand={BRAND} tagline={TAGLINE} onComplete={handleIntroComplete} />}

      <main className="relative min-h-screen overflow-hidden bg-background font-sans text-foreground transition-colors duration-500">
        <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-stage)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:var(--grain)]" />

        {/* Sticky Header Navigation */}
        <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-xl transition-colors">
          <div className="relative flex w-full items-center justify-between gap-4 px-6 py-3.5">
            <Link to="/" className="ml-3 flex items-center gap-3">
              <KanagamLogo size="lg" />
            </Link>

            {/* Nav centered to the screen, with click-to-open dropdowns */}
            <nav
              ref={navRef}
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase font-medium md:flex"
            >
              <Link className="transition-colors hover:text-primary" to="/about">
                About Us
              </Link>

              {/* Core Focus dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu("focus")}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "#focus";
                    setOpenMenu(null);
                  }}
                  className={`transition-colors ${openMenu === "focus" ? "text-primary" : "hover:text-primary"}`}
                >
                  CORE FOCUS
                </button>
                <div
                  className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    openMenu === "focus" ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <div className="w-72 overflow-hidden rounded-xl border border-border bg-card/95 shadow-xl backdrop-blur-xl">
                    <div className="border-b border-border/60 px-4 py-2.5 text-[0.55rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
                      10 Core Focus Pillars
                    </div>
                    {PILLARS.map((p) => {
                      const PIcon = p.icon;
                      return (
                        <Link
                          key={p.id}
                          to="/service/$slug"
                          params={{ slug: p.id }}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs tracking-normal text-muted-foreground normal-case transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                          <PIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{p.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Academia & Talent dropdown — opens on click only */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === "academia" ? null : "academia")}
                  className={`transition-colors ${openMenu === "academia" ? "text-primary" : "hover:text-primary"}`}
                >
                  ACADIMEA &amp; TALENT
                </button>
                <div
                  className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    openMenu === "academia" ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <div className="w-72 overflow-hidden rounded-xl border border-border bg-card/95 shadow-xl backdrop-blur-xl">
                    <div className="border-b border-border/60 px-4 py-2.5 text-[0.55rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
                      Academic Programs
                    </div>
                    {ACADEMIC_PROGRAMS.map((prog) => {
                      const GIcon = prog.icon;
                      return (
                        <Link
                          key={prog.slug}
                          to="/service/$slug"
                          params={{ slug: prog.slug }}
                          onClick={() => setOpenMenu(null)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs tracking-normal text-muted-foreground normal-case transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                          <GIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{prog.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Enquire dropdown — opens on click only */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === "enquire" ? null : "enquire")}
                  className={`transition-colors ${openMenu === "enquire" ? "text-primary" : "hover:text-primary"}`}
                >
                  ENQUIRE
                </button>
                <div
                  className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    openMenu === "enquire" ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <div className="w-72 overflow-hidden rounded-xl border border-border bg-card/95 shadow-xl backdrop-blur-xl">
                    <div className="border-b border-border/60 px-4 py-2.5 text-[0.55rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
                      Start an Enquiry
                    </div>
                    <a
                      href="#institutional-inquire"
                      onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs tracking-normal text-muted-foreground normal-case transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>Institutional / Partnership Enquiry</span>
                    </a>
                    <a
                      href="#student-inquire"
                      onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs tracking-normal text-muted-foreground normal-case transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <GraduationCap className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>Student Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
            </nav>

            {/* Theme toggle + CTAs pinned to the far-right end of the site */}
            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                title="Toggle Brand Light / Dark Mode"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:bg-secondary"
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-[#D7AB6A]" />
                ) : (
                  <Moon className="h-4 w-4 text-[#4B1D3F]" />
                )}
              </button>

              <Link
                to="/partners"
                className="rounded-full bg-[#4B1D3F] dark:bg-[#D7AB6A] px-5 py-2 text-[0.65rem] tracking-[0.2em] text-white dark:text-[#4B1D3F] uppercase font-bold shadow-md transition-transform hover:scale-105"
              >
                Partner With Us
              </Link>

              <a
                href="#focus"
                className="rounded-full border border-primary/30 bg-card/60 px-5 py-2 text-[0.65rem] tracking-[0.2em] text-foreground uppercase font-bold shadow-md transition-all hover:bg-secondary hover:scale-105"
              >
                All Products
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-2 pb-3 text-center">
          <QuantumAmbient className="pointer-events-none absolute top-[-5%] left-1/2 h-[min(760px,105vw)] w-[min(1100px,150vw)] -translate-x-1/2 opacity-75" />

          <div className="relative mt-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[0.68rem] tracking-[0.25em] text-primary uppercase font-mono font-medium">
              <Zap className="h-3.5 w-3.5" />
              Next-Gen Academic Solution Provider
            </div>

            <h1 className="font-display mt-6 text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.1] font-bold tracking-tight text-foreground">
              {TAGLINE}
            </h1>

            <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed font-normal text-muted-foreground">
              <strong className="font-bold text-white">{FULL_BRAND}</strong> is an Education and
              Technology solutions enterprise focused on establishing advanced technology
              laboratories and delivering industry-oriented skill development and employability
              training programs. The business provides end-to-end laboratory establishment solutions
              for Colleges, Universities, Educational Institutions, and other organizations,
              including consultation, planning, design, technology selection, supply, installation,
              integration, commissioning, training, and ongoing technical support.
            </p>
            <p className="mx-auto mt-4 max-w-4xl text-base leading-relaxed font-normal text-muted-foreground">
              Through a robust{" "}
              <strong className="text-foreground font-semibold">
                global academic and industrial training ecosystem
              </strong>
              , combined with a full-scale{" "}
              <strong className="text-foreground font-semibold">
                technology house for design, prototyping, assembly, and engineering solutions
              </strong>
              , we transform bold ideas into{" "}
              <strong className="text-foreground font-semibold">
                working, scalable technology.
              </strong>
            </p>
            <RotatingTagline />
          </div>
        </section>

        {/* Metrics Ribbon */}
        <section className="relative z-10 border-y border-border/70 bg-card/50 backdrop-blur-sm">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-4 px-6 py-6 md:grid-cols-4">
            {METRICS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-extrabold tracking-tight text-primary">
                  {s.val}
                </div>
                <div className="mt-1 text-[0.7rem] tracking-[0.1em] text-muted-foreground font-mono font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-medium">
                <ShieldCheck className="h-3.5 w-3.5" />
                About Us | {FULL_BRAND}
              </div>

              <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-[1.12] font-bold tracking-tight text-foreground">
                Driving Deep-Tech Innovation & Scaling Future Enterprises
              </h2>

              <p className="mt-6 text-base leading-relaxed text-muted-foreground font-normal">
                At <strong className="text-foreground font-semibold">{FULL_BRAND}</strong>, we build
                the intelligent infrastructure that powers connected, autonomous systems —
                engineering robust IoT and IIoT architectures, embedded edge systems, and AI stack
                solutions that turn raw data into real-time intelligence. From sensors, gateways,
                and secure firmware to cloud analytics, our expertise spans AIoT, computer vision,
                and generative AI — bringing intelligent automation, predictive maintenance, and
                connected decision-making to industrial and enterprise environments alike.
              </p>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground font-normal">
                Founded and led by a team of seasoned industry veterans with decades of proven
                success in building and scaling tech enterprises,{" "}
                <strong className="text-foreground font-semibold">Kanagam Tech</strong> stands at
                the forefront of applied deep-tech innovation — across semiconductors and VLSI/FPGA
                design, quantum computing, drones and robotics, AR/VR, and additive manufacturing.
              </p>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground font-normal">
                We engineer state-of-the-art solutions while empowering institutions around the
                world to build sustainable technological capability — through university labs,
                Centers of Excellence, research partnerships, and workforce skill-development
                programs that keep talent and industry advancing together.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs font-display">
                    <Compass className="h-4 w-4" />
                    Veteran Leadership
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground font-normal">
                    Decades of experience building and scaling enterprise-grade IoT, embedded, and
                    AI-driven technology systems — now extending that expertise across quantum
                    computing, semiconductors, VLSI/FPGA, AR/VR, drones, and 3D fabrication.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs font-display">
                    <Globe className="h-4 w-4" />
                    Global Integration
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground font-normal">
                    Bridging university research directly into commercial deep-tech applications
                    across quantum computing, semiconductors, embedded systems, AI, AIoT, AR/VR,
                    drones, and 3D fabrication.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-card via-card to-background p-8 shadow-2xl backdrop-blur-xl">
                <div className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#D7AB6A] text-[#4B1D3F] shadow-md font-bold">
                  <Sparkles className="h-5 w-5" />
                </div>

                <span className="text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
                  Deep-Tech Leadership
                </span>

                <h3 className="font-display mt-2 text-xl font-bold text-foreground">
                  The Kanagam Standard
                </h3>

                <ul className="mt-6 space-y-4 text-sm font-normal text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#D7AB6A] shrink-0" />
                    <span>
                      <strong>Full-Spectrum Expertise:</strong> Spanning quantum computing,
                      semiconductors, VLSI/FPGA, and embedded systems under one technical roof.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#D7AB6A] shrink-0" />
                    <span>
                      <strong>End-to-End Solutions:</strong> From PCB design and SMT assembly to AI,
                      AIoT, drones, and 3D fabrication.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#D7AB6A] shrink-0" />
                    <span>
                      <strong>Educational Synergy:</strong> Building future workforce readiness
                      through dedicated skill development and technical training.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Integrated Vision & Mission Section */}
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {/* Vision Card */}
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-card to-background p-8 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Eye className="h-5 w-5" />
                </div>
                <span className="text-[0.7rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
                  Our Vision
                </span>
              </div>
              <h3 className="font-display mt-4 text-lg font-bold text-foreground">
                Shaping Tomorrow's Digital Frontier
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-normal italic">
                "To engineer transformative deep-tech solutions across quantum computing,
                semiconductors, VLSI/FPGA, embedded systems, AI, AIoT, AR/VR, drones, and 3D
                fabrication — empowering global academic ecosystems to lead and shape tomorrow's
                digital frontier."
              </p>
            </div>

            {/* Mission Card */}
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-card to-background p-8 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Target className="h-5 w-5" />
                </div>
                <span className="text-[0.7rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
                  Our Mission
                </span>
              </div>
              <h3 className="font-display mt-4 text-lg font-bold text-foreground">
                Empowering Innovation & Skill Excellence
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-normal italic">
                "To deliver industry-defining deep-tech solutions across quantum computing,
                semiconductors, VLSI/FPGA, embedded systems, AI, AIoT, AR/VR, drones, and 3D
                fabrication, while equipping academia and industry with world-class skill
                development and hands-on technological capability."
              </p>
            </div>
          </div>
        </section>

        {/* Core Focus Pillars Section (10 deep-tech pillars) */}
        <CoreFocusSection />

        {/* Empowering Academia & Next-Gen Talent Section */}
        <AcademiaSection />

        {/* Interactive Text Input & Partnership Request Form */}
        <InquiryFormSection />

        {/* Footer */}
        <footer className="relative z-10 border-t border-border/70 py-12 text-center text-xs text-muted-foreground bg-card/40">
          <div className="mx-auto max-w-6xl px-6 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <KanagamLogo size="sm" />
            </div>

            <div className="text-[0.65rem] tracking-[0.2em] uppercase font-mono font-medium">
              © {new Date().getFullYear()} {FULL_BRAND}. All Rights Reserved.
            </div>

            <div className="flex gap-6 text-[0.65rem] tracking-[0.2em] uppercase font-mono font-medium">
              <Link to="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <a href="#focus" className="hover:text-primary transition-colors">
                Focus Areas
              </a>
              <a href="#inquire" className="hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
