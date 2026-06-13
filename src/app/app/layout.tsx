import { AppShell } from "@/components/app-shell";
import { WorkspaceProvider } from "@/lib/workspace-context";

/**
 * Layout del workspace (todo lo que cuelga de /app).
 *
 * Aquí viven el estado del Workspace (favoritos/recientes) y el shell con la
 * sidebar. La landing pública en "/" usa solo el root layout, sin esto.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <AppShell>{children}</AppShell>
    </WorkspaceProvider>
  );
}
