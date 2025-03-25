"use client";
import { Table } from "@/components/table/Table";
import { Practica } from "@/types/PracticaTypes";
import { useDocentePracticas } from "@/hooks/Practicas/profesor/useDocentePracticas";
import { asignadascolumns, creadascolumns } from "./columns";
import { EstadoValeFilter } from "../../vales/alumno/FilterVale";
import { useEffect } from "react";

interface DocentePracticasTableProps {
  viewType: "creadas" | "asignadas" | "archivadas";
  id_docente: number;
}

export const DocentePracticasTable = ({ viewType, id_docente }: DocentePracticasTableProps) => {
  const { data: practicasDocente, isLoading, isError } = useDocentePracticas(viewType, id_docente);
  const columns = viewType === "creadas" ? creadascolumns : asignadascolumns;

  if (viewType === "archivadas") {
    return <div className="h-40">En proceso</div>;
  }

  return (
    <div>
      {/* Tabla */}
      <Table<Practica>
        data={practicasDocente || []}
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
