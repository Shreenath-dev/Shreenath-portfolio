import RevealObserver from "./RevealObserver";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-16 lg:px-24">
      <RevealObserver threshold={0.15} />
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">
          <div>
            <div className="reveal flex items-center gap-3 mb-6">
              <span className="section-num">01</span>
              <span className="w-8 h-px bg-[#2a2a2a]" />
              <span className="section-num">About</span>
            </div>
            <h2 className="reveal font-display text-[clamp(2.5rem,5vw,4rem)] text-[#f0ead6] leading-tight mb-8">
              Building systems
              <br />
              <em className="text-[#888]">that scale</em>
            </h2>
            <div className="reveal space-y-5 text-[#888] leading-relaxed text-[15px]">
              <p>
                I&apos;m a final-year B.E. CSE student at SNS College of Engineering with hands-on internship experience across full-stack development, backend engineering, and AI/ML integration.
              </p>
              <p>
                My focus is on <span className="text-[#c8c8c8]">distributed systems</span>, <span className="text-[#c8c8c8]">microservices architecture</span>, and building backend infrastructure that handles real-world load — from indexing strategies to async task queues.
              </p>
              <p>
                I care deeply about clean, maintainable code and technical ownership across the full SDLC.
              </p>
            </div>

            {/* Links */}
            <div className="reveal flex flex-wrap gap-4 mt-10">
              {[
                { label: "LinkedIn", href: "https://linkedin.com/in/shreenath-subramanian" },
                { label: "GitHub", href: "https://github.com/shreenath-dev" },
                { label: "Email", href: "mailto:shreenath.py@gmail.com" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-widest uppercase text-[#f5a623] border border-[#f5a623] px-4 py-2 hover:bg-[#f5a623] hover:text-[#0e0e0e] transition-all"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Education card */}
          <div className="reveal">
            <div className="relative border border-[#2a2a2a] p-8 bg-[#161616]">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#f5a623]" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#f5a623]" />

              <div className="section-num mb-6">Education</div>
              <h3 className="font-display text-2xl text-[#f0ead6] mb-2">
                SNS College of Engineering
              </h3>
              <p className="font-mono text-sm text-[#f5a623] mb-6">2022 – 2026</p>
              <p className="text-[#888] text-sm mb-2">B.E. Computer Science &amp; Engineering</p>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#2a2a2a]">
                <span className="font-display text-4xl text-[#f5a623]">8.1</span>
                <div>
                  <div className="font-mono text-xs text-[#555] uppercase tracking-widest">CGPA</div>
                  <div className="font-mono text-xs text-[#888]">out of 10.0</div>
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
                <div className="section-num mb-4">Certifications</div>
                <ul className="space-y-2">
                  {[
                    "Principles of Generative AI — Infosys",
                    "AI Primer Certification — Infosys",
                    "Java Certification — Wipro TalentNext",
                  ].map((c) => (
                    <li key={c} className="flex items-start gap-3 font-mono text-xs text-[#888]">
                      <span className="text-[#f5a623] mt-0.5">▸</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
