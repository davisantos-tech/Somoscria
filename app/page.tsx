import Link from "next/link";
import Tilt from "@/components/Tilt";
import HeroScrollStory from "@/components/HeroScrollStory";
import ScrollReveal from "@/components/ScrollReveal";
import ProfileBanner from "@/components/ProfileBanner";
import ItemCard from "@/components/ItemCard";
import CountUp from "@/components/CountUp";
import { getEvents, getCourses, getJobs } from "@/lib/data";

// Os 3 lugares que citam pilar (hero, cards e destaques) levam pra páginas
// dedicadas — /eventos, /cursos, /vagas — em vez de um filtro dentro da
// própria home. A ideia é que a pessoa navegue pela plataforma, não veja
// tudo resumido na primeira tela.

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
    <>
      {/* Full-bleed: essa seção cobre a primeira tela inteira, sem o
          max-w-6xl do resto da página — é a "cena" de abertura. */}
      <HeroScrollStory />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <ProfileBanner />

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
    </>
  );
}
