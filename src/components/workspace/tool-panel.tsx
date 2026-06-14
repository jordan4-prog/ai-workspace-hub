"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, Minimize2, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FavoriteButton } from "@/components/favorite-button";
import { OpenToolButton } from "@/components/open-tool-button";
import { ToolLogo } from "@/components/tool-logo";
import { CollectionPicker } from "@/components/workspace/collection-picker";
import { getCategoryLabel } from "@/data/categories";
import {
  getPricing,
  PRICING_BADGE_CLASS,
  PRICING_LABEL,
  type Pricing,
} from "@/data/pricing";
import { getToolBySlug, searchTools, TOOLS } from "@/data/tools";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const PRICING_DESC: Record<Pricing, string> = {
  free: "Gratis / open-source. Su uso principal no tiene coste.",
  freemium: "Capa gratuita con límites, más planes de pago para desbloquear todo.",
  paid: "De pago: sin una capa gratuita útil (a veces prueba o demo).",
};

/**
 * Panel lateral con PESTAÑAS (estilo navegador): cada herramienta abierta es
 * una pestaña. Persistencia por URL (?toolId = pestaña activa); la lista de
 * pestañas vive en estado de sesión. Modo sidebar (30%) ↔ expandido (90%) en
 * escritorio; fullscreen en móvil. Montado en el layout de /app (con Suspense).
 */
export function ToolPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();

  const slug = searchParams.get("toolId");
  const activeTool = slug ? getToolBySlug(slug) : undefined;
  const open = Boolean(activeTool);

  const [tabs, setTabs] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Sincroniza las pestañas con la URL: añade la activa; si no hay activa
  // (panel cerrado) limpia todo.
  useEffect(() => {
    if (!slug || !getToolBySlug(slug)) {
      setTabs([]);
      return;
    }
    setTabs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, [slug]);

  const goTo = useCallback(
    (s: string) => router.replace(`${pathname}?toolId=${s}`, { scroll: false }),
    [router, pathname],
  );
  const close = useCallback(
    () => router.replace(pathname, { scroll: false }),
    [router, pathname],
  );

  const closeTab = useCallback(
    (s: string) => {
      const idx = tabs.indexOf(s);
      const next = tabs.filter((x) => x !== s);
      setTabs(next);
      if (s === slug) {
        const neighbor = next[idx] ?? next[idx - 1] ?? null;
        if (neighbor) goTo(neighbor);
        else close();
      }
    },
    [tabs, slug, goTo, close],
  );

  // Teclado: Esc cierra; ←/→ cambian de pestaña.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (pickerOpen) setPickerOpen(false);
        else close();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const i = tabs.indexOf(slug ?? "");
        const target =
          e.key === "ArrowLeft" ? tabs[i - 1] : tabs[i + 1];
        if (target) goTo(target);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, goTo, tabs, slug, pickerOpen]);

  // Bloquea el scroll del fondo mientras el panel está abierto.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pricing = activeTool ? getPricing(activeTool.slug) : "freemium";
  const related = useMemo(
    () =>
      activeTool
        ? TOOLS.filter(
            (t) =>
              t.slug !== activeTool.slug &&
              t.categories.some((c) => activeTool.categories.includes(c)),
          ).slice(0, 5)
        : [],
    [activeTool],
  );

  return (
    <AnimatePresence>
      {open && activeTool && (
        <>
          {/* Backdrop con blur (desenfoca ligeramente el grid del fondo) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <motion.aside
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={activeTool.name}
            className={cn(
              "fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-border bg-bg-base shadow-2xl transition-[width,max-width] duration-300 ease-out",
              expanded ? "lg:w-[90%]" : "lg:w-[30%] lg:min-w-[420px]",
            )}
          >
            {/* Barra de pestañas */}
            <div className="flex items-center gap-1 border-b border-border px-2 py-2">
              <div className="flex flex-1 items-center gap-1 overflow-x-auto">
                {tabs.map((s) => {
                  const t = getToolBySlug(s);
                  if (!t) return null;
                  const isActive = s === slug;
                  return (
                    <div
                      key={s}
                      role="button"
                      tabIndex={0}
                      onClick={() => goTo(s)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          goTo(s);
                        }
                      }}
                      className={cn(
                        "group flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs transition-colors",
                        isActive
                          ? "bg-accent text-bg-base"
                          : "text-fg-muted hover:bg-bg-subtle hover:text-fg",
                      )}
                    >
                      <ToolLogo tool={t} size="xs" />
                      <span className="max-w-[120px] truncate font-medium">
                        {t.name}
                      </span>
                      <button
                        type="button"
                        aria-label={`Cerrar ${t.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          closeTab(s);
                        }}
                        className={cn(
                          "rounded p-0.5 transition-colors",
                          isActive
                            ? "hover:bg-black/20"
                            : "opacity-50 hover:bg-bg-muted hover:opacity-100",
                        )}
                      >
                        <X className="h-3 w-3" aria-hidden />
                      </button>
                    </div>
                  );
                })}

                {/* Botón + (selector rápido) */}
                <QuickPicker
                  open={pickerOpen}
                  setOpen={setPickerOpen}
                  onPick={(s) => {
                    goTo(s);
                    setPickerOpen(false);
                  }}
                  exclude={tabs}
                />
              </div>

              {/* Controles a la derecha */}
              <div className="flex shrink-0 items-center gap-0.5 pl-1">
                <IconBtn
                  label={expanded ? "Contraer" : "Expandir"}
                  onClick={() => setExpanded((e) => !e)}
                  className="hidden lg:inline-flex"
                >
                  {expanded ? (
                    <Minimize2 className="h-4 w-4" aria-hidden />
                  ) : (
                    <Maximize2 className="h-4 w-4" aria-hidden />
                  )}
                </IconBtn>
                <IconBtn label="Cerrar panel (Esc)" onClick={close}>
                  <X className="h-4 w-4" aria-hidden />
                </IconBtn>
              </div>
            </div>

            {/* Contenido (cross-fade al cambiar de pestaña) */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTool.slug}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="mx-auto max-w-2xl p-6 sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <ToolLogo tool={activeTool} size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
                          {activeTool.name}
                        </h2>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                            PRICING_BADGE_CLASS[pricing],
                          )}
                        >
                          {PRICING_LABEL[pricing]}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {activeTool.categories.map((c) => (
                          <Link
                            key={c}
                            href={routes.category(c)}
                            onClick={close}
                            className="rounded-md bg-bg-muted px-2 py-1 text-xs text-fg-muted transition-colors hover:text-fg"
                          >
                            {getCategoryLabel(c)}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <FavoriteButton slug={activeTool.slug} />
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <OpenToolButton tool={activeTool} variant="primary" />
                    <CollectionPicker slug={activeTool.slug} />
                  </div>

                  {/* Descripción */}
                  <Section title="Descripción">
                    <p className="text-fg-muted">{activeTool.description}</p>
                  </Section>

                  {/* Características (derivadas de los tags reales) */}
                  {activeTool.tags.length > 0 && (
                    <Section title="Características">
                      <div className="flex flex-wrap gap-2">
                        {activeTool.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border px-2.5 py-1 text-xs text-fg-subtle"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </Section>
                  )}

                  {/* Precio (modelo real) */}
                  <Section title="Precio">
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-subtle p-4">
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          PRICING_BADGE_CLASS[pricing],
                        )}
                      >
                        {PRICING_LABEL[pricing]}
                      </span>
                      <p className="text-sm text-fg-muted">
                        {PRICING_DESC[pricing]}
                      </p>
                    </div>
                  </Section>

                  {/* Relacionadas → abren como nueva pestaña */}
                  {related.length > 0 && (
                    <Section title="Relacionadas">
                      <div className="space-y-1">
                        {related.map((rt) => (
                          <button
                            key={rt.slug}
                            type="button"
                            onClick={() => goTo(rt.slug)}
                            className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-bg-subtle"
                          >
                            <ToolLogo tool={rt} size="sm" />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm text-fg">
                                {rt.name}
                              </span>
                              <span className="block truncate text-xs text-fg-subtle">
                                {getCategoryLabel(rt.categories[0])}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </Section>
                  )}

                  <div className="mt-8">
                    <Link
                      href={routes.tool(activeTool.slug)}
                      onClick={close}
                      className="text-sm text-fg-subtle transition-colors hover:text-fg"
                    >
                      Ver ficha completa →
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
        {title}
      </h3>
      {children}
    </div>
  );
}

function IconBtn({
  label,
  onClick,
  disabled,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-30",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Botón "+" con un selector rápido de herramientas (búsqueda en vivo). */
function QuickPicker({
  open,
  setOpen,
  onPick,
  exclude,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onPick: (slug: string) => void;
  exclude: string[];
}) {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, setOpen]);

  const results = useMemo(
    () => searchTools(query).filter((t) => !exclude.includes(t.slug)).slice(0, 8),
    [query, exclude],
  );

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-label="Abrir otra herramienta"
        onClick={() => setOpen(!open)}
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl border border-border bg-bg-muted shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="h-4 w-4 text-fg-subtle" aria-hidden />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Añadir herramienta..."
              className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
              aria-label="Buscar herramienta para añadir"
            />
          </div>
          <ul className="max-h-72 overflow-y-auto py-1">
            {results.length === 0 ? (
              <li className="px-3 py-4 text-center text-sm text-fg-subtle">
                Sin resultados
              </li>
            ) : (
              results.map((t) => (
                <li key={t.slug}>
                  <button
                    type="button"
                    onClick={() => onPick(t.slug)}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-bg-base"
                  >
                    <ToolLogo tool={t} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-fg">
                        {t.name}
                      </span>
                      <span className="block truncate text-xs text-fg-subtle">
                        {getCategoryLabel(t.categories[0])}
                      </span>
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
