// Tipos centrais do domínio. Mantidos separados da camada de acesso a dados
// (lib/data.ts) para que a origem dos dados (hoje: JSON estático; amanhã:
// banco de dados ou API de parceria) possa mudar sem afetar a UI.

export type Niche =
  | "tecnologia"
  | "empreendedorismo"
  | "saude"
  | "negocios"
  | "marketing"
  | "design"
  | "financas"
  | "educacao"
  | "outros";

// Cidades cobertas pelo MVP. O foco do produto é BH + SP, mas a base pode
// conter eventos presenciais em outras cidades próximas (ex.: interior de
// SP) ou eventos 100% online — por isso o union é extensível.
export type City =
  | "belo-horizonte"
  | "sao-paulo"
  | "sao-jose-do-rio-preto"
  | "online";

export type SourcePlatform =
  | "sympla"
  | "luma"
  | "eventbrite"
  | "hotmart"
  | "coursera"
  | "hubspot-academy"
  | "outro";

interface BaseItem {
  id: string;
  title: string;
  niche: Niche[];
  sourcePlatform: SourcePlatform;
  /** Rótulo de exibição quando sourcePlatform === "outro" (ex.: "Site oficial", "Doity"). */
  sourceLabel?: string;
  sourceUrl: string;
  shortDescription: string;
  isFree: boolean;
}

export interface EventItem extends BaseItem {
  type: "evento";
  city: City;
  venue?: string;
  address?: string;
  date: string; // ISO 8601
  endDate?: string;
}

export interface CourseItem extends BaseItem {
  type: "curso";
  provider: string;
  certificateFree: boolean;
}

// Nível de senioridade da vaga. Serve hoje só como filtro/badge; no futuro
// pode ser cruzado com o `yearsExperience` do perfil (ver Profile) pra
// destacar vagas compatíveis com o momento de carreira de quem está logado.
export type SeniorityLevel =
  | "estagio"
  | "junior"
  | "pleno"
  | "senior"
  | "especialista";

export interface JobItem extends BaseItem {
  type: "vaga";
  company: string;
  city: City;
  seniority: SeniorityLevel;
}

export type CatalogItem = EventItem | CourseItem | JobItem;

export type TypeFilter =
  | "todos"
  | "evento"
  | "evento-presencial"
  | "evento-online"
  | "curso"
  | "curso-gratuito"
  | "curso-pago"
  | "vaga";

export type CityFilter = "todas" | City;
export type NicheFilter = "todos" | Niche;

// --- Perfil de usuário (Supabase Auth + tabela profiles) ---------------

export type EducationStatus =
  | "cursando"
  | "formado"
  | "pos_graduacao"
  | "doutorado"
  | "outro";

export interface Profile {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  educationStatus: EducationStatus;
  yearsExperience: number;
}
