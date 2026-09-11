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
      className="relative min-h-[100dvh] overflow-hidden font-sans"
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
      <div className="pointer-events-none absolute left-[3%] top-[42%] -translate-y-1/2 hidden sm:block">
        <div className="about-float">
          <img
            src="/img/kanagam-final.png"
            alt="Kanagam Technology Solutions 2026"
            className="w-[min(44vw,640px)] rounded-2xl object-contain select-none"
          />
        </div>
      </div>

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

      {/* Centered page body: content collage â€” fixed to one screen */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full flex-col px-4 sm:px-6 py-4 sm:py-6">
        <div className="my-auto ml-auto mr-0 w-full max-w-3xl text-center">
          <h1 className="font-display text-[clamp(1.3rem,3.7vh,2.1rem)] leading-tight font-bold tracking-tight text-foreground">
            Kanagam Technology Solutions
          </h1>
          <p className="mt-1 text-[0.62rem] tracking-[0.25em] text-[#E9CD97] uppercase font-mono font-medium">
            Driving the Next Wave of Technological Evolution
          </p>

          <div className="mt-3 max-w-4xl space-y-2 text-justify text-[clamp(0.82rem,2.1vh,1rem)] leading-relaxed font-semibold text-foreground">
            <p>
              <strong className="font-bold text-[#EAD3A0]">
                Kanagam Technology Solutions India Pvt Ltd
              </strong>{" "}
              is a{" "}
              <strong className="font-bold text-[#EAD3A0]">
                new-generation technology company
              </strong>{" "}
              built on{" "}
              <strong className="font-bold text-[#EAD3A0]">two decades of shared experience</strong>
              , a <strong className="font-bold text-[#EAD3A0]">common vision</strong>, and a{" "}
              <strong className="font-bold text-[#EAD3A0]">
                deep commitment to technology and learning
              </strong>
              . Our founders have worked{" "}
              <strong className="font-bold text-[#EAD3A0]">
                side by side for over two decades
              </strong>
              , an experience that has shaped not only how they think, but also how they approach
              challenges, build capabilities, and pursue meaningful outcomes. That shared foundation
              continues to guide Kanagam today through{" "}
              <strong className="font-bold text-[#EAD3A0]">
                disciplined execution, strong fundamentals, and an unrelenting focus on quality
              </strong>
              .
            </p>
            <p>
              That <strong className="font-bold text-[#EAD3A0]">depth of experience</strong> shapes
              how we approach technology, education, and industryâ€”combining{" "}
              <strong className="font-bold text-[#EAD3A0]">
                technical expertise with practical industry insight
              </strong>{" "}
              and a{" "}
              <strong className="font-bold text-[#EAD3A0]">
                strong culture of continuous learning
              </strong>
              . Through{" "}
              <strong className="font-bold text-[#EAD3A0]">
                meaningful partnerships and hands-on innovation
              </strong>
              , we transform knowledge into{" "}
              <strong className="font-bold text-[#EAD3A0]">
                practical solutions, future-ready skills, and impactful technology initiatives
              </strong>{" "}
              that create <strong className="font-bold text-[#EAD3A0]">lasting value</strong> for
              learners, institutions, professionals, and industry.
            </p>
          </div>
        </div>

        {/* Mission & Vision â€” bottom, opposite side of content */}
        <div className="mb-2 sm:mb-3 mt-auto mx-auto grid w-full max-w-4xl items-stretch gap-5 sm:grid-cols-2 sm:gap-8">
          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#D7AB6A]/25 bg-card/50 p-4 sm:p-5 shadow-[inset_0_1px_0_rgba(240,196,120,0.14)] backdrop-blur-md">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#E9CD97]/70 to-transparent" />
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D7AB6A]/40 bg-[#D7AB6A]/10">
                <Target className="h-4.5 w-4.5 text-[#E9CD97]" />
              </div>
              <div className="text-[0.74rem] font-bold tracking-[0.28em] text-[#E9CD97] uppercase">
                Our Mission
              </div>
            </div>
            <p className="mt-2.5 flex-1 text-justify font-sans text-[clamp(0.82rem,1.95vh,0.95rem)] leading-relaxed font-medium text-foreground">
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
          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#D7AB6A]/25 bg-card/50 p-4 sm:p-5 shadow-[inset_0_1px_0_rgba(240,196,120,0.14)] backdrop-blur-md">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#E9CD97]/70 to-transparent" />
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D7AB6A]/40 bg-[#D7AB6A]/10">
                <Eye className="h-4.5 w-4.5 text-[#E9CD97]" />
              </div>
              <div className="text-[0.74rem] font-bold tracking-[0.28em] text-[#E9CD97] uppercase">
                Our Vision
              </div>
            </div>
            <p className="mt-2.5 flex-1 text-justify font-sans text-[clamp(0.82rem,1.95vh,0.95rem)] leading-relaxed font-medium text-foreground">
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
