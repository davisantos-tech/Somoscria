import { createBrowserClient } from "@supabase/ssr";

// true quando as chaves do Supabase já foram configuradas (ver README →
// "Login com Google"). Componentes de auth checam isso antes de tentar
// criar um cliente, pra não quebrar o site enquanto o login ainda não foi
// configurado.
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// Cliente Supabase para uso em Client Components (browser). Lê as chaves
// públicas das variáveis de ambiente — veja o README para como obtê-las.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
