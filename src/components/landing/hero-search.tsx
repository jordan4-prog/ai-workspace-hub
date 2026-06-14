"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { ToolLogo } from "@/components/tool-logo";
import { getCategoryLabel } from "@/data/categories";
import { searchTools } from "@/data/tools";
import { routes } from "@/lib/routes";

// Chips de acceso rápido. Coinciden con tags/categorías reales del catálogo.
const CHIPS = ["chat", "imagen", "video", "código", "audio", "agente"];
// Términos que rotan en el placeholder cuando el campo está vacío.
const PLACEHOLDERS = ["chat", "imagen", "vídeo", "código", "música", "agente"];

const MAX_RESULTS = 6;

/**
 * Buscador interactivo del hero: filtra el catálogo en vivo y muestra
 * resultados con logo, sin salir de la landing. Estética command-palette.
 */
export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [phIndex, setPhIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () => (query.trim() ? searchTools(query).slice(0, MAX_RESULTS) : []),
    [query],
  );

  // Rota el placeholder mientras el campo está vacío.
  useEffect(() => {
    if (query) return;
    const id = setInterval(
      () => setPhIndex((i) => (i + 1) % PLACEHOLDERS.length),
      2200,
    );
    return () => clearInterval(id);
  }, [query]);

  // Cierra el panel al hacer clic fuera.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const open = focused && query.trim().length > 0;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-xl text-left"
    >
      {/* Campo de búsqueda */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 shadow-lg shadow-black/20 backdrop-blur transition-colors focus-within:border-[#7C3AED]/70">
        <Search className="h-5 w-5 shrink-0 text-fg-subtle" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={`Prueba a buscar: ${PLACEHOLDERS[phIndex]}…`}
          className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle sm:text-base"
          aria-label="Buscar herramientas de IA"
        />
        <kbd className="hidden items-center gap-1 rounded-md border border-white/15 px-1.5 py-0.5 text-[10px] text-fg-subtle sm:flex">
          <CornerDownLeft className="h-3 w-3" aria-hidden />
        </kbd>
      </div>

      {/* Chips de acceso rápido */}
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => {
              setQuery(chip);
              setFocused(true);
            }}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-fg-muted transition-colors hover:border-white/25 hover:text-fg"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Panel de resultados */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-bg-muted/95 shadow-2xl backdrop-blur"
          >
            {results.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-fg-muted">
                Sin resultados para «{query}».
              </p>
            ) : (
              <ul className="py-1">
                {results.map((tool, i) => (
                  <motion.li
                    key={tool.slug}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.18 }}
                  >
                    <Link
                      href={routes.tool(tool.slug)}
                      className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-bg-base"
                    >
                      <ToolLogo tool={tool} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-fg">
                          {tool.name}
                        </span>
                        <span className="block truncate text-xs text-fg-subtle">
                          {getCategoryLabel(tool.categories[0])}
                        </span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
                <li className="border-t border-border">
                  <Link
                    href={routes.tools}
                    className="block px-3 py-2.5 text-center text-xs text-fg-muted transition-colors hover:text-fg"
                  >
                    Ver todas las herramientas →
                  </Link>
                </li>
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
