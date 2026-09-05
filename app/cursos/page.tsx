import type { Metadata } from "next";
import Explorer from "@/components/Explorer";
import ScrollReveal from "@/components/ScrollReveal";
import PillarCrossLinks from "@/components/PillarCrossLinks";
import { getCourses } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cursos",
  description:
    "Trilhas gratuitas e pagas das melhores plataformas — freeCodeCamp, HubSpot Academy, AWS, Harvard e mais, achadas pela comunidade.",
};

export default function CursosPage() {
  const courses = getCourses();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <ScrollReveal className="mb-8 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-yellow/25 px-3 py-1 text-xs font-semibold text-brand-yellow-foreground">
          🎓 Cursos
        </span>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Trilhas gratuitas e pagas pra você crescer
        </h1>
        <p className="mt-3 text-foreground/70">
          Das melhores plataformas — freeCodeCamp, HubSpot Academy, AWS,
          Harvard e outras. Cada card mostra se o certificado também é
          gratuito; o botão leva direto pra fonte oficial.
        </p>
      </ScrollReveal>

      <Explorer
        items={courses}
        cities={[]}
        scope="curso"
        searchPlaceholder="Buscar curso…"
      />

      <PillarCrossLinks current="curso" />
    </div>
  );
}
