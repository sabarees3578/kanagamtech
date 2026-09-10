import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { KanagamLogo } from "@/components/KanagamLogo";
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
      className="relative h-[100dvh] overflow-hidden font-sans"
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
      <img
        src="/img/kanagam-final.png"
        alt="Kanagam Technology Solutions 2026"
        className="pointer-events-none absolute left-[3%] top-[46%] w-[min(48vw,640px)] -translate-y-1/2 rounded-2xl object-contain select-none"
      />

      {/* Simple Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-4 md:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-3 sm:ml-3">
            <KanagamLogo size="lg" />
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

      {/* Centered page body: content collage — fixed to one screen */}
      <section className="relative z-10 mx-auto flex h-[calc(100dvh-3.5rem)] w-full flex-col overflow-hidden px-4 sm:px-6 py-4 sm:py-6">
        <div className="my-auto ml-auto mr-0 w-full max-w-3xl text-center">
          <h1 className="font-display text-[clamp(1.3rem,3.7vh,2.1rem)] leading-tight font-bold tracking-tight text-foreground">
            Kanagam Technology Solutions
          </h1>
          <p className="mt-1 text-[0.62rem] tracking-[0.25em] text-[#E9CD97] uppercase font-mono font-medium">
            Driving the Next Wave of Technological Evolution
          </p>

          <div className="mt-3 max-w-4xl space-y-2 text-left text-[clamp(0.82rem,2.1vh,1rem)] leading-relaxed font-semibold text-foreground">
            <p>
              <strong className="font-bold text-[#EAD3A0]">
                Kanagam Technology Solutions India Pvt Ltd
              </strong>{" "}
              was founded on a{" "}
              <strong className="font-bold text-[#EAD3A0]">shared upbringing</strong> and{" "}
              <strong className="font-bold text-[#EAD3A0]">
                two decades of working side by side
              </strong>{" "}
              a rare closeness that shaped not just how its founders think, but how they build. That
              deep-rooted alignment shapes our approach today:{" "}
              <strong className="font-bold text-[#EAD3A0]">disciplined execution</strong>,{" "}
              <strong className="font-bold text-[#EAD3A0]">strong fundamentals</strong>, and an{" "}
              <strong className="font-bold text-[#EAD3A0]">unrelenting focus on quality</strong>.
            </p>
            <p>
              That same <strong className="font-bold text-[#EAD3A0]">depth of experience</strong>{" "}
              runs through our team, professionals who bring both{" "}
              <strong className="font-bold text-[#EAD3A0]">
                technical mastery and industry insight
              </strong>{" "}
              to everything we build. Guided by this collective expertise, we are laying{" "}
              <strong className="font-bold text-[#EAD3A0]">strong foundations</strong> across our
              people, processes, and partnerships as we begin this new journey with{" "}
              <strong className="font-bold text-[#EAD3A0]">clarity and purpose</strong>.
            </p>
          </div>
        </div>

        {/* Mission & Vision — bottom, opposite side of content */}
        <div className="mb-0 mt-auto mx-auto w-full max-w-5xl items-stretch gap-4 grid sm:grid-cols-2 sm:gap-4">
          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#D7AB6A]/25 bg-card/50 p-4 shadow-[inset_0_1px_0_rgba(240,196,120,0.14)] backdrop-blur-md">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#E9CD97]/70 to-transparent" />
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D7AB6A]/40 bg-[#D7AB6A]/10">
                <Target className="h-4.5 w-4.5 text-[#E9CD97]" />
              </div>
              <div className="text-[0.74rem] font-bold tracking-[0.28em] text-[#E9CD97] uppercase">
                Our Mission
              </div>
            </div>
            <p className="mt-2.5 flex-1 text-left font-mono text-[clamp(0.72rem,1.95vh,0.86rem)] leading-relaxed font-semibold text-foreground">
              "To establish{" "}
              <strong className="font-bold text-[#EAD3A0]">advanced technology laboratories</strong>{" "}
              and deliver{" "}
              <strong className="font-bold text-[#EAD3A0]">
                industry oriented skill development and employability training programs
              </strong>
              , providing <strong className="font-bold text-[#EAD3A0]">end to end solutions</strong>{" "}
              from{" "}
              <strong className="font-bold text-[#EAD3A0]">
                consultation, planning and design
              </strong>{" "}
              to{" "}
              <strong className="font-bold text-[#EAD3A0]">
                supply, installation, commissioning, training and ongoing technical support
              </strong>
              ."
            </p>
          </div>
          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#D7AB6A]/25 bg-card/50 p-4 shadow-[inset_0_1px_0_rgba(240,196,120,0.14)] backdrop-blur-md">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#E9CD97]/70 to-transparent" />
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D7AB6A]/40 bg-[#D7AB6A]/10">
                <Eye className="h-4.5 w-4.5 text-[#E9CD97]" />
              </div>
              <div className="text-[0.74rem] font-bold tracking-[0.28em] text-[#E9CD97] uppercase">
                Our Vision
              </div>
            </div>
            <p className="mt-2.5 flex-1 text-left font-mono text-[clamp(0.72rem,1.95vh,0.86rem)] leading-relaxed font-semibold text-foreground">
              "To engineer{" "}
              <strong className="font-bold text-[#EAD3A0]">
                transformative deep tech solutions
              </strong>{" "}
              across{" "}
              <strong className="font-bold text-[#EAD3A0]">
                quantum computing, semiconductors, embedded systems, AI, AIoT, AR/VR, drones and 3D
                fabrication
              </strong>
              , empowering{" "}
              <strong className="font-bold text-[#EAD3A0]">global academic ecosystems</strong> to
              lead and shape{" "}
              <strong className="font-bold text-[#EAD3A0]">tomorrow's digital frontier</strong>
              ."
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
