"use client";

import { Check, Pencil, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { EmptyState, ToolGrid } from "@/components/tool-grid";
import { resolveTools } from "@/data/tools";
import { useCollections } from "@/lib/collections-context";
import { routes } from "@/lib/routes";

export default function CollectionPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { collections, ready, enabled, renameCollection, deleteCollection } =
    useCollections();

  const collection = collections.find((c) => c.id === params.id);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  if (!enabled) {
    return (
      <EmptyState
        title="Inicia sesión para ver tus colecciones"
        description="Las colecciones se guardan en tu cuenta y se sincronizan entre dispositivos."
      />
    );
  }

  if (!ready) {
    return (
      <div className="h-40 animate-pulse rounded-xl border border-border bg-bg-subtle" />
    );
  }

  if (!collection) {
    return (
      <EmptyState
        title="Colección no encontrada"
        description="Puede que la hayas eliminado o que el enlace no sea válido."
      />
    );
  }

  const tools = resolveTools(collection.slugs);

  const saveName = () => {
    const name = draft.trim();
    if (name) void renameCollection(collection.id, name);
    setEditing(false);
  };

  const handleDelete = () => {
    if (
      window.confirm(`¿Eliminar la colección "${collection.name}"? No se puede deshacer.`)
    ) {
      void deleteCollection(collection.id);
      router.push(routes.dashboard);
    }
  };

  return (
    <>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="min-w-0">
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveName();
                  if (e.key === "Escape") setEditing(false);
                }}
                className="rounded-lg border border-border bg-bg-subtle px-3 py-1.5 text-2xl font-semibold text-fg outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={saveName}
                aria-label="Guardar nombre"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-bg-base hover:bg-accent-hover"
              >
                <Check className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="truncate font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                {collection.name}
              </h1>
              <button
                type="button"
                onClick={() => {
                  setDraft(collection.name);
                  setEditing(true);
                }}
                aria-label="Renombrar colección"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-bg-muted hover:text-fg"
              >
                <Pencil className="h-4 w-4" aria-hidden />
              </button>
            </div>
          )}
          <p className="mt-1 text-sm text-fg-muted">
            {tools.length} {tools.length === 1 ? "herramienta" : "herramientas"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-price-paid/40 hover:text-price-paid"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
          Eliminar
        </button>
      </div>

      {tools.length > 0 ? (
        <ToolGrid tools={tools} />
      ) : (
        <EmptyState
          title="Colección vacía"
          description="Abre cualquier herramienta y pulsa «Guardar en colección» para añadirla aquí."
        />
      )}
    </>
  );
}
