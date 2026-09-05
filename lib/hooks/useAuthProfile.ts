"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthProfileState {
  loading: boolean;
  user: User | null;
  /** true = tem perfil salvo; false = logado mas sem perfil; null = deslogado (não se aplica). */
  hasProfile: boolean | null;
}

// Hook único pra "quem está logado e já completou o perfil" — usado pelo
// banner de perfil incompleto na home e pelo link "Meu perfil" no header,
// pra não duplicar a mesma lógica de auth + consulta em profiles em dois
// lugares.
export function useAuthProfile(): AuthProfileState {
  const router = useRouter();
  const [state, setState] = useState<AuthProfileState>({
    loading: isSupabaseConfigured,
    user: null,
    hasProfile: null,
  });

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const supabase = createClient();
    let active = true;

    async function resolve(user: User | null) {
      if (!user) {
        if (active) setState({ loading: false, user: null, hasProfile: null });
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (active) {
        setState({ loading: false, user, hasProfile: Boolean(data) });
      }
    }

    supabase.auth.getUser().then(({ data }) => resolve(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      resolve(session?.user ?? null);
      // Sincroniza Server Components (ex.: o /perfil protegido pelo
      // proxy.ts) com a sessão nova depois de login/logout.
      router.refresh();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router]);

  return state;
}
