import { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import { PILLARS, type Pillar } from "@/lib/services";

export type { Pillar };

export function CoreFocusSection() {
  const [selectedPillar, setSelectedPillar] = useState<string>(PILLARS[0]!.id);

  const active = PILLARS.find((p) => p.id === selectedPillar) ?? PILLARS[0]!;

  return (
    <section id="focus" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-medium">
            <Sparkles className="h-3.5 w-3.5" />7 Core Technology Focus Pillars
          </div>
          <h2 className="font-display mt-4 text-[clamp(1.9rem,4vw,2.8rem)] font-bold tracking-tight text-foreground">
            Our Key Focus Areas
          </h2>
        </div>
        <p className="max-w-md text-sm font-normal text-muted-foreground leading-relaxed">
          Pioneering deep-tech innovations across hardware, software, semiconductors, PCB assembly,
          quantum systems, and workforce skill development.
        </p>
      </div>

      {/* Grid of 7 Pillars */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isSelected = pillar.id === selectedPillar;

          return (
            <button
              key={pillar.id}
              onClick={() => setSelectedPillar(pillar.id)}
              className={`group relative flex flex-col justify-between rounded-xl border p-5 text-left transition-all duration-300 ${
                isSelected
                  ? "border-primary/70 bg-gradient-to-b from-primary/15 to-card shadow-lg shadow-primary/10 ring-1 ring-primary/40"
                  : "border-border/70 bg-card/60 hover:border-primary/40 hover:bg-card"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] tracking-[0.25em] text-primary font-mono font-bold">
                    0{idx + 1}
                  </span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.55rem] tracking-wider text-muted-foreground uppercase font-mono font-medium">
                    {pillar.readiness}
                  </span>
                </div>

                <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-background text-primary transition-transform group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-display mt-4 text-sm font-bold tracking-tight text-foreground leading-snug">
                  {pillar.title}
                </h3>
              </div>

              <div className="mt-5 flex items-center gap-1 text-[0.65rem] tracking-[0.2em] text-primary uppercase font-bold">
                <span>{isSelected ? "Active View" : "Explore"}</span>
                <ChevronRight
                  className={`h-3 w-3 transition-transform ${isSelected ? "translate-x-1" : "group-hover:translate-x-1"}`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Focus Detail View */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-8 shadow-xl backdrop-blur-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary shrink-0">
                <active.icon className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
                  {active.category}
                </span>
                <h4 className="font-display text-xl font-bold tracking-tight text-foreground">
                  {active.title}
                </h4>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground font-normal">
              {active.description}
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background p-5 lg:min-w-[340px]">
            <h5 className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-mono font-bold">
              Key Application Domains
            </h5>
            <ul className="mt-3 space-y-2">
              {active.keyApplications.map((app, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-normal text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D7AB6A] shrink-0" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* All Seven Key Focus Areas — listed below the focus containers */}
      <div className="mt-6 rounded-2xl border border-primary/30 bg-card/80 p-6 shadow-lg backdrop-blur-md">
        <h5 className="text-center text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
          All Seven Key Focus Areas
        </h5>
        <ul className="mt-4 grid gap-1 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => {
            const isActive = pillar.id === selectedPillar;
            return (
              <li key={pillar.id}>
                <button
                  onClick={() => setSelectedPillar(pillar.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                    isActive
                      ? "bg-primary/10 font-bold text-primary"
                      : "font-normal text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <span
                    className={`font-mono text-[0.6rem] tracking-widest ${
                      isActive ? "text-primary" : "text-muted-foreground/70"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      isActive ? "bg-[#D7AB6A]" : "bg-border"
                    }`}
                  />
                  <span>{pillar.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
