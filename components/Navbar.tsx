"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0e0e0ecc] backdrop-blur-md border-b border-[#2a2a2a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-xl text-[#f0ead6] tracking-tight hover:text-[#f5a623] transition-colors">
          SS<span className="text-[#f5a623]">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-mono text-xs tracking-widest text-[#888] uppercase hover:text-[#f5a623] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:shreenath.py@gmail.com"
          className="hidden md:inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#0e0e0e] bg-[#f5a623] px-4 py-2 hover:bg-[#e8c84a] transition-colors"
        >
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-[#c8c8c8] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`block w-6 h-px bg-[#c8c8c8] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[#c8c8c8] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? "max-h-80" : "max-h-0"
        } bg-[#161616] border-t border-[#2a2a2a]`}
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-sm tracking-widest text-[#888] uppercase hover:text-[#f5a623] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:shreenath.py@gmail.com"
              className="font-mono text-xs tracking-widest text-[#0e0e0e] bg-[#f5a623] px-4 py-2 inline-block mt-2"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
