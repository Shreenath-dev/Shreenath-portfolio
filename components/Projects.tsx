import Link from "next/link";
import RevealObserver from "./RevealObserver";
import { projects } from "@/lib/projects-data";

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

        {/* View All Projects CTA */}
        <div className="reveal mt-12 flex justify-center">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase border border-[#2a2a2a] hover:border-[#f5a623] text-[#888] hover:text-[#f5a623] px-8 py-4 transition-all duration-300 overflow-hidden"
          >
            {/* Hover fill */}
            <span className="absolute inset-0 bg-[#f5a623] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <span>View all projects</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
