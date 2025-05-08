"use client";

import { TableWithoutControls } from "@/components/table/TableWithoutControls";
import { columns } from "./columns";
import { useMaterials } from "@/hooks/Materials/useMaterials";
import type { Material } from "@/types/material";

interface Props {
  viewType: "reactivos" | "materiales" | "sensores" | "kits" | "equipos";
}

export default function InventoryTeacherView({ viewType }: Props) {
  const { data = [], isLoading, isError } = useMaterials(viewType);

  return (
    <TableWithoutControls<Material>
      data={data}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      orderBy="nombre"
    />
  );
}
