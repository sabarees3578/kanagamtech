/**
 * Brand emblem logos for the 10 Core Focus honeycomb pillars.
 * Each component renders the matching SVG from the official Kanagam icon
 * asset pack (kanagam_icon_asset_pack, files 01–10). The assets keep their
 * original brand gold strokes/fills, so they read correctly on both the
 * dark-plum and light-ivory hex faces.
 */

type IconProps = { className?: string };

function PillarLogo({ src, className }: { src: string } & IconProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      className={className}
    />
  );
}

/** Quantum Computing & GenQ */
export function QuantumMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/01-quantum-computing-genq.svg" className={className} />;
}

/** Semiconductor & ESDM */
export function SemiconductorMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/02-semiconductor-esdm.svg" className={className} />;
}

/** VLSI / FPGA Engineering */
export function VlsiFpgaMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/03-vlsi-fpga-engineering.svg" className={className} />;
}

/** Embedded Systems, IIoT & AIoT */
export function EmbeddedAiotMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/04-embedded-systems-iiot-aiot.svg" className={className} />;
}

/** AI Engineering & GenAI */
export function AiGenAiMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/05-ai-engineering-genai.svg" className={className} />;
}

/** AIBots */
export function AiBotsMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/06-ai-bots.svg" className={className} />;
}

/** AR/VR */
export function ArVrMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/07-ar-vr.svg" className={className} />;
}

/** Drones */
export function DronesMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/08-drones.svg" className={className} />;
}

/** 3D Scanner & 3D Printer */
export function Scanner3dMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/09-3d-scanners-printers.svg" className={className} />;
}

/** Skill Development & Technical Training */
export function SkillDevMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/10-skill-development-training.svg" className={className} />;
}

/** Technology Foundations (academic frameworks) */
export function TechnologyFoundationsMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/11-technology-foundations.svg" className={className} />;
}

/** Design Engineering (research / CoE labs) */
export function DesignEngineeringMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/13-design-engineering.svg" className={className} />;
}

/** Venture Creation (incubation & innovation hubs) */
export function VentureCreationMark({ className }: IconProps) {
  return <PillarLogo src="/pillar-icons/18-venture-creation.svg" className={className} />;
}
