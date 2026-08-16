import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Renova o token de sessão do Supabase a cada request (chamado pelo
// proxy.ts na raiz do projeto — equivalente ao antigo middleware.ts no
// Next.js 15 e anteriores). Também expõe o usuário atual pra quem quiser
// checar auth direto no proxy.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Login ainda não foi configurado (ver README → "Login com Google") —
  // deixa o site funcionar normalmente como visitante anônimo em vez de
  // derrubar toda request com erro 500.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { response, user: null };
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANTE: não remover — isso força o Supabase a validar o token e
  // renovar os cookies antes de qualquer Server Component ler a sessão.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
