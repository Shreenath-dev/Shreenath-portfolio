import RevealObserver from "./RevealObserver";

const projects = [
  {
    num: "01",
    name: "CampaignFlow",
    tagline: "AI Sales Automation",
    year: "2025",
    description:
      "Microservices-based architecture for autonomous sales task execution. Leverages async programming to handle high-volume, complex workflows with real-time processing.",
    highlights: [
      "Designed microservices architecture for autonomous task execution",
      "Optimized MySQL schema with composite indexes — 15–30% read query improvement",
      "Asynchronous programming for high-volume workflow handling",
    ],
    stack: ["React", "Node.js", "Python", "MySQL"],
    color: "#f5a623",
  },
  {
    num: "02",
    name: "MedMatch",
    tagline: "A Social Media Platform for Medminds",
    year: "2025",
    description:
      "Full-stack production web app with GenAI workflows and a recommendation engine. Implements secure API practices including request validation and access control.",
    highlights: [
      "Integrated GenAI workflows and real-time recommendation engine",
      "Secure API: request validation, access control, structured logging",
      "Microservices architecture with MERN stack",
    ],
    stack: ["MERN", "GenAI", "Microservices"],
    color: "#e8c84a",
  },
  {
    num: "03",
    name: "Defacement Detector",
    tagline: "Website Integrity Monitor",
    year: "Jun–Jul 2024",
    description:
      "Real-time monitoring system to detect structural website changes using OCR and CNN. Fault-tolerant design ensures continuous system integrity under adverse conditions.",
    highlights: [
      "Real-time structural change detection via OCR + CNN",
      "Fault-tolerant monitoring with automated alerting",
      "Python-based pipeline with robust error handling",
    ],
    stack: ["Python", "OCR", "CNN"],
    color: "#c8c8c8",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-16 lg:px-24">
      <RevealObserver threshold={0.05} />
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-6">
          <span className="section-num">03</span>
          <span className="w-8 h-px bg-[#2a2a2a]" />
          <span className="section-num">Projects</span>
        </div>
        <h2 className="reveal font-display text-[clamp(2.5rem,5vw,4rem)] text-[#f0ead6] mb-16 leading-tight">
          Things I&apos;ve <em className="text-[#888]">built</em>
        </h2>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="reveal group border border-[#2a2a2a] hover:border-[#f5a623] transition-all duration-300 overflow-hidden bg-[#161616]"
            >
              <div className="grid lg:grid-cols-[1fr_1.4fr] gap-0">
                {/* Left panel */}
                <div className="p-8 border-b lg:border-b-0 lg:border-r border-[#2a2a2a]">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono text-5xl font-light text-[#2a2a2a] group-hover:text-[#f5a623] transition-colors duration-300">
                      {p.num}
                    </span>
                    <span className="font-mono text-xs text-[#555] tracking-widest">{p.year}</span>
                  </div>
                  <h3 className="font-display text-3xl text-[#f0ead6] mb-1">{p.name}</h3>
                  <p className="font-mono text-sm text-[#f5a623] mb-4">{p.tagline}</p>
                  <p className="text-[#888] text-sm leading-relaxed">{p.description}</p>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] tracking-widest uppercase border px-2.5 py-1"
                        style={{ borderColor: p.color + "40", color: p.color }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right panel — highlights */}
                <div className="p-8">
                  <div className="section-num mb-5">Key Achievements</div>
                  <ul className="space-y-4">
                    {p.highlights.map((h, j) => (
                      <li key={j} className="flex gap-4 group/item">
                        <span
                          className="shrink-0 w-5 h-5 flex items-center justify-center border mt-0.5"
                          style={{ borderColor: p.color + "60", color: p.color }}
                        >
                          <span className="text-xs">✓</span>
                        </span>
                        <span className="text-[#888] text-sm leading-relaxed group-hover/item:text-[#c8c8c8] transition-colors">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
