"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { ToolLogo } from "@/components/tool-logo";
import { getCategoryLabel } from "@/data/categories";
import { searchTools } from "@/data/tools";
import { routes } from "@/lib/routes";

const MAX_RESULTS = 6;

/**
 * Buscador global instantáneo. Filtra el catálogo en cliente conforme se
 * escribe. Para decenas de herramientas es inmediato; si el catálogo creciera
 * a miles, se cambiaría por un índice o búsqueda en servidor sin tocar la UI.
 */
export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchTools(query).slice(0, MAX_RESULTS);
  }, [query]);

  // Cerrar al hacer clic fuera.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const showDropdown = open && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-bg-subtle px-3 py-2 focus-within:border-border-strong">
        <Search className="h-4 w-4 text-fg-subtle" aria-hidden />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar herramientas… (p. ej. chat, video)"
          className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
          aria-label="Buscar herramientas"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Limpiar búsqueda"
            className="text-fg-subtle hover:text-fg"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border bg-bg-muted shadow-2xl">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-fg-muted">
              Sin resultados para “{query}”.
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={routes.tool(tool.slug)}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-bg-base"
                  >
                    <ToolLogo tool={tool} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-fg">{tool.name}</p>
                      <p className="truncate text-xs text-fg-subtle">
                        {getCategoryLabel(tool.categories[0])}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
