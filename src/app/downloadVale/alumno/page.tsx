"use client";
import { useSearchParams } from "next/navigation";
import DownloadValeAlumnoPDF from "@/components/layouts/vales/alumno/PDF/DownloadValeAlumnoPDF";

export default function DownloadButton() {
  const searchParams = useSearchParams();
  const id_vale = searchParams?.get("id")
    ? Number(searchParams?.get("id"))
    : null;

  console.log("id_vale", id_vale);
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      {id_vale ? (
        <DownloadValeAlumnoPDF id_vale={id_vale} />
      ) : (
        <div className="text-center p-4">
          <p className="text-red-500">ID de vale no proporcionado</p>
          <p className="text-sm text-muted-foreground mt-2">
            Por favor, proporcione un ID válido en el parámetro de URL:
            ?id=numero
          </p>
        </div>
      )}
    </div>
  );
}
