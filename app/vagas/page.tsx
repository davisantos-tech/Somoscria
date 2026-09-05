import type { Metadata } from "next";
import Link from "next/link";
import Explorer from "@/components/Explorer";
import ScrollReveal from "@/components/ScrollReveal";
import PillarCrossLinks from "@/components/PillarCrossLinks";
import { getJobs, getAvailableCities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vagas",
  description:
    "Oportunidades reais de BH e SP, direto na fonte oficial da empresa — sem vaga fantasma, sem taxa de intermediário.",
};

export default function VagasPage() {
  const jobs = getJobs();
  const cities = getAvailableCities();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <ScrollReveal className="mb-8 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/15 px-3 py-1 text-xs font-semibold text-brand-green">
          💼 Vagas
        </span>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Oportunidades reais de BH e SP
        </h1>
        <p className="mt-3 text-foreground/70">
          Direto na fonte oficial da empresa — sem vaga fantasma, sem
          intermediário cobrando taxa. Complete seu perfil pra a gente
          destacar as vagas do seu momento de carreira.
        </p>
      </ScrollReveal>

      <ScrollReveal className="mb-8">
        <div className="flex flex-col gap-2 rounded-2xl border border-brand-yellow/40 bg-brand-yellow/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground/80">
            <span className="font-semibold text-foreground">
              🚧 Essa página ainda está em desenvolvimento.
            </span>{" "}
            Estamos construindo a rede de vagas reais aos poucos, direto na
            fonte oficial de cada empresa.
          </p>
          <Link
            href="/sugerir"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold transition hover:border-brand hover:text-brand"
          >
            Conhece uma vaga boa? Sugere aqui →
          </Link>
        </div>
      </ScrollReveal>

      <Explorer
        items={jobs}
        cities={cities}
        scope="vaga"
        searchPlaceholder="Buscar vaga…"
        requireLoginAfter={3}
        gateLabel="vagas"
      />

      <PillarCrossLinks current="vaga" />
    </div>
  );
}
