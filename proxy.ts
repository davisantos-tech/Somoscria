import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// No Next.js 16 este arquivo substitui o antigo middleware.ts (mesma API,
// nome novo). Roda antes de cada página pra manter a sessão do Supabase
// renovada, e protege só as rotas que exigem login — o resto do site
// (home, /sobre, /sugerir, e a vitrine de vagas) continua aberto.
export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const requiresAuth = request.nextUrl.pathname.startsWith("/perfil");
  if (requiresAuth && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("login", "necessario");
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    // Roda em tudo, exceto assets estáticos, imagens otimizadas e favicon.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
