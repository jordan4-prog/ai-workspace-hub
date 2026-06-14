"use client";

import { Check, FolderPlus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useCollections } from "@/lib/collections-context";
import { cn } from "@/lib/utils";

/**
 * Botón "Guardar en colección" con un popover para marcar/desmarcar la
 * herramienta en cada colección y crear una nueva al vuelo. Solo se muestra
 * con sesión iniciada (las colecciones son de cuenta).
 */
export function CollectionPicker({ slug }: { slug: string }) {
  const {
    collections,
    enabled,
    addTool,
    removeTool,
    createCollection,
  } = useCollections();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!enabled) return null;

  const count = collections.filter((c) => c.slugs.includes(slug)).length;

  const createAndAdd = async () => {
    const value = name.trim();
    setName("");
    if (!value) return;
    const id = await createCollection(value);
    if (id) void addTool(id, slug);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
      >
        <FolderPlus className="h-4 w-4" aria-hidden />
        {count > 0
          ? `En ${count} ${count === 1 ? "colección" : "colecciones"}`
          : "Guardar en colección"}
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-bg-muted shadow-2xl">
          <div className="max-h-56 overflow-y-auto py-1">
            {collections.length === 0 && (
              <p className="px-3 py-3 text-center text-xs text-fg-subtle">
                Aún no tienes colecciones. Crea una abajo.
              </p>
            )}
            {collections.map((c) => {
              const inC = c.slugs.includes(slug);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() =>
                    inC ? void removeTool(c.id, slug) : void addTool(c.id, slug)
                  }
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-bg-base"
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                      inC
                        ? "border-accent bg-accent text-bg-base"
                        : "border-border",
                    )}
                  >
                    {inC && <Check className="h-3 w-3" aria-hidden />}
                  </span>
                  <span className="flex-1 truncate text-fg">{c.name}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 border-t border-border px-3 py-2">
            <Plus className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void createAndAdd();
              }}
              placeholder="Nueva colección…"
              className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
              aria-label="Crear nueva colección"
            />
          </div>
        </div>
      )}
    </div>
  );
}
