"use client";
import { useParams } from "next/navigation";
import { useValeDetailsProfesor } from "@/hooks/Vales/useVales";
import { useState } from "react";

export default function ValePDFPage() {
  const params = useParams();
  const id_practica_asignada = params.profesor
    ? parseInt(params.profesor as string)
    : 0;

  const { data, isLoading, isError } = useValeDetailsProfesor(
    id_practica_asignada,
    true
  );

  if (isLoading) return <p>Cargando datos del vale...</p>;

  if (isError) return <p>Error al cargar los datos del vale</p>;

  if (!data) return <p>No se encontraron datos para este vale</p>;

  console.log(data);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vale de Profesor</h1>
    </div>
  );
}
