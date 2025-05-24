// laboratorio/src/components/layouts/materials/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import TruncatedCell from "@/components/table/TruncatedCell";
import { Material } from "@/types/MaterialesTypes";

export const columns: ColumnDef<Material>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => <TruncatedCell text={row.getValue("nombre")} />,
    size: 50,
    enableResizing: false,
  },
  {
    accessorKey: "ubicacion",
    header: "Ubicación",
    cell: ({ row }) => (
      <div className="text-center">
        <TruncatedCell text={row.getValue("ubicacion")} />
      </div>
    ),
    size: 50,
    enableResizing: false,
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
    enableResizing: false,
  },
  {
    accessorKey: "observacion",
    header: "Observación",
    cell: ({ row }) => <TruncatedCell text={row.getValue("observacion")} />,
    size: 50,
    enableResizing: false,
  },
  {
    accessorKey: "especial",
    header: "Especial",
    cell: ({ row }) => <TruncatedCell text={row.getValue("especial")} />,
    size: 20,
    enableResizing: false,
  },
  {
    id: "actions",
    header: () => <div className="text-center w-full">Acciones</div>,
    cell: () => <div className="flex justify-center">{/* Sin acciones por defecto */}</div>,
    size: 10,
    enableResizing: false,
  },
];
