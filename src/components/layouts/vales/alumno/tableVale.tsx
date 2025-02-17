"use client";
import { useAlumnoVales } from "@/hooks/Vales/useAlumnoVales";
import { Table } from "@/components/table/Table";
import { EstadoValeFilter } from "@/components/layouts/vales/FilterVale";
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
      orderBy="alumno"
      reactQueryKEY="vales"
      FilterComponent={EstadoValeFilter}
    />
  );
};
