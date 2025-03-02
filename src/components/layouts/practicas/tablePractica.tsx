"use client";
import { useState } from "react";
import { usePracticas } from "@/hooks/Practicas/usePractica";
import { docentecolumns, asignadascolumns } from "./columns";
import DocenteSelector from "./docenteSelector";
import { Table } from "@/components/table/Table";
import { Practica } from "@/types/PracticaTypes";
import { EstadoValeFilter } from "../vales/alumno/FilterVale";

interface PracticasTableProps {
  viewType: "creadas" | "asignadas" | "archivadas";
}

export const PracticasTable = ({ viewType }: PracticasTableProps) => {
  const { data: practicas, isLoading, isError } = usePracticas(viewType);
  //const { practicasData } = usePracticas();

  const columns = viewType === "creadas" ? docentecolumns : asignadascolumns;

  if (viewType === "archivadas") {
    return <div className="h-40">En proceso</div>;
  }

  return (
    <div>
      {/* Tabla */}
      <Table<Practica>
        data={practicas || []}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        orderBy="fecha_creacion"
        reactQueryKEY="vales"
        FilterComponent={EstadoValeFilter}
        hiddenColumns={["id_practica"]}
      />
    </div>
  );
};
