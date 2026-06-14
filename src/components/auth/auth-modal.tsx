"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "@/lib/auth-context";

/** Traduce los errores típicos de Supabase a mensajes claros en español. */
function translateError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "Email o contraseña incorrectos.";
  if (m.includes("already registered") || m.includes("already been"))
    return "Ese email ya está registrado. Inicia sesión.";
  if (m.includes("password should be at least"))
    return "La contraseña debe tener al menos 6 caracteres.";
  if (m.includes("unable to validate email")) return "Email no válido.";
  return msg;
}

type Mode = "signin" | "signup";

export function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setError(null);
      setPassword("");
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fn = mode === "signin" ? signIn : signUp;
    const { error: err } = await fn(email.trim(), password);
    setSubmitting(false);
    if (err) {
      setError(translateError(err));
      return;
    }
    onClose();
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-bg-base px-3 py-2 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
            className="relative w-full max-w-sm rounded-2xl border border-border bg-bg-subtle p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 text-fg-subtle transition-colors hover:text-fg"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <h2 className="text-lg font-semibold text-fg">
              {mode === "signin" ? "Inicia sesión" : "Crea tu cuenta"}
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              {mode === "signin"
                ? "Accede a tus favoritos en todos tus dispositivos."
                : "Guarda y sincroniza tus herramientas favoritas."}
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                autoComplete="email"
                className={inputClass}
              />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña (mín. 6 caracteres)"
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
                className={inputClass}
              />
              {error && <p className="text-sm text-rose-400">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "signin" ? "Entrar" : "Crear cuenta"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-fg-muted">
              {mode === "signin" ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError(null);
                    }}
                    className="text-accent transition-colors hover:underline"
                  >
                    Regístrate
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setError(null);
                    }}
                    className="text-accent transition-colors hover:underline"
                  >
                    Inicia sesión
                  </button>
                </>
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
