"use client";
import { useVales } from "@/hooks/Vales/useVale";
import { columns } from "./columns";
import { Table } from "@/components/table/Table";

export const ValesTable = () => {
  const { data, isLoading, isError } = useVales();

  return (
    <Table
      data={data || []}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      orderBy="id_vale"
    />
  );
};
