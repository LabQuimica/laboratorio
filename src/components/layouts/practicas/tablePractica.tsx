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
  const { practicasData } = usePracticas();

  const columns = viewType === "creadas" ? docentecolumns : asignadascolumns;

  const filteredPracticas =
    viewType === "creadas"
      ? practicasData.data || []
      : practicasData.data?.filter((practica) => practica.esta_asignada) || [];

  const [selectedDocente, setSelectedDocente] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const handleDocenteSelect = (id: number, name: string) => {
    setSelectedDocente({ id, name });
  };

  return (
    <div>
      {/* Selector de docente */}
      {viewType === "creadas" && (
        <DocenteSelector onDocenteSelect={handleDocenteSelect} />
      )}

      {/* Tabla */}
      <Table<Practica>
        data={filteredPracticas}
        columns={columns}
        isLoading={practicasData.isLoading}
        isError={practicasData.isError}
        orderBy="id_vale"
        reactQueryKEY="vales"
        FilterComponent={EstadoValeFilter}
      />
    </div>
  );
};
