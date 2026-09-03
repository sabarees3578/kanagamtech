import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
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
  ArrowRight,
  Quote,
  Globe,
  Zap,
  Compass,
  Sun,
  Moon,
  GraduationCap,
  ChevronDown,
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
    <div className="mx-auto mt-3 sm:mt-5 flex min-h-[2.5rem] w-full max-w-4xl items-center justify-center px-2 text-center">
      {current && (
        <p
          className={`text-foreground transition-all duration-300 ease-in-out sm:whitespace-nowrap ${current.fontClass} ${
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

function MobileNavLink({
  to,
  label,
  onNavigate,
}: {
  to: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className="flex w-full items-center rounded-lg px-3 py-2.5 text-[0.72rem] font-semibold tracking-[0.18em] text-foreground uppercase transition-colors hover:bg-secondary/60"
    >
      {label}
    </Link>
  );
}

function Index() {
  const [intro, setIntro] = useState(false);
  // Dark theme is the brand default; user's explicit choice persists via localStorage.
  const [isDark, setIsDark] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIntro(checkShouldShowIntro());
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
          <div className="relative flex w-full items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 md:px-6">
            <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-3 sm:ml-3">
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
            <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
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
                className="hidden rounded-full bg-[#4B1D3F] dark:bg-[#D7AB6A] px-5 py-2 text-[0.65rem] tracking-[0.2em] text-white dark:text-[#4B1D3F] uppercase font-bold shadow-md transition-transform hover:scale-105 sm:inline-flex"
              >
                Partner With Us
              </Link>

              <a
                href="#focus"
                className="hidden rounded-full border border-primary/30 bg-card/60 px-5 py-2 text-[0.65rem] tracking-[0.2em] text-foreground uppercase font-bold shadow-md transition-all hover:bg-secondary hover:scale-105 md:inline-flex"
              >
                All Products
              </a>

              {/* Mobile hamburger menu toggle */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:bg-secondary md:hidden"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile navigation drawer */}
        <div
          className={`fixed inset-0 z-50 md:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
          aria-hidden={!mobileOpen}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div
            className={`absolute top-0 right-0 flex h-full w-[min(18rem,82vw)] flex-col overflow-y-auto border-l border-border bg-background shadow-2xl transition-transform duration-300 pb-safe ${
              mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 sm:px-5 sm:py-4 pt-safe">
              <KanagamLogo size="sm" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 p-4">
              <MobileNavLink to="/about" label="About Us" onNavigate={() => setMobileOpen(false)} />
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === "focus" ? null : "focus")}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[0.72rem] font-semibold tracking-[0.18em] text-foreground uppercase transition-colors hover:bg-secondary/60"
              >
                Core Focus
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openMenu === "focus" ? "rotate-180" : ""}`}
                />
              </button>
              {openMenu === "focus" && (
                <div className="ml-2 flex flex-col gap-0.5 border-l border-border/60 pl-3">
                  {PILLARS.map((p) => {
                    const PIcon = p.icon;
                    return (
                      <Link
                        key={p.id}
                        to="/service/$slug"
                        params={{ slug: p.id }}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.78rem] tracking-normal text-muted-foreground normal-case transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <PIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span>{p.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}

              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === "academia" ? null : "academia")}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[0.72rem] font-semibold tracking-[0.18em] text-foreground uppercase transition-colors hover:bg-secondary/60"
              >
                Academia &amp; Talent
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openMenu === "academia" ? "rotate-180" : ""}`}
                />
              </button>
              {openMenu === "academia" && (
                <div className="ml-2 flex flex-col gap-0.5 border-l border-border/60 pl-3">
                  {ACADEMIC_PROGRAMS.map((prog) => {
                    const GIcon = prog.icon;
                    return (
                      <Link
                        key={prog.slug}
                        to="/service/$slug"
                        params={{ slug: prog.slug }}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.78rem] tracking-normal text-muted-foreground normal-case transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <GIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span>{prog.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}

              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === "enquire" ? null : "enquire")}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[0.72rem] font-semibold tracking-[0.18em] text-foreground uppercase transition-colors hover:bg-secondary/60"
              >
                Enquire
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openMenu === "enquire" ? "rotate-180" : ""}`}
                />
              </button>
              {openMenu === "enquire" && (
                <div className="ml-2 flex flex-col gap-0.5 border-l border-border/60 pl-3">
                  <a
                    href="#institutional-inquire"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.78rem] tracking-normal text-muted-foreground normal-case transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>Institutional / Partnership Enquiry</span>
                  </a>
                  <a
                    href="#student-inquire"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.78rem] tracking-normal text-muted-foreground normal-case transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <GraduationCap className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>Student Enquire</span>
                  </a>
                </div>
              )}
            </nav>

            <div className="border-t border-border/60 p-4">
              <Link
                to="/partners"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-[#4B1D3F] dark:bg-[#D7AB6A] px-5 py-3 text-[0.7rem] tracking-[0.2em] text-white dark:text-[#4B1D3F] uppercase font-bold shadow-md"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 pt-2 pb-3 text-center">
          <QuantumAmbient className="pointer-events-none absolute top-[-5%] left-1/2 h-[min(760px,105vw)] w-[min(1100px,140vw)] -translate-x-1/2 opacity-75" />

          <div className="relative mt-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[0.68rem] tracking-[0.25em] text-primary uppercase font-mono font-medium">
              <Zap className="h-3.5 w-3.5" />
              Next-Gen Academic Solution Provider
            </div>

            <h1 className="font-display mt-6 text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.1] font-bold tracking-tight text-foreground">
              {TAGLINE}
            </h1>

            <p className="mx-auto mt-4 sm:mt-6 max-w-4xl text-sm sm:text-base leading-relaxed font-normal text-muted-foreground">
              <strong className="font-bold text-white">
                Kanagam Technology Solutions India Pvt Ltd
              </strong>{" "}
              is an Education and Technology solutions enterprise focused on{" "}
              <strong className="font-bold text-white">
                establishing advanced technology laboratories
              </strong>{" "}
              and delivering{" "}
              <strong className="font-bold text-white">industry-oriented skill development</strong>{" "}
              and <strong className="font-bold text-white">employability training</strong> programs.
              The business provides end-to-end laboratory establishment solutions for{" "}
              <strong className="font-bold text-white">
                Colleges, Universities, Educational Institutions
              </strong>
              , and other organizations, including{" "}
              <strong className="font-bold text-white">
                consultation, planning, design, technology selection, supply, installation,
                integration, commissioning, training
              </strong>
              , and ongoing <strong className="font-bold text-white">technical support</strong>.
            </p>
            <p className="mx-auto mt-3 sm:mt-4 max-w-4xl text-sm sm:text-base leading-relaxed font-normal text-muted-foreground">
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
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-3 sm:gap-y-4 px-4 sm:px-6 py-4 sm:py-6 md:grid-cols-4">
            {METRICS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-primary">
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
        <section id="about" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-[1.12] font-bold tracking-tight text-foreground">
                Driving Deep-Tech Innovation & Scaling Future Enterprises
              </h2>

              <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground font-normal">
                At{" "}
                <strong className="text-foreground font-semibold">
                  Kanagam Technology Solutions India Pvt Ltd
                </strong>
                , we build the intelligent infrastructure that powers connected, autonomous systems
                — engineering robust IoT and IIoT architectures, embedded edge systems, and AI stack
                solutions that turn raw data into real-time intelligence. From sensors, gateways,
                and secure firmware to cloud analytics, our expertise spans AIoT, computer vision,
                and generative AI — bringing intelligent automation, predictive maintenance, and
                connected decision-making to industrial and enterprise environments alike.
              </p>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground font-normal">
                Founded and led by a team of seasoned industry veterans with decades of proven
                success in building and scaling tech enterprises,{" "}
                <strong className="text-foreground font-semibold">Kanagam Tech</strong> stands at
                the forefront of applied deep-tech innovation — across semiconductors and VLSI/FPGA
                design, quantum computing, drones and robotics, AR/VR, and additive manufacturing.
              </p>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground font-normal">
                We engineer state-of-the-art solutions while empowering institutions around the
                world to build sustainable technological capability — through university labs,
                Centers of Excellence, research partnerships, and workforce skill-development
                programs that keep talent and industry advancing together.
              </p>

              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-xl border border-border bg-card p-3 sm:p-4 shadow-sm">
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

                <div className="rounded-xl border border-border bg-card p-3 sm:p-4 shadow-sm">
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
              <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-card via-card to-background p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
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
        </section>

        {/* Core Focus Pillars Section (10 deep-tech pillars) */}
        <CoreFocusSection />

        {/* Empowering Academia & Next-Gen Talent Section */}
        <AcademiaSection />

        {/* Interactive Text Input & Partnership Request Form */}
        <InquiryFormSection />

        {/* Footer */}
        <footer className="relative z-10 border-t border-border/70 py-12 text-center text-xs text-muted-foreground bg-card/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-center justify-between gap-4 sm:gap-6 md:flex-row">
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
