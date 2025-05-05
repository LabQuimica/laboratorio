"use client";

import { useState } from "react";
import { Table } from "@/components/table/Table";
import { columns as baseColumns } from "./columns";
import { useMaterials } from "@/hooks/Materials/useMaterials";
import EditMaterialModal from "./EditMaterialModal";
import MaterialActions from "./MaterialActions";
import type { Material } from "@/types/material";

interface Props {
  viewType: "reactivos" | "materiales" | "sensores" | "kits";
}

export default function InventoryAdminView({ viewType }: Props) {
  const { data = [], isLoading, isError } = useMaterials(viewType);
  const [editing, setEditing] = useState<Material | null>(null);

  const columns = [
    ...baseColumns,
    {
      id: "actions",
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }: { row: any }) => (
        <MaterialActions
          material={row.original}
          onEdit={(m) => setEditing(m)}
        />
      ),
      size: 10,
    },
  ];

  return (
    <>
      <Table<Material>
        data={data}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        orderBy="nombre"
        reactQueryKEY={["materials", viewType]}
        FilterComponent={() => null}
      />

      {editing && (
        <EditMaterialModal
          mat={editing}
          open={true}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}
