"use client";

import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuthProfile } from "@/lib/hooks/useAuthProfile";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.54-5.17 3.54-8.87z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3a7.43 7.43 0 0 1-11.02-3.9H.98v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.03 14.19a7.2 7.2 0 0 1 0-4.38V6.72H.98a12 12 0 0 0 0 10.56z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0A12 12 0 0 0 .98 6.72l4.05 3.09A7.16 7.16 0 0 1 12 4.77z"
      />
    </svg>
  );
}

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
