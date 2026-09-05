import type { Metadata } from "next";
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

      <Explorer
        items={jobs}
        cities={cities}
        scope="vaga"
        searchPlaceholder="Buscar vaga…"
      />

      <PillarCrossLinks current="vaga" />
    </div>
  );
}
