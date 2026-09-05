import { createClient } from "@supabase/supabase-js";

// Cliente Supabase com a service role key — só pra scripts rodados
// localmente (nunca importado pelo app Next.js). A service role ignora RLS
// por completo, então essa chave NUNCA pode ter o prefixo NEXT_PUBLIC_ nem
// ser exposta no navegador. Fica só em .env.local, fora do bundle do site.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Faltam NEXT_PUBLIC_SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY no .env.local. " +
        "A service role key fica em Project Settings → API → service_role no dashboard do Supabase.",
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export interface CandidateEvent {
  title: string;
  event_date: string; // YYYY-MM-DD
  end_date?: string | null;
  venue?: string | null;
  city_raw?: string | null;
  source_platform: string;
  source_url: string;
  /** Sugestão de nicho via IA (Hugging Face) — sempre revisada por humano antes de publicar, nunca definitiva. */
  suggested_niche?: string[] | null;
}

/** Insere candidatos novos, ignorando os que já existem (dedupe por source_url). */
export async function upsertCandidates(
  admin: ReturnType<typeof createAdminClient>,
  candidates: CandidateEvent[],
) {
  if (candidates.length === 0) return { inserted: 0, error: null };

  const { error, count } = await admin
    .from("candidate_events")
    .upsert(candidates, {
      onConflict: "source_url",
      ignoreDuplicates: true,
      count: "exact",
    });

  return { inserted: count ?? 0, error };
}
