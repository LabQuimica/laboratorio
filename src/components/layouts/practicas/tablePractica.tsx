"use client";
import { usePracticas } from "@/hooks/Practicas/usePractica";
import { archivadascolumns, asignadascolumns, creadascolumns } from "./columns";
import { Table } from "@/components/table/Table";
import { Practica } from "@/types/PracticaTypes";
import { PracticaAdminFilter } from "./FilterPractica";

interface PracticasTableProps {
  viewType: "creadas" | "asignadas" | "archivadas";
}

export const PracticasTable = ({ viewType }: PracticasTableProps) => {
  const { data: practicasAdmin, isLoading, isError} = usePracticas(viewType);
  //const { practicasData } = usePracticas();

  let columns;
  if (viewType === "creadas") {
    columns = creadascolumns;
  } else if (viewType === "asignadas") {
    columns = asignadascolumns;
  } else {
    columns = archivadascolumns;
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
        FilterComponent={PracticaAdminFilter}
      />
    </div>
  );
};
