"use client";
import { useParams } from "next/navigation";
import { useValeDetails } from "@/hooks/Vales/useVales";
import { PDFViewer } from "@react-pdf/renderer";
import PDFAlumno from "@/components/pdf/alumno/pdf";

export default function ValePDFALumno() {
  const params = useParams();
  const id_vale = params.alumno ? parseInt(params.alumno as string) : 0;

  const { data, isLoading, isError } = useValeDetails(id_vale, true);

  if (isLoading) return <p>Cargando datos del vale...</p>;

  if (isError) return <p>Error al cargar los datos del vale</p>;

  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <PDFAlumno data={data} />
    </PDFViewer>
  );
}
