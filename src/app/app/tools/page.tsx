import { PageHeader } from "@/components/section";
import { ToolGrid } from "@/components/tool-grid";
import { approxToolCount, TOOLS } from "@/data/tools";

export const metadata = {
  title: "Todas las herramientas — AI Workspace Hub",
};

export default function AllToolsPage() {
  return (
    <>
      <PageHeader
        title="Todas las herramientas"
        subtitle={`${approxToolCount()} herramientas de IA organizadas para ti.`}
      />
      <ToolGrid tools={TOOLS} />
    </>
  );
}
