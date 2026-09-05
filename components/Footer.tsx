import Link from "next/link";
import Logo from "./Logo";
import { CITY_DOT_CLASS } from "@/lib/constants";

const COLUMNS = [
  {
    title: "Explorar",
    links: [
      { href: "/vagas", label: "Vagas" },
      { href: "/eventos", label: "Eventos" },
      { href: "/cursos", label: "Cursos" },
    ],
  },
  {
    title: "Cria",
    links: [
      { href: "/sobre", label: "Sobre a Cria" },
      { href: "/sugerir", label: "Sugerir evento/curso" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      {/* Mesmo fio de LED do header, só que virado — fecha a "moldura" da
          marca no topo e na base de toda página. */}
      <div className="header-led h-[2px] w-full" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="logo-glow inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                <span className="font-display text-base font-bold">C</span>
              </span>
              <Logo className="text-lg" />
            </div>
            <p className="mt-3 max-w-sm text-sm text-foreground/70">
              Achamos as vagas, eventos e cursos bons de BH e SP pra você
              não precisar garimpar. A gente não vende ingresso, não cobra
              taxa — só te leva direto pra fonte oficial.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-foreground">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-foreground/50">
            Sympla, Luma, Eventbrite, Hotmart, Coursera e demais marcas
            citadas pertencem aos seus respectivos donos. A Cria não tem
            vínculo oficial com essas plataformas.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/50">
            <span
              className={`h-1.5 w-1.5 rounded-full ${CITY_DOT_CLASS["belo-horizonte"]}`}
              aria-hidden="true"
            />
            Belo Horizonte
            <span
              className={`h-1.5 w-1.5 rounded-full ${CITY_DOT_CLASS["sao-paulo"]}`}
              aria-hidden="true"
            />
            São Paulo
          </span>
        </div>
      </div>
    </footer>
  );
}
