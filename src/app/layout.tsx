import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppShell } from "@/components/app-shell";
import { WorkspaceProvider } from "@/lib/workspace-context";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AI Workspace Hub — Todas tus herramientas de IA en un solo lugar",
  description:
    "Un único espacio para acceder, organizar y abrir las mejores herramientas de inteligencia artificial.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`dark ${inter.variable}`}>
      <body className="font-sans">
        <WorkspaceProvider>
          <AppShell>{children}</AppShell>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
