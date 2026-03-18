import RevealObserver from "./RevealObserver";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      <RevealObserver threshold={0.15} />
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.05]"
        style={{ background: "radial-gradient(ellipse, #f5a623 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="reveal flex items-center gap-3 mb-6">
          <span className="section-num">05</span>
          <span className="w-8 h-px bg-[#2a2a2a]" />
          <span className="section-num">Contact</span>
        </div>

        <div className="max-w-3xl">
          <h2 className="reveal font-display text-[clamp(3rem,8vw,6rem)] text-[#f0ead6] leading-[0.9] mb-8">
            Let&apos;s build
            <br />
            <em className="text-[#888]">something</em>
            <br />
            together.
          </h2>
          <p className="reveal text-[#888] text-base leading-relaxed mb-10 max-w-lg">
            Open to new opportunities, collaborations, and interesting projects. Whether it&apos;s a full-time role, freelance project, or just a chat about tech — reach out.
          </p>

          <div className="reveal flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:shreenath.py@gmail.com"
              className="group relative font-mono text-sm tracking-widest uppercase text-[#0e0e0e] bg-[#f5a623] px-8 py-4 overflow-hidden transition-all inline-flex items-center gap-2"
            >
              <span className="relative z-10">shreenath.py@gmail.com</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
              <span className="absolute inset-0 bg-[#e8c84a] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
            </a>
          </div>

          {/* Contact links */}
          <div className="reveal mt-12 pt-10 border-t border-[#2a2a2a] grid sm:grid-cols-3 gap-6">
            {[
              { label: "LinkedIn", sub: "linkedin.com/in/shreenath-subramanian", href: "https://linkedin.com/in/shreenath-subramanian" },
              { label: "GitHub", sub: "github.com/shreenath-dev", href: "https://github.com/shreenath-dev" },
              { label: "Phone", sub: "+91 86101 81044", href: "tel:+918610181044" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 hover:border-l-2 hover:border-[#f5a623] hover:pl-3 transition-all duration-300"
              >
                <span className="font-mono text-xs text-[#f5a623] tracking-widest uppercase">{c.label}</span>
                <span className="font-mono text-xs text-[#555] group-hover:text-[#888] transition-colors break-all">{c.sub}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
