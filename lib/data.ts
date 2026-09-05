import eventsSeed from "@/data/events.json";
import coursesSeed from "@/data/courses.json";
import jobsSeed from "@/data/jobs.json";
import type { CatalogItem, City, CourseItem, EventItem, JobItem } from "./types";

// Camada de acesso a dados. Fase 1 (MVP): lê diretamente dos arquivos JSON
// em /data. O restante da aplicação (páginas, componentes) não sabe — nem
// deveria saber — de onde os dados vêm. Quando migrarmos para um banco
// (Postgres/Supabase) ou uma API/feed de parceria, só as funções abaixo
// precisam mudar; a UI permanece igual.
//
// data/jobs.json começa vazio de propósito: diferente de eventos/cursos
// (onde dava pra citar plataformas conhecidas com segurança), uma vaga é
// uma oferta específica de uma empresa específica — inventar uma aqui
// seria publicar uma vaga falsa. Preencha manualmente com vagas reais.

/** Um evento continua "em cartaz" até o fim do seu último dia. */
function isUpcoming(event: EventItem): boolean {
  const lastDay = event.endDate ?? event.date;
  const [y, m, d] = lastDay.split("-").map(Number);
  const endOfLastDay = new Date(y, (m ?? 1) - 1, d ?? 1, 23, 59, 59);
  return endOfLastDay >= new Date();
}

export function getEvents(): EventItem[] {
  // Filtra eventos já encerrados — mostrar como "descubra esse evento" algo
  // que já passou é pior do que mostrar menos itens. Isso é calculado toda
  // vez com base na data real do servidor, não precisa de manutenção manual.
  return (eventsSeed as EventItem[]).filter(isUpcoming);
}

export function getCourses(): CourseItem[] {
  return coursesSeed as CourseItem[];
}

export function getJobs(): JobItem[] {
  return jobsSeed as JobItem[];
}

export function getAllItems(): CatalogItem[] {
  return [...getEvents(), ...getCourses(), ...getJobs()];
}

/** Cidades presentes na base (eventos + vagas), na ordem em que devem aparecer no filtro. */
export function getAvailableCities(): City[] {
  const preferredOrder: City[] = [
    "belo-horizonte",
    "sao-paulo",
    "sao-jose-do-rio-preto",
    "online",
  ];
  const present = new Set([
    ...getEvents().map((e) => e.city),
    ...getJobs().map((j) => j.city),
  ]);
  return preferredOrder.filter((city) => present.has(city));
}

export function getItemById(id: string): CatalogItem | undefined {
  return getAllItems().find((item) => item.id === id);
}
