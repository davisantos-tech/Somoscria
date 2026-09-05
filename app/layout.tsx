import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// Fonte de corpo/UI da identidade da Cria (a outra opção do moodboard,
// Sora, fica pra uso pontual se algum dia precisarmos de uma segunda voz
// tipográfica — por ora, uma fonte de corpo só, mais simples de manter).
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

// Clash Display (títulos) não está no Google Fonts — é da Fontshare.
// Carregado via <link> abaixo (perto do <Header />) em vez de next/font,
// que só suporta Google Fonts e fontes locais.
const CLASH_DISPLAY_URL =
  "https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap";

export const metadata: Metadata = {
  title: {
    default: "Cria — eventos e cursos de BH e SP, feitos pela comunidade",
    template: "%s · Cria",
  },
  description:
    "Somos Cria. Eventos e cursos de tecnologia e empreendedorismo (e também saúde, negócios, marketing, design e mais) em Belo Horizonte e São Paulo, achados pela comunidade. Cada card leva direto pra fonte oficial pra você garantir sua vaga.",
};

// Evita o "flash" de tema errado: decide a classe .dark antes da hidratação,
// com base na preferência salva (localStorage) ou no tema do sistema.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("hub-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Clash Display via Fontshare — display=swap já vai na query string da URL */}
        <link rel="stylesheet" href={CLASH_DISPLAY_URL} />
      </head>
      <body className="flex min-h-full flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
