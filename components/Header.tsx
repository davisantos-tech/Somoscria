"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthButton";
import Logo from "./Logo";
import { CITY_DOT_CLASS } from "@/lib/constants";

// 3 pilares como itens de navegação de primeira classe — a ideia é que a
// pessoa navegue pela plataforma (cada pilar é uma página de verdade),
// não que a home resuma tudo numa tela só.
const NAV_LINKS = [
  { href: "/vagas", label: "Vagas" },
  { href: "/eventos", label: "Eventos" },
  { href: "/cursos", label: "Cursos" },
  { href: "/sugerir", label: "Sugerir" },
  { href: "/sobre", label: "Sobre" },
];

// Cada cidade tem sua cor, como na prancha de marca — reforça "cidade como
// camada" sem virar marca separada (mesmo logo, mesmo produto).
const ACTIVE_CITIES = [
  { label: "BH", dotClass: CITY_DOT_CLASS["belo-horizonte"] },
  { label: "SP", dotClass: CITY_DOT_CLASS["sao-paulo"] },
];

export default function Header() {
  const pathname = usePathname();

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
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 transition hover:bg-surface-muted hover:text-foreground ${
                  active ? "bg-surface-muted font-medium text-foreground" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}
