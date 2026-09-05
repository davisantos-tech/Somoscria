"use client";

import { useRef } from "react";
import gsap from "gsap";

// O botão "gruda" levemente no cursor quando ele chega perto — efeito
// premium comum em sites de produto tech, sutil o bastante pra não
// atrapalhar o clique. Só o botão se move, o texto/ícone dentro fica junto.
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { strength?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.3, ease: "power2.out", overwrite: true });
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  }

  return (
    <a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
