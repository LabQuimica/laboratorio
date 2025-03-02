"use client";
import { useAlumnoVales } from "@/hooks/Vales/useVales";
import { Table } from "@/components/table/Table";
import { EstadoValeFilter } from "@/components/layouts/vales/alumno/FilterVale";
import { EstadoVale, Vale } from "@/types/ValeTypes";
import { columsAlumnoVale } from "./columns";

export const ValesAlumnoTable = ({ viewType }: { viewType: EstadoVale }) => {
  const { data, isLoading, isError } = useAlumnoVales(viewType);

  return (
    <Table<Vale>
      data={data || []}
      columns={columsAlumnoVale}
      isLoading={isLoading}
      isError={isError}
      orderBy="fecha_solicitada"
      reactQueryKEY="valesAlumnos"
      FilterComponent={EstadoValeFilter}
    />
  );
};
