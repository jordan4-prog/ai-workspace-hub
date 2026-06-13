import Link from "next/link";

import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-5xl font-semibold text-fg">404</p>
      <p className="mt-3 text-fg-muted">No encontramos lo que buscabas.</p>
      <div className="mt-6 flex gap-3">
        <Link
          href={routes.home}
          className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg-muted hover:border-border-strong hover:text-fg"
        >
          Inicio
        </Link>
        <Link
          href={routes.dashboard}
          className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
        >
          Abrir workspace
        </Link>
      </div>
    </div>
  );
}
