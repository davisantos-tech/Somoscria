import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Somos Cria: entenda o que a gente faz, como funciona a curadoria de vagas, eventos e cursos, e por que sempre te levamos direto pra fonte oficial.",
};

const PILLARS = [
  {
    icon: "🎟️",
    title: "Eventos",
    chipClass: "bg-brand/15 text-brand",
    description:
      "Conferências, meetups, encontros presenciais e online — em tecnologia, saúde, negócios, marketing, design, finanças, educação e mais.",
  },
  {
    icon: "🎓",
    title: "Cursos",
    chipClass: "bg-brand-yellow/25 text-brand-yellow-foreground",
    description:
      "Trilhas gratuitas e pagas das melhores plataformas — freeCodeCamp, HubSpot Academy, AWS, Harvard, Khan Academy e outras.",
  },
  {
    icon: "💼",
    title: "Vagas",
    chipClass: "bg-brand-green/15 text-brand-green",
    description:
      "Oportunidades reais, direto na fonte oficial da empresa — sem vaga fantasma, sem taxa de intermediário. Pilar ainda em construção.",
  },
];

const TRAITS = [
  { icon: "👥", label: "Comunitário", text: "Acredita nas pessoas e nas conexões." },
  { icon: "🙂", label: "Acessível", text: "Fala a língua de todo mundo, sem complicação." },
  { icon: "⭐", label: "Curioso", text: "Está sempre procurando algo novo pra você." },
  { icon: "❤️", label: "Otimista", text: "Vê oportunidade em todo lugar." },
  { icon: "📣", label: "Direto", text: "Comunica o essencial e te leva pro próximo passo." },
];

const PIPELINE = [
  {
    step: "1",
    title: "A comunidade indica",
    text: "Qualquer pessoa manda uma vaga, evento ou curso pela página Sugerir. É a fonte mais direta que existe.",
  },
  {
    step: "2",
    title: "A gente garimpa",
    text: "Também vasculhamos, com ajuda de automação, páginas públicas de plataformas como Sympla, Luma e Eventbrite atrás de coisa boa que ainda não estava aqui.",
  },
  {
    step: "3",
    title: "Um humano revisa",
    text: "Toda sugestão — vinda da comunidade ou encontrada pela automação — passa por uma pessoa de verdade antes de ir pro ar. Nenhum robô publica nada sozinho.",
  },
  {
    step: "4",
    title: "Você recebe só o essencial",
    text: "Nome, data, local ou modalidade, área e um resumo curto escrito por nós — com o link que leva direto pra fonte oficial.",
  },
];

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <span className="inline-flex items-center rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
        👋 De onde viemos
      </span>
      <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Somos Cria
      </h1>
      <p className="mt-3 text-lg text-foreground/70">
        Cria é o lugar que reúne vagas, eventos e cursos gratuitos num só
        lugar e te conecta com o que pode transformar seu caminho.
      </p>

      <div className="mt-10 space-y-6 text-foreground/80">
        <p>
          “Cria” é como a gente se chama por aqui — quem é da comunidade,
          quem é daqui, quem cresceu junto. A ideia nasceu de um problema bem
          simples de resolver e bem chato de viver: oportunidade boa —
          aquele evento que vale a pena, aquele curso gratuito de verdade,
          aquela vaga que não é fantasma — sempre existiu. O problema nunca
          foi falta de oportunidade, foi ela estar espalhada: um grupo de
          WhatsApp aqui, um story que passou rápido, uma plataforma que
          ninguém usa. A Cria existe pra juntar tudo isso num lugar só,
          organizado por área, sem você precisar garimpar em dez lugares
          diferentes.
        </p>
        <p>
          Começamos em Belo Horizonte e São Paulo. Não por acaso: são as
          cidades onde a gente vive, erra, aprende e testa a ideia com gente
          de verdade antes de pensar em crescer pra qualquer outro lugar.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">
          Os 3 pilares
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-lg ${p.chipClass}`}
                aria-hidden="true"
              >
                {p.icon}
              </span>
              <h3 className="mt-2 font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-1 text-sm text-foreground/70">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-xl font-semibold text-foreground">
          Uma vitrine, não um substituto
        </h2>
        <p>
          <strong>
            A gente não substitui essas plataformas — leva você até elas.
          </strong>{" "}
          Cada card mostra só o essencial: nome, data, horário, local ou
          modalidade, área e de onde veio a informação, com um resumo curto
          escrito por nós. O botão principal sempre abre a página oficial,
          em outra aba, e é lá que a inscrição, compra ou candidatura de
          fato acontece. A Cria nunca processa pagamento, inscrição ou
          candidatura dentro da própria plataforma.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">
          Como a curadoria funciona, passo a passo
        </h2>
        <p>
          Aqui vai o processo de ponta a ponta, sem mistério — porque
          “curadoria de verdade” só tem valor se a gente te mostra como ela
          é feita:
        </p>
        <ol className="space-y-4">
          {PIPELINE.map((p) => (
            <li key={p.step} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
                {p.step}
              </span>
              <div>
                <p className="font-semibold text-foreground">{p.title}</p>
                <p className="mt-0.5 text-sm text-foreground/70">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p>
          A automação ajuda a encontrar candidatos mais rápido — nunca a
          decidir o que vai pro ar. Quem decide é sempre gente de verdade,
          da própria comunidade.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">
          Por que fazer login
        </h2>
        <p>
          Você vê uma prévia de vagas, eventos e cursos sem precisar de
          conta. Pra ver a lista completa e ganhar uma experiência mais
          direcionada — menos filtro na mão, mais vaga e evento do seu
          momento aparecendo primeiro — entra com sua conta Google e
          completa o perfil (nome, cidade, momento de carreira). Leva menos
          de um minuto, e os dados do seu perfil são seus: protegidos e
          visíveis só pra você.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">
          Uma cidade de cada vez
        </h2>
        <p>
          A Cria é uma marca só — nunca um app diferente por cidade. Hoje
          cobrimos Belo Horizonte e São Paulo lado a lado; conforme a
          comunidade cresce, novas cidades entram como mais uma camada
          dentro do mesmo produto, do mesmo jeito. “Cria BH”, “Cria SP” são
          a mesma Cria, só filtrada por onde você está. A cidade nunca vira
          uma marca separada — é sempre a Cria, com mais gente dentro.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">
          O que a gente faz — e o que não faz
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Não copiamos descrição completa, imagem em alta resolução nem
            texto de quem organiza — só um resumo nosso, curto.
          </li>
          <li>
            Sempre mostramos a fonte original com link pra página oficial.
          </li>
          <li>
            Nunca processamos inscrição, pagamento ou candidatura aqui
            dentro — isso acontece inteiro na plataforma de origem.
          </li>
          <li>
            Não guardamos dado pessoal de quem participa ou organiza um
            evento/curso/vaga — só o essencial público da oportunidade em
            si. (Diferente do seu próprio perfil na Cria, que é dado seu,
            guardado com o seu consentimento.)
          </li>
          <li>
            Quem decide o que entra no ar é sempre gente de verdade —
            mesmo quando automação ajuda a encontrar candidatos, ninguém
            publica nada sem revisão humana antes.
          </li>
          <li>Nunca inventamos vaga, evento ou curso. Se está aqui, é real.</li>
        </ul>

        <h2 className="font-display text-xl font-semibold text-foreground">
          Sem vínculo oficial
        </h2>
        <p>
          A Cria não tem vínculo oficial com Sympla, Luma, Eventbrite,
          Hotmart, Coursera, HubSpot Academy ou qualquer outra plataforma
          listada aqui, a menos que a gente feche uma parceria formal no
          futuro. As marcas citadas pertencem aos seus respectivos donos.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">
          Curadoria com a comunidade
        </h2>
        <p>
          Achou uma vaga, evento ou curso bom que devia estar aqui? Manda
          pra gente na página{" "}
          <Link href="/sugerir" className="text-brand hover:underline">
            Sugerir evento/curso
          </Link>
          . É assim que a Cria cresce: com quem tá na comunidade ajudando a
          gente a achar o que vale a pena.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">
          Pra onde a gente quer ir
        </h2>
        <p>
          Hoje a Cria é uma vitrine: um jeito rápido e honesto de achar
          oportunidade boa. A visão de longo prazo é ir além disso — virar
          um espaço onde a própria comunidade se encontra, não só encontra
          oportunidade. Isso é coisa pra mais pra frente, construída com
          cuidado (principalmente com o que é dado seu e o que continua
          privado). Por enquanto, o compromisso é simples: fazer bem feito o
          que já existe, sem pressa de virar outra coisa antes da hora.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">
          Como a gente é
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {TRAITS.map((t) => (
            <div key={t.label} className="text-center">
              <span className="text-2xl" aria-hidden="true">
                {t.icon}
              </span>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {t.label}
              </p>
              <p className="mt-0.5 text-xs text-foreground/60">{t.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6 text-center">
          <p className="font-display text-lg font-semibold text-foreground">
            A Cria não é feita pra uma comunidade. É feita com várias — a
            comunidade das comunidades.
          </p>
          <p className="mt-2 text-sm text-foreground/70">
            Cada vaga, evento e curso aqui passou pela mão de alguém que faz
            parte disso. Se você também faz, bem-vindo(a) — somos Cria.
          </p>
        </div>
      </div>
    </div>
  );
}
