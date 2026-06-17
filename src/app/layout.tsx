import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const SITE_URL = "https://getaitoolshub.com";
const TITLE = "AI Tools Hub — Todas tus herramientas de IA en un solo lugar";
const DESCRIPTION =
  "Un único espacio para acceder, organizar y abrir las mejores herramientas de inteligencia artificial. Rápido, minimalista y gratis.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "herramientas de IA",
    "inteligencia artificial",
    "directorio IA",
    "ChatGPT",
    "Claude",
    "workspace IA",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "AI Tools Hub",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
