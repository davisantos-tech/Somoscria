"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroGlow from "./HeroGlow";
import ParticleField from "./ParticleField";
import CountUp from "./CountUp";
import ScrollReveal from "./ScrollReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  { icon: "🔍", title: "Descubra", text: "Navega pelas páginas de Vagas, Eventos e Cursos." },
  { icon: "👆", title: "Escolha", text: "Cada card já mostra o essencial — sem enrolação." },
  { icon: "🚀", title: "Garanta", text: "O botão leva direto pra fonte oficial." },
];

interface HeroScrollStoryProps {
  eventCount: number;
  courseCount: number;
  jobCount: number;
}

// A "cena" de entrada da home: primeira tela cheia (headline à esquerda,
// mascote grande à direita, fundo de partículas). Ao rolar, a mascote
// desce junto com o scroll — sem travar a página (nada de pin/scroll-jack)
// — e chega pequena bem em cima do título "Como funciona", que já é
// conteúdo normal da página, logo abaixo da primeira tela. As partículas
// ficam só na primeira tela: a partir daí o fundo volta a ser liso, igual
// ao resto do site.
//
// Esse efeito de "mascote acompanhando o scroll" só roda em telas md+
// (gsap.matchMedia) — no celular a gente já mostra tudo em fluxo normal,
// sem posicionamento absoluto nenhum, pra nunca sobrepor texto.
export default function HeroScrollStory({
  eventCount,
  courseCount,
  jobCount,
}: HeroScrollStoryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const quickAccessRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const mascotBoxRef = useRef<HTMLDivElement>(null);
  const howTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(mascotBoxRef.current, {
          top: "40vh",
          left: "82%",
          xPercent: -50,
          yPercent: -50,
        });
        gsap.set(howTitleRef.current, { opacity: 0, y: 10 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=130%",
            scrub: 1,
            // Sem pin — a página rola normal o tempo todo, a mascote só
            // acompanha o progresso do scroll com a própria posição dela.
          },
        });

        tl.to(headlineRef.current, { opacity: 0, y: -30, duration: 0.4 }, 0)
          .to(quickAccessRef.current, { opacity: 0, y: 20, duration: 0.3 }, 0)
          .to(scrollCueRef.current, { opacity: 0, duration: 0.2 }, 0)
          .to(
            mascotBoxRef.current,
            {
              top: "calc(100vh + 14vh)",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              width: "9rem",
              duration: 1,
              ease: "none",
            },
            0,
          )
          .to(howTitleRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.55);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: eventCount, label: eventCount === 1 ? "evento" : "eventos" },
    { value: courseCount, label: courseCount === 1 ? "curso" : "cursos" },
    { value: jobCount, label: "vagas" },
  ];

  return (
    <div ref={wrapperRef} className="relative">
      {/* ---------- Layout mobile/tablet (< md): tudo em fluxo normal,
          sem posicionamento absoluto — nada sobrepõe nada. ---------- */}
      <div className="relative overflow-hidden md:hidden">
        <HeroGlow />
        <ParticleField />
        <div className="mx-auto max-w-xl px-4 pt-10 pb-14 text-center sm:px-6">
          <span className="inline-flex items-center rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
            👋 Bem-vindo(a) — somos Cria
          </span>

          <Image
            src="/mascot/cria-wave.png"
            alt="Mascote da Cria acenando"
            width={520}
            height={520}
            priority
            className="mx-auto mt-4 h-auto w-40 select-none"
            draggable={false}
          />

          <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight">
            Vaga, evento e curso bom de BH e SP,{" "}
            <span className="text-brand">num lugar só.</span>
          </h1>
          <p className="mt-4 text-base text-foreground/70">
            Achado pela comunidade, pra comunidade. Cada card leva direto pra
            fonte oficial pra você garantir sua vaga.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              href="/vagas"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition hover:brightness-105"
            >
              Ver vagas agora →
            </Link>
            <Link
              href="/sobre"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium transition hover:border-brand hover:text-brand"
            >
              Conhece a proposta
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl font-bold">
                  <CountUp value={s.value} />
                </p>
                <p className="text-xs text-foreground/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Layout desktop (md+): primeira tela + mascote que
          acompanha o scroll descendo até "Como funciona". ---------- */}
      <div className="relative hidden overflow-hidden md:block">
        <HeroGlow />
        <ParticleField />
        <div className="mx-auto flex h-screen max-w-6xl px-4 sm:px-6">
          <div ref={headlineRef} className="my-auto max-w-xl">
            <span className="inline-flex items-center rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
              👋 Bem-vindo(a) — somos Cria
            </span>
            <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Vaga, evento e curso bom de BH e SP,{" "}
              <span className="text-brand">num lugar só.</span>
            </h1>
            <p className="mt-4 max-w-md text-base text-foreground/70 sm:text-lg">
              Achado pela comunidade, pra comunidade. Cada card leva direto
              pra fonte oficial pra você garantir sua vaga.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/vagas"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Ver vagas agora →
              </Link>
              <Link
                href="/sobre"
                className="text-sm font-medium text-foreground/70 underline underline-offset-4 hover:text-brand"
              >
                Conhece a proposta
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold">
                    <CountUp value={s.value} />
                  </p>
                  <p className="text-xs text-foreground/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Atalhos rápidos — somem cedo ao rolar */}
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

          {/* Dica de rolagem */}
          <div
            ref={scrollCueRef}
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-xs text-foreground/50"
          >
            <span>Role para descobrir</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 animate-bounce"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mascote — filho direto do wrapper (não da seção com overflow-hidden
          do hero), pra poder descer visualmente da 1ª tela até aqui embaixo
          sem ser cortada. Só existe/anima em md+. */}
      <div
        ref={mascotBoxRef}
        className="pointer-events-none absolute top-[40vh] left-[82%] hidden w-56 -translate-x-1/2 -translate-y-1/2 md:block lg:w-72"
        aria-hidden="true"
      >
        <Image
          src="/mascot/cria-wave.png"
          alt=""
          width={520}
          height={520}
          priority
          className="h-auto w-full select-none"
          draggable={false}
        />
      </div>

      {/* "Como funciona" — conteúdo normal da página, logo abaixo da
          primeira tela (fundo liso, sem partículas). */}
      <div className="mx-auto hidden max-w-6xl px-4 py-24 text-center sm:px-6 md:block">
        <div ref={howTitleRef}>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Como funciona
          </h2>
          <p className="mt-1 text-sm text-foreground/60">
            Simples assim — sem cadastro obrigatório, sem taxa.
          </p>
        </div>

        <ScrollReveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-surface p-5 text-center shadow-sm"
            >
              <span className="text-2xl" aria-hidden="true">
                {step.icon}
              </span>
              <p className="mt-2 text-sm font-semibold">{step.title}</p>
              <p className="mt-1 text-xs text-foreground/60">{step.text}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>

      {/* Versão mobile de "Como funciona" — sem mascote acompanhando,
          direto abaixo do hero. */}
      <div className="mx-auto max-w-xl border-t border-border px-4 py-14 text-center sm:px-6 md:hidden">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Como funciona
        </h2>
        <p className="mt-1 text-sm text-foreground/60">
          Simples assim — sem cadastro obrigatório, sem taxa.
        </p>
        <div className="mt-6 flex flex-col gap-3 text-left">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm"
            >
              <span className="text-xl" aria-hidden="true">
                {step.icon}
              </span>
              <div>
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="mt-0.5 text-xs text-foreground/60">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
