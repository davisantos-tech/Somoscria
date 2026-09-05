"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Blobs de gradiente nas cores da marca, flutuando bem devagar atrás do
// hero — profundidade e movimento sem pesar a página (só transform,
// pointer-events desligado, não atrapalha clique em nada).
export default function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const blobs = el.querySelectorAll<HTMLElement>("[data-blob]");

    const tweens = Array.from(blobs).map((blob, i) =>
      gsap.to(blob, {
        x: i % 2 === 0 ? 30 : -30,
        y: i % 2 === 0 ? -20 : 20,
        duration: 6 + i * 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }),
    );

    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        data-blob
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl"
      />
      <div
        data-blob
        className="absolute top-10 right-0 h-64 w-64 rounded-full bg-brand-yellow/25 blur-3xl"
      />
      <div
        data-blob
        className="absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-brand-green/20 blur-3xl"
      />
    </div>
  );
}
