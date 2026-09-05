"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroGlow from "./HeroGlow";
import ParticleField from "./ParticleField";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    icon: "🔍",
    title: "Descubra",
    text: "Navega pelas páginas de Vagas, Eventos e Cursos.",
    // top-left do mascote centralizado
    className: "left-[6%] top-[16%] sm:left-[12%] sm:top-[18%]",
  },
  {
    icon: "👆",
    title: "Escolha",
    text: "Cada card já mostra o essencial — sem enrolação.",
    // top-right
    className: "right-[6%] top-[16%] sm:right-[12%] sm:top-[18%]",
  },
  {
    icon: "🚀",
    title: "Garanta",
    text: "O botão leva direto pra fonte oficial.",
    // bottom-center
    className: "left-1/2 bottom-[10%] -translate-x-1/2",
  },
];

// A "cena" de entrada da home: primeiro tela cheia com a saudação e a
// mascote grande do lado direito; conforme rola, a mascote migra pro
// centro e as 3 etapas de "Como funciona" aparecem ao redor dela feito
// balão de fala. Tudo pinado (GSAP ScrollTrigger) — clássico efeito de
// scrollytelling de site institucional de tech.
export default function HeroScrollStory() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const quickAccessRef = useRef<HTMLDivElement>(null);
  const mascotBoxRef = useRef<HTMLDivElement>(null);
  const howTitleRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height ?? 64;

      gsap.set(bubbleRefs.current, { opacity: 0, scale: 0.7, y: 16 });
      gsap.set(howTitleRef.current, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: `top top+=${headerHeight}`,
          end: "+=160%",
          scrub: 1,
          pin: pinRef.current,
          pinSpacing: true,
          // Usa transform em vez de position:fixed pra pinar — imune a
          // qualquer ancestral que ganhe um transform (ex.: a transição de
          // página em app/template.tsx), que senão vira containing block e
          // quebra o pin fixo.
          pinType: "transform",
        },
      });

      tl.to(headlineRef.current, { opacity: 0, x: -40, duration: 1 }, 0)
        .to(quickAccessRef.current, { opacity: 0, y: 20, duration: 0.6 }, 0)
        .to(
          mascotBoxRef.current,
          {
            left: "50%",
            top: "42%",
            xPercent: -50,
            yPercent: -50,
            width: "clamp(9rem, 16vw, 13rem)",
            duration: 1.6,
          },
          0.15,
        )
        .to(howTitleRef.current, { opacity: 1, y: 0, duration: 0.4 }, 1.1)
        .to(
          bubbleRefs.current,
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.18 },
          1.25,
        );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "260vh" }}>
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <HeroGlow />
        <ParticleField />

        <div className="mx-auto h-full max-w-6xl px-4 sm:px-6">
          {/* Headline — some conforme rola */}
          <div
            ref={headlineRef}
            className="absolute top-1/2 left-4 max-w-xl -translate-y-1/2 sm:left-6"
          >
            <span className="inline-flex items-center rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
              👋 Bem-vindo(a) — somos Cria
            </span>
            <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Vaga, evento e curso bom de BH e SP, num lugar só.
            </h1>
            <p className="mt-4 max-w-md text-base text-foreground/70 sm:text-lg">
              Achado pela comunidade, pra comunidade. Cada card leva direto
              pra fonte oficial pra você garantir sua vaga.{" "}
              <Link
                href="/sobre"
                className="text-brand underline underline-offset-2 hover:no-underline"
              >
                Conhece a proposta →
              </Link>
            </p>
          </div>

          {/* Mascote — começa grande à direita, termina centralizada e menor */}
          <div
            ref={mascotBoxRef}
            className="absolute top-1/2 left-[82%] w-40 -translate-x-1/2 -translate-y-1/2 sm:w-56 lg:w-72"
          >
            <Image
              src="/mascot/cria-wave.png"
              alt="Mascote da Cria acenando"
              width={520}
              height={520}
              priority
              className="h-auto w-full select-none"
              draggable={false}
            />
          </div>

          {/* "Como funciona" — aparece centralizado quando a mascote chega no meio */}
          <div
            ref={howTitleRef}
            className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center"
          >
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Como funciona
            </h2>
            <p className="mt-1 text-sm text-foreground/60">
              Simples assim — sem cadastro obrigatório, sem taxa.
            </p>
          </div>

          {/* Balões das 3 etapas, ao redor da mascote centralizada */}
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              ref={(el) => {
                bubbleRefs.current[i] = el;
              }}
              className={`absolute w-40 rounded-2xl border border-border bg-surface p-3 text-center shadow-lg sm:w-48 ${step.className}`}
            >
              <span className="text-xl" aria-hidden="true">
                {step.icon}
              </span>
              <p className="mt-1 text-sm font-semibold">{step.title}</p>
              <p className="mt-0.5 text-xs text-foreground/60">{step.text}</p>
            </div>
          ))}

          {/* Atalhos rápidos — somem junto com a headline ao rolar */}
          <div
            ref={quickAccessRef}
            className="absolute bottom-10 left-4 flex gap-2 sm:left-6"
          >
            {[
              { href: "/eventos", label: "Eventos", icon: "🎟️" },
              { href: "/cursos", label: "Cursos", icon: "🎓" },
              { href: "/vagas", label: "Vagas", icon: "💼" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium shadow-sm transition hover:border-brand"
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
