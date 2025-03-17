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
import { useValeDetails } from "@/hooks/Vales/useVales";
import { useState } from "react";
import ValeDetailsDisplay from "./ValeDetailsDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  id_vale: number;
}

export function ActionValeAlumno({ id_vale }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError } = useValeDetails(id_vale, isOpen);
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
              Información detallada del vale de alumno
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            {data ? (
              <ValeDetailsDisplay
                data={data}
                isLoading={isLoading}
                isError={isError}
              />
            ) : (
              <p>No se encontraron detalles para este vale.</p>
            )}
          </div>
          <SheetFooter>
            <Link href={`/pdf/valeAlumno/${id_vale}`} target="_blank">
              <Button>Descargar</Button>
            </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
