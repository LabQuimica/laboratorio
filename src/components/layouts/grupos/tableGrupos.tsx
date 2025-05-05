"use client";

import { Table } from "@/components/table/Table";
import { Grupo } from "@/types/GroupTypes";
import { useGrupos } from "@/hooks/Groups/useGroups";
import { gruposcolumns } from "./columns";
import { GruposFilter } from "./FilterGrupos";

export const GruposTable = () => {
  // data de grupos
  const {data: grupos, isLoading, isError} = useGrupos();

  return (
    <div>
      {/* Tabla */}
      <Table<Grupo>
        data={grupos || []}
        columns={gruposcolumns}
        isLoading={isLoading}
        isError={isError}
        orderBy="id_grupo"
        reactQueryKEY={["grupos"]}
        FilterComponent={GruposFilter}
      />
    </div>
  );
};