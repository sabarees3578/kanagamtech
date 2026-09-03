import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { PARTNERS, type Partner } from "@/lib/partners";

/* =========================================================
   3D COVERFLOW MOTION ENGINE — adapted from the reference
   skeleton and restyled with the plum + gold brand palette.
   Shared by the /partners page and the home-page inquiry
   section so the motion stays identical everywhere.
   ========================================================= */
export const MOTION_CSS = `
  .kbs-stage {
    --motion-card-w: clamp(112px, 24vh, 264px);
    --motion-card-h: clamp(112px, 24vh, 264px);
    --motion-idle-bob: 6px;
    --motion-idle-duration: 3.6s;
    perspective: 1200px;
    touch-action: pan-y;
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
    inset: 12px 12px 40px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 20px;
    background: linear-gradient(160deg, #24102d 0%, #12061a 100%);
    border: 2px solid rgba(215, 171, 106, 0.78);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(215, 171, 106, 0.18);
    animation: kbsFall 0.9s cubic-bezier(0.25, 0.8, 0.3, 1.1) backwards;
    animation-delay: var(--kbs-fall-delay, 0s);
  }
  @keyframes kbsFall {
    0% { opacity: 0; transform: translateY(-70px) scale(0.7) rotate(-4deg); }
    65% { opacity: 1; transform: translateY(8px) scale(1.05) rotate(1deg); }
    100% { opacity: 1; transform: translateY(0px) scale(1) rotate(0deg); }
  }
  .kbs-card .kbs-cover img {
    max-width: 64%;
    max-height: 64%;
    object-fit: contain;
  }
  /* Company name riding below the logo tile, revolving in parallel with the card */
  .kbs-name {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 8px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.5rem;
    line-height: 1;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #e9cd97;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.75);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    animation: kbsFall 0.9s cubic-bezier(0.25, 0.8, 0.3, 1.1) backwards;
    animation-delay: var(--kbs-fall-delay, 0s);
  }
  .kbs-card.is-center { filter: none; }
  .kbs-card.is-edge { filter: saturate(0.9) brightness(0.96); }
  .kbs-card:not(.is-center) .kbs-cover {
    filter: saturate(0.92) brightness(0.96) blur(1.2px);
  }
  .kbs-card.is-edge .kbs-cover {
    filter: saturate(0.85) brightness(0.92) blur(3px);
  }
  .kbs-card.is-center .kbs-cover {
    border-color: rgba(233, 205, 151, 0.95);
    box-shadow: 0 0 0 3px rgba(217, 171, 102, 0.25), 0 26px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(215, 171, 106, 0.34);
  }

  /* Breathing gold aura behind the focused card */
  .kbs-center-glow {
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--kbs-glow-size, min(46vh, 440px));
    height: var(--kbs-glow-size, min(46vh, 440px));
    pointer-events: none;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(233, 205, 151, 0.3) 0%, rgba(215, 171, 106, 0.12) 42%, rgba(18, 3, 23, 0) 68%);
    animation: kbsPulse 3.2s ease-in-out infinite;
  }
  @keyframes kbsPulse {
    0%, 100% { opacity: 0.45; transform: translate(-50%, -50%) scale(0.92); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.06); }
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
    .kbs-cover { animation: none; }
    .kbs-canvas { display: none; }
    .kbs-static { display: flex; }
  }
`;

const SPARK_POSITIONS = [
  { top: "16%", left: "12%", delay: "0s" },
  { top: "26%", left: "84%", delay: "1.1s" },
  { top: "58%", left: "7%", delay: "0.4s" },
  { top: "64%", left: "90%", delay: "1.8s" },
  { top: "38%", left: "49%", delay: "2.4s" },
  { top: "78%", left: "30%", delay: "0.9s" },
  { top: "82%", left: "70%", delay: "2.9s" },
  { top: "10%", left: "56%", delay: "2.1s" },
];

type CoverflowMotionProps = {
  partners?: Partner[];
  onCenterChange?: (name: string) => void;
  className?: string;
  style?: CSSProperties;
  heightClass?: string;
  cardSize?: string;
  glowSize?: string;
  ambience?: boolean;
};

export function CoverflowMotion({
  partners = PARTNERS,
  onCenterChange,
  className = "",
  style,
  heightClass = "h-full",
  cardSize,
  glowSize,
  ambience = false,
}: CoverflowMotionProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = partners.map((item, i) => {
      const el = document.createElement("div");
      el.className = "kbs-card";
      el.style.setProperty("--kbs-bob-delay", `${(i % 5) * 0.3}s`);
      el.style.setProperty("--kbs-fall-delay", `${i * 0.09}s`);
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
      const label = document.createElement("span");
      label.className = "kbs-name";
      label.textContent = item.name;
      el.appendChild(label);
      track.appendChild(el);
      return { el, img, item };
    });

    let spacing = (cards[0]?.el.offsetWidth || 150) * 2;
    const total = cards.length;
    const maxAngle = 55;
    const cardsPerSecond = 0.22;
    let speed = (spacing * cardsPerSecond) / 60;
    let loopWidth = spacing * total;
    let depth = spacing * 0.85;
    let fadeDist = spacing * 3.2;
    let offset = 0;
    let lastCenter = -1;
    let rafId = 0;
    let paused = false;
    let lastInteract = 0;

    const measure = () => {
      spacing = (cards[0]?.el.offsetWidth || 150) * 2;
      speed = (spacing * cardsPerSecond) / 60;
      loopWidth = spacing * total;
      depth = spacing * 0.85;
      fadeDist = spacing * 3.2;
    };

    const frame = () => {
      if (!paused) {
        offset += speed;
        if (offset > loopWidth) offset -= loopWidth;
      } else if (lastInteract && performance.now() - lastInteract > 2400) {
        paused = false;
        lastInteract = 0;
      }

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
        onCenterChange?.(cards[currentCenter].item.name);
      }
      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    let dragging = false;
    let lastX = 0;
    const nudge = (delta: number) => {
      offset += delta;
      offset = ((offset % loopWidth) + loopWidth) % loopWidth;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      paused = true;
      lastInteract = performance.now();
      nudge(e.deltaY * 0.45);
    };
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      paused = true;
      lastInteract = performance.now();
      lastX = e.clientX;
      stage.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      lastInteract = performance.now();
      nudge(-dx * 0.4);
    };
    const onPointerUp = () => {
      dragging = false;
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(rafId);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", measure);
      track.innerHTML = "";
    };
  }, [partners, onCenterChange]);

  const stageStyle: CSSProperties = {
    ...(cardSize
      ? ({ "--motion-card-w": cardSize, "--motion-card-h": cardSize } as CSSProperties)
      : {}),
    ...(glowSize ? ({ "--kbs-glow-size": glowSize } as CSSProperties) : {}),
  };

  return (
    <div className={`relative w-full ${heightClass} ${className}`} style={style}>
      <style>{MOTION_CSS}</style>

      {ambience && (
        <>
          <div className="kbs-shining" />
          <div className="kbs-streak" />
          {SPARK_POSITIONS.map((s, i) => (
            <span
              key={i}
              className="kbs-spark"
              style={{ top: s.top, left: s.left, animationDelay: s.delay }}
            />
          ))}
        </>
      )}

      <div className="relative flex h-full w-full items-center justify-center overflow-visible">
        <div
          ref={stageRef}
          style={stageStyle}
          className="kbs-stage kbs-canvas relative flex h-full w-full max-w-6xl items-center justify-center"
        >
          <div className="kbs-center-glow" />
          <div ref={trackRef} className="kbs-track relative z-[1]" />
        </div>

        {/* Static fallback for reduced-motion users */}
        <div className="kbs-static absolute inset-0 hidden flex-wrap content-center items-center justify-center gap-5 overflow-y-auto px-6 py-4">
          {partners.map((partner) => (
            <CapsuleCard key={partner.name} src={partner.src} alt={partner.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CapsuleCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex w-44 flex-col items-center gap-3 sm:w-56">
      <div className="kbs-hex relative flex h-32 w-32 items-center justify-center bg-gradient-to-b from-[#E9CD97] via-[#D7AB6A] to-[#B98A3E] drop-shadow-[0_0_22px_rgba(240,196,120,0.35)] sm:h-36 sm:w-36">
        <div className="kbs-hex relative m-[3px] flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#2f1138] to-[#1c0826] p-4">
          <div className="kbs-shine" />
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="kbs-hex relative max-h-full max-w-full object-contain drop-shadow-[0_0_10px_rgba(240,196,120,0.35)]"
          />
        </div>
      </div>
      <span className="text-[0.58rem] tracking-[0.22em] text-[#E9CD97] uppercase">{alt}</span>
    </div>
  );
}
