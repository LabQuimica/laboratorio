"use client";
import { useValeDetailsProfesor } from "@/hooks/Vales/useVales";
import { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import PDFProfesor from "@/components/pdf/profesor/pdf";

interface Props {
  id_vale: number;
}

export default function DownloadValeProfesorPDF({ id_vale }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Fetch data when component mounts
  const { data, isLoading, isError } = useValeDetailsProfesor(id_vale, true);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setIsDataFetched(true);
    }
  }, [data, isLoading, isError]);

  const handleDownloadClick = async () => {
    if (isGenerating || !data) return;
    setIsGenerating(true);
    try {
      const blob = await pdf(<PDFProfesor data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName = `vale_profesor_${data?.id_practica_asignada ?? "id"}_${
        data?.nombre_grupo ?? "grupo"
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
