"use client";
import { useEffect, useState } from "react";
import { usePracticas } from "@/hooks/Practicas/usePractica";
import { asignadascolumns, creadascolumns } from "./columns";
import DocenteSelector from "./docenteSelector";
import { Table } from "@/components/table/Table";
import { Practica } from "@/types/PracticaTypes";
import { EstadoValeFilter } from "../vales/alumno/FilterVale";

interface PracticasTableProps {
  viewType: "creadas" | "asignadas" | "archivadas";
}

export const PracticasTable = ({ viewType }: PracticasTableProps) => {
  const { data: practicasAdmin, isLoading, isError} = usePracticas(viewType);
  //const { practicasData } = usePracticas();

  const columns = viewType === "creadas" ? creadascolumns : asignadascolumns;

  if (viewType === "archivadas") {
    return <div className="h-40">En proceso</div>;
  }

  return (
    <div>
      {/* Tabla */}
      <Table<Practica>
        data={practicasAdmin || []}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        orderBy="fecha_creacion"
        reactQueryKEY={["practicas"]}
        FilterComponent={EstadoValeFilter}
      />
    </div>
  );
};
