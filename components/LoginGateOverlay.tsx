"use client";

import ItemCard from "./ItemCard";
import GoogleIcon from "./GoogleIcon";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { CatalogItem } from "@/lib/types";

// Mostra uma prévia real dos itens trancados, borrada, com um botão de
// login por cima — em vez de simplesmente esconder ou bloquear a página
// inteira. A pessoa vê que tem mais coisa ali, só precisa entrar pra ver.
export default function LoginGateOverlay({
  lockedItems,
  totalLocked,
  label,
}: {
  lockedItems: CatalogItem[];
  totalLocked: number;
  label: string;
}) {
  async function handleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  if (totalLocked === 0) return null;

  return (
    <div className="relative mt-4">
      <div
        aria-hidden="true"
        className="pointer-events-none grid select-none grid-cols-1 gap-4 opacity-60 blur-sm sm:grid-cols-2 lg:grid-cols-3"
      >
        {lockedItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-background/40 via-background/80 to-background">
        <div className="mx-4 flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-6 py-8 text-center shadow-lg">
          <p className="text-sm font-semibold text-foreground">
            +{totalLocked} {label} esperando por você
          </p>
          <p className="max-w-xs text-xs text-foreground/60">
            Entra com Google pra ver a lista completa — é de graça e leva
            menos de um minuto.
          </p>
          <button
            type="button"
            onClick={handleLogin}
            disabled={!isSupabaseConfigured}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <GoogleIcon />
            Entrar com Google
          </button>
        </div>
      </div>
    </div>
  );
}
