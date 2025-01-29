"use client";
import { useUsers } from "@/hooks/useUser";
import { columns } from "./columns";
import { Table } from "@/components/table/Table";

export const UsersTable = () => {
  const { data, isLoading, isError } = useUsers();

  return (
    <Table
      data={data || []}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      orderBy="id_user"
    />
  );
};