"use client";

import Link from "next/link";
import { useAuthProfile } from "@/lib/hooks/useAuthProfile";

// Só aparece quando a pessoa está logada MAS ainda não completou o
// perfil — cutuca gentilmente sem travar nada (a vitrine continua aberta
// mesmo sem clicar aqui).
export default function ProfileBanner() {
  const { loading, user, hasProfile } = useAuthProfile();

  if (loading || !user || hasProfile !== false) return null;

  return (
    <Link
      href="/perfil"
      className="mb-8 flex items-center justify-between gap-4 rounded-xl border border-brand/30 bg-brand/10 px-5 py-4 transition hover:border-brand/60"
    >
      <div>
        <p className="text-sm font-semibold text-foreground">
          Login incompleto — falta completar seu perfil
        </p>
        <p className="mt-0.5 text-xs text-foreground/60">
          Leva menos de um minuto e já destacamos vagas e eventos do seu
          momento de carreira.
        </p>
      </div>
      <span className="shrink-0 rounded-lg bg-brand px-3 py-2 text-xs font-medium text-brand-foreground">
        Completar →
      </span>
    </Link>
  );
}
