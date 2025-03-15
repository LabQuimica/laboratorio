"use client";
import { useParams } from "next/navigation";
import { useValeDetailsProfesor } from "@/hooks/Vales/useVales";
import { PDFViewer } from "@react-pdf/renderer";
import PDFProfesor from "@/components/layouts/pdf/profesor/pdf";

export default function ValePDFProfesor() {
  const params = useParams();
  const id_practica_asignada = params.profesor
    ? parseInt(params.profesor as string)
    : 0;

  const { data, isLoading, isError } = useValeDetailsProfesor(
    id_practica_asignada,
    true
  );

  if (isLoading) return <p>Cargando datos del vale...</p>;

  if (isError) return <p>Error al cargar los datos del vale</p>;

  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <PDFProfesor data={data} />
    </PDFViewer>
  );
}
