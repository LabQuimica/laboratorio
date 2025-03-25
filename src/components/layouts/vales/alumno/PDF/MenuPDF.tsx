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
import { ValeAlumnoDetails } from "@/types/ValeTypes";
import dynamic from "next/dynamic";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFAlumno from "@/components/pdf/alumno/pdf";
import PDFProfesor from "@/components/pdf/profesor/pdf";
import { url } from "inspector";

const InterfacePDFValeAlumno = dynamic(() => import("./interfacePDF"), {
  ssr: false,
});

export default function MenuPDFValeAlumno({
  data,
}: {
  data?: ValeAlumnoDetails;
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
                className="cursor-pointer"
              >
                Visualizar PDF
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Visualizar PDF</DialogTitle>
                <DialogDescription>
                  Aquí puedes ver el PDF generado para el vale del alumno.
                </DialogDescription>
              </DialogHeader>
              {isDialogOpen && (
                <div className="flex-1 overflow-hidden">
                  <div className="w-full h-full">
                    <InterfacePDFValeAlumno data={data} />
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
            className="cursor-pointer"
          >
            Descargar PDF
          </DropdownMenuItem>

          <a
            ref={downloadLinkRef}
            href="#"
            style={{ display: "none" }}
            download={`vale_alumno_${data?.id_vale}.pdf`}
          >
            Descargar PDF
          </a>

          <PDFDownloadLink
            document={<PDFAlumno data={data} />}
            fileName={`vale_alumno_${data?.id_vale}.pdf`}
          >
            {({ url }) => {
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
