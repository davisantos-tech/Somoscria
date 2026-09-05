import Link from "next/link";
import Tilt from "@/components/Tilt";
import HeroReveal from "@/components/HeroReveal";
import HeroGlow from "@/components/HeroGlow";
import ParticleField from "@/components/ParticleField";
import ScrollReveal from "@/components/ScrollReveal";
import MascotFloat from "@/components/MascotFloat";
import ProfileBanner from "@/components/ProfileBanner";
import ItemCard from "@/components/ItemCard";
import CountUp from "@/components/CountUp";
import { getEvents, getCourses, getJobs } from "@/lib/data";

// Cores por pilar, seguindo o moodboard: eventos = laranja, cursos =
// amarelo, vagas = verde. Os 3 lugares que citam pilar (atalhos, cards e
// destaques) agora levam pra páginas dedicadas — /eventos, /cursos,
// /vagas — em vez de um filtro dentro da própria home. A ideia é que a
// pessoa navegue pela plataforma, não veja tudo resumido na primeira tela.
const QUICK_ACCESS = [
  { href: "/eventos", label: "Eventos", icon: "🎟️", chipClass: "bg-brand/15 text-brand" },
  {
    href: "/cursos",
    label: "Cursos",
    icon: "🎓",
    chipClass: "bg-brand-yellow/25 text-brand-yellow-foreground",
  },
  {
    href: "/vagas",
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
    text: "Navega pelas páginas de Vagas, Eventos e Cursos e acha o que faz sentido pra você.",
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

export default function HomePage() {
  const events = getEvents();
  const courses = getCourses();
  const jobs = getJobs();

  const eventCount = events.length;
  const courseCount = courses.length;
  const jobCount = jobs.length;

  const PILLARS = [
    {
      href: "/eventos",
      title: "Eventos",
      description:
        "Conferências, meetups e encontros — presenciais ou online, com curadoria de verdade. Sem evento fake, sem spam.",
      icon: "🎟️",
      count: eventCount,
      countUnit: eventCount === 1 ? "evento agora" : "eventos agora",
      emptyLabel: "Chegando",
      chipClass: "bg-brand/15 text-brand",
      hoverClass: "hover:border-brand",
    },
    {
      href: "/cursos",
      title: "Cursos",
      description:
        "Trilhas gratuitas e pagas das melhores plataformas — freeCodeCamp, HubSpot Academy, AWS, Harvard e mais.",
      icon: "🎓",
      count: courseCount,
      countUnit: courseCount === 1 ? "curso agora" : "cursos agora",
      emptyLabel: "Chegando",
      chipClass: "bg-brand-yellow/25 text-brand-yellow-foreground",
      hoverClass: "hover:border-brand-yellow",
    },
    {
      href: "/vagas",
      title: "Vagas",
      description:
        "Oportunidades reais, direto na fonte oficial da empresa. Sem vaga fantasma, sem intermediário cobrando taxa.",
      icon: "💼",
      count: jobCount,
      countUnit: "vagas agora",
      emptyLabel: "Chegando em breve",
      chipClass: "bg-brand-green/15 text-brand-green",
      hoverClass: "hover:border-brand-green",
    },
  ];

  // Um gostinho de cada pilar, não a lista inteira — quem quiser ver tudo
  // clica e vai pra página dedicada. Evento mais próximo primeiro.
  const featuredEvent = [...events].sort((a, b) => a.date.localeCompare(b.date))[0];
  const featuredCourse = courses[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="relative">
        <HeroGlow />
        <ParticleField />
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
                presencial ou online.{" "}
                <Link
                  href="/sobre"
                  className="text-brand underline underline-offset-2 hover:no-underline"
                >
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
                  {pillar.count > 0 ? (
                    <>
                      <CountUp value={pillar.count} /> {pillar.countUnit}
                    </>
                  ) : (
                    pillar.emptyLabel
                  )}{" "}
                  →
                </span>
              </Link>
            </Tilt>
          ))}
        </div>
      </ScrollReveal>

      {(featuredEvent || featuredCourse) && (
        <ScrollReveal className="mb-4">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Destaques da semana
              </h2>
              <p className="mt-2 text-foreground/70">
                Uma prévia — o resto você encontra explorando cada página.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredEvent && (
              <Tilt>
                <ItemCard item={featuredEvent} />
              </Tilt>
            )}
            {featuredCourse && (
              <Tilt>
                <ItemCard item={featuredCourse} />
              </Tilt>
            )}
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
