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

// Tipos para los datos de la práctica asignada
interface ItemPractica {
  id_item: number;
  nombre_item: string;
  tipo_item: string;
  cantidad_disponible: string;
  ubicacion: string;
  cantidad_unitaria: string;
  contable: number;
  cantidad_total_necesaria: string;
}

interface PracticaAsignadaDetails {
  id_practica_asignada: number;
  status_practica: string;
  fecha_asignada: string;
  fecha_entrega: string;
  nombre_grupo: string;
  semestre_grupo: string;
  items: ItemPractica[];
}

const statusStyles = {
  pendiente: "bg-amber-300 text-amber-950",
  progreso: "bg-sky-300 text-sky-950",
  completada: "bg-green-300 text-green-950",
  cancelada: "bg-rose-300 text-red-950",
  incompleto: "bg-stone-300 text-stone-950",
} as const;

interface PracticaAsignadaDisplayProps {
  data: PracticaAsignadaDetails;
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

  // Función para determinar el tipo de unidad según el tipo de ítem
  const getUnidad = (tipoItem: string) => {
    switch (tipoItem.toLowerCase()) {
      case "solidos":
        return "gr";
      case "liquidos":
        return "ml";
      case "kits":
        return "und";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 pt-2">
      <Card className="dark:bg-neutral-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Práctica #{data.id_practica_asignada}</CardTitle>
            <Badge className={`${getStatusStyle(data.status_practica)}`}>
              {data.status_practica}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-gray-500">Grupo</h3>
              <p className="text-lg">{data.nombre_grupo}</p>
              <p className="text-sm">{data.semestre_grupo}</p>
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
                        <span className="text-gray-600">Disponible:</span>{" "}
                        {item.cantidad_disponible} {getUnidad(item.tipo_item)}
                      </p>
                      <p>
                        <span className="text-gray-600">Ubicación:</span>{" "}
                        {item.ubicacion}
                      </p>
                      <p>
                        <span className="text-gray-600">
                          Cantidad unitaria:
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
