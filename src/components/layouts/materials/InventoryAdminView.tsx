"use client";

import { useState } from "react";
import { Table } from "@/components/table/Table";
import { columns as baseColumns } from "./columns";
import { useMaterials } from "@/hooks/Materials/useMaterials";
import EditMaterialModal from "./EditMaterialModal";
import MaterialActions from "./MaterialActions";
import type { Material } from "@/types/MaterialesTypes";

interface Props {
  viewType: "reactivos" | "materiales" | "sensores" | "kits" | "equipos";
}

export default function InventoryAdminView({ viewType }: Props) {
  const { data = [], isLoading, isError } = useMaterials(viewType);
  const [editing, setEditing] = useState<Material | null>(null);

  const columns = [
    ...baseColumns.map(col =>
      col.id === "actions"
        ? {
            ...col,
            cell: ({ row }: { row: any }) => (
              <div className="flex justify-center">
                <MaterialActions
                  material={row.original}
                  onEdit={(m) => setEditing(m)}
                />
              </div>
            ),
          }
        : col
    ),
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
