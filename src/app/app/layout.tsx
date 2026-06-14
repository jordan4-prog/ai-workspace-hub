import { AppShell } from "@/components/app-shell";
import { AuthProvider } from "@/lib/auth-context";
import { WorkspaceProvider } from "@/lib/workspace-context";

/**
 * Layout del workspace (todo lo que cuelga de /app).
 *
 * Provee la sesión (AuthProvider) y el estado del Workspace, que elige entre
 * Supabase (con sesión) o localStorage (anónimo). La landing pública en "/"
 * usa solo el root layout, sin esto.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <AppShell>{children}</AppShell>
      </WorkspaceProvider>
    </AuthProvider>
  );
}
