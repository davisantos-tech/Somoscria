/**
 * Scraper da Luma: lê as páginas de descoberta por cidade (ex.: luma.com/saopaulo),
 * que publicam os eventos como JSON-LD (schema.org/Event) — dado estruturado
 * público, feito pra esse tipo de consumo, não é engenharia reversa de nada
 * escondido. Insere só metadado factual em candidate_events pra revisão humana.
 *
 * Rodar: npm run scrape:luma
 */
import { createAdminClient, upsertCandidates, type CandidateEvent } from "./lib/supabaseAdmin";
import { suggestNiche } from "../../lib/ai/huggingface";

// slug da Luma -> nossa cidade. Luma só tem página de descoberta pra
// algumas cidades (não achamos uma pra Belo Horizonte ainda) — adicione
// aqui se descobrir outras.
const CITY_PAGES: { slug: string; cityRaw: string }[] = [
  { slug: "saopaulo", cityRaw: "São Paulo" },
];

const USER_AGENT =
  "Mozilla/5.0 (compatible; CriaBot/0.1; +https://somoscria-two.vercel.app) — bot de curadoria, contato: " +
  (process.env.NEXT_PUBLIC_SUGGESTION_EMAIL ?? "curadoria@somoscria.com.br");

interface LumaEvent {
  name?: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  location?: {
    name?: string;
    address?: { addressLocality?: string };
  };
}

async function fetchCityEvents(slug: string): Promise<LumaEvent[]> {
  const res = await fetch(`https://luma.com/${slug}`, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!res.ok) {
    console.warn(`  ⚠️  ${slug}: HTTP ${res.status}, pulando.`);
    return [];
  }

  const html = await res.text();
  const match = html.match(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
  );
  if (!match) {
    console.warn(`  ⚠️  ${slug}: nenhum bloco JSON-LD encontrado, pulando.`);
    return [];
  }

  try {
    const data = JSON.parse(match[1]);
    const items = (data.itemListElement ?? []) as Array<{ item?: LumaEvent }>;
    return items.map((it) => it.item).filter((e): e is LumaEvent => Boolean(e));
  } catch (e) {
    console.warn(`  ⚠️  ${slug}: erro ao parsear JSON-LD —`, e);
    return [];
  }
}

async function main() {
  console.log("Buscando eventos na Luma...\n");
  const admin = createAdminClient();
  const allCandidates: CandidateEvent[] = [];

  for (const { slug, cityRaw } of CITY_PAGES) {
    console.log(`→ ${cityRaw} (luma.com/${slug})`);
    const events = await fetchCityEvents(slug);
    console.log(`  ${events.length} eventos encontrados`);

    for (const ev of events) {
      if (!ev.name || !ev.url || !ev.startDate) continue;

      // Sugestão de nicho via IA — só um ponto de partida pra quem revisa;
      // se não tiver HUGGINGFACE_API_TOKEN configurado, volta null e o
      // scraper segue normalmente (não é obrigatório pra funcionar).
      const suggestedNiche = await suggestNiche(ev.name);

      allCandidates.push({
        title: ev.name,
        event_date: ev.startDate.slice(0, 10),
        end_date: ev.endDate ? ev.endDate.slice(0, 10) : null,
        venue: ev.location?.name ?? null,
        city_raw: ev.location?.address?.addressLocality ?? cityRaw,
        source_platform: "luma",
        source_url: ev.url,
        suggested_niche: suggestedNiche,
      });
    }

    // Pausa educada entre cidades — não precisa ser agressivo.
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`\nTotal de candidatos coletados: ${allCandidates.length}`);
  const { inserted, error } = await upsertCandidates(admin, allCandidates);

  if (error) {
    console.error("Erro ao salvar no Supabase:", error.message);
    process.exit(1);
  }

  console.log(`✅ ${inserted} candidatos novos inseridos em candidate_events.`);
  console.log("Revise em: Supabase → Table Editor → candidate_events");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
