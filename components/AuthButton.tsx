"use client";

import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuthProfile } from "@/lib/hooks/useAuthProfile";
import GoogleIcon from "./GoogleIcon";

// Botão de login/logout via Google (Supabase Auth). Estado de sessão +
// perfil vem do useAuthProfile (compartilhado com o banner "complete seu
// perfil" na home) — ver README para o setup do provider Google no
// Supabase.
export default function AuthButton() {
  const { loading, user, hasProfile } = useAuthProfile();

  async function handleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  if (loading) {
    return (
      <div
        className="h-9 w-32 animate-pulse rounded-full bg-surface-muted"
        aria-hidden="true"
      />
    );
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={handleLogin}
        disabled={!isSupabaseConfigured}
        title={
          isSupabaseConfigured
            ? undefined
            : "Login ainda não configurado — veja o README"
        }
        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:text-foreground"
      >
        <GoogleIcon />
        Entrar com Google
      </button>
    );
  }

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ??
    user.email ??
    "Você";
  const firstName = displayName.split(" ")[0];
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/perfil"
        className="relative flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-surface-muted"
        title={hasProfile === false ? "Complete seu perfil" : "Meu perfil"}
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- avatar do Google, domínio externo variável
          <img
            src={avatarUrl}
            alt=""
            className="h-7 w-7 rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/20 text-xs font-semibold text-brand">
            {firstName.charAt(0).toUpperCase()}
          </span>
        )}
        {hasProfile === false && (
          <span
            className="absolute top-0 right-1 h-2 w-2 rounded-full bg-brand ring-2 ring-background"
            aria-hidden="true"
            title="Perfil incompleto"
          />
        )}
        <span className="hidden text-sm text-foreground/70 sm:inline">
          {firstName}
        </span>
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/70 transition hover:border-brand hover:text-brand"
      >
        Sair
      </button>
    </div>
  );
}
