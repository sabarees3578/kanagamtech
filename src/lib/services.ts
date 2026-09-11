import type { ComponentType } from "react";
import {
  QuantumMark,
  SemiconductorMark,
  VlsiFpgaMark,
  EmbeddedAiotMark,
  AiGenAiMark,
  AiBotsMark,
  ArVrMark,
  DronesMark,
  Scanner3dMark,
  SkillDevMark,
  TechnologyFoundationsMark,
  DesignEngineeringMark,
  VentureCreationMark,
} from "@/components/PillarIcons";

/** Either a lucide icon or one of our custom pillar emblem marks. */
export type IconComponent = ComponentType<{ className?: string }>;

export interface Pillar {
  id: string;
  title: string;
  category: string;
  icon: IconComponent;
  description: string;
  longDescription?: string[];
  images?: string[];
  keyApplications: string[];
  readiness: string;
}

export const PILLARS: Pillar[] = [
  {
    id: "quantum",
    title: "Quantum Computing & GenQ",
    category: "Coherent Qubit Stacks & Infrastructure",
    icon: QuantumMark,
    description:
      "Developing **cryogenic control hardware**, **quantum algorithm orchestration**, and **hybrid classical-quantum computing** infrastructure for complex scientific computation.",
    longDescription: [
      "Kanagam Tech's Quantum Computing & GenQ practice delivers **full-stack quantum capability** — from the **millikelvin hardware layer** where **qubits** live, all the way up through **control electronics**, **orchestration software**, and the **hybrid classical-quantum** applications that solve real industrial problems. As a **GenQ (Quantum Generation)** enterprise, we build the foundations that let research labs, universities, and industries move from quantum theory to working quantum workflows.",
      "At the hardware layer, we develop **cryogenic control and measurement systems** purpose-built for **superconducting and photonic qubit platforms**. This includes **FPGA- and CMOS-based qubit control** and readout electronics, precision **Arbitrary Waveform Generation (AWG)** channels, cryogenic wiring looms, attenuator and filter stacks, and **low-noise signal chains** engineered to preserve **coherence** at dilution-refrigerator temperatures. Every board we ship is validated for thermal load, crosstalk, and timing jitter — because at 15 millikelvin, physics tolerates no shortcuts.",
      "Our **quantum algorithm orchestration** layer abstracts the complexity of the machines themselves. We build tooling for **circuit design and transpilation**, **pulse-level scheduling**, **noise characterisation**, and **error suppression and mitigation** strategies that squeeze usable **fidelity** out of today's **NISQ-era** devices. **Hardware-agnostic execution runtimes** let researchers target different **QPU backends** without rewriting a single line of their experiment code.",
      "Because useful **quantum advantage** emerges from **hybrid workflows**, we integrate quantum processors tightly with classical **high-performance compute**. Our infrastructure supports **variational algorithms** such as **VQE and QAOA**, **GPU-accelerated statevector and tensor-network simulators**, intelligent workload schedulers that partition jobs between CPU, GPU, and QPU resources, and **cloud-burst architectures** for institutions without on-premises quantum hardware.",
      "Beyond computation, our **GenQ mandate** covers **quantum-safe readiness** for the enterprises we serve: **post-quantum cryptography** migration assessments, **quantum random number generation (QRNG)**, **quantum-safe communication** pilots, and the organisational playbooks needed to secure data against harvest-now-decrypt-later threats.",
      "Every engagement runs on our **Co-R&D model** — shared roadmaps, joint intellectual property, and co-developed labs with universities and industry partners. Combined with our **skill-development tracks**, we don't just deliver **quantum infrastructure**; we grow the **quantum-ready workforce** that will operate it.",
      "Anchored in our **ten-pillar strategy** and **two decades of veteran leadership**, this **GenQ capability** extends from our technology house to Tamil Nadu campuses like Anna University and our global academic network — ensuring Kanagam Tech's quantum infrastructure is both **Homegrown** and globally relevant.",
    ],
    images: [
      "/images/services/quantum-1.jpg",
      "/images/services/quantum-2.jpg",
      "/images/services/quantum-3.jpg",
    ],
    keyApplications: [
      "Cryogenic Control Hardware",
      "Superconducting & Photonic Qubits",
      "Quantum Algorithm Orchestration",
      "GenQ Security & Cryptography",
    ],
    readiness: "GenQ Co-R&D",
  },
  {
    id: "semiconductor",
    title: "Semiconductor & ESDM",
    category: "Silicon Design & Electronics Manufacturing",
    icon: SemiconductorMark,
    description:
      "Designing **custom ASIC architectures**, **power-efficient microelectronics**, and **Electronics System Design and Manufacturing (ESDM)** for **high-performance deep-tech workloads**.",
    longDescription: [
      "We provide **practical learning in semiconductor design, electronics, and Electronic System Design and Manufacturing** through structured training, laboratory activities, and project-based learning. Learners understand how electronic systems progress from design concepts to functional hardware while gaining exposure to industry practices.",
      "Our curriculum introduces **digital system design**, **ASIC and SoC concepts**, **RTL development**, and hardware description languages such as **Verilog and VHDL**. Through guided projects and practical exercises, learners explore design methodologies, simulation, verification, and the fundamentals of developing reliable digital hardware.",
      "Learners are introduced to **semiconductor physical design**, including **floorplanning, placement, routing, timing analysis, and design verification**. Practical activities help students understand how design decisions influence **performance, power, area**, and overall chip implementation.",
      "The learning experience extends to **electronic hardware**, **board-level design**, **embedded platforms**, and **hardware-software integration**. Through practical projects, learners develop skills in circuit development, hardware interfacing, firmware integration, and system-level testing.",
      "Learners explore the transition from electronic design to manufacturing through **design-for-manufacturing, assembly, testing, quality, and production workflows**. This provides a practical understanding of how semiconductor and electronic designs are prepared for reliable product development.",
      "Practical projects introduce learners to applications across **automotive, industrial electronics, consumer technology, and semiconductor systems**. Learners also gain exposure to emerging areas such as **AI hardware, hardware acceleration, embedded systems, and semiconductor-driven computing**.",
      "Our project-based approach connects semiconductor education with industry expectations through **curriculum-aligned laboratories**, **practical projects**, **faculty development**, and **technical bootcamps**. By combining semiconductor design, electronics, embedded systems, verification, and manufacturing concepts, we help learners develop practical skills for careers across the **semiconductor and ESDM ecosystem**.",
    ],
    images: [
      "/images/services/semiconductor-1.jpg",
      "/images/services/semiconductor-2.jpg",
      "/images/services/semiconductor-3.jpg",
    ],
    keyApplications: [
      "Custom ASIC & SoC Architecture",
      "ESDM Product Engineering",
      "Sub-nanometer Photonic Silicon",
      "Hardware Acceleration Chips",
    ],
    readiness: "Fab Co-Design",
  },
  {
    id: "vlsi-fpga",
    title: "VLSI / FPGA Engineering",
    category: "Chip Design & Reconfigurable Logic",
    icon: VlsiFpgaMark,
    description:
      "Designing custom **VLSI and FPGA-based digital systems** — **RTL development**, **silicon architecture**, and **reconfigurable hardware acceleration** for academic labs, startups, and enterprise product teams.",
    longDescription: [
      "We build **industry-ready skills in VLSI and FPGA engineering** through practical learning, structured laboratories, and project-based development. Learners explore the complete digital-design journey from **architecture and RTL design** to **simulation, verification, synthesis, and FPGA implementation** using industry-relevant workflows.",
      "Our curriculum covers **digital design**, **microarchitecture**, **RTL development**, and hardware description languages such as **Verilog and VHDL**. Through hands-on laboratory work, learners gain practical experience with **simulation, functional verification, timing analysis, synthesis, and design optimization** while working with modern **FPGA and SoC development platforms**.",
      "Learners explore **FPGA-based system design** through practical projects involving **programmable logic**, **high-speed interfaces**, **DSP, signal processing, and hardware acceleration**. Development environments and industry-standard toolchains are introduced through guided exercises, enabling learners to move from logic design and simulation to **working hardware implementations**.",
      "The learning experience extends to advanced VLSI concepts including **ASIC design flows**, **IP development**, **verification methodologies**, and **hardware architecture**. Project-based activities help learners understand how digital systems are designed, tested, optimized, and prepared for real-world applications across **semiconductor and electronics industries**.",
      "Our laboratories provide an applied environment where learners can **design, simulate, verify, and implement digital systems** using FPGA development boards and industry-oriented workflows. **Faculty development**, **technical workshops**, and **hands-on bootcamps** further support institutions in building practical VLSI and FPGA learning capabilities.",
      "Our project-based approach connects academic learning with industry expectations by combining **strong design fundamentals**, **practical tool experience**, and **real hardware implementation**. Learners develop the technical confidence and problem-solving skills required for careers in **VLSI, FPGA, digital design, semiconductor engineering, and advanced hardware development**.",
    ],
    images: [
      "/images/services/vlsi-fpga-1.jpg",
      "/images/services/vlsi-fpga-2.jpg",
      "/images/services/vlsi-fpga-3.jpg",
    ],
    keyApplications: [
      "ASIC & RTL Microarchitecture",
      "FPGA Prototyping Boards",
      "EDA Toolchain Enablement",
      "Hardware Accelerator Design",
    ],
    readiness: "Design & Lab Ready",
  },
  {
    id: "embedded-aiot",
    title: "Embedded Systems, IIoT & AIoT",
    category: "Connected Devices & Industrial Intelligence",
    icon: EmbeddedAiotMark,
    description:
      "Building **industry-ready skills in Embedded Systems, IoT, IIoT and AIoT** through hands-on learning, practical laboratories, and real-world technology projects.",
    longDescription: [
      "We build **industry-ready skills** through practical learning in **embedded systems, IoT, IIoT, and AIoT**. Learners move beyond theory by designing, developing, and testing connected solutions that reflect real-world engineering practices and modern **Industry 4.0** requirements.",
      "Our embedded systems curriculum covers **firmware development**, **embedded architecture**, and **board-level programming** across platforms such as **ARM Cortex-M, RISC-V, ESP32, and STM32**. Through structured laboratory work and guided projects, learners develop practical skills in **real-time systems**, **device drivers**, **hardware interfacing**, and **embedded application development**.",
      "Learners explore **industrial connectivity and IIoT** using industry-standard technologies such as **Modbus, OPC-UA, and MQTT**, along with wireless technologies including **LoRaWAN and NB-IoT**. Practical activities demonstrate how devices, gateways, and existing systems can be connected to digital platforms for reliable industrial data exchange.",
      "Our **Edge AI programs** introduce **embedded AI, TinyML, and real-time data processing** through practical applications such as **anomaly detection**, **equipment monitoring**, and **predictive maintenance**. Learners gain experience in developing intelligent solutions that process data closer to the device while understanding how edge technologies support modern industrial applications.",
      "The learning experience extends to **industrial cloud platforms**, **data visualization**, **automation**, and **smart-factory technologies**. Learners explore how data from connected systems can be transformed into dashboards, analytics, monitoring applications, and actionable insights for improved operational understanding.",
      "Practical projects introduce learners to **PLC, SCADA, robotics, and connected production systems**, helping them understand the relationship between industrial control, automation, data, and intelligent technologies. Our laboratory environments provide opportunities to work with connected devices, gateways, automation systems, and digital monitoring platforms.",
      "Our project-based approach connects academic learning with industry expectations through **practical laboratories**, **curriculum-aligned projects**, **faculty development**, and **technical bootcamps**. By combining embedded systems, IoT, Edge AI, automation, and Industry 4.0 technologies, we help learners develop the practical knowledge and confidence needed for **connected-industry careers**.",
    ],
    images: [
      "/images/services/embedded-aiot-1.jpg",
      "/images/services/embedded-aiot-2.jpg",
      "/images/services/embedded-aiot-3.jpg",
    ],
    keyApplications: [
      "Embedded Firmware & Board Support",
      "IIoT Sensor Networks & Gateways",
      "Edge AI & TinyML Inference",
      "Smart Factory & SCADA Integration",
    ],
    readiness: "Enterprise Deployed",
  },
  {
    id: "ai-genai",
    title: "AI Engineering & GenAI",
    category: "Full-Stack AI Engines & LLM Pipelines",
    icon: AiGenAiMark,
    description:
      "Engineering **production-grade artificial intelligence** and domain-specific **Generative AI** models — **RAG pipelines**, **agentic workflows**, and high-throughput **inference engines** across academia and industry.",
    longDescription: [
      "Our AI Engineering & GenAI practice builds **production-grade artificial intelligence** — not demos. We own the entire lifecycle: **data engineering**, **model development**, **retrieval architectures**, **inference infrastructure**, and the **MLOps** discipline that keeps systems accurate, fast, and safe after launch.",
      "Every serious AI system starts with a serious data foundation. We design **ingestion pipelines**, **feature stores**, **vector databases**, and **data-governance** layers that give models clean, current, and permission-aware context — because a **GenAI system** is only ever as good as what it can reliably retrieve.",
      "On the model layer, we **fine-tune** open-weight and frontier **LLMs** on domain-specific corpora, build **Retrieval-Augmented Generation (RAG)** pipelines with **hybrid search and re-ranking**, and develop specialised **generative engines** for documents, code, designs, and conversational support — tuned to your organisation's tone, terminology, and compliance boundaries.",
      "**Inference** is an engineering discipline of its own. We deploy **GPU-optimised serving** stacks with **quantisation**, **KV-cache tuning**, continuous batching, and autoscaling strategies that cut latency and cost simultaneously, whether workloads run on-premises, in private cloud, or at the edge.",
      "Beyond single-shot generation, we assemble **agentic workflows** — reasoning engines that plan multi-step tasks, call enterprise tools and APIs, verify their own outputs, and escalate to humans when confidence drops. These agents plug into existing **ERP, CRM, and ticketing systems** so AI amplifies the processes you already trust.",
      "Everything ships inside an **MLOps envelope**: automated **evaluation suites**, **drift monitoring**, **red-teaming** for prompt injection and data leakage, audit trails, and rollback pipelines. **Responsible-AI guardrails** are engineered in from day one, not bolted on after an incident.",
      "As a core pillar among our ten, this AI stack embodies **two decades of veteran leadership** — engineered **Homegrown** in our technology house and enriched by our global academic network, with institutions co-developing domain-specific GenAI for local enterprise needs.",
    ],
    images: [
      "/images/services/aigenai-1.jpg",
      "/images/services/aigenai-2.jpg",
      "/images/services/aigenai-3.jpg",
    ],
    keyApplications: [
      "Custom LLM & RAG Architectures",
      "Enterprise AI Stack Integration",
      "High-Throughput Model Inference",
      "Automated Reasoning Engines",
    ],
    readiness: "Production Deployed",
  },
  {
    id: "aibots",
    title: "AIBots",
    category: "Autonomous Conversational & Task Agents",
    icon: AiBotsMark,
    description:
      "Building **autonomous AI agents** and **conversational bots** — **RAG-powered assistants**, **workflow-automation bots**, and **multi-agent systems** that deliver measurable outcomes.",
    longDescription: [
      "Our AIBots practice turns **large language models** into dependable, working agents — not chatbot demos. We engineer **conversational assistants**, **knowledge bots**, and **task-automation agents** that plug into your data, your tools, and your business rules, and stay accountable for the outcomes they produce.",
      "**Conversational assistants** start with a solid retrieval backbone: we ground every answer in your own documents, knowledge bases, and FAQs using **RAG pipelines** with **hybrid search**, **re-ranking**, and **citation** so the bot can show exactly where its answer came from. **Multi-turn memory**, tone control, and escalation to human agents are designed in from the first conversation.",
      "**Knowledge bots** specialise in specific domains — academic counselling, student onboarding, HR policies, technical support, compliance Q&A — where accuracy matters more than breadth. We **fine-tune models** and craft system prompts that keep replies within approved boundaries and handle the edge cases real users actually type.",
      "**Business-process automation agents** go beyond chat: they validate data, fill forms, trigger workflows, and integrate with your **CRM, ERP, ticketing, and calendar systems** through well-guarded API tool arrays. Every action is logged, permission-scoped, and reviewable, so automation increases throughput without reducing control.",
      "For complex work we compose **multi-agent systems** — an orchestrator that plans the task, specialist agents that research, draft, verify, and a supervisor that checks quality and decides when human confirmation is required. These architectures scale to document processing, lead triage, research assistance, and support queues.",
      "Our academic and enterprise lab programmes let institutions build and host their own AIBots: hands-on bootcamps covering **prompt engineering**, **RAG**, tool-use, **evaluation**, and **safety**, plus the infrastructure to run and monitor student-built agents — building the next generation of agent engineers.",
      "Every bot ships with an **evaluation harness**, **drift and hallucination monitoring**, **red-teaming** against prompt injection, and **audit trails** — because an agent you can't inspect is an agent you can't trust.",
    ],
    images: [
      "/images/services/aibots-1.jpg",
      "/images/services/aibots-2.jpg",
      "/images/services/aibots-3.jpg",
    ],
    keyApplications: [
      "Customer-Support Conversational Bots",
      "RAG Knowledge Assistants",
      "Process-Automation Agents",
      "Multi-Agent Orchestration",
    ],
    readiness: "Enterprise Ready",
  },
  {
    id: "ar-vr",
    title: "AR/VR",
    category: "Spatial Computing & Immersive Labs",
    icon: ArVrMark,
    description:
      "Building **augmented and virtual reality environments**, **digital twins**, and **immersive training simulations** — with end-to-end **lab establishment** for colleges, universities, and enterprises.",
    longDescription: [
      "We build **practical learning experiences in AR, VR, spatial computing, and immersive technologies**. Learners explore how virtual environments can support engineering education, technical training, simulation, and interactive experiences through guided projects and hands-on laboratory activities.",
      "Our AR and VR curriculum introduces learners to **immersive application development**, **3D environments**, **interaction design**, and **real-time simulation**. Through practical projects, learners develop experiences that combine digital content, spatial interaction, and engineering concepts using modern immersive technology platforms.",
      "**Digital twin technologies** help learners understand how physical systems can be represented and explored in virtual environments. Through simulation-based projects, learners work with virtual models of equipment, processes, and environments to study system behaviour, visualize data, and understand engineering scenarios without relying entirely on physical infrastructure.",
      "Our training also explores **immersive simulation for technical and workforce development**. Learners can design virtual training scenarios for areas such as assembly, maintenance, inspection, safety, and equipment operation, gaining an understanding of how immersive technologies can support skill development and reduce the dependency on physical training environments.",
      "The learning experience extends to **interactive visualization**, **virtual laboratories**, and **collaborative learning environments**. Learners explore how complex engineering concepts can be presented through immersive simulations, enabling institutions to create engaging learning experiences that connect classroom concepts with practical applications.",
      "Through practical projects, learners gain exposure to **spatial computing workflows**, **3D content development**, **simulation environments**, and **immersive deployment** across VR, AR, and mixed-reality platforms. These activities help develop the technical and creative skills required to design effective immersive solutions for education, engineering, and industrial applications.",
      "Our project-based approach connects immersive technology education with real-world industry requirements through **laboratory programs**, **curriculum-aligned projects**, **faculty development**, and **technical workshops**. By combining AR, VR, digital twins, simulation, and spatial computing, we help learners build practical skills for emerging careers in **immersive technology and Industry 4.0**.",
    ],
    images: [
      "/images/services/arvr-1.jpg",
      "/images/services/arvr-2.jpg",
      "/images/services/arvr-3.jpg",
    ],
    keyApplications: [
      "Industrial Digital Twins",
      "Immersive Academic & Research Labs",
      "Spatial Simulation Engines",
      "AR/VR Training Modules",
    ],
    readiness: "Academic & Enterprise Ready",
  },
  {
    id: "drones",
    title: "Drones",
    category: "UAV Systems & Autonomous Flight",
    icon: DronesMark,
    description:
      "Designing, building, and training with **unmanned aerial systems** — **custom UAV airframes**, **flight controllers**, **payload integration**, and **aerial-data pipelines** for inspection, mapping, and research.",
    longDescription: [
      "Our Drones practice covers the full **unmanned-aerial-systems stack** — from hand-built **quadcopters** and **fixed-wing airframes** to **autonomous flight**, payload electronics, and the data pipelines that turn flights into decisions.",
      "On the hardware side we design and assemble **custom UAV airframes** sized to mission: **heavy-lift multirotors** for industrial inspection, compact **FPV racers** and trainer quads for education, and **fixed-wing platforms** for long-endurance mapping. Each build integrates motors, ESCs, **flight controllers**, GPS, telemetry, and power systems engineered for reliability and safe flight.",
      "**Flight software** is where capability is unlocked. We configure and tune **autopilot stacks (ArduPilot, PX4)**, implement **GPS-guided autonomous missions**, **geofencing**, failsafe behaviour, and **first-person-view (FPV)** systems, and integrate camera gimbals, **LiDAR**, thermal, and **multispectral payloads** for inspection, agriculture, and survey applications.",
      "Behind every drone is a **data pipeline**: **photogrammetric and LiDAR processing** that turns raw captures into **orthomosaics**, **3D point clouds**, and **digital elevation models** used for asset inspection, stockpile measurement, and site mapping — delivered as layers in your existing GIS or inspection software.",
      "For academic institutions we establish complete **drone laboratories**: build-and-fly student kits, simulation and flight-training bays, **DGCA-aligned** awareness modules, and research support for environmental, agricultural, and disaster-response studies. Students graduate having assembled, flown, and programmed the very systems industry deploys.",
      "Enterprise engagements follow **regulated, safe playbooks**: mission planning, permissions and compliance, **pilot training and certification** support, maintenance regimes, and outcome reports tied to your operational KPIs.",
    ],
    images: [
      "/images/services/drones-1.jpg",
      "/images/services/drones-2.jpg",
      "/images/services/drones-3.jpg",
    ],
    keyApplications: [
      "Custom UAV Design & Assembly",
      "FPV & Autonomous Flight Training",
      "Payload & Sensor Integration",
      "Aerial Mapping & Inspection Pipelines",
    ],
    readiness: "Lab & Field Ready",
  },
  {
    id: "scanner-3d",
    title: "3D Scanner & 3D Printer",
    category: "Additive Manufacturing & Digital Capture",
    icon: Scanner3dMark,
    description:
      "Providing **industrial 3D printing** and **3D scanning** capabilities — **additive manufacturing lines**, **precision scanners**, and **maker-lab ecosystems** for prototyping, **reverse engineering**, and R&D.",
    longDescription: [
      "Our 3D Scanner & 3D Printer practice brings complete **additive-manufacturing and digital-capture** capability to product teams, institutions, and makerspaces — closing the loop between the physical world and the **CAD model** that represents it.",
      "On the print side we deploy and operate **industrial 3D printing fleets** spanning **FDM, SLA**, and resin technologies, with material expertise across **engineering plastics**, composites, and flexible filaments. From rapid concept models to functional end-use parts, we tune build parameters for strength, surface finish, and dimensional accuracy.",
      "For scanning we use precision **structured-light and LiDAR systems** that capture geometry at tolerance levels useful for **reverse engineering** and inspection. Full assemblies, castings, and components are digitised into **point clouds** and cleaned into **watertight CAD-ready meshes**, giving engineers an accurate digital asset within hours.",
      "**Reverse engineering** is a core service: legacy parts, broken components, and out-of-production spares are scanned, re-modelled as **parametric CAD**, and re-manufactured — letting clients escape the trap of unobtainable spare parts.",
      "For academic institutions and universities, we create complete **makerspace and additive-manufacturing laboratories**: printers, scanners, materials, and ventilated post-processing stations, plus structured training that takes students from CAD-to-print workflow through advanced topics like **design-for-additive-manufacturing** and **topology optimisation**.",
      "Industrially, we support **rapid-prototyping** loops for product teams, small-batch production bridging toward **injection moulding**, **jig-and-fixture** manufacture for assembly lines, and third-party scanning services for **metrology** and heritage documentation.",
      "Every deployment is backed by **preventive maintenance contracts**, material supply, and skill programmes — so laboratories and production floors alike stay productive from day one.",
    ],
    images: [
      "/images/services/scanner3d-1.jpg",
      "/images/services/scanner3d-2.jpg",
      "/images/services/scanner3d-3.jpg",
    ],
    keyApplications: [
      "Industrial 3D Printing Lines",
      "Precision 3D Scanning",
      "Reverse Engineering & Inspection",
      "Makerspace & Additive Lab Enablement",
    ],
    readiness: "Lab Equipment",
  },
  {
    id: "skill-dev",
    title: "Skill Development & Technical Training",
    category: "Workforce Empowerment & Academic Excellence",
    icon: SkillDevMark,
    description:
      "Empowering students, faculty, and industry professionals through **hands-on technical bootcamps**, **CoE lab setups**, **industry-recognized certifications**, and **workforce skill building**.",
    longDescription: [
      "Our Skill Development & Technical Training practice turns deep-tech capability into people capability. We build the **talent pipelines** that quantum labs, AI teams, semiconductor programmes, and smart factories all starve for — trained on the same industrial-grade equipment our engineering divisions deploy.",
      "For universities we establish **Centers of Excellence (CoE)**: fully equipped on-campus laboratories spanning **IoT testbeds**, **AI/ML GPU clusters**, **FPGA and embedded benches**, **3D printing and scanning workstations**, **drone flight bays**, and **quantum computing simulation** and access stacks — complete with curated lab manuals mapped to accredited curriculum outcomes.",
      "Our bootcamps are relentlessly **hands-on**. Students don't watch slides; they flash microcontrollers, assemble and rework real boards, **fine-tune language models**, fly and program drones, and run algorithms on **quantum simulators** and cloud QPUs — culminating in **capstone projects** reviewed by practising engineers from our product divisions.",
      "**Certification tracks** provide portable, **industry-recognised credentials**: structured learning paths with proctored assessments, digital badges verifiable by employers, and progression routes from foundation to specialist levels across each of our ten focus domains.",
      "**Faculty Development Programmes (FDPs)** multiply the impact — training professors and lecturers on modern toolchains and pedagogy so institutions sustain the capability internally, semester after semester, rather than depending on outside trainers forever.",
      "For industry we deliver **corporate upskilling** in AI adoption, embedded systems, and quantum readiness, plus **hackathons**, hiring-linked training pipelines, and **internship-to-placement** pathways that convert fresh engineering talent into deployment-ready deep-tech professionals.",
      "This pillar powers our global academic and industrial training ecosystem — **veteran-designed**, **Homegrown** with Anna University, IIT Madras and partners, and scaled globally as the **talent engine** for all ten deep-tech domains.",
    ],
    images: [
      "/images/services/skills-1.jpg",
      "/images/services/skills-2.jpg",
      "/images/services/skills-3.jpg",
    ],
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
  icon: IconComponent;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string[];
  images?: string[];
  deliverables: string[];
}

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    slug: "curriculum-modernization",
    icon: TechnologyFoundationsMark,
    title: "Curriculum Modernization",
    subtitle: "Future-Ready Deep-Tech Frameworks",
    description:
      "Enhancing university academic frameworks to seamlessly integrate future-ready skills across Quantum Computing, Artificial Intelligence, Edge Systems, and Microelectronics.",
    longDescription: [
      "Curriculum Modernization rebuilds academic programmes around the technologies industry is actually hiring for. We partner with universities to redesign syllabi, courses, and lab components so graduates arrive career-ready in Quantum Computing, AI, Edge Systems, and Microelectronics — not a decade behind them.",
      "The process starts with gap analysis: our engineering leads map your current curriculum against live industry job descriptions, emerging technology roadmaps, and accreditation outcomes (NBA/NAAC criteria). The output is a prioritised modernisation blueprint approved jointly by your academic council and our industry advisory board.",
      "We then co-design outcome-based course modules — every unit tied to demonstrable skills, with credit-bearing lab components, mini-projects, and elective tracks such as GenQ foundations, embedded AI, VLSI design flow, and industrial IoT deployment.",
      "Theory only sticks when it meets hardware, so each modernised course ships with matched laboratory modules using the same professional equipment found in our own tech house — development boards, sensor kits, EDA toolchains, and cloud quantum access — plus ready-to-teach lab manuals and assessment rubrics.",
      "Faculty are never handed a new syllabus alone: our Faculty Development tracks run alongside every rollout, training teaching staff on the revised content, tools, and evaluation methods until they can own delivery independently.",
      "Modernisation is continuous, not one-time — annual benchmark reviews refresh content as technology moves, keeping programmes permanently aligned with where deep-tech industry is heading rather than where it has been.",
      "This program operationalizes our global academic network — veteran-curated for Tamil Nadu institutions, Homegrown for Anna University and beyond, and aligned to the same ten-pillar technology house that builds the hardware students will soon use.",
    ],
    images: [
      "/images/services/curriculum-1.jpg?v=3",
      "/images/services/curriculum-2.jpg?v=3",
      "/images/services/curriculum-3.jpg?v=3",
    ],
    deliverables: [
      "Industry-aligned syllabus design",
      "Hands-on lab project modules",
      "Faculty orientation & training",
      "Regular industry benchmark updates",
    ],
  },
  {
    slug: "center-of-excellence",
    icon: DesignEngineeringMark,
    title: "Centers of Excellence (CoE)",
    subtitle: "On-Campus Research & Innovation Labs",
    description:
      "Establishing state-of-the-art technology centers and advanced research labs directly within university campuses, equipped with deep-tech hardware access and cloud runtimes.",
    longDescription: [
      "Our Centers of Excellence (CoE) programme installs genuine research-grade infrastructure inside university campuses — laboratories where students, researchers, and faculty work daily on the same class of equipment that powers industry, not scaled-down teaching versions of it.",
      "Each CoE is engineered around the institution's ambitions: AI/ML compute pods with GPU clusters, IoT and IIoT sensor testbeds, FPGA and embedded design benches, 3D printing and scanning stations, drone laboratories, and quantum computing stacks combining high-fidelity simulators with scheduled cloud QPU access.",
      "Infrastructure alone doesn't make a centre excellent — research does. Our engineers co-supervise student projects, mentor publication-worthy work, and run joint university-industry research programmes through the lab, giving institutions a credible applied-research output in deep-tech domains.",
      "The CoE doubles as an industry-interface hub: partner companies sponsor live problem statements, host internships sourced from lab members, and recruit from a talent pool already fluent in professional tooling — closing the loop between campus learning and enterprise expectation.",
      "We handle the operational discipline too: governance frameworks, faculty coordinator enablement, student club structures, equipment maintenance schedules, safety protocols, and usage analytics that keep the lab active year-round instead of becoming showcase furniture.",
      "The measurable outcomes we build toward include patents and publications, incubated startups, accreditation score improvements, placement uplift, and a self-sustaining innovation culture on campus — with annual reviews ensuring the centre keeps pace as technology evolves.",
      "Each CoE embodies our ten-pillar technology house and two decades of veteran leadership — Homegrown on campuses and connected to our global academic network for joint research, internships, and Co-R&D.",
    ],
    images: [
      "/images/services/coe-1.jpg?v=1",
      "/images/services/coe-2.jpg?v=1",
      "/images/services/coe-3.jpg?v=1",
    ],
    deliverables: [
      "Dedicated quantum & AI lab setups",
      "Hardware-software testbed access",
      "Joint university-industry research projects",
      "Direct technical mentoring & guidance",
    ],
  },
  {
    slug: "incubation-innovation-hubs",
    icon: VentureCreationMark,
    title: "Incubation & Innovation Hubs",
    subtitle: "Nurturing Student & Faculty Startups",
    description:
      "Empowering student and faculty entrepreneurs through comprehensive incubation support, seed strategy, prototype acceleration, and executive industry mentorship.",
    longDescription: [
      "Our Incubation & Innovation Hubs give student and faculty founders the one thing campus life rarely provides — a real path from idea to investable company. The programme is built and staffed by people who have actually scaled technology enterprises.",
      "Founders enter through a structured pipeline: ideation bootcamps and hackathons feed a competitive selection process, after which accepted teams receive dedicated incubation desks, milestone plans, and a named mentor from our engineering leadership.",
      "Prototype acceleration is where hardware startups usually die — so we remove that risk. Teams get direct access to PCB design support, quick-turn fabrication, SMT assembly benches, 3D printing, embedded firmware help, and AI/quantum cloud credits from our own tech house, turning working prototypes into demo-ready products fast.",
      "On the business side we provide IP strategy and patent-filing guidance, business-model refinement, regulatory navigation, pitch-deck development, and mock board reviews that pressure-test ventures before they face actual investors.",
      "Funding readiness comes through warm introductions: angel networks, seed funds, government grant schemes, and corporate innovation programmes from our partner ecosystem — plus preparation coaching so teams walk into those rooms with traction numbers, not just slides.",
      "The hub stays with its companies beyond day one: demo days, alumni founder networks, follow-on mentoring rounds, and industry partnership brokering that continue supporting ventures from first prototype through early commercial scale.",
      "This hub channels our ten-pillar depth and veteran founder experience into Tamil Nadu's startup ecosystem — Homegrown incubation with global investor access via our academic and industrial network.",
    ],
    images: [
      "/images/services/incubation-1.jpg?v=3",
      "/images/services/incubation-2.jpg?v=3",
      "/images/services/incubation-3.jpg?v=3",
    ],
    deliverables: [
      "Startup incubation & mentorship",
      "Prototype funding guidance",
      "Intellectual property (IP) support",
      "Venture & investor networking",
    ],
  },
  {
    slug: "global-certifications-training",
    icon: SkillDevMark,
    title: "Global Certifications & Training",
    subtitle: "Industry-Recognized Deep-Tech Credentials",
    description:
      "Providing world-class, industry-accredited learning programs and practical bootcamps to prepare the next generation of engineers, researchers, and innovators.",
    longDescription: [
      "Our Global Certifications & Training programmes convert deep-tech learning into portable, employer-trusted proof of skill. Every track is built with practising engineers from our own divisions and benchmarked against international industry standards.",
      "Certification tracks span the full Kanagam Tech portfolio: GenQ & Quantum Computing specialisations, AI/ML engineering, embedded and IoT systems, VLSI & FPGA design fundamentals, drone and additive-manufacturing proficiencies, and AR/VR development — each with foundation, practitioner, and specialist levels.",
      "Assessment rigour is what makes the credentials worth carrying: proctored examinations, hands-on practical evaluations on real hardware and cloud platforms, and capstone projects judged by working engineers — no multiple-choice-only shortcuts.",
      "Every certification issues a secure digital badge with verifiable metadata detailing the exact competencies demonstrated, making skills instantly checkable by employers and universities worldwide rather than lost in PDF certificates.",
      "For institutions we integrate certification tracks directly into degree programmes as credit-linked value-added courses; for companies we run private corporate cohorts that upskill teams on the exact technology stacks they're deploying.",
      "Learning doesn't stop at the badge — certified professionals join our continuing-education network with access to refreshed course materials, advanced modules as technologies evolve, hiring pipelines into partner enterprises, and invitations to our hackathons and innovation challenges.",
      "These credentials unify our ten pillars under one veteran-led standard — Homegrown certification designed in Chennai, delivered with Tamil Nadu universities, and recognized across our global academic and industrial training ecosystem.",
    ],
    images: [
      "/images/services/certs-1.jpg?v=3",
      "/images/services/certs-2.jpg?v=3",
      "/images/services/certs-3.jpg?v=3",
    ],
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
  longDescription?: string[];
  images?: string[];
  highlightsTitle: string;
  highlights: string[];
  badge?: string;
  icon: IconComponent;
}

export const ALL_SERVICES: ServiceDetail[] = [
  ...PILLARS.map((p) => ({
    slug: p.id,
    group: "Core Focus" as const,
    title: p.title,
    category: p.category,
    description: p.description,
    ...(p.longDescription ? { longDescription: p.longDescription } : {}),
    ...(p.images ? { images: p.images } : {}),
    highlightsTitle: "Key Application Domains",
    highlights: p.keyApplications,
    badge: "PRODUCTS",
    icon: p.icon,
  })),
  ...ACADEMIC_PROGRAMS.map((prog) => ({
    slug: prog.slug,
    group: "Academia & Talent" as const,
    title: prog.title,
    category: prog.subtitle,
    description: prog.description,
    ...(prog.longDescription ? { longDescription: prog.longDescription } : {}),
    ...(prog.images ? { images: prog.images } : {}),
    highlightsTitle: "Core Outcomes",
    highlights: prog.deliverables,
    icon: prog.icon,
  })),
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return ALL_SERVICES.find((s) => s.slug === slug);
}
