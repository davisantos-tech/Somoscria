import type { Metadata } from "next";
import ProfileForm from "@/components/ProfileForm";

export const metadata: Metadata = {
  title: "Completar perfil",
  description:
    "Conta pra Cria seu nome, cidade e momento de carreira pra gente personalizar vagas e eventos pra você.",
};

export default function CompletarPerfilPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Só mais um passo
      </h1>
      <p className="mt-3 text-foreground/70">
        Com isso a gente já consegue destacar o que faz sentido pra você —
        vagas do seu nível, eventos perto de você. Leva menos de um minuto.
      </p>

      <div className="mt-8">
        <ProfileForm />
      </div>
    </div>
  );
}
