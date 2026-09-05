import type { Metadata } from "next";
import Explorer from "@/components/Explorer";
import ScrollReveal from "@/components/ScrollReveal";
import PillarCrossLinks from "@/components/PillarCrossLinks";
import { getEvents, getAvailableCities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Conferências, meetups e encontros em BH e SP — presenciais ou online, achados pela comunidade. Cada card leva direto pra fonte oficial.",
};

export default function EventosPage() {
  const events = getEvents();
  const cities = getAvailableCities();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <ScrollReveal className="mb-8 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
          🎟️ Eventos
        </span>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Conferências, meetups e encontros de BH e SP
        </h1>
        <p className="mt-3 text-foreground/70">
          Presenciais ou online, curados pela comunidade — sem evento fake,
          sem spam. Cada card mostra o essencial; o botão leva direto pra
          fonte oficial (Sympla, Luma, Eventbrite e outras) pra você
          garantir sua vaga.
        </p>
      </ScrollReveal>

      <Explorer
        items={events}
        cities={cities}
        scope="evento"
        searchPlaceholder="Buscar evento…"
        requireLoginAfter={3}
        gateLabel="eventos"
      />

      <PillarCrossLinks current="evento" />
    </div>
  );
}
