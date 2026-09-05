import Link from "next/link";
import Explorer from "@/components/Explorer";
import Tilt from "@/components/Tilt";
import HeroReveal from "@/components/HeroReveal";
import HeroGlow from "@/components/HeroGlow";
import ScrollReveal from "@/components/ScrollReveal";
import MascotFloat from "@/components/MascotFloat";
import ProfileBanner from "@/components/ProfileBanner";
import { getAllItems, getAvailableCities } from "@/lib/data";
import type { TypeFilter } from "@/lib/types";

const VALID_TYPES: TypeFilter[] = [
  "todos",
  "evento",
  "evento-presencial",
  "evento-online",
  "curso",
  "curso-gratuito",
  "curso-pago",
  "vaga",
];

// Cores por pilar, seguindo o moodboard: eventos = laranja, cursos =
// amarelo, vagas = verde.
const QUICK_ACCESS: {
  href: string;
  label: string;
  icon: string;
  chipClass: string;
}[] = [
  {
    href: "/?tipo=evento",
    label: "Eventos",
    icon: "🎟️",
    chipClass: "bg-brand/15 text-brand",
  },
  {
    href: "/?tipo=curso",
    label: "Cursos",
    icon: "🎓",
    chipClass: "bg-brand-yellow/25 text-brand-yellow-foreground",
  },
  {
    href: "/?tipo=vaga",
    label: "Vagas",
    icon: "💼",
    chipClass: "bg-brand-green/15 text-brand-green",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    icon: "🔍",
    title: "Descubra",
    text: "Filtra por cidade, área ou tipo — vaga, evento ou curso — e acha o que faz sentido pra você.",
  },
  {
    step: "2",
    icon: "👆",
    title: "Escolha",
    text: "Cada card já mostra o essencial: data, local, se é grátis, quem oferece. Sem enrolação.",
  },
  {
    step: "3",
    icon: "🚀",
    title: "Garanta",
    text: "O botão leva direto pra fonte oficial — Sympla, Luma, LinkedIn, o site da empresa. É lá que você garante.",
  },
];

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const tipoParam = Array.isArray(params.tipo) ? params.tipo[0] : params.tipo;
  const initialType: TypeFilter = VALID_TYPES.includes(
    tipoParam as TypeFilter,
  )
    ? (tipoParam as TypeFilter)
    : "todos";

  const items = getAllItems();
  const cities = getAvailableCities();

  const eventCount = items.filter((i) => i.type === "evento").length;
  const courseCount = items.filter((i) => i.type === "curso").length;
  const jobCount = items.filter((i) => i.type === "vaga").length;

  const PILLARS = [
    {
      href: "/?tipo=evento",
      title: "Eventos",
      description:
        "Conferências, meetups e encontros — presenciais ou online, com curadoria de verdade. Sem evento fake, sem spam.",
      icon: "🎟️",
      countLabel:
        eventCount > 0
          ? `${eventCount} ${eventCount === 1 ? "evento" : "eventos"} agora`
          : "Chegando",
      chipClass: "bg-brand/15 text-brand",
      hoverClass: "hover:border-brand",
    },
    {
      href: "/?tipo=curso",
      title: "Cursos",
      description:
        "Trilhas gratuitas e pagas das melhores plataformas — freeCodeCamp, HubSpot Academy, AWS, Harvard e mais.",
      icon: "🎓",
      countLabel:
        courseCount > 0
          ? `${courseCount} ${courseCount === 1 ? "curso" : "cursos"} agora`
          : "Chegando",
      chipClass: "bg-brand-yellow/25 text-brand-yellow-foreground",
      hoverClass: "hover:border-brand-yellow",
    },
    {
      href: "/?tipo=vaga",
      title: "Vagas",
      description:
        "Oportunidades reais, direto na fonte oficial da empresa. Sem vaga fantasma, sem intermediário cobrando taxa.",
      icon: "💼",
      countLabel: jobCount > 0 ? `${jobCount} vagas agora` : "Chegando em breve",
      chipClass: "bg-brand-green/15 text-brand-green",
      hoverClass: "hover:border-brand-green",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="relative">
        <HeroGlow />
        <HeroReveal>
        <div className="mb-6 flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between md:gap-8">
          <section className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
              👋 Bem-vindo(a) — somos Cria
            </span>
            <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Vaga, evento e curso bom de BH e SP, num lugar só — achado
              pela comunidade, pra comunidade.
            </h1>
            <p className="mt-3 text-foreground/70">
              A Cria reúne o que tem de melhor em tecnologia, saúde,
              negócios, marketing, design e mais — de graça ou pago,
              presencial ou online. Cada card leva direto pra fonte oficial
              (Sympla, Luma, Eventbrite e outras) pra você garantir sua
              vaga.{" "}
              <Link href="/sobre" className="text-brand underline underline-offset-2 hover:no-underline">
                Novo por aqui? Conhece a proposta →
              </Link>
            </p>
          </section>

          <MascotFloat
            src="/mascot/cria-wave.png"
            alt="Mascote da Cria acenando"
            className="hidden w-40 shrink-0 md:block lg:w-52"
          />
        </div>

        <ProfileBanner />

        <div className="mb-16 grid grid-cols-3 gap-3">
          {QUICK_ACCESS.map((item) => (
            <Tilt key={item.href} max={4}>
              <Link
                href={item.href}
                className="flex h-full flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-4 text-center shadow-sm transition hover:border-brand hover:shadow-md sm:flex-row sm:gap-2"
              >
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-base ${item.chipClass}`}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </Tilt>
          ))}
        </div>
        </HeroReveal>
      </div>

      <ScrollReveal className="mb-16">
        <div className="mb-6 max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Como funciona
          </h2>
          <p className="mt-2 text-foreground/70">
            Simples assim — sem cadastro obrigatório, sem taxa, sem enrolação.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {HOW_IT_WORKS.map((s) => (
            <div
              key={s.step}
              className="relative rounded-2xl border border-border bg-surface p-6"
            >
              <span className="font-display absolute top-4 right-5 text-3xl font-bold text-foreground/10">
                {s.step}
              </span>
              <span className="text-2xl" aria-hidden="true">
                {s.icon}
              </span>
              <h3 className="mt-2 font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-foreground/70">{s.text}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mb-16">
        <div className="mb-6 max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Tudo que você precisa, num lugar só
          </h2>
          <p className="mt-2 text-foreground/70">
            Três pilares, uma curadoria só — feita por gente de verdade,
            não por robô.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Tilt key={pillar.href} max={5}>
              <Link
                href={pillar.href}
                className={`flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${pillar.hoverClass}`}
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${pillar.chipClass}`}
                  aria-hidden="true"
                >
                  {pillar.icon}
                </span>
                <h3 className="font-display text-xl font-semibold">
                  {pillar.title}
                </h3>
                <p className="text-sm text-foreground/70">
                  {pillar.description}
                </p>
                <span className="mt-auto text-xs font-medium text-foreground/50">
                  {pillar.countLabel} →
                </span>
              </Link>
            </Tilt>
          ))}
        </div>
      </ScrollReveal>

      <h2 className="font-display mb-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        Explore tudo
      </h2>
      <p className="mb-6 text-foreground/70">
        Busca, filtra por cidade e nicho, e acha exatamente o que procura.
      </p>

      {/* key força remontar o Explorer quando o atalho rápido muda o tipo
          via URL — sem isso, o useState inicial do Explorer "gruda" no
          primeiro valor e ignora navegações seguintes pro mesmo /. */}
      <Explorer
        key={initialType}
        items={items}
        cities={cities}
        initialType={initialType}
      />
    </div>
  );
}
