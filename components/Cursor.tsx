"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let raf: number;

    const move = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      dot.style.left = dotX + "px";
      dot.style.top = dotY + "px";
    };

    const animateRing = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      raf = requestAnimationFrame(animateRing);
    };

    const onEnter = () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.opacity = "0.3";
    };
    const onLeave = () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.opacity = "0.6";
    };

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    raf = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
