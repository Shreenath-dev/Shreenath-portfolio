"use client";
import { useEffect, useRef, useState } from "react";

const roles = [
  "Software Engineer",
  "Backend Developer",
  "AI Engineer",
  "Cloud Enthusiast...",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const current = roles[roleIdx];
    if (!deleting) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 35);
      } else {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % roles.length);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIdx]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 pb-16 overflow-hidden">
      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#f5a623 1px, transparent 1px), linear-gradient(90deg, #f5a623 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow blob */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Tag line */}
        <div className="flex items-center gap-3 mb-10 animate-[fade-up_0.6s_ease_0.1s_both]">
          <span className="w-8 h-px bg-[#f5a623]" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#f5a623] uppercase">
            Available for opportunities
          </span>
        </div>

        {/* Name */}
        <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] text-[#f0ead6] mb-4 animate-[fade-up_0.7s_ease_0.2s_both]">
          Shreenath
          <br />
          <span className="italic text-[#888]">Subramanian</span>
        </h1>

        {/* Role typewriter */}
        <div className="flex items-center gap-0 mt-6 mb-10 animate-[fade-up_0.7s_ease_0.35s_both]">
          <span className="font-mono text-[clamp(1rem,2.5vw,1.5rem)] text-[#c8c8c8]">
            {displayed}
          </span>
          <span className="inline-block w-0.5 h-[1.4em] bg-[#f5a623] ml-1 animate-blink" />
        </div>

        {/* Bio */}
        <p className="font-sans text-[#888] max-w-xl text-base leading-relaxed mb-12 animate-[fade-up_0.7s_ease_0.45s_both]">
          B.E. CSE graduate building scalable backend systems, microservices, and AI-powered products. Based in{" "}
          <span className="text-[#c8c8c8]">Coimbatore, India</span>.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap gap-4 animate-[fade-up_0.7s_ease_0.55s_both]">
          <a
            href="#projects"
            className="group relative font-mono text-sm tracking-widest uppercase text-[#0e0e0e] bg-[#f5a623] px-8 py-3.5 overflow-hidden transition-all"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-[#e8c84a] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            className="font-mono text-sm tracking-widest uppercase text-[#c8c8c8] border border-[#2a2a2a] px-8 py-3.5 hover:border-[#f5a623] hover:text-[#f5a623] transition-all"
          >
            Get in Touch
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-12 mt-20 pt-10 border-t border-[#2a2a2a] animate-[fade-up_0.7s_ease_0.65s_both]">
          {[
            { num: "8.1", label: "CGPA" },
            { num: "5+", label: "Certifications" },
            { num: "3+", label: "Projects Shipped" },
            { num: "3", label: "Internships" },
            { num: "1.6", label: "Years of Experience" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl text-[#f5a623]">{s.num}</div>
              <div className="font-mono text-xs text-[#555] tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="h-14"></div> */}
      {/* Scroll hint */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex mt-40 flex-col items-center gap-2 animate-[fade-in_1s_ease_1.2s_both]">
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#555] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#f5a623] to-transparent animate-[float_2s_ease-in-out_infinite]" />
      </div> */}
    </section>
  );
}
