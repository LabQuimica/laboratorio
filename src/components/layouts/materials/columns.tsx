// laboratorio/src/components/layouts/materials/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Material } from "@/types/material";

export const columns: ColumnDef<Material>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => <span>{row.getValue("nombre")}</span>,
    size: 50,
  },
  {
    accessorKey: "ubicacion",
    header: "Ubicación",
    cell: ({ row }) => <span>{row.getValue("ubicacion")}</span>,
    size: 50,
  },
  {
    accessorKey: "cantidad",
    header: () => (
      <div className="flex justify-center">Cantidad</div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue<number>("cantidad")}
      </div>
    ),
    size: 20,
  },
  {
    accessorKey: "observacion",
    header: "Observación",
    cell: ({ row }) => <span>{row.getValue("observacion")}</span>,
    size: 50,
  },
  {
    accessorKey: "especial",
    header: "Especial",
    cell: ({ row }) => <span>{row.getValue("especial")}</span>,
    size: 20,
  },
];
