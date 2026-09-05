"use client";

import { useRef } from "react";
import gsap from "gsap";

// Efeito de inclinação 3D que segue o mouse (GSAP), aplicado nos cards pra
// dar aquela sensação "dinâmica, leve" da marca sem depender de nenhuma
// imagem/asset — é só transform, funciona em qualquer card.
export default function Tilt({
  children,
  className = "",
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateX: -py * max,
      rotateY: px * max,
      scale: 1.02,
      z: 20,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      z: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`h-full [transform-style:preserve-3d] [perspective:800px] ${className}`}
    >
      {children}
    </div>
  );
}
