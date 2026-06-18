import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { routes } from "@/lib/routes";

/** Layout público del blog: cabecera y pie propios, fuera del workspace. */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-base">
      <header className="sticky top-0 z-30 border-b border-border bg-bg-base/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href={routes.home} className="flex items-center gap-2">
            <BrandMark className="h-8 w-8 text-accent" />
            <span className="text-sm font-semibold tracking-tight text-fg">
              AI Tools Hub
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={routes.blog}
              className="hidden rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg sm:inline"
            >
              Blog
            </Link>
            <Link
              href={routes.dashboard}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg-base transition-colors hover:bg-accent-hover"
            >
              Abrir app
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-fg-subtle sm:px-6">
          © 2026 AI Tools Hub ·{" "}
          <Link href={routes.home} className="transition-colors hover:text-fg">
            Inicio
          </Link>{" "}
          ·{" "}
          <Link href={routes.tools} className="transition-colors hover:text-fg">
            Herramientas
          </Link>
        </div>
      </footer>
    </div>
  );
}
