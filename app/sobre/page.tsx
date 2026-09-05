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
      "Oportunidades reais, direto na fonte oficial da empresa — sem vaga fantasma, sem taxa de intermediário.",
  },
];

const TRAITS = [
  { icon: "👥", label: "Comunitário", text: "Acredita nas pessoas e nas conexões." },
  { icon: "🙂", label: "Acessível", text: "Fala a língua de todo mundo, sem complicação." },
  { icon: "⭐", label: "Curioso", text: "Está sempre procurando algo novo pra você." },
  { icon: "❤️", label: "Otimista", text: "Vê oportunidade em todo lugar." },
  { icon: "📣", label: "Direto", text: "Comunica o essencial e te leva pro próximo passo." },
];

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Somos Cria
      </h1>
      <p className="mt-3 text-lg text-foreground/70">
        Cria é o lugar que reúne vagas, eventos e cursos gratuitos num só
        lugar e te conecta com o que pode transformar seu caminho.
      </p>

      <div className="mt-10 space-y-6 text-foreground/80">
        <p>
          A Cria existe pra você achar a vaga, o evento ou o curso certo sem
          precisar garimpar em dez lugares diferentes. Começamos em Belo
          Horizonte e São Paulo, reunindo num só lugar o que anda espalhado
          por plataformas como Sympla, Luma, Eventbrite, Hotmart, Coursera e
          outras — organizado por área.
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
          fato acontece.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">
          Por que fazer login
        </h2>
        <p>
          Navegar na Cria é livre — sem login, sem cadastro. Mas quem entra
          com a conta Google e completa o perfil (nome, cidade, momento de
          carreira) ganha uma experiência mais direcionada: menos filtro na
          mão, mais vaga e evento do seu momento aparecendo primeiro. É
          opcional, mas economiza seu tempo.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">
          Uma cidade de cada vez
        </h2>
        <p>
          A Cria é uma marca só — nunca um app diferente por cidade. Hoje
          cobrimos Belo Horizonte e São Paulo lado a lado; conforme a
          comunidade cresce, novas cidades entram como mais uma camada
          dentro do mesmo produto, do mesmo jeito. “Cria BH”, “Cria SP” são
          a mesma Cria, só filtrada por onde você está.
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
      </div>
    </div>
  );
}
