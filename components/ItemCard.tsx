import {
  CITY_DOT_CLASS,
  CITY_LABELS,
  NICHE_LABELS,
  PLATFORM_LABELS,
  SENIORITY_LABELS,
} from "@/lib/constants";
import type { CatalogItem, City } from "@/lib/types";

function CityTag({
  city,
  extra,
  onlineLabel = "Online",
}: {
  city: City;
  extra?: string;
  onlineLabel?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${CITY_DOT_CLASS[city]}`}
        aria-hidden="true"
      />
      {extra ? `${extra} · ` : ""}
      {city === "online" ? onlineLabel : CITY_LABELS[city]}
    </span>
  );
}

function formatDateRange(date: string, endDate?: string) {
  const parse = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, (m ?? 1) - 1, d ?? 1);
  };
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  });
  const start = parse(date);
  if (!endDate || endDate === date) return fmt.format(start);
  const end = parse(endDate);
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

function platformLabel(item: CatalogItem) {
  if (item.sourcePlatform === "outro" && item.sourceLabel) {
    return item.sourceLabel;
  }
  return PLATFORM_LABELS[item.sourcePlatform];
}

const TYPE_BADGE: Record<CatalogItem["type"], string> = {
  evento: "Evento",
  curso: "Curso",
  vaga: "Vaga",
};

export default function ItemCard({ item }: { item: CatalogItem }) {
  const ctaLabel =
    item.type === "vaga"
      ? `Ver vaga na ${platformLabel(item)}`
      : item.type === "curso"
        ? `Ver curso na ${platformLabel(item)}`
        : `Ver na ${platformLabel(item)}`;

  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
          {TYPE_BADGE[item.type]}
        </span>
        {item.type === "vaga" && (
          <span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs text-foreground/70">
            {SENIORITY_LABELS[item.seniority]}
          </span>
        )}
        {item.niche.map((n) => (
          <span
            key={n}
            className="rounded-full bg-surface-muted px-2.5 py-1 text-xs text-foreground/70"
          >
            {NICHE_LABELS[n]}
          </span>
        ))}
      </div>

      <h3 className="text-base font-semibold leading-snug">{item.title}</h3>

      <p className="text-sm text-foreground/70">{item.shortDescription}</p>

      <div className="mt-auto space-y-1 text-sm text-foreground/80">
        {item.type === "evento" && (
          <>
            <p>
              📅 {formatDateRange(item.date, item.endDate)}
              {item.date.slice(0, 4) && (
                <span className="text-foreground/50">
                  {" "}
                  · {item.date.slice(0, 4)}
                </span>
              )}
            </p>
            <p>
              📍{" "}
              <CityTag
                city={item.city}
                extra={item.city !== "online" ? item.venue : undefined}
              />
            </p>
          </>
        )}

        {item.type === "curso" && (
          <>
            <p>🎓 {item.provider}</p>
            <p className="text-xs text-foreground/50">
              {item.isFree
                ? item.certificateFree
                  ? "Gratuito, com certificado gratuito"
                  : "Conteúdo gratuito · certificado pago"
                : "Pago"}
            </p>
          </>
        )}

        {item.type === "vaga" && (
          <>
            <p>🏢 {item.company}</p>
            <p>
              📍 <CityTag city={item.city} onlineLabel="Remoto" />
            </p>
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
        <span className="text-xs text-foreground/50">
          Fonte:{" "}
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline decoration-dotted hover:text-foreground"
          >
            {platformLabel(item)}
          </a>
        </span>
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="shrink-0 rounded-lg bg-brand px-3 py-2 text-xs font-medium text-brand-foreground transition hover:opacity-90"
        >
          {ctaLabel} ↗
        </a>
      </div>
    </article>
  );
}
