import Link from "next/link";

// Skeleton no formato de um card de verdade — sem dado nenhum escondido
// atrás do blur (diferente do LoginGateOverlay, que borra itens reais).
// Aqui o blur é só visual: mostra que a página tá sendo construída de
// verdade, em vez de um texto avisando sozinho.
function SkeletonCard() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex gap-2">
        <span className="h-5 w-16 rounded-full bg-surface-muted" />
        <span className="h-5 w-20 rounded-full bg-surface-muted" />
      </div>
      <div className="h-4 w-4/5 rounded bg-surface-muted" />
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded bg-surface-muted" />
        <div className="h-3 w-3/4 rounded bg-surface-muted" />
      </div>
      <div className="mt-auto space-y-1.5">
        <div className="h-3 w-1/2 rounded bg-surface-muted" />
        <div className="h-3 w-1/3 rounded bg-surface-muted" />
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="h-3 w-16 rounded bg-surface-muted" />
        <div className="h-7 w-24 rounded-lg bg-surface-muted" />
      </div>
    </div>
  );
}

export default function UnderDevelopmentGate({
  description,
  ctaHref = "/sugerir",
  ctaLabel = "Sugere aqui →",
  count = 6,
}: {
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
  count?: number;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none grid select-none grid-cols-1 gap-4 opacity-50 blur-[3px] sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-background/20 via-background/85 to-background">
        <div className="mx-4 flex max-w-sm flex-col items-center gap-2 rounded-2xl border border-border bg-surface px-6 py-8 text-center shadow-xl">
          <span className="text-2xl" aria-hidden="true">
            🚧
          </span>
          <p className="text-sm font-semibold text-foreground">
            Ainda em desenvolvimento
          </p>
          <p className="text-xs text-foreground/60">{description}</p>
          <Link
            href={ctaHref}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground transition hover:brightness-105"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
