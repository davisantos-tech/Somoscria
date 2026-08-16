import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cria — eventos e cursos de BH e SP, feitos pela comunidade",
    template: "%s · Cria",
  },
  description:
    "Somos Cria. Eventos e cursos de tecnologia, saúde, negócios, marketing, design e mais em Belo Horizonte e São Paulo, achados pela comunidade. Cada card leva direto pra fonte oficial pra você garantir sua vaga.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
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
