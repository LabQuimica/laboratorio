"use client";
import { useAllVales } from "@/hooks/Vales/useVale";
import { columns } from "./columns";
import { Table } from "@/components/table/Table";
import { EstadoValeFilter } from "@/components/layouts/vales/FilterVale";
import { Vale } from "@/types/ValeTypes";

export const ValesTable = () => {
  const { data, isLoading, isError } = useAllVales();
  return (
    <Table<Vale>
      data={data || []}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      orderBy="id_vale"
      reactQueryKEY="vales"
      FilterComponent={EstadoValeFilter}
    />
  );
};
