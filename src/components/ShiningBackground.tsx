const SHINE_KEYS = `
  @keyframes kbsMoveDown { 0% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
  @keyframes kbsDriftDown { 0% { transform: translate(0,0); } 100% { transform: translate(0, 30px); } }
  @keyframes kbsPulse { 0%,100% { opacity: 0.35; } 50% { opacity: 0.8; } }
`;

/**
 * Plum "shining motion" background theme — layered, always-animating glows
 * and a diagonal shine sweep that loops strictly top-to-bottom. Render as the
 * first child inside a `relative overflow-hidden` parent (e.g. each page's
 * <main>).
 */
export function ShiningBackground({
  variant = "default",
  fixed = false,
}: {
  variant?: "default" | "strong";
  fixed?: boolean;
}) {
  const strong = variant === "strong";
  const position = fixed ? "fixed inset-0 z-[2]" : "absolute inset-0";

  return (
    <div aria-hidden className={`pointer-events-none ${position} overflow-hidden`}>
      <style>{SHINE_KEYS}</style>

      {/* Base plum wash (stronger = deep plum page background) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: strong
            ? "linear-gradient(155deg, rgba(122,42,99,0.95) 0%, rgba(75,29,63,0.95) 32%, rgba(43,11,48,0.98) 64%, rgba(24,5,30,1) 100%)"
            : "radial-gradient(130% 110% at 18% 0%, rgba(122,42,99,0.26) 0%, rgba(75,29,63,0.18) 45%, rgba(24,5,30,0) 100%)",
          backgroundSize: "180% 180%",
          animation: strong
            ? "kbsMoveDown 9s ease-in-out infinite"
            : "kbsMoveDown 14s ease-in-out infinite",
        }}
      />

      {/* Drifting gold & plum glows (loop downward) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 18% 8%, rgba(240,196,120,0.15) 0%, transparent 52%), radial-gradient(110% 90% at 85% 95%, rgba(160,64,128,0.2) 0%, transparent 55%)",
          backgroundSize: "160% 160%, 150% 150%",
          animation: "kbsDriftDown 12s ease-in-out infinite",
        }}
      />

      {/* Diagonal shine band — sweeps top-left -> bottom-right in a loop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(120deg, transparent 44%, rgba(255,255,255,0.10) 50%, rgba(240,196,120,0.26) 56%, transparent 64%)",
          backgroundSize: "220% 220%",
          mixBlendMode: "screen",
          animation: "kbsMoveDown 7s ease-in-out infinite",
        }}
      />

      {/* Pulsing centre glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70% 70% at 50% 38%, rgba(240,196,120,0.12), transparent 60%)",
          animation: "kbsPulse 9s ease-in-out infinite",
        }}
      />
    </div>
  );
}
