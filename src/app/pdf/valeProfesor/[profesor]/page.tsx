"use client";
import { useParams } from "next/navigation";
import { useValeDetailsProfesor } from "@/hooks/Vales/useVales";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./pdf";

export default function ValePDFPage() {
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
      <MyDocument data={data} />
    </PDFViewer>
  );
}
