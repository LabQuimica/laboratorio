"use client";
import { useState, useRef } from "react";
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
import { PDFDownloadLink } from "@react-pdf/renderer";
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
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleDownload = () => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.click();
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
              handleDownload();
            }}
          >
            Descargar PDF
          </DropdownMenuItem>

          <a
            ref={downloadLinkRef}
            href="#"
            style={{ display: "none" }}
            download={`vale_profesor_${data?.id_practica_asignada}_${data?.nombre_usuario}.pdf`}
          >
            Descargar PDF
          </a>

          <PDFDownloadLink
            document={<PDFProfesor data={data} />}
            fileName={`vale_profesor_${data?.id_practica_asignada}_${data?.nombre_usuario}.pdf`}
          >
            {({ blob, url, loading, error }) => {
              if (url && downloadLinkRef.current) {
                downloadLinkRef.current.href = url;
              }

              return null;
            }}
          </PDFDownloadLink>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
