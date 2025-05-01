// laboratorio/src/components/layouts/materials/InventoryTeacherView.tsx
"use client";

import { TableWithoutControls } from "@/components/table/TableWithoutControls";
import { columns } from "./columns";
import { useMaterials } from "@/hooks/Materials/useMaterials";
import type { Material } from "@/types/material";

interface Props { viewType: "reactivos" | "materiales" | "sensores" | "kits"; }

export default function InventoryTeacherView({ viewType }: Props) {
  const { data, isLoading, isError } = useMaterials(viewType);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Inventario (Profesor) — {viewType.toUpperCase()}
      </h2>

      {isLoading ? (
        <p>Cargando…</p>
      ) : isError ? (
        <p className="text-red-500">Error al cargar materiales</p>
      ) : (
        <TableWithoutControls<Material>
          data={Array.isArray(data) ? data as Material[] : []}
          columns={columns}
          isLoading={false}
          isError={false}
          orderBy="nombre"
        />
      )}
    </div>
  );
}
