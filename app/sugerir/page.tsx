import type { Metadata } from "next";
import SuggestForm from "@/components/SuggestForm";

export const metadata: Metadata = {
  title: "Sugerir evento ou curso",
  description:
    "Achou um evento ou curso bom em BH, SP ou 100% online? Manda pra Cria e ajuda a comunidade a crescer.",
};

export default function SugerirPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Sugerir evento ou curso
      </h1>
      <p className="mt-3 text-foreground/70">
        Achou um evento ou curso bom em BH, SP ou 100% online que devia
        estar aqui? Preenche os campos abaixo — a gente revisa e adiciona à
        mão.
      </p>

      <div className="mt-8">
        <SuggestForm />
      </div>
    </div>
  );
}
