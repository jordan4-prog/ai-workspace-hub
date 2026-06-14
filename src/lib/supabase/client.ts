import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * True solo si las variables de entorno están presentes. Permite que la app
 * siga funcionando con localStorage (sin auth) cuando Supabase no está
 * configurado —p. ej. en un build sin env vars— en lugar de romperse.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

/** Cliente de Supabase (navegador). `null` si no está configurado. */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
