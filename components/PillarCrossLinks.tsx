import Link from "next/link";
import Tilt from "./Tilt";

const PILLARS = [
  {
    key: "evento" as const,
    href: "/eventos",
    label: "Eventos",
    icon: "🎟️",
    chipClass: "bg-brand/15 text-brand",
  },
  {
    key: "curso" as const,
    href: "/cursos",
    label: "Cursos",
    icon: "🎓",
    chipClass: "bg-brand-yellow/25 text-brand-yellow-foreground",
  },
  {
    key: "vaga" as const,
    href: "/vagas",
    label: "Vagas",
    icon: "💼",
    chipClass: "bg-brand-green/15 text-brand-green",
  },
];

// Incentiva navegar pra outras páginas em vez de a pessoa achar que já viu
// tudo — aparece no fim de cada página de pilar, linkando pros outros dois.
export default function PillarCrossLinks({
  current,
}: {
  current: "evento" | "curso" | "vaga";
}) {
  const others = PILLARS.filter((p) => p.key !== current);

  return (
    <div className="mt-16 border-t border-border pt-8">
      <p className="mb-4 text-sm font-medium text-foreground/60">
        Também vale dar uma olhada
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {others.map((p) => (
          <Tilt key={p.href} max={4}>
            <Link
              href={p.href}
              className="flex h-full items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 shadow-sm transition hover:border-brand hover:shadow-md"
            >
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-lg ${p.chipClass}`}
                aria-hidden="true"
              >
                {p.icon}
              </span>
              <span>
                <span className="block text-sm font-semibold">
                  {p.label}
                </span>
                <span className="block text-xs text-foreground/50">
                  Ver todos →
                </span>
              </span>
            </Link>
          </Tilt>
        ))}
      </div>
    </div>
  );
}
