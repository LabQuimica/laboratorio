"use client";
import { useVales } from "@/hooks/Vales/useVale";
import { columns } from "../columns";
import { Table } from "@/components/table/Table";
import { EstadoValeFilter } from "@/components/layouts/vales/FilterVale";
import { Vale } from "@/types/ValeTypes";

export const ValesAlumnoTable = ({ queryStatus }: { queryStatus: string }) => {
  console.log("Renderizando PracticasTable con viewType:", queryStatus);

  const { data, isLoading, isError } = useVales({
    status: queryStatus,
  });
  return (
    <Table<Vale>
      data={data || []}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      orderBy="id_vale"
      reactQueryKEY={`vales`}
      FilterComponent={EstadoValeFilter}
    />
  );
};
