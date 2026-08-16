import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-foreground/70 sm:px-6">
        <p className="text-base font-semibold text-foreground">Somos Cria.</p>
        <p className="mt-2 max-w-2xl">
          Achamos os eventos e cursos bons de BH e SP pra você não precisar
          garimpar. A gente não vende ingresso, não cobra taxa — só te leva
          direto pra fonte oficial pra você garantir sua vaga.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/sobre" className="hover:text-foreground hover:underline">
            Sobre a Cria
          </Link>
          <Link href="/sugerir" className="hover:text-foreground hover:underline">
            Sugerir evento/curso
          </Link>
        </div>
        <p className="mt-4 text-xs text-foreground/50">
          Sympla, Luma, Eventbrite, Hotmart, Coursera e demais marcas
          citadas pertencem aos seus respectivos donos. A Cria não tem
          vínculo oficial com essas plataformas.
        </p>
      </div>
    </footer>
  );
}
