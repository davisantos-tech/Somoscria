"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Entrada em cascata (fade + slide-up) pros elementos-filhos diretos, uma
// vez, ao montar — usado no hero da home pra dar aquele "efeito" já na
// primeira dobra, sem depender de scroll.
export default function HeroReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.12 },
    );
  }, []);

  return <div ref={ref}>{children}</div>;
}
