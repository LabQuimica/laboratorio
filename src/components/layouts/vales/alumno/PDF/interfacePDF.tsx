"use client";
import { PDFViewer } from "@react-pdf/renderer";
import PDFAlumno from "@/components/pdf/alumno/pdf";
import { ValeAlumnoDetails } from "@/types/ValeTypes";

export default function InterfacePDFValeAlumno({
  data,
}: {
  data?: ValeAlumnoDetails;
}) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PDFViewer
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PDFAlumno data={data} />
      </PDFViewer>
    </div>
  );
}
