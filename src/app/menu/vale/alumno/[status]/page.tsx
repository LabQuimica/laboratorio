"use client";
import { useParams } from "next/navigation";
import { ValesAlumnoTable } from "@/components/layouts/vales/alumno/valeAlumno";
import { ValesTable } from "@/components/layouts/vales/tableVale";

export default function ValeAlumnoStatus() {
  const { status } = useParams();

  if (status === "todos") {
    return <ValesTable />;
  }

  return <ValesAlumnoTable queryStatus={status as string} />;
}
