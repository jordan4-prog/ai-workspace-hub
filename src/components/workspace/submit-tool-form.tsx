"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Plus, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { CATEGORIES } from "@/data/categories";
import { PRICING_LABEL, type Pricing } from "@/data/pricing";
import { searchTools } from "@/data/tools";
import { routes } from "@/lib/routes";
import { submitTool } from "@/lib/submissions";
import { cn } from "@/lib/utils";

const PRICING_OPTIONS: Pricing[] = ["free", "freemium", "paid"];
const DESC_MAX = 280;

interface FormState {
  name: string;
  url: string;
  category: string;
  pricing: string;
  description: string;
  email: string;
}

const EMPTY: FormState = {
  name: "",
  url: "",
  category: CATEGORIES[0].id,
  pricing: "freemium",
  description: "",
  email: "",
};

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value.startsWith("http") ? value : `https://${value}`);
    return Boolean(u.hostname.includes("."));
  } catch {
    return false;
  }
}

export function SubmitToolForm() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Aviso (no bloqueante) si ya existe algo con un nombre parecido.
  const duplicate = useMemo(() => {
    const q = form.name.trim();
    if (q.length < 2) return null;
    const hit = searchTools(q)[0];
    return hit && hit.name.toLowerCase() === q.toLowerCase() ? hit : null;
  }, [form.name]);

  const errors = {
    name: form.name.trim().length < 2,
    url: !isValidUrl(form.url),
    description: form.description.trim().length < 10,
  };
  const invalid = errors.name || errors.url || errors.description;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (invalid || status === "sending") return;
    setStatus("sending");
    setError(null);
    const result = await submitTool(form);
    if (result.ok) {
      setStatus("done");
    } else {
      setStatus("idle");
      setError(result.error);
    }
  };

  if (status === "done") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto max-w-xl rounded-2xl border border-price-free/30 bg-price-free/5 p-8 text-center"
      >
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-price-free/15">
          <CheckCircle2 className="h-7 w-7 text-price-free" aria-hidden />
        </span>
        <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
          ¡Gracias por tu aporte!
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-fg-muted">
          Hemos recibido <strong className="text-fg">{form.name.trim()}</strong>.
          Revisaremos la herramienta y, si encaja, la verás pronto en el
          catálogo.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY);
              setStatus("idle");
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/40 hover:text-accent"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Enviar otra
          </button>
          <Link
            href={routes.tools}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg-base transition-colors hover:bg-accent-hover"
          >
            Explorar herramientas
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-5">
      <Field label="Nombre" required>
        <input
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="p. ej. Midjourney"
          maxLength={60}
          className={inputClass}
        />
        <AnimatePresence>
          {duplicate && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-1.5 pt-1.5 text-xs text-price-paid"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Ya tenemos «{duplicate.name}» en el catálogo. Si es otra, ¡adelante!
            </motion.p>
          )}
        </AnimatePresence>
      </Field>

      <Field label="Enlace (URL)" required>
        <input
          value={form.url}
          onChange={(e) => set("url", e.target.value)}
          placeholder="https://…"
          inputMode="url"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Categoría">
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className={cn(inputClass, "appearance-none")}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Precio">
          <select
            value={form.pricing}
            onChange={(e) => set("pricing", e.target.value)}
            className={cn(inputClass, "appearance-none")}
          >
            {PRICING_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {PRICING_LABEL[p]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="¿Qué hace?" required>
        <textarea
          value={form.description}
          onChange={(e) =>
            set("description", e.target.value.slice(0, DESC_MAX))
          }
          placeholder="Una frase clara: qué resuelve y para quién."
          rows={3}
          className={cn(inputClass, "resize-none")}
        />
        <p className="pt-1 text-right text-xs text-fg-subtle">
          {form.description.length}/{DESC_MAX}
        </p>
      </Field>

      <Field label="Tu email (opcional)">
        <input
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="Para avisarte si la añadimos"
          inputMode="email"
          className={inputClass}
        />
      </Field>

      {error && (
        <p className="rounded-lg border border-price-paid/30 bg-price-paid/10 px-3 py-2 text-sm text-price-paid">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={invalid || status === "sending"}
        whileTap={reduce || invalid ? undefined : { scale: 0.98 }}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-bg-base transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send className="h-4 w-4" aria-hidden />
        {status === "sending" ? "Enviando…" : "Enviar herramienta"}
      </motion.button>

      <p className="text-center text-xs text-fg-subtle">
        Revisamos cada propuesta a mano para mantener la calidad del catálogo.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-bg-subtle px-3 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-fg">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
