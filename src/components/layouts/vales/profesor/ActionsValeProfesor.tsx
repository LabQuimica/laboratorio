"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useValeDetailsProfesor } from "@/hooks/Vales/useVales";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  id_practica_asignada: number;
}

export function ActionValeProfesor({ id_practica_asignada }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError } = useValeDetailsProfesor(
    id_practica_asignada,
    isOpen
  );
  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center">
            <Button variant={"outline"} onClick={() => setIsOpen(true)}>
              Ver detalles
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="w-[30rem] flex flex-col">
          <SheetHeader>
            <SheetTitle>Detalles del Vale</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 overflow-y-auto p-2">
            {isLoading && <p className="text-center">Cargando...</p>}
            {isError && (
              <p className="text-center text-red-500">
                Error al cargar los detalles del vale.
              </p>
            )}
            {data && (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">
                    {data.nombre_grupo} - {data.semestre_grupo}
                  </h2>
                  <Badge className={getStatusStyle(data.status_practica)}>
                    {data.status_practica}
                  </Badge>
                  <p className="text-sm text-gray-500">
                    Asignada: {data.fecha_asignada}
                  </p>
                  <p className="text-sm text-gray-500">
                    Entrega: {data.fecha_entrega}
                  </p>
                </div>
                <div className="space-y-2">
                  {data.items.map((item) => (
                    <Card key={item.id_item}>
                      <CardContent className="p-3">
                        <h3 className="text-md font-medium">
                          {item.nombre_item}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Tipo: {item.tipo_item}
                        </p>
                        <p className="text-sm">Ubicación: {item.ubicacion}</p>
                        <p className="text-sm">
                          Disponible: {item.cantidad_disponible}
                        </p>
                        <p className="text-sm">
                          Necesaria: {item.cantidad_total_necesaria}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
          <SheetFooter>
            <Button>Descargar</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const statusStyles = {
  pendiente: "bg-amber-300 text-amber-950",
  progreso: "bg-sky-300 text-sky-950",
  completada: "bg-green-300 text-green-950",
  cancelada: "bg-rose-300 text-red-950",
  incompleto: "bg-stone-300 text-stone-950",
} as const;

const getStatusStyle = (estado: string) => {
  return statusStyles[estado.toLowerCase() as keyof typeof statusStyles] || "";
};
