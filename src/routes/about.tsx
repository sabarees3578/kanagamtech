import { createFileRoute, Link } from "@tanstack/react-router";
import { KanagamLogo } from "@/components/KanagamLogo";
import { QuantumOrb } from "@/components/QuantumOrb";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Kanagam Technology Solutions" },
      {
        name: "description",
        content:
          "Kanagam Technology Solutions is a premier GenQ enterprise — veteran-led across seven deep-tech pillars, empowering global academia and industry.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background font-sans text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-stage)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:var(--grain)]" />

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

      {/* Centered 3/4-width page body */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center px-6 py-16 md:w-3/4">
        {/* Three.js motion visual */}
        <QuantumOrb className="h-[300px] w-[300px] shrink-0 sm:h-[340px] sm:w-[340px]" />

        <div className="mt-20 text-center sm:mt-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            About Us | Kanagam Technology Solutions
          </div>
          <h1 className="font-display mt-4 text-[clamp(1.9rem,4.5vw,2.8rem)] leading-tight font-bold tracking-tight text-foreground">
            Kanagam Technology Solutions
          </h1>
          <p className="mt-3 text-[0.7rem] tracking-[0.25em] text-primary uppercase font-mono font-medium">
            Driving the Next Wave of Technological Evolution
          </p>
        </div>

        <div className="mt-8 space-y-5 text-center text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
          <p>
            <strong className="font-semibold text-foreground">Kanagam Technology Solutions</strong>{" "}
            is a premier GenQ (Quantum Generation) enterprise standing at the confluence of quantum
            research, intelligent systems, and global education — engineering the technologies that
            define tomorrow.
          </p>
          <p>
            Founded and led by seasoned industry veterans, we carry decades of combined leadership
            in building and scaling enterprise-grade technology companies across continents, with a
            track record of taking complex hardware and software systems from concept to global
            deployment.
          </p>
          <p>
            Our expertise spans seven deep-tech pillars —{" "}
            <strong className="text-foreground">Quantum Computing &amp; GenQ</strong>, AI-IoT &amp;
            IIoT, AI-Stack &amp; GenAI, Semiconductors &amp; ESDM, PCB &amp; SMT design and
            assembly, AR/VR immersive technology, and workforce Skill Development.
          </p>
          <p>
            As a full-scale tech house, we deliver end-to-end design, rapid prototyping, automated
            SMT assembly, and rigorous testing — transforming bold ideas into reliable,
            production-grade products.
          </p>
          <p>
            Beyond engineering, we are deeply invested in academia: modernizing curricula,
            establishing Centers of Excellence, nurturing startup incubation hubs, and delivering
            globally recognized certifications that prepare the next generation of innovators.
          </p>
          <p className="italic text-foreground/90">
            Our vision is to shape the Quantum Generation — building transformative technologies
            while empowering academic ecosystems worldwide to lead tomorrow's digital frontier.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            hash="institutional-inquire"
            className="rounded-full bg-[#4B1D3F] dark:bg-[#D7AB6A] px-8 py-3.5 text-xs font-bold tracking-[0.22em] text-white dark:text-[#4B1D3F] uppercase shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Partner With Us
          </Link>
          <Link
            to="/student-enquire"
            className="rounded-full border border-primary/40 bg-primary/10 px-8 py-3.5 text-xs font-bold tracking-[0.22em] text-primary uppercase transition-colors hover:bg-primary/20"
          >
            Student Enquire
          </Link>
        </div>
      </section>
    </main>
  );
}
