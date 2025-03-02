"use client";
import { useUsers } from "@/hooks/Users/useUser";
import { columns } from "./columns";
import { Table } from "@/components/table/Table";
import { User } from "@/types/userTypes";
import { EstadoValeFilter } from "../vales/alumno/FilterVale";

export const UsersTable = () => {
  const { data, isLoading, isError } = useUsers();

  return (
    <Table<User>
      data={data || []}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      orderBy="id_user"
      reactQueryKEY="vales"
      FilterComponent={EstadoValeFilter}
    />
  );
};
