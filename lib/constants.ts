import type {
  City,
  EducationStatus,
  Niche,
  SeniorityLevel,
  SourcePlatform,
} from "./types";

export const NICHE_LABELS: Record<Niche, string> = {
  tecnologia: "Tecnologia",
  saude: "Saúde",
  negocios: "Negócios & Empreendedorismo",
  marketing: "Marketing",
  design: "Design/UX",
  financas: "Finanças",
  educacao: "Educação",
  outros: "Outros",
};

export const CITY_LABELS: Record<City, string> = {
  "belo-horizonte": "Belo Horizonte",
  "sao-paulo": "São Paulo",
  "sao-jose-do-rio-preto": "São José do Rio Preto/SP",
  online: "Online",
};

export const PLATFORM_LABELS: Record<SourcePlatform, string> = {
  sympla: "Sympla",
  luma: "Luma",
  eventbrite: "Eventbrite",
  hotmart: "Hotmart",
  coursera: "Coursera",
  "hubspot-academy": "HubSpot Academy",
  outro: "Outra fonte",
};

export const SENIORITY_LABELS: Record<SeniorityLevel, string> = {
  estagio: "Estágio",
  junior: "Júnior",
  pleno: "Pleno",
  senior: "Sênior",
  especialista: "Especialista",
};

export const EDUCATION_STATUS_LABELS: Record<EducationStatus, string> = {
  cursando: "Cursando a graduação",
  formado: "Formado(a)",
  pos_graduacao: "Pós-graduação",
  doutorado: "Mestrado ou doutorado",
  outro: "Outro",
};

// Sugestões de cidade no formulário de perfil — não trava em BH/SP porque
// a Cria pode ter usuários de qualquer lugar, mesmo cobrindo eventos só de
// algumas cidades por enquanto.
export const CITY_SUGGESTIONS = [
  "Belo Horizonte",
  "São Paulo",
  "Rio de Janeiro",
  "Recife",
  "Salvador",
  "Curitiba",
  "Porto Alegre",
  "Brasília",
];

// E-mail de contato usado no formulário "Sugerir evento/curso" (rota
// mailto:, sem backend no MVP). Troque pelo e-mail oficial do projeto antes
// de publicar — veja o README.
export const SUGGESTION_EMAIL =
  process.env.NEXT_PUBLIC_SUGGESTION_EMAIL ?? "curadoria@somoscria.com.br";
