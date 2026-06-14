"use client";

import type { User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

interface AuthContextValue {
  user: User | null;
  /** True mientras se resuelve la sesión inicial. */
  loading: boolean;
  /** False si Supabase no está configurado (la app funciona en modo local). */
  enabled: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    void supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: "Autenticación no configurada." };
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: "Autenticación no configurada." };
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error?.message };
  }, []);

  const signOut = useCallback(async () => {
    await supabase?.auth.signOut();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      enabled: isSupabaseConfigured,
      signUp,
      signIn,
      signOut,
    }),
    [user, loading, signUp, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>.");
  }
  return ctx;
}
