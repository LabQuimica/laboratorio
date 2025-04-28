"use client";
import { Table } from "@/components/table/Table";
import { Practica } from "@/types/PracticaTypes";
import { useDocentePracticas } from "@/hooks/Practicas/profesor/useDocentePracticas";
import { archivadascolumns, asignadascolumns, creadascolumns } from "./columns";
import { PracticaProfFilter } from "./FilterDocentePractica";

interface DocentePracticasTableProps {
  viewType: "creadas" | "asignadas" | "archivadas";
  id_docente: number;
}

export const DocentePracticasTable = ({ viewType, id_docente }: DocentePracticasTableProps) => {
  const { data: practicasDocente, isLoading, isError } = useDocentePracticas(viewType, id_docente);

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
        data={practicasDocente || []}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        orderBy="fecha_creacion"
        reactQueryKEY={["practicasDocente"]}
        FilterComponent={PracticaProfFilter}
      />
    </div>
  );
};
