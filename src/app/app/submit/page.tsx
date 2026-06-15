import { PageHeader } from "@/components/section";
import { SubmitToolForm } from "@/components/workspace/submit-tool-form";

export const metadata = {
  title: "Enviar herramienta — AI Workspace Hub",
  description:
    "¿Conoces una herramienta de IA que falta? Propónla y la añadiremos al catálogo.",
};

export default function SubmitPage() {
  return (
    <>
      <PageHeader
        title="Enviar una herramienta"
        subtitle="¿Echas en falta alguna IA? Propónla y, si encaja, la sumamos al catálogo."
      />
      <SubmitToolForm />
    </>
  );
}
