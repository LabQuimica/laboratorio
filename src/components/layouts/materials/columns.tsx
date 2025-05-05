// laboratorio/src/components/layouts/materials/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import TruncatedCell from "@/components/table/TruncatedCell";
import { Material } from "@/types/material";

export const columns: ColumnDef<Material>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => <TruncatedCell text={row.getValue("nombre")} />,
    size: 50,
  },
  {
    accessorKey: "ubicacion",
    header: "Ubicación",
    cell: ({ row }) => <TruncatedCell text={row.getValue("ubicacion")} />,
    size: 50,
  },
  {
    accessorKey: "cantidad",
    header: () => <div className="text-center">Cantidad</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <TruncatedCell text={row.getValue<number>("cantidad").toString()} />
      </div>
    ),
    size: 20,
  },
  {
    accessorKey: "observacion",
    header: "Observación",
    cell: ({ row }) => <TruncatedCell text={row.getValue("observacion")} />,
    size: 50,
  },
  {
    accessorKey: "especial",
    header: "Especial",
    cell: ({ row }) => <TruncatedCell text={row.getValue("especial")} />,
    size: 20,
  },
];
