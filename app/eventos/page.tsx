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

// Página estática (bom pra performance/SEO), mas regenerada a cada hora —
// sem isso, um evento só "sumiria" da lista quando o site fosse
// republicado de novo. Com isso, `isUpcoming()` em lib/data.ts recalcula
// contra a data real com frequência suficiente pra nunca mostrar evento
// já encerrado por mais de ~1h.
export const revalidate = 3600;

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
          Conferências, meetups e encontros de{" "}
          <span className="text-brand">BH e SP</span>
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
