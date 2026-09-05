import type { Metadata } from "next";
import ProfileForm from "@/components/ProfileForm";

export const metadata: Metadata = {
  title: "Meu perfil",
  description:
    "Veja e edite suas informações na Cria: cidade, momento de carreira e mais.",
};

export default function PerfilPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Seu perfil</h1>
      <p className="mt-3 text-foreground/70">
        Com isso a gente consegue destacar o que faz sentido pra você —
        vagas do seu nível, eventos perto de você. Pode editar quando
        quiser.
      </p>

      <div className="mt-8">
        <ProfileForm />
      </div>
    </div>
  );
}
