"use client";

import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Fecha o menu mobile sempre que a rota muda — sem isso, ele ficaria
  // aberto por cima da próxima página. Ajuste de estado durante a
  // renderização (não em efeito, e sem ref — só useState mesmo, que é o
  // padrão do próprio React pra "resetar estado quando uma prop muda")
  // pra não disparar um render em cascata.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="logo-glow inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
            <span className="font-display text-lg font-bold">C</span>
          </span>
          <Logo className="text-xl" />
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

        {/* Nav de verdade só a partir de md — antes disso não cabe (era o
            que cortava "Sugerir" fora da tela no celular). */}
        <nav className="hidden items-center gap-1 text-sm md:flex md:gap-2">
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

        {/* Abaixo de md: tema + login continuam visíveis, o resto vai pro
            menu hambúrguer. */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <AuthButton />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-brand hover:text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Painel do menu mobile — só existe no DOM abaixo de md (via classe
          no wrapper), some/aparece por altura+opacidade animadas em CSS. */}
      <nav
        className={`grid overflow-hidden border-t border-border transition-[grid-template-rows] duration-200 ease-out md:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-3 py-2.5 text-sm transition hover:bg-surface-muted hover:text-foreground ${
                    active ? "bg-surface-muted font-medium text-foreground" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Fio de LED correndo nas cores da marca — o "chamativo" do header. */}
      <div className="header-led h-[2px] w-full" aria-hidden="true" />
    </header>
  );
}
