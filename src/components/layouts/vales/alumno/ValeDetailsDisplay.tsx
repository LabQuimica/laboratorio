import { ValeAlumnoDetails } from "@/types/ValeTypes";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const statusStyles = {
  pendiente: "bg-amber-300 text-amber-950",
  progreso: "bg-sky-300 text-sky-950",
  completada: "bg-green-300 text-green-950",
  cancelada: "bg-rose-300 text-red-950",
  incompleto: "bg-stone-300 text-stone-950",
} as const;

interface ValeDetailsDisplayProps {
  data: ValeAlumnoDetails;
  isLoading: boolean;
  isError: boolean;
}

export default function ValeDetailsDisplay({
  data,
  isLoading,
  isError,
}: ValeDetailsDisplayProps) {
  if (isLoading) {
    return <p className="text-center">Cargando...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error al cargar los detalles del vale.
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-center text-gray-500">
        No se encontraron detalles para este vale.
      </p>
    );
  }

  const getStatusStyle = (estado: string) => {
    return (
      statusStyles[estado.toLowerCase() as keyof typeof statusStyles] || ""
    );
  };

  return (
    <div className="space-y-4">
      {/* Detalles Generales */}
      <Card>
        <CardHeader>
          <CardTitle>ID del Vale: {data.id_vale}</CardTitle>
          <CardDescription>
            {data.nombre_alumno} ({data.email_alumno})
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Estado:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 rounded ${getStatusStyle(
                data.estado_vale
              )}`}
            >
              {data.estado_vale}
            </span>
          </p>
          <p>
            <strong>Observaciones:</strong>{" "}
            {data.observaciones_vale || "Ninguna"}
          </p>
          <div>
            <strong>Fechas:</strong>
            <ul className="list-disc pl-5">
              <li>Solicitada: {data.fecha_solicitadaVale}</li>
              <li>Asignada: {data.fecha_asignadaPA}</li>
              <li>Entrega: {data.fecha_entregaPA}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Materiales */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="materiales">
          <AccordionTrigger>Materiales Solicitados</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {data.practica.materiales.map((material: any, index: number) => (
                <Card key={index} className="p-4 border rounded-lg shadow-sm">
                  <p>
                    <strong>Material:</strong> {material.nombre_item} (
                    {material.tipo_item})
                  </p>
                  <p>
                    <strong>Cantidad Solicitada:</strong>{" "}
                    {material.cantidad_material}
                  </p>
                  <p>
                    <strong>Disponible:</strong> {material.cantidad_disponible}
                  </p>
                  <p>
                    <strong>Observaciones:</strong>{" "}
                    {material.observacion_item || "Ninguna"}
                  </p>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
