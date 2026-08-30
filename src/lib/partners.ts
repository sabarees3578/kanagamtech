export type Partner = {
  name: string;
  src: string;
  tagline: string;
  overview: string;
  tags: string[];
  site: string | null;
};

export const PARTNERS: Partner[] = [
  {
    name: "Accura Tequipment",
    src: "/partners img/Accura Tequipment.png",
    tagline: "Where Innovation Meets Excellence!",
    overview:
      "Designs, manufactures and supplies experimental & lab equipment for technical education — Centre of Excellence laboratories, industrial solutions (software, IoT and automation) and Training of Trainers, serving colleges and universities since 2012.",
    tags: ["COE Laboratories", "Industrial Solutions", "IoT & Automation", "Training of Trainers"],
    site: "https://www.theaccura.com",
  },
  {
    name: "AMS EMS",
    src: "/partners img/AMS EMS.jpeg",
    tagline: "PCB Assembly & Electronics Manufacturing Services",
    overview:
      "Electronics Manufacturing Services (EMS) based in Coimbatore, India — PCB assembly and electronic manufacturing support from prototyping through production.",
    tags: ["PCB Assembly", "Electronics Manufacturing", "EMS", "Coimbatore"],
    site: "https://amsems.in",
  },
  {
    name: "ARK Infosolutions",
    src: "/partners img/ARK Infosolutions.svg",
    tagline: "India's Leading Value-added Distributor",
    overview:
      "Value-added distributor for technology products across Media & Entertainment, AEC, Digital Manufacturing and Education — with 250+ channel partners, 100+ Indian cities, 350+ experts and 80,000+ happy customers.",
    tags: ["Value-added Distribution", "Media & Entertainment", "Digital Manufacturing", "AEC"],
    site: "https://www.arkinfo.in",
  },
  {
    name: "QuantumMate",
    src: "/partners img/QUANTUMMATE.jpeg",
    tagline: "Empowering Future Technologies",
    overview:
      "Making quantum computing accessible, practical and transformative — immersive training systems, teaching & research platforms, quantum simulation software and end-to-end quantum lab establishment for universities and enterprises.",
    tags: ["Quantum Training", "Quantum Simulation", "Quantum Lab Setup", "FDPs"],
    site: "https://quantummate.in",
  },
  {
    name: "RP3D Products",
    src: "/partners img/RP3D Products.jpg",
    tagline: "Experience the best with us",
    overview:
      "Chennai-based 3D printing company — 3D design, rapid prototyping services, 3D scanners, filaments, resins and moulding, plus 3D printing labs for schools and institutes across automotive, medical, education and R&D.",
    tags: ["3D Printing", "Rapid Prototyping", "3D Scanning", "Education Labs"],
    site: "https://rp3dproducts.com",
  },
  {
    name: "Silicon Systems",
    src: "/partners img/SILICON SYSTEM.jpeg",
    tagline: "Coimbatore · Est. 2014",
    overview:
      "Educational lab solutions and electronics development — VLSI, Embedded, DSP, Power Electronics, Drives & Power Systems and advanced process control, with PCB prototyping and product supply, support and development.",
    tags: ["VLSI", "Embedded", "Power Electronics", "Lab Solutions"],
    site: "https://siliconsystems.online",
  },
  {
    name: "Zorah Tech",
    src: "/partners img/Zora Technologies.png",
    tagline: "Connect. Automate. Innovate.",
    overview:
      "Industrial IoT, automation, AI security and smart infrastructure, engineered in Coimbatore — real-time machine monitoring, process automation and energy optimisation for smart factories and connected industries.",
    tags: ["Industrial IoT", "Automation", "AI Security", "Smart Infrastructure"],
    site: "https://zorahtech.in",
  },
];
