import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthButton";
import Logo from "./Logo";
import { CITY_DOT_CLASS } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/", label: "Explorar" },
  { href: "/sugerir", label: "Sugerir evento/curso" },
  { href: "/sobre", label: "Sobre" },
];

// Cada cidade tem sua cor, como na prancha de marca — reforça "cidade como
// camada" sem virar marca separada (mesmo logo, mesmo produto).
const ACTIVE_CITIES = [
  { label: "BH", dotClass: CITY_DOT_CLASS["belo-horizonte"] },
  { label: "SP", dotClass: CITY_DOT_CLASS["sao-paulo"] },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            <span className="font-display text-base font-bold">C</span>
          </span>
          <Logo className="text-lg" />
          <span className="hidden items-center gap-1.5 pl-1 sm:flex">
            {ACTIVE_CITIES.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1 text-xs font-medium text-foreground/50"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${c.dotClass}`}
                  aria-hidden="true"
                />
                {c.label}
              </span>
            ))}
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
