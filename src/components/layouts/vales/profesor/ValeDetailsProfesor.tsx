import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ValeProfesorDetails } from "@/types/ValeTypes";
import statusStyles from "../statusStyles";

interface PracticaAsignadaDisplayProps {
  data: ValeProfesorDetails;
  isLoading: boolean;
  isError: boolean;
}

export default function PracticaAsignadaDetails({
  data,
  isLoading,
  isError,
}: PracticaAsignadaDisplayProps) {
  if (isLoading) {
    return <p className="text-center">Cargando...</p>;
  }
  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error al cargar los detalles de la práctica.
      </p>
    );
  }
  if (!data) {
    return (
      <p className="text-center text-gray-500">
        No se encontraron detalles para esta práctica.
      </p>
    );
  }

  const getStatusStyle = (estado: string) => {
    return (
      statusStyles[estado.toLowerCase() as keyof typeof statusStyles] || ""
    );
  };

  const getUnidad = (tipoItem: string) => {
    switch (tipoItem.toLowerCase()) {
      case "reactivos-sólidos":
        return "g";
      case "reactivos-líquidos":
        return "mL";
      case "kits":
        return "und";
      case "sensores":
        return "und";
      default:
        return "";
    }
  };
  console.log(data);
  return (
    <div className="space-y-6 pt-2">
      <Card className="dark:bg-neutral-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle>
                {data.nombre_practica} (#{data.id_practica})
              </CardTitle>
            </div>
            <Badge className={`${getStatusStyle(data.status_practica)}`}>
              {data.status_practica}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className=" text-sm text-gray-500">Grupo</h3>
              <p className="">{data.nombre_grupo}</p>
              <p className="">{data.semestre_grupo}</p>
            </div>
            <div>
              <h3 className=" text-sm text-gray-500">No. de Vale</h3>
              <p className="">#{data.id_practica_asignada}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-medium text-sm text-gray-500">Profesor</h3>
              <p className="">{data.nombre_usuario}</p>
              <p className="">{data.email}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium text-sm text-gray-500 pb-2">Fechas</h3>
            <div className="space-y-2 pl-2 text-sm">
              <p>
                <span className="text-gray-500 mr-2">Asignada:</span>
                {data.fecha_asignada}
              </p>
              <p>
                <span className="text-gray-500 mr-2">Entrega:</span>
                {data.fecha_entrega}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-neutral-900">
        <CardHeader>
          <CardTitle>Materiales Requeridos</CardTitle>
          <p className=" text-gray-500">
            {data.items.length} materiales en total
          </p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-full pr-4">
            <Accordion type="single" collapsible className="space-y-2">
              {data.items.map((item) => (
                <AccordionItem
                  key={item.id_item}
                  value={`item-${item.id_item}`}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span>{item.nombre_item}</span>
                      <Badge className="ml-2">
                        {item.cantidad_total_necesaria}{" "}
                        {getUnidad(item.tipo_item)}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3">
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gray-600">Tipo:</span>{" "}
                        {item.tipo_item}
                      </p>
                      <p>
                        <span className="text-gray-600">Característica:</span>{" "}
                        {item.especial || "No tiene"}
                      </p>
                      <p>
                        <span className="text-gray-600">Disponible:</span>{" "}
                        {item.cantidad_disponible} {getUnidad(item.tipo_item)}
                      </p>
                      <p>
                        <span className="text-gray-600">Ubicación:</span>{" "}
                        {item.ubicacion}
                      </p>
                      <p>
                        <span className="text-gray-600">
                          Cantidad solicitada:
                        </span>{" "}
                        {item.cantidad_unitaria} {getUnidad(item.tipo_item)}
                      </p>
                      <p>
                        <span className="text-gray-600">Contable:</span>{" "}
                        {item.contable ? "Sí" : "No"}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
