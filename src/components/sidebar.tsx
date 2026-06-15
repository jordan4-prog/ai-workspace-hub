"use client";

import {
  Check,
  Clock,
  FolderPlus,
  Folders,
  Grid3x3,
  LayoutDashboard,
  Send,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { CategoryIcon } from "@/components/category-icon";
import { CATEGORIES } from "@/data/categories";
import { useCollections } from "@/lib/collections-context";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/lib/workspace-context";

const PRIMARY_NAV = [
  { href: routes.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: routes.favorites, label: "Favoritos", icon: Star },
  { href: routes.recents, label: "Recientes", icon: Clock },
  { href: routes.tools, label: "Todas las Herramientas", icon: Grid3x3 },
] as const;

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { favorites, ready } = useWorkspace();

  // El dashboard se resalta solo en su ruta exacta; el resto, por prefijo.
  const isActive = (href: string) =>
    href === routes.dashboard
      ? pathname === routes.dashboard
      : pathname.startsWith(href);

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-bg-subtle">
      <div className="flex items-center gap-2 px-5 py-5">
        <Link href={routes.dashboard} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-bg-base">
            <Sparkles className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-sm font-semibold tracking-tight text-fg">
            AI Workspace Hub
          </span>
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted hover:bg-bg-muted hover:text-fg md:hidden"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <ul className="space-y-1">
          {PRIMARY_NAV.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className={navItemClass(isActive(href))}>
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span className="flex-1 truncate">{label}</span>
                {href === routes.favorites && ready && favorites.length > 0 && (
                  <span className="rounded-md bg-bg-muted px-1.5 py-0.5 text-xs text-fg-muted">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <SidebarCollections />

        <p className="px-3 pb-2 pt-6 text-xs font-medium uppercase tracking-wider text-fg-subtle">
          Categorías
        </p>
        <ul className="space-y-1">
          {CATEGORIES.map((category) => {
            const href = routes.category(category.id);
            return (
              <li key={category.id}>
                <Link href={href} className={navItemClass(isActive(href))}>
                  <CategoryIcon
                    name={category.icon}
                    className="h-4 w-4 shrink-0"
                  />
                  <span className="flex-1 truncate">{category.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href={routes.submit}
          className={cn(
            "mt-6 flex items-center gap-3 rounded-lg border border-dashed border-border px-3 py-2.5 text-sm font-medium transition-colors",
            isActive(routes.submit)
              ? "border-accent/50 bg-accent-soft text-accent"
              : "text-fg-muted hover:border-accent/40 hover:text-accent",
          )}
        >
          <Send className="h-4 w-4 shrink-0" aria-hidden />
          <span className="flex-1 truncate">Enviar herramienta</span>
        </Link>
      </nav>
    </aside>
  );
}

function navItemClass(active: boolean): string {
  return cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
    active
      ? "bg-accent-soft text-fg"
      : "text-fg-muted hover:bg-bg-muted hover:text-fg",
  );
}

/** Sección "Colecciones" (solo con sesión iniciada). */
function SidebarCollections() {
  const pathname = usePathname();
  const router = useRouter();
  const { collections, enabled, createCollection } = useCollections();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  if (!enabled) return null;

  const submit = async () => {
    const value = name.trim();
    setName("");
    setCreating(false);
    if (!value) return;
    const id = await createCollection(value);
    if (id) router.push(routes.collection(id));
  };

  return (
    <>
      <div className="flex items-center justify-between px-3 pb-2 pt-6">
        <p className="text-xs font-medium uppercase tracking-wider text-fg-subtle">
          Colecciones
        </p>
        <button
          type="button"
          onClick={() => setCreating(true)}
          aria-label="Nueva colección"
          className="inline-flex h-5 w-5 items-center justify-center rounded text-fg-subtle transition-colors hover:bg-bg-muted hover:text-fg"
        >
          <FolderPlus className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>

      <ul className="space-y-1">
        {creating && (
          <li className="flex items-center gap-2 px-3 py-1">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={submit}
              onKeyDown={(e) => {
                if (e.key === "Enter") void submit();
                if (e.key === "Escape") {
                  setName("");
                  setCreating(false);
                }
              }}
              placeholder="Nombre…"
              className="w-full rounded-md border border-border bg-bg-base px-2 py-1 text-sm text-fg outline-none focus:border-accent"
            />
            <Check className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
          </li>
        )}
        {collections.length === 0 && !creating && (
          <li className="px-3 py-1 text-xs text-fg-subtle">
            Crea tu primera colección con +
          </li>
        )}
        {collections.map((c) => {
          const href = routes.collection(c.id);
          const active = pathname === href;
          return (
            <li key={c.id}>
              <Link href={href} className={navItemClass(active)}>
                <Folders className="h-4 w-4 shrink-0" aria-hidden />
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-xs text-fg-subtle">{c.slugs.length}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
