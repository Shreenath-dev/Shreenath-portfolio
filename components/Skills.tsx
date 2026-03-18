import RevealObserver from "./RevealObserver";

const skillGroups = [
  {
    label: "Languages & Frameworks",
    icon: "⌨",
    skills: ["JavaScript", "Python", "React.js","Node.js", "Express.js"],
  },
  {
    label: "Infrastructure",
    icon: "⚙",
    skills: ["Microservices", "Docker", "AWS", "Async Programming", "API Security"],
  },
  {
    label: "Databases",
    icon: "⬡",
    skills: ["MongoDB", "MySQL", "Redis", "Elasticsearch"],
  },
  {
    label: "Core CS",
    icon: "◈",
    skills: ["OOP Design", "Algorithm Design", "Data Structures", "Complexity Analysis"],
  },
  {
    label: "Artificial Intelligence",
    icon: "✦",
    skills: ["Langfuse", "LangGraph", "GenAI Integration"],
  },
  {
    label: "Tools",
    icon: "▣",
    skills: ["Git / GitHub", "Docker", "AWS"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
      <RevealObserver stagger={80} />
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-6">
          <span className="section-num">04</span>
          <span className="w-8 h-px bg-[#2a2a2a]" />
          <span className="section-num">Skills</span>
        </div>
        <h2 className="reveal font-display text-[clamp(2.5rem,5vw,4rem)] text-[#f0ead6] mb-16 leading-tight">
          Tech I <em className="text-[#888]">work with</em>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <div
              key={i}
              className="reveal border border-[#2a2a2a] p-6 hover:border-[#f5a623] transition-all duration-300 group bg-[#161616]"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl text-[#f5a623]">{group.icon}</span>
                <span className="font-mono text-xs tracking-widest text-[#555] uppercase">{group.label}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs text-[#c8c8c8] bg-[#2a2a2a] group-hover:bg-[#f5a62315] px-3 py-1.5 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-20 overflow-hidden border-t border-b border-[#2a2a2a] py-5">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, k) => (
              <span key={k} className="flex items-center gap-8 mr-8">
                {["JavaScript", "React", "Node.js", "Python", "MongoDB", "MySQL", "Docker", "AWS", "Redis", "LangGraph", "Distributed Systems", "Microservices"].map((s) => (
                  <span key={s} className="flex items-center gap-8">
                    <span className="font-mono text-xs tracking-widest text-[#555] uppercase">{s}</span>
                    <span className="text-[#f5a623] text-xs">◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
