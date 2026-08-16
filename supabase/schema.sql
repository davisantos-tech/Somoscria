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
