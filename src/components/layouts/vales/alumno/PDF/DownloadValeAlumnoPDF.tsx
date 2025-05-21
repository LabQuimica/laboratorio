"use client";
import { useValeDetails } from "@/hooks/Vales/useVales";
import { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import PDFAlumno from "@/components/pdf/alumno/pdf";

interface Props {
  id_vale: number;
}

export default function DownloadValeAlumnoPDF({ id_vale }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Fetch data when component mounts
  const { data, isLoading, isError } = useValeDetails(id_vale, true);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setIsDataFetched(true);
    }
  }, [data, isLoading, isError]);

  const handleDownloadClick = async () => {
    if (isGenerating || !data) return;
    setIsGenerating(true);
    try {
      const blob = await pdf(<PDFAlumno data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName = `vale_alumno_${data?.id_vale ?? "id"}_${
        data?.nombre_alumno ?? "alumno"
      }.pdf`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
      alert("Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <Button
        onClick={handleDownloadClick}
        disabled={isGenerating || isLoading || !isDataFetched}
        variant="default"
        className="w-full max-w-xs"
      >
        {isLoading
          ? "Cargando datos..."
          : isGenerating
          ? "Generando PDF..."
          : "Descargar PDF"}
      </Button>
    </div>
  );
}
