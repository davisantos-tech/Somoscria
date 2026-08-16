import Link from "next/link";
import Explorer from "@/components/Explorer";
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

const QUICK_ACCESS: { href: string; label: string; icon: string }[] = [
  { href: "/?tipo=vaga", label: "Vagas", icon: "💼" },
  { href: "/?tipo=evento", label: "Eventos", icon: "🎟️" },
  { href: "/?tipo=curso", label: "Cursos", icon: "🎓" },
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-8 max-w-3xl">
        <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
          Somos Cria
        </span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Vaga, evento e curso bom de BH e SP, num lugar só — achado pela
          comunidade, pra comunidade.
        </h1>
        <p className="mt-3 text-foreground/70">
          Reunimos o que tem de melhor em tecnologia, saúde, negócios,
          marketing, design e mais — de graça ou pago, presencial ou
          online. Achou algo aqui? O botão leva direto pra fonte oficial
          (Sympla, Luma, Eventbrite e outras) pra você garantir sua vaga.
        </p>
      </section>

      <div className="mb-10 grid grid-cols-3 gap-3">
        {QUICK_ACCESS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-4 text-center transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md sm:flex-row sm:justify-center sm:gap-2"
          >
            <span className="text-xl" aria-hidden="true">
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

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
