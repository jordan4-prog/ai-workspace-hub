import { supabase } from "@/lib/supabase/client";

/**
 * Envío de herramientas propuestas por la comunidad.
 *
 * Se guardan en la tabla `submissions` de Supabase (con RLS: cualquiera puede
 * INSERTAR, nadie puede leer con la anon key —la revisión se hace en el panel
 * de Supabase). No es un context global porque es una acción puntual de
 * "fire-and-forget": no necesitamos mantener estado compartido en la app.
 */

export interface ToolSubmission {
  name: string;
  url: string;
  category: string;
  pricing: string;
  description: string;
  /** Email de contacto opcional (para avisar si se aprueba). */
  email?: string;
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitTool(
  input: ToolSubmission,
): Promise<SubmitResult> {
  if (!supabase) {
    return {
      ok: false,
      error: "El envío de herramientas no está disponible ahora mismo.",
    };
  }

  // Adjuntamos el usuario si hay sesión (opcional, ayuda a contactar).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("submissions").insert({
    name: input.name.trim(),
    url: input.url.trim(),
    category: input.category,
    pricing: input.pricing,
    description: input.description.trim(),
    email: input.email?.trim() || null,
    submitted_by: user?.id ?? null,
    status: "pending",
  });

  if (error) {
    return {
      ok: false,
      error: "No se pudo enviar. Inténtalo de nuevo en un momento.",
    };
  }

  return { ok: true };
}
