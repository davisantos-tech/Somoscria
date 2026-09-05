"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// template.tsx (diferente de layout.tsx) remonta a cada navegação — usado
// só pra dar um fade+slide suave de entrada toda vez que troca de página
// (Explorar → Sobre → Sugerir → Perfil), sem precisar de lib de rota extra.
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
    );
  }, []);

  return <div ref={ref}>{children}</div>;
}
