import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { KanagamLogo } from "@/components/KanagamLogo";
import { QuantumOrb } from "@/components/QuantumOrb";
import { ShiningBackground } from "@/components/ShiningBackground";
import { ArrowLeft, Eye, Target } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Kanagam Technology Solutions | GenQ Enterprise, India",
      },
      {
        name: "description",
        content:
          "A veteran-led GenQ enterprise spanning ten deep-tech pillars, empowering industry and global academia with engineering, manufacturing and skill training.",
      },
      {
        name: "keywords",
        content:
          "about Kanagam Tech, GenQ enterprise, deep tech company India, semiconductor and ESDM, quantum computing company, VLSI FPGA, embedded systems, AI engineering, AR VR, drone technology, 3D printing, centers of excellence",
      },
      { property: "og:title", content: "About Kanagam Technology Solutions" },
      {
        property: "og:description",
        content:
          "A veteran-led GenQ enterprise spanning ten deep-tech pillars, empowering industry and global academia with engineering, prototyping, manufacturing and training.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kanagamtech.in/about" },
    ],
    links: [{ rel: "canonical", href: "https://kanagamtech.in/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
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
      <ShiningBackground variant="strong" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:var(--grain)]" />

      {/* Simple Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <KanagamLogo size="sm" />
          </Link>
          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[0.6rem] tracking-[0.18em] text-foreground uppercase font-semibold transition-colors hover:bg-secondary sm:px-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* Centered page body */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col items-center px-6 py-16">
        {/* Quantum Orb — centered */}
        <QuantumOrb className="h-[min(56vw,300px)] w-[min(56vw,300px)] shrink-0 sm:h-[340px] sm:w-[340px]" />

        <div className="mt-16 text-center sm:mt-20">
          <h1 className="font-display text-[clamp(1.8rem,4.2vw,2.8rem)] leading-tight font-bold tracking-tight text-foreground">
            Kanagam Technology Solutions
          </h1>
          <p className="mt-3 text-[0.7rem] tracking-[0.25em] text-primary uppercase font-mono font-medium">
            Driving the Next Wave of Technological Evolution
          </p>
        </div>

        <div className="mt-8 max-w-4xl space-y-5 text-center text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
          <p>
            <strong className="font-semibold text-foreground">
              Kanagam Technology Solutions India Pvt Ltd
            </strong>{" "}
            is a premier GenQ (Quantum Generation) enterprise standing at the confluence of quantum
            research, intelligent systems, and global education — engineering the technologies that
            define tomorrow. Founded and led by seasoned industry veterans, we carry decades of
            combined leadership in building and scaling enterprise-grade technology companies across
            continents, with a track record of taking complex hardware and software systems from
            concept to global deployment. Our expertise spans ten deep-tech pillars —{" "}
            <strong className="text-foreground">Quantum Computing &amp; GenQ</strong>, Semiconductor
            &amp; ESDM (PCB Design, Prototype &amp; SMT Assembly), VLSI/FPGA Engineering, Embedded
            Systems &amp; IIoT/AIoT (Enterprise Deployed), AI Engineering &amp; GenAI, AIBots,
            AR/VR, Drones, 3D Scanner &amp; 3D Printer, and Skill Development &amp; Technical
            Training.
          </p>
          <p>
            As a full-scale tech house, we deliver end-to-end design, rapid prototyping, automated
            SMT assembly, and rigorous testing — transforming bold ideas into reliable,
            production-grade products. Beyond engineering, we are deeply invested in academia:
            modernizing curricula, establishing Centers of Excellence, nurturing startup incubation
            hubs, and delivering globally recognized certifications that prepare the next generation
            of innovators.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-10 grid w-full max-w-4xl gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#D7AB6A]/25 bg-card/40 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D7AB6A]/40 bg-[#D7AB6A]/10">
                <Target className="h-5 w-5 text-[#E9CD97]" />
              </div>
              <div className="text-[0.7rem] font-bold tracking-[0.3em] text-primary uppercase">
                Our Mission
              </div>
            </div>
            <p className="mt-4 text-justify font-mono text-[0.83rem] leading-relaxed text-muted-foreground">
              "To establish advanced technology laboratories and deliver industry oriented skill
              development and employability training programs, providing end to end solutions from
              consultation, planning and design to supply, installation, commissioning, training and
              ongoing technical support."
            </p>
          </div>
          <div className="rounded-2xl border border-[#D7AB6A]/25 bg-card/40 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D7AB6A]/40 bg-[#D7AB6A]/10">
                <Eye className="h-5 w-5 text-[#E9CD97]" />
              </div>
              <div className="text-[0.7rem] font-bold tracking-[0.3em] text-primary uppercase">
                Our Vision
              </div>
            </div>
            <p className="mt-4 text-justify font-mono text-[0.83rem] leading-relaxed text-muted-foreground">
              "To engineer transformative deep tech solutions across quantum computing,
              semiconductors, embedded systems, AI, AIoT, AR/VR, drones and 3D fabrication,
              empowering global academic ecosystems to lead and shape tomorrow's digital frontier."
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
