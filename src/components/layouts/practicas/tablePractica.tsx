"use client";
import { useState } from "react";
import { usePracticas } from "@/hooks/Practicas/usePractica";
import { docentecolumns, asignadascolumns } from "./columns";
import DocenteSelector from "./docenteSelector";
import { Table } from "@/components/table/Table";
import { Practica } from "@/types/PracticaTypes";
import { EstadoValeFilter } from "../vales/FilterVale";

interface PracticasTableProps {
  viewType: "creadas" | "asignadas";
}

export const PracticasTable = ({ viewType }: PracticasTableProps) => {

  const { practicasData } = usePracticas(viewType);
  //const { practicasData } = usePracticas();

  const columns = viewType === "creadas" ? docentecolumns : asignadascolumns;

  return (
    <div>

      {/* Tabla */}
      <Table<Practica>
        data={practicasData.data || []}
        columns={columns}
        isLoading={practicasData.isLoading}
        isError={practicasData.isError}
        orderBy="fecha_creacion"
        reactQueryKEY="vales"
        FilterComponent={EstadoValeFilter}
      />
    </div>
  );
};
