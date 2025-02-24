"use client";
import { useState } from "react";
import { usePracticas } from "@/hooks/Practicas/usePractica2";
import { docentecolumns, asignadascolumns } from "./columns";
import DocenteSelector from "./docenteSelector";
import { Table } from "@/components/table/Table";
import { Practica } from "@/types/PracticaTypes";
import { EstadoValeFilter } from "../vales/alumno/FilterVale";

interface PracticasTableProps {
  viewType: "creadas" | "asignadas";
}

export const PracticasTable = ({ viewType }: PracticasTableProps) => {
  const { data: practicas, isLoading, isError } = usePracticas(viewType);
  //const { practicasData } = usePracticas();

  const columns = viewType === "creadas" ? docentecolumns : asignadascolumns;

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
      />
    </div>
  );
};
