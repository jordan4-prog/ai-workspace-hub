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
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [google, setGoogle] = useState(false);

  useEffect(() => {
    if (!open) {
      setError(null);
      setPassword("");
      setSubmitting(false);
      setGoogle(false);
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

  const handleGoogle = async () => {
    setGoogle(true);
    setError(null);
    const { error: err } = await signInWithGoogle();
    // Si funciona, el navegador redirige a Google (no se ejecuta lo de abajo).
    if (err) {
      setGoogle(false);
      setError(translateError(err));
    }
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

            <button
              type="button"
              onClick={handleGoogle}
              disabled={google || submitting}
              className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-bg-base px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-bg-muted disabled:opacity-60"
            >
              {google ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <GoogleIcon className="h-4 w-4" />
              )}
              Continuar con Google
            </button>

            <div className="my-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs text-fg-subtle">o con email</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg-base transition-colors hover:bg-accent-hover disabled:opacity-60"
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

/** Logo oficial multicolor de Google (G). */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.06 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h6.2a5.3 5.3 0 0 1-2.3 3.48v2.89h3.72c2.17-2 3.44-4.95 3.44-8.38Z"
      />
      <path
        fill="#34A853"
        d="M12 23.5c3.11 0 5.72-1.03 7.62-2.79l-3.72-2.89c-1.03.69-2.35 1.1-3.9 1.1-3 0-5.54-2.03-6.45-4.75H1.7v2.98A11.5 11.5 0 0 0 12 23.5Z"
      />
      <path
        fill="#FBBC05"
        d="M5.55 14.17a6.9 6.9 0 0 1 0-4.34V6.85H1.7a11.5 11.5 0 0 0 0 10.3l3.85-2.98Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.69 0 3.21.58 4.4 1.72l3.3-3.3A11.5 11.5 0 0 0 12 .5 11.5 11.5 0 0 0 1.7 6.85l3.85 2.98C6.46 7.1 9 4.75 12 4.75Z"
      />
    </svg>
  );
}
