# Cria — Vagas, Eventos e Cursos

MVP do produto **Cria**: um diretório de **descoberta e curadoria** de
vagas, eventos e cursos, com foco inicial em Belo Horizonte e São Paulo,
organizado por nicho (tecnologia, saúde, negócios, marketing, design,
finanças, educação...).

Login com Google é opcional pra navegar (a vitrine continua 100% aberta),
mas destrava a personalização: quem completa o perfil (`/perfil/completar`)
ganha uma experiência mais direcionada ao seu momento de carreira — sem
precisar filtrar tudo na mão toda vez.

## Identidade de marca

- **Nome**: Cria. Não usar "Hub", "Labs" ou "Plataforma" no texto de marca
  (home, `/sobre`, footer, meta title/description, redes sociais) — soa
  corporativo, e o tom da marca é comunitário, caloroso e direto.
- **Grito de comunidade**: "Somos Cria" — usado no hero, no footer e em
  materiais de campanha.
- **Cidade como camada, nunca marca separada**: uma marca só (Cria); cidade
  é identidade dentro do produto (ex.: "Cria BH", "Cria SP"), nunca um app
  ou domínio à parte. No código isso já é assim: `city` é só um campo/filtro
  em `lib/types.ts` — veja [Como adicionar um novo evento](#como-adicionar-um-novo-evento)
  para cobrir uma cidade nova sem criar nada separado.

Este projeto é uma **vitrine que direciona tráfego para a fonte oficial**,
nunca um substituto dela:

- Cada card mostra só o metadado essencial (nome, data, local/cidade, nicho,
  plataforma de origem) e um resumo curto **escrito por nós** — nunca
  descrições, imagens ou textos copiados do produtor/organizador.
- O botão principal do card sempre abre a página oficial (Sympla, Luma,
  Eventbrite, Hotmart, Coursera etc.) em uma nova aba — a inscrição/compra
  acontece inteiramente lá.
- Não coletamos, armazenamos ou exibimos dados pessoais de participantes ou
  organizadores dos eventos/cursos/vagas em si — isso vale pro conteúdo da
  vitrine (metadado público). Já o perfil de quem cria conta na própria
  Cria (nome, telefone, cidade, momento de carreira) é outra coisa: dado
  pessoal nosso mesmo, coletado com consentimento explícito no formulário
  de perfil, guardado no Supabase com RLS (cada pessoa só lê/edita o
  próprio registro) — nunca exposto em página pública.
- A base de vagas/eventos/cursos desta fase é **curada manualmente**
  (arquivos JSON), sem scraping automatizado. `data/jobs.json` começa
  vazio de propósito — ver [Como adicionar uma vaga](#como-adicionar-uma-vaga).

Veja mais em [`/sobre`](http://localhost:3000/sobre).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- Conteúdo da vitrine (vagas/eventos/cursos) em `data/*.json`, lido por uma
  camada de acesso isolada (`lib/data.ts`) — pronta pra virar banco de
  dados ou API/feed de parceria depois, sem tocar na UI
- **Supabase** (Postgres + Auth) só pra login e perfil de usuário: Google
  OAuth via Supabase Auth, sessão gerenciada com `@supabase/ssr` e
  `proxy.ts` (equivalente ao `middleware.ts` no Next.js 16 — [ver docs](node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md)),
  tabela `profiles` com RLS (ver `supabase/schema.sql`)
- Dark mode com alternância manual (classe `.dark`, sem flash no carregamento)
- Deploy-ready para a [Vercel](https://vercel.com)

> ⚠️ Este repositório foi gerado com o Next.js 16, que traz mudanças em
> relação a versões anteriores. Antes de alterar convenções de rotas,
> layouts ou metadata, confira a documentação embutida em
> `node_modules/next/dist/docs/`.

## Como rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Outros comandos:

```bash
npm run build   # build de produção (também roda o type-check)
npm run start   # sobe o build de produção
npm run lint    # eslint
```

## Estrutura

```
app/
  page.tsx                  # Home: hero + atalhos rápidos + Explorer
  sobre/page.tsx             # Página "Sobre" (modelo de curadoria)
  sugerir/page.tsx           # Formulário "Sugerir evento/curso"
  perfil/completar/page.tsx  # Formulário de perfil pós-login (requer sessão)
  auth/callback/route.ts     # Troca o code do OAuth por sessão Supabase
  layout.tsx                 # Layout raiz, header/footer, script anti-flash de tema
  globals.css                # Tailwind v4 + tokens de tema (claro/escuro)
components/
  Explorer.tsx           # Busca + filtros (cidade/nicho/tipo) + grid — client
  ItemCard.tsx            # Card unificado de evento/curso/vaga
  SuggestForm.tsx          # Formulário de sugestão (mailto:, sem backend)
  ProfileForm.tsx           # Formulário de /perfil/completar
  AuthButton.tsx             # Login/logout com Google no Header
  Header.tsx / Footer.tsx / ThemeToggle.tsx
data/
  events.json          # Eventos curados manualmente
  courses.json           # Cursos curados manualmente
  jobs.json                # Vagas curadas manualmente (começa vazio)
lib/
  types.ts               # Tipos do domínio (EventItem, CourseItem, JobItem, Profile...)
  data.ts                  # Camada de acesso a dados — único lugar que lê os JSON
  constants.ts               # Labels de nicho/cidade/senioridade/etc., e-mail de sugestão
  supabase/
    client.ts                # Cliente Supabase pra Client Components
    server.ts                  # Cliente Supabase pra Server Components/Route Handlers
    proxy.ts                     # Helper de refresh de sessão, usado pelo proxy.ts da raiz
proxy.ts                  # Roda em toda request: renova sessão e protege /perfil
supabase/
  schema.sql               # SQL da tabela profiles + RLS — rodar manualmente no Supabase
```

## Como adicionar um novo evento

Edite `data/events.json` e acrescente um objeto seguindo o schema abaixo
(veja `lib/types.ts` para o tipo completo):

```json
{
  "id": "slug-unico-do-evento",
  "title": "Nome do evento",
  "type": "evento",
  "niche": ["tecnologia"],
  "city": "belo-horizonte",
  "venue": "Nome do local (opcional)",
  "address": "Endereço (opcional)",
  "date": "2026-09-01",
  "endDate": "2026-09-02",
  "sourcePlatform": "sympla",
  "sourceUrl": "https://www.sympla.com.br/evento/...",
  "shortDescription": "Resumo curto ESCRITO POR VOCÊ — nunca copiado da fonte.",
  "isFree": false
}
```

- `niche` aceita mais de um valor: `"tecnologia" | "saude" | "negocios" |
  "marketing" | "design" | "financas" | "educacao" | "outros"`.
- `city` aceita `"belo-horizonte" | "sao-paulo" | "online"` — e também
  `"sao-jose-do-rio-preto"` para eventos no interior de SP já presentes na
  base. Para cobrir uma nova cidade fora de BH/SP, adicione o valor em
  `lib/types.ts` (`City`) e em `CITY_LABELS` (`lib/constants.ts`); o filtro
  de cidade na Home é montado dinamicamente a partir dos valores presentes
  em `data/events.json`, então não precisa mexer na UI.
- `sourcePlatform` aceita `"sympla" | "luma" | "eventbrite" | "hotmart" |
  "coursera" | "hubspot-academy" | "outro"`. Quando usar `"outro"`, informe
  também `sourceLabel` (ex.: `"Doity"`, `"Site oficial"`) para o badge da
  fonte ficar legível.

## Como adicionar um novo curso

Edite `data/courses.json` seguindo o schema `CourseItem` (`lib/types.ts`):
mesmos campos de `niche`, `sourcePlatform`/`sourceUrl`/`shortDescription`,
mais `provider` (nome de quem produz o curso, ex.: `"Harvard PLL"`),
`isFree` e `certificateFree` (`true` quando o certificado também é
gratuito; `false` quando só o conteúdo é gratuito, como no modo audit do
Coursera).

## Como adicionar uma vaga

Edite `data/jobs.json` seguindo o schema `JobItem` (`lib/types.ts`): mesmos
campos de `niche`/`sourcePlatform`/`sourceUrl`/`shortDescription` dos
eventos, mais `company` (nome da empresa), `city` (aceita `"online"` pra
vaga remota) e `seniority` (`"estagio" | "junior" | "pleno" | "senior" |
"especialista"`).

```json
{
  "id": "slug-unico-da-vaga",
  "title": "Analista de Dados Pleno",
  "type": "vaga",
  "niche": ["tecnologia"],
  "company": "Nome da Empresa",
  "city": "belo-horizonte",
  "seniority": "pleno",
  "sourcePlatform": "outro",
  "sourceLabel": "LinkedIn",
  "sourceUrl": "https://www.linkedin.com/jobs/view/...",
  "shortDescription": "Resumo curto ESCRITO POR VOCÊ — nunca copiado da fonte.",
  "isFree": true
}
```

`data/jobs.json` começa vazio de propósito: ao contrário de eventos/cursos
(onde dava pra citar plataformas conhecidas com segurança), uma vaga é uma
oferta específica de uma empresa específica — publicar uma inventada seria
publicar uma vaga falsa. Preencha só com vagas reais. `isFree` existe por
consistência de schema com `EventItem`/`CourseItem`, mas não tem uso prático
pra vaga — mantenha `true`.

## Login com Google (Supabase Auth)

Login é opcional pra navegar a vitrine, mas obrigatório pra acessar
`/perfil/completar` (o `proxy.ts` da raiz garante isso). Nenhum desses
passos pode ser feito pelo Claude — todos exigem acesso às suas próprias
contas Google Cloud e Supabase:

1. **Crie um projeto no [Supabase](https://supabase.com)** (plano free
   serve). Anote a região — mais perto do público-alvo (BH/SP) é melhor
   latência.
2. **Configure o provider Google:** no dashboard do Supabase, vá em
   `Authentication → Providers → Google` e ative. O Supabase mostra ali
   mesmo a **Redirect URL** que você vai precisar no próximo passo (algo
   como `https://SEU-PROJETO.supabase.co/auth/v1/callback`) — copie.
3. **Crie as credenciais no [Google Cloud Console](https://console.cloud.google.com):**
   - Crie um projeto (ou use um existente).
   - Configure a "OAuth consent screen" (nome do app: "Cria"; e-mail de
     suporte; escopos padrão bastam).
   - Em "APIs & Services → Credentials", crie um "OAuth client ID" do tipo
     "Web application".
   - Em "Authorized redirect URIs", cole a Redirect URL que o Supabase deu
     no passo 2.
   - Em "Authorized JavaScript origins", adicione `http://localhost:3000`
     (dev) e, depois, o domínio de produção.
   - Copie o **Client ID** e o **Client Secret** gerados.
4. **Volte ao Supabase** e cole o Client ID/Secret na tela do provider
   Google (passo 2). Salve.
5. **Configure as Redirect URLs do Supabase:** em
   `Authentication → URL Configuration`, adicione `http://localhost:3000/**`
   (dev) e depois o domínio de produção — é pra onde o `/auth/callback`
   deste projeto redireciona depois do login.
6. **Rode o schema:** copie o conteúdo de `supabase/schema.sql` e execute
   no `SQL Editor` do dashboard do Supabase (cria a tabela `profiles` com
   RLS).
7. **Preencha o `.env.local`** (copie de `.env.local.example`) com a
   Project URL e a chave `anon public`, achadas em
   `Project Settings → API`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
   ```

8. Rode `npm run dev`, clique em "Entrar com Google" no header e teste o
   fluxo. Primeiro login sem perfil ainda cadastrado → redireciona
   automaticamente pra `/perfil/completar`.

## Configuração

- **E-mail de sugestões**: a rota `/sugerir` abre um `mailto:` para o
  endereço em `NEXT_PUBLIC_SUGGESTION_EMAIL` (fallback:
  `curadoria@somoscria.com.br`, em `lib/constants.ts`). Defina a variável de
  ambiente com o e-mail oficial do projeto antes de publicar — crie um
  `.env.local`:

  ```
  NEXT_PUBLIC_SUGGESTION_EMAIL=seu-email@dominio.com
  ```

## Próximos passos sugeridos (fora do escopo deste MVP)

- Substituir a leitura de `data/*.json` por um banco de dados ou por uma
  API/feed de parceria oficial das plataformas — a troca fica isolada em
  `lib/data.ts`. (O login/perfil já usa Supabase; dava pra migrar vagas
  também pra lá se fizer sentido ter curadoria colaborativa direto no banco.)
- Validar logos/marcas das plataformas de origem antes de usá-las
  visualmente (hoje o projeto só usa texto, ex.: "via Sympla").
- Persistir as sugestões enviadas por `/sugerir` em vez de depender só de
  `mailto:` (ex.: rota de API + planilha/banco).
- Usar o `years_experience` do perfil pra de fato destacar/ordenar vagas
  compatíveis com a senioridade de quem está logado (hoje o dado é
  coletado mas ainda não influencia o que aparece na home).
- Página de editar perfil (hoje só existe o formulário de criação inicial
  em `/perfil/completar`).
