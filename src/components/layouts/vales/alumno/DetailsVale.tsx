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

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import statusStyles from "../statusStyles";
import { getUnidad } from "@/lib/utils";

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
    <div className="space-y-6 pt-2">
      <Card className="dark:bg-neutral-900 ">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Vale #{data.id_vale}</CardTitle>
            <Badge className={`${getStatusStyle(data.estado_vale)}`}>
              {data.estado_vale}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-gray-500">Alumno</h3>
              <p className="text-lg">{data.nombre_alumno}</p>
              <p className="text-sm ">{data.email_alumno}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-1">
                Observaciones
              </h3>
              <p className="text-sm rounded-md">{data.observaciones_vale}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-500 pb-2">Fechas</h3>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-2 text-gray-500">Solicitada</td>
                  <td className="py-2">{data.fecha_solicitadaVale}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Inicio</td>
                  <td className="py-2">{data.fecha_inicio}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Fin</td>
                  <td className="py-2">{data.fecha_fin}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-neutral-900 ">
        <CardHeader>
          <CardTitle>Materiales Requeridos</CardTitle>
          <p className=" text-gray-500">
            {data.practica.materiales.length} materiales en total
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">
              {data.practica.nombre_practica} #{data.practica.id_practica}
            </p>
            <p>
              <span className="text-gray-500">Profesor: </span>
              {data.practica.nombre_profesor}
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3">Materiales Requeridos</h3>
            <ScrollArea className="h-full pr-4">
              <Accordion type="single" collapsible className="space-y-2">
                {data.practica.materiales.map((material, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="py-2">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span>{material.nombre_item}</span>
                        <Badge className=" text-xs w-24 text-center items-center justify-center">
                          {material.cantidad_material}{" "}
                          {getUnidad(material.tipo_item)}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3">
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-500">Tipo:</span>{" "}
                          {material.tipo_item === "reactivos-liquidos" ||
                          material.tipo_item === "reactivos-solidos"
                            ? "Reactivos"
                            : material.tipo_item}
                        </p>
                        <p>
                          <span className="text-gray-500">Disponible:</span>{" "}
                          {material.cantidad_disponible}{" "}
                          {getUnidad(material.tipo_item)}
                        </p>
                        {material.observacion_item && (
                          <p>
                            <span className="text-gray-500">Observación:</span>{" "}
                            {material.observacion_item}
                          </p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
