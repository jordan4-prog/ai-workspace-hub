"use client";

import { Clock, LayoutDashboard, Sparkles, Star, Grid3x3, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CategoryIcon } from "@/components/category-icon";
import { CATEGORIES } from "@/data/categories";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/lib/workspace-context";

const PRIMARY_NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/favorites", label: "Favoritos", icon: Star },
  { href: "/recents", label: "Recientes", icon: Clock },
  { href: "/tools", label: "Todas las Herramientas", icon: Grid3x3 },
] as const;

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { favorites, ready } = useWorkspace();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-bg-subtle">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
          <Sparkles className="h-4 w-4" aria-hidden />
        </span>
        <span className="text-sm font-semibold tracking-tight text-fg">
          AI Workspace Hub
        </span>
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
                {href === "/favorites" && ready && favorites.length > 0 && (
                  <span className="rounded-md bg-bg-muted px-1.5 py-0.5 text-xs text-fg-muted">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <p className="px-3 pb-2 pt-6 text-xs font-medium uppercase tracking-wider text-fg-subtle">
          Categorías
        </p>
        <ul className="space-y-1">
          {CATEGORIES.map((category) => {
            const href = `/category/${category.id}`;
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
