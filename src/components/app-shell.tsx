"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { GlobalSearch } from "@/components/global-search";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

/**
 * Estructura principal de la app (sidebar + header + contenido).
 *
 * Responsive:
 * - Escritorio (md+): sidebar fija a la izquierda, como siempre.
 * - Móvil: sidebar oculta; se abre como drawer deslizante con botón
 *   hamburguesa. Se cierra al tocar el overlay, la X, o al navegar.
 *
 * Es un componente cliente porque gestiona el estado abierto/cerrado, pero
 * recibe `children` (las páginas, renderizadas en servidor) por prop.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar el drawer al cambiar de ruta.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fija (solo escritorio) */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Overlay del drawer (solo móvil) */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Drawer deslizante (solo móvil) */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {/* Columna principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-fg-muted hover:bg-bg-muted hover:text-fg md:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
          <GlobalSearch />
        </header>
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
