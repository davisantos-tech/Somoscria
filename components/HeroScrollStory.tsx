"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroGlow from "./HeroGlow";
import ParticleField from "./ParticleField";
import CountUp from "./CountUp";

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

// A "cena" de entrada da home (md+): primeira tela cheia, headline grande
// à esquerda e mascote grande à direita. Ao rolar, a tela fica pinada — a
// mascote nunca sai do centro vertical, só desliza da direita pro centro
// horizontal — e quando ela chega no meio, "Como funciona" aparece ao
// redor dela (título+ideia da plataforma em cima, os 3 passos embaixo).
// Esse pin só roda em telas md+ (gsap.matchMedia): no celular a gente
// mostra tudo em fluxo normal, sem pin nem posicionamento absoluto.
export default function HeroScrollStory({
  eventCount,
  courseCount,
  jobCount,
}: HeroScrollStoryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const quickAccessRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const mascotBoxRef = useRef<HTMLDivElement>(null);
  const howTitleRef = useRef<HTMLDivElement>(null);
  const stepsRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const headerHeight =
          document.querySelector("header")?.getBoundingClientRect().height ?? 64;

        // Y fica travado em 50% pra sempre — só X se move. É isso que faz
        // a mascote "flutuar" sempre no centro vertical da tela.
        gsap.set(mascotBoxRef.current, {
          top: "50%",
          left: "80%",
          xPercent: -50,
          yPercent: -50,
        });
        gsap.set(howTitleRef.current, { opacity: 0, y: -14 });
        gsap.set(stepsRowRef.current, { opacity: 0, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: `top top+=${headerHeight}`,
            end: "+=150%",
            scrub: 1,
            pin: pinRef.current,
            pinSpacing: true,
            // Usa transform em vez de position:fixed pra pinar — imune a
            // qualquer ancestral que ganhe um transform (ex.: a transição
            // de página em app/template.tsx), que senão vira containing
            // block e quebra o pin fixo.
            pinType: "transform",
          },
        });

        tl.to(headlineRef.current, { opacity: 0, x: -50, duration: 0.9 }, 0)
          .to(quickAccessRef.current, { opacity: 0, y: 20, duration: 0.5 }, 0)
          .to(scrollCueRef.current, { opacity: 0, duration: 0.3 }, 0)
          .to(mascotBoxRef.current, { left: "50%", duration: 1.4, ease: "power1.inOut" }, 0.1)
          .to(howTitleRef.current, { opacity: 1, y: 0, duration: 0.4 }, 1.0)
          .to(stepsRowRef.current, { opacity: 1, y: 0, duration: 0.4 }, 1.2);

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
    <div ref={wrapperRef} className="relative h-auto md:h-[250vh]">
      {/* ---------- Layout mobile/tablet (< md): tudo em fluxo normal,
          sem pin nem posicionamento absoluto — nada sobrepõe nada. ---------- */}
      <div className="relative overflow-hidden md:hidden">
        <HeroGlow />
        <ParticleField />
        <div className="mx-auto max-w-xl px-4 pt-10 pb-14 text-center sm:px-6">
          <span className="inline-flex items-center rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
            👋 Bem-vindo(a) — somos Cria
          </span>

          <div className="relative mx-auto mt-4 w-48">
            <div className="mascot-bob">
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
            <div
              className="mx-auto -mt-3 h-4 w-2/3 rounded-full bg-black/25 blur-md dark:bg-black/40"
              aria-hidden="true"
            />
          </div>

          <h1 className="font-display mt-4 text-5xl leading-[0.95] font-bold tracking-tight">
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
              className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition hover:brightness-105"
            >
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                aria-hidden="true"
              />
              <span className="relative">Ver vagas agora →</span>
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

        <div className="mx-auto max-w-xl border-t border-border px-4 py-14 text-center sm:px-6">
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
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-lg"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="mt-0.5 text-xs text-foreground/60">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Layout desktop (md+): a cena pinada. ---------- */}
      <div ref={pinRef} className="relative hidden h-screen w-full overflow-hidden md:block">
        <HeroGlow />
        <ParticleField />

        <div className="mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6">
          <div ref={headlineRef} className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
              👋 Bem-vindo(a) — somos Cria
            </span>
            <h1 className="font-display mt-5 text-6xl leading-[0.95] font-bold tracking-tight sm:text-7xl lg:text-8xl">
              Vaga, evento e curso bom de BH e SP,{" "}
              <span className="text-brand">num lugar só.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-foreground/70 sm:text-xl">
              Achado pela comunidade, pra comunidade. Cada card leva direto
              pra fonte oficial pra você garantir sua vaga.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/vagas"
                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:brightness-105"
              >
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  aria-hidden="true"
                />
                <span className="relative">Ver vagas agora →</span>
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
        </div>

        {/* Mascote — sempre no centro vertical da tela; só desliza no
            eixo horizontal, da direita pro centro. */}
        <div
          ref={mascotBoxRef}
          className="pointer-events-none absolute top-1/2 left-[80%] w-56 -translate-x-1/2 -translate-y-1/2 sm:w-64 lg:w-72"
        >
          <div className="mascot-bob">
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
          {/* Sombra de "chão" — sem ela a mascote parece recortada e colada
              por cima do fundo, em vez de fazer parte da cena. */}
          <div
            className="mx-auto -mt-4 h-6 w-2/3 rounded-full bg-black/30 blur-lg"
            aria-hidden="true"
          />
        </div>

        {/* "Como funciona" — título + a ideia por trás da plataforma, num
            painel de vidro pra não brigar com o fundo de partículas.
            Aparece quando a mascote chega no centro. */}
        <div
          ref={howTitleRef}
          className="absolute top-[5%] left-1/2 max-w-lg -translate-x-1/2 rounded-3xl border border-border bg-surface/80 px-8 py-5 text-center shadow-xl backdrop-blur-md"
        >
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Como funciona
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-foreground/70 sm:text-base">
            A Cria junta vaga, evento e curso garimpados pela comunidade e
            revisados por gente de verdade — sempre te levando direto pra
            fonte.
          </p>
        </div>

        {/* Os 3 passos, embaixo da mascote centralizada */}
        <div
          ref={stepsRowRef}
          className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 gap-3 px-4 sm:gap-4"
        >
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="w-36 rounded-2xl border border-border bg-surface/90 p-3 text-center shadow-xl backdrop-blur-sm sm:w-44 sm:p-4"
            >
              <span
                className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-lg"
                aria-hidden="true"
              >
                {step.icon}
              </span>
              <p className="mt-1 text-sm font-semibold">{step.title}</p>
              <p className="mt-0.5 text-xs text-foreground/60">{step.text}</p>
            </div>
          ))}
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

        {/* Dica de rolagem — duas setinhas, uma atrás da outra */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-foreground/50"
        >
          <span className="mb-1">Role para descobrir</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 animate-bounce"
            style={{ animationDelay: "0ms" }}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-mt-2 h-3.5 w-3.5 animate-bounce"
            style={{ animationDelay: "150ms" }}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
