import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Somos Cria: entenda como a gente cura eventos e cursos de BH e SP e por que sempre te levamos direto pra fonte oficial.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Somos Cria</h1>

      <div className="mt-6 space-y-5 text-foreground/80">
        <p>
          A Cria existe pra você achar o evento ou curso certo sem precisar
          garimpar em dez lugares diferentes. Começamos em Belo Horizonte e
          São Paulo, reunindo num só lugar o que anda espalhado por
          plataformas como Sympla, Luma, Eventbrite, Hotmart, Coursera e
          outras — organizado por área: tecnologia, saúde, negócios,
          marketing, design, finanças, educação e mais.
        </p>

        <p>
          <strong>A gente não substitui essas plataformas — leva você até
          elas.</strong> Cada card mostra só o essencial: nome, data,
          horário, local ou modalidade, área e de onde veio a informação,
          com um resumo curto escrito por nós. O botão principal sempre abre
          a página oficial, em outra aba, e é lá que a inscrição ou compra
          de fato acontece.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
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
            Nunca processamos inscrição ou pagamento aqui dentro — isso
            acontece inteiro na plataforma de origem.
          </li>
          <li>
            Não guardamos dado pessoal de quem participa ou organiza —
            só o essencial público do evento ou curso em si.
          </li>
          <li>
            Por enquanto, quem escolhe o que entra é gente de verdade — nada
            de raspagem automática de outras plataformas.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground">
          Sem vínculo oficial
        </h2>
        <p>
          A Cria não tem vínculo oficial com Sympla, Luma, Eventbrite,
          Hotmart, Coursera, HubSpot Academy ou qualquer outra plataforma
          listada aqui, a menos que a gente feche uma parceria formal no
          futuro. As marcas citadas pertencem aos seus respectivos donos.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Curadoria com a comunidade
        </h2>
        <p>
          Achou um evento ou curso bom que devia estar aqui? Manda pra
          gente na página{" "}
          <a href="/sugerir" className="text-brand hover:underline">
            Sugerir evento/curso
          </a>
          . É assim que a Cria cresce: com quem tá na comunidade ajudando a
          gente a achar o que vale a pena.
        </p>
      </div>
    </div>
  );
}
