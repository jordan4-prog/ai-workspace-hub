"use client";

import { LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AuthModal } from "@/components/auth/auth-modal";
import { useAuth } from "@/lib/auth-context";

/**
 * Botón de cuenta del header.
 * - Sin sesión → "Iniciar sesión" (abre el modal).
 * - Con sesión → avatar con menú (email + cerrar sesión).
 * - Si Supabase no está configurado, no se muestra nada.
 */
export function AuthButton() {
  const { user, loading, enabled, signOut } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!enabled) return null;
  if (loading) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-bg-muted" />;
  }

  if (!user) {
    return (
      <>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
        >
          Iniciar sesión
        </button>
        <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  const initial = (user.email ?? "?").charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Menú de cuenta"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        {initial}
      </button>
      {menuOpen && (
        <div className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-bg-muted shadow-2xl">
          <div className="border-b border-border px-3 py-2.5">
            <p className="text-xs text-fg-subtle">Sesión iniciada</p>
            <p className="truncate text-sm text-fg">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              void signOut();
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-fg-muted transition-colors hover:bg-bg-base hover:text-fg"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
