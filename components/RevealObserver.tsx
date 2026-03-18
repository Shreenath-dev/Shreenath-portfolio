"use client";
import { useEffect, useRef } from "react";

export default function RevealObserver({
  threshold = 0.1,
  stagger = 120,
}: {
  threshold?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = (ref.current?.closest("section") ?? ref.current?.parentElement) as HTMLElement | null;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * stagger);
            });
          }
        });
      },
      { threshold }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [threshold, stagger]);

  return <span ref={ref} aria-hidden="true" className="sr-only" />;
}
