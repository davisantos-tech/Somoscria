"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BLOBS = [
  { className: "-top-32 -left-32 h-96 w-96 bg-brand/30", depth: 22 },
  { className: "-top-10 right-[-4rem] h-80 w-80 bg-brand-yellow/25", depth: 14 },
  { className: "bottom-[-5rem] left-1/3 h-72 w-72 bg-brand-green/20", depth: 18 },
  { className: "bottom-10 right-1/4 h-56 w-56 bg-brand/15", depth: 10 },
];

// Blobs de gradiente nas cores da marca — dois movimentos combinados:
// (1) flutuação lenta e contínua, sempre rodando; (2) leve parallax que
// segue o mouse, quanto maior o "depth" mais ele se move. Cada blob tem um
// wrapper próprio pra cada movimento não brigar pelo mesmo transform.
export default function HeroGlow() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const floats = container.querySelectorAll<HTMLElement>("[data-float]");
    const parallaxLayers = container.querySelectorAll<HTMLElement>("[data-parallax]");

    const floatTweens = Array.from(floats).map((el, i) =>
      gsap.to(el, {
        x: i % 2 === 0 ? 30 : -30,
        y: i % 2 === 0 ? -20 : 20,
        duration: 7 + i * 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }),
    );

    const quickSetters = Array.from(parallaxLayers).map((el) => {
      const depth = Number(el.dataset.parallax) || 10;
      return {
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
        depth,
      };
    });

    function handleMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      quickSetters.forEach(({ x, y, depth }) => {
        x(px * depth);
        y(py * depth);
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      floatTweens.forEach((t) => t.kill());
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          data-parallax={blob.depth}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
        >
          <div data-float className="h-full w-full rounded-full bg-inherit" />
        </div>
      ))}
    </div>
  );
}
