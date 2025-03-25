"use client";
import { PDFViewer } from "@react-pdf/renderer";
import PDFProfesor from "@/components/pdf/profesor/pdf";
import { ValeProfesorDetails } from "@/types/ValeTypes";

export default function InterfacePDFValeProfesor({
  data,
}: {
  data?: ValeProfesorDetails;
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
        <PDFProfesor data={data} />
      </PDFViewer>
    </div>
  );
}
