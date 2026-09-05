-- Schema do Supabase para o perfil de usuário da Cria.
--
-- Como aplicar: cole este arquivo inteiro no SQL Editor do seu projeto
-- Supabase (dashboard → SQL Editor → New query) e rode. Não é aplicado
-- automaticamente pelo código — o Claude não tem acesso ao seu projeto
-- Supabase remoto.
--
-- Guarda só o essencial pra personalizar a experiência (cidade, momento de
-- carreira) e, no futuro, distribuir vagas por nível de senioridade. Nome e
-- telefone são dados sensíveis (LGPD): o formulário em /perfil/completar
-- pede consentimento explícito antes de salvar.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  phone text not null,
  city text not null,
  education_status text not null
    check (education_status in ('cursando', 'formado', 'pos_graduacao', 'doutorado', 'outro')),
  years_experience integer not null check (years_experience >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'Perfil complementar do usuário da Cria, preenchido após o primeiro login com Google.';

-- RLS: cada pessoa só enxerga e edita o próprio perfil.
alter table public.profiles enable row level security;

create policy "Usuário lê o próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuário cria o próprio perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Usuário atualiza o próprio perfil"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Mantém updated_at em dia a cada edição.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

-- Fila de revisão pra eventos encontrados por automação (scripts em
-- scripts/scrapers/*). Guarda só metadado factual (título, data, local,
-- link) — NUNCA descrição completa ou imagem da fonte, pra manter a
-- promessa de marca de "resumo curto escrito por nós" mesmo com
-- automação. Nada aqui aparece no site publicamente: um humano revisa,
-- escreve o resumo curto e promove pra data/events.json manualmente.
create table if not exists public.candidate_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date date not null,
  end_date date,
  venue text,
  city_raw text,
  source_platform text not null,
  source_url text not null unique,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  -- Sugestão de nicho via classificação zero-shot (Hugging Face) — nunca
  -- definitiva, é só um ponto de partida pra quem revisa confirmar ou trocar.
  suggested_niche text[],
  reviewer_notes text,
  scraped_at timestamptz not null default now(),
  reviewed_at timestamptz
);

comment on table public.candidate_events is
  'Candidatos a evento encontrados por automação, aguardando revisão humana antes de virar EventItem em data/events.json.';

-- Se você já tinha rodado este schema antes de suggested_niche existir,
-- este ALTER garante que a coluna aparece mesmo assim (create table if not
-- exists, acima, não adiciona coluna em tabela que já existe).
alter table public.candidate_events
  add column if not exists suggested_niche text[];

comment on column public.candidate_events.suggested_niche is
  'Sugestão de nicho via IA (Hugging Face zero-shot) — sempre revisada por humano, nunca publicada sem confirmação.';

-- RLS ligado, sem policy nenhuma pra anon/authenticated: só a service role
-- (usada pelos scripts de automação, nunca exposta no navegador) e você
-- mesmo pelo Table Editor do dashboard do Supabase conseguem ler/escrever
-- aqui. Não existe UI pública nem privada-de-usuário pra essa tabela.
alter table public.candidate_events enable row level security;
