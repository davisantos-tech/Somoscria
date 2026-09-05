import Image from "next/image";
import Link from "next/link";
import HeroGlow from "./HeroGlow";
import ParticleField from "./ParticleField";
import CountUp from "./CountUp";
import ScrollReveal from "./ScrollReveal";

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

function PrimaryCta({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/vagas"
      className={`group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:brightness-105 ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        aria-hidden="true"
      />
      <span className="relative">Ver vagas agora →</span>
    </Link>
  );
}

function Mascot({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
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
        className="mx-auto -mt-4 h-6 w-2/3 rounded-full bg-black/30 blur-lg"
        aria-hidden="true"
      />
    </div>
  );
}

// A primeira tela (headline + mascote + fundo de partículas) é a ÚNICA
// parte com o fundo animado — no fim dela, um gradiente conecta com o
// fundo liso da seção "Como funciona", que vem logo abaixo como conteúdo
// normal da página (sem pin, sem scroll-jack): mascote grande e centrada,
// a ideia da plataforma explicada, e os 3 passos embaixo.
export default function HeroScrollStory({
  eventCount,
  courseCount,
  jobCount,
}: HeroScrollStoryProps) {
  const stats = [
    { value: eventCount, label: eventCount === 1 ? "evento" : "eventos" },
    { value: courseCount, label: courseCount === 1 ? "curso" : "cursos" },
    { value: jobCount, label: "vagas" },
  ];

  return (
    <div className="relative">
      {/* ---------- Primeira tela: fundo animado só existe aqui. ---------- */}
      <div className="relative flex h-screen min-h-[640px] w-full flex-col overflow-hidden">
        <HeroGlow />
        <ParticleField />

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.2fr_1fr] md:gap-6">
            <div className="hero-intro order-2 text-center md:order-1 md:text-left">
              <span className="inline-flex items-center rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
                👋 Bem-vindo(a) — somos Cria
              </span>
              <h1 className="font-display mt-5 text-5xl leading-[0.95] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Vaga, evento e curso bom de BH e SP,{" "}
                <span className="text-brand">num lugar só.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-lg text-foreground/70 sm:text-xl md:mx-0">
                Achado pela comunidade, pra comunidade. Cada card leva
                direto pra fonte oficial pra você garantir sua vaga.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <PrimaryCta />
                <Link
                  href="/sobre"
                  className="text-sm font-medium text-foreground/70 underline underline-offset-4 hover:text-brand"
                >
                  Conhece a proposta
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 md:justify-start">
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

            <Mascot className="hero-intro order-1 mx-auto w-48 sm:w-64 md:order-2 md:w-full md:max-w-xs" />
          </div>
        </div>

        {/* Atalhos rápidos */}
        <div className="mx-auto hidden w-full max-w-6xl px-4 pb-10 sm:px-6 md:block">
          <div className="flex gap-2">
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

        {/* Dica de rolagem — duas setinhas */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-foreground/50 md:flex">
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

        {/* Gradiente de saída — conecta o fundo animado com o fundo liso
            da seção "Como funciona" logo abaixo. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background sm:h-48"
          aria-hidden="true"
        />
      </div>

      {/* ---------- "Como funciona" — conteúdo normal, fundo liso. ---------- */}
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <ScrollReveal>
          <Mascot className="mx-auto w-40 sm:w-48" />
          <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Como funciona
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-foreground/70 sm:text-lg">
            A Cria junta, num só lugar, vaga, evento e curso que andam
            espalhados por aí — garimpados pela comunidade e revisados por{" "}
            <span className="font-semibold text-brand">gente de verdade</span>{" "}
            antes de ir pro ar. A ideia é simples: menos tempo garimpando,
            mais tempo aproveitando a oportunidade certa. A gente nunca
            substitui a fonte oficial — só te mostra o essencial e te leva
            direto pra ela, sem inscrição por aqui, sem taxa, sem letra
            miúda.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-surface p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-xl"
                aria-hidden="true"
              >
                {step.icon}
              </span>
              <p className="mt-3 text-sm font-semibold">{step.title}</p>
              <p className="mt-1 text-xs text-foreground/60">{step.text}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </div>
  );
}
