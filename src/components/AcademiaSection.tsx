import { GraduationCap, CheckCircle2 } from "lucide-react";
import { ACADEMIC_PROGRAMS } from "@/lib/services";

export function AcademiaSection() {
  return (
    <section
      id="academia"
      className="relative z-10 border-t border-border/60 bg-secondary/20 py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase">
            <GraduationCap className="h-3.5 w-3.5" />
            Global Academic Ecosystem
          </div>
          <h2 className="font-display mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-extralight tracking-[0.06em] text-foreground">
            Empowering Academia & Next-Gen Talent
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground font-light">
            Beyond cutting-edge development,{" "}
            <strong className="text-foreground font-normal">Kanagam Tech</strong> is deeply
            committed to bridging the gap between industry innovation and academic excellence. We
            collaborate with leading educational institutions worldwide to build robust,
            future-ready technological ecosystems.
          </p>
        </div>
        ``
        {/* 4 Pillars Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {ACADEMIC_PROGRAMS.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground/70">
                      PROGRAM 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display mt-6 text-xl font-normal tracking-wide text-foreground">
                    {prog.title}
                  </h3>
                  <p className="text-[0.7rem] tracking-[0.2em] text-primary uppercase font-mono mt-1">
                    {prog.subtitle}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground font-light">
                    {prog.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-border/50 pt-5">
                  <h4 className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-semibold">
                    Core Outcomes
                  </h4>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {prog.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-light text-foreground"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
