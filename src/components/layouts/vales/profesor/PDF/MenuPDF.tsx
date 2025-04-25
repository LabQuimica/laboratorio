"use client";
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ValeProfesorDetails } from "@/types/ValeTypes";
import dynamic from "next/dynamic";
import PDFProfesor from "@/components/pdf/profesor/pdf";

const InterfacePDFValeProfesor = dynamic(() => import("./interfacePDF"), {
  ssr: false,
});

export default function MenuPDFValeProfesor({
  data,
}: {
  data?: ValeProfesorDetails;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadClick = async () => {
    if (isGenerating || !data) return;
    setIsGenerating(true);
    try {
      const blob = await pdf(<PDFProfesor data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName = `vale_profesor_${data?.id_practica_asignada}_${data?.nombre_usuario}.pdf`;
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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Acciones</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDialogOpen(true);
                }}
                className="cursor-pointer"
              >
                Visualizar PDF
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Visualizar PDF</DialogTitle>
                <DialogDescription>
                  Aquí puedes ver el PDF generado para el vale del profesor.
                </DialogDescription>
              </DialogHeader>
              {isDialogOpen && (
                <div className="flex-1 overflow-hidden">
                  <div className="w-full h-full">
                    <InterfacePDFValeProfesor data={data} />
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleDownloadClick();
            }}
            disabled={isGenerating}
            className="cursor-pointer"
          >
            {isGenerating ? "Generando PDF..." : "Descargar PDF"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
