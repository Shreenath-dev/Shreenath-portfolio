"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, type ProjectCategory } from "@/lib/projects-data";

type Filter = "all" | ProjectCategory;

const filters: { label: string; value: Filter; icon: string }[] = [
  { label: "All", value: "all", icon: "◈" },
  { label: "Production", value: "production", icon: "▣" },
  { label: "Personal", value: "personal", icon: "△" },
];
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const toggle = (i: number) => setExpanded(expanded === i ? null : i);

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleFilter = (f: Filter) => {
    setActiveFilter(f);
    setExpanded(null);
  };

  return (
    <>
      <Cursor />
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24 bg-[#0e0e0e]">
        <div className="max-w-6xl mx-auto">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#555] uppercase hover:text-[#f5a623] transition-colors mb-12 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to home
          </Link>

          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-num">Projects</span>
              <span className="w-8 h-px bg-[#2a2a2a]" />
              <span className="font-mono text-xs text-[#555] tracking-widest">{projects.length} total</span>
            </div>
            <h1 className="font-display text-[clamp(2.8rem,6vw,5rem)] text-[#f0ead6] leading-tight mb-4">
              Everything I&apos;ve <em className="text-[#888]">built</em>
            </h1>
            <p className="font-mono text-sm text-[#555] max-w-xl leading-relaxed">
              Click any project to expand it and read the full breakdown — the problem, tech decisions, challenges, and outcomes.
            </p>
          </div>

          {/* ─── Category Tab Switch ─── */}
          <div className="mt-10 mb-12">
            <div className="inline-flex border-b border-[#2a2a2a]">
              {filters.map((f) => {
                const isActive = activeFilter === f.value;
                const count = f.value === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === f.value).length;
                return (
                  <button
                    key={f.value}
                    id={`filter-${f.value}`}
                    onClick={() => handleFilter(f.value)}
                    className={`relative font-mono text-xs tracking-widest uppercase px-6 py-3.5 transition-all duration-300 flex items-center gap-2.5 ${
                      isActive
                        ? "text-[#f5a623]"
                        : "text-[#555] hover:text-[#888]"
                    }`}
                  >
                    {/* Sliding bottom indicator */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#f5a623] transition-all duration-300 ${
                        isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      }`}
                    />
                    {/* Active glow */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#f5a62310] to-transparent transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="relative text-[10px]">{f.icon}</span>
                    <span className="relative">{f.label}</span>
                    <span
                      className={`relative font-mono text-[10px] px-1.5 py-0.5 rounded-sm transition-all duration-300 ${
                        isActive
                          ? "bg-[#f5a62318] text-[#f5a623]"
                          : "bg-[#ffffff06] text-[#444]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map((p, i) => {
              const isOpen = expanded === i;
              return (
                <div
                  key={i}
                  className="border border-[#2a2a2a] bg-[#161616] overflow-hidden transition-all duration-500"
                  style={{
                    borderColor: isOpen ? p.color + "60" : undefined,
                    boxShadow: isOpen ? `0 0 30px ${p.color}10` : "none",
                  }}
                >
                  {/* Accordion header — always visible */}
                  <button
                    onClick={() => toggle(i)}
                    className="w-full text-left group"
                    aria-expanded={isOpen}
                    id={`project-btn-${i}`}
                  >
                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 p-6 md:p-8">
                      {/* Number */}
                      <span
                        className="font-mono text-4xl md:text-5xl font-light transition-colors duration-300"
                        style={{ color: isOpen ? p.color : "#2a2a2a" }}
                      >
                        {p.num}
                      </span>

                      {/* Name + tagline */}
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h2 className="font-display text-2xl md:text-3xl text-[#f0ead6] group-hover:text-[#f0ead6] transition-colors">
                            {p.name}
                          </h2>
                          <span
                            className="font-mono text-[10px] tracking-widest uppercase border px-2 py-0.5"
                            style={{ borderColor: p.color + "50", color: p.color }}
                          >
                            {p.tagline}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-[#555] tracking-widest">{p.year}</p>
                      </div>

                      {/* Expand icon */}
                      <div
                        className="w-9 h-9 flex items-center justify-center border border-[#2a2a2a] transition-all duration-300 flex-shrink-0"
                        style={{
                          borderColor: isOpen ? p.color + "60" : undefined,
                          color: isOpen ? p.color : "#555",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                    </div>

                    {/* Stack tags — always visible */}
                    <div className="flex flex-wrap gap-2 px-6 md:px-8 pb-6">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] tracking-widest uppercase border px-2.5 py-1 transition-colors duration-300"
                          style={{ borderColor: p.color + "30", color: p.color + "cc" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </button>

                  {/* Expanded content */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: isOpen ? "1000px" : "0px" }}
                  >
                    <div className="border-t border-[#2a2a2a] mx-6 md:mx-8" />
                    <div className="p-6 md:p-8 grid lg:grid-cols-2 gap-10">

                      {/* Left: full description */}
                      <div>
                        <div className="section-num mb-4">Overview</div>
                        <p className="text-[#888] text-sm leading-relaxed mb-8">
                          {p.longDescription || p.description}
                        </p>

                        {/* Key achievements */}
                        <div className="section-num mb-4">Key Achievements</div>
                        <ul className="space-y-3">
                          {p.highlights.map((h, j) => (
                            <li key={j} className="flex gap-3">
                              <span
                                className="shrink-0 w-5 h-5 flex items-center justify-center border mt-0.5"
                                style={{ borderColor: p.color + "60", color: p.color }}
                              >
                                <span className="text-xs">✓</span>
                              </span>
                              <span className="text-[#888] text-sm leading-relaxed">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: challenges + outcome */}
                      <div>
                        {p.challenges && p.challenges.length > 0 && (
                          <>
                            <div className="section-num mb-4">Engineering Challenges</div>
                            <ul className="space-y-3 mb-8">
                              {p.challenges.map((c, j) => (
                                <li key={j} className="flex gap-3">
                                  <span
                                    className="shrink-0 text-xs mt-1"
                                    style={{ color: p.color }}
                                  >
                                    ⬡
                                  </span>
                                  <span className="text-[#888] text-sm leading-relaxed">{c}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}

                        {p.outcome && (
                          <>
                            <div className="section-num mb-4">Outcome</div>
                            <p
                              className="text-sm leading-relaxed p-4 border-l-2"
                              style={{
                                borderColor: p.color,
                                color: "#c8c8c8",
                                background: p.color + "08",
                              }}
                            >
                              {p.outcome}
                            </p>
                          </>
                        )}

                        {/* Links */}
                        {(p.github || p.live) && (
                          <div className="flex gap-3 mt-8">
                            {p.github && (
                              <a
                                href={p.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border px-4 py-2 transition-all duration-300 hover:text-[#f0ead6]"
                                style={{ borderColor: p.color + "50", color: p.color }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                                GitHub
                              </a>
                            )}
                            {p.live && (
                              <a
                                href={p.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#0e0e0e] px-4 py-2 transition-all duration-300"
                                style={{ background: p.color }}
                              >
                                Live →
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 pt-12 border-t border-[#2a2a2a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-display text-2xl text-[#f0ead6] mb-1">Want to work together?</p>
              <p className="font-mono text-xs text-[#555]">Open to full-time roles and interesting side projects.</p>
            </div>
            <a
              href="mailto:shreenath.py@gmail.com"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#0e0e0e] bg-[#f5a623] px-5 py-3 hover:bg-[#e8c84a] transition-colors"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
