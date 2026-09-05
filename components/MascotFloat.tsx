"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

// Flutuação suave e contínua (sobe/desce em loop) — dá vida à mascote sem
// depender de mouse/scroll, reforçando o tom "leve, acessível, otimista"
// da marca.
export default function MascotFloat({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(el, {
      y: -12,
      rotate: -2,
      duration: 2.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      <Image
        src={src}
        alt={alt}
        width={520}
        height={520}
        priority
        className="h-auto w-full select-none"
        draggable={false}
      />
    </div>
  );
}
