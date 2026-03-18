import RevealObserver from "./RevealObserver";

const experiences = [
  {
    role: "AI Engineer Intern",
    company: "Infynd",
    location: "Coimbatore, India",
    period: "Nov 2024 – Present",
    bullets: [
      "Performance Optimization: Researched and implemented MongoDB indexing strategies to resolve performance bottlenecks, optimizing query responsiveness by 15% for data-intensive workloads.",
      "Distributed Systems: Developed backend modules for scalable workloads, ensuring clean, maintainable code through rigorous code reviews and adherence to best practices.",
      "Collaboration: Partnered with cross-disciplinary teams to validate features and identify system vulnerabilities, improving overall infrastructure reliability.",
    ],
    tags: ["AI", "MongoDB", "Distributed Systems", "Backend"],
  },
  {
    role: "Software Associate Intern",
    company: "SNS Square Consultancy Services",
    location: "Coimbatore, India",
    period: "Aug 2024 – May 2025",
    bullets: [
      "Researched and implemented MongoDB indexing strategies to resolve performance bottlenecks, optimizing query responsiveness by 15% for data-intensive workloads.",
      "Developed backend modules for scalable workloads, ensuring clean, maintainable code through rigorous code reviews and adherence to best practices.",
      "Partnered with cross-disciplinary teams to validate features and identify system vulnerabilities, improving overall infrastructure reliability.",
    ],
    tags: ["MongoDB", "Distributed Systems", "Backend", "Code Review"],
  },
  {
    role: "Python Developer Intern",
    company: "Cybernerds Solutions",
    location: "Thanjavur, India",
    period: "Jun 2024 – Aug 2024",
    bullets: [
      "Translated product requirements into technical solutions by authoring automation scripts.",
      "Maintained stable API contracts for internal services with clean, documented Python code.",
    ],
    tags: ["Python", "Automation", "API Design"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
      <RevealObserver />
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-6">
          <span className="section-num">02</span>
          <span className="w-8 h-px bg-[#2a2a2a]" />
          <span className="section-num">Experience</span>
        </div>
        <h2 className="reveal font-display text-[clamp(2.5rem,5vw,4rem)] text-[#f0ead6] mb-16 leading-tight">
          Where I&apos;ve <em className="text-[#888]">worked</em>
        </h2>

        <div className="relative">
          {/* Vertical timeline line — centered in the 48px gap after the 220px left col */}
          <div className="hidden lg:block absolute left-[244px] top-0 bottom-0 w-px bg-[#2a2a2a]" />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <div key={i} className="reveal lg:grid lg:grid-cols-[220px_1fr] gap-12">
                {/* Left — period */}
                <div className="relative lg:text-right mb-4 lg:mb-0">
                  {/* Dot centered on the timeline line */}
                  <div className="hidden lg:block absolute top-1.5 w-2.5 h-2.5 rounded-full bg-[#f5a623] border-2 border-[#0a0a0a]" style={{ right: "-29px" }} />
                  <p className="font-mono text-xs text-[#f5a623] tracking-widest mb-1">{exp.period}</p>
                  <p className="font-mono text-xs text-[#555] tracking-wide">{exp.location}</p>
                </div>

                {/* Right — content */}
                <div className="border border-[#2a2a2a] p-8 hover:border-[#f5a623] transition-colors duration-300 group bg-[#161616]">
                  <h3 className="font-display text-2xl text-[#f0ead6] mb-1 group-hover:text-[#f5a623] transition-colors">
                    {exp.role}
                  </h3>
                  <p className="font-mono text-sm text-[#888] mb-6">{exp.company}</p>

                  <ul className="space-y-3 mb-6">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-[#888] text-sm leading-relaxed">
                        <span className="text-[#f5a623] mt-0.5 shrink-0">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] tracking-widest uppercase text-[#555] border border-[#2a2a2a] px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
