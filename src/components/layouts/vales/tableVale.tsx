"use client";
import { useVales } from "@/hooks/useVale";
import { columns } from "./columns";
import { Table } from "@/components/ui/Table";

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
