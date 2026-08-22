import {
  Radio,
  Brain,
  CircuitBoard,
  Cpu,
  Zap,
  Tv,
  GraduationCap,
  BookOpen,
  Microscope,
  Rocket,
  Award,
  type LucideIcon,
} from "lucide-react";

export interface Pillar {
  id: string;
  title: string;
  category: string;
  icon: LucideIcon;
  description: string;
  keyApplications: string[];
  readiness: string;
}

export const PILLARS: Pillar[] = [
  {
    id: "quantum",
    title: "Quantum Computing & GenQ",
    category: "Coherent Qubit Stacks & Infrastructure",
    icon: Zap,
    description:
      "Developing cryogenic control hardware, quantum algorithm orchestration, and hybrid classical-quantum computing infrastructure for complex scientific computation.",
    keyApplications: [
      "Cryogenic Control Hardware",
      "Superconducting & Photonic Qubits",
      "Quantum Algorithm Orchestration",
      "GenQ Security & Cryptography",
    ],
    readiness: "GenQ Co-R&D",
  },
  {
    id: "ai-iot",
    title: "AI-IoT & IIoT",
    category: "Connected Smart Intelligence & Industrial Sensors",
    icon: Radio,
    description:
      "Integrating Edge AI with Industrial Internet of Things (IIoT) to enable real-time telemetry, predictive maintenance, automated sensor fusion, and smart factory automation.",
    keyApplications: [
      "Smart Factory Automation",
      "Predictive Maintenance Systems",
      "Industrial Telemetry & Sensor Fusion",
      "Automated Edge Data Gateways",
    ],
    readiness: "Enterprise Deployed",
  },
  {
    id: "ai-genai",
    title: "AI-Stack Development & GenAI",
    category: "Full-Stack AI Engines & LLM Pipelines",
    icon: Brain,
    description:
      "Engineering custom full-stack AI architectures, domain-specific Generative AI models, automated RAG pipelines, and high-throughput inference engines.",
    keyApplications: [
      "Custom LLM & RAG Architectures",
      "Enterprise AI Stack Integration",
      "High-Throughput Model Inference",
      "Automated Reasoning Engines",
    ],
    readiness: "Production Deployed",
  },
  {
    id: "semiconductor",
    title: "Semiconductor & ESDM",
    category: "Silicon Design & Electronics Manufacturing",
    icon: CircuitBoard,
    description:
      "Designing custom ASIC architectures, power-efficient microelectronics, and Electronics System Design and Manufacturing (ESDM) for high-performance deep-tech workloads.",
    keyApplications: [
      "Custom ASIC & SoC Architecture",
      "ESDM Product Engineering",
      "Sub-nanometer Photonic Silicon",
      "Hardware Acceleration Chips",
    ],
    readiness: "Fab Co-Design",
  },
  {
    id: "pcb-smt",
    title: "PCB & SMT – Design, Prototyping & Assembly",
    category: "End-to-End Board Engineering & SMT Assembly",
    icon: Cpu,
    description:
      "Providing rapid multi-layer PCB design, Surface Mount Technology (SMT) automated assembly, quick-turn prototyping, and industrial-grade hardware testing services.",
    keyApplications: [
      "High-Density Multi-Layer PCB Design",
      "Automated SMT Line Assembly",
      "Quick-Turn Hardware Prototyping",
      "Rigorous Quality Testing & Inspection",
    ],
    readiness: "Tech House Services",
  },
  {
    id: "ar-vr",
    title: "AR/VR & Immersive Tech",
    category: "Spatial Computing & Digital Twins",
    icon: Tv,
    description:
      "Building spatial computing applications, hyper-realistic Augmented & Virtual Reality environments, digital twins, and simulation platforms for industry and research.",
    keyApplications: [
      "Industrial Digital Twins",
      "Immersive Academic & Research Labs",
      "Spatial Simulation Engines",
      "AR/VR Training Modules",
    ],
    readiness: "Academic & Enterprise Ready",
  },
  {
    id: "skill-dev",
    title: "Skill Development Trainings",
    category: "Workforce Empowerment & Academic Excellence",
    icon: GraduationCap,
    description:
      "Empowering students, faculty, and industry professionals through hands-on technical bootcamps, CoE lab setups, industry-recognized certifications, and workforce skill building.",
    keyApplications: [
      "University CoE Lab Enablement",
      "Hands-on Hardware & Software Bootcamps",
      "Global Industry Certifications",
      "Faculty Development Programs (FDP)",
    ],
    readiness: "Global Academic Network",
  },
];

export interface AcademicProgram {
  slug: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    slug: "curriculum-modernization",
    icon: BookOpen,
    title: "Curriculum Modernization",
    subtitle: "Future-Ready Deep-Tech Frameworks",
    description:
      "Enhancing university academic frameworks to seamlessly integrate future-ready skills across Quantum Computing, Artificial Intelligence, Edge Systems, and Microelectronics.",
    deliverables: [
      "Industry-aligned syllabus design",
      "Hands-on lab project modules",
      "Faculty orientation & training",
      "Regular industry benchmark updates",
    ],
  },
  {
    slug: "center-of-excellence",
    icon: Microscope,
    title: "Centers of Excellence (CoE)",
    subtitle: "On-Campus Research & Innovation Labs",
    description:
      "Establishing state-of-the-art technology centers and advanced research labs directly within university campuses, equipped with deep-tech hardware access and cloud runtimes.",
    deliverables: [
      "Dedicated quantum & AI lab setups",
      "Hardware-software testbed access",
      "Joint university-industry research projects",
      "Direct technical mentoring & guidance",
    ],
  },
  {
    slug: "incubation-innovation-hubs",
    icon: Rocket,
    title: "Incubation & Innovation Hubs",
    subtitle: "Nurturing Student & Faculty Startups",
    description:
      "Empowering student and faculty entrepreneurs through comprehensive incubation support, seed strategy, prototype acceleration, and executive industry mentorship.",
    deliverables: [
      "Startup incubation & mentorship",
      "Prototype funding guidance",
      "Intellectual property (IP) support",
      "Venture & investor networking",
    ],
  },
  {
    slug: "global-certifications-training",
    icon: Award,
    title: "Global Certifications & Training",
    subtitle: "Industry-Recognized Deep-Tech Credentials",
    description:
      "Providing world-class, industry-accredited learning programs and practical bootcamps to prepare the next generation of engineers, researchers, and innovators.",
    deliverables: [
      "Certified GenQ specialist tracks",
      "Hands-on capstone evaluations",
      "Global industry badge credentials",
      "Direct talent placement assistance",
    ],
  },
];

export interface ServiceDetail {
  slug: string;
  group: "Core Focus" | "Academia & Talent";
  title: string;
  category: string;
  description: string;
  highlightsTitle: string;
  highlights: string[];
  badge?: string;
  icon: LucideIcon;
}

export const ALL_SERVICES: ServiceDetail[] = [
  ...PILLARS.map((p) => ({
    slug: p.id,
    group: "Core Focus" as const,
    title: p.title,
    category: p.category,
    description: p.description,
    highlightsTitle: "Key Application Domains",
    highlights: p.keyApplications,
    badge: p.readiness,
    icon: p.icon,
  })),
  ...ACADEMIC_PROGRAMS.map((prog) => ({
    slug: prog.slug,
    group: "Academia & Talent" as const,
    title: prog.title,
    category: prog.subtitle,
    description: prog.description,
    highlightsTitle: "Core Outcomes",
    highlights: prog.deliverables,
    icon: prog.icon,
  })),
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return ALL_SERVICES.find((s) => s.slug === slug);
}
