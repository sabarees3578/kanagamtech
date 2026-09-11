import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { ACADEMIC_PROGRAMS } from "@/lib/services";

const GLASS_TILE =
  "acad-tile relative flex flex-col overflow-hidden rounded-2xl border border-[#E9CD97]/25 bg-[#2a0d36]/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(28,4,40,0.5)]";

function TileContent({ prog, idx }: { prog: (typeof ACADEMIC_PROGRAMS)[number]; idx: number }) {
  const Icon = prog.icon;
  return (
    <div className="relative flex h-full flex-col p-4 sm:p-5 lg:p-7">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#E9CD97]/70 to-transparent" />
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 border border-[#E9CD97]/30 bg-[#E9CD97]/10 text-[#E9CD97] backdrop-blur-md transition-transform group-hover:scale-110">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <span className="font-mono text-[0.58rem] tracking-[0.2em] text-[#E9CD97]/40 sm:text-[0.64rem]">
          PROGRAM 0{idx + 1}
        </span>
      </div>

      <h3 className="font-display mt-4 bg-gradient-to-b from-[#FFF3D6] via-[#E9CD97] to-[#B98A4A] bg-clip-text text-base leading-snug font-semibold sm:text-lg tracking-wide text-transparent">
        {prog.title}
      </h3>
      <p className="mt-1 font-mono text-[0.6rem] tracking-[0.18em] text-[#E9CD97] uppercase sm:text-[0.66rem]">
        {prog.subtitle}
      </p>

      <div className="acad-extra">
        <p className="mt-3 text-justify text-xs leading-relaxed text-white font-light sm:text-sm">
          {prog.description}
        </p>

        <div className="mt-auto pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E9CD97]/30 bg-[#E9CD97]/10 px-2.5 py-1 text-[0.62rem] tracking-[0.15em] text-[#F1DEB5] sm:text-[0.66rem] uppercase transition-colors group-hover:border-[#E9CD97]/60 group-hover:bg-[#E9CD97]/20 group-hover:text-white">
            Explore
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function AcademiaSection() {
  const [p1, p2, p3, p4] = ACADEMIC_PROGRAMS;
  const [openRow, setOpenRow] = useState<number | null>(null);
  const toggleRow = (row: number) => setOpenRow((prev) => (prev === row ? null : row));
  return (
    <section
      id="academia"
      className="relative z-10 overflow-hidden border-t border-border/60 bg-secondary/20 py-14 sm:py-20 md:py-28"
    >
      {/* Plum & gold gradient mesh backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#7a2a63] opacity-40 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-[#C9A24B] opacity-20 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 h-[26rem] w-[26rem] rounded-full bg-[#4B1D3F] opacity-50 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase">
            <GraduationCap className="h-3.5 w-3.5" />
            Global Academic Ecosystem
          </div>
          <h2 className="font-display mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[0.06em] text-foreground">
            Empowering Academia & Next-Gen Talent
          </h2>
          <p className="mt-4 text-justify text-sm leading-relaxed text-white font-normal">
            Beyond cutting-edge development,{" "}
            <strong className="font-bold text-[#EAD3A0]">Kanagam Technology Pvt Ltd</strong> is
            deeply committed to bridging the gap between{" "}
            <strong className="font-bold text-[#EAD3A0]">industry innovation</strong> and{" "}
            <strong className="font-bold text-[#EAD3A0]">academic excellence</strong>. We
            collaborate with{" "}
            <strong className="font-bold text-[#EAD3A0]">
              leading educational institutions worldwide
            </strong>{" "}
            to build robust,{" "}
            <strong className="font-bold text-[#EAD3A0]">
              future-ready technological ecosystems
            </strong>
            .
          </p>
        </div>

        {/* 4 Program Tiles: row 1 = rectangle + square, row 2 = square + rectangle */}
        <div className="mt-10 sm:mt-14 mx-auto max-w-5xl space-y-4 sm:space-y-5">
          <div className={`acad-row group ${openRow === 0 ? "is-open" : ""}`}>
            <div className={`${GLASS_TILE} acad-rect`}>
              <TileContent prog={p1} idx={0} />
            </div>
            <div
              className={`${GLASS_TILE} acad-sq cursor-pointer ${openRow === 0 ? "is-open" : ""}`}
              onClick={() => toggleRow(0)}
            >
              <TileContent prog={p2} idx={1} />
            </div>
          </div>
          <div className={`acad-row group ${openRow === 1 ? "is-open" : ""}`}>
            <div
              className={`${GLASS_TILE} acad-sq cursor-pointer ${openRow === 1 ? "is-open" : ""}`}
              onClick={() => toggleRow(1)}
            >
              <TileContent prog={p3} idx={2} />
            </div>
            <div className={`${GLASS_TILE} acad-rect`}>
              <TileContent prog={p4} idx={3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
