import React from "react";

interface LogoProps {
  mode?: "primary" | "reverse" | "auto";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Official Kanagam Technology Solutions Logo component using the brand assets from /public:
 * 1. /Kanagam technology solutions 2026.png (Primary Logo for Light theme)
 * 2. /Kanagam technology solutions white 2026.png (Reverse Logo for Dark theme)
 */
export const KanagamLogo: React.FC<LogoProps> = ({
  mode = "auto",
  size = "md",
  className = "",
}) => {
  // Height scale: sm (h-8), md (h-10), lg (h-14), xl (h-20)
  const heightMap = {
    sm: "h-8 sm:h-9",
    md: "h-10 sm:h-12",
    lg: "h-14 sm:h-16",
    xl: "h-20 sm:h-24",
  };

  const primarySrc = "/Kanagam technology solutions 2026.png";
  const whiteSrc = "/Kanagam technology solutions white 2026.png";

  if (mode === "primary") {
    return (
      <img
        src={primarySrc}
        alt="Kanagam Technology Solutions"
        className={`w-auto object-contain select-none ${heightMap[size]} ${className}`}
      />
    );
  }

  if (mode === "reverse") {
    return (
      <img
        src={whiteSrc}
        alt="Kanagam Technology Solutions"
        className={`w-auto object-contain select-none ${heightMap[size]} ${className}`}
      />
    );
  }

  // Auto mode: shows primary logo in light mode and white logo in dark mode
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <img
        src={primarySrc}
        alt="Kanagam Technology Solutions"
        className={`w-auto object-contain dark:hidden ${heightMap[size]}`}
      />
      <img
        src={whiteSrc}
        alt="Kanagam Technology Solutions"
        className={`w-auto object-contain hidden dark:block ${heightMap[size]}`}
      />
    </div>
  );
};

/** Standalone Symbol Tile for favicons, app tiles, and compact marks */
export const KanagamSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = "",
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-xl bg-[#D7AB6A] p-2 shadow-md ${className}`}
    >
      <svg
        viewBox="0 0 40 40"
        className="h-full w-full fill-none stroke-[#4B1D3F] stroke-[4.5] stroke-linecap-round stroke-linejoin-round"
      >
        <line x1="12" y1="8" x2="12" y2="32" />
        <line x1="28" y1="10" x2="12" y2="24" />
        <line x1="16" y1="20" x2="28" y2="30" />
      </svg>
    </div>
  );
};

/** Social Brandmark #kanagamtech for campaigns and community content */
export const KanagamSocialBrandmark: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={`inline-flex items-center gap-1 font-display font-bold text-lg tracking-tight ${className}`}
    >
      <span className="text-[#D7AB6A]">#</span>
      <span className="text-[#4B1D3F] dark:text-white">kanagamtech</span>
    </div>
  );
};
