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
import ValeDetailsProfesor from "./ValeDetailsProfesor";
import MenuPDFValeProfesor from "./PDF/MenuPDF";

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
            <SheetDescription>
              Información detallada del vale de profesor
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            {data ? (
              <ValeDetailsProfesor
                data={data}
                isLoading={isLoading}
                isError={isError}
              />
            ) : (
              <p>No se encontraron detalles para este vale.</p>
            )}
          </div>
          <SheetFooter>
            <MenuPDFValeProfesor data={data} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
