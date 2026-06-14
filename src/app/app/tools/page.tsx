import { ToolsExplorer } from "@/components/workspace/tools-explorer";
import { ToolsHero } from "@/components/workspace/tools-hero";

export const metadata = {
  title: "Todas las herramientas — AI Workspace Hub",
};

export default function AllToolsPage() {
  return (
    <>
      <ToolsHero />
      <ToolsExplorer />
    </>
  );
}
