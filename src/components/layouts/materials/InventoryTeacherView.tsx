"use client";

import { Table } from "@/components/table/Table";
import { columns } from "./columns";
import { useMaterials } from "@/hooks/Materials/useMaterials";
import type { Material } from "@/types/MaterialesTypes";

interface Props {
  viewType: "reactivos" | "materiales" | "sensores" | "kits" | "equipos";
}

export default function InventoryTeacherView({ viewType }: Props) {
  const { data = [], isLoading, isError } = useMaterials(viewType);

  return (
    <Table<Material>
      data={data}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      orderBy="nombre"
      reactQueryKEY={["materials", viewType]}
      FilterComponent={() => null}
    />
  );
}
