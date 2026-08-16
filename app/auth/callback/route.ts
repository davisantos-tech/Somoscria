import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Destino do redirect do Google depois do login (configurado no Supabase
// Auth → Providers → Google, e no próprio Google Cloud Console). Troca o
// "code" da URL por uma sessão válida e manda a pessoa pro lugar certo:
// direto pro perfil se ainda não preencheu, ou pra home se já preencheu.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

        if (!profile) {
          return NextResponse.redirect(`${origin}/perfil/completar`);
        }
      }

      return NextResponse.redirect(origin);
    }
  }

  return NextResponse.redirect(`${origin}/?erro=login`);
}
