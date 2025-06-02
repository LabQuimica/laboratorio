"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DownloadValeProfesorPDF from "@/components/layouts/vales/profesor/PDF/dowloadPDF";

function DownloadButtonContent() {
  const searchParams = useSearchParams();
  const id_vale = searchParams?.get("id")
    ? Number(searchParams?.get("id"))
    : null;

  console.log("id_vale", id_vale);
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      {id_vale ? (
        <DownloadValeProfesorPDF id_vale={id_vale} />
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

export default function DownloadButton() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="text-center p-4">
            <p className="text-muted-foreground">Cargando...</p>
          </div>
        </div>
      }
    >
      <DownloadButtonContent />
    </Suspense>
  );
}
