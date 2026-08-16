import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthButton";

const NAV_LINKS = [
  { href: "/", label: "Explorar" },
  { href: "/sugerir", label: "Sugerir evento/curso" },
  { href: "/sobre", label: "Sobre" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            C
          </span>
          <span>Cria</span>
          <span className="hidden text-xs font-normal text-foreground/40 sm:inline">
            BH · SP
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-foreground/80 transition hover:bg-surface-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}
